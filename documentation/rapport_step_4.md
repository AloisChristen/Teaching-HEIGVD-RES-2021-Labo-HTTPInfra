# Step 4 : AJAX requests with JQuery

### Modification des Dockerfile

```bash
RUN apt-get update && \
	apt-get install -y vim
```

Afin d'éditer nos fichiers à partir d'un container, nous avons ajouté ces deux lignes dans nos Dockerfile pour installer vim. 

### Création du JavaScript

Contenu de flats.js :

```js
$(function() {
  console.log("Loading flats");

  function loadFlats() {
          $.getJSON( "/api/flats/", function( flats ) {
                  console.log(flats);
                  var message = "Nothing here";
                  if ( flats.length > 0 ) {
                          message = flats[0].street + ", " + flats[0].city;
                  }
                  $(".flats > h2").text(message);
          });
  };

  loadFlats();
  setInterval( loadFlats, 2000 );

});
```

Ce code va être exécuter quand le JQuery sera chargé. En effet `$(function()` permet de créer une fonction qui sera appelée au chargement de JQuery.

La fonction `loadFlats` va :

- Faire un appel Ajax pour récupérer une liste d'appartements depuis la ressource `/api/flats/` 
- Créer un message à partir du premier appartement (rue et ville) ou un message par défaut.
- Remplace le texte des éléments avec la classe `flats` par ce message.

Avec `setInterval` on peut appeler la fonction `loadFlats` en boucle toutes les deux secondes. 

### Modification de index.html

Il faut rajouter les lignes suivantes à la fin du code html pour appeler le script ci-dessus.

```html
<!-- Custom script to load flats -->
<script src="js/flats.js"></script>
```

### Build de l'image docker

Pour mettre à jour notre image docker, on la re-build avec la commande suivante :

 `docker build -t res/apache_php .`

### Run des containers

Pour faire fonctionner le proxy, il faut lancer 3 containers : ceux des ressources statiques et dynamiques, et le container du reverse proxy

`docker run -d res/apache_php`

`docker run -d res/express_flats`

`docker run -d -p 8080:80 res/apache_rp`

Il est important de lancer les containers dans cet ordre là, car les adresses IP dans le reverse proxy sont codées en dur.

(apache_static doit avoir l'adresse 172.17.0.2 et express_flats l'adresse 172.17.0.3)

### Connexion au site grâce à un navigateur

Ouvrez votre navigateur et testez le lien suivant : 

demo.res.ch:8080 
