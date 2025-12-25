---
title: "Overview"
nextStep: "02-flashing"
---

## Step 1: Overview and Prerequisites

Welcome to the AT2 setup guide! This manual will walk you through the complete process of setting up your AT2 ESP32-based LED controller.

### What is AT2?

TESTSETESTEST

### Prerequisites

Before we begin, make sure you have:

**Hardware:**
- AT2 PCB board
- USB-C cable (for power and data)
- 5V power supply or USB port
- LED strips compatible with your setup

**Software:**
- Python 3.7 or higher installed
- `esptool` installed on your system
- ESP32 firmware file (download from the repository)

**System Requirements:**
- Windows 10/11, macOS, or Linux
- Internet connection for initial setup

### Installing esptool

`esptool` is the utility we'll use to flash the ESP32. Install it using pip:

<terminal command="pip install esptool" />

### Verify Your Setup

To verify everything is ready, check your esptool version:

<terminal command="esptool.py version" />

You should see version information displayed.

### What's Next

In the next step, we'll walk through the flashing process, including:
- Connecting the AT2 PCB to your computer
- Putting the board into boot mode
- Flashing the firmware using esptool
- Alternative web-based flashing method

When you're ready, proceed to the next step!
