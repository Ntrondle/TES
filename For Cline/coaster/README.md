# Prusa HeatBed Tile PCB

A compact, ESP32-S3 based control PCB designed for **Prusa-style heated bed tile coasters**. It supports USB-C Power Delivery input and integrates weight detection using a Hall effect sensor for interactive beverage detection.

<p align="center">
  <img src="Docs/Image_render/front.png" alt="PCB front render">
  <br>
  <img src="Docs/Image_render/back.png" alt="PCB back render">
</p>

---

## Key Features

- **ESP32-S3-WROOM-1-N8** microcontroller with Wi-Fi and Bluetooth LE
- **USB-C Power Delivery input (CH221K)** negotiates up to 20 V
- **5 V buck converter (AP3503)** powers downstream electronics
- **3.3 V LDO (AP2112K)** powers ESP32 logic
- **Hall effect sensor (DRV5032FAQDBZR)** detects vertical movement of platform due to added weight
- **Logic-level MOSFET (HY1904C2)** to control power output to the heating tile
- **Buttons for RST and BOOT**
- **Test pads and UART breakout for programming/debugging**

---

## How It Works

When a beverage (like a cup of tea) is placed on the coaster, the weight causes the platform to compress slightly. This vertical motion brings a magnet closer to the Hall effect sensor mounted on the bottom of the PCB. When the magnetic polarity aligns properly, the Hall sensor outputs a signal indicating the presence of the cup.

This mechanism allows the PCB to detect when a beverage is placed, enabling smart behaviors such as timed heating or status indication.

---

## Power Architecture

| Voltage | Purpose | IC |
|---------|---------|----|
| 20 V | Input via USB-C PD | CH221K |
| 5 V | Buck-converted output for accessories | AP3503 |
| 3.3 V | ESP32 core logic | AP2112K |

---

## Connectors

- **USB-C port** (PD source)
- **Prusa Tile Connector** (4-pin Molex)
- **UART test pads** for flashing
- **MOSFET output (controlled)**

---

## Getting Started

Flash firmware using the USB-to-UART interface connected to the ESP32-S3. Press **BOOT** and tap **RST** to enter download mode.

```bash
idf.py set-target esp32s3
idf.py build
idf.py -p /dev/ttyUSB0 flash monitor
```

---

## License

Released under the **MIT License** – see [`LICENSE`](LICENSE).

---

*Made with ❤️ by Nicolas Tröndle.*
