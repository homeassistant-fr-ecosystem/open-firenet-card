import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import './open-firenet-card-editor';

import {
  DEFAULT_EXPANDED_SECTIONS,
  DEFAULT_SECTIONS,
  DEFAULT_SERVICE_INTERVAL,
  DOMAIN,
  FAN_PRESETS,
  PRESET_KEYS,
} from './const';
import { discoverEntities, findAnchorEntity, type DiscoveredEntities, type Role } from './entities';
import {
  formatDuration,
  formatNumber,
  isAvailable,
  isOn,
  rssiQuality,
  serviceLevel,
  serviceTone,
  stateNumber,
  stoveStateInfo,
} from './format';
import {
  DURATION_UNITS,
  localize,
  pickLanguage,
  type SupportedLanguage,
  type TranslationKey,
} from './localize';
import { cardStyles } from './styles';
import {
  SECTION_IDS,
  type DeviceRegistryEntry,
  type HassEntity,
  type HomeAssistant,
  type OpenFirenetCardConfig,
  type SectionId,
} from './types';

const FAN_ROLES: readonly Role[] = ['multiair_1', 'multiair_2'];

/**
 * Icon accent, keyed by domain. Maps to a `.tone-*` CSS class so the card is
 * warmer without hard-coding colours in every render method.
 */
type IconTone =
  | 'heat'
  | 'warm'
  | 'teal'
  | 'cool'
  | 'link'
  | 'schedule'
  | 'frost'
  | 'ok'
  | 'fair'
  | 'weak'
  | 'alarm';

/** Compact at-a-glance value shown in a section header while it is collapsed. */
interface SectionSummary {
  text: string;
  entityId?: string;
}

/** Section titles, used by the collapsible headers. */
const SECTION_TITLE_KEYS: Record<SectionId, TranslationKey> = {
  status: 'section.status',
  climate: 'section.climate',
  temperatures: 'section.temperatures',
  fans: 'section.fans',
  consumption: 'section.consumption',
  mechanics: 'section.mechanics',
  bridge: 'section.bridge',
  schedule: 'section.schedule',
};

@customElement('open-firenet-card')
export class OpenFirenetCard extends LitElement {
  static override styles = cardStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: OpenFirenetCardConfig;

  /** Entity states pushed by the `states` context; falls back to `hass.states`. */
  @state() private _states?: HomeAssistant['states'];

  /** User toggles made on the collapsible headers: `true` = expanded. */
  @state() private _sectionOverrides = new Map<SectionId, boolean>();

  private _unsubscribe?: () => void;

  private _cache?: {
    config: OpenFirenetCardConfig;
    entities: unknown;
    devices: unknown;
    states: unknown;
    result: DiscoveredEntities;
  };

  private _static?: {
    entities: unknown;
    devices: unknown;
    language: string;
    locale: unknown;
  };

  static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('open-firenet-card-editor');
  }

  static getStubConfig(
    hass?: HomeAssistant,
    entities: string[] = [],
    entitiesFallback: string[] = [],
  ): OpenFirenetCardConfig {
    const candidates = [...entities, ...entitiesFallback];
    const belongs = (id: string) => hass?.entities?.[id]?.platform === DOMAIN;
    const anchor =
      candidates.find((id) => id.startsWith('climate.') && belongs(id)) ??
      candidates.find((id) => belongs(id)) ??
      (belongs('climate.open_firenet') ? 'climate.open_firenet' : undefined);
    return { entity: anchor ?? 'climate.open_firenet', show_controls: true };
  }

  public setConfig(config: OpenFirenetCardConfig): void {
    if (!config) {
      throw new Error(localize(pickLanguage(this.hass), 'error.config_missing'));
    }
    this._config = { show_controls: true, ...config };
    this._cache = undefined;
  }

  public getCardSize(): number {
    return 9;
  }

  /** Size in the sections view grid (columns; rows follow the content). */
  public getGridOptions(): { columns: number; rows: 'auto'; min_columns: number } {
    return { columns: 12, rows: 'auto', min_columns: 6 };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._requestStatesContext();
  }

  public override disconnectedCallback(): void {
    this._unsubscribe?.();
    this._unsubscribe = undefined;
    super.disconnectedCallback();
  }

  /**
   * Ask for the `states` context so Home Assistant pushes state changes
   * without us re-rendering on every unrelated change of the `hass` object.
   * If no provider answers (older frontend), we keep using `hass.states`.
   */
  private _requestStatesContext(): void {
    const event = new CustomEvent('context-request', {
      bubbles: true,
      composed: true,
    }) as CustomEvent & {
      context?: unknown;
      subscribe?: boolean;
      callback?: (states: HomeAssistant['states'], unsubscribe: () => void) => void;
    };
    event.context = 'states';
    event.subscribe = true;
    event.callback = (states, unsubscribe) => {
      this._unsubscribe = unsubscribe;
      this._states = states;
    };
    this.dispatchEvent(event);
  }

  /**
   * Re-render only when something the card reads actually changed: the config,
   * the entity/device registries, the language, or (via the context) the states.
   */
  protected override shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config') || changed.has('_sectionOverrides')) {
      return true;
    }
    if (!this.hass) {
      return false;
    }
    // No context provider answered: fall back to the normal hass-driven updates.
    if (!this._states) {
      return changed.has('hass') || changed.has('_states');
    }
    const changedStatic =
      !this._static ||
      this._static.entities !== this.hass.entities ||
      this._static.devices !== this.hass.devices ||
      this._static.language !== this.hass.language ||
      this._static.locale !== this.hass.locale;
    if (changedStatic) {
      this._static = {
        entities: this.hass.entities,
        devices: this.hass.devices,
        language: this.hass.language,
        locale: this.hass.locale,
      };
    }
    return changedStatic || changed.has('_states');
  }

  private get _stateMap(): HomeAssistant['states'] {
    return this._states ?? this.hass?.states ?? {};
  }

  private get _lang(): SupportedLanguage {
    return pickLanguage(this.hass, this._config?.language as string | undefined);
  }

  private _t(key: TranslationKey, params?: Record<string, string | number>): string {
    return localize(this._lang, key, params);
  }

  private get entities(): DiscoveredEntities {
    const config = this._config;
    const entities = this.hass?.entities;
    const devices = this.hass?.devices;
    const states = this._stateMap;
    const cache = this._cache;
    if (
      cache &&
      cache.config === config &&
      cache.entities === entities &&
      cache.devices === devices &&
      cache.states === states
    ) {
      return cache.result;
    }
    const result = discoverEntities(this.hass, config);
    this._cache = { config, entities, devices, states, result };
    return result;
  }

  private get _controls(): boolean {
    return this._config.show_controls !== false;
  }

  private get _sections(): SectionId[] {
    const configured = this._config.sections;
    if (configured && configured.length) {
      return configured.filter((s) => (SECTION_IDS as readonly string[]).includes(s));
    }
    return [...DEFAULT_SECTIONS];
  }

  private get _expandedDefaults(): Set<SectionId> {
    const configured = this._config.expanded_sections ?? DEFAULT_EXPANDED_SECTIONS;
    return new Set(
      configured.filter((s) => (SECTION_IDS as readonly string[]).includes(s)),
    );
  }

  /** A section is expanded unless the user toggled it or the config collapsed it. */
  private _isExpanded(section: SectionId): boolean {
    return this._sectionOverrides.get(section) ?? this._expandedDefaults.has(section);
  }

  private _toggleSection(section: SectionId): void {
    const next = new Map(this._sectionOverrides);
    next.set(section, !this._isExpanded(section));
    this._sectionOverrides = next;
  }

  private _entity(role: Role): HassEntity | undefined {
    const id = this.entities[role];
    return id ? this._stateMap[id] : undefined;
  }

  private _device(): DeviceRegistryEntry | undefined {
    const anchor = findAnchorEntity(this.hass, this._config);
    const deviceId = anchor ? this.hass.entities?.[anchor]?.device_id : undefined;
    return deviceId ? this.hass.devices?.[deviceId] : undefined;
  }

  private _presetLabel(mode: string): string {
    const key = PRESET_KEYS[mode];
    return key ? this._t(key) : mode;
  }

  /**
   * Human label of a state: prefer Home Assistant's own formatter (it uses the
   * integration translations in every language), fall back to our dictionary.
   */
  private _stateLabel(entity: HassEntity | undefined, fallbackKey: TranslationKey): string {
    if (entity && typeof this.hass.formatEntityState === 'function') {
      const formatted = this.hass.formatEntityState(entity);
      if (formatted) {
        return formatted;
      }
    }
    return this._t(fallbackKey);
  }

  /** Human name of an entity, via the Home Assistant formatter when available. */
  private _entityName(entity: HassEntity | undefined, fallback: string): string {
    if (entity && typeof this.hass.formatEntityName === 'function') {
      const formatted = this.hass.formatEntityName(entity);
      if (formatted) {
        return formatted;
      }
    }
    return entity?.attributes.friendly_name ?? fallback;
  }

  // ---------------------------------------------------------------- actions

  private _call(domain: string, service: string, data: Record<string, unknown>): void {
    this.hass.callService(domain, service, data);
  }

  /** Ask the dashboard to open the more-info dialog of an entity. */
  private _moreInfo(entityId?: string): void {
    if (!entityId) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onClickableKey(event: KeyboardEvent, entityId?: string): void {
    if (!entityId) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._moreInfo(entityId);
    }
  }

  private _setHvac(on: boolean): void {
    const id = this.entities.climate;
    if (id) {
      this._call('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: on ? 'heat' : 'off' });
    }
  }

  private _adjustTemp(delta: number): void {
    const climate = this._entity('climate');
    const id = this.entities.climate;
    if (!climate || !id) {
      return;
    }
    const step = Number(climate.attributes.target_temp_step ?? 1);
    const min = Number(climate.attributes.min_temp ?? 14);
    const max = Number(climate.attributes.max_temp ?? 28);
    const current = Number(climate.attributes.temperature ?? min);
    const next = Math.min(max, Math.max(min, current + delta * step));
    this._call('climate', 'set_temperature', { entity_id: id, temperature: next });
  }

  private _setPreset(mode: string): void {
    const id = this.entities.climate;
    if (id) {
      this._call('climate', 'set_preset_mode', { entity_id: id, preset_mode: mode });
    }
  }

  private _setNumber(role: Role, value: number): void {
    const id = this.entities[role];
    if (id) {
      this._call('number', 'set_value', { entity_id: id, value });
    }
  }

  private _toggleSwitch(role: Role, on: boolean): void {
    const id = this.entities[role];
    if (id) {
      this._call('switch', on ? 'turn_on' : 'turn_off', { entity_id: id });
    }
  }

  private _toggleFan(role: Role, on: boolean): void {
    const id = this.entities[role];
    if (id) {
      this._call('fan', on ? 'turn_on' : 'turn_off', { entity_id: id });
    }
  }

  private _setFanPreset(role: Role, preset: string): void {
    const id = this.entities[role];
    if (id) {
      this._call('fan', 'set_preset_mode', { entity_id: id, preset_mode: preset });
    }
  }

  // ---------------------------------------------------------------- render

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }
    const anchor = findAnchorEntity(this.hass, this._config);
    return html`
      <ha-card>
        <div class="card">
          ${this._renderHeader()}
          ${anchor
            ? this._sections.map((section) => this._renderSection(section))
            : html`<div class="error-text">${this._t('error.no_entities')}</div>`}
        </div>
      </ha-card>
    `;
  }

  private _renderSection(section: SectionId): TemplateResult | typeof nothing {
    const body = this._renderSectionBody(section);
    if (body === nothing) {
      return nothing;
    }
    if (section === 'status') {
      return html`<div class="section">${body}</div>`;
    }
    const expanded = this._isExpanded(section);
    const summary = expanded ? null : this._sectionSummary(section);
    return html`
      <div class="section collapsible ${expanded ? 'expanded' : 'collapsed'}">
        <div class="section-header">
          <button
            class="section-toggle"
            aria-expanded=${String(expanded)}
            @click=${() => this._toggleSection(section)}
          >
            <ha-icon
              class="chevron"
              icon=${expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'}
            ></ha-icon>
            <span class="section-title">${this._t(SECTION_TITLE_KEYS[section])}</span>
          </button>
          ${summary
            ? html`<span
                class="section-summary ${summary.entityId ? 'clickable' : ''}"
                role=${summary.entityId ? 'button' : nothing}
                tabindex=${summary.entityId ? '0' : nothing}
                @click=${summary.entityId ? () => this._moreInfo(summary.entityId) : nothing}
                @keydown=${summary.entityId
                  ? (e: KeyboardEvent) => this._onClickableKey(e, summary.entityId)
                  : nothing}
                >${summary.text}</span
              >`
            : nothing}
        </div>
        ${expanded ? body : nothing}
      </div>
    `;
  }

  /** A key value kept visible in the header of a collapsed section. */
  private _sectionSummary(section: SectionId): SectionSummary | null {
    switch (section) {
      case 'climate': {
        const target = this._entity('climate')?.attributes.temperature;
        if (typeof target !== 'number') {
          return null;
        }
        return {
          text: `${formatNumber(target, 1, this._lang)}°C`,
          entityId: this.entities.climate,
        };
      }
      case 'temperatures': {
        const ambient =
          this._entity('climate')?.attributes.current_temperature ??
          stateNumber(this._entity('room_temperature'));
        if (ambient === null || ambient === undefined) {
          return null;
        }
        return {
          text: `${formatNumber(ambient, 1, this._lang)}°C`,
          entityId: this.entities.room_temperature ?? this.entities.climate,
        };
      }
      case 'fans': {
        const fans = FAN_ROLES.map((role) => this._entity(role)).filter(
          (f): f is HassEntity => !!f,
        );
        if (!fans.length) {
          return null;
        }
        const on = fans.filter((f) => f.state === 'on').length;
        return { text: `${on}/${fans.length}`, entityId: this.entities.multiair_1 };
      }
      case 'consumption': {
        const pellets = this._entity('pellets_total_kg');
        if (!isAvailable(pellets)) {
          return null;
        }
        return {
          text: `${formatNumber(stateNumber(pellets), 0, this._lang)} kg`,
          entityId: this.entities.pellets_total_kg,
        };
      }
      case 'mechanics': {
        const draft = this._entity('fan_speed_rpm');
        if (!isAvailable(draft)) {
          return null;
        }
        return {
          text: `${formatNumber(stateNumber(draft), 0, this._lang)} rpm`,
          entityId: this.entities.fan_speed_rpm,
        };
      }
      case 'bridge': {
        const rssi = this._entity('wifi_rssi');
        if (isAvailable(rssi)) {
          return {
            text: `${formatNumber(stateNumber(rssi), 0, this._lang)} dBm`,
            entityId: this.entities.wifi_rssi,
          };
        }
        const connected = this._entity('connected');
        if (connected) {
          return {
            text: this._t(isOn(connected) ? 'badge.connected' : 'badge.offline'),
            entityId: this.entities.connected,
          };
        }
        return null;
      }
      case 'schedule': {
        const schedule = this._entity('heating_schedule');
        if (!schedule) {
          return null;
        }
        return {
          text: this._t(schedule.state === 'on' ? 'caption.enabled' : 'caption.disabled'),
          entityId: this.entities.heating_schedule,
        };
      }
      default:
        return null;
    }
  }

  private _renderSectionBody(section: SectionId): TemplateResult | typeof nothing {
    switch (section) {
      case 'status':
        return this._renderStatus();
      case 'climate':
        return this._renderClimate();
      case 'temperatures':
        return this._renderTemperatures();
      case 'fans':
        return this._renderFans();
      case 'consumption':
        return this._renderConsumption();
      case 'mechanics':
        return this._renderMechanics();
      case 'bridge':
        return this._renderBridge();
      case 'schedule':
        return this._renderSchedule();
      default:
        return nothing;
    }
  }

  private _renderHeader(): TemplateResult {
    const device = this._device();
    const name =
      this._config.title ||
      device?.name_by_user ||
      device?.name ||
      this._t('card.default_title');
    const model = device?.model;
    const connected = this._entity('connected');
    const burning = this._entity('burning');
    const problem = this._entity('problem');
    const hopper = this._entity('hopper_lid');

    return html`
      <div class="header">
        <ha-icon
          icon="mdi:fire"
          style="color: var(--state-climate-heat-color, #ff6d00); --mdc-icon-size: 28px"
        ></ha-icon>
        <div class="header-title">
          <span class="name">${name}</span>
          ${model ? html`<span class="model">${model}</span>` : nothing}
        </div>
        <div class="badges">
          ${connected
            ? html`<span class="badge ${isOn(connected) ? 'ok' : 'alarm'}">
                <ha-icon icon=${isOn(connected) ? 'mdi:lan-connect' : 'mdi:lan-disconnect'}></ha-icon>
                ${this._t(isOn(connected) ? 'badge.connected' : 'badge.offline')}
              </span>`
            : nothing}
          ${isOn(burning)
            ? html`<span class="badge ok">
                <ha-icon icon="mdi:fire"></ha-icon>${this._t('badge.flame')}
              </span>`
            : nothing}
          ${isOn(hopper)
            ? html`<span class="badge warn">
                <ha-icon icon="mdi:tray-arrow-up"></ha-icon>${this._t('badge.hopper_open')}
              </span>`
            : nothing}
          ${isOn(problem)
            ? html`<span class="badge alarm">
                <ha-icon icon="mdi:alert"></ha-icon>${this._t('badge.error')}
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderStatus(): TemplateResult | typeof nothing {
    const stateEntity = this._entity('stove_state');
    const climate = this._entity('climate');
    if (!stateEntity && !climate) {
      return nothing;
    }
    const info = stoveStateInfo(stateEntity?.state);
    const currentTemp =
      climate?.attributes.current_temperature ??
      stateNumber(this._entity('room_temperature'));
    const targetTemp = climate?.attributes.temperature ?? null;
    const ambientEntity = this.entities.room_temperature ?? this.entities.climate;
    const targetEntity = this.entities.climate;
    const stateEntityId = this.entities.stove_state;

    return html`
      <div class="status">
        ${stateEntity
          ? html`<span
              class="state-chip tone-${info.tone} ${info.burning ? 'flame' : ''} clickable"
              role="button"
              tabindex="0"
              @click=${() => this._moreInfo(stateEntityId)}
              @keydown=${(e: KeyboardEvent) => this._onClickableKey(e, stateEntityId)}
            >
              <ha-icon icon=${info.icon}></ha-icon>
              <span class="label">${this._stateLabel(stateEntity, info.labelKey)}</span>
            </span>`
          : nothing}
        <div class="temps">
          <div
            class="temp clickable"
            role="button"
            tabindex="0"
            @click=${() => this._moreInfo(ambientEntity)}
            @keydown=${(e: KeyboardEvent) => this._onClickableKey(e, ambientEntity)}
          >
            <span class="value">${formatNumber(currentTemp, 1, this._lang)}°C</span>
            <span class="caption">${this._t('caption.ambient')}</span>
          </div>
          ${targetTemp !== null
            ? html`<div
                class="temp clickable"
                role="button"
                tabindex="0"
                @click=${() => this._moreInfo(targetEntity)}
                @keydown=${(e: KeyboardEvent) => this._onClickableKey(e, targetEntity)}
              >
                <span class="value">${formatNumber(targetTemp, 1, this._lang)}°C</span>
                <span class="caption">${this._t('caption.target')}</span>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderClimate(): TemplateResult | typeof nothing {
    const climate = this._entity('climate');
    if (!climate) {
      return nothing;
    }
    const on = climate.state === 'heat';
    const target = climate.attributes.temperature ?? null;
    const preset = (climate.attributes.preset_mode as string | undefined) ?? null;
    const presetModes =
      (climate.attributes.preset_modes as string[] | undefined) ?? ['manual', 'auto', 'comfort'];

    return html`
      <div class="section-body">
        <div class="row wrap">
          ${this._controls
            ? html`<button class=${on ? '' : 'primary'} @click=${() => this._setHvac(!on)}>
                <ha-icon icon="mdi:power"></ha-icon>
                ${this._t(on ? 'button.stop' : 'button.start')}
              </button>`
            : html`<span class="muted"
                >${this._t(on ? 'caption.running' : 'caption.stopped')}</span
              >`}
          <div class="temp-adjust">
            ${this._controls
              ? html`<button class="icon" @click=${() => this._adjustTemp(-1)}>
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>`
              : nothing}
            <span class="consigne">${formatNumber(target, 1, this._lang)}°C</span>
            ${this._controls
              ? html`<button class="icon" @click=${() => this._adjustTemp(1)}>
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>`
              : nothing}
          </div>
        </div>
        <div class="row wrap">
          <span class="muted">${this._t('caption.mode')}</span>
          ${this._controls
            ? presetModes.map(
                (mode) => html`<button
                  class="segment ${preset === mode ? 'selected' : ''}"
                  @click=${() => this._setPreset(mode)}
                >
                  ${this._presetLabel(mode)}
                </button>`,
              )
            : html`<span>${preset ? this._presetLabel(preset) : '—'}</span>`}
        </div>
        ${this._renderPower()}
      </div>
    `;
  }

  private _renderPower(): TemplateResult | typeof nothing {
    const powerEntity = this._entity('heating_power');
    const actualEntity = this._entity('power_actual_percent');
    if (!powerEntity && !actualEntity) {
      return nothing;
    }
    const value = stateNumber(powerEntity);
    const actual = stateNumber(actualEntity);
    const display = actual ?? value;
    const min = Number(powerEntity?.attributes.min ?? 30);
    const max = Number(powerEntity?.attributes.max ?? 100);
    const step = Number(powerEntity?.attributes.step ?? 5);
    const sliderValue = value ?? min;

    return html`
      <div class="slider-row">
        ${this._controls && powerEntity
          ? html`<input
              type="range"
              min=${min}
              max=${max}
              step=${step}
              .value=${String(sliderValue)}
              @change=${(e: Event) =>
                this._setNumber('heating_power', Number((e.target as HTMLInputElement).value))}
            />`
          : html`<div class="progress">
              <span style="width: ${display ?? 0}%"></span>
            </div>`}
        <div class="caption">
          <span>${this._t('caption.power')}</span>
          <span>
            ${formatNumber(display, 0, this._lang)} %${actual !== null &&
            value !== null &&
            actual !== value
              ? html` <span class="muted"
                  >${this._t('caption.power_set', {
                    value: formatNumber(value, 0, this._lang),
                  })}</span
                >`
              : nothing}
          </span>
        </div>
      </div>
    `;
  }

  private _renderTemperatures(): TemplateResult | typeof nothing {
    const tiles: TemplateResult[] = [];
    const room = this._entity('room_temperature');
    const combustion = this._entity('combustion_temperature');
    const board = this._entity('board_temperature');

    if (isAvailable(room)) {
      tiles.push(
        this._tile(
          'mdi:home-thermometer',
          `${formatNumber(stateNumber(room), 1, this._lang)} °C`,
          this._t('caption.ambient'),
          this.entities.room_temperature,
          'warm',
        ),
      );
    }
    if (isAvailable(combustion)) {
      tiles.push(
        this._tile(
          'mdi:fire',
          `${formatNumber(stateNumber(combustion), 0, this._lang)} °C`,
          this._t('caption.combustion'),
          this.entities.combustion_temperature,
          'heat',
        ),
      );
    }
    if (isAvailable(board)) {
      tiles.push(
        this._tile(
          'mdi:chip',
          `${formatNumber(stateNumber(board), 0, this._lang)} °C`,
          this._t('caption.board'),
          this.entities.board_temperature,
          'warm',
        ),
      );
    }
    if (!tiles.length) {
      return nothing;
    }
    return html`<div class="tiles">${tiles}</div>`;
  }

  private _renderFans(): TemplateResult | typeof nothing {
    const fans = FAN_ROLES.map((role) => ({ role, entity: this._entity(role) })).filter(
      (f) => f.entity,
    );
    if (!fans.length) {
      return nothing;
    }
    return html`<div class="section-body">
      ${fans.map((f) => this._renderFan(f.role, f.entity as HassEntity))}
    </div>`;
  }

  private _renderFan(role: Role, entity: HassEntity): TemplateResult {
    const on = entity.state === 'on';
    const preset = (entity.attributes.preset_mode as string | undefined) ?? 'auto';
    const trimRole: Role = role === 'multiair_1' ? 'multiair_1_area' : 'multiair_2_area';
    const trimEntity = this._entity(trimRole);
    const trimValue = stateNumber(trimEntity);

    return html`
      <div class="fan">
        <div class="fan-head">
          <ha-icon class=${on ? 'spin' : ''} icon="mdi:fan"></ha-icon>
          <span class="name">${this._entityName(entity, role)}</span>
          <span class="spacer"></span>
          ${this._controls
            ? html`<button class="icon" @click=${() => this._toggleFan(role, !on)}>
                <ha-icon icon=${on ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off-outline'}></ha-icon>
              </button>`
            : html`<span class="muted"
                >${this._t(on ? 'caption.fan_on' : 'caption.fan_off')}</span
              >`}
        </div>
        ${on
          ? html`<div class="row wrap">
              ${FAN_PRESETS.map(
                (p) => html`<button
                  class="segment ${preset === p ? 'selected' : ''}"
                  @click=${() => this._setFanPreset(role, p)}
                >
                  ${p === 'auto' ? this._t('preset.auto') : p}
                </button>`,
              )}
            </div>`
          : nothing}
        ${trimEntity && this._controls
          ? html`<div class="slider-row">
              <input
                type="range"
                min=${Number(trimEntity.attributes.min ?? -30)}
                max=${Number(trimEntity.attributes.max ?? 30)}
                step=${Number(trimEntity.attributes.step ?? 5)}
                .value=${String(trimValue ?? 0)}
                @change=${(e: Event) =>
                  this._setNumber(trimRole, Number((e.target as HTMLInputElement).value))}
              />
              <div class="caption">
                <span>${this._t('caption.trim')}</span>
                <span
                  >${trimValue !== null && trimValue > 0 ? '+' : ''}${formatNumber(
                    trimValue,
                    0,
                    this._lang,
                  )}
                  %</span
                >
              </div>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderConsumption(): TemplateResult | typeof nothing {
    const pellets = this._entity('pellets_total_kg');
    const hours = this._entity('pellet_hours');
    const service = this._entity('service_countdown_kg');
    const tiles: TemplateResult[] = [];

    if (isAvailable(pellets)) {
      tiles.push(
        this._tile(
          'mdi:fire-circle',
          `${formatNumber(stateNumber(pellets), 0, this._lang)} kg`,
          this._t('caption.pellets'),
          this.entities.pellets_total_kg,
          'heat',
        ),
      );
    }
    if (isAvailable(hours)) {
      tiles.push(
        this._tile(
          'mdi:clock-outline',
          `${formatNumber(stateNumber(hours), 0, this._lang)} h`,
          this._t('caption.operating_hours'),
          this.entities.pellet_hours,
          'teal',
        ),
      );
    }

    let serviceBlock: TemplateResult | typeof nothing = nothing;
    if (isAvailable(service)) {
      const remaining = stateNumber(service);
      const interval = Number(this._config.service_interval ?? DEFAULT_SERVICE_INTERVAL);
      const percent = serviceLevel(remaining, interval);
      const tone = serviceTone(percent);
      serviceBlock = html`
        <div
          class="slider-row clickable"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo(this.entities.service_countdown_kg)}
          @keydown=${(e: KeyboardEvent) =>
            this._onClickableKey(e, this.entities.service_countdown_kg)}
        >
          <div class="progress">
            <span class="${tone === 'ok' ? '' : tone}" style="width: ${percent ?? 0}%"></span>
          </div>
          <div class="caption">
            <span>${this._t('caption.service')}</span>
            <span
              >${this._t('caption.service_remaining', {
                value: formatNumber(remaining, 0, this._lang),
              })}</span
            >
          </div>
        </div>
      `;
    }

    if (!tiles.length && serviceBlock === nothing) {
      return nothing;
    }
    return html`<div class="section-body">
      ${tiles.length ? html`<div class="tiles">${tiles}</div>` : nothing} ${serviceBlock}
    </div>`;
  }

  private _renderMechanics(): TemplateResult | typeof nothing {
    const tiles: TemplateResult[] = [];
    const draft = this._entity('fan_speed_rpm');
    const auger = this._entity('auger_speed_rpm');
    const flaps = this._entity('air_flaps_percent');
    const flapsTarget = this._entity('air_flaps_target_percent');

    if (isAvailable(draft)) {
      tiles.push(
        this._tile(
          'mdi:fan',
          `${formatNumber(stateNumber(draft), 0, this._lang)} rpm`,
          this._t('caption.draft'),
          this.entities.fan_speed_rpm,
          'cool',
        ),
      );
    }
    if (isAvailable(auger)) {
      tiles.push(
        this._tile(
          'mdi:screw-machine-flat-top',
          `${formatNumber(stateNumber(auger), 0, this._lang)} rpm`,
          this._t('caption.auger'),
          this.entities.auger_speed_rpm,
          'cool',
        ),
      );
    }
    if (isAvailable(flaps)) {
      const target = stateNumber(flapsTarget);
      const caption =
        target !== null
          ? this._t('caption.flaps_target', { value: formatNumber(target, 0, this._lang) })
          : this._t('caption.flaps');
      tiles.push(
        this._tile(
          'mdi:air-filter',
          `${formatNumber(stateNumber(flaps), 0, this._lang)} %`,
          caption,
          this.entities.air_flaps_percent,
          'cool',
        ),
      );
    }
    if (!tiles.length) {
      return nothing;
    }
    return html`<div class="tiles">${tiles}</div>`;
  }

  private _renderBridge(): TemplateResult | typeof nothing {
    const tiles: TemplateResult[] = [];
    const rssi = this._entity('wifi_rssi');
    const uptime = this._entity('uptime_seconds');
    const connected = this._entity('connected');

    if (isAvailable(rssi)) {
      const dbm = stateNumber(rssi);
      const quality = rssiQuality(dbm);
      const qualityLabel = this._t(quality.key);
      const qualityTone: IconTone = quality.level >= 3 ? 'ok' : quality.level === 2 ? 'fair' : 'weak';
      const rssiId = this.entities.wifi_rssi;
      tiles.push(html`<div
        class="tile clickable"
        role="button"
        tabindex="0"
        @click=${() => this._moreInfo(rssiId)}
        @keydown=${(e: KeyboardEvent) => this._onClickableKey(e, rssiId)}
      >
        <span class="bars tone-${qualityTone}" title="${qualityLabel}">
          ${[1, 2, 3, 4].map((n) => html`<i class="${n <= quality.level ? 'on' : ''}"></i>`)}
        </span>
        <div class="body">
          <span class="value">${formatNumber(dbm, 0, this._lang)} dBm</span>
          <span class="caption">${this._t('caption.wifi', { quality: qualityLabel })}</span>
        </div>
      </div>`);
    }
    if (isAvailable(uptime)) {
      tiles.push(
        this._tile(
          'mdi:timer-outline',
          formatDuration(stateNumber(uptime), DURATION_UNITS[this._lang]),
          this._t('caption.uptime'),
          this.entities.uptime_seconds,
          'cool',
        ),
      );
    }
    if (connected) {
      tiles.push(
        this._tile(
          isOn(connected) ? 'mdi:lan-connect' : 'mdi:lan-disconnect',
          this._t(isOn(connected) ? 'badge.connected' : 'badge.offline'),
          this._t('caption.link'),
          this.entities.connected,
          isOn(connected) ? 'link' : 'alarm',
        ),
      );
    }
    if (!tiles.length) {
      return nothing;
    }
    return html`<div class="tiles">${tiles}</div>`;
  }

  private _renderSchedule(): TemplateResult | typeof nothing {
    const schedule = this._entity('heating_schedule');
    const frost = this._entity('frost_protection');
    if (!schedule && !frost) {
      return nothing;
    }
    return html`<div class="tiles">
      ${this._renderSwitchRow(
        'heating_schedule',
        'switch.heating_schedule',
        'mdi:calendar-clock',
        'schedule',
      )}
      ${this._renderSwitchRow(
        'frost_protection',
        'switch.frost_protection',
        'mdi:snowflake',
        'frost',
      )}
    </div>`;
  }

  private _renderSwitchRow(
    role: Role,
    labelKey: TranslationKey,
    icon: string,
    tone: IconTone,
  ): TemplateResult | typeof nothing {
    const entity = this._entity(role);
    if (!entity) {
      return nothing;
    }
    const on = entity.state === 'on';
    return html`<div class="tile">
      <ha-icon class="tone-${tone}" icon=${icon}></ha-icon>
      <div class="body">
        <span class="value">${this._t(labelKey)}</span>
        <span class="caption"
          >${this._t(on ? 'caption.enabled' : 'caption.disabled')}</span
        >
      </div>
      <span class="spacer"></span>
      <button class="icon" ?disabled=${!this._controls} @click=${() => this._toggleSwitch(role, !on)}>
        <ha-icon icon=${on ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off-outline'}></ha-icon>
      </button>
    </div>`;
  }

  private _tile(
    icon: string,
    value: string,
    caption: string,
    entityId?: string,
    tone?: IconTone,
  ): TemplateResult {
    return html`<div
      class="tile ${entityId ? 'clickable' : ''}"
      role=${entityId ? 'button' : nothing}
      tabindex=${entityId ? '0' : nothing}
      @click=${entityId ? () => this._moreInfo(entityId) : nothing}
      @keydown=${entityId ? (e: KeyboardEvent) => this._onClickableKey(e, entityId) : nothing}
    >
      <ha-icon class=${tone ? `tone-${tone}` : nothing} icon=${icon}></ha-icon>
      <div class="body">
        <span class="value">${value}</span>
        <span class="caption">${caption}</span>
      </div>
    </div>`;
  }
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
      getEntitySuggestion?: (
        hass: HomeAssistant,
        entityId: string,
      ) => { config: Record<string, unknown> } | null;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'open-firenet-card',
  name: 'Open Firenet',
  description: 'RIKA pellet stove via the Open Firenet bridge',
  preview: true,
  documentationURL: 'https://github.com/openfirenet/open-firenet-card',
  // Suggest this card for the stove's own entities only.
  getEntitySuggestion: (hass: HomeAssistant, entityId: string) => {
    if (hass?.entities?.[entityId]?.platform !== DOMAIN) {
      return null;
    }
    if (!entityId.startsWith('climate.')) {
      return null;
    }
    return { config: { type: 'custom:open-firenet-card', entity: entityId } };
  },
});
