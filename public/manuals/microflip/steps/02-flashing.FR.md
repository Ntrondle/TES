---
title: "Flashage du Firmware"
prevStep: "01-overview"
nextStep: "03-configuration"
---

## Étape 2 : Flashage du Firmware

Maintenant, nous allons flasher le firmware WLED sur votre carte AT2. Suivez ces étapes attentivement.

### Localiser le Bouton de Flashage

D'abord, vous devez identifier le bouton BOOT/RESET sur la carte AT2. Ce bouton est utilisé pour mettre l'ESP32 en mode flashage.

Le bouton de flashage se trouve sur le côté inférieur de la carte, voir le modèle 3D ci-dessous.

<div className="manual-3d-container" data-model="/manuals/at2/model.glb" data-annotations='[{"targetObject": "SW-SMD_L39-W30-P445~SW-SMD_L39-W29-H20-LS48~B49X", "offset": 2.0, "direction": "up", "label": "Bouton BOOT", "color": "#FF0000", "arrowOffset": {"x": 0, "y": 0, "z": -0.5}, "labelSize": 1.5}]' data-camera='{"x": -0.24, "y": 3.55, "z": -15.31}'></div>

### Méthode 1 : Utiliser esptool.py (Recommandé)

**Étape 1 : Connecter la Carte**

Connectez votre carte AT2 à votre ordinateur à l'aide d'un câble USB-C.

**Étape 2 : Identifier le Port Série**

Trouvez le port série où votre ESP32 est connecté :

<terminal command="esptool.py list_ports" />

Vous devriez voir un appareil listé. Notez le nom du port (par exemple, `COM3` sous Windows, `/dev/ttyUSB0` sous Linux, `/dev/tty.usbserial-xxx` sous macOS).

**Étape 3 : Mettre la Carte en Mode de Démarrage**

1. Maintenez enfoncé le **bouton BOOT**
2. Tout en maintenant BOOT, appuyez et relâchez le **bouton RESET**
3. Relâchez le bouton BOOT

La carte est maintenant en mode flashage.

**Étape 4 : Flasher le Firmware**

Accédez au répertoire où vous avez téléchargé le firmware et exécutez la commande suivante :

<terminal command="esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 AT2-firmware.bin" />

Pour Linux/macOS, utilisez :

<terminal command="esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 460800 write_flash -z 0x1000 at2-firmware.bin" />

Remplacez `COM3` ou `/dev/ttyUSB0` par votre port série réel, et `at2-firmware.bin` par le nom de votre fichier firmware.

**Étape 5 : Vérifier le Flash**

Si succès, vous verrez une sortie indiquant que le flashage s'est terminé avec succès. La carte redémarrera automatiquement et démarrera avec le nouveau firmware.

### Méthode 2 : Web Flasher (Alternative)

Si vous préférez une interface graphique, vous pouvez utiliser un ESP flasher basé sur le web :

1. Mettez la carte en mode de démarrage (comme décrit ci-dessus)
2. Visitez [ESP Web Flasher](https://webflasher.esptool.io/)
3. Connectez-vous via l'interface web
4. Téléchargez votre fichier firmware
5. Cliquez sur "Flash"

Cette méthode est plus facile pour les débutants mais nécessite que la carte soit d'abord en mode de démarrage.

### Dépannage

**Erreur "Failed to connect" :**
- Assurez-vous que vous maintenez le bouton BOOT lorsque vous appuyez sur RESET
- Essayez un autre câble USB (certains câbles sont uniquement pour l'alimentation)
- Vérifiez que la carte reçoit de l'alimentation (la LED devrait être allumée)

**Erreur "Permission denied" (Linux/macOS) :**

<terminal command="sudo chmod 666 /dev/ttyUSB0" />

**Port non détecté :**
- Installez les pilotes USB CP2102/CH340 si nécessaire
- Essayez un autre port USB

### Prochaine Étape

Une fois que vous avez flashé le firmware avec succès, passez à l'étape suivante où nous configurerons le WiFi et les paramètres LED !