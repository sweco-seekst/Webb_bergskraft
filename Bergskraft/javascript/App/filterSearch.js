/// <reference path="../jQuery/1.3.1/jquery-1.3-vsdoc.js" />
var xmlObj;

Bergis.Filter.LoadSearchCriteria = function() {
    jQuery.get("services/LoadSearchCriteria.aspx", {}, Bergis.Filter.handleCriteriaResult, 'text/xml');
}
Bergis.Filter.handleCriteriaResult = function(sText, sStatus) {
    if (sStatus == "success") {
        xmlObj = getXmlDoc(sText);
        Bergis.Filter.writeCriteria();
    } else {
        alert('Error occured in ajaxrequest!');
    }
}
Bergis.Filter.writeCriteria = function() {
    fillCountyStartupList();
    createAllChbx("municipalityInputValueBox");
    fillMunicipalityStartupList();
    createAllChbx("townshipInputValueBox");
    fillShireStartupList();
}
//Function to filter municipalities
function filterMunicipalities() {
    var noCountyChecked = true;

    jQuery("#municipalityInputValueBox ul").empty();
    createAllChbx("municipalityInputValueBox");
    var allChbx = jQuery("input[type=checkbox]:checked", "#countyInputValueBox");
    for (var i = 0; i < allChbx.length; i++) {
        jQuery("County", xmlObj).each(function() {
            if (jQuery(this).attr('Name') == allChbx[i].value) {
                noCountyChecked = false;
                jQuery("#countyInputValueBoxchbx").removeAttr("disabled");
                jQuery("#countyInputValueBoxchbx").removeAttr("checked");
                jQuery("Municipality", this).each(function() {
                var municipalityName = jQuery(this).attr('Name');
                    jQuery("<li id='" + municipalityName + "'>" +
                            "<input type='checkbox' id='" + municipalityName + "' value='" + municipalityName + "'/><label for='" + municipalityName + "'>" + municipalityName + "</label>" +
                            "</li>").click(function() {
                    filterShires("municipality");
                    filterCount();
                    }).appendTo("#municipalityInputValueBox ul");
                });
            }
        });
    }
    sortItems("municipalityInputValueBox");
    if (noCountyChecked == true) {
        jQuery("#countyInputValueBoxchbx").attr("disabled", "disabled");
        jQuery("#countyInputValueBoxchbx").attr("checked", "checked");
        fillMunicipalityStartupList();
    }
}
//Function to filter shires
function filterShires(flag) {
    var noMunicipalityChecked = true;

    jQuery("#townshipInputValueBox ul").empty();
    createAllChbx("townshipInputValueBox");
    
    if (flag == "county") {
        var allChbx = jQuery("input[type=checkbox]:checked", "#countyInputValueBox");
        for (var i = 0; i < allChbx.length; i++) {
            jQuery("County", xmlObj).each(function() {
                if (jQuery(this).attr('Name') == allChbx[i].value) {
                    noMunicipalityChecked = false;
                    jQuery("Shire", this).each(function() {
                    var shireName = jQuery(this).attr('Name');
                        jQuery("<li id='" + shireName + "'>" +
                            "<input type='checkbox' id='" + shireName + "' value='" + shireName + "'/><label for='" + shireName + "'>" + shireName + "</label>" + 
                            "</li>").click(function() {
                        shireClick();
                        filterCount();
                    }).appendTo("#townshipInputValueBox ul");
                    });
                }
            });
        }
        sortItems("townshipInputValueBox");
    }
    else {
        var allChbx = jQuery("input[type=checkbox]:checked", "#municipalityInputValueBox");
        for (var i = 0; i < allChbx.length; i++) {
            jQuery("Municipality", xmlObj).each(function() {
            if (jQuery(this).attr('Name') == allChbx[i].value) {
                jQuery("#municipalityInputValueBoxchbx").removeAttr("disabled");
                jQuery("#municipalityInputValueBoxchbx").removeAttr("checked");
                    noMunicipalityChecked = false;
                    jQuery("Shire", this).each(function() {
                    var shireName = jQuery(this).attr('Name');
                        jQuery("<li id='" + shireName + "'>" +
                            "<input type='checkbox' id='" + shireName + "' value='" + shireName + "'/><label for='" + shireName + "'>" + shireName + "</label>" +
                            "</li>").click(function() {
                        shireClick();
                        filterCount();
                        }).appendTo("#townshipInputValueBox ul");
                    });
                }
            });
        }
        sortItems("shire");
    }
    if (noMunicipalityChecked == true) {
        jQuery("#municipalityInputValueBoxchbx").attr("disabled", "disabled");
        jQuery("#municipalityInputValueBoxchbx").attr("checked", "checked");
        var firstChbx = jQuery("input[type=checkbox]:first", "#countyInputValueBox");
        var allChbx = jQuery("input[type=checkbox]:checked", "#countyInputValueBox");
        if (firstChbx[0].checked) {
            fillShireStartupList();
        }
        else {
            for (var i = 0; i < allChbx.length; i++) {
                jQuery("County", xmlObj).each(function() {
                    if (jQuery(this).attr('Name') == allChbx[i].value) {
                        noMunicipalityChecked = false;
                        jQuery("Shire", this).each(function() {
                        var shireName = jQuery(this).attr('Name');
                            jQuery("<li id='" + shireName + "'>" +
                            "<input type='checkbox' id='" + shireName + "' value='" + shireName + "'/><label for='" + shireName + "'>" + shireName + "</label>" + 
                            "</li>").click(function() {
                            shireClick();
                            filterCount();
                        }).appendTo("#townshipInputValueBox ul");
                        });
                    }
                });
            }
            sortItems("townshipInputValueBox");
        }
    }
}
function shireClick(elm) {
    var firstChbx = jQuery("input[type=checkbox]:first", "#townshipInputValueBox");
    var allChbx = jQuery("input[type=checkbox]:checked", "#townshipInputValueBox");
    if (firstChbx[0].checked) {
        jQuery("#townshipInputValueBoxchbx").removeAttr("disabled");
        jQuery("#townshipInputValueBoxchbx").removeAttr("checked");
    }
    else if (allChbx.length == 0) {
        jQuery("#townshipInputValueBoxchbx").attr("disabled", "disabled");
        jQuery("#townshipInputValueBoxchbx").attr("checked", "checked");
    }
}
//Fill list with ALL countys.
function fillCountyStartupList() {
    createAllChbx("countyInputValueBox");
//    jQuery("County", xmlObj).each(function() {
//        var county = jQuery(this).attr('Name');
//        jQuery("<div id='" + county + "'>" +
//                "<input type='checkbox' id='" + county + "' value='" + county + "'/>" + county +
//                "</div>").click(function() {
//                    filterMunicipalities();
//                    filterShires("county");
//                    filterCount();
//                }).appendTo("#countyInputValueBox");
    //    });
    jQuery("County", xmlObj).each(function() {
        var county = jQuery(this).attr('Name');
        jQuery("<li id='" + county + "'>" +
                "<input type='checkbox' id='" + county + "' value='" + county + "'/><label for='" + county +"'>" + county + "</label>" +
                "</li>").click(function() {
                    filterMunicipalities();
                    filterShires("county");
                    filterCount();
                }).appendTo("#countyInputValueBox ul");
    });
}
//Fill list with ALL municipalities.
function fillMunicipalityStartupList() {
    var muniArray = new Array();
    jQuery("Municipality", xmlObj).each(function () {
        muniArray.push(jQuery(this).attr('Name'));
    });
    muniArray.sort();
    for (var i = 0; i < muniArray.length; i++) {
        var municipality = muniArray[i];
        jQuery("<li id='" + municipality + "'>" +
                    "<input type='checkbox' id='" + municipality + "' value='" + municipality + "'/><label for='" + municipality + "'>" + municipality + "</label></li>").click(function () {
                        filterShires("municipality");
                        filterCount();
                    }).appendTo("#municipalityInputValueBox ul");
    }
//    jQuery("Municipality", xmlObj).each(function() {
//        var municipality = jQuery(this).attr('Name');
////        jQuery("<div id='" + municipality + "'>" +
////                "<input type='checkbox' id='" + municipality + "' value='" + municipality + "'/>" + municipality + "</div>").click(function() {
////                    filterShires("municipality");
////                    filterCount();
//        //                }).appendTo("#municipalityInputValueBox");
//        jQuery("<li id='" + municipality + "'>" +
//                "<input type='checkbox' id='" + municipality + "' value='" + municipality + "'/><label for='" + municipality + "'>" + municipality + "</label></li>").click(function() {
//                    filterShires("municipality");
//                    filterCount();
//                }).appendTo("#municipalityInputValueBox ul");
                
//    });
//    sortItems("municipalityInputValueBox");
}
//Fill list with ALL shires.
function fillShireStartupList() {
    var shireArray = new Array();
    jQuery("Municipality", xmlObj).each(function() {
        jQuery("Shire", this).each(function () {
            shireArray.push(jQuery(this).attr('Name'));
        });
    });
    shireArray.sort();
    for (var i = 0; i < shireArray.length; i++) {
        var shireName = shireArray[i];
        jQuery("<li id='" + shireName + "'>" +
                            "<input type='checkbox' id='" + shireName + "' value='" + shireName + "'/><label for='" + shireName + "'>" + shireName + "</label></li>").click(function () {
                                shireClick(this);
                                filterCount();
                            }).appendTo("#townshipInputValueBox ul");
    }

//    jQuery("Municipality", xmlObj).each(function() {
//        jQuery("Shire", this).each(function() {
//            var shireName = jQuery(this).attr('Name');
////            jQuery("<div id='" + shireName + "'>" +
////                    "<input type='checkbox' id='" + shireName + "' value='" + shireName + "'/>" + shireName + "</div>").click(function() {
////                    shireClick(this);
////                    filterCount();
//            //                }).appendTo("#townshipInputValueBox");
//            jQuery("<li id='" + shireName + "'>" +
//                    "<input type='checkbox' id='" + shireName + "' value='" + shireName + "'/><label for='" + shireName + "'>" + shireName + "</label></li>").click(function() {
//                        shireClick(this);
//                        filterCount();
//                    }).appendTo("#townshipInputValueBox ul");
//        });
//    });
//    sortItems("townshipInputValueBox");
}
//Function to sort items
function sortItems(divToSort) {
    jQuery("div", "#"+divToSort).tsort({ attr: "id" });
}
//Function to create an "all" chbx
function createAllChbx(divId) {

    var divIdToSend = "#" + divId;
    var chBxId = divId + "chbx";

//    jQuery("<div></div>").append("<input type='checkbox' id='" + chBxId + "' value='" + divId + "' class='chbxAll' checked='checked' disabled='disabled' />" + "Alla").click(function() {
//                    toggleAll(this, divIdToSend); 
//                    filterCount();
//                }).appendTo(divIdToSend);
    jQuery("<li></li>").append("<input type='checkbox' id='" + chBxId + "' value='" + divId + "' class='chbxAll' checked='checked' disabled='disabled' /><label for='" +chBxId+"'>Alla</label>").click(function() {
                    toggleAll(this, divIdToSend); 
                    filterCount();
                }).appendTo(divIdToSend + " ul");
}

//Function to toggle all chbx in certain div
function toggleAll(elm, divID) {
    if (elm.childNodes[0].checked) {

        if (elm.childNodes[0].value == "townshipInputValueBox") {
            var allChbx = jQuery("input[type=checkbox]:checked", divID)
            for (var i = 0; i < allChbx.length; i++) {
                allChbx[i].checked = false;
            }
            jQuery("input[type=checkbox]:first", divID).attr("disabled", "disabled");
            jQuery("input[type=checkbox]:first", divID).attr("checked", "checked");
        }
        else if (elm.childNodes[0].value == "municipalityInputValueBox") {
            var allChbx = jQuery("input[type=checkbox]:checked", divID)
            for (var i = 0; i < allChbx.length; i++) {
                allChbx[i].checked = false;
            }
            jQuery("input[type=checkbox]:first", divID).attr("disabled", "disabled");
            jQuery("input[type=checkbox]:first", divID).attr("checked", "checked");
            jQuery("#townshipInputValueBox ul").empty();
            createAllChbx("townshipInputValueBox");
            fillShireStartupList();
        }
        else if (elm.childNodes[0].value == "countyInputValueBox") {
            var allChbx = jQuery("input[type=checkbox]:checked", divID)
            for (var i = 0; i < allChbx.length; i++) {
                allChbx[i].checked = false;
            }
            jQuery("input[type=checkbox]:first", divID).attr("disabled", "disabled");
            jQuery("input[type=checkbox]:first", divID).attr("checked", "checked");
            jQuery("#municipalityInputValueBox ul").empty();
            jQuery("#townshipInputValueBox ul").empty();
            createAllChbx("municipalityInputValueBox");
            createAllChbx("townshipInputValueBox");
            fillMunicipalityStartupList();
            fillShireStartupList();
        }
    }
    else {
    }
}
function filterCount() {
    var _sWord = jQuery("#txtFreeSearch").val();
    var _filter = "";
    var countyArr = [];
    var municipalityArr = [];
    var shireArr = [];
    var searchColumn = "";
    var _includeNoData = jQuery("#showNotDefined").attr("checked");
    var paramObj = {sWord: _sWord, sColumn: searchColumn, filter: _filter, includeNoData: _includeNoData};

    jQuery("input[type=checkbox]:checked", "#countyInputValueBox").each(function() {
        if (this.value == "countyInputValueBox") {
            return false;
        }
        countyArr.push(this.value);
    });
    jQuery("input[type=checkbox]:checked", "#municipalityInputValueBox").each(function() {
        if (this.value == "municipalityInputValueBox") {
            return false;
        }
        municipalityArr.push(this.value);
    });
    jQuery("input[type=checkbox]:checked", "#townshipInputValueBox").each(function() {
        if (this.value == "townshipInputValueBox") {
            return false;
        }
        shireArr.push(this.value);
    });
    displayChoices(countyArr.length, municipalityArr.length, shireArr.length);
    if (shireArr.length > 0) {
        //lägg in shire först!!!
        paramObj.sColumn = "Shire";
        paramObj.filter = shireArr.join(";");
    }
    else if (municipalityArr.length > 0) {
        paramObj.sColumn = "Municipality";
        paramObj.filter = municipalityArr.join(";");
    }
    else if (countyArr.length > 0) {
        paramObj.sColumn = "County";
        paramObj.filter = countyArr.join(";");
    }
    if (_sWord.length > 0) {
        paramObj.sWord = _sWord;
    }


    jQuery.get("services/getCount.aspx", paramObj, countResult, 'html');
}

function countResult(sText, sStatus){
    if (sStatus == "success") {
        jQuery("#currentCount").html("Sökningen resulterar nu i:" + sText + " träffar.");              
    }
    else{
        alert("Error in Ajax Request");
    }
}

function displayChoices(c, m, s) {
    jQuery("#staticChoices").empty();
    var strHTML = "";
    if (c > 0) { 
        strHTML += "<br />Du har valt ett eller flera län.<br />"
    }
    if (m > 0) {
        strHTML += "Du har valt en eller flera kommuner.<br />"
    }
    if (s > 0) {
        strHTML += "Du har valt en eller flera församlingar.<br />"
    }
    jQuery("#staticChoices").append(strHTML);
}

function clearCriterias() {
    jQuery("#txtFreeSearch").val("");
    jQuery("#staticChoices").empty();
    jQuery("#countyInputValueBox ul").empty();
    jQuery("#municipalityInputValueBox ul").empty();
    jQuery("#townshipInputValueBox ul").empty();
    filterCount();
    Bergis.Filter.writeCriteria();
}
function getFilterValues(type){
    var valuesArr = [];
    if(type == "county"){
        jQuery("input[type=checkbox]:checked", "#countyInputValueBox").each(function() {
            if (this.value == "countyInputValueBox") {
                return false;
            }
            valuesArr.push(this.value);
        });
    }
    else if(type == "municipality"){
        jQuery("input[type=checkbox]:checked", "#municipalityInputValueBox").each(function() {
            if (this.value == "municipalityInputValueBox") {
                return false;
            }
            valuesArr.push(this.value);
        });
    }
    else{
        jQuery("input[type=checkbox]:checked", "#townshipInputValueBox").each(function() {
            if (this.value == "townshipInputValueBox") {
                return false;
            }
            valuesArr.push(this.value);
        });
    }
    return valuesArr;
}