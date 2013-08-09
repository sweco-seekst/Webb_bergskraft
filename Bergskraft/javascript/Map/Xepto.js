/**
 * WebGIS JS Library
 * Copyright(c) 2007, Sweco Position
 * 
 * Author: Björn Harrtell
 *
 * @fileoverview OpenLayers.Layer.Xepto class
 */

/**
 * @class Xepto OpenLayers grid layer
 * @extends OpenLayers.Layer.Grid
 * @requires OpenLayers/Layer/Grid.js
 * @param {String} name Name of layer
 * @param {String} token authenticated Xepto service token
 * @param {String} url URL to Xepto service
 * @param {Object} options Xepto service specific options<br>
 {int} [minZoomLevel] Required config option<br>
 {int} [maxZoomLevel] Required config option<br>
 {Array} [minXArray] Required config option<br>
 {Array} [minYArray] Required config option<br>
 {Array} [maxXArray] Required config option<br>
 {Array} [maxYArray] Required config option<br>
 {Array} [sizes] Required config option<br>
 */
OpenLayers.Layer.Xepto = function() {}; // jsdoc parser workaround
OpenLayers.Layer.Xepto = OpenLayers.Class(OpenLayers.Layer.Grid, {
		
		// overridden config options
    isBaseLayer: true,
		tileSize: new OpenLayers.Size(250, 250),
    	
    /**
    * @constructor
    *
    * @param {String} name
    * @param {String} token
    * @param {String} url
    * @param {Object} params
    * @param {Object} options Hashtable of extra options to tag onto the layer
    */
    initialize: function(name, token, url, options) {
			var newArguments = new Array();
			newArguments.push(name, url, {}, options);
		
			OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);


		if (typeof(token) != 'undefined') {
				this.token = token;
		}
		else {
				if (typeof(OpenLayers.Layer.Xepto.GetToken) != 'undefined') {
						this.token = OpenLayers.Layer.Xepto.GetToken();
						
				}
				else {
						throw this.tokenFunctionErrorText;
				}
		}

    },

		// overridden to set maxextent and tileorigin for each zoomlevel
		initGriddedTiles: function(bounds) {
			var z = this.maxZoomLevel-this.map.getZoom();
			this.maxExtent = new OpenLayers.Bounds(this.minXArray[z],this.minYArray[z],this.maxXArray[z],this.maxYArray[z]);    	
			this.tileOrigin = new OpenLayers.LonLat(this.minXArray[z], this.minYArray[z]);
		
			OpenLayers.Layer.Grid.prototype.initGriddedTiles.apply(this, arguments);
		},
		
    getURL: function (bounds) {
			var res = this.map.getResolution();
			var z = this.maxZoomLevel-this.map.getZoom();
			
			var x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
			var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
			
			// xepto seem to have reverse y tile ordering
			var tilemax = (this.maxYArray[z]-this.minYArray[z])/(this.sizes[z]);
			y = tilemax-1-y;

			return this.url + "?token="+ this.token + "&zoomlevel=" + z + "&x=" + x + "&y=" + y; 
    },

    addTile: function(bounds,position) {
        return new OpenLayers.Tile.Image(this, position, bounds, null, this.tileSize);
    },

    /** @final @type String */
    CLASS_NAME: "OpenLayers.Layer.Xepto"
});
