---
title: "Test"
prevStep: "03-configuration"
---

## Étape 4 : Test et Vérification

Félicitations pour avoir atteint l'étape finale ! Vérifions que tout fonctionne correctement.

### Test LED de Base

Testons la fonctionnalité LED de base en utilisant l'interface web.

**Test 1 : Couleur Unie**
1. Ouvrez l'interface web Microflip
2. Naviguez vers l'onglet "Contrôle"
3. Sélectionnez une couleur (par exemple, rouge : R=255, G=0, B=0)
4. Cliquez sur "Appliquer"
5. Vérifiez que votre bande LED affiche la couleur sélectionnée

**Test 2 : Contrôle de la Luminosité**
1. Réglez le curseur de luminosité à 50%
2. Observez les LEDs s'assombrir
3. Réglez la luminosité à 100% et vérifiez la pleine luminosité

**Test 3 : Modes d'Éclairage**
1. Essayez différents modes d'éclairage depuis le menu déroulant
2. Testez le mode "Arc-en-ciel" - devrait parcourir les couleurs
3. Testez le mode "Respiration" - devrait pulser

### Test de l'API

Vérifions que les points de terminaison API fonctionnent correctement :

<terminal command="curl http://MICROFLIP_IP/api/status" />

Réponse attendue :
```json
{
  "status": "ok",
  "wifi": "connected",
  "led_count": 60,
  "brightness": 255
}
```

Testez le réglage d'une couleur via l'API :

<terminal command="curl -X POST http://MICROFLIP_IP/api/set_color -H 'Content-Type: application/json' -d '{"r": 0, "g": 255, "b": 0}'" />

Vos LEDs devraient devenir vertes.

### Test d'Intégration d'Imprimante 3D

Si vous utilisez le Microflip avec une imprimante 3D, testez l'intégration de l'imprimante :

**Intégration Klipper :**
1. Ajoutez la configuration Microflip à votre config Klipper
2. Redémarrez Klipper
3. Envoyez une commande de test :
   ```bash
   SET_LED LED=led_color RED=255 GREEN=0 BLUE=0
   ```
4. Vérifiez que les LEDs répondent

**Intégration PrusaSlicer / Cura :**
1. Configurez le script de post-traitement
2. Slicez un modèle de test
3. Exportez le G-code
4. Vérifiez que les commandes LED sont présentes

### Test de Performance

Testez le système sous charge :

**Changements de Couleur Rapides :**
1. Utilisez l'interface web ou l'API pour parcourir rapidement les couleurs
2. Surveillez tout délai ou commande manquée

**Stabilité WiFi :**
1. Surveillez la connexion pendant 10-15 minutes
2. Vérifiez que la carte reste connectée
3. Vérifiez qu'aucune déconnexion ne se produit

### Dépannage

**Les LEDs ne répondent pas :**
- Vérifiez que la bande LED est correctement connectée
- Vérifiez que le type de LED correspond à votre bande (WS2812B vs SK6812)
- Vérifiez la connexion de la ligne de données

**Problèmes de connexion WiFi :**
- Vérifiez que votre mot de passe WiFi est correct
- Vérifiez que la carte est à portée de votre routeur
- Essayez d'utiliser une adresse IP statique

**L'API ne répond pas :**
- Vérifiez que vous utilisez la bonne adresse IP
- Vérifiez que la carte est connectée au WiFi
- Essayez d'accéder via l'interface web

### Liste de Contrôle de Succès

Avant de conclure la configuration, vérifiez :

- [ ] Les LEDs affichent les couleurs correctement
- [ ] Le contrôle de la luminosité fonctionne
- [ ] Les modes d'éclairage fonctionnent correctement
- [ ] La connexion WiFi est stable
- [ ] Les points de terminaison API répondent correctement
- [ ] L'intégration d'imprimante 3D (si applicable) fonctionne
- [ ] La configuration est sauvegardée

### Prochaines Étapes

Félicitations ! Vous avez configuré avec succès votre contrôleur LED Microflip. Voici quelques prochaines étapes :

1. **Explorer les Fonctionnalités Avancées** : Essayez des animations personnalisées et l'automatisation
2. **Intégrer avec Home Assistant** : Ajoutez-le à votre configuration de maison intelligente
3. **Créer des Effets Personnalisés** : Écrivez vos propres scripts LED
4. **Rejoindre la Communauté** : Partagez vos projets et obtenez de l'aide

### Support

Si vous rencontrez des problèmes ou avez des questions :
- Vérifiez le dépôt GitHub pour les problèmes courants
- Ouvrez une issue sur GitHub pour les bugs
- Rejoignez notre communauté Discord pour de l'aide

Merci d'utiliser Microflip !