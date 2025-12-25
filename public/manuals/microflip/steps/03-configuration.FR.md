---
title: "Configuration"
prevStep: "02-flashing"
nextStep: "04-testing"
---

## Étape 3 : Configuration

Maintenant que le firmware est flashé, configurons la connexion WiFi et les paramètres LED.

### Se Connecter au Point d'Accès WiFi

Après le flashage, la carte AT2 crée un point d'accès WiFi auquel vous pouvez vous connecter pour la configuration initiale.

1. Sur votre appareil (téléphone/ordinateur), recherchez un réseau WiFi nommé `AT2-PCB-Setup`
2. Connectez-vous-y (aucun mot de passe requis)
3. Ouvrez votre navigateur web et naviguez vers `http://192.168.4.1`

### Configurer les Paramètres WiFi

Vous devriez voir la page de configuration AT2. Remplissez ce qui suit :

**Paramètres Réseau :**
- **WiFi SSID** : Nom de votre réseau WiFi domestique
- **Mot de passe WiFi** : Votre mot de passe WiFi
- **IP statique (optionnel)** : Si vous voulez une adresse IP fixe

**Paramètres LED :**
- **Type de LED** : WS2812B / SK6812 / Autre
- **Nombre de LED** : Nombre de LEDs dans votre bande
- **Luminosité par défaut** : Niveau de luminosité initial (0-255)
- **Couleur par défaut** : Couleur LED initiale (valeurs RVB)

Cliquez sur "Enregistrer & Redémarrer" pour appliquer les paramètres.

### Se Connecter à Votre Réseau

La carte redémarrera et se connectera à votre réseau WiFi. Attendez environ 30 secondes, puis :

1. Reconnectez votre appareil à votre WiFi domestique
2. Trouvez l'adresse IP de l'AT2 (vérifiez la liste des appareils connectés de votre routeur)
3. Naviguez vers l'interface web AT2 à son adresse IP

### Configurer les Paramètres Avancés (Optionnel)

Depuis l'interface web, vous pouvez configurer :

**Modes d'Éclairage :**
- Couleur statique
- Effet arc-en-ciel
- Effet de respiration
- Animations personnalisées

**Automatisation :**
- Éclairage basé sur un calendrier
- Intégration d'imprimante 3D
- Points de terminaison API pour un contrôle personnalisé

**Sécurité :**
- Définir un mot de passe administrateur
- Configurer l'authentification API

### Sauvegarder la Configuration

Il est conseillé de sauvegarder votre configuration :

<terminal command="curl http://AT2/api/config > AT2-config.json" />

Remplacez `AT2_IP` par votre adresse IP réelle.

### Prochaine Étape

Avec la configuration terminée, passons à l'étape finale où nous testerons l'installation et vérifierons que tout fonctionne correctement !