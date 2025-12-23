# AT2 3D Printer LED Bed PCB

A compact, four‑layer control board that sits beneath the AT2 print bed and drives addressable LEDs for decorative and functional feedback.

---

<p align="center">
  <img src="Docs/Images/render.png" alt="render">
</p>

## Key Features

- **ESP32-C3FH4** MCU with integrated PCB antenna (Wi‑Fi + BLE)
- **Two independent LED outputs**  
  - *Logo chain* (AT2 logo)  
  - *Status bar* (progress, time remaining, temperature alerts)
- **3.3 V → 5 V level‑shifters** on each data line
- **3 A Littelfuse** on the 5 V rail
- **SMD JST‑XH connectors** for plug‑and‑play wiring
- **4‑layer stack‑up** with dedicated VCC & GND planes for low noise

<p align="center">
  <img src="Docs/Images/render_bottom.png" alt="render">
</p>


---

## Board Stack‑up

1. **Top** — signals & components  
2. **Inner 1** — solid **VCC** plane (LED rail)  
3. **Inner 2** — solid **GND** plane  
4. **Bottom** — signals & components  

---

## Connectors & Pin‑out

| Label      | Type         | Description                                 |
|------------|--------------|---------------------------------------------|
| **VCC**    | 2‑pin JST‑XH | 5 V fused supply input                      |
| **GND**    | 2‑pin JST‑XH | GND Input                                   |
| **LED_ACT**| SMD          | Status LED                                  |
| **BOOT1**  | SMD button   | Hold **BOOT** low for ESP32 flash mode      |
| **RST1**   | MD button    | Manual reset to ground the **EN** pin       |

---

## Power Architecture

- Operates from an **existing 5 V supply** (no on‑board buck converter)  
- **3 A  LittleFuse** protects the entire board

### Worst‑Case LED Current Budget

```
Device: WS2812B‑MINI‑V3 (RGB)
Max current per LED @ full‑white ≈ 60 mA
LED count:                   × 44
-----------------------------------
Total worst‑case:           ≈ 2.6 A
Design headroom → 3 A fuse
```

---

## Firmware (TBD)

TBD by AT

---

## Mounting Guidelines

1. Slide the PCB into the printer’s mounting slot.  
2. Secure with **one M3 screw**.  
3. Maintain antenna keep‑out clearance and route power cables away from the ESP32 area.

---

## Safety Notes

- Use **AWG‑22** (or larger) wire for runs > 50 cm at ≤ 3 A.  
- Replace the fuse **only** with the same rating.  
- Inspect connectors periodically for heat discoloration.

---

## Roadmap / TODO

- Example animations for logo & status bar  
- WebSocket API & OTA firmware updates  

---

## License

Released under the **MIT License** – see [`LICENSE`](LICENSE).

<p align="center">
  <img src="Docs/Images/AT2 v2.png" alt="render">
</p>

---

*Made with ❤️ by **Nicolas Tröndle** (ArmoredTurtle / Tröndle Embedded Systems).*

