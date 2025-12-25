---
title: "Assembly"
prevStep: "02-safety"
nextStep: "04-wiring"
---

## Step 3: Assembly

In this step, we'll solder the MicroFlip PCB to your N20 motor and prepare it for wiring.

### Preparing the N20 Motor

1. Inspect your N20 motor leads. Ensure they are clean and free of debris or oxidation.
2. If necessary, lightly tin the motor leads with a small amount of solder to improve adhesion.
3. Identify the positive (+) and negative (−) terminals on your motor.

### Soldering the MicroFlip PCB

1. **Position the PCB:** Align the MicroFlip PCB with the motor leads. The solder pads on the PCB should line up with the motor terminals.

2. **Secure the motor:** Use a helping hands tool or tape to hold the motor steady while soldering.

3. **Heat the joint:** Place your soldering iron tip so it touches both the PCB pad and the motor lead simultaneously.

4. **Apply solder:** Feed a small amount of solder into the joint. The solder should flow smoothly onto both surfaces.

5. **Repeat for the second lead:** Solder the remaining motor lead to its corresponding pad.

6. **Inspect your work:** Check that both joints are shiny and have good solder coverage. There should be no cold joints (dull, grainy appearance) or solder bridges between pads.

### Quality Check

After soldering, verify the following:

- **Mechanical stability:** Gently wiggle the PCB to ensure the solder joints are secure. Do not apply excessive force.
- **Continuity:** If you have a multimeter, check for electrical continuity between the motor leads and the PCB pads.
- **No shorts:** Confirm there are no solder bridges or stray solder connecting unintended pads.

you can find below what an optimal microflip assembly should look like :

<div className="manual-3d-container" data-model="/manuals/microflip/solderedmf.glb" data-annotations='[{"position": {"x": -1.637, "y": -0.071, "z": 1.399}, "offset": 2.0, "direction": "up", "label": "Solder Pad", "color": "#FF0000", "labelSize": 2}]' data-camera='{"x": -9.61, "y": 0.99, "z": 10.44}' data-position="up"></div>

### Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Cold or dull joint | Insufficient heat | Reheat the joint and add fresh solder |
| Solder won't stick | Oxidized surfaces | Clean the pad/lead and apply flux |
| PCB moves or wobbles | Weak joint | Reflow the solder connection |
| Motor doesn't spin | Open connection | Check continuity and re-solder if needed |

### What's Next

With the MicroFlip PCB soldered to your motor, we'll move on to preparing the wiring and JST-PH connectors.