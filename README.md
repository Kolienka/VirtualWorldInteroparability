# VirtualWorldInteroparability

## Setup le projet:

**Prérequis** : posséder NodeJS sur son poste de travail, avoir un navigateur.

Dans les répertoires worldA, worldB et supervisor: 
lancer 
``` npm install socket.io ``` 
``` npm install socket.io-client ``` 
``` npm install express ``` 

## Lancer le projet:

1. Ouvrir trois terminaux pouvant utiliser NodeJS
2. Se rendre dans le dossier "worldA" sur un terminal, "worldB" sur un autre et "supervisor" avec le dernier.
3. dans worldA et worldB, lancer ```node index.js```, dans supervisor, lancer ``` node supervisor.js ```
4. Le projet est normalement bien lancé.

## ce qu'il est possible de faire:

1. lancer un navigateur et se rendre sur localhost:3000 pour se rendre sur le monde A
2. Il est possible de 's'authentifier' via le formulaire en bas du worldA, si l'utilisateur existe déjà, il récupère sa couleur.
3. Dans le monde A il est possible de se téléporter vers le monde B tout en conservant sa couleur grâce au superviseur. (case orangé en bas à droite du monde A)
4. Il est possible de changer de couleur en se rendant sur la case inférieure gauche du mondeA, il suffit ensuite d'appuyer sur "Ctrl left"