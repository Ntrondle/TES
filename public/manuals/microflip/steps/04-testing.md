---
title: "Testing"
prevStep: "03-configuration"
---

## Step 4: Testing and Verification

Congratulations on reaching the final step! Let's verify that everything is working correctly.

### Basic LED Test

Let's test the basic LED functionality using the web interface.

**Test 1: Solid Color**
1. Open the Microflip web interface
2. Navigate to the "Control" tab
3. Select a color (e.g., red: R=255, G=0, B=0)
4. Click "Apply"
5. Verify your LED strip shows the selected color

**Test 2: Brightness Control**
1. Adjust the brightness slider to 50%
2. Observe the LEDs dim
3. Set brightness to 100% and verify full brightness

**Test 3: Lighting Modes**
1. Try different lighting modes from the dropdown
2. Test "Rainbow" mode - should cycle through colors
3. Test "Breathing" mode - should pulse on and off

### API Testing

Let's verify the API endpoints work correctly:

<terminal command="curl http://MICROFLIP_IP/api/status" />

Expected response:
```json
{
  "status": "ok",
  "wifi": "connected",
  "led_count": 60,
  "brightness": 255
}
```

Test setting a color via API:

<terminal command="curl -X POST http://MICROFLIP_IP/api/set_color -H 'Content-Type: application/json' -d '{"r": 0, "g": 255, "b": 0}'" />

Your LEDs should turn green.

### 3D Printer Integration Test

If you're using the Microflip with a 3D printer, test the printer integration:

**Klipper Integration:**
1. Add the Microflip configuration to your Klipper config
2. Restart Klipper
3. Send a test command:
   ```bash
   SET_LED LED=led_color RED=255 GREEN=0 BLUE=0
   ```
4. Verify the LEDs respond

**PrusaSlicer / Cura Integration:**
1. Configure the post-processing script
2. Slice a test model
3. Export the G-code
4. Verify the LED commands are present

### Performance Test

Test the system under load:

**Rapid Color Changes:**
1. Use the web interface or API to cycle through colors quickly
2. Monitor for any lag or missed commands

**WiFi Stability:**
1. Monitor the connection for 10-15 minutes
2. Check that the board stays connected
3. Verify no disconnections occur

### Troubleshooting

**LEDs not responding:**
- Check that the LED strip is properly connected
- Verify the LED type matches your strip (WS2812B vs SK6812)
- Check the data line connection

**WiFi connection issues:**
- Verify your WiFi password is correct
- Check that the board is within range of your router
- Try using a static IP address

**API not responding:**
- Verify you're using the correct IP address
- Check that the board is connected to WiFi
- Try accessing via the web interface

### Success Checklist

Before concluding the setup, verify:

- [ ] LEDs display colors correctly
- [ ] Brightness control works
- [ ] Lighting modes function properly
- [ ] WiFi connection is stable
- [ ] API endpoints respond correctly
- [ ] 3D printer integration (if applicable) works
- [ ] Configuration is backed up

### Next Steps

Congratulations! You've successfully set up your Microflip LED controller. Here are some next steps:

1. **Explore Advanced Features**: Try out custom animations and automation
2. **Integrate with Home Assistant**: Add to your smart home setup
3. **Create Custom Effects**: Write your own LED scripts
4. **Join the Community**: Share your projects and get help

### Support

If you encounter any issues or have questions:
- Check the GitHub repository for common issues
- Open an issue on GitHub for bugs
- Join our Discord community for help

Thank you for using Microflip!
