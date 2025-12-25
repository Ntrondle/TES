---
title: "Wiring"
prevStep: "03-assembly"
nextStep: "05-installation"
---

## Step 4: Wiring

In this step, we'll prepare the wiring and crimp the JST-PH connectors to connect your MicroFlip to the printer motherboard.

### Wire Preparation

1. **Cut your wires:** Cut two lengths of 24 AWG wire. Measure the distance from your motor mounting location to the motherboard, and add an extra cm for slack.

2. **Strip the wire ends:** Using wire strippers, remove approximately 2–3 mm (⅛ inch) of insulation from each end of both wires.

3. **Tin the wire ends:** Apply a small amount of solder to the exposed wire strands. This makes crimping easier. 

### Crimping JST-PH Connectors

1. **Insert the wire:** Slide a stripped wire end into a JST-PH crimp terminal. The wire insulation should rest against the larger crimp wings, and the bare wire should extend into the smaller contact area.

2. **Crimp the terminal:** Make sure to use the appropriate crimp.

3. **Inspect the crimp:** Gently tug on the wire to ensure it's secure. The crimp should not slide off or feel loose.

4. **Repeat:** Crimp a terminal onto each wire end (4 crimps total if both ends need connectors).

### Inserting Terminals into Housing

1. **Orient the terminal:** The locking tab on the crimp terminal should face the same direction as the latch on the JST-PH housing.

2. **Insert the terminal:** Push the terminal into the housing until you hear or feel a click. The locking tab should engage with the housing.

3. **Verify the connection:** Gently pull on the wire to confirm the terminal is locked in place.

4. **Repeat for the second wire:** Insert the second terminal into the adjacent slot, maintaining correct polarity.

### Pinout Reference

| MicroFlip Pad | Wire Color (suggested) | Motherboard Pin |
|---------------|------------------------|-----------------|
| OUT +         | Red                    | Motor + / VCC   |
| OUT −         | Black                  | Motor − / GND   |

> **Note:** Refer to your specific printer motherboard documentation for the correct motor output pins.

### Testing the Connection

Before final installation, verify your wiring:

1. **Visual inspection:** Check all solder joints and crimps for quality.
2. **Continuity test:** Use a multimeter to confirm continuity from the MicroFlip output pads to the JST-PH connector pins.
3. **Polarity check:** Double-check that positive and negative connections are consistent throughout.

### Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Terminal won't lock in housing | Wrong orientation | Rotate terminal 180° and reinsert |
| Wire pulls out of crimp | Insufficient crimp pressure | Re-crimp with a new terminal |
| No continuity | Bad solder joint or crimp | Inspect and redo the faulty connection |
| Motor runs backward | Reversed polarity | Swap the two wires at either end |

### What's Next

With your wiring complete, we'll move on to installing the MicroFlip assembly into your printer and connecting it to the motherboard.