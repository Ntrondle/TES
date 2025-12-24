---
title: "PCB Prusa HeatBed Tile"
description: "Contrôleur de lit chauffant avec entrée USB-C Power Delivery et capteur à effet Hall pour la détection interactive de boissons."
modelFile: coaster.glb
date: "TBA"
---

# PCB Prusa HeatBed Tile

Un PCB de contrôle compact basé sur ESP32-S3, conçu pour les **sous-verres de tuiles de lit chauffant de style Prusa**. Il prend en charge l'entrée USB-C Power Delivery et intègre la détection de poids à l'aide d'un capteur à effet Hall pour la détection interactive de boissons.

---

## Caractéristiques principales

- **Microcontrôleur ESP32-S3-WROOM-1-N8** avec Wi-Fi et Bluetooth LE
- **Entrée USB-C Power Delivery (CH221K)** négocie jusqu'à 20 V
- **Convertisseur buck 5 V (AP3503)** alimente l'électronique en aval
- **LDO 3,3 V (AP2112K)** alimente la logique ESP32
- **Capteur à effet Hall (DRV5032FAQDBZR)** détecte le mouvement vertical de la plateforme dû au poids ajouté
- **MOSFET niveau logique (HY1904C2)** pour contrôler la sortie de puissance vers la tuile chauffante
- **Boutons pour RST et BOOT**
- **Points de test et breakout UART pour la programmation/débogage**

---

## Comment ça fonctionne

Lorsqu'une boisson (comme une tasse de thé) est placée sur le sous-verre, le poids fait que la plateforme se compresse légèrement. Ce mouvement vertical rapproche un aimant du capteur à effet Hall monté sur le dessous du PCB. Lorsque la polarité magnétique s'aligne correctement, le capteur Hall émet un signal indiquant la présence de la tasse.

Ce mécanisme permet au PCB de détecter lorsqu'une boisson est placée, permettant des comportements intelligents tels que le chauffage programmé ou l'indication d'état.

---

## Architecture de puissance

| Tension | Objectif | CI |
|---------|----------|----|
| 20 V | Entrée via USB-C PD | CH221K |
| 5 V | Sortie convertie par buck pour accessoires | AP3503 |
| 3,3 V | Logique de base ESP32 | AP2112K |

---

## Connecteurs

- **Port USB-C** (source PD)
- **Connecteur Prusa Tile** (Molex 4 broches)
- **Points de test UART** pour le flashage
- **Sortie MOSFET (contrôlée)**
