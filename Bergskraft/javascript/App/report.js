var postURL = "./postProxy.aspx?url=http://localhost:56597/post/";

Bergis.Reports = {
    init: function () {
        
    },
    
    reportProblem: function (text, layerName) {
        var htmlCode = urlCommentRequest(layerName);
        var object_text = Bergis.Dialogs.commentResult;
        postComment(text, object_text);
        
    },

    reportProblemFromSearch: function (text, infoObject) {
        var json_text = JSON.stringify(infoObject, null, 2);
        postComment(text, json_text);
    }

   
}

function postComment(text, info) {
    var todaysDate = formatDate(new Date());
    var postObject = {
        comment: text,
        objectInfo: info,
        date: todaysDate};
    var posting = $.post(this.postURL, postObject, function (data) {
        //vad som ska göras efter post är klar
        if (data == "success") {
            $("#reportText").val('');
            Bergis.Dialogs.closeDialogs("report");
            Bergis.Search.postHtml = null;
        } else {
            alert("Något har blivit fel, ingen kommentar skickad");
        }
    });
}

function formatDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = date.getDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
}