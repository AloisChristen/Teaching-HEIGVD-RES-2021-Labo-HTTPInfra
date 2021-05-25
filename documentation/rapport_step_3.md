# Step 3 : Reverse Proxy with Apache (Hardcoded IP)

### Création d'un Dockerfile

```
FROM php:7.4-apache

COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```

1) Récupération d'apache

2) Copie des fichiers de configurations dans le container

3) Appel des modules proxy et proxy_http, nécessaires pour le reverse proxy

4) Active les configurations 000-default et 001-reverse-proxy

### Configuration du reverse proxy

```bash
<VirtualHost *:80>
	ServerName demo.res.ch
		
	ProxyPass "/api/flats/" "http://172.17.0.3:3000/"
	ProxyPassReverse "/api/flats/" "http://172.17.0.3:3000/"
	
	ProxyPass "/" "http://172.17.0.2:80/"
	ProxyPassReverse "/" "http://172.17.0.2:80/"

</VirtualHost>
```

1) Définition du nom du serveur

2)  Proxy pour le contenu dynamique sur la ressources /api/flats/

3)  Proxy pour le contenu statique (toujours mettre les adresses les plus générales à la fin)

### Build de l'image docker

Pour créer notre image docker, lancer la commande suivante :

 `docker build -t res/apache_pr .`

### Run des containers

Pour faire fonctionner le proxy, il faut lancer 3 containers : ceux des ressources statiques et dynamiques, et le container du reverse proxy

`docker run -d apache-static`

`docker run -d res/express_flats`

`docker run -d -p 8080:80 res/apache_pr`

Il est important de lancer les containers dans cet ordre là, car les adresses IP dans le reverse proxy sont codées en dur.

(apache-static doit avoir l'adresse 172.17.0.2 et express_flats l'adresse 172.17.0.3)

### Configuration du fichier dns Hosts

Il faut configurer le fichier de dns Host afin de pouvoir accéder par navigateur au serveur : 

Ce fichier se situe dans C:\Windows\System32\drivers\etc\hosts sous windows.

Nous avons du rajouter la ligne suivante : `127.0.0.1 demo.res.ch`

Comme nous utilisons Docker Desktop depuis Windows, l'adresse IP du serveur est localhost.

### Connexion au site grâce à un navigateur

Ouvrez votre navigateur et testez les liens suivants : 

demo.res.ch:8080 -> ressources statiques

demo.res.ch:8080/api/flats/ -> ressources dynamiques



