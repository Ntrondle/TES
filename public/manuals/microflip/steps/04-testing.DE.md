---
title: "Testen"
prevStep: "03-configuration"
---

## Schritt 4: Testen und Überprüfung

Herzlichen Glückwunsch zum Erreichen des letzten Schrittes! Lassen Sie uns überprüfen, dass alles korrekt funktioniert.

### Grundlegender LED-Test

Lassen Sie uns die grundlegende LED-Funktionalität über die Weboberfläche testen.

**Test 1: Einfarbige Anzeige**
1. Öffnen Sie die Microflip-Weboberfläche
2. Navigieren Sie zum Tab "Steuerung"
3. Wählen Sie eine Farbe (z.B. rot: R=255, G=0, B=0)
4. Klicken Sie auf "Anwenden"
5. Überprüfen Sie, dass Ihr LED-Streifen die ausgewählte Farbe anzeigt

**Test 2: Helligkeitssteuerung**
1. Stellen Sie den Helligkeitsregler auf 50%
2. Beobachten Sie, wie die LEDs dimmen
3. Stellen Sie die Helligkeit auf 100% und überprüfen Sie die volle Helligkeit

**Test 3: Beleuchtungsmodi**
1. Probieren Sie verschiedene Beleuchtungsmodi aus dem Dropdown-Menü
2. Testen Sie den "Regenbogen"-Modus - sollte Farben durchlaufen
3. Testen Sie den "Atmungs"-Modus - sollte pulsieren

### API-Test

Lassen Sie uns überprüfen, ob die API-Endpunkte korrekt funktionieren:

<terminal command="curl http://MICROFLIP_IP/api/status" />

Erwartete Antwort:
```json
{
  "status": "ok",
  "wifi": "connected",
  "led_count": 60,
  "brightness": 255
}
```

Testen Sie das Einstellen einer Farbe über API:

<terminal command="curl -X POST http://MICROFLIP_IP/api/set_color -H 'Content-Type: application/json' -d '{"r": 0, "g": 255, "b": 0}'" />

Ihre LEDs sollten grün werden.

### 3D-Drucker-Integrationstest

Wenn Sie den Microflip mit einem 3D-Drucker verwenden, testen Sie die Druckerintegration:

**Klipper-Integration:**
1. Fügen Sie die Microflip-Konfiguration zu Ihrer Klipper-Konfiguration hinzu
2. Starten Sie Klipper neu
3. Senden Sie einen Testbefehl:
   ```bash
   SET_LED LED=led_color RED=255 GREEN=0 BLUE=0
   ```
4. Überprüfen Sie, ob die LEDs reagieren

**PrusaSlicer / Cura-Integration:**
1. Konfigurieren Sie das Nachbearbeitungsskript
2. Slicen Sie ein Testmodell
3. Exportieren Sie den G-Code
4. Überprüfen Sie, ob die LED-Befehle vorhanden sind

### Leistungstest

Testen Sie das System unter Last:

**Schnelle Farbänderungen:**
1. Verwenden Sie die Weboberfläche oder API, um schnell durch Farben zu wechseln
2. Überwachen Sie auf Verzögerungen oder verpasste Befehle

**WiFi-Stabilität:**
1. Überwachen Sie die Verbindung für 10-15 Minuten
2. Überprüfen Sie, dass die Plattine verbunden bleibt
3. Stellen Sie sicher, dass keine Verbindungsabbrüche auftreten

### Fehlerbehebung

**LEDs reagieren nicht:**
- Überprüfen Sie, dass der LED-Streifen ordnungsgemäß verbunden ist
- Stellen Sie sicher, dass der LED-Typ mit Ihrem Streifen übereinstimmt (WS2812B vs SK6812)
- Überprüfen Sie die Datenleitung-Verbindung

**WiFi-Verbindungsprobleme:**
- Stellen Sie sicher, dass Ihr WiFi-Passwort korrekt ist
- Überprüfen Sie, dass die Plattine in Reichweite Ihres Routers ist
- Versuchen Sie, eine statische IP-Adresse zu verwenden

**API antwortet nicht:**
- Stellen Sie sicher, dass Sie die richtige IP-Adresse verwenden
- Überprüfen Sie, dass die Plattine mit WiFi verbunden ist
- Versuchen Sie, über die Weboberfläche zuzugreifen

### Erfolgs-Checkliste

Bevor Sie die Einrichtung abschließen, überprüfen Sie:

- [ ] LEDs zeigen Farben korrekt an
- [ ] Helligkeitssteuerung funktioniert
- [ ] Beleuchtungsmodi funktionieren ordnungsgemäß
- [ ] WiFi-Verbindung ist stabil
- [ ] API-Endpunkte antworten korrekt
- [ ] 3D-Drucker-Integration (falls zutreffend) funktioniert
- [ ] Konfiguration ist gesichert

### Nächste Schritte

Herzlichen Glückwunsch! Sie haben Ihren Microflip-LED-Controller erfolgreich eingerichtet. Hier sind einige nächste Schritte:

1. **Erweiterte Funktionen erkunden**: Probieren Sie benutzerdefinierte Animationen und Automatisierung
2. **Mit Home Assistant integrieren**: Fügen Sie es zu Ihrem Smart-Home-Setup hinzu
3. **Benutzerdefinierte Effekte erstellen**: Schreiben Sie Ihre eigenen LED-Skripte
4. **Community beitreten**: Teilen Sie Ihre Projekte und erhalten Sie Hilfe

### Support

Wenn Sie auf Probleme stoßen oder Fragen haben:
- Überprüfen Sie das GitHub-Repository für häufige Probleme
- Öffnen Sie ein Issue auf GitHub für Bugs
- Treten Sie unserer Discord-Community für Hilfe bei

Vielen Dank, dass Sie Microflip verwenden!