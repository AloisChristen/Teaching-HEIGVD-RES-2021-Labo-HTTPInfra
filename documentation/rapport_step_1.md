# Step 1 : Static HTTP server with apache httpd

### Création d'un Dockerfile

```
FROM php:7.4-apache

COPY src/ /var/www/html/
```

La première ligne utilise une image php trouvée sur le [docker hub](https://hub.docker.com/_/php).

La seconde ligne nous permet de copier les fichiers sources dans le container.

### Création de la page index.html avec un thème bootstrap

Nous avons choisi le thème **GrayScale**, disponible sur https://startbootstrap.com/previews/grayscale.

### Build de l'image docker

Pour créer notre image docker, lancer la commande suivante :

 `docker build -t "apache-static" .`

### Run du container

Pour lancer le container effectuer la commande suivante :

`docker run -d -p 9090:80 apache-static`

### Connexion au site grâce à un navigateur

Ouvrez votre navigateur et tapez le lien suivant : 

http://localhost:9090/

Vous devriez voir le site s'afficher.

Comme nous utilisons Docker Desktop depuis Windows, l'adresse IP du serveur est localhost.

