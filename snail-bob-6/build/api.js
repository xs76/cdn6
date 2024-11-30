/*
 * Coded By Reha Biçer & Gültekin Boyraz & Emre Demir
 * by Game Distribution 2010-2017
 *
 * Hello to all Amiga & C64 world.
 *
 */
(function (window) {

    var UNDEFINED = 'undefined';
    var adsManager;
    var adsEnabled = false;
    var prerollEnabled = true;
    var gameId;
    var tagUrl,tagData;
    var affialateId;
    var midrollTimeout=0;
    var adBlock = true;
    //var gdgaUUID = 'UA-102700627-1'; // test account
    var gdgaUUID = 'UA-102601800-1' // live account
    var gdApi = window['gdApi'];
    var settings = gdApi.q[0][0];
    gdApi.href = getParentUrl(); //window.location.href;

    // AdBlock Checker
 
        adBlock = false;
  

    init();
    function init() {
        onResumeGame();
    }
    function showBannerInternal(data) {
        adsManager.requestAds(false,tagData,tagUrl);

        _gd_ga('gd.send',{
            hitType: 'event',
            eventCategory: 'Ad',
            eventAction: 'Requested Midroll',
            eventLabel: settings.gameId
        });
    }
    function onBannerConfig(data) {
        if(data){
            // Init Ads
            var adsContainer = document.createElement("div");
            adsContainer.setAttribute("id","ads-container");
            adsContainer.style.position="absolute;";
            document.body.appendChild(adsContainer);
            var videoContainer = document.createElement("video");
            videoContainer.style.display = "none";
            document.body.appendChild(videoContainer);
            document.body.style.padding = "0px";
            document.body.style.margin = "0px";
            document.documentElement.style.padding = "0px";
            document.documentElement.style.margin = "0px";
            document.documentElement.style.overflow = "hidden";

            //console.log(data);
            // Set defaults, which could be overwritten.
            var defaults = {
                adsEnabled : true,
                prerollEnabled :true,
                midrollTimeout :2,
                gameId : "",
                affialateId :""
            };
            // Create options by extending defaults with the passed in arguments.

            if (typeof (data.cfg) !== UNDEFINED && typeof(data.cfg.f) !== UNDEFINED) {
                adsEnabled = false;
            } else {
                adsEnabled = data.row["0"].act;
                prerollEnabled = data.row["0"].pre == "1";
                midrollTimeout = data.row["0"].sat
                gameId = data.row["0"].uid;
                affialateId = data.row["0"].aid;

              //APPLY NEW TAG STRATEGY HERE
              var tagPageUrl = getParentUrl().split('/')[2];

              if((tagPageUrl === "spele.nl" || tagPageUrl === "www.funnygames.nl") && (gameId === "27673bc4-5d2e-4b27-b7cd-24e422f7c257" || gameId ==="a7f5393b-4173-4626-8657-f3bd67eac24e")){
                tagUrl = "http://api.tunnl.com:8080/Asset/GetAdTagInfo";
                tagData = {
                  "Session": {
                    "Token" : "1356b0be-8156-4dae-97d4-4d573d6c3b88"
                  },
                  "Data": {
                    "Id": gameId,
                    "PageUrl": tagPageUrl,
                    "Type" : 1
                  }
                };
              }
              // END OF TAG CODES
            }
          if((tagPageUrl === "spele.nl" || tagPageUrl === "www.funnygames.nl") && (gameId === "27673bc4-5d2e-4b27-b7cd-24e422f7c257" || gameId ==="a7f5393b-4173-4626-8657-f3bd67eac24e")){
            (new Image()).src="https://pub.tunnl.com/DistEvent?tid=T-1111&pid=P-333&disttype=1&eventtype=1";
          }
          else{
            (new Image()).src="https://analytics.tunnl.com/collect?type=html5&evt=game.play&uuid="+gameId+"&aid="+affialateId;
          }
          
          if (!adBlock) {
                adsManager=new GameDistributionAds(
                    {
                        play: onResumeGame,
                        pause:onPauseGame
                    },
                    {
                        container:adsContainer,
                        videoContent:videoContainer,
                        demoMode:0,
                        minAdsBreak:midrollTimeout,
                        log:_gd_.utils.log,
                        dfp:{
                            adsEnabled: adsEnabled,
                            gameId: gameId,
                            affialateId:affialateId,
                            parentUrl:gdApi.href
                        }
                    });

                // Enabled for Preroll?
                if (adsEnabled && prerollEnabled) {
                    adsManager.requestAds(true,tagData,tagPageUrl); // isPreroll is true

                    _gd_ga('gd.send',{
                        hitType: 'event',
                        eventCategory: 'Ad',
                        eventAction: 'Requested Preroll',
                        eventLabel: settings.gameId
                    });

                } else {
                    onResumeGame();
                }

                // Show Banner
                gdApi.showBanner=showBannerInternal;
            } else {
            onResumeGame();
          }
        }
        else{
            gdApi.showBanner = function () {
                onResumeGame();
                _gd_.utils.log("Problem occured fetching xml data!");
            }
        }
    }
    function onPauseGame(data) {
        try{
            if (typeof (settings.resumeGame) !== UNDEFINED && settings.resumeGame !== null ) {
                settings.pauseGame();

                _gd_ga('gd.send',{
                    hitType: 'event',
                    eventCategory: 'Game',
                    eventAction: 'Pause',
                    eventLabel: settings.gameId
                });
            }
        }
        catch (e){
            console.error(e);
        }
    }
    function onResumeGame(data) {
     
                settings.resumeGame();
              
       
    }
    function onError(data) {
        try{
            if (typeof(settings.onError) !== UNDEFINED) {
                settings.onError({Code:404,Data:data});
                _gd_ga('gd.send',{
                    hitType: 'event',
                    eventCategory: 'API',
                    eventAction: 'Error',
                    eventLabel: settings.gameId,
                    eventValue: 404
                });
            }
        }
        catch(e){
            console.error(e);
        }
    }

    function getParentUrl() {
        // If the referrer is gameplayer.io, else we just return href.
        // The referrer can be set by Spil games.
        if (document.referrer.indexOf('gameplayer.io') !== -1) {
            // now check if ref is not empty, otherwise we return a default.
            var defaultUrl = 'https://gamedistribution.com/';
            if(document.referrer.indexOf('?ref=') !== -1) {
                var returnedResult = document.referrer.substr(document.referrer.indexOf('?ref=') + 5);

                if(returnedResult !== ""){
                    if(returnedResult === '{portal%20name}' || returnedResult === '{portal name}') {
                        returnedResult = defaultUrl;

                    } else  if (returnedResult.indexOf('http') !== 0) {
                        returnedResult = 'http://' + returnedResult;
                    }
                }
                else{
                    returnedResult = defaultUrl;
                }

                return returnedResult;

            } else {
                return defaultUrl;
            }
        }
        else{
            if(document.referrer != null && document.referrer !== ""){
                return document.referrer;
            }
            return document.location.href;
        }

    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
    function loadScript(url, callback, callbackError) {

        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function () {
                callback();
            };

            script.onerror=function(){
                if(typeof callbackError!==UNDEFINED)
                    callbackError();
            };
        }

        script.src = url;

        document.getElementsByTagName("head")[0].appendChild(script);
    }



})(window);