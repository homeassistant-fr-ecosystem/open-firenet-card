import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
  }

  .card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section + .section {
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    padding-top: 14px;
  }

  .section-title {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  /* ---------- collapsible sections ---------- */
  .section-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    border-radius: 0;
    color: inherit;
    cursor: pointer;
    text-align: left;
    justify-content: flex-start;
  }

  .section-toggle:hover {
    background: none;
  }

  .section-toggle .chevron {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex: none;
    transition: transform 0.15s ease;
  }

  .section-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ---------- header ---------- */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header-title {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .header-title .name {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-title .model {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .badges {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    color: var(--secondary-text-color);
  }

  .badge ha-icon {
    --mdc-icon-size: 15px;
  }

  .badge.ok {
    color: var(--success-color, #43a047);
  }

  .badge.alarm {
    background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent);
    color: var(--error-color, #db4437);
  }

  .badge.warn {
    background: color-mix(in srgb, var(--warning-color, #ffa600) 20%, transparent);
    color: var(--warning-color, #ffa600);
  }

  /* ---------- status ---------- */
  .status {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .state-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    border-radius: 14px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .state-chip ha-icon {
    --mdc-icon-size: 26px;
  }

  .state-chip .label {
    font-size: 1.05rem;
    font-weight: 600;
  }

  .tone-active {
    color: var(--state-climate-heat-color, #ff6d00);
    background: color-mix(in srgb, var(--state-climate-heat-color, #ff6d00) 14%, transparent);
  }

  .tone-busy {
    color: var(--info-color, #039be5);
    background: color-mix(in srgb, var(--info-color, #039be5) 14%, transparent);
  }

  .tone-error {
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent);
  }

  .tone-idle,
  .tone-off {
    color: var(--secondary-text-color);
  }

  .flame ha-icon {
    animation: flicker 1.6s ease-in-out infinite;
  }

  @keyframes flicker {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.12);
      opacity: 0.82;
    }
  }

  .temps {
    display: flex;
    gap: 18px;
    margin-left: auto;
    flex-wrap: wrap;
  }

  .temp {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .temp .value {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .temp .caption {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }

  /* ---------- generic tiles ---------- */
  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 10px;
  }

  .tile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .tile ha-icon {
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    flex: none;
  }

  .tile .body {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .tile .value {
    font-size: 1.02rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .tile .caption {
    font-size: 0.74rem;
    color: var(--secondary-text-color);
  }

  /* ---------- icon accents (per domain) ---------- */
  .tile ha-icon.tone-heat {
    color: var(--state-climate-heat-color, #ff6d00);
  }

  .tile ha-icon.tone-warm {
    color: var(--warning-color, #ffa000);
  }

  .tile ha-icon.tone-teal {
    color: var(--teal-color, #00897b);
  }

  .tile ha-icon.tone-cool {
    color: var(--info-color, #039be5);
  }

  .tile ha-icon.tone-link {
    color: var(--success-color, #43a047);
  }

  .tile ha-icon.tone-alarm {
    color: var(--error-color, #db4437);
  }

  .tile ha-icon.tone-schedule {
    color: var(--purple-color, #8e24aa);
  }

  .tile ha-icon.tone-frost {
    color: var(--light-blue-color, #29b6f6);
  }

  /* ---------- clickable values (open the more-info dialog) ---------- */
  .clickable {
    cursor: pointer;
  }

  .tile.clickable:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.08));
  }

  .state-chip.clickable:hover {
    filter: brightness(0.96);
  }

  .temp.clickable:hover .value {
    text-decoration: underline;
  }

  .slider-row.clickable:hover .caption {
    color: var(--primary-text-color);
  }

  .clickable:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* ---------- controls ---------- */
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .row.wrap {
    flex-wrap: wrap;
  }

  .spacer {
    flex: 1;
  }

  button {
    font: inherit;
    color: var(--primary-text-color);
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    border-radius: 10px;
    padding: 8px 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.15s ease;
  }

  button:hover {
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button ha-icon {
    --mdc-icon-size: 20px;
  }

  button.primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: transparent;
  }

  button.primary:hover {
    background: var(--primary-color);
    filter: brightness(1.08);
  }

  button.icon {
    min-width: 40px;
    padding: 8px;
  }

  button.segment {
    border-radius: 10px;
    font-size: 0.85rem;
    padding: 6px 12px;
  }

  button.segment.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: transparent;
  }

  .temp-adjust {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .temp-adjust .consigne {
    font-size: 1.5rem;
    font-weight: 600;
    min-width: 4.5ch;
    text-align: center;
  }

  input[type='range'] {
    width: 100%;
    accent-color: var(--primary-color);
  }

  .slider-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .slider-row .caption {
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    color: var(--secondary-text-color);
  }

  /* ---------- fan ---------- */
  .fan {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .fan-head {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fan-head .name {
    font-weight: 600;
  }

  .spin ha-icon {
    animation: spin 2.2s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* ---------- progress ---------- */
  .progress {
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color, rgba(0, 0, 0, 0.12));
    overflow: hidden;
  }

  .progress > span {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  .progress > span.warn {
    background: var(--warning-color, #ffa600);
  }

  .progress > span.danger {
    background: var(--error-color, #db4437);
  }

  /* ---------- signals ---------- */
  .bars {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }

  .bars i {
    width: 4px;
    border-radius: 1px;
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
  }

  .bars i.on {
    background: var(--primary-color);
  }

  .bars.tone-ok i.on {
    background: var(--success-color, #43a047);
  }

  .bars.tone-fair i.on {
    background: var(--warning-color, #ffa600);
  }

  .bars.tone-weak i.on {
    background: var(--error-color, #db4437);
  }

  .bars i:nth-child(1) {
    height: 4px;
  }
  .bars i:nth-child(2) {
    height: 7px;
  }
  .bars i:nth-child(3) {
    height: 10px;
  }
  .bars i:nth-child(4) {
    height: 14px;
  }

  .muted {
    color: var(--secondary-text-color);
  }

  .error-text {
    color: var(--error-color, #db4437);
    font-size: 0.9rem;
  }
`;
