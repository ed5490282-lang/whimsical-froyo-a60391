# Service Carte Grise

Service professionnel de carte grise en ligne, 100% dématérialisé. Ce site permet aux usagers de soumettre des demandes de carte grise (immatriculation, changement de titulaire, duplicata, etc.) et de recevoir un traitement officiel via le Système d'Immatriculation des Véhicules (SIV).

## Technologies utilisées

- **TanStack Start** (React SSR framework)
- **TanStack Router** (file-based routing)
- **Tailwind CSS v4** (utilitaires CSS)
- **Vite** (build tool)
- **Netlify** (hébergement et fonctions serverless)
- **nodemailer** (envoi d'emails via les fonctions serveur)
- TypeScript

## Fonctionnalités

- Page d'accueil complète avec navigation, hero, témoignages, grille de services et processus en 3 étapes
- Formulaire de demande multi-étapes (informations personnelles → documents requis → paiement)
- Affichage des coordonnées bancaires (virement SEPA) et PayPal pour le règlement
- Soumission du formulaire via une API serverless qui envoie un email de notification

## Lancer en local

```bash
npm install
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

### Configuration SMTP (optionnel)

Pour activer l'envoi d'emails lors de la soumission d'un formulaire, définissez les variables d'environnement suivantes dans Netlify (Site settings → Environment variables) :

| Variable    | Description                          |
|-------------|--------------------------------------|
| SMTP_HOST   | Hôte SMTP (ex: smtp.gmail.com)       |
| SMTP_PORT   | Port SMTP (587 par défaut)           |
| SMTP_USER   | Adresse email expéditrice            |
| SMTP_PASS   | Mot de passe ou App Password Gmail   |

Sans ces variables, les demandes sont journalisées dans les logs Netlify mais non envoyées par email.
