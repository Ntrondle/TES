---
title: "Flashing Firmware"
prevStep: "01-overview"
nextStep: "03-configuration"
---

## Step 2: Flashing Firmware

Now we'll flash the WLED firmware onto your AT2 board. Follow these steps carefully.

### Locate Flash Button

First, you need to identify the BOOT/RESET button on the AT2 board. This button is used to put the ESP32 into flashing mode.

The flash button is located on the bottom side of the board, reference to the 3d model below.

<div className="manual-3d-container" data-model="/TES/manuals/at2/model.glb" data-annotations='[{"targetObject": "SW-SMD_L39-W30-P445~SW-SMD_L39-W29-H20-LS48~B49X", "offset": 2.0, "direction": "up", "label": "BOOT Button", "color": "#FF0000", "arrowOffset": {"x": 0, "y": 0, "z": -0.5}, "labelSize": 1.5}]' data-camera='{"x": -0.24, "y": 3.55, "z": -15.31}'></div>

### Method 1: Using esptool.py (Recommended)

**Step 1: Connect Board**

Connect your AT2 board to your computer using a USB-C cable.

**Step 2: Identify Serial Port**

Find the serial port where your ESP32 is connected:

<terminal command="esptool.py list_ports" />

You should see a device listed. Note down the port name (e.g., `COM3` on Windows, `/dev/ttyUSB0` on Linux, `/dev/tty.usbserial-xxx` on macOS).

**Step 3: Put Board in Boot Mode**

1. Hold down the **BOOT button**
2. While holding BOOT, press and release the **RESET button**
3. Release the BOOT button

The board is now in flashing mode.

**Step 4: Flash Firmware**

Navigate to the directory where you downloaded the firmware and run the following command:

<terminal command="esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 microflip-firmware.bin" />

For Linux/macOS, use:

<terminal command="esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 460800 write_flash -z 0x1000 microflip-firmware.bin" />

Replace `COM3` or `/dev/ttyUSB0` with your actual serial port, and `microflip-firmware.bin` with your firmware filename.

**Step 5: Verify Flash**

If successful, you'll see output indicating the flash completed successfully. The board will automatically reset and boot with the new firmware.

### Method 2: Web Flasher (Alternative)

If you prefer a graphical interface, you can use a web-based ESP flasher:

1. Put the board in boot mode (as described above)
2. Visit [ESP Web Flasher](https://webflasher.esptool.io/)
3. Connect via the web interface
4. Upload your firmware file
5. Click "Flash"

This method is easier for beginners but requires the board to be in boot mode first.

### Troubleshooting

**"Failed to connect" error:**
- Make sure you're holding the BOOT button when you press RESET
- Try a different USB cable (some cables are power-only)
- Check that the board is receiving power (LED should be on)

**"Permission denied" error (Linux/macOS):**

<terminal command="sudo chmod 666 /dev/ttyUSB0" />

**Port not detected:**
- Install CP2102/CH340 USB drivers if needed
- Try a different USB port

### What's Next

Once you've successfully flashed the firmware, proceed to the next step where we'll configure WiFi and LED settings!