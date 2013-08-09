﻿var map;

$(document).ready(function() {
    Bergis.Map.init();
    Bergis.LayerTree.init();
    Bergis.LayerTree.initCollapse();
    Bergis.Application.initTabs();
    Bergis.Filter.LoadSearchCriteria();
    Bergis.Application.events();
    Bergis.Application.setElmPosOnRezise();
    Bergis.Dialogs.init();
    Bergis.LayerTree.hideTreeOnStart();
});

Bergis.Application = {
    initTabs: function () {
        $('#container-1').tabs();
    },
    events: function () {
        this.addDocumentClickEvent(this.checkSearchVisibility);
        //Bergis.Application.addDocumentClickEvent(Bergis.Application.checkSearchVisibility);
        var layers = $("#layers");
        var layersC = $("#layers .content");
        $("#layers-trigger").click(function () {
            /*if (layers.css("display") == "none") {
            layers.slideDown(150);
            $(this).addClass("active");
            } else {
            layers.slideUp(150);
            $(this).removeClass("active");
            }*/

            return false;
        });
        $("#layers-trigger-bottom").click(function () {
            if (layersC.css("display") == "block") {
                layersC.slideUp(150);
                $(this).addClass("closed");
                layers.animate({ paddingTop: "0" }, 150);
                return false;
            } else {
                layersC.slideDown(150);
                $(this).removeClass("closed");
                layers.animate({ paddingTop: "16px" }, 150);
                return false;
            }
        });

        var search = jQuery("#fragment-2");
        var searchC = jQuery("#fragment-2 .content");

        $("#resultList").css({
            'max-height': $(window).height() - 250 + 'px'
        });

        $("#searchtriggerbottom").click(function () {
            if (searchC.css("display") == "block") {
                searchC.slideUp(150);
                $(this).addClass("closed");
                search.animate({ paddingTop: "0" }, 150);
                return false;
            } else {
                searchC.slideDown(150);
                $(this).removeClass("closed");
                search.animate({ paddingTop: "16px" }, 150);
                return false;
            }
        });

        //#page_MapSearch_aspx #toolBar {
        //    background: url(../images/subheader-bg.png) top left repeat;
        //    min-height: 63px;
        //    position: relative;
        //    width: 100%;
        //    z-index: 95;
        //    margin-top: -16px;
        //}
        //#page_MapSearch_aspx #toolBar-inner div {
        //    margin-top: 17px;
        //}

        $("#hideTopHandleContainer").toggle(function () {
            var topContainer = jQuery(".topContainer");
            topContainer.animate({ "top": 15 - topContainer.outerHeight() }, 600, function () {
                $("#hideTopHandleContainer").css({
                    top: '71px',
                    background: "url(images/expandHeader.png) top left no-repeat"
                });
                //$("#hideTopHandleContainer").show();
            });
            $("#toolBar").css({
                'min-height': '54px',
                'margin-top': '-7px'
            });
            $('#toolBar-inner div').css({
                'margin-top': '17px'
            });
            $("#page_MapSearch_aspx").animate({ "top": "10px" }, 600);
        }, function () {
            var topContainer = jQuery(".topContainer");
            topContainer.animate({ "top": 0 }, 600, function () {
                $("#hideTopHandleContainer").css({
                    top: '51px',
                    background: "url(images/collapseHeader.png) top left no-repeat"
                });
                //$("#hideTopHandleContainer").show();
                $("#toolBar").css({
                    'min-height': '47px',
                    'margin-top': '0px'
                });
                $('#toolBar-inner div').css({
                    'margin-top': '6px'
                });
            });
            $("#page_MapSearch_aspx").animate({ "top": "75px" }, 700);
        });
        /*$("#tab1").click(function () {
        if (search.css("display") == "none") {
        search.slideDown(150);
        $(this).addClass("tabs-selected");
        return false;
        } else {
        search.slideUp(150);
        $(this).removeClass("tabs-selected");
        return false;
        }
        });*/


        var trigger = jQuery("a.value-trigger");
        var dropdown = jQuery(".value-dropdown");

        trigger.click(function () {
            if (jQuery(this).next(jQuery("div")).css("display") == "none") {
                jQuery(".value-dropdown").hide();
                jQuery("a.value-trigger").removeClass("open");
                jQuery(this).next(jQuery("div")).show();
                jQuery(this).addClass("open");
            } else {
                jQuery(".value-dropdown").hide();
                jQuery("a.value-trigger").removeClass("open");
                jQuery(this).next(jQuery("div")).hide();
                jQuery(this).removeClass("open");
            }

            return false;
        });
        // Set login context;
        $("#hdnLoginContext").val("login");

        $("#layerListBtn").click(function () {
            $("#layerListContainer").slideToggle("slow");
        });

        $("#loginButton").click(function () {
            Bergis.Dialogs.openDialogs("login");
        });

        $("#newUserButton").click(function () {
            Bergis.Dialogs.openDialogs("newUser");
        });

        $("#logoutButton").click(function () {
            Bergis.LoginControl.logoutHandler();
            return false;
        });

        $("#engHeaderFlag").click(function () {
            Bergis.Dialogs.openDialogs("eng");
        });

        //        $("#showNotDefined").click(function() {
        //            var checked = jQuery(this).attr('checked');
        //            if (checked) {
        //                jQuery(".value-wrap").show();
        //                jQuery("#staticChoices").show();
        //            }
        //            else {
        //                jQuery(".value-wrap").hide();
        //                jQuery("#staticChoices").hide();
        //            }
        //            filterCount();
        //        });
        $("#showNotDefinedLabel").toggle(function () {
            jQuery(".value-wrap").slideDown(150);
            jQuery("#staticChoices").slideDown(150);
            $(this).addClass("open");
            filterCount();
        },
            function () {
                jQuery(".value-wrap").slideUp(150);
                jQuery("#staticChoices").slideUp(150);
                $(this).removeClass("open");
                filterCount();
            }
        );
        var searchTimer = 1000;
        $("#txtFreeSearch").keyup(function () {
            setTimeout("filterCount()", searchTimer);
        });
        $("#btnSearch").click(function () {
            $("#hdnCurrentPageNo").val('1');
            $("#hdnSearchTxt").val(jQuery('#txtFreeSearch').val());
            Bergis.Search.sAjax();
        });

        //Adds click event to "Rensa" button
        $("#btnClear").click(function () {
            clearCriterias();
        });

        $('#firstTen').click(function () {
            Bergis.Search.searchArray(Bergis.Search.Results.results);
        });
        $("#tab2").hide();
        jQuery("#newUserError").hide();
        jQuery("#newUserValidateTips").hide();
        //$("#logoutButton").text("");

        //Adds enter key event for the "search" button
        var jQueryBtn = jQuery('.form_submit');
        var jQueryForm = jQuery('#txtFreeSearch');
        jQueryForm.keypress(function (e) {
            if (e.which == 13) {
                if (jQueryBtn[0].type == 'button')
                    jQueryBtn[0].click();
                else
                    eval(jQueryBtn[0].href);
                return false;
            }
        });

        //Set position of elements on window resize
        $(window).bind('resize', function () {
            Bergis.Application.setElmPosOnRezise();
        });
        $(".groupNode").click();
        //Bergis.Application.dialogs();

        //Bind submit handler to newUser dialog
        jQuery("#newUserDialog").bind("submit", function () {
            var email = $("#createEmailTbx").val();
            var password = $("#createPasswordTbx").val();
            var confirmPassword = $("#confirmPasswordTbx").val();
            Bergis.LoginControl.createUserAccount(email, password, confirmPassword);
        });
        //Bind submit handler to login dialog
        jQuery("#loginDialog").bind("submit", function () {
            Bergis.LoginControl.loginUser($("#email").val(), $("#password").val());
        })

        $("#ReportButton").click(function () {
            Bergis.Dialogs.openDialogs("report");
        });

        jQuery("#reportDialog").bind("submit", function () {
            if (Bergis.Search.postHtml == null) {
                var resultList = document.getElementById("titleList");
                var indx = resultList.selectedIndex;
                var layerName = resultList[indx].text;
                Bergis.Reports.reportProblem($("#reportText").attr("value"), layerName);
                $("#reportText").attr("value", "");
            } else {
                Bergis.Reports.reportProblemFromSearch($("#reportText").attr("value"), Bergis.Search.postHtml);

            }
        })
    },
    setElmPosOnRezise: function () {
        var windowHeight = jQuery(window).height();
        var windowWidth = jQuery(window).width();
    },
    checkSearchVisibility: function (e) {
        if (map.popups) {
            if (map.popups.length != 0) {
                map.popups[0].hide();
            }
        }
    },
    addDocumentClickEvent: function (func) {
        var oldonload = window.onload;
        if (typeof document.onclick != 'function') {
            document.onclick = func;
        }
        else {
            document.onclick = function () {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }
}
//Tab selection class functionality
$(document).ready(function () {
  $(".tabs-nav li a").click(function () {
    if ($(this).attr("href") == "#fragment-2") {
      $(this).parent().addClass("tabs-selected");
      $("#tab2 a").parent().removeClass("tabs-selected");
    } else {
      $(this).parent().addClass("tabs-selected");
      $("#tab1 a").parent().removeClass("tabs-selected");
    }
  });
});