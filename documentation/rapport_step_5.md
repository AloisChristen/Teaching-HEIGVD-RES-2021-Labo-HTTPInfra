# Step 5 : Dynamic configuration

### Modification du Dockerfile du reverse proxy 

```bash
COPY apache2-foreground /usr/local/bin/
COPY templates /var/apache2/templates
```

Nous écrasons le fichier apache2-foreground, qui est une copie légèrement modifiée de celui utilisé par PHP:7.4.

Nous copions le dossiers templates, qui contient un script php permettant de générer le(s) fichier(s) de configuration.

### Modification d'apache2-foreground

Afin d'exécuter le script config-template.php, le fichier apache2-foreground a été modifié avec les lignes suivantes

```bash
#!/bin/bash
set -e

# [Début de la modification]
# Add setup for RES lab
echo "Setup for the res lab..."
echo "Static App URL : $STATIC_APP"
echo "Dynamic App URL : $DYNAMIC_APP"
php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf
# [Fin de la modification]
# [the rest of the file]

```

Seule la dernière ligne est essentielle : elle appelle notre script php et écrit le résultat dans le fichier 001-reverse-proxy.conf

### Script config-template.php

```php
<?php
	$static_app = getenv('STATIC_APP');
	$dynamic_app = getenv('DYNAMIC_APP');
?>

<VirtualHost *:80>
	ServerName demo.res.ch
	
	#ErroLog ${APACHE_LOG_DIR}/error.log
	#CustomLog ${APACHE_LOG_DIR}/access.log combined
	
	ProxyPass '/api/flats/' 'http://<?php print "$dynamic_app"?>/'
	ProxyPassReverse '/api/flats/' 'http://<?php print "$dynamic_app"?>/'
	
	ProxyPass '/' 'http://<?php print "$static_app"?>/'
	ProxyPassReverse '/' 'http://<?php print "$static_app"?>/'

</VirtualHost>
```

Ce script va récupérer deux variables d'environnement (`STATIC_APP` et `DYNAMIC_APP`), puis écrire la configuration des serveurs statique et dynamique, en injectant les valeurs récupérées.

### Build de l'image docker

Pour mettre à jour notre image docker, on la re-build avec la commande suivante :

 `docker build -t res/apache_rp .`

### Run des containers

Pour faire fonctionner le proxy, il faut d'abord lancer 2 containers : celui des ressources statiques et celui des dynamiques.

`docker run -d --name apache_static res/apache_php`

`docker run -d --name apache_dynamic res/express_flats`

Ensuite nous allons récupérer leurs addresses ip :

`docker inspect apache_static | grep -i ipaddr` -> 172.17.0.X

`docker inspect apache_dynamic | grep -i ipaddr` -> 172.17.0.Y

Ensuite nous pouvons lancer un container `res/apache_rp` en précisant les variables d'environnements nécessaires :

`docker run -d --name apache_rp -p 8080:80 -e "STATIC_APP=172.17.0.X:80" -e "DYNAMIC_APP=172.17.0.Y:3000" res/apache_rp`

Le fichier de config doit maintenant contenir les bonnes addresses IP pour les containers.

### Connexion au site grâce à un navigateur

Ouvrez votre navigateur et testez le lien suivant : 

demo.res.ch:8080 
