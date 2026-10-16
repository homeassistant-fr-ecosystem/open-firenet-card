# Installation détaillée

## Via HACS

1. Assurez-vous que [HACS](https://hacs.xyz) est installé.
2. Ouvrez HACS, onglet **Tableau de bord** (Dashboard / Frontend), puis le menu
   ⋮ en haut à droite → **Dépôts personnalisés**.
3. Ajoutez `https://github.com/openfirenet/open-firenet-card` et choisissez la
   catégorie **Lovelace / Dashboard**.
4. Recherchez **Open Firenet Card** dans la liste et cliquez **Télécharger**.
5. HACS ajoute la ressource automatiquement. Vérifiez dans
   **Paramètres → Tableaux de bord → ⋮ → Ressources** la présence de :
   - URL : `/hacsfiles/open-firenet-card/dist/open-firenet-card.js`
   - Type : **Module JavaScript**
6. Videz le cache du navigateur (Ctrl+F5 / Cmd+Shift+R).

## Manuellement

1. Téléchargez la dernière version (ou récupérez `dist/open-firenet-card.js` du
   dépôt) et copiez-le dans `<config>/www/` :

   ```
   <config>/www/open-firenet-card.js
   ```

2. Dans Home Assistant : **Paramètres → Tableaux de bord → ⋮ (menu) → Ressources
   → Ajouter une ressource** :
   - URL : `/local/open-firenet-card.js`
   - Type de ressource : **Module JavaScript**

3. Rechargez Home Assistant ou videz le cache du navigateur.

## Ajouter la carte

Éditez un tableau de bord, **Ajouter une carte**, recherchez **Open Firenet**,
puis choisissez l'entité ancre (par défaut `climate.open_firenet`). Vous pouvez
aussi ajouter la carte en YAML :

```yaml
type: custom:open-firenet-card
entity: climate.open_firenet
```

## Dépannage

- **Carte introuvable** : vérifiez que la ressource est bien de type *Module
  JavaScript* et que l'URL correspond à votre mode d'installation.
- **« Aucune entité Open Firenet trouvée »** : l'entité ancre n'existe pas.
  Vérifiez le nom (`climate.open_firenet`) ou renseignez `entity`.
- **Sections vides** : normal si le poêle ou le firmware ne fournit pas ces
  entités (par exemple pas de MultiAir).
