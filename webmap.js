/*global $ */

// organizar o css/estilo da janela de seleção de trilhas


// Set the KML path
//kml_path = "http://www.nhc.noaa.gov/storm_graphics/api/AL092011_019adv_"
//
//// Load the KML files (must be publically available)
//coneLayer = new google.maps.KmlLayer(
//  kml_path + "CONE.kmz", 
//    {preserveViewport: true}
//  );





var map;
var layers = [];



// Função para trocar os layers das trilhas onclick
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


// Função para excluir todas as trilhas abertas ao clicar no nome do município
function closeTrilha() {
    'use strict';
    layers[20].setMap(null);
    layers[21].setMap(null);
    layers[22].setMap(null);
    layers[23].setMap(null);
    layers[24].setMap(null);
    layers[39].setMap(null);
    layers[41].setMap(null);
    layers[43].setMap(null);
    layers[46].setMap(null);
    layers[47].setMap(null);
    layers[49].setMap(null);
    layers[58].setMap(null);
    layers[61].setMap(null);
    layers[60].setMap(null);
    layers[62].setMap(null);
    layers[64].setMap(null);
    layers[79].setMap(null);
    layers[78].setMap(null);
    layers[81].setMap(null);
    layers[80].setMap(null);
    layers[83].setMap(null);
    layers[82].setMap(null);
    layers[86].setMap(null);
    layers[89].setMap(null);
    layers[90].setMap(null);
    layers[92].setMap(null);
    layers[94].setMap(null);
    layers[96].setMap(null);
    layers[98].setMap(null);
    layers[100].setMap(null);
    layers[102].setMap(null);
}




// Função para trocar os layers dos temas onclick, essa função desativa o layer anterior
function toggleLayer(i) {
    'use strict';
    layers[1].setMap(null);
    layers[2].setMap(null);
    layers[3].setMap(null);
    layers[4].setMap(null);
    layers[5].setMap(null);
    layers[6].setMap(null);
    layers[7].setMap(null);
    layers[8].setMap(null);
    layers[9].setMap(null);
    layers[10].setMap(null);
    layers[i].setMap(map);
}






// Função que inicializa o mapa
function initialize() {
    'use strict';
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: new google.maps.LatLng(-23.682115699537057, -45.33391768457034),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN


    });

//    google.maps.event.addListener(map, 'zoom_changed', function () {
//        if (map.getZoom() < minZoomLevel) {
//            map.setZoom(minZoomLevel);
//        }
//    });


    //Função para ativar/desativar o container com a lista das trilhas
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
        //    else {
        //    document.getElementById("carDrop,ilbDrop").classList.remove("show");
        //    }
    });


    // Função  para definir as cores dos botões dos temas quando clicados
    // Não pode haver uma única função misturando temas e botões dos municípios    
    $(document).ready(function () {
        $('.white,.grey').on('click', function () {
            var isActive = ($(this).hasClass('selected')) ? true : false; // checks if it is already active
            $('.selected').removeClass('selected');
            if (!isActive) {
                $(this).addClass('selected');
            } // set active only if it was not active
        });
    });


    // Função  para definir as cores dos botões dos municípios quando clicados    
    $(document).ready(function () {
        $('.whiteTRI,.greyTRI').on('click', function () {
            var isActive = ($(this).hasClass('selectedTRI')) ? true : false; // checks if it is already active
            $('.selectedTRI').removeClass('selectedTRI');
            if (!isActive) {
                $(this).addClass('selectedTRI');
            } // set active only if it was not active
        });
    });


    // Função  para definir as cores dos botões das trilhas quando clicados         
    $(".carDrop-content a, .ilbDrop-content a, .ssbDrop-content a, .ubtDrop-content a").click(function () {
        $('selectedTRI').removeClass('selectedTRI');
        $(this).toggleClass('selectedTRI');
    });
    //// Função que realiza a mesma operação que a função acima
    //    $(".carDrop-content a").click(function () {
    //        $('selectedTRI').not(this).removeClass('selectedTRI');
    //        $(this).toggleClass('selectedTRI');
    //    });


    //////////////////////////////////////////////

    // 1. DADOS

    // 1.1 TEMAS

    //		Geossítios GeoHereditas
    layers[0] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1EOSEUaIulMw6uGem_fSFgtt7ID0g-P5uiIqqAOE'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Geologia CPRM
    layers[1] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1AsJHFs-WArBdqN7xXW_W_g4z13heBlBgZjWbwrw'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Relevo CPRM
    layers[2] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1w3Sv5pv8x8R491auurusiiN8WhrxPTpx6jCqcaY'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Solos CPRM
    layers[3] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1sJrW4LWFBgqHp5tqpKO09DwpPJwFoNxQpFOI14g'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Aquíferos CPRM
    layers[4] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1CJsuDtrfTsmXsNyWEzCxbTBVcx4SvgLDW3tQtMo'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Vegetação IBGE [AINDA NÃO TENHO]
    layers[5] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: ''
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Batimetria CPRM
    layers[6] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1s-WDgoElFtC9Jy_JYy3v4mQc5sp0u0zYPSs8fcs'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Cavernas CPRM
    layers[7] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1obXro-mpfvXe2P-fcTRtooMel434SQtpVKKjNTM'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Diques CPRM
    layers[8] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1Dv66O7s1GQxyzSsFK4U0GWX4vZOFGNWw0-AqGCo'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		EStruturas CPRM
    layers[9] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1DDO0Agrg6QY9e29awY5FL9ChJJmIsBJqMnXcW1w'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Estruturas Oceano CPRM
    layers[10] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1VuC9H250byLXDnAPihQk1MhYNC2vdJksUF_vvD0'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Geossítios SIGEP
    layers[11] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1dVtU2slM97nzYqGAhBGhBWmL8LChbchFcoH3fHQ'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Isopacas CPRM
    layers[12] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1bQfFNKx3BZSr57AH_xlqU0bOww-mrQZdyoPNK3I'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		Terras Indígenas CPRM
    layers[13] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '1Rh2CWHxZh80b0oWske72P8gStshRwbec7cyZNI8'
        },
        map: map,
        styleId: 2,
        templateId: 2

    });

    //		Municípios IBGE 2010
    layers[14] = new google.maps.FusionTablesLayer({
        query: {
            select: "'col2>>0'",
            from: '13HopqMtQ7YGSJEkKYbtFv7SLsRwdybjqus1htoU'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		UCSEI UCs estaduais de proteção integral MMA
    layers[15] = new google.maps.FusionTablesLayer({
        query: {
            select: "col2>>0",
            from: '1bwVL9gORSh41IQp8MXilEgd2tykL8Ug-K3gVYvE'
        },
        map: map,
        styleId: 2,
        templateId: 2

    });

    //		UCSEU UCs estaduais de uso sustentável MMA
    layers[16] = new google.maps.FusionTablesLayer({
        query: {
            select: "col2>>0",
            from: '1OhfVD_Oz0vusLi9bqxgEH3ebsCV7pYPMGYColKs'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		UCSFI UCs federais de proteção integral MMA
    layers[17] = new google.maps.FusionTablesLayer({
        query: {
            select: "col2>>0",
            from: '1ww0V4GvTIHc-Vu4Rg-XIVUag56J56o7Fv6Ovj0k'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		UCSFUS UCs federais de uso sustentável MMA
    layers[18] = new google.maps.FusionTablesLayer({
        query: {
            select: "col2>>0",
            from: '1VihYfUi2JIWJt-WLBtG17v3jgCF9JxDawsPhK1g'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		UCSMI UCs municipais de proteção integral MMA
    layers[19] = new google.maps.FusionTablesLayer({
        query: {
            select: "col2>>0",
            from: '1K-xUU9u3S4a6GNZldFJYoUPJ8IAmRCl2SC-lFqE'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });

    //		UCSMU UCs municipais de uso sustentável MMA
    layers[20] = new google.maps.FusionTablesLayer({
        query: {
            select: "col2>>0",
            from: '1BDr-2dZF-qYlcItAWTduKRUuyZYezl6JPdlsDmo'
        },
        map: map,
        styleId: 2,
        templateId: 2
    });



    // 1.2 TRILHAS

    // 1.2.1 TRILHAS EM CARAGUATATUBA    

    //crg_tp	Trilha do Poção    
    layers[21] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TP.kml', {
        preserveViewport: false,
        map:map
    });

    layers[22] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TP_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //crg_tt	Trilha dos Tropeiros
    layers[23] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TT.kml', {
        preserveViewport: false,
        map: map
    });

    //crg_tt_PP	Trilha dos Tropeiros
    layers[24] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/CRG_TT_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[25] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[26] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[27] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[28] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[29] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[30] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[31] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[32] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[33] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[34] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[35] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[36] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[37] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    // 1.2.2 TRILHAS EM ILHABELA

    //ilb_tab	Trilha da Água Branca [NÃO TEMOS AINDA]
    layers[38] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ilb_tab_pp	Trilha da Água Branca
    layers[39] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TAB_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ilb_tbn	Trilha do Bonete [NÃO TEMOS AINDA]
    layers[40] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ilb_tbn_pp	Trilha do Bonete
    layers[41] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TBN_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ilb_tcab	Trilha da Cachoeira da Água Branca [NÃO TEMOS AINDA]
    layers[42] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ilb_tcab_pp	Trilha da Cachoeira da Água Branca
    layers[43] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TCAB_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[44] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[45] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ilb_tpb	Trilha do Pico do Baepí
    layers[46] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TPB.kml', {
        preserveViewport: false,
        map: map
    });

    //ilb_tpb_PP	Trilha do Pico do Baepí
    layers[47] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TPB_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ilb_tpf	Trilha da Praia da Fome [NÃO TEMOS AINDA]
    layers[48] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ilb_tpf_pp	Trilha da Praia da Fome
    layers[49] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/ILB_TPF_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[50] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[51] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[52] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[53] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[54] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[55] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[56] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[57] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });



    // 1.2.3 TRILHAS EM SÃO SEBASTIÃO


    //ssb_tpb	Trilha da Praia Brava
    layers[58] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TPB.kml', {
        preserveViewport: false,
        map: map
    });

    //ssb_tpb_PP	Trilha da Praia Brava [NÃO TEMOS AINDA]
    layers[59] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ssb_trp	Estrada Rio Pardo Limeira
    layers[60] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TRP.kml', {
        preserveViewport: false,
        map: map
    });

    //ssb_trp_PP
    layers[61] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TRP_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ssb_tsc	Trilha do Sertão Camburi
    layers[62] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TSC.kml', {
        preserveViewport: false,
        map: map
    });

    //ssb_tsc_PP	Trilha do Sertão Camburi [NÃO TEMOS AINDA]
    layers[63] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ssb_tsj	Trilha do Sítio Jatobá
    layers[64] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/SSB_TSJ.kml', {
        preserveViewport: false,
        map: map
    });

    //ssb_tsj_PP	Trilha do Sítio Jatobá [NÃO TEMOS AINDA]
    layers[65] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[66] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[67] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[68] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[69] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[70] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[71] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[72] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[73] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[74] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[75] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA]
    layers[76] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //[ESPAÇO PARA OUTRA TRILHA COM PP]
    layers[77] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });




    // 1.2.4 TRILHAS EM UBATUBA

    //ubt_tba	Trilha da Brava da Almada
    layers[78] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TBA.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tba_pp	Trilha da Brava da Almada
    layers[79] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TBA_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tc	Trilha do Camburi
    layers[80] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TC.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tc_pp	Trilha do Camburi
    layers[81] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TC_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tcc	Trilha das Cachoeiras
    layers[82] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TCC.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tcc_pp	Trilha das Cachoeiras
    layers[83] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TCC_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tco	Trilha do Corisco
    layers[84] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TCO.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tco_pp	Trilha do Corisco [NÃO TEMOS AINDA]
    layers[85] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ubt_tct	Trilha Camburi Trindade
    layers[86] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TCT.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tct_pp	Trilha Camburi Trindade [NÃO TEMOS AINDA]
    layers[87] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ubt_tj	Trilha do Jatobá
    layers[88] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TJ.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tj_pp	Trilha do Jatobá
    layers[89] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TJ_PP.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tp	Trilha do Pirapitinga
    layers[90] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TP.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tp_pp	Trilha do Pirapitinga [NÃO TEMOS AINDA]
    layers[91] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ubt_tpc	Trilha do Pico do Corcovado
    layers[92] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TPC.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tpc_pp	Trilha do Pico do Corcovado [NÃO TEMOS AINDA]
    layers[93] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ubt_tpe	Trilha da Praia do Engenho
    layers[94] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TPE.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tpe_pp	Trilha da Praia do Engenho [NÃO TEMOS AINDA]
    layers[95] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ubt_tps	Trilha da Praia do Sul
    layers[96] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TPS.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tps_pp	Trilha da Praia do Sul [NÃO TEMOS AINDA]
    layers[97] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ubt_trb	Trilha do Rio Bonito
    layers[98] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TRB.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_trb_pp	Trilha do Rio Bonito [NÃO TEMOS AINDA]
    layers[99] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ubt_tsg	Trilha do Saco Grande
    layers[100] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TSG.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tsg_pp	Trilha do Saco Grande [NÃO TEMOS AINDA]
    layers[101] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });

    //ubt_tsp	Trilha das Sete Praias
    layers[102] = new google.maps.KmlLayer('http://www.igc.usp.br/fileadmin/files/geohereditas/webmap_kml/UBT_TSP.kml', {
        preserveViewport: false,
        map: map
    });

    //ubt_tsp_pp	Trilha das Sete Praias [NÃO TEMOS AINDA]
    layers[103] = new google.maps.KmlLayer('', {
        preserveViewport: false,
        map: map
    });



    //loop that sets the map to the layers        
    for (var i = 0; i < layers.length; i++) {
        layers[i].setMap(null);
    }

}



    






google.maps.event.addDomListener(window, 'load', initialize);