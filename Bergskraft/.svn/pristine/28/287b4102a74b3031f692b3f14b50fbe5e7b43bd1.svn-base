Bergis.LayerTree = {
    init: function() {
        for (var i = 0; i < map.layers.length; i++) {
            var layer = map.layers[map.layers.length - 1 - i];
            if (layer.displayInLayerSwitcher != false) {
                jQuery("<li class='groupNode' title='" + layer.options.hoverText + "'></li>").append(layer.name + "<ul id=" + layer.options.tocID + "></ul>").appendTo(".unorderedlisttree");
                Bergis.LayerTree.parseSubLayers(layer);
            }
        }
        jQuery(".groupNode").tipTip({
            defaultPosition: 'left', maxWidth: '200px', edgeOffset: 20
        });
    },
    initCollapse: function() {
        jQuery(".groupNode").click(function(event) {
            if (this == event.target) {
                jQuery(this).children("ul").toggle();
                jQuery(this).css('list-style-image',
                (jQuery(this).children("ul").is(':hidden')) ?
                    'url(././images/222222_11x11_icon_plus.gif)' : 'url(././images/222222_11x11_icon_minus.gif)');
            }
        }).css('cursor', 'pointer').click();

    },
    hideTreeOnStart: function(){
        jQuery(".groupNode").children("ul").hide();
//        jQuery(".groupNode ul").hide();
    },
    parseSubLayers: function(layer) {
        try {
            jQuery.get(layer.capabilitiesUrl + '?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.1.1', {}, function(resp, status) {
                if (status == "success") {
                    var wmslayer = jQuery('Layer:first', resp);
                    var wmssublayers = wmslayer.children('Layer');
                    Bergis.LayerTree.fillTreeSubNodes(wmssublayers, layer);
                }
            });
        }
        catch (ex) {
            this.parseError();
        }
    },
    parseError: function() {
        alert("Ajax request error");
    },
    fillTreeSubNodes: function(wmssublayers, layer) {
        var subLayersArray = [];

        for (var i = 0; i < wmssublayers.length; i++) {
            var layerinfo = jQuery(wmssublayers[i]);

            // use jquery selector function to get the Name-tag text for each layer
            var name = layerinfo.children('Name').text();
            var title = layerinfo.children('Title').text();
            var additionalTitle = layerinfo.children('AdditionalTitle').text();
            var additionalTitleHTML = '';
            if((additionalTitle != undefined) && (additionalTitle != '')){
                additionalTitleHTML = '<label class="additionalTitle"> (' + additionalTitle + ')</label>';
            }
            var checked = false;
            var subLayers = { name: name, visibility: checked };
            subLayersArray[i] = subLayers;

            var ulID = "#" + layer.options.tocID;

            jQuery("<li class='layerNode'></li>").append("<input type='checkbox' id='" + title + "' name='" + name + "' value='" + layer.name + "'/><label>" + title + "</label>" + additionalTitleHTML).click(function () {
                Bergis.LayerTree.wmsSubLayerChecked(this, layer, subLayersArray);
            }).appendTo(ulID);
        }
    },
    wmsSubLayerChecked: function(chBox, layer, subLayersArray) {
        var layers = "";
        var layerName = chBox.childNodes[0].name;
        var checked = chBox.childNodes[0].checked;

        for (var i = 0; i < subLayersArray.length; i++) {
            if (subLayersArray[i].name == layerName) {
                subLayersArray[i].visibility = checked;
            }
        }
        for (var j = 0; j < subLayersArray.length; j++) {
            if (subLayersArray[j].visibility)
                layers += subLayersArray[j].name + ",";
        }


        if (layers == "") {
            layer.setVisibility(false);
        }
        else {
            layers = layers.slice(0, -1);
            layer.params.LAYERS = layers;
            layer.setVisibility(true);
            layer.redraw();
        }
    }
}