---
title: "Prusa HeatBed Tile PCB"
description: "Heizbett-Controller mit USB-C Power Delivery Eingang und Hall-Effekt-Sensor für interaktive Getränkeerkennung."
modelFile: coaster.glb
date: "TBA"
---

# Prusa HeatBed Tile PCB

Eine kompakte, ESP32-S3-basierte Steuerungs-PCB, entwickelt für **Prusa-Stil Heizbett-Kachel-Untersetzer**. Sie unterstützt USB-C Power Delivery Eingang und integriert Gewichtserkennung mittels eines Hall-Effekt-Sensors für interaktive Getränkeerkennung.

---

## Hauptmerkmale

- **ESP32-S3-WROOM-1-N8** Mikrocontroller mit Wi-Fi und Bluetooth LE
- **USB-C Power Delivery Eingang (CH221K)** verhandelt bis zu 20 V
- **5 V Buck-Wandler (AP3503)** versorgt nachgelagerte Elektronik
- **3,3 V LDO (AP2112K)** versorgt ESP32-Logik
- **Hall-Effekt-Sensor (DRV5032FAQDBZR)** erkennt vertikale Bewegung der Plattform durch hinzugefügtes Gewicht
- **Logikpegel-MOSFET (HY1904C2)** zur Steuerung der Leistungsabgabe an die Heizkachel
- **Tasten für RST und BOOT**
- **Testpunkte und UART-Breakout für Programmierung/Debugging**

---

## Funktionsweise

Wenn ein Getränk (wie eine Tasse Tee) auf den Untersetzer gestellt wird, führt das Gewicht dazu, dass sich die Plattform leicht zusammendrückt. Diese vertikale Bewegung bringt einen Magneten näher an den Hall-Effekt-Sensor, der auf der Unterseite der PCB montiert ist. Wenn sich die magnetische Polarität richtig ausrichtet, gibt der Hall-Sensor ein Signal aus, das die Anwesenheit der Tasse anzeigt.

Dieser Mechanismus ermöglicht es der PCB zu erkennen, wann ein Getränk platziert wird, und ermöglicht intelligente Verhaltensweisen wie zeitgesteuertes Heizen oder Statusanzeige.

---

## Stromarchitektur

| Spannung | Zweck | IC |
|----------|-------|----|
| 20 V | Eingang über USB-C PD | CH221K |
| 5 V | Buck-gewandelte Ausgabe für Zubehör | AP3503 |
| 3,3 V | ESP32-Kernlogik | AP2112K |

---

## Anschlüsse

- **USB-C-Port** (PD-Quelle)
- **Prusa Tile Connector** (4-poliger Molex)
- **UART-Testpunkte** zum Flashen
- **MOSFET-Ausgang (gesteuert)**
