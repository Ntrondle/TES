---
title: "AT2 WLED PCB"
description: "Vierlagige Steuerungsplatine zum Ansteuern adressierbarer LEDs für dekorative und funktionale Rückmeldungen."
modelFile: "at2.glb"
githubLink: "https://github.com/Trondle-Embedded-Systems"
shopLink: "https://tes-shop.ch"
date: "TBA"
---

# AT2 3D-Drucker LED-Bett-PCB

Eine kompakte, vierlagige Steuerungsplatine, die unter dem AT2-Druckbett sitzt und adressierbare LEDs für dekorative und funktionale Rückmeldungen ansteuert.

---

## Hauptmerkmale

- **ESP32-C3FH4** MCU mit integrierter PCB-Antenne (Wi‑Fi + BLE)
- **Zwei unabhängige LED-Ausgänge**  
  - *Logo-Kette* (AT2-Logo)  
  - *Statusleiste* (Fortschritt, verbleibende Zeit, Temperaturwarnungen)
- **3,3 V → 5 V Pegelwandler** auf jeder Datenleitung
- **3 A Littelfuse** auf der 5 V Schiene
- **SMD JST‑XH-Steckverbinder** für Plug‑and‑Play-Verkabelung
- **4-Lagen-Aufbau** mit dedizierten VCC- und GND-Ebenen für geringes Rauschen

---

## Anschlüsse & Pin-Belegung

| Bezeichnung | Typ          | Beschreibung                                |
|-------------|--------------|---------------------------------------------|
| **VCC**     | 2-poliger JST‑XH | 5 V gesicherte Versorgungseingabe      |
| **GND**     | 2-poliger JST‑XH | GND-Eingang                            |
| **LED_ACT** | SMD          | Status-LED                                  |
| **BOOT1**   | SMD-Taste    | **BOOT** niedrig halten für ESP32-Flash-Modus |
| **RST1**    | MD-Taste     | Manueller Reset zum Erden des **EN**-Pins   |

---

## Stromarchitektur

- Betrieb über eine **vorhandene 5 V Versorgung** (kein eingebauter Buck-Wandler)  
- **3 A LittleFuse** schützt die gesamte Platine

---

## Lizenz

Veröffentlicht unter der **MIT-Lizenz** – siehe [`LICENSE`](LICENSE).

![AT2 PCB](./images/at2.png)
