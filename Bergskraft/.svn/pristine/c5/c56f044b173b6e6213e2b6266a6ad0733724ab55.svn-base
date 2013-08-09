Bergis.Map = {
  init: function () {
    var config = Bergis.Configuration;
    var options = config.map.options;
    options.maxExtent = new OpenLayers.Bounds.fromString(config.map.bounds);
    // options.fallThrough = true;
    options.controls = [];

    map = new OpenLayers.Map('map', config.map.options);
    for (var i = 0; i < config.layers.length; i++) {
      var currentLayer = config.layers[i];
      if (config.layers[i].type == 'G_STREET_MAP') {
        var layerToAdd = new OpenLayers.Layer.Google(config.layers[i].title, { type: '', numZoomLevels: config.layers[i].numzoomlevel, 'minZoomLevel': config.layers[i].minzoomlevel, 'maxZoomLevel': config.layers[i].maxzoomlevel, isBaseLayer: true, sphericalMercator: true });
        layerToAdd.displayInLayerSwitcher = false;
//        layerToAdd.transitionEffect = 'resize';
        layerToAdd.layerId = config.layers[i].layerId;
        //To turn of zoomanimations, causes vector graphics behave odd.
        layerToAdd.animationEnabled = false;
        map.addLayer(layerToAdd);
        if (config.layers[i].visibility) {
          map.setBaseLayer(layerToAdd);
        }
//        if (layerToAdd != null) {
//          map.addLayer(layerToAdd);
//        }
      }
      else if (config.layers[i].type == 'G_HYBRID_MAP') {
        var layerToAdd = new OpenLayers.Layer.Google(config.layers[i].title, { type: google.maps.MapTypeId.HYBRID, numZoomLevels: config.layers[i].numzoomlevel, 'minZoomLevel': config.layers[i].minzoomlevel, 'maxZoomLevel': config.layers[i].maxzoomlevel, isBaseLayer: true, sphericalMercator: true });
        layerToAdd.displayInLayerSwitcher = false;
        //        layerToAdd.transitionEffect = 'resize';
        layerToAdd.layerId = config.layers[i].layerId;
        //To turn of zoomanimations, causes vector graphics behave odd.
        layerToAdd.animationEnabled = false;
        map.addLayer(layerToAdd);
        if (config.layers[i].visibility) {
          map.setBaseLayer(layerToAdd);
        }
      }
      else if (config.layers[i].type == 'G_PHYSICAL_MAP') {
        var layerToAdd = new OpenLayers.Layer.Google(config.layers[i].title, { type: google.maps.MapTypeId.TERRAIN, numZoomLevels: config.layers[i].numzoomlevel, 'minZoomLevel': config.layers[i].minzoomlevel, 'maxZoomLevel': config.layers[i].maxzoomlevel, isBaseLayer: true, sphericalMercator: true });
        layerToAdd.displayInLayerSwitcher = false;
        layerToAdd.layerId = config.layers[i].layerId;
        //To turn of zoomanimations, causes vector graphics behave odd.
        layerToAdd.animationEnabled = false;
        map.addLayer(layerToAdd);
        if (config.layers[i].visibility) {
          map.setBaseLayer(layerToAdd);
        }
      }
      else if (config.layers[i].type == "WMS") {
        var layerToAdd = new OpenLayers.Layer.WMS(config.layers[i].title, config.layers[i].url, config.layers[i].params, config.layers[i].options);
        layerToAdd.setVisibility(config.layers[i].visible);
        map.addLayer(layerToAdd);
      }
    }


    this.initTools();
    this.setMapOptions();
  },
  setMapOptions: function () {
    //OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
    OpenLayers.Events.prototype.includeXY = true;
    //map.zoomTo(6);
    //map.addControl(new OpenLayers.Control.OverviewMap())
    map.setCenter(new OpenLayers.LonLat(1732856.0980049, 8934456.7050804), 1);
    //Prevents navigation in map when backgroundlayer is in maxExtent zoom 
    //map.setOptions({ restrictedExtent: map.maxExtent });

    //fillTree();
  },
  initTools: function () {
    //map.addControl(new OpenLayers.Control.Navigation());
    var pZbar = new Bergis.Control.PanZoomBar();
    map.addControl(pZbar);

    map.addControl(new Bergis.Control.MapTypes({
      "mapswitcherControlRenderTo": "map-switcher-container"
    }));

    $("#sliderContainer .ui-slider-handle").css({
      border: "2px solid #DFA61E"
    });
    map.addControl(new OpenLayers.Control.MousePosition({
      numDigits: 0,
      separator: ' Ö  ',
      suffix: ' N',
      prefix: 'RT90: ',
      displayProjection: new OpenLayers.Projection("EPSG:2400")
    }));
    Proj4js.defs["EPSG:3006"] = "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ";
    map.addControl(new OpenLayers.Control.MousePosition({
      numDigits: 0,
      prefix: 'SWEREF 99 TM: ',
      displayProjection: new OpenLayers.Projection("EPSG:3006"),
      displayClass: "olControlMousePosition2"
    }));
    //map.addControl(new OpenLayers.Control.MouseDefaults());
    //Gets the DIV that will contain panel eith tools
    var toolsContainer = document.getElementById("toolBar-inner");
    var dragPan = new OpenLayers.Control.Navigation({ title: 'Panorera genom att klicka och dra i kartan' });
    var zoomBoxOut = new OpenLayers.Control.ZoomBox({ displayClass: "olControlZoomOutBox", out: true, title: "Zooma ut kartan genom att klicka och dra ut en markering" });
    var zoomBoxIn = new OpenLayers.Control.ZoomBox({ title: "Zooma in kartan genom att klicka och dra ut en markering" });
    //Sweco controls and actions
    var identify = new OpenLayers.Control.Identify({ title: "Få mer information genom att klicka på grafik över kartan", displayClass: "olControlIdentify" });
    //Deactivated by customer, may be used later on.
    //var printMap = new OpenLayers.Control.Button({ title: "Skriv ut", displayClass: "printMapButton", trigger: funcPrintMap });
    //The OpenLayers Panel
    var panel = new OpenLayers.Control.Panel({ div: toolsContainer });
    panel.addControls([
            dragPan,
            zoomBoxIn,
            zoomBoxOut,
            identify
        ]);
    //Adds the panel to the map object.
    map.addControl(panel);
    dragPan.activate();



    //        var pZ = new OpenLayers.Control.PanZoom({ slideFactor: 100 });
    //        //        pZ.position = new OpenLayers.Pixel(540, 260);
    //        map.addControl(pZ);

    //map.addControl(new OpenLayers.Control.OverviewMap());

    //ScaleList DEBE
    //        var scaleList = $("#scaleList");
    //        for (var i = 0; i < map.resolutions.length; i++) {
    //            var res = map.resolutions[i];
    //            var scale = OpenLayers.Util.getScaleFromResolution(res, 'm');
    //            scaleList.addOption(res, '1:' + Math.round(scale));
    //        }

    //        scaleList.change(function() {
    //            var zoomlevel = map.getZoomForResolution(scaleList.val());
    //            map.zoomTo(zoomlevel);
    //        });

    //        map.events.register('zoomend', scaleList, function() {
    //            scaleList.val(map.getResolution());
    //        });
    //        scaleList.val(map.getResolution());
  }
}
