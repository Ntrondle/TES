---
title: "Firmware flashen"
prevStep: "01-overview"
nextStep: "03-configuration"
---

## Schritt 2: Firmware flashen

Jetzt flashen wir die WLED-Firmware auf Ihre AT2-Platine. Befolgen Sie diese Schritte sorgfältig.

### Flash-Taste lokalisieren

Zuerst müssen Sie die BOOT/RESET-Taste auf der AT2-Platine identifizieren. Diese Taste wird verwendet, um den ESP32 in den Flash-Modus zu versetzen.

Die Flash-Taste befindet sich auf der Unterseite der Platine, siehe 3D-Modell unten.

<div className="manual-3d-container" data-model="/manuals/at2/model.glb" data-annotations='[{"targetObject": "SW-SMD_L39-W30-P445~SW-SMD_L39-W29-H20-LS48~B49X", "offset": 2.0, "direction": "up", "label": "BOOT-Taste", "color": "#FF0000", "arrowOffset": {"x": 0, "y": 0, "z": -0.5}, "labelSize": 1.5}]' data-camera='{"x": -0.24, "y": 3.55, "z": -15.31}'></div>

### Methode 1: Mit esptool.py (Empfohlen)

**Schritt 1: Platine anschließen**

Verbinden Sie Ihre AT2-Platine mit einem USB-C-Kabel mit Ihrem Computer.

**Schritt 2: Seriellen Port identifizieren**

Finden Sie den seriellen Port, an dem Ihr ESP32 angeschlossen ist:

<terminal command="esptool.py list_ports" />

Sie sollten ein aufgelistetes Gerät sehen. Notieren Sie sich den Portnamen (z.B. `COM3` unter Windows, `/dev/ttyUSB0` unter Linux, `/dev/tty.usbserial-xxx` unter macOS).

**Schritt 3: Platine in den Boot-Modus versetzen**

1. Halten Sie die **BOOT-Taste** gedrückt
2. Drücken Sie bei gedrückter BOOT-Taste die **RESET-Taste** und lassen Sie sie los
3. Lassen Sie die BOOT-Taste los

Die Platine befindet sich jetzt im Flash-Modus.

**Schritt 4: Firmware flashen**

Navigieren Sie zum Verzeichnis, in dem Sie die Firmware heruntergeladen haben, und führen Sie den folgenden Befehl aus:

<terminal command="esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 AT2-firmware.bin" />

Für Linux/macOS verwenden Sie:

<terminal command="esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 460800 write_flash -z 0x1000 at2-firmware.bin" />

Ersetzen Sie `COM3` oder `/dev/ttyUSB0` durch Ihren tatsächlichen seriellen Port und `at2-firmware.bin` durch Ihren Firmware-Dateinamen.

**Schritt 5: Flash überprüfen**

Wenn erfolgreich, sehen Sie eine Ausgabe, die angibt, dass der Flash erfolgreich abgeschlossen wurde. Die Platine wird automatisch zurückgesetzt und mit der neuen Firmware booten.

### Methode 2: Web Flasher (Alternative)

Wenn Sie eine grafische Oberfläche bevorzugen, können Sie einen webbasierten ESP-Flasher verwenden:

1. Versetzen Sie die Platine in den Boot-Modus (wie oben beschrieben)
2. Besuchen Sie [ESP Web Flasher](https://webflasher.esptool.io/)
3. Verbinden Sie sich über die Weboberfläche
4. Laden Sie Ihre Firmware-Datei hoch
5. Klicken Sie auf "Flash"

Diese Methode ist einfacher für Anfänger, erfordert jedoch, dass die Platine zuerst im Boot-Modus ist.

### Fehlerbehebung

**Fehler "Failed to connect":**
- Stellen Sie sicher, dass Sie die BOOT-Taste gedrückt halten, wenn Sie RESET drücken
- Probieren Sie ein anderes USB-Kabel (einige Kabel sind nur für Stromversorgung)
- Überprüfen Sie, dass die Platine Strom erhält (LED sollte eingeschaltet sein)

**Fehler "Permission denied" (Linux/macOS):**

<terminal command="sudo chmod 666 /dev/ttyUSB0" />

**Port nicht erkannt:**
- Installieren Sie CP2102/CH340 USB-Treiber, falls erforderlich
- Probieren Sie einen anderen USB-Port

### Was kommt als Nächstes

Sobald Sie die Firmware erfolgreich geflasht haben, fahren Sie mit dem nächsten Schritt fort, in dem wir WiFi und LED-Einstellungen konfigurieren werden!