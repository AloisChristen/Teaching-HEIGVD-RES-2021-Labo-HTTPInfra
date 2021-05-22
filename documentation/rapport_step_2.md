# Step 2 : Dynamic HTTP server with express.js

### Création d'un Dockerfile

```
FROM node:14.17

COPY src /opt/app

CMD ["node", "/opt/app/index.js"]
```

1) Récupération de Node.js

2) Copie des sources dans le containers

3) Appelle de index.js pour lancer le script

### Génération de contenu dynamique

Dans le fichier index.js, la fonction `generateFlats()` génère des appartements (adresse, loyer, nb pièces).

On peut récupérer une liste d'appartements aléatoires à la ressources "/" du site.

### Build de l'image docker

Pour créer notre image docker, lancer la commande suivante :

 `docker build -t res/express_flats .`

### Run du container

Pour lancer le container effectuer la commande suivante :

`docker run -d -p 9090:3000 res/express_flats`

### Connexion au site grâce à un navigateur

Ouvrez votre navigateur et tapez le lien suivant : 

http://localhost:9090/

Vous trouverez une liste d'appartements au format Json

Comme nous utilisons Docker Desktop depuis Windows, l'adresse IP du serveur est localhost.

