jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
     script . src  =  " https://maps.googleapis.com/maps/api/js?key=AIzaSyDPhP3O6TjiUWumJign7vxJy3q_znZSxeA&callback=initialize " ;
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
    var markers = [
        ['Cafeteria e Charutaria viajantes,Alx,Lembrarte',-22.8993443,-43.2082906],
        ['Padaria Pomar Da Barra', -23.0120696,-43.30875209999999],
        ['Panificação e Padaria Atlantica', -22.9638779,-43.1761027],
        ['Sports Rio Souvenir', -22.9656288,-43.177414],
        ['Casa de Rações Marpecão', -22.8320241,-43.292049099999986],
    ];
                        
    // Info Window Content
    var infoWindowContent = [
       ['<div class="info_content">' +
       '<img src="img/Agora_mini.jpg">' +
       '<h3>EM BREVE</h3>'+
        //'<h3>Rodoviária Novo Rio</h3>' +
        //'<p><p>Cafeteria e Charutaria viajantes - <a href="video.html" target="_blank">EM BREVE</a></p> Alx Ótica - <a href="#" target="_blank">EM BREVE</a></p> Lembrarte Souvenir - <a href="#" target="_blank">EM BREVE</a></p></p> - Av Francisco Bicalho, 1, Santo Cristo - Rio de Janeiro, RJ.</p>'+ 
        '</div>'],

        ['<div class="info_content">' +
        '<img src="img/Agora_mini.jpg">' +
        '<h3>EM BREVE</h3>'+
        //'<h3>Padaria Pomar Da Barra</h3>' +
        //'<p>Av Belisário Leite de Andrade Neto, 391 - lj-B </p> Barra da Tijuca - Rio de Janeiro, RJ - CEP: 22621-270.</p><a href="#" target="_blank">EM BREVE</a>' +
        '</div>'],

         ['<div class="info_content">' +
         '<img src="img/Agora_mini.jpg">' +
         '<h3>EM BREVE</h3>'+
        //'<h3>Panificação e Padaria Atlantica</h3>' +
        //'<p>R Ministro Viveiros de Castro, 53 - Copacabana </p> Rio de Janeiro, RJ - CEP: 22021-010.</p><a href="#" target="_blank">EM BREVE</a>' +
        '</div>'],

         ['<div class="info_content">' +
         '<img src="img/Agora_mini.jpg">' +
         '<h3>EM BREVE</h3>'+
        //'<h3>Sports Rio Souvenir</h3>' +
        //'<p>Av Nossa Senhora de Copacabana, 209 - lj-a </p> Copacabana - Rio de Janeiro, RJ.</p><a href="#" target="_blank">EM BREVE</a>' +
        '</div>'],

         ['<div class="info_content">' +
        '<h3>Casa de Rações Marpecão</h3>' +
        '<p>R. Guaporé, 651 - Bráz De Pina,</p> Rio de Janeiro - RJ, 21215-100, Brasil.</p><a href="https://sandrodesg.github.io/agoradicas/dicao.html" target="_blank">Visita</a>' +
        '</div>'],
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
    
}