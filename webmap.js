/*global $ */


// JS Document
// Code by Carlos Mazoca, Geoscientist and Jack of all trades

var geocoder;
var map;
var layers = [];

//the modal window to choose your version of the webmap
$(document).ready(function () {
    $("#webtri").click(function (event) {
        $('#modal,.pan').hide();
    });
    $("#webpan").click(function (event) {
        $('#modal,.tri').hide();
        $(".headPAN,.pan").show();
    });
});

// Toggle layers (trilhas/hiking trails) onclick
function toggleTrilha(i) {
    'use strict';
    if (layers[i].getMap() === null) {
        //se o layer está desativo -> ative
        layers[i].setMap(map);
        //        map.setCenter(layers[i].geometry.location);
        //        map.setZoom(10);
    } else {
        //se o layer está ativo -> desative
        layers[i].setMap(null);
    }
}

// Toggle layers (meio físico/environmental layers) onclick.
// This function allows to deactivate an existing layer if a new one is selected
function toggleLayer(i) {
    'use strict';
    layers[0].setMap(null);
    layers[1].setMap(null);
    layers[2].setMap(null);
    layers[3].setMap(null);
    layers[4].setMap(null);
    layers[5].setMap(null);
    layers[6].setMap(null);
    layers[7].setMap(null);
    layers[8].setMap(null);
    layers[i].setMap(map);
}

// Remove hiking trails if clicked on municipality/city name
function closeTrilha() {
    'use strict';
    layers[10].setMap(null);
    layers[11].setMap(null);
    layers[12].setMap(null);
    layers[13].setMap(null);
    layers[14].setMap(null);
    layers[15].setMap(null);
    layers[16].setMap(null);
    layers[17].setMap(null);
    layers[18].setMap(null);
    layers[19].setMap(null);
    layers[20].setMap(null);
    layers[21].setMap(null);
    layers[22].setMap(null);
    layers[23].setMap(null);
    layers[24].setMap(null);
    layers[25].setMap(null);
    layers[26].setMap(null);
    layers[27].setMap(null);
    layers[28].setMap(null);
    layers[29].setMap(null);
    layers[30].setMap(null);
    layers[31].setMap(null);
    layers[32].setMap(null);
    layers[33].setMap(null);
    layers[34].setMap(null);
    layers[35].setMap(null);
    layers[36].setMap(null);
    layers[37].setMap(null);
}

// Remove hiking trails if clicked on municipality/city name
function closeLayer() {
    'use strict';
    layers[0].setMap(null);
    layers[1].setMap(null);
    layers[2].setMap(null);
    layers[3].setMap(null);
    layers[4].setMap(null);
    layers[5].setMap(null);
    layers[6].setMap(null);
    layers[7].setMap(null);
    layers[8].setMap(null);
}


// Initialize the map
function initialize() {
    'use strict';
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: new google.maps.LatLng(-23.682115699537057, -45.33391768457034),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });



    ////Google Maps Search Box with autocomplete////

    var input = document.getElementById('searchInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Selecione uma das opçções mostrada na lista.");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);

        //Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i].types[0] == 'postal_code') {
                document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if (place.address_components[i].types[0] == 'country') {
                document.getElementById('country').innerHTML = place.address_components[i].long_name;
            }
        }
        document.getElementById('location').innerHTML = place.formatted_address;
        document.getElementById('lat').innerHTML = place.geometry.location.lat();
        document.getElementById('lon').innerHTML = place.geometry.location.lng();
    });

    //Reverse geocoding
    google.maps.event.addListener(marker, 'drag', function () {        
        geocoder.geocode({
            'latLng': marker.getPosition()
        }, function (results, status) {            
            if (status == google.maps.GeocoderStatus.OK) {                    
                if (results[0]) {                    
                    $('#searchInput').val(results[0].formatted_address);
                    infowindow.setContent(results[0].formatted_address);
                }            
            }        
        });    
    });

    //Double click on the marker remove it and clean the search box
    marker.addListener("dblclick", function () {
        marker.setMap(null);
        $('#searchInput').val('');
    });

    ////end of Google Maps Search Box with autocomplete////

    // Set new locations on city name click. This will be used in the JQuery function
    function newLocation(newLat, newLng) {
        map.setCenter({
            lat: newLat,
            lng: newLng
        });
    }

    //Set new locations and zoom level on city name click
    $(document).ready(function () {
        $(".carzoom").on('click', function () {
            newLocation(-23.6386442, -45.4337792);
            map.setZoom(Math.min(11, map.getZoom()));
        });

        $(".ilbzoom").on('click', function () {
            newLocation(-23.8353659, -45.3224381);
            map.setZoom(Math.min(12, map.getZoom()));
        });

        $(".ssbzoom").on('click', function () {
            newLocation(-23.7691073, -45.6138593);
            map.setZoom(Math.min(11, map.getZoom()));
        });

        $(".ubtzoom").on('click', function () {
            newLocation(-23.3975304, -45.0342757);
            map.setZoom(Math.min(11, map.getZoom()));
        });
    });

    // Activate/Deactive conteiner of hiking trail for each municipality/city
    $('.whiteTRI,.greyTRI').on('click', function () {
        if ($(this).is("#CAR")) {
            document.getElementById("ilbDrop").classList.remove("show");
            document.getElementById("ssbDrop").classList.remove("show");
            document.getElementById("ubtDrop").classList.remove("show");
            document.getElementById("carDrop").classList.toggle("show");
        } else if ($(this).is("#ILB")) {
            document.getElementById("carDrop").classList.remove("show");
            document.getElementById("ssbDrop").classList.remove("show");
            document.getElementById("ubtDrop").classList.remove("show");
            document.getElementById("ilbDrop").classList.toggle("show");
        } else if ($(this).is("#SSB")) {
            document.getElementById("ilbDrop").classList.remove("show");
            document.getElementById("carDrop").classList.remove("show");
            document.getElementById("ubtDrop").classList.remove("show");
            document.getElementById("ssbDrop").classList.toggle("show");
        } else if ($(this).is("#UBT")) {
            document.getElementById("ilbDrop").classList.remove("show");
            document.getElementById("ssbDrop").classList.remove("show");
            document.getElementById("carDrop").classList.remove("show");
            document.getElementById("ubtDrop").classList.toggle("show");
        }
    });

    // Activate/Deactive conteiner of theme layers
    $('.white,.grey').on('click', function () {
        if ($(this).is("#GEL")) {
            document.getElementById("relDrop").classList.remove("show");
            document.getElementById("litoDrop").classList.toggle("show");
        } else if ($(this).is("#REL")) {
            document.getElementById("litoDrop").classList.remove("show");
            document.getElementById("relDrop").classList.toggle("show");
        } else if ($(this).is("#SOL,#CAV,#VEG,#UCS")) {
            document.getElementById("litoDrop").classList.remove("show");
            document.getElementById("relDrop").classList.remove("show");
        }
    });

    // Define button colors (meio físico/environmental layers) when clicked
    // This function only applies to the environmental layers
    $(document).ready(function () {
        $('.white,.grey').on('click', function () {
            var isActive = ($(this).hasClass('selected')) ? true : false; // checks if it is already active
            $('.selected').removeClass('selected');
            $('.closelyr').removeClass('closelyr');

            if (!isActive) {
                $(this).addClass('selected');
                $(this).addClass('closelyr');
            } // set active only if it was not active
        });
    });

    //     Define button colors (municipality/city) when clicked
    //     This function only applies to the city layers
    $(document).ready(function () {
        $('.whiteTRI,.greyTRI').filter(".tri").on('click', function () {
            var isActive = ($(this).hasClass('selectedTRI')) ? true : false; // checks if it is already active
            $('.selectedTRI').removeClass('selectedTRI');
            $('.close').removeClass('close');

            if (!isActive) {
                $(this).addClass('selectedTRI');
                $(this).addClass('close');
            } // set active only if it was not active
        });
        $('.whiteTRI,.greyTRI').filter(".pan").on('click', function () {
            var isActive = ($(this).hasClass('selectedPAN')) ? true : false; // checks if it is already active
            $('.selectedPAN').removeClass('selectedPAN');
            $('.close').removeClass('close');

            if (!isActive) {
                $(this).addClass('selectedPAN');
                $(this).addClass('close');
            } // set active only if it was not active
        });
    });

    // Define button colors (hiking trails) when clicked
    // This function only applies to the hiking trail layers
    $(".carDrop-content a, .ilbDrop-content a, .ssbDrop-content a, .ubtDrop-content a").click(function () {
        $('selectedTRI').removeClass('selectedTRI');
        $(this).toggleClass('selectedTRI');
    });



    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // KML  (hiking trails) and Fusion Tables Layers (environmental layers)
    // I WOULD REALLY APPRECIATE if I could put it all in a different JS document

    // 1 Fusion Tables Layers (environmental layers)
    //  Geologia CPRM
    layers[0] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1jnWaAgiUjkbqcA6vCt7Udml66RtPDR_cO6K_dtt6'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //  Geologia simplificada
    layers[1] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1JG6UtomyfVDdMXbWQEIUY8vPKUIgCEqYc8mfYSAU'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //  Relevo ROSS Nivel 1
    layers[2] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1bqQdy2H-E9S_7wbBxWirVE27k9NLeu9LgLUAmjOG'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Relevo ROSS  Nivel 2
    layers[3] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1ZkaEtrmTUNWl26Yo2lGkgvt71kXeyKWZCiKORT9R'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Relevo ROSS  Nivel 3
    layers[4] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '158LCqDWlnG4vJ7byE5feMbwcipK71zBqtYDDDkE2'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Solos  Instituto Agronômico de Campinas
    layers[5] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '15C-wDP7dvMJ4ycIvtDzppNyBBNrEBifM0Sa1mvNN'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Cavernas CPRM
    layers[6] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1HEAKMIRxmd24O4TFzySYxpFkU_mzJQhJgeTjI-Gh'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Vegetação IBGE ou Regiões Fitoecológicas RADAM
    layers[7] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1mBdS_WkHSqsT0add-YRsyC2aKXvpPHbeSpjzML2F'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Unidades de conservação
    layers[8] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1S9YKqiMjIQrHsTNMAnI0Ctk0FqVZN4kvW5-z5UNF'
        },
        map: map,
        styleId: 2,
        templateId: 2

    });

    // Some layers definitions if necessary
    layers[9] = new google.maps.FusionTablesLayer({});


    // 2 KML layers (hiking trails)

    //crg_jqb	Trilha do Jequitibá    
    layers[10] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TJ.kml', {
        preserveViewport: false,
        map: map
    });

    layers[11] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TJ_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //crg_tp	Trilha do Poção
    layers[12] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TP.kml', {
        preserveViewport: false,
        map: map
    });

    layers[13] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TP_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //crg_tt	Trilha dos Tropeiros
    layers[14] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TT.kml', {
        preserveViewport: false,
        map: map
    });

    layers[15] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TT_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ILB_TAB	Trilha da Água Branca
    layers[16] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TAB.kml', {
        preserveViewport: false,
        map: map
    });

    layers[17] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TAB_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ILB_TB	Trilha do Bonete
    layers[18] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TBN.kml', {
        preserveViewport: false,
        map: map
    });

    layers[19] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TBN_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ILB_TPB	Trilha do Pico do Baepí
    layers[20] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TPB.kml', {
        preserveViewport: false,
        map: map
    });

    layers[21] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TPB_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //SSB_JTR	Trilha do Jatobá Rizzieri
    layers[22] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TJR.kml', {
        preserveViewport: false,
        map: map
    });

    layers[23] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TJR_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //SSB_TPB	Trilha da Praia Brava
    layers[24] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TPB.kml', {
        preserveViewport: false,
        map: map
    });

    layers[25] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TPB_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //SSB_TSC	Trilha do Sertão Camburi
    layers[26] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TSC.kml', {
        preserveViewport: false,
        map: map
    });

    layers[27] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TSC_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //UBT_TBA	Trilha da Brava da Almada
    layers[28] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TBA.kml', {
        preserveViewport: false,
        map: map
    });

    layers[29] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TBA_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //UBT_TPC	Trilha do Pico do Corcovado
    layers[30] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TPC.kml', {
        preserveViewport: false,
        map: map
    });

    layers[31] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TPC_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //UBT_TPS	Trilha da Praia do Sul
    layers[32] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TPS.kml', {
        preserveViewport: false,
        map: map
    });

    layers[33] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TPS_PP.kml', {
        preserveViewport: false,
        map: map
    });


    //  3  INTEPRETIVE PANNELS KML FILES
    //    Em Caraguatatuba
    layers[34] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '161DhWEVz1xuK4kGBJkCyMvhj1-sBaNuo7Is09KtO',
            where: "'Município' = 'Caraguatatuba'"
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //    Em Ilhabela    
    layers[35] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '161DhWEVz1xuK4kGBJkCyMvhj1-sBaNuo7Is09KtO',
            where: "'Município' = 'Ilhabela'"
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //    Em São Sebastião    
    layers[36] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '161DhWEVz1xuK4kGBJkCyMvhj1-sBaNuo7Is09KtO',
            where: "'Município' = 'São Sebastião'"
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //    Em Ubatuba    
    layers[37] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '161DhWEVz1xuK4kGBJkCyMvhj1-sBaNuo7Is09KtO',
            where: "'Município' = 'Ubatuba'"
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //Loop that sets the map to the layers        
    for (var i = 0; i < layers.length; i++) {
        layers[i].setMap(null);
    }

}

google.maps.event.addDomListener(window, 'load', initialize);