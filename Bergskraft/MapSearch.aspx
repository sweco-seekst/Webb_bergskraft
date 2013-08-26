<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MapSearch.aspx.cs" Inherits="MapSearch" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>WeBerGIS</title>
<link href="css/BergskraftStyles.css" rel="stylesheet" type="text/css" />
<script src="http://maps.google.com/maps/api/js?v=3.6&amp;sensor=false"></script>
<script src="javascript/jQuery-1.4.2/jquery-1.4.2.min.js" type="text/javascript"></script> <!--Uppdatera!!! MEN FIX PÅ SÖK/CHECKBOXAR FÖR LÄN ETC -->
<script src="javascript/jQuery-1.4.2/jquery-ui-1.8.5.custom.min.js" type="text/javascript"></script>

<script src="javascript/jQuery-1.4.2/jquery.tinysort.min.js" type="text/javascript"></script>
<script src="javascript/jQuery-1.4.2/tiptip/jquery.tipTip.minified.js"></script>
<link href="css/toolbar.css" rel="stylesheet" type="text/css" />
    <link href="javascript/jQuery-1.4.2/tiptip/tipTip.css" rel="stylesheet" />
  <%--<link href="css/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />--%>
<link href="css/jquery-ui-1.8.5.custom.css" rel="stylesheet" type="text/css" /> 
<script src="javascript/OpenLayers2.12/OpenLayers-2.12/OpenLayers.js" type="text/javascript"></script>

<script src="javascript/Map/proj4js-combined.js" type="text/javascript"></script>
<script src="javascript/App/namespace.js" type="text/javascript"></script>
<script src="javascript/Map/Controls/mapTypes.js" type="text/javascript"></script>
<script src="config.json" type="text/javascript"></script>

<script src="javascript/Map/Controls/identify.js" type="text/javascript"></script>
<script src="javascript/App/layerTree.js" type="text/javascript"></script>

<script src="javascript/App/userAuthentication.js" type="text/javascript"></script>
<script src="javascript/App/filterSearch.js" type="text/javascript"></script>
<%--<script src="javascript/App/createUserAccount.js" type="text/javascript"></script>--%>
<script src="javascript/App/ajaxSearch.js" type="text/javascript"></script>
<script src="javascript/App/dialog.js" type="text/javascript"></script>
<script src="javascript/App/report.js" type="text/javascript"></script>


<script src="javascript/Map/Controls/horizontalPanZoomBar.js" type="text/javascript"></script>
<script src="javascript/Map/map.js" type="text/javascript"></script>
<script src="javascript/App/bergis.js" type="text/javascript"></script>
  
    <%--<script src="javascript/OpenLayers2.12/OpenLayers-2.12/GeoRSS.js" type="text/javascript"></script>--%>
  <%--<script src="javascript/OpenLayers2.12/GeoRSS.js" type="text/javascript"></script>--%>
  <script src="javascript/OpenLayers2.12/OpenLayers-2.12/GeoRSS.js" type="text/javascript"></script>
    <script type="text/javascript">

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-36172150-1']);
        _gaq.push(['_trackPageview']);

        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

</script>
</head>

<body runat="server">
<form id="form1" runat="server" onsubmit="" >
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    </form>
    <div class="topContainer">
        <h1>
            <a target="_self" href="http://www.bergskraft.se">Bergskraft</a></h1>
        <div class="loginContainer">
            <div id="userLoggedInTxt">
            </div>
            <div id="loginButtons">
                <a id="loginButton" href="javascript:;" class="headerButtons">Logga in</a> eller
                <a id="newUserButton" href="javascript:;" class="headerButtons">registrera dig</a>.
            </div>
            <a class="headerButtons" href="javascript:;" id="logoutButton">Logga ut</a>
        </div>
        <div class="infoContainer">
            <a href="javascript:;" id="engHeaderFlag">English</a> <a id="aboutWeBerGIS" href="webBerGISDocs/anv_handledning_ver1.pdf"
                target="_blank">Om WeBerGIS</a>
        </div>
        <img src="images/eulogga.gif" class="euContainer" alt="EU-logo"
            title="Europeiska Unionen &ndash; Europeiska regionala utvecklingsfonden" />
        <div id="hideTopHandleContainer"></div>
    </div>
   <div id="showTopHandleContainer"></div>
    <div id="page_MapSearch_aspx">
     <ul id="map-switcher-container">
            </ul>
     <div id="mousePositionBg"></div>
     <div id="systemInfoContainer">
	    © 2012 Bergskraft.<br />Utvecklad av <a href="http://www.sweco.se" target="_blank">Sweco</a>.<%--<br />
        © Lantmäteriverket I2009/00858.--%>
	    </div>
          <div id="toolBar">
			<div id="toolBar-inner">
			</div>
		</div>
        <div id="mapContainer">
            <div id="map" class="olMap">
            </div>
        </div>
        <%--<div id="zoomPanBg"></div>--%>
        <input type="hidden" value="1" id="hdnCurrentPageNo" name="hdnCurrentPageNo" />
        <input type="hidden" value="1" id="hdnCurrentPageId" name="hdnCurrentPageId" />
        <input type="hidden" value="1" id="hdnLoginContext" name="hdnloginContext" />
        <input type="hidden" value="1" id="hdnBillLength" name="hdnBillLength" />
        <input type="hidden" value="1" id="hdnSearchTxt" name="hdnSearchTxt" />
        <div id="container-1" class="container-1">
            <ul class="tabs-nav">
                <li id="tab1" class="tabs-selected"><a href="#fragment-2"><span id="tresdt">
                   Sök
                </span></a></li>
                <li id="tab2" class=""><a href="#fragment-3"><span>
						Sökresultat
					</span></a></li>
            </ul>
         <%--   <div id="fragment-1">
                <div id="toc2">
                    <ul class="unorderedlisttree">
                    </ul>
                </div>
                <div id="fotnot">Int = internt lager (hanteras av Bergskraft).<br />Ext = Externt lager från annan källa.</div>
            </div>--%>
            <div class="tabs-container" id="fragment-2" style="">
                <div class="content">
                    <div id="searchBox">
                        <div id="textSearchInputValue">
                            <span>Fritextsök:</span>
                            <input type="text" value="" id="txtFreeSearch" />
                        </div>
                        <%--<input type="checkbox" id="showNotDefined" />--%>
                        <%--<label id="showNotDefinedLabel" for="showNotDefined">Inkludera dokument som saknar administrativ tillhörighet.</label><br />--%>
                        <a href="#" id="showNotDefinedLabel">Utökad geografisk sökning</a><br />
					
					    <div id="countyInputValueWrap" class="value-wrap">
						    <a href="#" id="countyInputTrigger" class="value-trigger">Välj län</a>
						    <div id="countyInputValueBox" class="value-dropdown">
							    <ul>
							    </ul>
						    </div>
					    </div>

                        <div id="municipalityInputValueWrap" class="value-wrap">
						    <a href="#" id="municipalityInputTrigger" class="value-trigger">Välj kommun</a> <!-- Switch between <div> and <a>, don't forget href="#" -->
						    <div id="municipalityInputValueBox" class="value-dropdown">
							    <ul>
							    </ul>
						    </div>
					    </div>

                        <div id="townshipInputValueWrap" class="value-wrap">
						    <a href="#" id="townshipInputTrigger" class="value-trigger">Välj församling</a> <!-- Switch between <div> and <a>, don't forget href="#" -->
						    <div id="townshipInputValueBox" class="value-dropdown">
							    <ul>
							    </ul>
						    </div>
					    </div>
					
                        <!--<div id="countyInputValue">
                            <span>Län:</span>
                            <div class="searchBox" id="county">
                            <div><input type="checkbox" disabled="disabled" checked="checked" class="chbxAll" value="county" id="countychbx">Alla</div><div id="Dalarna"><input type="checkbox" value="Dalarna" id="Dalarna">Dalarna</div><div id="Gävleborg"><input type="checkbox" value="Gävleborg" id="Gävleborg">Gävleborg</div><div id="Jämtland"><input type="checkbox" value="Jämtland" id="Jämtland">Jämtland</div><div id="Jönköping"><input type="checkbox" value="Jönköping" id="Jönköping">Jönköping</div><div id="Kalmar"><input type="checkbox" value="Kalmar" id="Kalmar">Kalmar</div><div id="Kronoberg"><input type="checkbox" value="Kronoberg" id="Kronoberg">Kronoberg</div><div id="Norrbotten"><input type="checkbox" value="Norrbotten" id="Norrbotten">Norrbotten</div><div id="Skaraborg"><input type="checkbox" value="Skaraborg" id="Skaraborg">Skaraborg</div><div id="Stockholm"><input type="checkbox" value="Stockholm" id="Stockholm">Stockholm</div><div id="Södermanland"><input type="checkbox" value="Södermanland" id="Södermanland">Södermanland</div><div id="Uppsala"><input type="checkbox" value="Uppsala" id="Uppsala">Uppsala</div><div id="Värmland"><input type="checkbox" value="Värmland" id="Värmland">Värmland</div><div id="Västernorrland"><input type="checkbox" value="Västernorrland" id="Västernorrland">Västernorrland</div><div id="Västmanland"><input type="checkbox" value="Västmanland" id="Västmanland">Västmanland</div><div id="Västra Götaland"><input type="checkbox" value="Västra Götaland" id="Västra Götaland">Västra Götaland</div><div id="Örebro"><input type="checkbox" value="Örebro" id="Örebro">Örebro</div><div id="Östergötland"><input type="checkbox" value="Östergötland" id="Östergötland">Östergötland</div></div>
                        </div>
                        <div id="municipalityInputValue">
                            <span>Kommun:</span>
                            <div class="searchBox" id="municipality">
                            <div><input type="checkbox" disabled="disabled" checked="checked" class="chbxAll" value="municipality" id="municipalitychbx">Alla</div><div id="Arjeplog"><input type="checkbox" value="Arjeplog" id="Arjeplog">Arjeplog</div><div id="Askersund"><input type="checkbox" value="Askersund" id="Askersund">Askersund</div><div id="Borlänge"><input type="checkbox" value="Borlänge" id="Borlänge">Borlänge</div><div id="Botkyrka"><input type="checkbox" value="Botkyrka" id="Botkyrka">Botkyrka</div><div id="Fagersta"><input type="checkbox" value="Fagersta" id="Fagersta">Fagersta</div><div id="Falun"><input type="checkbox" value="Falun" id="Falun">Falun</div><div id="Filipstad"><input type="checkbox" value="Filipstad" id="Filipstad">Filipstad</div><div id="Grums"><input type="checkbox" value="Grums" id="Grums">Grums</div><div id="Gällivare"><input type="checkbox" value="Gällivare" id="Gällivare">Gällivare</div><div id="Gävle"><input type="checkbox" value="Gävle" id="Gävle">Gävle</div><div id="Hallsberg"><input type="checkbox" value="Hallsberg" id="Hallsberg">Hallsberg</div><div id="Heby"><input type="checkbox" value="Heby" id="Heby">Heby</div><div id="Hedemora"><input type="checkbox" value="Hedemora" id="Hedemora">Hedemora</div><div id="Hofors"><input type="checkbox" value="Hofors" id="Hofors">Hofors</div><div id="Hultsfred"><input type="checkbox" value="Hultsfred" id="Hultsfred">Hultsfred</div><div id="Hällefors"><input type="checkbox" value="Hällefors" id="Hällefors">Hällefors</div><div id="Härjedalen"><input type="checkbox" value="Härjedalen" id="Härjedalen">Härjedalen</div><div id="Jokkmokk"><input type="checkbox" value="Jokkmokk" id="Jokkmokk">Jokkmokk</div><div id="Järvsö"><input type="checkbox" value="Järvsö" id="Järvsö">Järvsö</div><div id="Jönköping"><input type="checkbox" value="Jönköping" id="Jönköping">Jönköping</div><div id="Karlsborg"><input type="checkbox" value="Karlsborg" id="Karlsborg">Karlsborg</div><div id="Karlskoga"><input type="checkbox" value="Karlskoga" id="Karlskoga">Karlskoga</div><div id="Kungsör"><input type="checkbox" value="Kungsör" id="Kungsör">Kungsör</div><div id="Laxå"><input type="checkbox" value="Laxå" id="Laxå">Laxå</div><div id="Lekeberg"><input type="checkbox" value="Lekeberg" id="Lekeberg">Lekeberg</div><div id="Leksand"><input type="checkbox" value="Leksand" id="Leksand">Leksand</div><div id="Lidköping"><input type="checkbox" value="Lidköping" id="Lidköping">Lidköping</div><div id="Lindesberg"><input type="checkbox" value="Lindesberg" id="Lindesberg">Lindesberg</div><div id="Ljungby"><input type="checkbox" value="Ljungby" id="Ljungby">Ljungby</div><div id="Ljusdal"><input type="checkbox" value="Ljusdal" id="Ljusdal">Ljusdal</div><div id="Ljusnarsberg"><input type="checkbox" value="Ljusnarsberg" id="Ljusnarsberg">Ljusnarsberg</div><div id="Ludvika"><input type="checkbox" value="Ludvika" id="Ludvika">Ludvika</div><div id="Motala"><input type="checkbox" value="Motala" id="Motala">Motala</div><div id="Nora"><input type="checkbox" value="Nora" id="Nora">Nora</div><div id="Norberg"><input type="checkbox" value="Norberg" id="Norberg">Norberg</div><div id="Nyköping"><input type="checkbox" value="Nyköping" id="Nyköping">Nyköping</div><div id="Oskarshamn"><input type="checkbox" value="Oskarshamn" id="Oskarshamn">Oskarshamn</div><div id="Ramsberg"><input type="checkbox" value="Ramsberg" id="Ramsberg">Ramsberg</div><div id="Sala"><input type="checkbox" value="Sala" id="Sala">Sala</div><div id="Skinnskatteberg"><input type="checkbox" value="Skinnskatteberg" id="Skinnskatteberg">Skinnskatteberg</div><div id="Skövde"><input type="checkbox" value="Skövde" id="Skövde">Skövde</div><div id="Smedjebacken"><input type="checkbox" value="Smedjebacken" id="Smedjebacken">Smedjebacken</div><div id="Säter"><input type="checkbox" value="Säter" id="Säter">Säter</div><div id="Söderbärke"><input type="checkbox" value="Söderbärke" id="Söderbärke">Söderbärke</div><div id="Söderköping"><input type="checkbox" value="Söderköping" id="Söderköping">Söderköping</div><div id="Torsby"><input type="checkbox" value="Torsby" id="Torsby">Torsby</div><div id="Uppsala"><input type="checkbox" value="Uppsala" id="Uppsala">Uppsala</div><div id="Vansbro"><input type="checkbox" value="Vansbro" id="Vansbro">Vansbro</div><div id="Vetlanda"><input type="checkbox" value="Vetlanda" id="Vetlanda">Vetlanda</div><div id="Vingåker"><input type="checkbox" value="Vingåker" id="Vingåker">Vingåker</div><div id="Västervik"><input type="checkbox" value="Västervik" id="Västervik">Västervik</div><div id="Växjö"><input type="checkbox" value="Växjö" id="Växjö">Växjö</div><div id="Älvdalen"><input type="checkbox" value="Älvdalen" id="Älvdalen">Älvdalen</div><div id="Åmål"><input type="checkbox" value="Åmål" id="Åmål">Åmål</div><div id="Årjäng"><input type="checkbox" value="Årjäng" id="Årjäng">Årjäng</div><div id="Örebro"><input type="checkbox" value="Örebro" id="Örebro">Örebro</div><div id="Örnsköldsvik"><input type="checkbox" value="Örnsköldsvik" id="Örnsköldsvik">Örnsköldsvik</div><div id="Östhammar"><input type="checkbox" value="Östhammar" id="Östhammar">Östhammar</div></div>
                        </div>
                        <div id="shireInputValue">
                            <span>Församling:</span>
                            <div class="searchBox" id="shire">
                            <div><input type="checkbox" disabled="disabled" checked="checked" class="chbxAll" value="shire" id="shirechbx">Alla</div><div id="Arjeplog"><input type="checkbox" value="Arjeplog" id="Arjeplog">Arjeplog</div><div id="Asa"><input type="checkbox" value="Asa" id="Asa">Asa</div><div id="Askersund"><input type="checkbox" value="Askersund" id="Askersund">Askersund</div><div id="Aspeboda"><input type="checkbox" value="Aspeboda" id="Aspeboda">Aspeboda</div><div id="Bodarne"><input type="checkbox" value="Bodarne" id="Bodarne">Bodarne</div><div id="By"><input type="checkbox" value="By" id="By">By</div><div id="Börrum"><input type="checkbox" value="Börrum" id="Börrum">Börrum</div><div id="Döderhult"><input type="checkbox" value="Döderhult" id="Döderhult">Döderhult</div><div id="Edsleskog"><input type="checkbox" value="Edsleskog" id="Edsleskog">Edsleskog</div><div id="Ervalla"><input type="checkbox" value="Ervalla" id="Ervalla">Ervalla</div><div id="Filipstad"><input type="checkbox" value="Filipstad" id="Filipstad">Filipstad</div><div id="Films"><input type="checkbox" value="Films" id="Films">Films</div><div id="Fröderyds"><input type="checkbox" value="Fröderyds" id="Fröderyds">Fröderyds</div><div id="Funäsdalen"><input type="checkbox" value="Funäsdalen" id="Funäsdalen">Funäsdalen</div><div id="Färnebo"><input type="checkbox" value="Färnebo" id="Färnebo">Färnebo</div><div id="Garpenberg"><input type="checkbox" value="Garpenberg" id="Garpenberg">Garpenberg</div><div id="Grangärde"><input type="checkbox" value="Grangärde" id="Grangärde">Grangärde</div><div id="Grythyttan"><input type="checkbox" value="Grythyttan" id="Grythyttan">Grythyttan</div><div id="Grängesberg"><input type="checkbox" value="Grängesberg" id="Grängesberg">Grängesberg</div><div id="Guldsmedshyttan"><input type="checkbox" value="Guldsmedshyttan" id="Guldsmedshyttan">Guldsmedshyttan</div><div id="Guldsmedshytte"><input type="checkbox" value="Guldsmedshytte" id="Guldsmedshytte">Guldsmedshytte</div><div id="Guldsmedshytte; Linde"><input type="checkbox" value="Guldsmedshytte; Linde" id="Guldsmedshytte; Linde">Guldsmedshytte; Linde</div><div id="Guldsmedshytte; Ramsberg"><input type="checkbox" value="Guldsmedshytte; Ramsberg" id="Guldsmedshytte; Ramsberg">Guldsmedshytte; Ramsberg</div><div id="Gustafs"><input type="checkbox" value="Gustafs" id="Gustafs">Gustafs</div><div id="Gällivare"><input type="checkbox" value="Gällivare" id="Gällivare">Gällivare</div><div id="Hallsberg"><input type="checkbox" value="Hallsberg" id="Hallsberg">Hallsberg</div><div id="Hammar"><input type="checkbox" value="Hammar" id="Hammar">Hammar</div><div id="Hamrånge"><input type="checkbox" value="Hamrånge" id="Hamrånge">Hamrånge</div><div id="Helgona"><input type="checkbox" value="Helgona" id="Helgona">Helgona</div><div id="Helgona; Nyköping östra"><input type="checkbox" value="Helgona; Nyköping östra" id="Helgona; Nyköping östra">Helgona; Nyköping östra</div><div id="Hjulsjö"><input type="checkbox" value="Hjulsjö" id="Hjulsjö">Hjulsjö</div><div id="Hjulsjö; Järnboås"><input type="checkbox" value="Hjulsjö; Järnboås" id="Hjulsjö; Järnboås">Hjulsjö; Järnboås</div><div id="Hjulsjö; Ljusnarsberg"><input type="checkbox" value="Hjulsjö; Ljusnarsberg" id="Hjulsjö; Ljusnarsberg">Hjulsjö; Ljusnarsberg</div><div id="Hofors"><input type="checkbox" value="Hofors" id="Hofors">Hofors</div><div id="Huddinge"><input type="checkbox" value="Huddinge" id="Huddinge">Huddinge</div><div id="Huddunge"><input type="checkbox" value="Huddunge" id="Huddunge">Huddunge</div><div id="Husby"><input type="checkbox" value="Husby" id="Husby">Husby</div><div id="Järnboås"><input type="checkbox" value="Järnboås" id="Järnboås">Järnboås</div><div id="Järvsö"><input type="checkbox" value="Järvsö" id="Järvsö">Järvsö</div><div id="Järvsö"><input type="checkbox" value="Järvsö" id="Järvsö">Järvsö</div><div id="Jönköping"><input type="checkbox" value="Jönköping" id="Jönköping">Jönköping</div><div id="Karlskoga"><input type="checkbox" value="Karlskoga" id="Karlskoga">Karlskoga</div><div id="Knista"><input type="checkbox" value="Knista" id="Knista">Knista</div><div id="Kungsör"><input type="checkbox" value="Kungsör" id="Kungsör">Kungsör</div><div id="Kvikkjokk"><input type="checkbox" value="Kvikkjokk" id="Kvikkjokk">Kvikkjokk</div><div id="Kvistbro"><input type="checkbox" value="Kvistbro" id="Kvistbro">Kvistbro</div><div id="Leksand"><input type="checkbox" value="Leksand" id="Leksand">Leksand</div><div id="Lena"><input type="checkbox" value="Lena" id="Lena">Lena</div><div id="Linde"><input type="checkbox" value="Linde" id="Linde">Linde</div><div id="Linde; Ramsberg"><input type="checkbox" value="Linde; Ramsberg" id="Linde; Ramsberg">Linde; Ramsberg</div><div id="Ljusdal"><input type="checkbox" value="Ljusdal" id="Ljusdal">Ljusdal</div><div id="Ljusnarsberg"><input type="checkbox" value="Ljusnarsberg" id="Ljusnarsberg">Ljusnarsberg</div><div id="Ljusnarsberg; Ramsberg"><input type="checkbox" value="Ljusnarsberg; Ramsberg" id="Ljusnarsberg; Ramsberg">Ljusnarsberg; Ramsberg</div><div id="Ludvika"><input type="checkbox" value="Ludvika" id="Ludvika">Ludvika</div><div id="Månsarp"><input type="checkbox" value="Månsarp" id="Månsarp">Månsarp</div><div id="Nora"><input type="checkbox" value="Nora" id="Nora">Nora</div><div id="Norberg"><input type="checkbox" value="Norberg" id="Norberg">Norberg</div><div id="Nordmark"><input type="checkbox" value="Nordmark" id="Nordmark">Nordmark</div><div id="Norrbärke"><input type="checkbox" value="Norrbärke" id="Norrbärke">Norrbärke</div><div id="Norrbärke"><input type="checkbox" value="Norrbärke" id="Norrbärke">Norrbärke</div><div id="Norrbärke"><input type="checkbox" value="Norrbärke" id="Norrbärke">Norrbärke</div><div id="Norrbärke"><input type="checkbox" value="Norrbärke" id="Norrbärke">Norrbärke</div><div id="Nätra"><input type="checkbox" value="Nätra" id="Nätra">Nätra</div><div id="Nås"><input type="checkbox" value="Nås" id="Nås">Nås</div><div id="Rackeby"><input type="checkbox" value="Rackeby" id="Rackeby">Rackeby</div><div id="Ramsberg"><input type="checkbox" value="Ramsberg" id="Ramsberg">Ramsberg</div><div id="Ramsberg"><input type="checkbox" value="Ramsberg" id="Ramsberg">Ramsberg</div><div id="Ramsberg; Linde; Guldsmedshytte"><input type="checkbox" value="Ramsberg; Linde; Guldsmedshytte" id="Ramsberg; Linde; Guldsmedshytte">Ramsberg; Linde; Guldsmedshytte</div><div id="Ryssby"><input type="checkbox" value="Ryssby" id="Ryssby">Ryssby</div><div id="Sala"><input type="checkbox" value="Sala" id="Sala">Sala</div><div id="Silvberg"><input type="checkbox" value="Silvberg" id="Silvberg">Silvberg</div><div id="Skinnskatteberg"><input type="checkbox" value="Skinnskatteberg" id="Skinnskatteberg">Skinnskatteberg</div><div id="Skällvik"><input type="checkbox" value="Skällvik" id="Skällvik">Skällvik</div><div id="Smedjebacken"><input type="checkbox" value="Smedjebacken" id="Smedjebacken">Smedjebacken</div><div id="Snavlunda"><input type="checkbox" value="Snavlunda" id="Snavlunda">Snavlunda</div><div id="Stora Kopparberg"><input type="checkbox" value="Stora Kopparberg" id="Stora Kopparberg">Stora Kopparberg</div><div id="Stora Skedvi"><input type="checkbox" value="Stora Skedvi" id="Stora Skedvi">Stora Skedvi</div><div id="Stora Tuna"><input type="checkbox" value="Stora Tuna" id="Stora Tuna">Stora Tuna</div><div id="Svärta"><input type="checkbox" value="Svärta" id="Svärta">Svärta</div><div id="Säfsnäs"><input type="checkbox" value="Säfsnäs" id="Säfsnäs">Säfsnäs</div><div id="Söderbärke"><input type="checkbox" value="Söderbärke" id="Söderbärke">Söderbärke</div><div id="Tjällmo"><input type="checkbox" value="Tjällmo" id="Tjällmo">Tjällmo</div><div id="Torsby"><input type="checkbox" value="Torsby" id="Torsby">Torsby</div><div id="Torsåker"><input type="checkbox" value="Torsåker" id="Torsåker">Torsåker</div><div id="Trankil"><input type="checkbox" value="Trankil" id="Trankil">Trankil</div><div id="Tunaberg"><input type="checkbox" value="Tunaberg" id="Tunaberg">Tunaberg</div><div id="Undenäs"><input type="checkbox" value="Undenäs" id="Undenäs">Undenäs</div><div id="Valbo"><input type="checkbox" value="Valbo" id="Valbo">Valbo</div><div id="Viby"><input type="checkbox" value="Viby" id="Viby">Viby</div><div id="Vigelsbo"><input type="checkbox" value="Vigelsbo" id="Vigelsbo">Vigelsbo</div><div id="Viker"><input type="checkbox" value="Viker" id="Viker">Viker</div><div id="Virserums"><input type="checkbox" value="Virserums" id="Virserums">Virserums</div><div id="Värmskog"><input type="checkbox" value="Värmskog" id="Värmskog">Värmskog</div><div id="Västanfors"><input type="checkbox" value="Västanfors" id="Västanfors">Västanfors</div><div id="Älvdalen"><input type="checkbox" value="Älvdalen" id="Älvdalen">Älvdalen</div><div id="Åls"><input type="checkbox" value="Åls" id="Åls">Åls</div><div id="Österåker"><input type="checkbox" value="Österåker" id="Österåker">Österåker</div></div>
                        </div>-->
                        <div class="Clear">
                        </div>
                        <input type="button" class="form_submit" value="Sök" id="btnSearch" />
                        <input type="button" value="Rensa" id="btnClear" />
                    </div>
                    <div id="currentCount"></div>
                    <div id="staticChoices"></div>
                </div>
				
				<div id="searchtriggerbottom"><a href="#">Stäng</a></div>
            </div>
             <div id="fragment-3" class="tabs-container tabs-hide">
                <div id="noOfHitsDiv">
                </div>
                <div id="resultList">
                </div>
                <div id="pageingContainer">
                    <a onclick="" href="#"></a>
                </div>
            </div>
        </div>
        <div id="container-2">
			<a id="layers-trigger" href="#">Visa på kartan</a>

			<div id="layers">
                <div class="content">
				    <div id="toc2">
					    <ul class="unorderedlisttree">
					    </ul>
				    </div>
				    <%--<div id="fotnot">Int = Internt lager (hanteras av Bergskraft).<br />Ext = Externt lager från annan källa.</div>--%>
                </div>
				
			    <a id="layers-trigger-bottom" href="#">Stäng</a>
			</div>

		</div>
        <div id="scaleBar">
                <select id="scaleList">
                <option value="4600">1:13039377</option><option value="2200">1:6236224</option><option value="420">1:1190552</option><option value="250">1:708662</option><option value="108">1:306142</option><option value="36">1:102047</option><option value="12">1:34016</option><option value="4">1:11339</option><option value="2">1:5669</option></select>
            </div>
        <div class="hide" id="loadingBar">
            <div>
            </div>
            <p>Arbetar&hellip;</p>
        </div>
        <a target="_blank" href="http://www.bergskraft.se"></a>
         <div id="dialog" class="showMinMax" title="Resultat">
            <table>
                <tr>
                    <td valign="top">
                        <select id="titleList" size="5" onchange="selectLayer(this);">
                        </select><br />
                        <input type="button" class="form_submit" value="Rapportera problem" id="ReportButton" />
                    </td>
                    <td>
                        <div id="resultPanel">
                            
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="loginDialog" title="Logga in med giltig E-post adress">
            <p id="newUser">
                Ny användare? <a href="javascript:Bergis.LoginControl.openCreateUserDialog();">Registrera dig här</a></p>
            <form class="login-sign-up" onsubmit="return false;" action="javascript:;">
            <input type="submit" style=" display:none;" />
            <fieldset>
                <label for="email">Epost</label>
                <input type="text" name="email" id="email" value=""/>

                <label for="password">Lösenord</label>
                <input type="password" name="password1" id="password" value="" />
                
                <label id="loginError"></label>
                
            </fieldset>
            </form>
        </div>

        <div id="engDialog" title="English version">
            <p>This application is unfortunately not available in english. Please go to <a href='http://bergskraft.se/eng/index_eng.htm'>the english version of our home page</a> for information about Bergskraft.</p>
        </div>

         <div id="newUserDialog" title="Skapa användarkonto">
            <p id="newUserValidateTips">
            </p>
            <p id="newUserError"></p>
            <form class="login-sign-up" onsubmit="return false;" action="javascript:;">
            <input type="submit" style="display: none;" />
            <fieldset>
                <label for="createEmailTbx">Epost</label>
                <input type="text" name="email" id="createEmailTbx" value="" />
                
                <label id="passwordLabel" for="createPasswordTbx">Lösenord</label>
                <input type="password" name="password1" id="createPasswordTbx" value="" />

                <label id="passwordHint"></label>

                <label for="confirmPasswordTbx">Bekräfta lösenord</label>
                <input type="password" name="password2" id="confirmPasswordTbx" value="" />

                <p>Genom att klicka på "Skapa användarkonto" nedan accepterar du <a href="weBerGISDocs/90508_SS_Allmänna_villkor_för_WeBerGis.pdf" target="_blank" >Användarvillkoren</a>.</p>
            </fieldset>
            </form>
        </div>

        <div id="reportDialog" title="Rapportera problem">
            <form class="report-problem" onsubmit="return false;" action="javascript:;">
            <input type="submit" style="display: none;" />
            <fieldset>
                <label for="createEmailTbx">Kommentar</label>
                <input type="text" name="email" id="reportText" value="" />
                <p>Skriv in din kommentar om det upplevda problemet och tryck på "Rapportera" så skickas den tillsammans med information om det aktuella objektet till oss. </p>
            </fieldset>
            </form>
        </div>


      <%--  <div id="paymentDialog" title="Betalning">
            <p id="P1">
            </p>
            <form>
            <fieldset>
                <input type="hidden" value="0" id="hdnCurrentDialogStage" name="hdnCurrentDialogStage" />
                <div id="paymentHeader">
                </div>
                <div id="content">
                </div>
            </fieldset>
            <button id="paymentPrevBtn" type="button">
            </button>
            <button id="paymentNextBtn" type="button">
            </button>
            </form>
        </div>--%>
    </div>
    <%--</form>--%>
</body>
</html>
