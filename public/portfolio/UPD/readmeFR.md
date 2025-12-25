---
title: "AT2 WLED PCB"
description: "Carte de contrôle quatre couches pilotant des LEDs adressables pour des retours décoratifs et fonctionnels."
modelFile: "at2.glb"
githubLink: "https://github.com/Trondle-Embedded-Systems"
shopLink: "https://www.tes-shop.ch"
date: "TBA"
---

# PCB LED de lit d'imprimante 3D AT2

Une carte de contrôle compacte à quatre couches qui se place sous le lit d'impression AT2 et pilote des LEDs adressables pour des retours décoratifs et fonctionnels.

---

## Caractéristiques principales

- **MCU ESP32-C3FH4** avec antenne PCB intégrée (Wi‑Fi + BLE)
- **Deux sorties LED indépendantes**  
  - *Chaîne du logo* (logo AT2)  
  - *Barre d'état* (progression, temps restant, alertes de température)
- **Convertisseurs de niveau 3,3 V → 5 V** sur chaque ligne de données
- **Fusible Littelfuse 3 A** sur le rail 5 V
- **Connecteurs SMD JST‑XH** pour câblage plug‑and‑play
- **Empilement 4 couches** avec plans VCC et GND dédiés pour un faible bruit

---

## Connecteurs et brochage

| Étiquette  | Type         | Description                                 |
|------------|--------------|---------------------------------------------|
| **VCC**    | JST‑XH 2 broches | Entrée d'alimentation fusible 5 V      |
| **GND**    | JST‑XH 2 broches | Entrée GND                             |
| **LED_ACT**| SMD          | LED d'état                                  |
| **BOOT1**  | Bouton SMD   | Maintenir **BOOT** bas pour le mode flash ESP32 |
| **RST1**   | Bouton MD    | Réinitialisation manuelle pour mettre la broche **EN** à la masse |

---

## Architecture de puissance

- Fonctionne à partir d'une **alimentation 5 V existante** (pas de convertisseur buck embarqué)  
- **Fusible LittleFuse 3 A** protège toute la carte

---

## Licence

Publié sous **licence MIT** – voir [`LICENSE`](LICENSE).

![AT2 PCB](./images/at2.png)
