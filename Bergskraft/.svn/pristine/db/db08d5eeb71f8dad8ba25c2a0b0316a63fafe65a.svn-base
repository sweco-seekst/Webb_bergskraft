Bergis.Control.PanZoomBar = OpenLayers.Class(OpenLayers.Control.PanZoomBar, {
  zoomStopWidth: 23,
  zoomStopHeight: 18,
  panIconW: 17,
  panIconH: 19,
  plusDependency: 0,
  minimized: false,
  panZoombarLevelImg: "zoompan_zoomlevels.png",
  draw: function (px) {
    var imgLocation = OpenLayers.Util.getImagesLocation();
    OpenLayers.Control.prototype.draw.apply(this, arguments);
    px = this.position.clone();
    this.buttons = [];
    var sz = new OpenLayers.Size(this.panIconW, this.panIconH);
    var centered = new OpenLayers.Pixel(px.x + sz.w / 2, px.y);
    this._addButton("zoomout", 'zoompan_minus.png', centered.add(83, sz.h - 9), sz);

    //If zoomlevels more than 9 add pixels to zoombar position x and change image to max 19 levels.
    if (this.map.getNumZoomLevels() > 9) {
      this.plusDependency = 23;
      this.panZoombarLevelImg = "zoompan_zoomlevels19_2.png";
    }
    if (this.panZoomControlMinWindowWidth > $(window).width()) {
      this.minimized = true;
    }
    if (this.minimized) {
      this._addButton("zoomin", 'zoompan_plus.png', centered.add(108, sz.h - 7), sz);
    }
    else {
      this._addButton("zoomin", 'zoompan_plus.png', centered.add((this.zoomStopWidth * this.map.getNumZoomLevels()) + 98 + this.plusDependency, sz.h - 9), sz);
    }
    centered = centered.add(100, sz.h * 1 - 7); // Position of zoombar.


    if (!this.minimized) {
      centered = this._addZoomBar(centered);
      this._addSlider();
    }
    this._addPanZoomButtons();
    this.div.style.top = "";
    this._setPanZoomBgSize();
    return this.div;

  },
  _setPanZoomBgSize: function () {
    var baseWidth = 153;
    if (this.minimized) {
      this.div.style.width = baseWidth + "px";
      this.div.style.left = '38%';
    }
    else {
      //this.div.style.width = baseWidth + (this.zoomStopWidth * this.map.getNumZoomLevels()) + this.plusDependency + "px";
        this.div.style.width = '464px';
        this.div.style.left = '50%';
        this.div.style.marginLeft = '-232px';
    }
  },
  _addSlider: function () {
    var numZoomLevels = this.map.getNumZoomLevels();
    var startZoom = this.map.getZoom();
    var pzPosition = this.position.clone();
    pzPosition.x = pzPosition.x + 108.5;
    var sliderContainer = $("<div id='sliderContainer'></div>").css({
      'position': 'absolute',
      'bottom': '18px',
      'left': pzPosition.x + 6,
      'z-index': 3,
      'width': (numZoomLevels - 1) * 25
    });
    var mapObj = this.map;
    var slider = $("<div id='slider'></div>").appendTo(sliderContainer).slider({
      min: 0,
      max: numZoomLevels - 1,
      animate: true,
      orientation: 'horizontal',
      step: 1,
      value: startZoom,
      slide: function (event, ui) {
        mapObj.zoomTo(ui.value);
      }
    });

    $(sliderContainer).appendTo(this.div);
    this.map.events.register("zoomend", this, function () {
      var zoom = parseInt(this.map.getZoom());
      slider.slider("value", zoom);
    });
    //        $("#slider a").css("cursor", "pointer"); //.mouseover(function () { alert("dd") });
  },
  _addZoomBar: function (centered) {
    var imgLocation = OpenLayers.Util.getImagesLocation();
    var sz = new OpenLayers.Size();

    sz.w = this.zoomStopWidth * this.map.getNumZoomLevels() + this.plusDependency - 8; //Om många zoomnivåer +15
    sz.h = 11; // this.zoomStopHeight;
    centered.y = centered.y + 2;

    centered.x = centered.x + 6;
    var div = null;
    //Den ska va 160px!!!!
    div = OpenLayers.Util.createDiv('OpenLayers_Control_PanZoomBar_Zoombar' + this.map.id, centered, sz, imgLocation + "zoompan_zoomlevels19_2.png"); //This is the one
    this.zoombarDiv = div;
    this.div.appendChild(div);
    centered = centered.add(this.zoomStopWidth * this.map.getNumZoomLevels(), 0);
    return centered;
  },
  _addPanZoomButtons: function () {
    var px = new OpenLayers.Pixel(25, -10);
    var pzPosition = this.position.clone();
    var sz = new OpenLayers.Size(18, 18);
    pzPosition.x = pzPosition.x + 30;
    pzPosition.y = pzPosition.y + 2;

    this._addButton("panup", "zoompan_up.png", pzPosition, sz);
    px.y = pzPosition.y + (sz.h / 2);
    px.x = px.x - (sz.w / 2);
    this._addButton("panleft", "zoompan_left.png", px, sz);
    this._addButton("panright", "zoompan_right.png", px.add(sz.w * 2, 0), sz);
    this._addButton("pandown", "zoompan_down.png",
                        pzPosition.add(0, sz.h), sz);
  },
  /**
  * APIMethod: _removeZoomBar
  */
  _removeZoomBar: function () {

  },
  /**
  * APIMethod: destroy
  */
  destroy: function () {

  },
  CLASS_NAME: "Bergis.PanZoomBar"
});