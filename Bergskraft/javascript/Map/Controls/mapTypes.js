/// <reference path="../jQuery/jquery-1.4.1-vsdoc.js" />
/** Requires Epos.Control.HashTags **/
Bergis.Control.MapTypes = OpenLayers.Class(OpenLayers.Control, {
  /**
  * APIProperty: text
  * The text for the link
  */
  mapTypesControlText: "Maptypes",
  div: "link-maptypes",
  /**
  * APIProperty: mapswitcherControlRenderTo
  * Element to put the link in (default: "map-links")
  */
  mapswitcherControlRenderTo: "map-links",
  /**
  * APIProperty: instanceID
  * InstanceID used both while searching and populating Toc.
  */
  instanceID: null,
  /**
  * APIProperty: visibility
  * true/false, depending on visibility of the checkbox tool.
  */
  visibility: true,
  /**
  * APIProperty: allInstances
  * Set to 0 if false, set to 1 if true.
  */
  allInstances: 0,
  minimized: false,
  registeredControls: {},
  eposMap: null,
  mapTypesToggleControl: false,
  toggleToolChangeTo: null,
  mapswitcherControlMinWindowWidth: 0,

  //Controls that can be used by this control.
  controls: ["Epos.Control.AutoComplete", "Epos.Control.Toc", "Epos.Control.selectControl"],
  /**
  * APIProperty: eventListeners
  * {Object} If set as an option at construction, the eventListeners
  *     object will be registered with <OpenLayers.Events.on>.  Object
  *     structure must be a listeners object as shown in the example for
  *     the events.on method.
  */
  eventListeners: null,
  /** 
  * APIProperty: events
  * {<OpenLayers.Events>} Events instance for listeners and triggering
  *     control specific events.
  */
  events: null,
  /**
  * Constant: EVENT_TYPES
  * {Array(String)} Supported application event types.  Register a listener
  *     for a particular event with the following syntax:
  * (code)
  * control.events.register(type, obj, listener);
  * (end)
  *
  * Listeners will be called with a reference to an event object.  The
  *     properties of this event depends on exactly what happened.
  *
  * All event objects have at least the following properties:
  * object - {Object} A reference to control.events.object (a reference
  *      to the control).
  * element - {DOMElement} A reference to control.events.element (which
  *      will be null unless documented otherwise).
  *
  * Supported map event types:
  * activate - Triggered when activated.
  * deactivate - Triggered when deactivated.
  */
  EVENT_TYPES: ["onLoadComplete"],
  /**
  * Constructor: Epos.Control.InstanceSelection
  * 
  * Parameters:
  * options - {Object} 
  */
  initialize: function (options) {
    this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
    OpenLayers.Control.prototype.initialize.apply(this, [options]);
  },
  /** draw
  *   Creates a button for each baselayer that is added to the map object.
  */
  draw: function () {
    var layers = this.map.getLayersBy("isBaseLayer", true);

    if (this.mapswitcherControlMinWindowWidth > $(window).width()) {
      this.minimized = true;
    }
    this.events.triggerEvent("onLoadComplete", { control: this });
    if (layers.length != 1) {
      //Draw toggle type tool for mobile version, requires that only two baselayers are defined in settings file. 
      if (this.mapTypesToggleControl == true && Epos.Global.isMobile == true) {
        this.drawToggleTool(layers);
      }
      //Draw mobile/minimized version of baselayer-switcher. 
//      else if (Epos.Global.isMobile == true || this.minimized == true) {
//        this.drawMobileVersionTool(layers);
//      }
//      else {
        this.drawOriginalTool(layers);
//      }
    }
  },
  drawToggleTool: function (layers) {
    $("#" + this.mapswitcherControlRenderTo).append("<li id='" + this.div + "-toggle'><a id='" + layers[1].layerId + "' class='" + layers[1].name + "' href='javascript:'>" + layers[1].name + "</a></li>");
    var elm = $("#" + layers[1].layerId)[0];
    var context = this;
    this.toggleToolChangeTo = layers[0].layerId + ';' + layers[0].name;
    new Epos.Application.ui.FastButton(elm, this.onToggle, context);
  },
  drawOriginalTool: function (layers) {
    var swUl = $("<ul id='map-switcher'></ul>");
    for (var i = 0; i < layers.length; i++) {
      var selected = "";
      if (layers[i].visibility) {
        selected = " selected";
      }
      var cssClass = "middle";
      if (i == 0) {
        cssClass = "first";
      }
      else if (i == layers.length - 1) {
        cssClass = "last";
      }
      var eventHandler = this.changeBaseLayer;
      var thisMapInstance = this.map;

      var swLi = $("<li class='" + cssClass + selected + "'></li>");
      $("<a href='javascript:;' id='" + layers[i].layerId + "'>" + layers[i].name + "</a>").click(function () {
        if ($(this).parent().hasClass("selected")) {
          return false;
        }
        else {
          $("#map-switcher li").removeClass("selected");
          $(this).parent().addClass("selected");
          var id = $(this).attr("id");
          eventHandler(id, thisMapInstance);
        }

      }).appendTo(swLi);
      $(swLi).appendTo(swUl);
    }
    $(swUl).appendTo("#" + this.mapswitcherControlRenderTo);
    $("#map-switcher").show();
  },
  drawMobileVersionTool: function (layers) {
    var div = this.div;
    $("#" + this.mapswitcherControlRenderTo).append("<li id='" + div + "'><a href='javascript:'>" + this.mapTypesControlText + "</a></li>");
    var elm = "";
    if (Epos.Global.isMobile) {
      elm = $("#" + div + " a")[0];
    }
    else {
      elm = $("#" + div)[0];
    }
    var context = this;
    new Epos.Application.ui.FastButton(elm, this.onClick, context);
    var swUl = $("<ul></ul>");
    $(swUl).appendTo("#minimized-map-switcher-inner");
    for (var i = 0; i < layers.length; i++) {
      var selected = "";
      if (layers[i].visibility) {
        selected = " selected";
      }
      var cssClass = "middle";
      if (i == 0) {
        cssClass = "last";
      }
      else if (i == layers.length - 1) {
        cssClass = "first";
      }
      var eventHandler = this.changeBaseLayer;
      var thisMapInstance = this.map;

      var swLi = $("<li class='" + cssClass + "'></li>");
      $("<div id='" + layers[i].layerId + "'><span class='" + selected + "'><p>" + layers[i].name + "</p></span></div>").appendTo(swLi);
      $(swLi).appendTo(swUl);

      var blElm = $("#" + layers[i].layerId)[0];
      context = this;
      new Epos.Application.ui.FastButton(blElm, function () {
        if ($("#" + this.element.id + " span").hasClass("selected")) {
          return false;
        }
        else {
          $("#minimized-map-switcher-inner div span").removeClass("selected");
          $("#" + this.element.id + " span").addClass("selected");
          eventHandler(this.element.id, thisMapInstance);
        }
        $("#minimized-map-switcher").fadeOut(300);
        if (Epos.Global.isMobile) {
          $(elm).removeClass("selected");
        }
        else {
          $("a", elm).removeClass("selected");
        }
      }, context);
    }
  },
  onClick: function (e) {
    var elm = null;
    if (Epos.Global.isMobile) {
      elm = this.element;
    }
    else {
      elm = $("a", this.element);
    }
    $("#" + this.context.mapswitcherControlRenderTo).find('a').each(function () {
      if ($(this).parent().attr('id') != $(elm).parent().attr('id')) {
        $(this).removeClass("selected");
      }
    });
    $(".overlay").fadeOut(300);
    $(".minimized-box").fadeOut(300);
    if ($(elm).hasClass("selected")) {
      $("#minimized-map-switcher").fadeOut(300);
      $(elm).removeClass("selected");
    }
    else {
      $(elm).addClass("selected");
      if (Epos.Global.isMobile) {
        $("#minimized-map-switcher").fadeIn(300);
      }
      else {
        var pos = $("#" + this.element.id).offset();
        var height = $("#" + this.element.id).height();
        pos.top = pos.top + height;
        pos.left = pos.left;
        $("#minimized-map-switcher").css(pos);
        $("#minimized-map-switcher").slideDown('slow');
      }
    }

  },
  onToggle: function (e) {
    var id = $(this.element).attr("id");
    this.context.changeBaseLayer(id, this.context.map);
    var newId = this.context.toggleToolChangeTo.split(';')[0];
    var newName = this.context.toggleToolChangeTo.split(';')[1];
    this.context.toggleToolChangeTo = $(this.element).attr("id") + ';' + $(this.element).text();
    this.element.id = newId;
    if ($(this.element).hasClass(newName)) {
      $(this.element).removeClass(newName);
      $(this.element).addClass($(this.element).text());
    }
    else {
      $(this.element).removeClass($(this.element).text());
      $(this.element).addClass(newName);
    }
    this.element.innerHTML = newName;
  },
  /** changeBaseLayer
  *   Changes the clicked baselayer to active.
  *   Also updates the map size, this is done because of problems with Google and Bing when resizing the browser window.
  *   Parameters:
  *   id: the id of the clicked baselayer.
  *   thisMapInstance: the current mapinstance. This must be used because this being an eventhandler.
  */
  changeBaseLayer: function (id, thisMapInstance) {
    var layer = thisMapInstance.getLayersBy("layerId", id)[0];
    thisMapInstance.baseLayer.setOpacity(0);
    if (!layer.visibility) {
      thisMapInstance.setBaseLayer(layer);
      layer.setOpacity(1);
      thisMapInstance.updateSize();
    }
  },
  CLASS_NAME: "Bergis.Control.MapTypes"
});