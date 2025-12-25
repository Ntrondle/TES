---
title: "Konfiguration"
prevStep: "02-flashing"
nextStep: "04-testing"
---

## Schritt 3: Konfiguration

Da die Firmware geflasht ist, konfigurieren wir nun die WiFi-Verbindung und LED-Einstellungen.

### Mit dem WiFi-Zugangspunkt verbinden

Nach dem Flashen erstellt die AT2-Platine einen WiFi-Zugangspunkt, zu dem Sie sich für die Erstkonfiguration verbinden können.

1. Suchen Sie auf Ihrem Gerät (Telefon/Computer) nach einem WiFi-Netzwerk mit dem Namen `AT2-PCB-Setup`
2. Verbinden Sie sich damit (kein Passwort erforderlich)
3. Öffnen Sie Ihren Webbrowser und navigieren Sie zu `http://192.168.4.1`

### WiFi-Einstellungen konfigurieren

Sie sollten die AT2-Konfigurationsseite sehen. Füllen Sie Folgendes aus:

**Netzwerkeinstellungen:**
- **WiFi SSID**: Ihr Heim-WLAN-Netzwerkname
- **WiFi-Passwort**: Ihr WiFi-Passwort
- **Statische IP (optional)**: Wenn Sie eine feste IP-Adresse möchten

**LED-Einstellungen:**
- **LED-Typ**: WS2812B / SK6812 / Anderer
- **LED-Anzahl**: Anzahl der LEDs in Ihrem Streifen
- **Standardhelligkeit**: Anfangshelligkeitsstufe (0-255)
- **Standardfarbe**: Anfangs-LED-Farbe (RGB-Werte)

Klicken Sie auf "Speichern & Neustart", um die Einstellungen anzuwenden.

### Mit Ihrem Netzwerk verbinden

Die Platine wird neu gestartet und verbindet sich mit Ihrem WiFi-Netzwerk. Warten Sie etwa 30 Sekunden, dann:

1. Verbinden Sie Ihr Gerät erneut mit Ihrem Heim-WLAN
2. Finden Sie die IP-Adresse der AT2 (prüfen Sie die Liste der verbundenen Geräte Ihres Routers)
3. Navigieren Sie zur AT2-Weboberfläche unter ihrer IP-Adresse

### Erweiterte Einstellungen konfigurieren (Optional)

Über die Weboberfläche können Sie konfigurieren:

**Beleuchtungsmodi:**
- Statische Farbe
- Regenbogeneffekt
- Atmungseffekt
- Benutzerdefinierte Animationen

**Automatisierung:**
- Zeitplankonfigurierte Beleuchtung
- 3D-Drucker-Integration
- API-Endpunkte für benutzerdefinierte Steuerung

**Sicherheit:**
- Ein Admin-Passwort festlegen
- API-Authentifizierung konfigurieren

### Konfigurationssicherung speichern

Es ist gute Praxis, Ihre Konfiguration zu sichern:

<terminal command="curl http://AT2/api/config > AT2-config.json" />

Ersetzen Sie `AT2_IP` durch Ihre tatsächliche IP-Adresse.

### Was kommt als Nächstes

Mit der abgeschlossenen Konfiguration fahren wir mit dem letzten Schritt fort, in dem wir die Installation testen und überprüfen, dass alles korrekt funktioniert!