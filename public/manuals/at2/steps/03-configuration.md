---
title: "Configuration"
prevStep: "02-flashing"
nextStep: "04-testing"
---

## Step 3: Configuration

Now that the firmware is flashed, let's configure the WiFi connection and LED settings.

### Connect to the WiFi Access Point

After flashing, the AT2 PCB creates a WiFi access point that you can connect to for initial configuration.

1. On your device (phone/computer), look for a WiFi network named `AT2-PCB-Setup`
2. Connect to it (no password required)
3. Open your web browser and navigate to `http://192.168.4.1`

### Configure WiFi Settings

You should see the AT2 configuration page. Fill in the following:

**Network Settings:**
- **WiFi SSID**: Your home WiFi network name
- **WiFi Password**: Your WiFi password
- **Static IP (optional)**: If you want a fixed IP address

**LED Settings:**
- **LED Type**: WS2812B / SK6812 / Other
- **LED Count**: Number of LEDs in your strip
- **Default Brightness**: Initial brightness level (0-255)
- **Default Color**: Initial LED color (RGB values)

Click "Save & Reboot" to apply the settings.

### Connect to Your Network

The board will restart and connect to your WiFi network. Wait about 30 seconds, then:

1. Reconnect your device to your home WiFi
2. Find the AT2's IP address (check your router's connected devices list)
3. Navigate to the AT2 web interface at its IP address

### Configure Advanced Settings (Optional)

From the web interface, you can configure:

**Lighting Modes:**
- Static color
- Rainbow effect
- Breathing effect
- Custom animations

**Automation:**
- Schedule-based lighting
- 3D printer integration
- API endpoints for custom control

**Security:**
- Set an admin password
- Configure API authentication

### Save Configuration Backup

It's a good practice to backup your configuration:

<terminal command="curl http://AT2/api/config > AT2-config.json" />

Replace `AT2_IP` with your actual IP address.

### What's Next

With configuration complete, let's proceed to the final step where we'll test the installation and verify everything works correctly!
