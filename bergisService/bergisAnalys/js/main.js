var htmlObjectInfo = null;

$(document).ready(function () {
    $(".collapse").collapse();
    initialize();
});

function initialize() {
    baseUrl = "http://localhost:56597"
    registerEvents();
}

function registerEvents() {
    populateInfoBox(0);
    populateDropDownList();
    populateAccordion(0);
    $("#effectTypes").change(function () {
        var id = $(this).find(":selected").val();
        populateAccordion(id);
        populateInfoBox(id);
    });
    
    $("#submit").click(function () {
        var word = $("#search").val();
        performSearch(word);
    });
    $('#searchForm').submit(function () {
        var word = $("#search").val();
        performSearch(word);
        return false;
    });
}

function populateInfoBox(id) {
    var requestUrl = "proxy.aspx?url=" + baseUrl + "/report";
    $.getJSON(requestUrl, populateInfoBoxCallback);
}

function populateDropDownList() {
    var requestUrl = "proxy.aspx?url=" + baseUrl + "/date";
    $.getJSON(requestUrl, populateDropDownListCallback);
}

function populateAccordion(id) {
    $(".loader_back").fadeIn();
    $("#accordion2").fadeOut();
    if (id == 0) {
        var requestUrl = "proxy.aspx?url=" + baseUrl + "/report";
    } else {
        var requestUrl = "proxy.aspx?url=" + baseUrl + "/report/" + id;
    }
    counter = 0;
    $.getJSON(requestUrl, populateAccordionCallback);
}

function performSearch(word) {
    if (word.length < 3) {
        $(".alert").fadeIn();
    }
    else {
        $(".alert").fadeOut();
        $(".loader_back").fadeIn();
        $("#accordion2").fadeOut();
        counter = 0;
        $.getJSON("proxy.aspx?url=" + baseUrl + "/search/" + word, populateAccordionCallback);
    }
}

function populateInfoBoxCallback(data) {
    var numberComments = data.length;
    $(".dialogCount").empty();
    $("#numberCommented").text(numberComments);
}
function setIrrelevantInfoBoxData() {
    $(".dialogCount").empty();
    $("#numberDialogs").text("Ingen data");
}

function populateDropDownListCallback(data) {
    var $selector = $("#effectTypes");
    $selector.empty();
    $selector.append($('<option selected="selected"></option>').attr("value", 0).text("Alla datum"));
    $.each(data, function () {
        $selector.append($('<option></option>').attr("value", this).text(this));
    });
}

function populateAccordionCallback(data) {
    $("#accordion2").empty();
    
    $.each(data, function (i) {
        
        if (this.objectInfo.substring(0, 4) == "http") {
            var url = "proxy.aspx?url=" + this.objectInfo;
            try {
                jQuery.ajax({
                    async: false,
                    type: "GET",
                    encoding: "utf-8",
                    url: url,
                    dataType: "text/html",
                    success: setObjectInfo,
                    error: setObjectInfo
                });
            }
            catch (ex) {
                alert("Error in AJAX request!");
            }
            createAccordionHeader(i, this.date, this.comment, htmlObjectInfo, data.length, this.C_id);
            
        } else {
            createAccordionHeader(i, this.date, this.comment, this.objectInfo, data.length, this.C_id);
            
        }
    });
}

function setObjectInfo(data, i) {
    htmlObjectInfo = data;
}

function setFixedProblem(cid) {
    var ok = confirm("Markera problem som åtgärdat?");
    if (ok) {
        $.get("proxy.aspx?url=" + baseUrl + "/post/" + cid, function (data) {
            if (data == '"success"') {
                location.reload(true);
            } else {
                alert("Ändringen registrerades inte!");
            }
        });
    }
}

function createAccordionHeader(id, date, comment, objectInfo, length, cid) {
    $container = $('<div id="container' + id + '" class="accordion-group"></div>');
    $header = $('<div class="accordion-heading"></div>');
    $header.append($('<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#' + id + '">' + date + '</a>'));
    $header.append($('<img src="img/quote.png" />'));
    $header.append($('<span class="numComments">' + comment + '</span>'));

    $body = $('<div id="' + id + '" class="accordion-body collapse in"></div>');
    $body.append($('<div class="accordion-inner origDialog">' + objectInfo + '</div>'));
    $body.append($('<button class="atgButton" onclick="setFixedProblem(' + cid + ')">Åtgärdat</input>'));

    $container.append($header);
    
            $container.append($body);
            $container.appendTo("#accordion2");
            
                $(".loader_back").fadeOut();
                $("#accordion2").fadeIn(400, function () {
                    $(".collapse").collapse();
                });
             
}


