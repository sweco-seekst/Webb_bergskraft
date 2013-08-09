<%@ Page Language="C#" AutoEventWireup="true" CodeFile="documentViewer.aspx.cs" Inherits="documentViewer" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="javascript/DocumentViewer/OpenLayers-2.12/OpenLayersOLD.js" type="text/javascript"></script> <!-- UPDATE, FIXA SÅ ATT DE FUNGERAR MED NYA!!-->
    <script src="javascript/jQuery-1.4.2/jquery-1.5.1.min.js" type="text/javascript"></script>
    <script src="javascript/DocumentViewer/documentViewer.js" type="text/javascript"></script>
    <script src="javascript/DocumentViewer/OpenLayers-2.12/Image.js" type="text/javascript"></script>

    <link href="css/BergskraftStyles.css" rel="stylesheet" type="text/css" />
  <link href="javascript/DocumentViewer/OpenLayers-2.12/theme/default/style.css" rel="stylesheet"
    type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div id="page_documentView_aspx">
        <%-- Deactivated by customer, may be used later on. %>
        <%--<div id="printDocument"><a href="javascript:printDoc();">Skriv ut</a></div>--%>
        <div id="map"></div>
        <img style="visibility: hidden" src="images/bergis.gif" id="imageTemp"></>
        <div id="docu-footer">
            <div id="pager"></div>
            <div id="orgPageNo"></div>
        </div>
        <div id="docloadingBar" class="hide">
            <div>
              </div>
            <p>
                Arbetar&hellip;</p>
        </div>
       <%-- <div id="paymentDialog">
    	    <p id="validateTips">För att titta på fler dokument så måste du betala.</p>
	        <form>
	        <fieldset>
		        <label for="email">Email</label>
		        <input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all" />
		        <label for="password">Password</label>
		        <input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all" />
	        </fieldset>
	        </form>
        </div>--%>
        <asp:HiddenField runat="server" ID="pageId" />
        <asp:HiddenField runat="server" ID="pageNo" />
    </div>
    </form>
</body>
</html>
