/// <reference path="../jQuery/1.3.1/jquery-1.3-vsdoc.js" />

Bergis.LoginControl = {
    loginUser: function(email, pass) {
        var ssa = Sys.Services.AuthenticationService;
        var isPersistent = true;
        var customInfo = null;
        var redirectUrl = null;
        // Log them in.
        ssa.login(email,
                          pass,
                          isPersistent,
                          customInfo,
                          redirectUrl,
                          Bergis.LoginControl.onLoginComplete,
                          Bergis.LoginControl.onLogInError);
    },
    onLoginComplete: function(result, context, methodName) {
        var loginStatus;
        var paymentDate = "notPaid";
        var userEmail = "";
        if (result) {
            Bergis.Dialogs.closeDialogs('login');
            //Bergis.Application.closeLoginDialog();
            if (jQuery("#hdnLoginContext").val() == "payment") {
                var paymentStatus = Bergis.LoginControl.checkPayment();
                if (paymentStatus == "True") {
                    var link = "documentViewer.aspx?pageId=" + jQuery("#hdnCurrentPageId").val();
                    window.open(link, "mywindow");
                }
                else {
                    jQuery("#paymentDialog").dialog('open');
                    jQuery("#hdnLoginContext").val("login");
                }
                jQuery("#hdnLoginContext").val("login");
            }
            var userInfo = Bergis.LoginControl.getUserInfo();
            Bergis.LoginControl.setLoginStatus(userInfo);
        }
        else {
            jQuery("#loginError").show();
            jQuery("#loginError").html('Inloggningen misslyckades, kontrollera användarnamn och lösenord.');
        }
    },
    getUserInfo: function() {
        //get userinfo from codebehind5
        var userInfoObject = {};
        var userInfo = this.getUserInfoFromDB();
        //if not empty string
        if (userInfo != "") {
            //splits string to array
            var userInfoArray = userInfo.split(";");
            //build return object containing (userName,paidToDate,freeViewsLeft)
            userInfoObject.userName = userInfoArray[0];
            userInfoObject.paidToDate = userInfoArray[1];
            userInfoObject.freeViewsLeft = userInfoArray[2];
            userInfoObject.firstName = userInfoArray[3];
            userInfoObject.lastName = userInfoArray[4];
            userInfoObject.personalNumber = userInfoArray[5];
            userInfoObject.adress = userInfoArray[6];
            userInfoObject.zipCode = userInfoArray[7];
            userInfoObject.postalAdress = userInfoArray[8];
            userInfoObject.phoneNumber = userInfoArray[9];
            userInfoObject.cellPhone = userInfoArray[10];
        }
        //if empty return empty object
        return userInfoObject;
    },
    setLoginStatus: function(userInfo) {
        // If a user is logged in
        if (userInfo.userName != undefined) {
            jQuery("#loginButtons").hide();
            jQuery("#logoutButton").show();
            jQuery("#buyTime").show();

            jQuery("#userLoggedInTxt").html("Inloggad som: " + userInfo.userName);
            if (userInfo.paidToDate != "Expired") {
                var dateAndTime = userInfo.paidToDate.split(" ");
                jQuery("#userPaidToDateTxt").html("Du har betalat t.o.m: " + dateAndTime[0] + " Kl. " + dateAndTime[1]);
            }
            else if (userInfo.freeViewsLeft > 0) {
                jQuery("#userPaidToDateTxt").html("Du har gratisvisningar kvar.");
            }
            else {
                jQuery("#userPaidToDateTxt").html("Klicka här för att köpa visningstid.");
            }
        }
        else {
            jQuery("#loginButtons").show();
            jQuery("#logoutButton").hide();
            jQuery("#userLoggedInTxt").html("Du är inte inloggad.");
            jQuery("#userPaidToDateTxt").html("");
            jQuery("#buyTime").hide();
        }
    },
    onLogInError: function(error, context, methodName) {
        alert(error.get_message());
    },
    logoutHandler: function() {
        // Log them out.
        var ssa = Sys.Services.AuthenticationService;
        var redirectUrl = null;
        var userContext = null;
        ssa.logout(redirectUrl,
                           Bergis.LoginControl.onLogoutComplete,
                           function() { },
                           userContext);
        return false;
    },
    onLogoutComplete: function(result, context, methodName) {
        if (result) {
            this.setLoginStatus({});
        }
    },
    openDocument: function(pageId) {
        // Store page id in hidden, so that it can be accessed by the payment and login dialogs
        jQuery("#hdnCurrentPageId").val(pageId);
        // Authenticate
        var userInfo = this.getUserInfo();
        // if logged in
        if (userInfo.userName != undefined) {
            // check if paid
            if (userInfo.paidToDate != "Expired" || userInfo.freeViewsLeft > 0) {
                var userInfo = this.getUserInfo();
                this.setLoginStatus(userInfo);
                // Show document
                var link = "documentViewer.aspx?pageId=" + pageId;
                window.open(link, "mywindow");
            }
            // if not paid
            //else {
            //jQuery("#paymentDialog").dialog("open");
            //     }
        }
        // If not logged in.
        else {
            jQuery("#hdnLoginContext").val("payment");
            //Bergis.Application.openLoginDialog();
            Bergis.Dialogs.openDialogs('login');
        }
    },
    checkUser: function() {
        var loginStatus = jQuery.ajax({
            type: "GET",
            url: "services/checkUser.aspx",
            dataType: "html",
            async: false
        });
        return loginStatus.responseText;
    },
    checkPayment: function() {
        var paymentStatus = jQuery.ajax({
            type: "GET",
            url: "payment/checkPayment.aspx",
            dataType: "html",
            async: false
        });
        return paymentStatus.responseText;
    },
    getUserInfoFromDB: function() {
        var userInformation = jQuery.ajax({
            type: "GET",
            url: "services/getUserInfo.aspx",
            dataType: "html",
            async: false
        });
        return userInformation.responseText;
    },

    //This extra functions are added to optimize the startup loading time.
    getUserInfoFromDBOnLoad: function() {
        jQuery.ajax({
            type: "GET",
            url: "services/getUserInfo.aspx",
            dataType: "html",
            async: true,
            success: function(result) {
                Bergis.Application.getUserInfoOnLoad(result);
            }
        });
    },

    getUserInfoOnLoad: function(userInfo) {
        //get userinfo from codebehind5
        var userInfoObject = {};
        //if not empty string
        if (userInfo != "") {
            //splits string to array
            var userInfoArray = userInfo.split(";");
            //build return object containing (userName,paidToDate,freeViewsLeft)
            userInfoObject.userName = userInfoArray[0];
            userInfoObject.paidToDate = userInfoArray[1];
            userInfoObject.freeViewsLeft = userInfoArray[2];
            userInfoObject.firstName = userInfoArray[3];
            userInfoObject.lastName = userInfoArray[4];
            userInfoObject.personalNumber = userInfoArray[5];
            userInfoObject.adress = userInfoArray[6];
            userInfoObject.zipCode = userInfoArray[7];
            userInfoObject.postalAdress = userInfoArray[8];
            userInfoObject.phoneNumber = userInfoArray[9];
            userInfoObject.cellPhone = userInfoArray[10];
        }
        //if empty return empty object
        this.setLoginStatus(userInfoObject);
    },
    openCreateUserDialog: function() {
        Bergis.Dialogs.closeDialogs('login');
        //Bergis.Application.closeLoginDialog();
        Bergis.Dialogs.openDialogs('newUser');
        //Bergis.Application.openNewUserDialog();   
    },
    createUserAccount: function(email, password, confirmPassword) {
        var regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        jQuery("#newUserError").hide();
        jQuery("#newUserError").html("");
        if (regexp.test(email)) {
            if (password == confirmPassword) {
                jQuery.post("services/createUser.aspx", { userName: email, password: password }, this.createUserCallback, "text/xml");
            }
            else {
                jQuery("#newUserError").show();
                jQuery("#newUserError").html('Lösenorden är inte lika!');
            }
        }
        else {
            jQuery("#newUserError").show();
            jQuery("#newUserError").html('Ogiltig epost!');
        }
    },

    createUserCallback: function(sText, status) {
        if (sText == "success") {
            var oldLayOut = jQuery("#newUserDialog").html();
            var userEmail = jQuery("#createEmailTbx").val();
            jQuery("#newUserDialog").html("<h4>Bekräfta via din E-post adress!</h4><br />");
            jQuery("#newUserDialog").append("Vi har skickat ett epostmeddelande till " + userEmail + ", med en bekräftelselänk.<br />");
            jQuery("#newUserDialog").append("För att aktivera ditt konto måste du öppna meddelandet och klicka på länken.<br />");
            jQuery("#newUserDialog").append("Efter att ditt konto är aktiverats, så klickar du på KLAR här nedan för att logga in.<br />");
            jQuery("#newUserDialog").data('buttons.dialog', { 'Klar': function() {
                //        Bergis.Application.closeNewUserDialog();
                Bergis.Dialogs.closeDialogs('newUser');
                jQuery("#email").val(userEmail);
                Bergis.Dialogs.openDialogs('login');
                //            Bergis.Application.openLoginDialog();
                jQuery("#newUserDialog").html(oldLayOut);
            }
            });
        }
        else {
            jQuery("#newUserError").show();
            jQuery("#newUserError").html('Användaren kunde inte skapas, användarnamnet kan vara upptaget!');
        }
    }

}

//Bergis.Application.onLoginComplete = function(result, context, methodName) {
//    var loginStatus;
//    var paymentDate = "notPaid";
//    var userEmail = "";
//    if (result) {
//        Bergis.Application.closeLoginDialog();
//        if (jQuery("#hdnLoginContext").val() == "payment") {
//            var paymentStatus = Bergis.Application.checkPayment();
//            if (paymentStatus == "True") {
//                var link = "documentViewer.aspx?pageId=" + jQuery("#hdnCurrentPageId").val();
//                window.open(link, "mywindow");
//            }
//            else  {
//                jQuery("#paymentDialog").dialog('open');
//                jQuery("#hdnLoginContext").val("login");
//            }
//            jQuery("#hdnLoginContext").val("login");
//        }
//        var userInfo = Bergis.Application.getUserInfo();
//        Bergis.Application.setLoginStatus(userInfo);
//    }
//    else {
//        jQuery("#loginError").html('Inloggningen misslyckades, kontrollera användarnamn och lösenord.');
//    }
//}

//Get information for logged in user, if no user logged in then return no logged in user.
//Bergis.Application.getUserInfo = function() {
//    //get userinfo from codebehind5
//    var userInfoObject = {};
//    var userInfo = Bergis.Application.getUserInfoFromDB();
//    //if not empty string
//    if (userInfo != "") {
//        //splits string to array
//        var userInfoArray = userInfo.split(";");
//        //build return object containing (userName,paidToDate,freeViewsLeft)
//        userInfoObject.userName = userInfoArray[0];
//        userInfoObject.paidToDate = userInfoArray[1];
//        userInfoObject.freeViewsLeft = userInfoArray[2];
//        userInfoObject.firstName = userInfoArray[3];
//        userInfoObject.lastName = userInfoArray[4];
//        userInfoObject.personalNumber = userInfoArray[5];
//        userInfoObject.adress = userInfoArray[6];
//        userInfoObject.zipCode = userInfoArray[7];
//        userInfoObject.postalAdress = userInfoArray[8];
//        userInfoObject.phoneNumber = userInfoArray[9];
//        userInfoObject.cellPhone = userInfoArray[10];
//    }
//    //if empty return empty object
//    return userInfoObject;
//}
// Sets up the logged in text, payment text and the buttons.
//Bergis.Application.setLoginStatus = function(userInfo) {
//    // If a user is logged in
//    if (userInfo.userName != undefined) {
//        jQuery("#loginButtons").hide();
//        jQuery("#logoutButton").show();
//        jQuery("#buyTime").show();

//        jQuery("#userLoggedInTxt").html("Inloggad som: " + userInfo.userName);
//        if (userInfo.paidToDate != "Expired") {
//            var dateAndTime = userInfo.paidToDate.split(" ");
//            jQuery("#userPaidToDateTxt").html("Du har betalat t.o.m: " + dateAndTime[0] + " Kl. " + dateAndTime[1]);
//        }
//        else if (userInfo.freeViewsLeft > 0) {
//            jQuery("#userPaidToDateTxt").html("Du har gratisvisningar kvar.");
//        }
//        else {
//            jQuery("#userPaidToDateTxt").html("Klicka här för att köpa visningstid.");
//        }
//    }
//    else {
//        jQuery("#loginButtons").show();
//        jQuery("#logoutButton").hide();
//        jQuery("#userLoggedInTxt").html("Du är inte inloggad.");
//        jQuery("#userPaidToDateTxt").html("");
//        jQuery("#buyTime").hide();
//    }
//}

//Bergis.Application.onLogInError = function(error, context, methodName) {
//    alert(error.get_message());
//}

//Bergis.Application.logoutHandler = function() {
//    // Log them out.
//    var ssa = Sys.Services.AuthenticationService;
//    var redirectUrl = null;
//    var userContext = null;
//    ssa.logout(redirectUrl,
//                           Bergis.Application.onLogoutComplete,
//                           function() { },
//                           userContext);
//    return false;
//}
//Bergis.Application.onLogoutComplete = function(result, context, methodName) {
//    if (result) {
//        Bergis.Application.setLoginStatus({});
//    } 
//}

//Bergis.Application.openDocument = function(pageId) {
//    // Store page id in hidden, so that it can be accessed by the payment and login dialogs
//    jQuery("#hdnCurrentPageId").val(pageId);
//    // Authenticate
//    var userInfo = Bergis.Application.getUserInfo();
//    // if logged in
//    if (userInfo.userName != undefined) {
//        // check if paid
//        if (userInfo.paidToDate != "Expired" || userInfo.freeViewsLeft > 0) {
//            var userInfo = Bergis.Application.getUserInfo();
//            Bergis.Application.setLoginStatus(userInfo);
//            // Show document
//            var link = "documentViewer.aspx?pageId=" + pageId;
//            window.open(link, "mywindow");
//        }
//        // if not paid
//        else {
//            jQuery("#paymentDialog").dialog("open");
//        }
//    }
//    // If not logged in.
//    else {
//        jQuery("#hdnLoginContext").val("payment");
//        Bergis.Application.openLoginDialog();
//    }
//}
//Bergis.Application.checkUser = function() {
//    var loginStatus = jQuery.ajax({
//        type: "GET",
//        url: "services/checkUser.aspx",
//        dataType: "html",
//        async: false
//    });
//    return loginStatus.responseText;
//}
//Bergis.Application.checkPayment = function() {
//    var paymentStatus = jQuery.ajax({
//        type: "GET",
//        url: "payment/checkPayment.aspx",
//        dataType: "html",
//        async: false
//    });
//    return paymentStatus.responseText;
//}
//Bergis.Application.getUserInfoFromDB = function() {
//    var userInformation = jQuery.ajax({
//        type: "GET",
//        url: "services/getUserInfo.aspx",
//        dataType: "html",
//        async: false
//    });
//    return userInformation.responseText;
//}

////This extra functions are added to optimize the startup loading time.
//Bergis.Application.getUserInfoFromDBOnLoad = function() {
//    jQuery.ajax({
//        type: "GET",
//        url: "services/getUserInfo.aspx",
//        dataType: "html",
//        async: true,
//        success: function(result) {
//            Bergis.Application.getUserInfoOnLoad(result);
//        }
//    });
//}

//Bergis.Application.getUserInfoOnLoad = function(userInfo) {
//    //get userinfo from codebehind5
//    var userInfoObject = {};
//    //if not empty string
//    if (userInfo != "") {
//        //splits string to array
//        var userInfoArray = userInfo.split(";");
//        //build return object containing (userName,paidToDate,freeViewsLeft)
//        userInfoObject.userName = userInfoArray[0];
//        userInfoObject.paidToDate = userInfoArray[1];
//        userInfoObject.freeViewsLeft = userInfoArray[2];
//        userInfoObject.firstName = userInfoArray[3];
//        userInfoObject.lastName = userInfoArray[4];
//        userInfoObject.personalNumber = userInfoArray[5];
//        userInfoObject.adress = userInfoArray[6];
//        userInfoObject.zipCode = userInfoArray[7];
//        userInfoObject.postalAdress = userInfoArray[8];
//        userInfoObject.phoneNumber = userInfoArray[9];
//        userInfoObject.cellPhone = userInfoArray[10];
//    }
//    //if empty return empty object
//    Bergis.Application.setLoginStatus(userInfoObject);
//}