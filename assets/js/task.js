var earth = null;
var markers = [];
var answered = false;
var randomPos = [0,0];

function openMap(settings, extraOptions) {
    if (earth === null) {
        earth = new window.WE.map('earth_div', settings);
        randomPos = extraOptions.initial;
    
        window.WE.tileLayer('https://rvsphere.s3.amazonaws.com/venus/{z}/{x}/{y}.png', {
            minZoom: 0,
            maxZoom: 5
        }).addTo(earth);

        earth.on('mousemove', function(e) {
            if (e.latlng !== undefined)
                extraOptions.onMove(e.latitude, e.longitude);
        });

        earth.on('dblclick', function(e){
            if (e.latlng !== undefined && !answered ){
                answered = true;
                var posClick = [e.latitude, e.longitude];
                markers.push( window.WE.marker(randomPos, '../assets/imgs/marker-blue.png').addTo(earth) );
                markers.push( window.WE.marker(posClick, '../assets/imgs/marker-green.png').addTo(earth) );
                //earth.setView(extraOptions.initial);
                earth.panTo(randomPos);
                
                extraOptions.onDoubleClick(posClick[0], posClick[1]);
            }
        });
    }
}

function resetMap(settings, extraOptions){
    if( earth === null ) {
        return false;
    }

    earth.setView(settings.center);
    randomPos = extraOptions.initial;
    earth.da.P.m.forEach( (idx) => { 
        var mk = earth.da.P.O[idx]
        mk.element.remove();
        mk.enabled = false; 
        mk.visible = false; 
    } )
    markers = [];
    answered = false;
}