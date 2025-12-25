---
title: "AT2 WLED PCB"
description: "Complete guide to flash and setup AT2 WLED ESP32-based LED controller"
date: 2025-12-25
author: "Tröndle Embedded System"
modelFile: "model.glb"
---

# AT2 WLED PCB Manual

The AT2 is an ESP32-based LED controller designed for 3D printer lighting. This guide will walk you through the complete setup process including flashing the firmware, configuring the device, and testing the installation.

## What You'll Need

- AT2 PCB board
- USB-C cable
- Computer with internet access
- ESP32 firmware file

## Manual Contents

This manual contains the following steps:

1. **Overview** - Introduction and prerequisites
2. **Flashing** - How to flash the firmware to the ESP32
3. **Configuration** - Setting up the WiFi and LED configuration
4. **Testing** - Verifying the installation works correctly

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Device not found in flashing tool | Driver not installed | Install CP2102 USB driver |
| Flashing fails | Wrong firmware file | Download correct firmware version |
| WiFi not connecting | Incorrect credentials | Check SSID and password |
| LEDs not responding | Wrong LED count | Configure correct LED count in WLED |

Let's get started!