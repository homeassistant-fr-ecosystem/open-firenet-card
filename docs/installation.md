# Detailed installation

**English** · [Français](../fr/installation.md)

## Via HACS

1. Make sure [HACS](https://hacs.xyz) is installed.
2. Open HACS, **Dashboard** tab, then the ⋮ menu at the top right →
   **Custom repositories**.
3. Add `https://github.com/openfirenet/open-firenet-card` and pick the category
   **Lovelace / Dashboard**.
4. Search for **Open Firenet Card** in the list and click **Download**.
5. HACS adds the resource automatically. Check under
   **Settings → Dashboards → ⋮ → Resources** that it is present:
   - URL: `/hacsfiles/open-firenet-card/open-firenet-card.js`
   - Type: **JavaScript module**
6. Clear the browser cache (Ctrl+F5 / Cmd+Shift+R).

## Manually

1. Download the latest release (or grab `dist/open-firenet-card.js` from the
   repository) and copy it into `<config>/www/`:

   ```
   <config>/www/open-firenet-card.js
   ```

2. In Home Assistant: **Settings → Dashboards → ⋮ (menu) → Resources → Add
   resource**:
   - URL: `/local/open-firenet-card.js`
   - Resource type: **JavaScript module**

3. Reload Home Assistant or clear the browser cache.

## Adding the card

Edit a dashboard, **Add card**, search for **Open Firenet**, then pick the anchor
entity (default `climate.open_firenet`). You can also add the card in YAML:

```yaml
type: custom:open-firenet-card
entity: climate.open_firenet
```

## Troubleshooting

- **Card not found**: check that the resource is of type *JavaScript module* and
  that the URL matches your installation method.
- **“No Open Firenet entity found”**: the anchor entity does not exist. Check the
  name (`climate.open_firenet`) or set `entity`.
- **Empty sections**: normal if the stove or firmware does not provide those
  entities (for example, no MultiAir).
