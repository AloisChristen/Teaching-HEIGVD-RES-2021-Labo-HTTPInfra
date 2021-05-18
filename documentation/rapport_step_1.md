# Step 1 : Static HTTP server with apache httpd

### Création d'un Dockerfile

```
FROM php:7.4-apache

COPY src/ /var/www/html/
```

La première ligne utilise une image php trouvée sur le [docker hub](https://hub.docker.com/_/php)

La seconde ligne nous permet de copier les fichiers sources dans le container

### Création de la page index.html avec un thème bootstrap

Nous avons choisit le thème **GrayScale**, disponible sur https://startbootstrap.com/previews/grayscale

### Build de l'image docker

 docker build -t "apache-static" .

### Run du container

 docker run -d -p 9090:80 apache-static

### Connexion au site grâce à un navigateur

http://localhost:9090/

utilisation de docker desktop sur windows -> localhost