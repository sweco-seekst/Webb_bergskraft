/// <reference path="../jQuery/1.3.1/jquery-1.3-vsdoc.js" />
var map;
var loadedPageId;
var loadedPageNo;
var currentPageNo;
var currentPageId;
function init(pageId, pageNo) {
    OpenLayers.ImgPath = "javascript/DocumentViewer/OpenLayers-2.12/img/";
    currentPageId = pageId;
    loadedPageId = pageId;
    loadedPageNo = pageNo;
    var paramObj = { pageId: pageId, pageNo: pageNo };
    jQuery.get("services/getDocuments.aspx", paramObj, handleResult, 'html');
    jQuery("#map").bind("contextmenu", function (e) {
        return false;
    });
}

function openPaymentDialog() {
    jQuery("#paymentDialog").dialog('open');
}
function getImageSize(imgPath) {
    jQuery("#imageTemp").attr('src', imgPath);
    jQuery("#docloadingBar").removeClass("hide");
    //Have to include timeOut to ensure that image loads int img tag before returning size values
    setTimeout(function () {
        if (jQuery("#imageTemp").attr('src') == imgPath) {
            var newSizeH = jQuery("#imageTemp").height() / 2;
            var newSizeW = jQuery("#imageTemp").width() / 2;
        }
        var sizes = {
            width: newSizeW,
            height: newSizeH
        }
        setMapOptions(sizes, imgPath);
        // alert("Hello")
    }, 1000);
}
function setMapOptions(sizes, imgPath) {
    var newSizeH = sizes.height;
    var newSizeW = sizes.width;
    var options = { numZoomLevels: 6, theme: null, maxExtent: new OpenLayers.Bounds(0, 0, newSizeW, newSizeH) };

    // Destroy old map to remove bounds and shit.
    if (map != null) { map.destroy(); }
    map = new OpenLayers.Map('map', options);

    for (var i = 0; i < map.layers.length; i++) {
        if (map.layers[i].CLASS_NAME == "OpenLayers.Layer.Image") {
            map.removeLayer(map.layers[i]);
        }
    }
    var bounds = new OpenLayers.Bounds(0, 0, newSizeW, newSizeH);
    var size = new OpenLayers.Size(newSizeW, newSizeH);
    var docLayer = new OpenLayers.Layer.Image('document', imgPath, bounds, new OpenLayers.Size());
    map.removeControl(map.controls[1]);
    var navcontrol = new OpenLayers.Control.PanZoomBar();
    map.addControl(navcontrol);
    map.addLayer(docLayer);
    //docLayer.events.register("loadstart", null, function () {
    //    jQuery("#docloadingBar").removeClass("hide");
    //});
    docLayer.events.register("loadend", docLayer, function () {
        jQuery("#docloadingBar").addClass("hide");
    });
    map.zoomToMaxExtent();
}
function setMap(imgPath) {
    getImageSize(imgPath);
}

//function checkPayment() {
//    var paymentStatus = jQuery.ajax({
//        type: "GET",
//        url: "payment/checkPayment.aspx",
//        dataType: "html",
//        async: false
//    });
//    paymentStatus = paymentStatus.responseText;
//    return paymentStatus;
//}
function handleResult(sText, sStatus) {
    if (sStatus == "success") {
        sText = getXmlDoc(sText);
        var pageObject = parseXmlToGetPages(sText);
        createPaging(pageObject);
    } else {
        alert('Error occured in ajaxrequest!');
    }
}

function parseXmlToGetPages(result) {
    var results = [];
    var pageCount = parseInt(jQuery("Count", result).text());
    results.push(pageCount);
    jQuery("Page", result).each(function (i) {
        var obj =
            {
                pageId: jQuery(this).find('pageId').text(),
                imgPath: jQuery(this).find('imgPath').text(),
                pageNo: jQuery(this).find('pageNo').text()
            };
        results.push(obj);
    });

    return results;
}

function createPaging(pageObject) {
    var noOfPages = pageObject[0];
    for (var i = 1; i <= noOfPages; i++) {
        if (pageObject[i].pageId == loadedPageId) {
            setMap(pageObject[i].imgPath, pageObject[i].imgWidth, pageObject[i].imgHeight);
            pageObject[i].imgPath = pageObject[i].imgPath.replace(/\\/, '/');
            jQuery("#pager").append("<span><a href='javascript:changePage(\"" + pageObject[i].imgPath + "\", " + i + ", " + pageObject[i].pageNo + ", " + pageObject[i].pageId + ")';return false; id=" + i + ">" + " " + pageObject[i].pageNo + " " + "</a></span>");
            jQuery("#orgPageNo").append("Sidnr: " + pageObject[i].pageNo + " i originaldokumentet.");
            currentPageNo = i;
            jQuery("#" + i).addClass("selected");
        }
        else {
            pageObject[i].imgPath = pageObject[i].imgPath.replace(/\\/, '/');
            jQuery("#pager").append("<span><a href='javascript:changePage(\"" + pageObject[i].imgPath + "\", " + i + ", " + pageObject[i].pageNo + ", " + pageObject[i].pageId + ")';return false; id=" + i + ">" + " " + pageObject[i].pageNo + " " + "</a></span>");

        }
    }
}
function changePage(imgPath, newPageNo, actualPageNo, imgWidth, imgHeight, pageId) {

    setMap(imgPath, imgWidth, imgHeight);
    jQuery("#" + currentPageNo).removeClass("selected");
    jQuery("#" + newPageNo).addClass("selected");
    jQuery("#orgPageNo").empty();
    jQuery("#orgPageNo").append("Sidnr: " + actualPageNo + " i originaldokumentet.");
    currentPageNo = newPageNo;
    currentPageId = pageId;
}

function getXmlDoc(sXmlText) {
    var xmlDoc;
    try {
        //Firefox, Mozilla, Opera, etc. 
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(sXmlText, "text/xml");
    }
    catch (e) {
        try {
            //Internet Explorer 
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(sXmlText);
        }
        catch (e) { alert(e.message) }
    }
    return xmlDoc;
}
//function getWidthHeight(imgPath) {
//    var paramObj = { imgPath: imgPath };
//    var imageWidthAndHeight = jQuery.ajax({
//        type: "GET",
//        url: "services/getWidthHeight.aspx",
//        data: paramObj,
//        dataType: "html",
//        async: false
//    });
//    imageWidthAndHeight = imageWidthAndHeight.responseText.split(";");
//    return imageWidthAndHeight;
//}


function handleObjectResultToPrint(sText, sStatus) {
    if (sStatus == "success") {
        sText = getXmlDoc(sText);
        objectViewToPrint(sText);
    } else {
        alert('Error occured in ajaxrequest!');
    }
}


function parseXmlToGetObject(result) {
    var results = [];
    jQuery("Object", result).each(function () {
        var deps = [];
        var adm = [];
        var work = [];
        var UCminingFields = [];
        jQuery("Deposit", result).each(function () {
            jQuery("Administrative", result).each(function () {
                adm.push(
                {
                    County: jQuery(this).find("County").text(),
                    Municipality: jQuery(this).find("Municipality").text(),
                    Shire: jQuery(this).find("Shire").text(),
                    Farm: jQuery(this).find("Farm").text()
                })
            });
            jQuery("Workplace", result).each(function () {
                work.push(
                {
                    WorkPlaceName: jQuery(this).find("WorkplaceName").text(),
                    LocalX: jQuery(this).find("LocalX").text(),
                    LocalY: jQuery(this).find("LocalY").text(),
                    LocalZ: jQuery(this).find("LocalZ").text()
                })
            });
            deps.push(
            {
                DepositName: jQuery(this).find('DepositName').text(),
                MiningField: jQuery(this).find('MiningField').text(),
                Workplaces: jQuery(this).find('Workplaces').text(),
                BK_North: jQuery(this).find('BK_North').text(),
                BK_East: jQuery(this).find('BK_East').text(),
                SGU_North: jQuery(this).find('SGU_North').text(),
                SGU_East: jQuery(this).find('SGU_East').text(),
                AdministrativeUnit: adm,
                Workplaces: work
            })
        });
        jQuery("UCminingFields", result).each(function () {
            var miningField =
            {
                MiningFieldName: jQuery(this).text()
            }
            UCminingFields.push(miningField);
        });
        var obj =
            {
                MainTitle: jQuery(this).find('MainTitle').text(),
                SubTitle: jQuery(this).find('SubTitle').text(),
                Chapter: jQuery(this).find('Chapter').text(),
                Author: jQuery(this).find('Author').text(),
                Company: jQuery(this).find('Company').text(),
                ReportId: jQuery(this).find('ReportId').text(),
                PublishDate: jQuery(this).find('PublishDate').text(),
                Deposits: deps,
                UCminingFields: UCminingFields
            };
        results.push(obj);
    });
    return results;
}

//////////////////////////////////
//The code below is for the print function. This function is currently inactivated, code may be used in the future.
//////////////////////////////////


//var html;
//function printDoc() {
//    var imgPath = map.layers[0].url;
////    var printWin;
//    var printMetaData = opener.document.getElementById("objectList");

//    html = '<HTML>\n<HEAD>\n';
//    html += '\n<TITLE>Skriv ut</TITLE>\n';
//    html += '\n</HE' + 'AD>\n<BODY>\n';
//    html += '\n<table>\n';
//    html += '\n<tr>\n';
//    html += '\n<td>\n';
//    html += '\n<img src="' + imgPath + '"/>\n';
//    html += '\n</td>\n';
//    html += '\n<td valign="top">\n';
////    html += '\n<div id="printMetaData"></div>\n';


//    //rätt objektsflik måste hämtas här på någe vis,  ny request? annars bara göra så att den första har metadatat med sig. 
//    var paramObj = { pageId: currentPageId };
//    jQuery.get("services/postObject.aspx", paramObj, handleObjectResultToPrint, 'html');
////    if (loadedPageNo == currentPageNo) {
////        html += printMetaData.innerHTML;
////    }
////    html += '\n</td>\n';
////    html += '\n</tr>\n';
////    html += '\n</table>\n';
////    html += '\n</BO' + 'DY>\n</HT' + 'ML>';
////    printWin = window.open("", "printMap", "width=600, height=600, scrollbars=no,status=no,toolbar=no, resizable=yes");
////    printWin.document.open();
////    printWin.document.write(html);
////    printWin.document.close();
////    
////    printWin.print();
////    printWin.close();
//}

//function objectViewToPrint(sXml) {
//    var arrData = parseXmlToGetObject(sXml);
////    jQuery("#printMetaData").empty();
//    for (var i = 0; i < arrData.length; i++) {
//        html += "<div>";
//        html += "<h4>Sidan hittades i: " + arrData[i].MainTitle + "</h4>";
//        html += "<ul><li>Underrubrik:" + arrData[i].SubTitle + "</li>";
//        html += "<li>Kapitel:" + arrData[i].Chapter + "</li>";
//        html += "<li>Författare:" + arrData[i].Author + "</li>";
//        html += "<li>Företag:" + arrData[i].Company + "</li>";
//        html += "<li>Rapportid:" + arrData[i].ReportId + "</li>";
//        html += "<li>Publicerad:" + arrData[i].PublishDate + "</li>";
//        html += "</ul>";
//        html += "</div>";

//        var depositData = arrData[i].Deposits;
//        if (depositData.length > 0) {
//            html += "<div class='DepositFields'>";
//            for (var j = 0; j < depositData.length; j++) {

//                html += "<h5>Gruva/Utmål/Plats:" + depositData[j].DepositName + "</h5><ul>";
//                html += "<li>Gruvfält:" + depositData[j].MiningField + "</li>";
//                html += "<li>Öst-Västlig Koord:" + depositData[j].RT90_East + "</li>";
//                html += "<li>Nord-sydlig Koord:" + depositData[j].RT90_North + "</li>";
//                html += "</ul>";
//                


//                var workData = depositData[i].Workplaces;
//                if (workData.length > 0) {
//                    html += "<div class='workFields'>";
//                    for (var l = 0; l < workData.length; l++) {
//                        html += "<ul>";
//                        html += "<li>Rum/Ort:" + workData[l].WorkPlaceName + "</li>";
//                        html += "<li>LokalX:" + workData[l].LocalX + "</li>";
//                        html += "<li>LokalY:" + workData[l].LocalY + "</li>";
//                        html += "<li>LokalZ:" + workData[l].LocalZ + "</li>";
//                        html += "</ul>";
//                        html += "</div>";
//                    }
//                }
//                html += "</div>";
//            
//                var adminData = depositData[i].AdministrativeUnit;
//                if (adminData.length > 0) {
//                    html += "<div class='adminFields'>";
//                    for (var k = 0; k < adminData.length; k++) {
//                       html += "<ul>";
//                       html += "<li>Ort/By/Gård:" + adminData[k].Farm + "</li>";
//                       html += "<li>Socken/Församling:" + adminData[k].Shire + "</li>";
//                       html += "<li>Kommun:" + adminData[k].Municipality + "</li>";
//                       html += "<li>Län:" + adminData[k].County + "</li>";
//                       html += "</ul>";
//                       html += "</div>";
//                       
//                    }
//                }
//                
//            }
//            var UCminingFieldData = arrData[i].UCminingFields;
//            if (UCminingFieldData.length > 0) {
//                html += "<div class='UCminingFields'>";
//                for (var j = 0; j < UCminingFieldData.length; j++) {
//                    html += "<li>Gruvfält utan Gruva:" + UCminingFieldData[j].miningField[0].MiningFieldName;
//                    html += "</li>";
//                    html += "</div>";
//                }
//            }
//        }
//    }
//    html += '\n</td>\n';
//    html += '\n</tr>\n';
//    html += '\n</table>\n';
//    html += '\n</BO' + 'DY>\n</HT' + 'ML>';
//    var printWin = window.open("", "printMap", "width=600, height=600, scrollbars=no,status=no,toolbar=no, resizable=yes");
//    printWin.document.open();
//    printWin.document.write(html);
//    printWin.document.close();

//    printWin.print();
//    printWin.close();
//}