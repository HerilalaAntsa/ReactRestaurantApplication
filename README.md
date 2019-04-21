Finding resto est une application qui consiste à :
- rechercher des restaurants
- voir les détails d'un restaurant
- commander des plats ou des menus d'un restaurant
- gérer un restaurant (gérer les commandes, cartes ou menus)
developpé avec React JS, Material UI et Firebase

## Installation

L'application est accessible sur Heroku via le lien: http://findingresto-mbds.herokuapp.com/

Sinon, lancez l'application localement:

### `npm install`

Lancez 'npm install' afin d'installer tous les modules nécessaires<br>
Après l'installation lancez:

### `npm start`

Ouvrez [http://localhost:3000](http://localhost:3000) pour la voir sur le navigateur.

## Fonctionnalités implémentées

### Restaurant
- Liste des restaurants
- Recherche d'un restaurant
- Détails d'un restaurant :
    - Description (+ Localisation)
    - Voir carte et menu
### Commande
- Passer commande (menu ou carte)
- Voir commande (modifiable: ajouter, réduire, supprimer)
### Authentification
- Login, Sign In et Log Out
- Mode Admin, Mode utilisateur et mode visiteur (anonymous)  <br>
NB: les nouveaux utilisateurs seront inscrits en "mode utilisateur" par défaut. Des comptes admin seront déjà créés dans la base de donnée que vous utiliseriez pour voir le "mode admin". <br>
##### Compte admin: email "admin@gmail.com" mdp: "administrateur"
#### Mode Admin (authentifié)
Toutes les fonctionnalités sont disponibles + boutons qui permetteront d'ajouter des restaurants, des plats et des menus, ainsi que l'ajout des images qui y conviennent.
#### Mode Utilisateur (authentifié)
Toutes les fonctionnalités  dites précédemment sont disponibles
#### Mode Visiteur (anonymous: non authentifié)
Toutes les fonctionnalités  dites précédemment sont disponibles, SAUF QUE les commandes faites en mode visiteur ne seront pas considérés

### Bibliographie
https://material-ui.com <br>
https://firebase.google.com/docs/auth/web/start <br>
https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/ <br>
https://github.com/JedWatson/react-select <br>
