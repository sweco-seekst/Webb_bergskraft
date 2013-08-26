﻿Bergis.Dialogs = {
    init: function() {
    
        $("#loginDialog").dialog({
            //bgiframe: true,
            autoOpen: false,
            height: 330,
            width: 350,
            modal: true,
            resizable: false,
            buttons: {
                'Logga in': function() {
                    $(this).trigger("submit");
                },
                'Avbryt': function() {
                    $(this).dialog('close');
                }
            },
            close: function() {
            }
          });
        $('#loginDialog').keypress(function (e) {
          if (e.keyCode == $.ui.keyCode.ENTER) {
            $(this).trigger("submit");
          }
        });
        $("#engDialog").dialog({
            //bgiframe: true,
            autoOpen: false,
            //height: 170,
            width: 350,
            modal: true,
            resizable: false,
            buttons: {
                'Ok': function() {
                    $("#engDialog").dialog('close');
                }
            },
            close: function() {
            }
        });

        $("#reportDialog").dialog({
            //bgiframe: true,
            autoOpen: false,
            //height: 170,
            width: 350,
            modal: true,
            resizable: false,
            buttons: {
                'Rapportera': function () {
                    $(this).trigger("submit");
                },
                'Avbryt': function () {
                    $("#reportDialog").dialog('close');
                    $("#reportText").val('');
                }
            },
            close: function () {
            }
        });

        $("#newUserDialog").dialog({
            bgiframe: true,
            autoOpen: false,
            //height: 300,
            width: 350,
            modal: true,
            resizable: false,
            buttons: {
                'Skapa användarkonto': function() {
                    $(this).trigger("submit");
                },
                'Avbryt': function() {
                    $(this).dialog('close');
                }
            },
            close: function() {
            }
          });
          $('#newUserDialog').keypress(function (e) {
            if (e.keyCode == $.ui.keyCode.ENTER) {
              $(this).trigger("submit");
            }
          });

        $("#dialog").dialog({
            title: "Resultat",
            maximize: false,
            autoOpen: false,
            height: 200,
            width: '100%',
            position: 'bottom',
            modal: false
        });

    },
    openDialogs: function(type) {
        $("#" + type + "Error").html("");
        $("#" + type + "Dialog").dialog("open");
        jQuery("#loginError").hide();
    },
    closeDialogs: function(type) {
        $("#" + type + "Dialog").dialog("close");
    }
    //jQuery.ui.dialog.defaults.bgiframe = true;
    //Bergis.Application.setPaymentDialogContents(0);
}
//Bergis.Application.openLoginDialog = function() {
//    jQuery("#loginError").html("");
//    jQuery("#loginDialog").dialog("open");
//}
//Bergis.Application.closeLoginDialog = function() {
//    jQuery("#loginDialog").dialog("close");
//}

//Bergis.Application.openNewUserDialog = function() {
//    jQuery("#newUserError").html("");
//    jQuery("#newUserDialog").dialog("open");
//}
//Bergis.Application.closeNewUserDialog = function() {
//    jQuery("#newUserDialog").dialog("close");
//}

//Bergis.Application.openEngDialog = function(clickStatus) {
//    if (clickStatus == "headerClick") {
//        jQuery("#engDialog").html("This site is not available in English. Please go <a href='http://www.bergskraft.se/eng/index2.htm' target='_blank'>here</a> for more information.");
//        jQuery("#engDialog").dialog("open");
//    }
//    else if (clickStatus == "paymentClick") {
//        jQuery("#engDialog").html("For the moment the Billing option is only available for swedish customers. We apologizes for the inconvenience and asks you to either contact Bergskraft or use the SMS payment.");
//        jQuery("#engDialog").dialog("open");
//    }
//}