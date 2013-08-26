﻿/// <reference path="../jQuery/1.3.1/jquery-1.3-vsdoc.js" />

var selTitleArray = [];
var urlArr = [];
var globalArray = [];
var ajaxSendCounter = 0;
var ajaxReturnCounter = 0;
var insertUrlCounter = 0;
var searchFlag = false;
var loadMask;

OpenLayers.Control.Identify = function() { }; // jsdoc parser workaround
OpenLayers.Control.Identify = OpenLayers.Class(OpenLayers.Control, {

    type: OpenLayers.Control.TYPE_TOOL,


    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);

        this.handler = new OpenLayers.Handler.Click(this, { click: this.identify });
    },


    identify: function(event) {

        if (searchFlag != true) {

            //Following are used to clear resultlists when a new search begins
            var elm = document.getElementById("resultPanel");
            elm.innerHTML = "";
            var obj = document.getElementById('titleList');
            for (var i = 0; i < obj.options.length; i++) {
                obj.options[i] = null;
            }

            jQuery("#loadingBar").removeClass("hide");

            searchFlag = true;
            urlArr.length = 0;
            selTitleArray.length = 0;
            var countTitles = 0;
            var sendTitleArr = [];

            var lonlat = map.getLonLatFromViewPortPx(event.xy);
            var x = lonlat.lon;
            var y = lonlat.lat;

            var allChbx = jQuery("input[type=checkbox]", "#toc2");
            for (var i = 0; i < allChbx.length; i++) {
                if (allChbx[i].checked == true) {
                    var chbxID = allChbx[i].id;
                    for (var j = 0; j < map.layers.length; j++) {
                        if (map.layers[j].name == allChbx[i].value) {
                            var queryLayer = map.layers[j];

                            //If layertype is points we make a square click wmsrequest
                            if (queryLayer.type) {
                                var left = x - (x * 0.0001);
                                var bottom = y - (y * 0.000025);
                                var right = x + (x * 0.0001);
                                var top = y + (y * 0.000025);
                                var bBox = left + "," + bottom + "," + right + "," + top;
                                var width = 1;
                                var height = 1;
                            }
                            else {
                                var bBox = queryLayer.map.getExtent().toBBOX();
                                var width = queryLayer.map.size.w;
                                var height = queryLayer.map.size.h;
                            }

                            if (queryLayer.CLASS_NAME == 'OpenLayers.Layer.WMS') {
                                var url = queryLayer.getFullRequestString({
                                    REQUEST: "GetFeatureInfo",
                                    EXCEPTIONS: "application/vnd.ogc.se_xml",
                                    BBOX: bBox,
                                    X: event.xy.x,
                                    Y: event.xy.y,
                                    FEATURE_COUNT: 10,
                                    INFO_FORMAT: 'text/html',
                                    QUERY_LAYERS: allChbx[i].name,
                                    WIDTH: width,
                                    HEIGHT: height
                                });
                                url2 = queryLayer.getFullRequestString({
                                    REQUEST: "GetFeatureInfo",
                                    EXCEPTIONS: "application/vnd.ogc.se_xml",
                                    BBOX: bBox,
                                    X: event.xy.x,
                                    Y: event.xy.y,
                                    FEATURE_COUNT: 10,
                                    INFO_FORMAT: 'text/html',
                                    QUERY_LAYERS: allChbx[i].name,
                                    WIDTH: width,
                                    HEIGHT: height
                                });
                                handleCommentResult(url2, "success");
                                
                                if (queryLayer.options.proxy) {
                                    url = queryLayer.options.proxy + '?url=' + encodeURIComponent(url);
                                    url2 = queryLayer.options.proxy + '?url=' + encodeURIComponent(url2);
                                }
                                try {
                                    jQuery.ajax({
                                        type: "GET",
                                        argument: chbxID,
                                        url: url,
                                        dataType: "html",
                                        success: handleResult
                                    });
                                    //jQuery.ajax({
                                    //    type: "GET",
                                    //    argument: chbxID,
                                    //    url: url2,
                                    //    dataType: "html",
                                    //    success: handleCommentResult
                                    //});
                                }
                                catch (ex) {
                                    alert("Error in AJAX request!");
                                }
                                ajaxSendCounter++;
                            }
                        }
                    }
                }
            }
            if (ajaxSendCounter == 0) {
                jQuery("#loadingBar").addClass("hide");
                searchFlag = false;
            }
        }
    },
    CLASS_NAME: "OpenLayers.Control.Identify"
});

function handleResult(resp, status) {
    
    if (status == "success") {
        var chbxID = this.argument;
        insertIntoArray(resp, chbxID);
        
    }
}

function handleCommentResult(resp, status) {
    if (status == "success") {
       // var response = resp.split("<!DOCTYPE");
       // response = response[0];
        Bergis.Dialogs.commentResult = resp;
    }
}

//dvdo
//When infoclickin a geoserver and getting back an empty answer it´s length is 2254 or 2255 or 2256 ???. 2259 2271
//An external server returns an empty answer that has the length of > 1221 (lst, .
function insertIntoArray(response, layerTitle) {
    
    response = response.split("<!DOCTYPE");
    response = response[0];
    if (response.length > 800 && response.length != 2255) {
        selTitleArray[insertUrlCounter] = layerTitle;
        urlArr[insertUrlCounter] = response;
        insertUrlCounter++;
    }
    ajaxReturnCounter++;

    if (ajaxSendCounter == ajaxReturnCounter) {
        sendTitle(selTitleArray);
        searchFlag = false;

        jQuery("#loadingBar").addClass("hide");
        
        insertUrlCounter = 0;
        ajaxReturnCounter = 0;
        ajaxSendCounter = 0;
        //To hide resultpanel when search is done	
        //        var resultpanel = Ext.getCmp('resultpanel');
        //        resultpanel.collapse(true);
    }
}
//Anropas när titeln klickas
function urlRequest(sTitle) {
    for (var i = 0; i < selTitleArray.length; i++) {
        if (selTitleArray[i] == sTitle) {
            //	            var index = i;
            var matchingResponse = urlArr[i];
            urlAnswer(matchingResponse);
        }
    }
}

function urlCommentRequest(sTitle) {
    for (var i = 0; i < selTitleArray.length; i++) {
        if (selTitleArray[i] == sTitle) {
            //	            var index = i;
            var matchingResponse = urlArr[i];
            return matchingResponse;
        }
    }
}

//var titleToBox;
function sendTitle(title) {
    var resultList = document.getElementById("titleList");
    for (var i = 0; i < title.length; i++) {
        var tempTitel = title[i];
        var optNew = new Option(tempTitel);
        resultList.options[i] = optNew;
    }
    jQuery("#dialog").dialog('open');
}
function urlAnswer(sHtml) {
    var elm = document.getElementById("resultPanel");
    elm.innerHTML = sHtml;
}

function selectLayer() {
    var resultList = document.getElementById("titleList");
    var indx = resultList.selectedIndex;
    var layerName = resultList[indx].text;
    urlRequest(layerName);
}