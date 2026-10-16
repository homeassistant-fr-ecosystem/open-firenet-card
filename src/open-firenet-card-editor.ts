import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { DOMAIN } from './const';
import { localize, pickLanguage, type SupportedLanguage, type TranslationKey } from './localize';
import {
  SECTION_IDS,
  type HomeAssistant,
  type OpenFirenetCardConfig,
  type SectionId,
} from './types';

const SECTION_LABEL_KEYS: Record<SectionId, TranslationKey> = {
  status: 'editor.section.status',
  climate: 'editor.section.climate',
  temperatures: 'editor.section.temperatures',
  fans: 'editor.section.fans',
  consumption: 'editor.section.consumption',
  mechanics: 'editor.section.mechanics',
  bridge: 'editor.section.bridge',
  schedule: 'editor.section.schedule',
};

interface AnchorOption {
  id: string;
  name: string;
}

/**
 * Visual editor for the Open Firenet card.
 * Registered as `open-firenet-card-editor` and returned by the card's
 * `getConfigElement()`. Uses only native form controls: it does not depend on
 * any `ha-*` element besides the card container itself.
 */
@customElement('open-firenet-card-editor')
export class OpenFirenetCardEditor extends LitElement {
  static override styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    label.title {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    input[type='text'] {
      font: inherit;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .switch-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 0;
    }
    .checkbox-row input {
      accent-color: var(--primary-color);
      width: 18px;
      height: 18px;
    }
    .hint {
      font-size: 0.78rem;
      color: var(--secondary-text-color);
    }
  `;

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: OpenFirenetCardConfig;

  private readonly _datalistId = `ofn-entities-${Math.random().toString(36).slice(2, 8)}`;

  public setConfig(config: OpenFirenetCardConfig): void {
    this._config = config;
  }

  private get _lang(): SupportedLanguage {
    return pickLanguage(this.hass, this._config?.language as string | undefined);
  }

  private _t(key: TranslationKey): string {
    return localize(this._lang, key);
  }

  private _nameFor(id: string): string {
    const state = this.hass?.states[id];
    if (state && this.hass && typeof this.hass.formatEntityName === 'function') {
      const formatted = this.hass.formatEntityName(state);
      if (formatted) {
        return formatted;
      }
    }
    return state?.attributes.friendly_name ?? id;
  }

  /** Anchor candidates: every open_firenet entity the frontend knows about. */
  private get _anchorOptions(): AnchorOption[] {
    const hass = this.hass;
    if (!hass?.entities) {
      return [];
    }
    return Object.keys(hass.entities)
      .filter((id) => hass.entities[id].platform === DOMAIN && hass.states[id])
      .map((id) => ({ id, name: this._nameFor(id) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private _update(patch: Partial<OpenFirenetCardConfig>): void {
    if (!this._config) {
      return;
    }
    const config: OpenFirenetCardConfig = { ...this._config, ...patch };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private get _selectedSections(): SectionId[] {
    const configured = this._config?.sections;
    return configured && configured.length ? configured : [...SECTION_IDS];
  }

  private _toggleSection(id: SectionId, checked: boolean): void {
    const current = this._selectedSections;
    const next = checked
      ? [...new Set([...current, id])]
      : current.filter((section) => section !== id);
    this._update({ sections: next });
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config) {
      return nothing;
    }
    const options = this._anchorOptions;
    return html`
      <div class="form">
        <div class="field">
          <label class="title">${this._t('editor.anchor')}</label>
          <input
            type="text"
            list=${this._datalistId}
            .value=${this._config.entity ?? ''}
            placeholder="climate.open_firenet"
            @change=${(ev: Event) =>
              this._update({ entity: (ev.target as HTMLInputElement).value || undefined })}
          />
          <datalist id=${this._datalistId}>
            ${options.map((o) => html`<option value=${o.id}>${o.name}</option>`)}
          </datalist>
          <span class="hint">${this._t('editor.anchor_hint')}</span>
        </div>

        <div class="field">
          <label class="title">${this._t('editor.title')}</label>
          <input
            type="text"
            .value=${this._config.title ?? ''}
            placeholder=${this._t('editor.title_placeholder')}
            @input=${(ev: Event) =>
              this._update({ title: (ev.target as HTMLInputElement).value })}
          />
        </div>

        <div class="switch-row">
          <input
            id="show-controls"
            type="checkbox"
            .checked=${this._config.show_controls !== false}
            @change=${(ev: Event) =>
              this._update({
                show_controls: (ev.target as HTMLInputElement).checked,
              })}
          />
          <label for="show-controls">${this._t('editor.show_controls')}</label>
        </div>

        <div class="field">
          <label class="title">${this._t('editor.sections')}</label>
          ${SECTION_IDS.map(
            (id) => html`<div class="checkbox-row">
              <input
                id=${`section-${id}`}
                type="checkbox"
                .checked=${this._selectedSections.includes(id)}
                @change=${(ev: Event) =>
                  this._toggleSection(id, (ev.target as HTMLInputElement).checked)}
              />
              <label for=${`section-${id}`}>${this._t(SECTION_LABEL_KEYS[id])}</label>
            </div>`,
          )}
        </div>
      </div>
    `;
  }
}
