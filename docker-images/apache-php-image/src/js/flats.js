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