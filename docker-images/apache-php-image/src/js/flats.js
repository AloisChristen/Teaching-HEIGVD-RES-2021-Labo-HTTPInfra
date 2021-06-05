$(function() {
  console.log("Loading flats");

  function loadFlats() {
          $.getJSON( "/api/flats/", function( flats ) {
                  console.log(flats);
                  var message = "Nothing here";
                  if ( flats.length > 0 ) {
					  $(".flats > h2").attr("display", "none");
					  $(".flats > table").removeAttr("display");
					  $(".flats > table .flat-row-address").text(flats[0].street + ", " + flats[0].city);
					  $(".flats > table .flat-row-rent").text(flats[0].rent + "chf");
					  $(".flats > table .flat-row-rooms").text(flats[0].nbPieces); 
                  } else {
					  $(".flats > table").attr("display", "none");
					  $(".flats > h2").removeAttr("display");
					  $(".flats > h2").text(message);
				  }
                  
          });
  };

  loadFlats();
  setInterval( loadFlats, 2000 );

});