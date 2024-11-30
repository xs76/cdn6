var MainGame = {
    Config: {
        ORIENTATION: "landscape",
        DEFAULT_WIDTH: 0,
        DEFAULT_HEIGHT: 0,
        MAX_WIDTH: 0,
        MAX_HEIGHT: 0
    },
    version: "v1.5",
    fontName: "Panton40",
    isDebug: false,
    isDebugAds: true,
    isAPI: true,
    isNoSave: false,
    isAutoPlay: false,
    isAudioDisable: false,
    isApiBreakTime: false,
    isApiGameplayStop: false,
    isDesktop: true,
    title: "stickmergedef_v1.0",
    languages: ["EN", "IT", "ES", "PT", "TR", "BR", "RU", "FR", "DE", "AR"],
    languagesN: ["00", "01", "02", "03", "04", "06", "07", "08", "05", "10"],
    language: 0,
    GAME_TEXT: null,
    TEXT_FILE: null,
    showFPS: false,
    firstLoad: true,
    firstGo: true,
    isFromFireMode: false,
    isFromTutorial: false,
    reward_wheel: null,
    amount_diamonds: null,
    amount_coins: null,
    exp: null,
    nextCarLevel: null,
    currentLevel: null,
    LIMIT_parking: null,
    LIMIT_pilots: null,
    box_have: null,
    arDeltaCarLevel: null,
    lastSession: null,
    selectedGun: 1,
    selectedHat: 0,
    fireLevel: 1,
    freeTimeWheel: 0,
    cdNextFree: 0,
    maxTimeWheel: 3,
    TIME_BANNER: 10,
    lastDataBanner: null,
    debug_isFreeUpgrade: false,
    debug_typeGun: 1,
    debug_typeSquad: 7,
    continuePreloader: function() {
        game.scene.start("Preloader")
    },
    initSettings: function() {
        MainGame.Config.DEFAULT_WIDTH = config.scale.width;
        MainGame.Config.DEFAULT_HEIGHT = config.scale.height;
        MainGame.Config.MAX_WIDTH = config.scale.max.width;
        MainGame.Config.MAX_HEIGHT = config.scale.max.height;
        MainGame.isDesktop = game.device.os.desktop;
        MainGame.loadSaves();
        if (game.device.os.desktop) {
            game.canvas.oncontextmenu = function(e) {
                e.preventDefault()
            };
            window.addEventListener("keydown", (function(e) {
                if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                    e.preventDefault()
                }
            }), false);
            window.addEventListener("wheel", e => e.preventDefault(), {
                passive: false
            })
        }
        if (MainGame.isAPI) {
            MainGame.API_POKI = game.plugins.get("PokiApiPlugin");
            if (!MainGame.isDebug) MainGame.api_check();
            MainGame.API_POKI.initAPI(MainGame.api_GamePause, MainGame.api_GameContinue)
        }
    },
    loadTestValues: function(vWaveNum) {
        MainGame.num_wave = vWaveNum;
        MainGame.arDeltaCarLevel = [];
        for (var i = 0; i < 50; i++) MainGame.arDeltaCarLevel[i] = 0;
        switch (vWaveNum) {
            case 1:
                this.box_have = [{
                    id: 0,
                    t: 2,
                    r: false
                }, {
                    id: 1,
                    t: 1,
                    r: false
                }];
                MainGame.currentLevel = 1;
                MainGame.level_wall = 1;
                MainGame.nextCarLevel = 3;
                break;
            case 2:
                this.box_have = [{
                    id: 0,
                    t: 5,
                    r: false
                }, {
                    id: 1,
                    t: 3,
                    r: false
                }, {
                    id: 2,
                    t: 2,
                    r: false
                }, {
                    id: 3,
                    t: 1,
                    r: false
                }];
                MainGame.currentLevel = 2;
                MainGame.level_wall = 2;
                MainGame.nextCarLevel = 6;
                MainGame.arDeltaCarLevel[0] = 17;
                break;
            case 3:
                this.box_have = [{
                    id: 0,
                    t: 5,
                    r: false
                }, {
                    id: 1,
                    t: 4,
                    r: false
                }, {
                    id: 2,
                    t: 3,
                    r: false
                }];
                MainGame.currentLevel = 2;
                MainGame.level_wall = 3;
                MainGame.nextCarLevel = 6;
                MainGame.arDeltaCarLevel[0] = 19;
                break;
            case 4:
                this.box_have = [{
                    id: 0,
                    t: 6,
                    r: false
                }, {
                    id: 1,
                    t: 5,
                    r: false
                }, {
                    id: 2,
                    t: 3,
                    r: false
                }, {
                    id: 3,
                    t: 2,
                    r: false
                }, {
                    id: 4,
                    t: 1,
                    r: false
                }];
                MainGame.currentLevel = 3;
                MainGame.level_wall = 3;
                MainGame.nextCarLevel = 7;
                MainGame.arDeltaCarLevel[0] = 22;
                MainGame.arDeltaCarLevel[1] = 10;
                break;
            case 5:
                this.box_have = [{
                    id: 0,
                    t: 7,
                    r: false
                }, {
                    id: 1,
                    t: 6,
                    r: false
                }, {
                    id: 2,
                    t: 1,
                    r: false
                }];
                MainGame.currentLevel = 4;
                MainGame.level_wall = 4;
                MainGame.nextCarLevel = 8;
                MainGame.arDeltaCarLevel[0] = 24;
                MainGame.arDeltaCarLevel[1] = 12;
                MainGame.arDeltaCarLevel[2] = 8;
                break;
            case 6:
                this.box_have = [{
                    id: 0,
                    t: 8,
                    r: false
                }, {
                    id: 1,
                    t: 6,
                    r: false
                }, {
                    id: 2,
                    t: 5,
                    r: false
                }, {
                    id: 3,
                    t: 2,
                    r: false
                }];
                MainGame.currentLevel = 5;
                MainGame.level_wall = 4;
                MainGame.nextCarLevel = 9;
                MainGame.arDeltaCarLevel[0] = 26;
                MainGame.arDeltaCarLevel[1] = 16;
                MainGame.arDeltaCarLevel[2] = 15;
                break;
            case 7:
                this.box_have = [{
                    id: 0,
                    t: 8,
                    r: false
                }, {
                    id: 1,
                    t: 7,
                    r: false
                }, {
                    id: 2,
                    t: 6,
                    r: false
                }, {
                    id: 3,
                    t: 3,
                    r: false
                }, {
                    id: 4,
                    t: 2,
                    r: false
                }];
                MainGame.currentLevel = 6;
                MainGame.level_wall = 5;
                MainGame.nextCarLevel = 9;
                MainGame.arDeltaCarLevel[0] = 25;
                MainGame.arDeltaCarLevel[1] = 14;
                MainGame.arDeltaCarLevel[2] = 14;
                MainGame.arDeltaCarLevel[3] = 11;
                break;
            case 8:
                this.box_have = [{
                    id: 0,
                    t: 9,
                    r: false
                }, {
                    id: 1,
                    t: 8,
                    r: false
                }, {
                    id: 2,
                    t: 7,
                    r: false
                }, {
                    id: 3,
                    t: 4,
                    r: false
                }];
                MainGame.currentLevel = 6;
                MainGame.level_wall = 5;
                MainGame.nextCarLevel = 10;
                MainGame.arDeltaCarLevel[0] = 25;
                MainGame.arDeltaCarLevel[1] = 14;
                MainGame.arDeltaCarLevel[2] = 14;
                MainGame.arDeltaCarLevel[3] = 15;
                MainGame.arDeltaCarLevel[4] = 12;
                break;
            case 9:
                this.box_have = [{
                    id: 0,
                    t: 10,
                    r: false
                }, {
                    id: 1,
                    t: 8,
                    r: false
                }, {
                    id: 2,
                    t: 4,
                    r: false
                }, {
                    id: 3,
                    t: 3,
                    r: false
                }];
                MainGame.currentLevel = 7;
                MainGame.level_wall = 6;
                MainGame.nextCarLevel = 11;
                MainGame.arDeltaCarLevel[0] = 30;
                MainGame.arDeltaCarLevel[1] = 18;
                MainGame.arDeltaCarLevel[2] = 18;
                MainGame.arDeltaCarLevel[3] = 17;
                MainGame.arDeltaCarLevel[4] = 14;
                MainGame.arDeltaCarLevel[5] = 4;
                break;
            case 10:
                this.box_have = [{
                    id: 0,
                    t: 11,
                    r: false
                }, {
                    id: 1,
                    t: 7,
                    r: false
                }, {
                    id: 2,
                    t: 5,
                    r: false
                }];
                MainGame.currentLevel = 8;
                MainGame.level_wall = 6;
                MainGame.nextCarLevel = 12;
                MainGame.arDeltaCarLevel[0] = 30;
                MainGame.arDeltaCarLevel[1] = 18;
                MainGame.arDeltaCarLevel[2] = 18;
                MainGame.arDeltaCarLevel[3] = 17;
                MainGame.arDeltaCarLevel[4] = 17;
                MainGame.arDeltaCarLevel[5] = 16;
                break;
            case 11:
                this.box_have = [{
                    id: 0,
                    t: 12,
                    r: false
                }, {
                    id: 1,
                    t: 11,
                    r: false
                }, {
                    id: 2,
                    t: 10,
                    r: false
                }, {
                    id: 3,
                    t: 8,
                    r: false
                }, {
                    id: 3,
                    t: 6,
                    r: false
                }];
                MainGame.currentLevel = 10;
                MainGame.level_wall = 7;
                MainGame.nextCarLevel = 13;
                MainGame.arDeltaCarLevel[0] = 25;
                MainGame.arDeltaCarLevel[1] = 13;
                MainGame.arDeltaCarLevel[2] = 19;
                MainGame.arDeltaCarLevel[3] = 16;
                MainGame.arDeltaCarLevel[4] = 17;
                MainGame.arDeltaCarLevel[5] = 17;
                MainGame.arDeltaCarLevel[6] = 16;
                MainGame.arDeltaCarLevel[7] = 12;
                break
        }
    },
    showTestValues: function() {
        console.log("=== nextCarLevel");
        console.log(MainGame.nextCarLevel);
        console.log("=== arDeltaCarLevel");
        console.log(MainGame.arDeltaCarLevel)
    },
    api_analytics: function(vValue, vLevel) {
        if (vLevel) {
            console.log("api_analytics", vValue, vLevel)
        } else {
            console.log("api_analytics", vValue)
        }
        if (MainGame.isDebug) return;
        switch (vValue) {
            case "MaxTextureSize":
                GameAnalytics("addDesignEvent", vValue + ":" + vLevel, 1);
                break;
            case "MaxLevelCar":
                GameAnalytics("addDesignEvent", vValue + ":" + vLevel, 1);
                break;
            case "EASY3ROW":
                GameAnalytics("addDesignEvent", vValue + ":" + vLevel, 1);
                break;
            case "DEFEAT2ROW":
                GameAnalytics("addDesignEvent", vValue + ":" + vLevel, 1);
                break;
            case "ClickCoinsX2":
            case "ClickNoThanks":
            case "ClickFortuna":
            case "ClickHelicopter":
            case "ClickUpgrade":
            case "ClickFreeShop":
            case "ClickOfferTV":
                GameAnalytics("addDesignEvent", vValue, 1);
                break;
            case "Start":
                GameAnalytics("addProgressionEvent", "Start", "wave" + vLevel);
                break;
            case "Fail":
                GameAnalytics("addProgressionEvent", "Fail", "wave" + vLevel);
                break;
            case "Complete":
                GameAnalytics("addProgressionEvent", "Complete", "wave" + vLevel);
                break
        }
    },
    api_GamePause: function(isCommercialBreak) {
        MainGame.isApiBreakTime = true;
        game.sound.mute = true;
        if (isCommercialBreak) MainGame.state.setGameLogicPause(true)
    },
    api_GameContinue: function(isCommercialBreak, withReward) {
        MainGame.isApiBreakTime = false;
        game.sound.mute = false;
        if (isCommercialBreak) MainGame.state.setGameLogicPause(false);
        if (isCommercialBreak && MainGame.isApiGameplayStop) {
            MainGame.API_POKI.gameplayStart();
            MainGame.isApiGameplayStop = false
        }
    },
    getReward: function(withReward) {
        if (withReward) {
            MainGame.state.getRewards(MainGame.selectedReward)
        } else {
            MainGame.state.gameGUI.showSystemMessage(MainGame.GAME_TEXT.ads_no_ready)
        }
        MainGame.state.checkAfterAds();
        MainGame.selectedReward = null
    },
    clickReward: function(vReward) {
        MainGame.selectedReward = vReward;
        if (MainGame.isAPI) {
            MainGame.API_POKI.rewardedBreak()
        } else {
            if (MainGame.isDebugAds) {
                console.log("[isDebugAds] BEGIN");
                MainGame.api_GamePause();
                setTimeout((function() {
                    console.log("[isDebugAds] END");
                    MainGame.api_GameContinue(false, true);
                    MainGame.getReward(true)
                }), 1500)
            }
        }
    },
    api_check: function() {
        /*var _0x1918 = ["top", "indexOf", "aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==", "hostname", "length", "location", "LnBva2ktZ2RuLmNvbQ==", "href"];
        (function(_0x4a02b5, _0x5c0c3d) {
            var _0x56a85d = function(_0x375c0e) {
                while (--_0x375c0e) {
                    _0x4a02b5["push"](_0x4a02b5["shift"]())
                }
            };
            _0x56a85d(++_0x5c0c3d)
        })(_0x1918, 430);
        var _0xcdc9 = function(_0x4a02b5, _0x5c0c3d) {
            _0x4a02b5 = _0x4a02b5 - 0;
            var _0x56a85d = _0x1918[_0x4a02b5];
            return _0x56a85d
        };
        (function checkInit() {
            var _0x151adb = ["bG9jYWxob3N0", "LnBva2kuY29t", _0xcdc9("0x0")];
            var _0x219654 = ![];
            var _0x558823 = window[_0xcdc9("0x7")][_0xcdc9("0x5")];
            for (var _0x220888 = 0; _0x220888 < _0x151adb[_0xcdc9("0x6")]; _0x220888++) {
                var _0x4a2f49 = atob(_0x151adb[_0x220888]);
                if (_0x558823[_0xcdc9("0x3")](_0x4a2f49, _0x558823["length"] - _0x4a2f49["length"]) !== -1) {
                    _0x219654 = !![];
                    break
                }
            }
            if (!_0x219654) {
                var _0xcff8e8 = _0xcdc9("0x4");
                var _0x3296f7 = atob(_0xcff8e8);
                window["location"][_0xcdc9("0x1")] = _0x3296f7;
                this[_0xcdc9("0x2")][_0xcdc9("0x7")] !== this[_0xcdc9("0x7")] && (this[_0xcdc9("0x2")][_0xcdc9("0x7")] = this[_0xcdc9("0x7")])
            }
        })()*/
    },
    addText: function(vLink, vLayer, vX, vY, vText, vSize, vIsUpperCase, vIsNoShadow) {
        vText = vText + "";
        if (vText && vIsUpperCase) vText = vText.toUpperCase();
        var shadowEffect = true;
        if (vIsNoShadow) shadowEffect = false;
        var txt = vLink.add.bitmapText(vX, vY, MainGame.fontName, vText);
        txt.setFontSize(vSize);
        txt.setOrigin(.5);
        if (shadowEffect) txt.setDropShadow(-1, 2, 0, 1);
        if (vLayer) vLayer.add(txt);
        return txt
    },
    updateTextWidth: function(vText, vMaxWidth) {
        var scale = 1;
        vText.setScale(scale);
        var txtWidth = vText.width;
        if (txtWidth > vMaxWidth) {
            scale = vMaxWidth / txtWidth;
            vText.setScale(scale)
        }
        return scale
    },
    replaceText: function(vText, vValue) {
        return vText.replace("#", vValue.toString())
    },
    convertNumberFormat: function(number) {
        var temp = number;
        var tabUnits = ["K", "M", "B", "T", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"];
        var highnumber = false;
        var bignumber = 1e3;
        var tabposition = -1;
        var p_atomepersecond = true;
        var unit;
        if (number >= bignumber) {
            highnumber = true;
            while (number >= bignumber) {
                bignumber *= 1e3;
                tabposition++
            }
            number /= bignumber / 1e3;
            unit = tabUnits[tabposition]
        } else unit = "";
        if (unit == undefined) return temp.toExponential(2);
        var toround = highnumber == true ? p_atomepersecond == true ? 100 : 100 : 10;
        var res = Math.round(number * toround) / toround;
        return [res.toLocaleString().replace(",", ".") + "" + unit]
    },
    secToHHMMSS: function(vSec) {
        var seconds = parseInt(vSec, 10);
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - hours * 3600) / 60);
        var seconds = seconds - hours * 3600 - minutes * 60;
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        var time = minutes + ":" + seconds;
        return time
    },
    jelly: function(game, object, strength, delay, initialScale) {
        strength = strength || .2;
        delay = delay || 0;
        initialScale = initialScale || {
            x: 1,
            y: 1
        };
        game.tweens.killTweensOf(object);
        game.tweens.add({
            targets: object,
            props: {
                scaleX: {
                    value: initialScale.x + initialScale.x * strength,
                    duration: 50,
                    delay: delay
                },
                scaleY: {
                    value: initialScale.y + initialScale.y * strength,
                    duration: 50,
                    delay: delay + 50
                }
            },
            ease: "Quadratic.easeInOut"
        });
        game.tweens.add({
            targets: object,
            props: {
                scaleX: {
                    value: initialScale.x,
                    duration: 500,
                    delay: 50 + delay
                },
                scaleY: {
                    value: initialScale.y,
                    duration: 500,
                    delay: 50 + delay + 50
                }
            },
            ease: "Elastic.easeOut"
        })
    },
    loadSaves: function() {
        MainGame.amount_coins = MainGame.Storage.get(MainGame.title + "-" + "amount_coins");
        MainGame.amount_diamonds = MainGame.Storage.get(MainGame.title + "-" + "amount_diamonds");
        MainGame.exp = MainGame.Storage.get(MainGame.title + "-" + "exp");
        MainGame.nextCarLevel = MainGame.Storage.get(MainGame.title + "-" + "nextCarLevel");
        MainGame.currentLevel = MainGame.Storage.get(MainGame.title + "-" + "currentLevel");
        MainGame.LIMIT_parking = MainGame.Storage.get(MainGame.title + "-" + "LIMIT_parking");
        MainGame.LIMIT_pilots = MainGame.Storage.get(MainGame.title + "-" + "LIMIT_pilots");
        MainGame.box_have = MainGame.Storage.get(MainGame.title + "-" + "box_have");
        MainGame.arDeltaCarLevel = MainGame.Storage.get(MainGame.title + "-" + "arDeltaCarLevel");
        MainGame.lastSession = MainGame.Storage.get(MainGame.title + "-" + "lastSession");
        MainGame.cdBonusMerge = MainGame.Storage.get(MainGame.title + "-" + "cdBonusMerge");
        MainGame.cdBonusCoins = MainGame.Storage.get(MainGame.title + "-" + "cdBonusCoins");
        MainGame.cdBonusSpeed = MainGame.Storage.get(MainGame.title + "-" + "cdBonusSpeed");
        MainGame.buffer_boxes = MainGame.Storage.get(MainGame.title + "-" + "buffer_boxes");
        MainGame.freeTimeWheel = MainGame.Storage.get(MainGame.title + "-" + "freeTimeWheel");
        MainGame.cdNextFree = MainGame.Storage.get(MainGame.title + "-" + "cdNextFree");
        MainGame.levelCannonDmg = MainGame.Storage.get(MainGame.title + "-" + "levelCannonDmg");
        MainGame.levelEarning = MainGame.Storage.get(MainGame.title + "-" + "levelEarning");
        MainGame.levelDiscount = MainGame.Storage.get(MainGame.title + "-" + "levelDiscount");
        MainGame.num_wave = MainGame.Storage.get(MainGame.title + "-" + "num_wave");
        MainGame.level_wall = MainGame.Storage.get(MainGame.title + "-" + "level_wall");
        var language = MainGame.Storage.get(MainGame.title + "-" + "language");
        if (language != null) MainGame.language = language
    },
    saveSaves: function() {
        if (MainGame.isNoSave) return;
        MainGame.Storage.set(MainGame.title + "-" + "amount_coins", MainGame.amount_coins);
        MainGame.Storage.set(MainGame.title + "-" + "amount_diamonds", MainGame.amount_diamonds);
        MainGame.Storage.set(MainGame.title + "-" + "exp", MainGame.exp);
        MainGame.Storage.set(MainGame.title + "-" + "nextCarLevel", MainGame.nextCarLevel);
        MainGame.Storage.set(MainGame.title + "-" + "currentLevel", MainGame.currentLevel);
        MainGame.Storage.set(MainGame.title + "-" + "LIMIT_parking", MainGame.LIMIT_parking);
        MainGame.Storage.set(MainGame.title + "-" + "LIMIT_pilots", MainGame.LIMIT_pilots);
        MainGame.Storage.set(MainGame.title + "-" + "box_have", MainGame.box_have);
        MainGame.Storage.set(MainGame.title + "-" + "arDeltaCarLevel", MainGame.arDeltaCarLevel);
        MainGame.Storage.set(MainGame.title + "-" + "lastSession", MainGame.lastSession);
        MainGame.Storage.set(MainGame.title + "-" + "language", MainGame.language);
        MainGame.Storage.set(MainGame.title + "-" + "cdBonusMerge", MainGame.cdBonusMerge);
        MainGame.Storage.set(MainGame.title + "-" + "cdBonusCoins", MainGame.cdBonusCoins);
        MainGame.Storage.set(MainGame.title + "-" + "cdBonusSpeed", MainGame.cdBonusSpeed);
        MainGame.Storage.set(MainGame.title + "-" + "buffer_boxes", MainGame.buffer_boxes);
        MainGame.Storage.set(MainGame.title + "-" + "freeTimeWheel", MainGame.freeTimeWheel);
        MainGame.Storage.set(MainGame.title + "-" + "cdNextFree", MainGame.cdNextFree);
        MainGame.Storage.set(MainGame.title + "-" + "levelCannonDmg", MainGame.levelCannonDmg);
        MainGame.Storage.set(MainGame.title + "-" + "levelEarning", MainGame.levelEarning);
        MainGame.Storage.set(MainGame.title + "-" + "levelDiscount", MainGame.levelDiscount);
        MainGame.Storage.set(MainGame.title + "-" + "num_wave", MainGame.num_wave);
        MainGame.Storage.set(MainGame.title + "-" + "level_wall", MainGame.level_wall)
    },
    clearSaves: function() {
        MainGame.Storage.remove(MainGame.title + "-" + "amount_coins");
        MainGame.Storage.remove(MainGame.title + "-" + "amount_diamonds");
        MainGame.Storage.remove(MainGame.title + "-" + "exp");
        MainGame.Storage.remove(MainGame.title + "-" + "nextCarLevel");
        MainGame.Storage.remove(MainGame.title + "-" + "currentLevel");
        MainGame.Storage.remove(MainGame.title + "-" + "LIMIT_parking");
        MainGame.Storage.remove(MainGame.title + "-" + "LIMIT_pilots");
        MainGame.Storage.remove(MainGame.title + "-" + "box_have");
        MainGame.Storage.remove(MainGame.title + "-" + "arDeltaCarLevel");
        MainGame.Storage.remove(MainGame.title + "-" + "lastSession");
        MainGame.Storage.remove(MainGame.title + "-" + "language");
        MainGame.Storage.remove(MainGame.title + "-" + "cdBonusMerge");
        MainGame.Storage.remove(MainGame.title + "-" + "cdBonusCoins");
        MainGame.Storage.remove(MainGame.title + "-" + "cdBonusSpeed");
        MainGame.Storage.remove(MainGame.title + "-" + "buffer_boxes");
        MainGame.Storage.remove(MainGame.title + "-" + "freeTimeWheel");
        MainGame.Storage.remove(MainGame.title + "-" + "cdNextFree");
        MainGame.Storage.remove(MainGame.title + "-" + "levelCannonDmg");
        MainGame.Storage.remove(MainGame.title + "-" + "levelEarning");
        MainGame.Storage.remove(MainGame.title + "-" + "levelDiscount");
        MainGame.Storage.remove(MainGame.title + "-" + "num_wave");
        MainGame.Storage.remove(MainGame.title + "-" + "level_wall");
        MainGame.isNoSave = true;
        MainGame.amount_coins = null;
        MainGame.amount_diamonds = null;
        MainGame.exp = null;
        MainGame.nextCarLevel = null;
        MainGame.currentLevel = null;
        MainGame.LIMIT_parking = null;
        MainGame.LIMIT_pilots = null;
        MainGame.box_have = null;
        MainGame.arDeltaCarLevel = null;
        MainGame.lastSession = null;
        MainGame.cdBonusMerge = null;
        MainGame.cdBonusCoins = null;
        MainGame.cdBonusSpeed = null;
        MainGame.buffer_boxes = null;
        MainGame.freeTimeWheel = null;
        MainGame.cdNextFree = null;
        MainGame.levelCannonDmg = null;
        MainGame.levelEarning = null;
        MainGame.levelDiscount = null;
        MainGame.num_wave = null;
        MainGame.level_wall = null
    }
};
MainGame.Sfx = {
    manage: function(type, mode, game, button, label) {
        if (MainGame.isAudioDisable) return;
        switch (mode) {
            case "init": {
                MainGame.Storage.initUnset(MainGame.title + "-" + type, true);
                MainGame.Sfx.status = MainGame.Sfx.status || [];
                MainGame.Sfx.status[type] = MainGame.Storage.get(MainGame.title + "-" + type);
                if (type == "sound") {
                    MainGame.Sfx.sounds = [];
                    MainGame.Sfx.sounds["after_exposion"] = game.sound.add("after_exposion2");
                    MainGame.Sfx.sounds["boost"] = game.sound.add("boost3");
                    MainGame.Sfx.sounds["buy"] = game.sound.add("buy");
                    MainGame.Sfx.sounds["click"] = game.sound.add("click4");
                    MainGame.Sfx.sounds["dead1"] = game.sound.add("dead1");
                    MainGame.Sfx.sounds["dead2"] = game.sound.add("dead2");
                    MainGame.Sfx.sounds["dead3"] = game.sound.add("dead3");
                    MainGame.Sfx.sounds["dead4"] = game.sound.add("dead4");
                    MainGame.Sfx.sounds["dead5"] = game.sound.add("dead5");
                    MainGame.Sfx.sounds["dead6"] = game.sound.add("dead6");
                    MainGame.Sfx.sounds["dead7"] = game.sound.add("dead7");
                    MainGame.Sfx.sounds["dead8"] = game.sound.add("dead8");
                    MainGame.Sfx.sounds["dead9"] = game.sound.add("dead9");
                    MainGame.Sfx.sounds["dead10"] = game.sound.add("dead10");
                    MainGame.Sfx.sounds["dead11"] = game.sound.add("dead11");
                    MainGame.Sfx.sounds["dead12"] = game.sound.add("dead12");
                    MainGame.Sfx.sounds["exposion1"] = game.sound.add("exposion1");
                    MainGame.Sfx.sounds["exposion2"] = game.sound.add("exposion2");
                    MainGame.Sfx.sounds["exposion3"] = game.sound.add("exposion3");
                    MainGame.Sfx.sounds["exposion4"] = game.sound.add("exposion4");
                    MainGame.Sfx.sounds["fortune"] = game.sound.add("fortune4");
                    MainGame.Sfx.sounds["heal"] = game.sound.add("heal");
                    MainGame.Sfx.sounds["knock1"] = game.sound.add("knock1");
                    MainGame.Sfx.sounds["knock2"] = game.sound.add("knock2");
                    MainGame.Sfx.sounds["knock3"] = game.sound.add("knock3");
                    MainGame.Sfx.sounds["knock4"] = game.sound.add("knock4");
                    MainGame.Sfx.sounds["knock5"] = game.sound.add("knock5");
                    MainGame.Sfx.sounds["knock6"] = game.sound.add("knock6");
                    MainGame.Sfx.sounds["knock7"] = game.sound.add("knock7");
                    MainGame.Sfx.sounds["knock8"] = game.sound.add("knock8");
                    MainGame.Sfx.sounds["knock9"] = game.sound.add("knock9");
                    MainGame.Sfx.sounds["lvl_up"] = game.sound.add("lvl_up2");
                    MainGame.Sfx.sounds["merge_car"] = game.sound.add("merge_car3");
                    MainGame.Sfx.sounds["merge_unlocked"] = game.sound.add("merge_unlocked2");
                    MainGame.Sfx.sounds["offline_earning"] = game.sound.add("offline_earning3");
                    MainGame.Sfx.sounds["open_box"] = game.sound.add("open_box2");
                    MainGame.Sfx.sounds["remove_car"] = game.sound.add("remove_car3");
                    MainGame.Sfx.sounds["shoot_auto1"] = game.sound.add("shoot_auto1");
                    MainGame.Sfx.sounds["shoot_auto2"] = game.sound.add("shoot_auto2");
                    MainGame.Sfx.sounds["shoot_auto3"] = game.sound.add("shoot_auto3");
                    MainGame.Sfx.sounds["shoot_auto4"] = game.sound.add("shoot_auto4");
                    MainGame.Sfx.sounds["shoot_blaster1"] = game.sound.add("shoot_blaster1");
                    MainGame.Sfx.sounds["shoot_blaster2"] = game.sound.add("shoot_blaster2");
                    MainGame.Sfx.sounds["shoot_blaster3"] = game.sound.add("shoot_blaster3");
                    MainGame.Sfx.sounds["shoot_blaster4"] = game.sound.add("shoot_blaster4");
                    MainGame.Sfx.sounds["shoot_machine1"] = game.sound.add("shoot_machine1");
                    MainGame.Sfx.sounds["shoot_machine2"] = game.sound.add("shoot_machine2");
                    MainGame.Sfx.sounds["shoot_machine3"] = game.sound.add("shoot_machine3");
                    MainGame.Sfx.sounds["shoot_machine4"] = game.sound.add("shoot_machine4");
                    MainGame.Sfx.sounds["shoot_pistol1"] = game.sound.add("shoot_pistol1");
                    MainGame.Sfx.sounds["shoot_pistol2"] = game.sound.add("shoot_pistol2");
                    MainGame.Sfx.sounds["shoot_pistol3"] = game.sound.add("shoot_pistol3");
                    MainGame.Sfx.sounds["shoot_pistol4"] = game.sound.add("shoot_pistol4");
                    MainGame.Sfx.sounds["shoot_rifle1"] = game.sound.add("shoot_rifle1");
                    MainGame.Sfx.sounds["shoot_rifle2"] = game.sound.add("shoot_rifle2");
                    MainGame.Sfx.sounds["shoot_rifle3"] = game.sound.add("shoot_rifle3");
                    MainGame.Sfx.sounds["shoot_rifle4"] = game.sound.add("shoot_rifle4");
                    MainGame.Sfx.sounds["shoot_shotgun1"] = game.sound.add("shoot_shotgun1");
                    MainGame.Sfx.sounds["shoot_shotgun2"] = game.sound.add("shoot_shotgun2");
                    MainGame.Sfx.sounds["shoot_shotgun3"] = game.sound.add("shoot_shotgun3");
                    MainGame.Sfx.sounds["shoot_shotgun4"] = game.sound.add("shoot_shotgun4");
                    MainGame.Sfx.sounds["show_box"] = game.sound.add("show_box");
                    MainGame.Sfx.sounds["skill_grenade"] = game.sound.add("skill_grenade");
                    MainGame.Sfx.sounds["skill_poison"] = game.sound.add("skill_poison");
                    MainGame.Sfx.sounds["skill_rocket"] = game.sound.add("skill_rocket3");
                    MainGame.Sfx.sounds["k_aaa1"] = game.sound.add("k_aaa1");
                    MainGame.Sfx.sounds["k_aaa2"] = game.sound.add("k_aaa2");
                    MainGame.Sfx.sounds["k_aaa3"] = game.sound.add("k_aaa1");
                    MainGame.Sfx.sounds["k_aaa4"] = game.sound.add("k_aaa2");
                    MainGame.Sfx.sounds["k_aaa5"] = game.sound.add("k_aaa1");
                    MainGame.Sfx.sounds["k_aaa6"] = game.sound.add("k_aaa2");
                    MainGame.Sfx.sounds["k_aaa7"] = game.sound.add("k_aaa1");
                    MainGame.Sfx.sounds["k_aaa8"] = game.sound.add("k_aaa2");
                    MainGame.Sfx.sounds["k_aaa9"] = game.sound.add("k_aaa1");
                    MainGame.Sfx.sounds["wave_defeat"] = game.sound.add("wave_defeat");
                    MainGame.Sfx.sounds["wave_finish"] = game.sound.add("wave_finish");
                    MainGame.Sfx.sounds["wave_start"] = game.sound.add("wave_start3");
                    MainGame.Sfx.sounds["after_exposion"].volume = .85;
                    MainGame.Sfx.sounds["boost"].volume = 2.1;
                    MainGame.Sfx.sounds["buy"].volume = 2.2;
                    MainGame.Sfx.sounds["click"].volume = 1;
                    MainGame.Sfx.sounds["dead1"].volume = 1.2;
                    MainGame.Sfx.sounds["dead2"].volume = 1.2;
                    MainGame.Sfx.sounds["dead3"].volume = 1.2;
                    MainGame.Sfx.sounds["dead4"].volume = 1.2;
                    MainGame.Sfx.sounds["dead5"].volume = 1.2;
                    MainGame.Sfx.sounds["dead6"].volume = 1.2;
                    MainGame.Sfx.sounds["dead7"].volume = 1.2;
                    MainGame.Sfx.sounds["dead8"].volume = 1.2;
                    MainGame.Sfx.sounds["dead9"].volume = 1.2;
                    MainGame.Sfx.sounds["dead10"].volume = 1.2;
                    MainGame.Sfx.sounds["dead11"].volume = 1.2;
                    MainGame.Sfx.sounds["dead12"].volume = 1.2;
                    MainGame.Sfx.sounds["exposion1"].volume = 1.2;
                    MainGame.Sfx.sounds["exposion2"].volume = 1.2;
                    MainGame.Sfx.sounds["exposion3"].volume = .6;
                    MainGame.Sfx.sounds["exposion4"].volume = .6;
                    MainGame.Sfx.sounds["fortune"].volume = 1.5;
                    MainGame.Sfx.sounds["heal"].volume = 1;
                    MainGame.Sfx.sounds["knock1"].volume = .9;
                    MainGame.Sfx.sounds["knock2"].volume = .9;
                    MainGame.Sfx.sounds["knock3"].volume = .9;
                    MainGame.Sfx.sounds["knock4"].volume = .9;
                    MainGame.Sfx.sounds["knock5"].volume = .9;
                    MainGame.Sfx.sounds["knock6"].volume = .9;
                    MainGame.Sfx.sounds["knock7"].volume = .6;
                    MainGame.Sfx.sounds["knock8"].volume = .6;
                    MainGame.Sfx.sounds["knock9"].volume = .25;
                    MainGame.Sfx.sounds["lvl_up"].volume = .9;
                    MainGame.Sfx.sounds["merge_car"].volume = 1;
                    MainGame.Sfx.sounds["merge_unlocked"].volume = 3;
                    MainGame.Sfx.sounds["offline_earning"].volume = 3;
                    MainGame.Sfx.sounds["open_box"].volume = 1.1;
                    MainGame.Sfx.sounds["remove_car"].volume = 3;
                    MainGame.Sfx.sounds["shoot_auto1"].volume = .9;
                    MainGame.Sfx.sounds["shoot_auto2"].volume = .9;
                    MainGame.Sfx.sounds["shoot_auto3"].volume = .9;
                    MainGame.Sfx.sounds["shoot_auto4"].volume = .9;
                    MainGame.Sfx.sounds["shoot_blaster1"].volume = 1;
                    MainGame.Sfx.sounds["shoot_blaster2"].volume = 1;
                    MainGame.Sfx.sounds["shoot_blaster3"].volume = 1;
                    MainGame.Sfx.sounds["shoot_blaster4"].volume = 1;
                    MainGame.Sfx.sounds["shoot_machine1"].volume = 1;
                    MainGame.Sfx.sounds["shoot_machine2"].volume = .8;
                    MainGame.Sfx.sounds["shoot_machine3"].volume = 1;
                    MainGame.Sfx.sounds["shoot_machine4"].volume = .8;
                    MainGame.Sfx.sounds["shoot_pistol1"].volume = .7;
                    MainGame.Sfx.sounds["shoot_pistol2"].volume = .9;
                    MainGame.Sfx.sounds["shoot_pistol3"].volume = .7;
                    MainGame.Sfx.sounds["shoot_pistol4"].volume = .7;
                    MainGame.Sfx.sounds["shoot_rifle1"].volume = 1;
                    MainGame.Sfx.sounds["shoot_rifle2"].volume = 1;
                    MainGame.Sfx.sounds["shoot_rifle3"].volume = .8;
                    MainGame.Sfx.sounds["shoot_rifle4"].volume = .8;
                    MainGame.Sfx.sounds["shoot_shotgun1"].volume = 1;
                    MainGame.Sfx.sounds["shoot_shotgun2"].volume = 1;
                    MainGame.Sfx.sounds["shoot_shotgun3"].volume = 1;
                    MainGame.Sfx.sounds["shoot_shotgun4"].volume = 1;
                    MainGame.Sfx.sounds["show_box"].volume = 2.5;
                    MainGame.Sfx.sounds["skill_grenade"].volume = 1.4;
                    MainGame.Sfx.sounds["skill_poison"].volume = 3;
                    MainGame.Sfx.sounds["skill_rocket"].volume = 3;
                    MainGame.Sfx.sounds["k_aaa1"].volume = .3;
                    MainGame.Sfx.sounds["k_aaa2"].volume = .3;
                    MainGame.Sfx.sounds["k_aaa3"].volume = .3;
                    MainGame.Sfx.sounds["k_aaa4"].volume = .3;
                    MainGame.Sfx.sounds["k_aaa5"].volume = .3;
                    MainGame.Sfx.sounds["k_aaa6"].volume = .3;
                    MainGame.Sfx.sounds["k_aaa7"].volume = .3;
                    MainGame.Sfx.sounds["k_aaa8"].volume = .3;
                    MainGame.Sfx.sounds["k_aaa9"].volume = .3;
                    MainGame.Sfx.sounds["wave_defeat"].volume = .8;
                    MainGame.Sfx.sounds["wave_finish"].volume = .9;
                    MainGame.Sfx.sounds["wave_start"].volume = 2.1
                } else {
                    MainGame.Sfx.nameMusicPlaying = -1;
                    MainGame.Sfx.musics = [];
                    MainGame.Sfx.musics["main"] = game.sound.add("music-main");
                    MainGame.Sfx.musics["main"].volume = .85
                }
                break
            }
            case "on": {
                MainGame.Sfx.status[type] = true;
                break
            }
            case "off": {
                MainGame.Sfx.status[type] = false;
                break
            }
            case "switch": {
                MainGame.Sfx.status[type] = !MainGame.Sfx.status[type];
                break
            }
            default: {}
        }
        MainGame.Sfx.update(type, button, label);
        if (MainGame.Sfx.sounds) {
            var statusSound = !MainGame.Sfx.status["sound"];
            for (var id in MainGame.Sfx.sounds) {
                MainGame.Sfx.sounds[id].setMute(statusSound)
            }
        }
        if (MainGame.Sfx.musics) {
            var statuMusic = !MainGame.Sfx.status["music"];
            if (MainGame.Sfx.musics["main"]) MainGame.Sfx.musics["main"].setMute(statuMusic)
        }
        if (MainGame.Sfx.status) {
            MainGame.Storage.set(MainGame.title + "-" + type, MainGame.Sfx.status[type])
        }
    },
    play: function(type, audio) {
        if (MainGame.isAudioDisable) return;
        if (MainGame.isDebug) {}
        if (type == "music") {
            if (MainGame.Sfx.nameMusicPlaying == audio) return;
            if (MainGame.Sfx.musics) {
                if (MainGame.Sfx.musics[MainGame.Sfx.nameMusicPlaying]) MainGame.Sfx.musics[MainGame.Sfx.nameMusicPlaying].stop();
                if (MainGame.Sfx.musics && MainGame.Sfx.musics[audio]) {
                    MainGame.Sfx.musics[audio].play({
                        loop: true
                    });
                    MainGame.Sfx.nameMusicPlaying = audio
                }
            }
        } else {
            if (MainGame.Sfx.sounds && MainGame.Sfx.sounds[audio]) {
                MainGame.Sfx.sounds[audio].play()
            }
        }
    },
    update: function(type, button, label) {
        if (MainGame.isAudioDisable) return;
        if (MainGame.Sfx.status == undefined) return;
        if (button) {
            if (MainGame.Sfx.status[type]) {
                button.setFrame("btn_" + type + "_0000")
            } else {
                button.setFrame("btn_" + type + "_0001")
            }
        }
        if (label) {
            if (MainGame.Sfx.status[type]) {
                label.setText(MainGame.GAME_TEXT[type + "_on"].toUpperCase())
            } else {
                label.setText(MainGame.GAME_TEXT[type + "_off"].toUpperCase())
            }
        }
    }
};
MainGame.fadeOutIn = function(passedCallback, context) {
    context.cameras.main.fadeOut(200);
    context.time.addEvent({
        delay: 200,
        callback: function() {
            context.cameras.main.fadeIn(200);
            passedCallback(context)
        },
        callbackScope: context
    })
};
MainGame.fadeOutScene = function(sceneName, context) {
    context.cameras.main.fadeOut(200);
    context.time.addEvent({
        delay: 200,
        callback: function() {
            context.scene.start(sceneName)
        },
        callbackScope: context
    })
};
MainGame.Storage = {
    availability: function() {
        try {
            var ls = window.localStorage
        } catch (e) {
            return
        }
        if (!!(typeof window.localStorage === "undefined")) {
            console.log("localStorage not available");
            return null
        }
    },
    get: function(key) {
        try {
            var ls = window.localStorage
        } catch (e) {
            return
        }
        this.availability();
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (e) {
            return window.localStorage.getItem(key)
        }
    },
    set: function(key, value) {
        try {
            var ls = window.localStorage
        } catch (e) {
            return
        }
        this.availability();
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            console.log("localStorage quota exceeded")
        }
    },
    initUnset: function(key, value) {
        if (this.get(key) === null) {
            this.set(key, value)
        }
    },
    getFloat: function(key) {
        return parseFloat(this.get(key))
    },
    setHighscore: function(key, value) {
        if (value > this.getFloat(key)) {
            this.set(key, value)
        }
    },
    remove: function(key) {
        this.availability();
        window.localStorage.removeItem(key)
    },
    clear: function() {
        this.availability()
    }
};
class Boot extends Phaser.Scene {
    constructor() {
        super("Boot");
        this.wasIncorrectOrientation = false
    }
    preload() {
        this.load.plugin("PokiApiPlugin", PokiApiPlugin, true);
        this.load.image("preloader_bar", "assets/preloader_bar.png?r=2");
        this.load.image("preloader_back", "assets/preloader_back.png?r=2");
        this.load.image("bg_loading", "assets/background/bg_loading.png");
        this.load.bitmapFont("Panton40", "assets/fonts/Panton40.png", "assets/fonts/Panton40.fnt")
    }
    create() {
        MainGame.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };
        MainGame.initSettings();
        this.scaleForMobile();
        MainGame.continuePreloader()
    }
    scaleForMobile() {
        this.wasIncorrectOrientation = true;
        window.addEventListener("resize", this.onWindowResize.bind(this));
        this.onWindowResize()
    }
    onWindowResize() {
        if (game.device.os.desktop) {} else {
            if (window.innerWidth > window.innerHeight) {
                this.checkOriention("landscape")
            } else {
                this.checkOriention("portrait")
            }
        }
        if (MainGame.state && MainGame.state.updateResize) MainGame.state.updateResize();
        this.handleScroll()
    }
    checkOriention(orientation) {
        if (orientation === MainGame.Config.ORIENTATION) {
            this.leaveIncorrectOrientation()
        } else {
            this.enterIncorrectOrientation()
        }
    }
    enterIncorrectOrientation() {
        document.getElementById("orientation").style.display = "block"
    }
    leaveIncorrectOrientation() {
        document.getElementById("orientation").style.display = "none"
    }
    isLandscape() {
        return window.innerWidth > window.innerHeight
    }
    isPortrait() {
        return window.innerHeight > window.innerWidth
    }
    handleScroll() {
        if (typeof this.scrollTimeout !== "undefined") {
            clearTimeout(this.scrollTimeout)
        }
        this.scrollTimeout = setTimeout(() => {
            window.scrollTo(0, -window.innerHeight);
            if (MainGame.state && MainGame.state.updateResize) MainGame.state.updateResize()
        }, 500)
    }
}
class Preloader extends Phaser.Scene {
    constructor() {
        super("Preloader")
    }
    preload() {
        MainGame.state = this;
        this.initResize();
        this.midX = this.GAME_WIDTH / 2;
        this.midY = this.GAME_HEIGHT / 2;
        const midX = MainGame.Config.DEFAULT_WIDTH * .5;
        var back = this.add.sprite(midX, 0, "bg_loading");
        back.setOrigin(.5, 0);
        this.back = back;
        this.preloader_back = this.add.image(midX, 580, "preloader_back");
        this.preloader_bar = this.add.image(midX, 580, "preloader_bar");
        this.preloader_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.preloader_bar.height);
        this.preloader_bar.setCrop(this.preloader_crop);
        this.load.on(Phaser.Loader.Events.START, this.onLoadStart, this);
        this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
        this.load.once(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
        var background_url = "bg_main.png";
        var resources = {
            image: [
                ["bg_game", "assets/background/" + background_url]
            ],
            atlas: [
                ["ss_main", "assets/spritesheets/ss_main.png?r=1", "assets/spritesheets/ss_main.json?r=" + MyMath.getRandomInt(0, 99)],
                ["ss_ui", "assets/spritesheets/ss_ui.png?r=1", "assets/spritesheets/ss_ui.json?r=" + MyMath.getRandomInt(0, 99)]
            ],
            spine: [
                ["skeleton", "assets/spine/skeleton.json", "assets/spine/skeleton.atlas"]
            ],
            audio: [
                ["music-main", ["assets/audio/music/game.mp3"]],
                ["after_exposion2", ["assets/audio/sfx/after_exposion2.mp3"]],
                ["boost3", ["assets/audio/sfx/boost3.mp3"]],
                ["buy", ["assets/audio/sfx/buy.mp3"]],
                ["click4", ["assets/audio/sfx/click4.mp3"]],
                ["dead1", ["assets/audio/sfx/dead.mp3"]],
                ["dead2", ["assets/audio/sfx/dead2.mp3"]],
                ["dead3", ["assets/audio/sfx/dead3.mp3"]],
                ["dead4", ["assets/audio/sfx/dead4.mp3"]],
                ["dead5", ["assets/audio/sfx/dead5.mp3"]],
                ["dead6", ["assets/audio/sfx/dead6.mp3"]],
                ["dead7", ["assets/audio/sfx/dead7.mp3"]],
                ["dead8", ["assets/audio/sfx/dead8.mp3"]],
                ["dead9", ["assets/audio/sfx/dead9.mp3"]],
                ["dead10", ["assets/audio/sfx/dead10.mp3"]],
                ["dead11", ["assets/audio/sfx/dead11.mp3"]],
                ["dead12", ["assets/audio/sfx/dead12.mp3"]],
                ["exposion1", ["assets/audio/sfx/exposion1.mp3"]],
                ["exposion2", ["assets/audio/sfx/exposion2.mp3"]],
                ["exposion3", ["assets/audio/sfx/exposion3.mp3"]],
                ["exposion4", ["assets/audio/sfx/exposion4.mp3"]],
                ["fortune4", ["assets/audio/sfx/fortune4.mp3"]],
                ["heal", ["assets/audio/sfx/heal.mp3"]],
                ["knock1", ["assets/audio/sfx/knock.mp3"]],
                ["knock2", ["assets/audio/sfx/knock2.mp3"]],
                ["knock3", ["assets/audio/sfx/knock3.mp3"]],
                ["knock4", ["assets/audio/sfx/knock4.mp3"]],
                ["knock5", ["assets/audio/sfx/knock5.mp3"]],
                ["knock6", ["assets/audio/sfx/knock6.mp3"]],
                ["knock7", ["assets/audio/sfx/knock7.mp3"]],
                ["knock8", ["assets/audio/sfx/knock8.mp3"]],
                ["knock9", ["assets/audio/sfx/knock9.mp3"]],
                ["lvl_up2", ["assets/audio/sfx/lvl_up2.mp3"]],
                ["merge_car3", ["assets/audio/sfx/merge_car3.mp3"]],
                ["merge_unlocked2", ["assets/audio/sfx/merge_unlocked2.mp3"]],
                ["offline_earning3", ["assets/audio/sfx/offline_earning3.mp3"]],
                ["open_box2", ["assets/audio/sfx/open_box2.mp3"]],
                ["remove_car3", ["assets/audio/sfx/remove_car3.mp3"]],
                ["shoot_auto1", ["assets/audio/sfx/shoot_auto.mp3"]],
                ["shoot_auto2", ["assets/audio/sfx/shoot_auto2.mp3"]],
                ["shoot_auto3", ["assets/audio/sfx/shoot_auto3.mp3"]],
                ["shoot_auto4", ["assets/audio/sfx/shoot_auto4.mp3"]],
                ["shoot_blaster1", ["assets/audio/sfx/shoot_blaster.mp3"]],
                ["shoot_blaster2", ["assets/audio/sfx/shoot_blaster2.mp3"]],
                ["shoot_blaster3", ["assets/audio/sfx/shoot_blaster3.mp3"]],
                ["shoot_blaster4", ["assets/audio/sfx/shoot_blaster4.mp3"]],
                ["shoot_machine1", ["assets/audio/sfx/shoot_machine.mp3"]],
                ["shoot_machine2", ["assets/audio/sfx/shoot_machine2.mp3"]],
                ["shoot_machine3", ["assets/audio/sfx/shoot_machine3.mp3"]],
                ["shoot_machine4", ["assets/audio/sfx/shoot_machine4.mp3"]],
                ["shoot_pistol1", ["assets/audio/sfx/shoot_pistol.mp3"]],
                ["shoot_pistol2", ["assets/audio/sfx/shoot_pistol2.mp3"]],
                ["shoot_pistol3", ["assets/audio/sfx/shoot_pistol3.mp3"]],
                ["shoot_pistol4", ["assets/audio/sfx/shoot_pistol4.mp3"]],
                ["shoot_rifle1", ["assets/audio/sfx/shoot_rifle.mp3"]],
                ["shoot_rifle2", ["assets/audio/sfx/shoot_rifle2.mp3"]],
                ["shoot_rifle3", ["assets/audio/sfx/shoot_rifle3.mp3"]],
                ["shoot_rifle4", ["assets/audio/sfx/shoot_rifle4.mp3"]],
                ["shoot_shotgun1", ["assets/audio/sfx/shoot_shotgun.mp3"]],
                ["shoot_shotgun2", ["assets/audio/sfx/shoot_shotgun2.mp3"]],
                ["shoot_shotgun3", ["assets/audio/sfx/shoot_shotgun3.mp3"]],
                ["shoot_shotgun4", ["assets/audio/sfx/shoot_shotgun4.mp3"]],
                ["show_box", ["assets/audio/sfx/show_box.mp3"]],
                ["skill_grenade", ["assets/audio/sfx/skill_grenade.mp3"]],
                ["skill_poison", ["assets/audio/sfx/skill_poison.mp3"]],
                ["skill_rocket3", ["assets/audio/sfx/skill_rocket3.mp3"]],
                ["k_aaa1", ["assets/audio/sfx/k_aaa1.mp3"]],
                ["k_aaa2", ["assets/audio/sfx/k_aaa2.mp3"]],
                ["wave_defeat", ["assets/audio/sfx/wave_defeat.mp3"]],
                ["wave_finish", ["assets/audio/sfx/wave_finish.mp3"]],
                ["wave_start3", ["assets/audio/sfx/wave_start3.mp3"]]
            ],
            json: [
                ["alltext", "assets/text/text.json?r=" + MyMath.getRandomInt(0, 99)]
            ]
        };
        for (var method in resources) {
            resources[method].forEach((function(args) {
                var loader = this.load[method];
                loader && loader.apply(this.load, args)
            }), this)
        }
        this.updateResize()
    }
    onLoadProgress() {
        this.updateLogoCrop(this.load.progress)
    }
    updateLogoCrop(loadProgress) {
        var originalWidth = this.preloader_bar.width;
        var width = originalWidth * loadProgress;
        this.tweens.killTweensOf(this.preloader_crop);
        if (loadProgress == 1) {
            this.preloader_bar.isCropped = false
        } else {
            this.tweens.add({
                targets: this.preloader_crop,
                width: width,
                ease: Phaser.Math.Easing.Linear,
                duration: 200,
                onUpdate: () => {
                    this.preloader_bar.setCrop(this.preloader_crop)
                }
            })
        }
        if (MainGame.isAPI) MainGame.API_POKI.gameLoadingProgress(loadProgress)
    }
    onLoadStart() {
        if (MainGame.isAPI) MainGame.API_POKI.gameLoadingStart()
    }
    onLoadComplete() {
        this.tweens.killTweensOf(this.preloader_crop);
        this.load.off(Phaser.Loader.Events.PROGRESS, this.onLoadProgress);
        this.preloader_bar.isCropped = false;
        if (MainGame.isAPI) MainGame.API_POKI.gameLoadingFinished()
    }
    initResize() {
        this.GAME_WIDTH = MainGame.Config.DEFAULT_WIDTH;
        this.GAME_HEIGHT = MainGame.Config.DEFAULT_HEIGHT;
        var gameSize = this.scale.gameSize;
        var width = gameSize.width;
        var height = gameSize.height;
        if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            height = window.innerHeight
        }
        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        this.scale.on("resize", this.updateResize, this)
    }
    updateResize() {
        var gameSize = this.scale.gameSize;
        var width = gameSize.width;
        var height = gameSize.height;
        if (MainGame.isDesktop && window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            height = window.innerHeight
        }
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        this.updateCamera()
    }
    updateCamera() {
        const camera = this.cameras.main;
        var deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
        var deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
        var sdvigY = 0;
        if (MainGame.isDesktop && window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            deltaY = Math.ceil(window.innerHeight - this.sizer.height) * .5;
            sdvigY = this.scale.gameSize.height - window.innerHeight
        }
        const scaleX = this.sizer.width / this.GAME_WIDTH;
        const scaleY = this.sizer.height / this.GAME_HEIGHT;
        const zoom = Math.max(scaleX, scaleY);
        const offsetX = deltaX / zoom;
        const offsetY = deltaY / zoom;
        camera.setZoom(zoom);
        if (MainGame.isDesktop) {
            camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + offsetY + sdvigY)
        } else {
            camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
            this.preloader_back.y = 590 - offsetY;
            this.preloader_bar.y = 590 - offsetY
        }
    }
    create() {
        MainGame.TEXT_FILE = this.cache.json.get("alltext");
        MainGame.Sfx.manage("music", "init", this);
        MainGame.Sfx.manage("sound", "init", this);
        this.scale.off("resize", this.updateResize, this);
        MainGame.fadeOutScene("Game", this)
    }
}
class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }
    create() {
        this.SPRITE_SHEET = "ss_ui";
        MainGame.isFromTutorial = false;
        MainGame.state = this;
        MainGame.stateName = "Game";
        MainGame.GAME_TEXT = MainGame.TEXT_FILE[MainGame.languages[MainGame.language]];
        this.initResize();
        this.midX = this.GAME_WIDTH / 2;
        this.midY = this.GAME_HEIGHT / 2;
        var back = this.add.image(this.midX, 0, "bg_game");
        back.setOrigin(.5, 0);
        if (MainGame.firstGo) {
            this.input.once("pointerdown", this.playOnce, this)
        } else {
            MainGame.Sfx.play("music", "main")
        }
        this.initSettingsGame();
        this.layerWall = this.add.container();
        this.layerTowers = this.add.container();
        this.layerHpBars = this.add.container();
        this.layerSpine = this.add.group();
        this.layerEffects = this.add.container();
        this.layerDmgText = this.add.container();
        this.initEffects();
        this.initSkills();
        this.initWall();
        this.initFog();
        this.initPoolEffects();
        this.initPoolEnemies();
        this.layerWall.setDepth(this.DEPTH_layerWall);
        this.layerHpBars.setDepth(this.DEPTH_layerHpBars);
        this.layerTowers.setDepth(this.DEPTH_layerTowers);
        this.layerSpine.setDepth(this.DEPTH_layerSpine);
        this.layerEffects.setDepth(this.DEPTH_layerEffects);
        this.layerDmgText.setDepth(this.DEPTH_layerDmgText);
        game.scene.start("GameGui");
        this.gameGUI = this.scene.get("GameGui");
        this.icon_trash = this.gameGUI.icon_trash;
        this.initEffectMerge();
        this.initAutoMerge();
        this.initArmHelp();
        this.initParkings();
        this.updateParking();
        this.initInputEvents();
        var obj = null;
        for (var i = 0; i < this.MAX_PARKING; i++) {
            obj = this.box_have[i];
            if (obj && obj.t > 0) {
                this.addObject({
                    lvl: obj.t,
                    parkingId: obj.id
                })
            }
        }
        this.onStartGame();
        this.updateValuesFromLoad();
        this.cameras.main.fadeIn(200);
        this.updateResize();
        this.gameStarted = true;
        this.offerFreeUpgrade = 3;
        if (this.nextCarLevel >= 5) this.gameGUI.showBanner();
        if (MainGame.isDebug && this.num_wave == 1) {
            MainGame.state.addBoxToBuffer(1)
        }
        try {
            var size = game.renderer.getMaxTextureSize();
            MainGame.api_analytics("MaxTextureSize", size)
        } catch (e) {}
        this.resultWaves = []
    }
    startLevel() {
        if (!this.isGoTutorial) this.initWave()
    }
    restartGame() {
        MainGame.clearSaves();
        MainGame.isNoSave = false;
        this.scale.off("resize", this.updateResize, this);
        this.gameGUI.scene.stop();
        this.gameGUI = null;
        this.scene.restart()
    }
    initResize() {
        this.GAME_WIDTH = MainGame.Config.DEFAULT_WIDTH;
        this.GAME_HEIGHT = MainGame.Config.DEFAULT_HEIGHT;
        var gameSize = this.scale.gameSize;
        var width = gameSize.width;
        var height = gameSize.height;
        if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            height = window.innerHeight
        }
        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        this.scale.on("resize", this.updateResize, this)
    }
    updateResize() {
        var gameSize = this.scale.gameSize;
        var width = gameSize.width;
        var height = gameSize.height;
        if (MainGame.isDesktop && window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            height = window.innerHeight
        }
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        this.updateCamera()
    }
    updateCamera() {
        const camera = this.cameras.main;
        var deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
        var deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
        var sdvigY = 0;
        if (MainGame.isDesktop && window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            deltaY = Math.ceil(window.innerHeight - this.sizer.height) * .5;
            sdvigY = this.scale.gameSize.height - window.innerHeight
        }
        const scaleX = this.sizer.width / this.GAME_WIDTH;
        const scaleY = this.sizer.height / this.GAME_HEIGHT;
        const zoom = Math.max(scaleX, scaleY);
        const offsetY = deltaY / zoom;
        const offsetX = deltaX / zoom;
        camera.setZoom(zoom);
        if (MainGame.isDesktop) {
            camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + offsetY + sdvigY)
        } else {
            camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2)
        }
        if (this.gameGUI) this.gameGUI.updateCamera(offsetX, offsetY)
    }
    setGameLogicPause(vBool) {
        if (vBool) {
            this.scene.pause()
        } else {
            this.scene.resume()
        }
    }
    updateCoinsText() {
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm)
    }
    onStartGame() {
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
        var earning_sec = this.getCoinsPerSec();
        if (MainGame.lastSession && earning_sec > 0) {
            var currentSession = new Date;
            var dif = currentSession.getTime() - MainGame.lastSession;
            var secondsFromLastSession = Math.abs(dif / 1e3);
            var countAddFree = Math.floor(secondsFromLastSession / this.TIME_NEXT_FREE);
            var secondsDiff = Math.floor(secondsFromLastSession) % this.TIME_NEXT_FREE;
            if (countAddFree > 0) {
                this.freeTimeWheel += countAddFree;
                if (this.freeTimeWheel > MainGame.maxTimeWheel) {
                    this.freeTimeWheel = MainGame.maxTimeWheel
                }
            }
            if (this.freeTimeWheel < MainGame.maxTimeWheel) {
                if (MainGame.cdNextFree) {
                    if (MainGame.cdNextFree < 0) MainGame.cdNextFree = 0;
                    this.countDownNextFree = MainGame.cdNextFree - secondsDiff;
                    if (this.countDownNextFree < 0) {
                        this.freeTimeWheel += 1;
                        if (this.freeTimeWheel > MainGame.maxTimeWheel) {
                            this.freeTimeWheel = MainGame.maxTimeWheel
                        }
                        this.countDownNextFree = this.TIME_NEXT_FREE - Math.abs(this.countDownNextFree)
                    }
                } else {
                    this.countDownNextFree = this.TIME_NEXT_FREE
                }
            }
            if (secondsFromLastSession > this.MAX_OFFLINE_EARNING_SEC) {
                secondsFromLastSession = this.MAX_OFFLINE_EARNING_SEC
            }
            var add_money = Math.round(earning_sec * secondsFromLastSession * this.OFFLINE_EARNING);
            this.value_offline_earning = add_money;
            if (MainGame.isDebug) {
                console.log("skip showing offline earning", add_money);
                this.startLevel()
            } else {
                this.gameGUI.showOfflineEarningWindow(add_money);
                this.amount_coins += add_money
            }
        } else {
            MainGame.isApiGameplayStop = true;
            if (this.currentLevel == 1 && this.exp == 0) {
                this.freeTimeWheel = MainGame.maxTimeWheel;
                MainGame.freeTimeWheel = this.freeTimeWheel;
                if (MainGame.isDebug) {
                    this.startLevel()
                } else {
                    this.initTutorial()
                }
            }
        }
        this.updateSkillsButton()
    }
    updateValuesFromLoad() {
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm);
        this.gameGUI.updateLevel(this.exp / this.exp_max);
        this.gameGUI.updateShop(text_coins_warm);
        this.gameGUI.enableIndcatorBoostAutoMerge(false);
        this.gameGUI.enableIndcatorBoostSpeed(false);
        this.gameGUI.enableIndcatorBoostCoins(false);
        if (this.currentLevel < 4) {
            this.gameGUI.iconAdvFortune.visible = false;
            this.gameGUI.buttonFortuna.visible = false
        } else {
            if (this.freeTimeWheel > 0) {
                this.gameGUI.iconAdvFortune.visible = true;
                this.gameGUI.buttonFortuna.visible = true
            }
        }
        this.initHelicopterBonuses();
        this.updatePrivilegiesFactors();
        this.updateCarPrices();
        this.gameGUI.updateFastBuy();
        this.gameGUI.updateWallBuy();
        this.gameGUI.updateForge(1);
        if (MainGame.cdBonusMerge && MainGame.cdBonusMerge > 0) {
            this.activateBoostAutoMerge(MainGame.cdBonusMerge, true)
        }
        if (MainGame.cdBonusCoins && MainGame.cdBonusCoins > 0) {
            this.activateBoostCoins(MainGame.cdBonusCoins, true)
        }
        if (MainGame.cdBonusSpeed && MainGame.cdBonusSpeed > 0) {
            this.activateBoostSpeed(MainGame.cdBonusSpeed, true)
        }
        this.updateWallValues();
        this.gameGUI.updateSkillCd1(0);
        this.gameGUI.updateSkillCd2(0);
        this.gameGUI.updateSkillCd3(0)
    }
    updateTowersDamages() {
        var parking = null;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            parking = this.arParking[i];
            if (parking.busy) parking.item.updateTypeBullet()
        }
    }
    updatePrivilegiesFactors() {
        var itemInfo;
        var num;
        var lvlCannonDmg = this.levelCannonDmg;
        if (lvlCannonDmg > 1) {
            itemInfo = this.arLevelCannonDmg[lvlCannonDmg - 2];
            num = 1 + itemInfo.value * .01;
            this.factorCannonDmg = Math.round((num + Number.EPSILON) * 100) / 100
        }
        var lvlDiscount = this.levelDiscount;
        if (lvlDiscount > 1) {
            itemInfo = this.arLevelDiscount[lvlDiscount - 2];
            num = 1 - itemInfo.value * .01;
            this.factorDiscount = Math.round((num + Number.EPSILON) * 100) / 100
        }
        var lvlEarning = this.levelEarning;
        if (lvlEarning > 1) {
            itemInfo = this.arLevelEarning[lvlEarning - 2];
            num = 1 + itemInfo.value * .01;
            this.factorEarning = Math.round((num + Number.EPSILON) * 100) / 100
        }
        this.updateTowersDamages();
        this.updatePrivilegiesItems();
        this.gameGUI.updateFastBuy();
        this.gameGUI.updateWallBuy();
        this.checkWallUpgrade()
    }
    initTutorial() {
        this.isGoTutorial = true;
        this.tutorialStep = 0;
        this.gameGUI.initTutorial()
    }
    finishTutorial() {
        this.initWave()
    }
    showHighlight() {
        var parking = null;
        var typeSelected = this.selectedCar.type;
        var idSelected = this.selectedCar.id;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            parking = this.arParking[i];
            if (parking.id != idSelected) {
                if (typeSelected == parking.type && parking.type < this.MAX_TYPES_CAR) {
                    parking.highlighter.visible = true
                }
            }
        }
    }
    hideHighlight() {
        var parking = null;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            parking = this.arParking[i];
            parking.highlighter.visible = false
        }
    }
    getInputPosition(pointer) {
        const deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
        const deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
        const scaleX = this.sizer.width / this.GAME_WIDTH;
        const scaleY = this.sizer.height / this.GAME_HEIGHT;
        const zoom = Math.max(scaleX, scaleY);
        const offset = deltaY / zoom;
        var pX = (pointer.x - deltaX) / zoom;
        var pY = (pointer.y - deltaY) / zoom + offset;
        return {
            x: pX,
            y: pY
        }
    }
    initInputEvents() {
        var cursor_car = new Tower(this, null, 200, 200, 1);
        this.cursor_link = cursor_car;
        this.cursor_car = cursor_car.view;
        this.cursor_car.depth = this.DEPTH_cursorSpine;
        this.cursor_car.visible = false;
        this.input.on("pointerdown", this.onInputDown, this);
        this.input.on("pointerup", this.onInputUp, this);
        this.input.on("pointerupoutside", this.onInputUp, this);
        this.input.on("pointermove", this.onInputMove, this);
        this.input.keyboard.on("keydown", this.handleKey, this)
    }
    handleKey(e) {
        switch (e.code) {
            case "Digit1":
            case "Numpad1":
                this.selectSkill(1, false);
                break;
            case "Digit2":
            case "Numpad2":
                this.selectSkill(2, false);
                break;
            case "Digit3":
            case "Numpad3":
                this.selectSkill(3, false);
                break;
            case "Escape":
                this.cancelSkill();
                break
        }
    }
    initAutoMerge() {
        var auto_car = new Tower(this, null, 200, 200, 1);
        this.auto_link = auto_car;
        this.auto_car = auto_car.view;
        this.auto_car.depth = this.DEPTH_cursorSpine;
        this.auto_car.visible = false;
        this.timerCheckAutoMerge = 0
    }
    checkAutoMerge(vIsBattleField) {
        var action = false;
        var pairIds = this.getMaxParkingPair(true, vIsBattleField);
        if (pairIds) {
            this.goAutoMerge(pairIds[1], pairIds[0]);
            action = true
        } else {}
        return action
    }
    goAutoMerge(vId1, vId2) {
        var parking1 = this.arParking[vId1];
        var parking2 = this.arParking[vId2];
        parking1.allow = false;
        parking2.allow = false;
        parking1.item.setViewAlpha(.5);
        parking2.item.setViewAlpha(.5);
        this.actionMerge(parking1, parking2, true);
        this.time.delayedCall(500, this.onFinishAutoMerge, [vId1, vId2], this)
    }
    onFinishAutoMerge(vId1, vId2) {
        var parking1 = this.arParking[vId1];
        var parking2 = this.arParking[vId2];
        parking1.allow = true;
        parking2.allow = true
    }
    checkInputs() {
        if (this.isDrag) this.onInputUp(this.posInput)
    }
    onInputDown(pointer) {
        if (!this.gameGUI.buttonEnabled) return;
        if (this.isGoTutorial && this.tutorialStep < 3) return;
        this.hideArmHelp();
        this.posInput.x = pointer.x;
        this.posInput.y = pointer.y;
        var pos = this.getInputPosition(pointer);
        this.updateSkillAim(pos);
        this.checkUseSkills(pos, true);
        var parking = null;
        var dist = 0;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            parking = this.arParking[i];
            dist = MyMath.distanceTwoPoints(pos.x, parking.x, pos.y, parking.y - 20);
            if (this.isGoTutorial && this.tutorialStep == 3 && parking.id == 5) {
                continue
            }
            if (dist < this.DISTANCE_DRAG && parking.busy && parking.allow) {
                this.isDownOnParking = true;
                this.selectedCar = {
                    id: parking.id,
                    obj: parking.obj,
                    type: parking.type
                };
                parking.item.resetDodik();
                if (parking.obj == 1 && parking.item.count_box_tween > 0) {
                    this.openBox(parking, true)
                }
                break
            }
        }
    }
    onInputUp(pointer) {
        if (!this.gameGUI.buttonEnabled) return;
        this.hideArmHelp();
        var action_detected = false;
        var pos = this.getInputPosition(pointer);
        this.checkUseSkills(pos, false);
        var parking = null;
        var dist = 0;
        if (this.isDrag) {
            this.cursor_car.visible = false;
            var isPlacedToParking = false;
            var isPlacedToTrack = false;
            var isTrashTime = false;
            for (var i = 0; i < this.LIMIT_parking; i++) {
                parking = this.arParking[i];
                dist = MyMath.distanceTwoPoints(pos.x, parking.x, pos.y, parking.y - 20);
                if (dist < this.DISTANCE_DRAG && parking.allow) {
                    if (parking.busy && this.selectedCar.id != parking.id) {
                        if (this.selectedCar.type == parking.type && parking.type < this.MAX_TYPES_CAR) {
                            this.openBox(parking, false);
                            this.actionMerge(parking, this.arParking[this.selectedCar.id]);
                            action_detected = true;
                            if (this.isGoTutorial && this.tutorialStep == 3) {
                                this.gameGUI.tutorialScenario()
                            }
                        } else {
                            this.openBox(parking, false);
                            this.actionSwap(parking, this.arParking[this.selectedCar.id], pos.x, pos.y);
                            action_detected = true
                        }
                        isPlacedToParking = true
                    } else {
                        var isAllowChange = true;
                        if (this.isGoTutorial) {
                            if (this.tutorialStep == 3) {
                                isAllowChange = false
                            }
                            if (this.tutorialStep == 4 && parking.id != 1) {
                                isAllowChange = false
                            }
                        }
                        if (isAllowChange && this.selectedCar.id != null) {
                            this.actionChangeParking(parking, this.arParking[this.selectedCar.id]);
                            isPlacedToParking = true;
                            action_detected = true;
                            if (this.isGoTutorial && this.tutorialStep == 4) {
                                this.gameGUI.tutorialScenario()
                            }
                        }
                    }
                }
                if (action_detected) break
            }
            if (!isPlacedToParking) {
                dist = MyMath.distanceTwoPoints(pos.x, this.icon_trash.x, pos.y, this.icon_trash.y);
                if (dist < 2e3 && !this.isGoTutorial) {
                    isTrashTime = true;
                    this.actionTrash(this.arParking[this.selectedCar.id]);
                    this.showEffect(this.icon_trash.x - 3, this.icon_trash.y, "delete_dust");
                    action_detected = true
                }
                var oldParking = this.arParking[this.selectedCar.id];
                if (!isTrashTime && !isPlacedToTrack) {
                    oldParking.busy = true;
                    oldParking.obj = this.selectedCar.obj;
                    oldParking.type = this.selectedCar.type;
                    oldParking.allow = true;
                    if (oldParking.racing) {
                        this.cursor_car.visible = false;
                        this.linkToOldParking = null
                    } else {
                        this.cursor_car.visible = true;
                        this.linkToOldParking = oldParking;
                        var pos = oldParking.item.getViewPosition();
                        this.tweens.add({
                            targets: this.cursor_car,
                            x: pos.x,
                            y: pos.y,
                            ease: Phaser.Math.Easing.Cubic.Out,
                            duration: 100,
                            onComplete: this.finishCursorTween
                        })
                    }
                }
            }
            this.isDrag = false;
            this.hideHighlight()
        }
        this.selectedCar = null;
        this.isDownOnParking = false;
        this.gameGUI.delete_flash.visible = false;
        if (action_detected) {
            this.updateBoxHave();
            this.setRageEffect(this.isDoubleSpeed)
        }
    }
    onInputMove(pointer) {
        if (!this.gameGUI.buttonEnabled) return;
        var pos = this.getInputPosition(pointer);
        this.updateSkillAim(pos);
        if (this.isDownOnParking) {
            this.isDrag = true;
            var parking = this.arParking[this.selectedCar.id];
            if (parking.obj == 1 && pointer.distance > 3) {
                this.cursor_link.setSkinTower(parking.type);
                this.cursor_car.visible = true;
                if (!this.isGoTutorial) {
                    this.gameGUI.delete_flash.visible = true
                }
                parking.item.setViewAlpha(.5);
                parking.busy = false;
                parking.allow = false;
                this.isDownOnParking = false;
                this.showHighlight();
                parking.item.resetDodik()
            }
        }
    }
    finishCursorTween() {
        MainGame.state.cursor_car.visible = false;
        if (MainGame.state.linkToOldParking && MainGame.state.linkToOldParking.item) MainGame.state.linkToOldParking.item.setViewAlpha(1);
        MainGame.state.linkToOldParking = null
    }
    showAnimationMerge(vObj, vType, vIsAuto, vIsFreeUpgrade) {
        var oldType = vType - 1;
        var posX = vObj.view.x;
        var posY = vObj.view.y;
        var obj_anim = this.cursor_car;
        var obj_link = this.cursor_link;
        if (vIsAuto) {
            obj_anim = this.auto_car;
            obj_link = this.auto_link
        }
        obj_anim.visible = true;
        vObj.setSkinTower(oldType);
        obj_link.setSkinTower(oldType);
        obj_anim.x = posX;
        obj_anim.y = posY;
        vObj.view.x = posX;
        vObj.view.y = posY;
        this.tweens.add({
            targets: obj_anim,
            x: posX + 50,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: 100,
            yoyo: true
        });
        this.tweens.add({
            targets: vObj.view,
            x: posX - 50,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: 100,
            yoyo: true
        });
        if (vIsFreeUpgrade) {
            this.infoMerge = {
                vObj: vObj,
                vType: vType,
                vIsAuto: vIsAuto
            }
        } else {
            this.time.delayedCall(200, this.onMergePart, [vObj, vType, vIsAuto], this)
        }
        this.showEffect(vObj.view.x, vObj.view.y - 20, "effect_connect")
    }
    cancelUpgrade() {
        if (this.infoMerge) this.onMergePart(this.infoMerge.vObj, this.infoMerge.vType, this.infoMerge.vIsAuto);
        this.infoMerge = null
    }
    onMergePart(vObj, vType, vIsAuto) {
        var obj_anim = this.cursor_car;
        if (vIsAuto) {
            obj_anim = this.auto_car
        }
        obj_anim.visible = false;
        vObj.setSkinTower(vType);
        if (this.isDrag) return;
        vObj.view.setScale(this.getScaleCar(1));
        this.tweens.add({
            targets: vObj.view,
            scale: this.getScaleCar(1.2),
            ease: Phaser.Math.Easing.Linear,
            duration: 100,
            yoyo: true
        })
    }
    actionMerge(toParking, fromParking, vIsAuto) {
        if (toParking.obj == 0 || fromParking.obj == 0) return;
        var currentType = toParking.type;
        var nextType = currentType + 1;
        var exp = this.getExpMerge(currentType);
        var isUnlockedNew = false;
        var isFreeUpgrade = false;
        this.increaseLevel(exp, this.nextCarLevel == nextType);
        if (this.nextCarLevel == nextType) {
            if (MainGame.isAPI) MainGame.API_POKI.happyTime(.5);
            MainGame.api_analytics("MaxLevelCar", this.nextCarLevel);
            if (!MainGame.isDebug) {
                this.showMergeEffect(toParking.item.view.x, toParking.item.view.y);
                this.gameGUI.showMergeAnimation(this.nextCarLevel)
            }
            this.nextCarLevel++;
            this.gameGUI.updateFastBuy();
            if (this.nextCarLevel == 6) {
                this.timer_carAds = this.TIME_ADD_ADS_CAR;
                this.num_ads_car = 0
            }
            this.updateAdsCar();
            isUnlockedNew = true
        } else {
            if (MainGame.debug_isFreeUpgrade) {
                this.parking_upgrade_id = toParking.id;
                this.parking_upgrade_type = nextType + 2;
                this.gameGUI.showUpgradeWindow(nextType);
                this.offerFreeUpgrade = 0;
                isFreeUpgrade = true
            } else {
                if (nextType < this.nextCarLevel - this.MIN_LVL_UPGRADE && !vIsAuto) {
                    this.offerFreeUpgrade++;
                    if (this.offerFreeUpgrade >= this.ALLOW_UPGRADE && !this.isAutoMerge) {
                        this.parking_upgrade_id = toParking.id;
                        this.parking_upgrade_type = nextType + 2;
                        this.gameGUI.showUpgradeWindow(nextType);
                        this.offerFreeUpgrade = 0;
                        isFreeUpgrade = true
                    }
                }
            }
        }
        if (toParking.obj == 1) toParking.item.setSkinTower(nextType);
        toParking.type = nextType;
        toParking.allow = false;
        if (fromParking.obj == 1) fromParking.item.hideItem();
        fromParking.busy = false;
        fromParking.obj = 0;
        fromParking.type = 0;
        fromParking.icon_panel_number.visible = false;
        fromParking.textNumberType.visible = false;
        if (toParking.obj == 1) {
            toParking.item.setViewAngle(0);
            toParking.item.setViewAlpha(1)
        }
        this.setSpriteText(toParking.textNumberType, nextType);
        if (!vIsAuto) {
            this.time.delayedCall(200, this.onAllowAfterAnimation, [toParking, fromParking], this)
        }
        this.showAnimationMerge(toParking.item, nextType, vIsAuto, isFreeUpgrade);
        this.checkNextCar();
        MainGame.Sfx.play("sound", "merge_car")
    }
    actionSwap(toParking, fromParking, vX, vY) {
        if (toParking.obj == 0 || fromParking.obj == 0) return;
        var swapType = toParking.type;
        this.setSpriteText(toParking.textNumberType, fromParking.type);
        this.setSpriteText(fromParking.textNumberType, toParking.type);
        var save_type = toParking.type;
        toParking.type = fromParking.type;
        fromParking.type = save_type;
        fromParking.busy = true;
        toParking.busy = true;
        fromParking.allow = false;
        toParking.allow = false;
        if (fromParking.obj == 1) {
            fromParking.item.setViewAngle(0);
            fromParking.item.setViewAlpha(1);
            fromParking.item.setSkinTower(fromParking.type)
        }
        if (toParking.obj == 1) {
            toParking.item.setViewAngle(0);
            toParking.item.setViewAlpha(1);
            toParking.item.setSkinTower(toParking.type)
        }
        if (toParking.obj == 1 && fromParking.obj == 1) {
            this.showAnimationSwap(toParking.item.view, fromParking.item.view, {
                x: vX,
                y: vY
            });
            this.time.delayedCall(200, this.onAllowAfterAnimation, [toParking, fromParking], this)
        }
    }
    onAllowAfterAnimation(vParking1, vParking2) {
        vParking1.allow = true;
        vParking2.allow = true
    }
    showAnimationSwap(obj1, obj2, vPosition) {
        var to_x1 = obj1.x;
        var to_y1 = obj1.y;
        var to_x2 = obj2.x;
        var to_y2 = obj2.y;
        obj2.x = obj1.x;
        obj2.y = obj1.y;
        obj1.x = vPosition.x;
        obj1.y = vPosition.y;
        this.tweens.add({
            targets: obj1,
            x: to_x1,
            y: to_y1,
            ease: Phaser.Math.Easing.Linear,
            duration: 200
        });
        this.tweens.add({
            targets: obj2,
            x: to_x2,
            y: to_y2,
            ease: Phaser.Math.Easing.Linear,
            duration: 200
        });
        obj1.setScale(this.getScaleCar(1));
        obj2.setScale(this.getScaleCar(1));
        this.tweens.add({
            targets: obj1,
            scale: this.getScaleCar(1.2),
            ease: Phaser.Math.Easing.Linear,
            duration: 100,
            yoyo: true
        });
        this.tweens.add({
            targets: obj2,
            scale: this.getScaleCar(1.2),
            ease: Phaser.Math.Easing.Linear,
            duration: 100,
            yoyo: true
        })
    }
    playOnce() {
        MainGame.firstGo = false;
        MainGame.Sfx.play("music", "main")
    }
    initSettingsGame() {
        this.MAX_POOL_EFFECTS = 50;
        this.MAX_POOL_ENEMIES = 50;
        this.MAX_TYPES_CAR = 50;
        this.MAX_BOT_WAVE = 51;
        this.COINS_PER_DMG = 1.4;
        this.TIME_POISON = 60 * 10;
        this.box_have = [];
        this.isGameOver = false;
        this.TYPE_SKINS = ["chick1", "chick2", "chick3", "chick4", "chick5", "chick6", "chick7", "chick_big1", "chick_big2", "chick_big3", "chick_big4", "chick_big5", "chick_big6", "chick_big7", "chick_mini1", "chick_mini2", "chick_mini3"];
        this.TYPE_WEAPON2 = [2, 3, 4, 7, 12, 13, 17, 21, 25];
        this.SPEED_BULLET = Phaser.Math.GetSpeed(600, 1);
        this.SPEED_ENEMY = Phaser.Math.GetSpeed(80, 1);
        this.ATTACK_ENEMY = 1;
        this.ATTACK_TOWER = 1;
        this.WAVE_INC = 1;
        this.WALL_X = 630;
        this.FIRE_Y = 55;
        this.START_ENEMY_X = 90;
        this.MIN_LVL_UPGRADE = 4;
        this.ALLOW_UPGRADE = 12;
        this.DISTANCE_DRAG = 2e3;
        this.value_offline_earning = 0;
        this.tutorialStep = 0;
        this.isGoTutorial = false;
        this.gameStarted = false;
        this.isAutoMerge = false;
        this.isDoubleSpeed = false;
        this.isBoostTimer = false;
        this.helicopterBonus = "auto_merge";
        this.isAdsHelicopter = false;
        this.showAfterMerge = false;
        this.isShowHelicopter = false;
        this.isDownOnParking = false;
        this.isDrag = false;
        this.selectedCar = null;
        this.linkToOldParking = null;
        this.posInput = {
            x: 0,
            y: 0
        };
        this.isCanUseSkill1 = true;
        this.isCanUseSkill2 = true;
        this.isCanUseSkill3 = true;
        this.DEPTH_platform = .018;
        this.DEPTH_layerWall = .02;
        this.DEPTH_hightlight = .025;
        this.DEPTH_layerTowers = .03;
        this.DEPTH_layerHpBars = .04;
        this.DEPTH_panel_number = .05;
        this.DEPTH_text_number = .06;
        this.DEPTH_effect_unboxing = .07;
        this.DEPTH_layerSpine = .08;
        this.DEPTH_layerEffects = .09;
        this.DEPTH_cursorcar = .091;
        this.DEPTH_cursorSpine = .092;
        this.DEPTH_layerDmgText = .095;
        this.DEPTH_GUI = .1;
        this.DEPTH_text_coins = .2;
        this.DEPTH_text_field = .21;
        this.DEPTH_helicopter = .22;
        this.DEPTH_layerMainButtons = .24;
        this.DEPTH_layerLevelBar = .25;
        this.DEPTH_layerWaveBar = .26;
        this.DEPTH_layerMerge = .3;
        this.DEPTH_layerUnlock = .31;
        this.DEPTH_layerShop = .5;
        this.DEPTH_systemtext = .6;
        this.countDownBonusAutoMerge = 0;
        this.countDownBonusSpeed = 0;
        this.countDownBonusCoins = 0;
        this.countDownNextFree = 0;
        this.countDownOfferTV = 0;
        this.countDefeat = 0;
        this.enemies_killed = 0;
        this.coins_earned = 0;
        this.wall_hp_start = 0;
        this.wall_hp_dmg = 0;
        this.VALUE_SELL = .25;
        this.DELTA_PRICE = 1.2;
        this.OFFLINE_EARNING = .2;
        this.MAX_OFFLINE_EARNING_SEC = 60 * 60 * 48;
        this.MAX_PARKING = 15;
        this.MAX_PILOTS = 10;
        this.value_boost = 3;
        this.FACTOR_TURBO = 2;
        this.ALLOW_ADS_CAR = false;
        this.num_ads_car = 0;
        this.kamikazeCounter = 0;
        this.offerFreeUpgrade = 0;
        this.parking_upgrade_id = null;
        this.parking_upgrade_type = 0;
        this.TIME_BOOST_MERGE = 60;
        this.TIME_BOOST_SPEED = 60;
        this.TIME_BOOST_COINS = 60;
        this.TIME_ADD_FREE_BOX = 20;
        this.TIME_ADD_HELICOPTER = 90;
        this.TIME_ADD_ADS_CAR = 120;
        this.TIME_BTN_FASTBUY_EFFECT = 7;
        this.TIME_BTN_FORGE_EFFECT = 12;
        this.TIME_HELP_ARM = 2 * 60;
        this.TIME_CHECK_BUFFER = 200;
        this.TIME_NEXT_FREE = 25 * 60;
        this.TIME_CD_SKILL1 = 15;
        this.TIME_CD_SKILL2 = 15;
        this.TIME_CD_SKILL3 = 20;
        this.ICON_RETURN_OFFSET = {
            x: 52,
            y: -27
        };
        this.PANEL_NUMBER_OFFSET = {
            x: 28,
            y: 25
        };
        this.HIGHLIGHTER_OFFSET = {
            x: 1.5,
            y: -5
        };
        this.CARS_OFFSET = {
            x: 2,
            y: 12
        };
        this.amount_coins = MainGame.amount_coins || 220;
        this.exp = MainGame.exp || 0;
        this.nextCarLevel = MainGame.nextCarLevel || 2;
        this.currentLevel = MainGame.currentLevel || 1;
        this.LIMIT_parking = MainGame.LIMIT_parking || 15;
        this.freeTimeWheel = MainGame.freeTimeWheel || 0;
        this.levelCannonDmg = MainGame.levelCannonDmg || 1;
        this.levelDiscount = MainGame.levelDiscount || 1;
        this.levelEarning = MainGame.levelEarning || 1;
        this.num_wave = MainGame.num_wave || 1;
        this.level_wall = MainGame.level_wall || 1;
        var kfShopPriv = 1e4;
        this.arLevelCannonDmg = [{
            price: kfShopPriv * 50,
            value: 5
        }, {
            price: kfShopPriv * 2500,
            value: 10
        }, {
            price: kfShopPriv * 125e3,
            value: 25
        }, {
            price: kfShopPriv * 625e4,
            value: 50
        }, {
            price: kfShopPriv * 3125e5,
            value: 100
        }, {
            price: kfShopPriv * 15625e6,
            value: 200
        }, {
            price: kfShopPriv * 78125e7,
            value: 300
        }, {
            price: kfShopPriv * 390625e8,
            value: 400
        }, {
            price: kfShopPriv * 1953125e9,
            value: 500
        }];
        this.arLevelDiscount = [{
            price: kfShopPriv * 50,
            value: 5
        }, {
            price: kfShopPriv * 2500,
            value: 10
        }, {
            price: kfShopPriv * 125e3,
            value: 15
        }, {
            price: kfShopPriv * 625e4,
            value: 20
        }, {
            price: kfShopPriv * 3125e5,
            value: 25
        }, {
            price: kfShopPriv * 15625e6,
            value: 30
        }, {
            price: kfShopPriv * 78125e7,
            value: 35
        }, {
            price: kfShopPriv * 390625e8,
            value: 40
        }, {
            price: kfShopPriv * 1953125e9,
            value: 50
        }];
        this.arLevelEarning = [{
            price: kfShopPriv * 50,
            value: 5
        }, {
            price: kfShopPriv * 2500,
            value: 10
        }, {
            price: kfShopPriv * 125e3,
            value: 20
        }, {
            price: kfShopPriv * 625e4,
            value: 40
        }, {
            price: kfShopPriv * 3125e5,
            value: 60
        }, {
            price: kfShopPriv * 15625e6,
            value: 80
        }, {
            price: kfShopPriv * 78125e7,
            value: 100
        }, {
            price: kfShopPriv * 390625e8,
            value: 150
        }, {
            price: kfShopPriv * 1953125e9,
            value: 200
        }];
        this.factorCannonDmg = 1;
        this.factorDiscount = 1;
        this.factorEarning = 1;
        this.exp_max = this.getExpMax(this.currentLevel);
        this.arCurrentPricesCar = [];
        this.box_have = [];
        this.buffer_boxes = [];
        this.arDeltaCarLevel = [];
        if (MainGame.box_have) {
            for (var i = 0; i < this.MAX_PARKING; i++) {
                this.box_have[i] = MainGame.box_have[i]
            }
        } else {
            for (var i = 0; i < this.MAX_PARKING; i++) {
                this.box_have[i] = null
            }
        }
        if (MainGame.buffer_boxes) {
            for (var i = 0; i < MainGame.buffer_boxes.length; i++) {
                this.buffer_boxes[i] = MainGame.buffer_boxes[i]
            }
        }
        if (MainGame.arDeltaCarLevel) {
            for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
                this.arDeltaCarLevel[i] = MainGame.arDeltaCarLevel[i]
            }
        } else {
            for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
                this.arDeltaCarLevel[i] = 0
            }
        }
        this.timer_freeBox = 0;
        this.timer_helicopter = this.TIME_ADD_HELICOPTER - 30;
        this.timer_carAds = this.TIME_ADD_ADS_CAR - 35;
        this.timer_btn_fastbuy = 0;
        this.timer_btn_forge = 0;
        this.time.addEvent({
            delay: 1e3,
            callback: this.updateTimerEverySec,
            callbackScope: this,
            loop: true
        });
        this.timerCheckHelp = 0;
        this.timerCheckBuffer = 0
    }
    updateTimerEverySec() {
        this.updateForge();
        this.updateSkillsCooldown();
        this.checkPrivilegesPrice();
        this.timer_helicopter++;
        if (this.timer_helicopter >= this.TIME_ADD_HELICOPTER) {
            this.timeToHelicopter();
            this.timer_helicopter = 0
        }
        if (this.num_ads_car == 0) {
            this.timer_carAds++;
            if (this.timer_carAds >= this.TIME_ADD_ADS_CAR) {
                this.goAllowAdsCar();
                this.timer_carAds = 0
            }
        }
        this.timer_btn_fastbuy++;
        if (this.timer_btn_fastbuy >= this.TIME_BTN_FASTBUY_EFFECT) {
            if (this.checkFastBuy()) this.gameGUI.showBtnFastbuyEffect();
            this.timer_btn_fastbuy = 0
        }
        if (!this.isGoTutorial) this.timer_btn_forge++;
        if (this.timer_btn_forge >= this.TIME_BTN_FORGE_EFFECT) {
            this.gameGUI.showBtnForgeEffect();
            this.timer_btn_forge = 0
        }
        if (this.freeTimeWheel < MainGame.maxTimeWheel) {
            if (this.countDownNextFree > 0) {
                this.countDownNextFree--;
                MainGame.cdNextFree = this.countDownNextFree;
                if (this.countDownNextFree == 0) {
                    this.freeTimeWheel++;
                    MainGame.freeTimeWheel = this.freeTimeWheel;
                    if (this.freeTimeWheel < MainGame.maxTimeWheel) {
                        this.countDownNextFree = this.TIME_NEXT_FREE
                    }
                    this.gameGUI.iconAdvFortune.visible = true
                }
                this.gameGUI.updateFortunaWheelWindow(this.countDownNextFree)
            }
        }
        if (!this.isAutoMerge) {
            if (this.countDownOfferTV > 0) {
                this.countDownOfferTV--;
                if (this.countDownOfferTV == 0) {
                    this.gameGUI.showOfferTV()
                }
            } else if (this.countDownOfferTV < 0) {
                this.countDownOfferTV++
            }
        }
        if (!this.isGoTutorial) {
            MainGame.amount_coins = this.amount_coins;
            MainGame.saveSaves()
        }
    }
    goAutoPlay() {
        if (MainGame.isAutoPlay) return;
        this.time.addEvent({
            delay: 500,
            callback: this.timeAutoPlay,
            callbackScope: this,
            loop: true
        });
        MainGame.isAutoPlay = true
    }
    timeAutoPlay() {
        this.checkAutoPlay()
    }
    checkAutoPlay() {
        var action = false;
        if (this.checkWallUpgrade()) {
            this.clickBuyWall();
            action = true
        }
        if (action) return;
        action = this.autoSkill();
        var countSoldiers = this.getCountSoldiers();
        var mergeSoldiers = countSoldiers > 4;
        action = this.checkAutoMerge(mergeSoldiers);
        if (action) return;
        action = this.checkWorkFields();
        if (action) return;
        if (this.num_wave > 10) {
            if (this.wall_hp < this.wall_hp_max * .35) action = true
        }
        if (action) return;
        if (this.checkFastBuy()) {
            this.buyFastCar();
            action = true
        }
        if (action) return;
        var upgradeNum = this.checkPrivilegesPrice();
        if (upgradeNum > 0) {
            if (upgradeNum == 1) this.clickBuyPrivilege1();
            if (upgradeNum == 2) this.clickBuyPrivilege2();
            if (upgradeNum == 3) this.clickBuyPrivilege3()
        }
    }
    autoSkill(vNum) {
        var shootPos = {
            x: 350,
            y: 300
        };
        var enemy = this.getEnemy();
        if (enemy) {
            shootPos.x = enemy.view.x;
            shootPos.y = enemy.view.y
        }
        var action = false;
        if (!action) {
            if (this.isSkillReady1 && this.isCanUseSkill1) {
                this.aim_skill.x = shootPos.x;
                this.aim_skill.y = shootPos.y;
                this.useSkill1();
                action = true
            }
        }
        if (!action) {
            if (this.isSkillReady2 && this.isCanUseSkill2) {
                this.aim_skill.x = shootPos.x;
                this.aim_skill.y = shootPos.y;
                this.useSkill2();
                action = true
            }
        }
        if (!action) {
            if (this.isSkillReady3 && this.isCanUseSkill3) {
                this.aim_skill.x = 330;
                this.aim_skill.y = 100 + MyMath.getRandomInt(0, 7) * 40;
                this.useSkill3();
                action = true
            }
        }
        return action
    }
    getCountSoldiers() {
        var countParking = this.LIMIT_parking;
        var parking = null;
        var count = 0;
        for (var i = 0; i < countParking; i++) {
            parking = this.arParking[i];
            if (parking.battle && parking.busy) {
                count++
            }
        }
        return count
    }
    checkWorkFields(vIsSkipAction) {
        var countParking = this.LIMIT_parking;
        var parking = null;
        var parkingBattleId = -1;
        var maxType = 0;
        var maxParkingId = -1;
        var action = false;
        for (var i = 0; i < countParking; i++) {
            parking = this.arParking[i];
            if (!parking.battle && parking.busy) {
                if (parking.type > maxType) {
                    maxType = parking.type;
                    maxParkingId = parking.id
                }
            }
        }
        for (var i = 0; i < countParking; i++) {
            parking = this.arParking[i];
            if (parking.battle) {
                if (parking.busy) {
                    if (maxType > 0 && parking.type < maxType) {
                        parkingBattleId = parking.id;
                        break
                    }
                } else {
                    parkingBattleId = parking.id;
                    break
                }
            }
        }
        if (vIsSkipAction) {
            if (parkingBattleId >= 0 && maxParkingId >= 0) {
                return [maxParkingId, parkingBattleId]
            } else {
                return null
            }
        }
        if (parkingBattleId >= 0 && maxParkingId >= 0) {
            var toParking = this.arParking[parkingBattleId];
            var fromParking = this.arParking[maxParkingId];
            if (toParking.busy) {
                if (fromParking.obj == 1 && fromParking.item.count_box_tween > 0) this.openBox(fromParking, true);
                this.actionSwap(toParking, fromParking, fromParking.x, fromParking.y)
            } else {
                if (fromParking.obj == 1 && fromParking.item.count_box_tween > 0) this.openBox(fromParking, true);
                this.actionChangeParking(toParking, fromParking)
            }
            action = true
        }
        return action
    }
    checkFastBuy() {
        if (this.getSlotFullness() == 10) return false;
        var typeFastCar = this.getTypeBetterPrice();
        var priceCar = this.getPriceCar(typeFastCar);
        priceCar = Math.round(priceCar * this.factorDiscount);
        if (this.amount_coins < priceCar) return false;
        return true
    }
    initEffects() {
        this.anims.create({
            key: "effect_connect2",
            frames: this.anims.generateFrameNames(this.SPRITE_SHEET, {
                prefix: "effect_connect2_",
                end: 33,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "magic_1",
            frames: this.anims.generateFrameNames(this.SPRITE_SHEET, {
                prefix: "magic_1_",
                end: 14,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "effect_connect",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "effect_connect1_",
                end: 18,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "delete_dust",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "delete_dust_",
                end: 16,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "propeller1",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "propeller1_",
                end: 3,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "effect_unboxing",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "effect_unboxing_",
                end: 8,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "effect_kick1",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "effect_kick_",
                end: 7,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "effect_tutor",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "effect_tutor_",
                end: 16,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "delete_flash",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "delete_flash_",
                end: 24,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "effect_connect3",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "effect_connect3_",
                end: 19,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "flash_btn_big",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "flash_btn_big_",
                end: 15,
                zeroPad: 4
            }),
            hideOnComplete: false
        });
        this.anims.create({
            key: "flash_btn_forge",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "flash_btn_forge_",
                end: 15,
                zeroPad: 4
            }),
            hideOnComplete: false
        });
        this.anims.create({
            key: "effect_heal",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "effect_heal_",
                end: 15,
                zeroPad: 4
            }),
            hideOnComplete: false
        });
        this.anims.create({
            key: "skill_highlight",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "skill_highlight_",
                end: 15,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "effect_shoot",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "line_",
                end: 2,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "explosion1",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "explosion1_",
                end: 14,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "explosion2",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "explosion2_",
                end: 17,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "rage_car",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "rage_car_",
                end: 25,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "fire1",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "fire1_",
                end: 13,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "fire2",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "fire2_",
                end: 11,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "fire3",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "fire3_",
                end: 13,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "fire4",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "fire4_",
                end: 15,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "acid1",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "acid1_",
                end: 17,
                zeroPad: 4
            }),
            hideOnComplete: true
        });
        this.anims.create({
            key: "acid2",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "acid2_",
                end: 17,
                zeroPad: 4
            }),
            hideOnComplete: false,
            repeat: -1
        });
        this.anims.create({
            key: "rocket_e1",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "rocket_e1_",
                end: 0,
                zeroPad: 4
            }),
            hideOnComplete: false
        });
        this.anims.create({
            key: "rocket_e2",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "rocket_e2_",
                end: 0,
                zeroPad: 4
            }),
            hideOnComplete: false
        });
        this.anims.create({
            key: "rocket_e3",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "rocket_e3_",
                end: 0,
                zeroPad: 4
            }),
            hideOnComplete: false
        });
        this.anims.create({
            key: "grenade_e1",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "grenade_e1_",
                end: 0,
                zeroPad: 4
            }),
            hideOnComplete: false
        });
        this.anims.create({
            key: "grenade_e2",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "grenade_e2_",
                end: 0,
                zeroPad: 4
            }),
            hideOnComplete: false
        });
        this.anims.create({
            key: "grenade_e3",
            frames: this.anims.generateFrameNames("ss_main", {
                prefix: "grenade_e3_",
                end: 0,
                zeroPad: 4
            }),
            hideOnComplete: false
        })
    }
    addEffectKick(vX, vY, vType) {
        vX += MyMath.getRandomInt(-3, 3);
        vY += MyMath.getRandomInt(-3, 3);
        this.showEffect(vX, vY, "effect_kick" + vType)
    }
    addEffectKilled(vX, vY) {
        var r = MyMath.getRandomInt(1, 12);
        MainGame.Sfx.play("sound", "dead" + r)
    }
    addEffectBoom(vX, vY) {
        var effect = this.showEffect(vX + 15, vY - 40, "explosion2");
        if (effect) effect.setScale(1.2)
    }
    initHelicopterBonuses() {
        this.ar_bonuses = ["auto_merge", "speed_x2", "reward_box4", "bonus_coins"];
        this.heli_count = 3;
        this.helicopterBonus = this.ar_bonuses[this.heli_count]
    }
    getHelicopterBonus() {
        this.helicopterBonus = this.ar_bonuses[this.heli_count];
        this.heli_count++;
        if (this.heli_count >= this.ar_bonuses.length) {
            this.heli_count = 0;
            MyMath.shuffleArr(this.ar_bonuses)
        }
    }
    increaseLevel(vValue, vShowLater) {
        this.exp += vValue;
        var delta = this.exp_max - this.exp;
        if (this.exp >= this.exp_max) {
            this.exp = -delta;
            this.currentLevel++;
            this.exp_max = this.getExpMax(this.currentLevel);
            this.gameGUI.textLevel.setText(this.currentLevel);
            this.gameGUI.updateLevel(1);
            this.gameGUI.updateLevel(this.exp / this.exp_max, 250);
            this.time.delayedCall(500, this.gameGUI.showLevelUpWindow, [], this.gameGUI);
            if (this.currentLevel == 2) {
                this.timer_helicopter = this.TIME_ADD_HELICOPTER - 5
            }
            if (this.currentLevel >= 3 && this.freeTimeWheel > 0) {
                this.gameGUI.iconAdvFortune.visible = true;
                this.gameGUI.buttonFortuna.visible = true
            }
        } else {
            this.gameGUI.updateLevel(this.exp / this.exp_max)
        }
    }
    checkNextCar() {
        var countParking = this.LIMIT_parking;
        var parking;
        var progress = 0;
        var type = 0;
        var cost_current = 0;
        var cost_need = Math.pow(2, this.nextCarLevel - 1);
        for (var i = 0; i < countParking; i++) {
            parking = this.arParking[i];
            type = parking.type;
            if (type > 0) {
                cost_current += Math.pow(2, type - 1)
            }
        }
        progress = cost_current / cost_need;
        if (progress > 1) {
            progress = 1
        }
    }
    updateBoxHave() {
        if (this.isGoTutorial) return;
        var parking;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            parking = this.arParking[i];
            if (parking.type > 0) {
                this.box_have[i] = {
                    id: parking.id,
                    t: parking.type,
                    r: parking.racing
                }
            } else {
                this.box_have[i] = null
            }
        }
        this.saveBoxHave();
        this.saveGameValues()
    }
    saveBoxHave() {
        if (this.isGoTutorial) return;
        MainGame.box_have = [];
        for (var i = 0; i < this.box_have.length; i++) {
            MainGame.box_have.push(this.box_have[i])
        }
        MainGame.saveSaves()
    }
    saveBoxBuffer() {
        MainGame.buffer_boxes = [];
        for (var i = 0; i < this.buffer_boxes.length; i++) {
            MainGame.buffer_boxes.push(this.buffer_boxes[i])
        }
        MainGame.saveSaves()
    }
    saveDeltaCarLevel() {
        if (this.isGoTutorial) return;
        MainGame.arDeltaCarLevel = [];
        for (var i = 0; i < this.arDeltaCarLevel.length; i++) {
            MainGame.arDeltaCarLevel.push(this.arDeltaCarLevel[i])
        }
        MainGame.saveSaves()
    }
    saveDeltaWallLevel() {
        if (this.isGoTutorial) return;
        this.saveGameValues()
    }
    saveGameValues() {
        if (this.isGoTutorial) return;
        MainGame.amount_coins = this.amount_coins;
        MainGame.level_wall = this.level_wall;
        MainGame.num_wave = this.num_wave;
        MainGame.exp = this.exp;
        MainGame.nextCarLevel = this.nextCarLevel;
        MainGame.currentLevel = this.currentLevel;
        MainGame.LIMIT_parking = this.LIMIT_parking;
        MainGame.LIMIT_pilots = this.LIMIT_pilots;
        MainGame.lastSession = (new Date).getTime();
        MainGame.saveSaves()
    }
    initParkings() {
        this.arParking = [];
        var posX = 715;
        var posY = 75;
        var offsetY = 83;
        var posX1 = 3;
        var posX2 = 133;
        var posX3 = 133 + 83;
        this.arParking.push({
            id: 0,
            x: posX + posX1,
            y: posY + offsetY * 0,
            obj: 0,
            busy: false,
            battle: true,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 1,
            x: posX + posX1,
            y: posY + offsetY * 1,
            obj: 0,
            busy: false,
            battle: true,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 2,
            x: posX + posX1,
            y: posY + offsetY * 2,
            obj: 0,
            busy: false,
            battle: true,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 3,
            x: posX + posX1,
            y: posY + offsetY * 3,
            obj: 0,
            busy: false,
            battle: true,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 4,
            x: posX + posX1,
            y: posY + offsetY * 4,
            obj: 0,
            busy: false,
            battle: true,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 5,
            x: posX + posX2,
            y: posY + offsetY * 0,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 6,
            x: posX + posX2,
            y: posY + offsetY * 1,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 7,
            x: posX + posX2,
            y: posY + offsetY * 2,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 8,
            x: posX + posX2,
            y: posY + offsetY * 3,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 9,
            x: posX + posX2,
            y: posY + offsetY * 4,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 10,
            x: posX + posX3,
            y: posY + offsetY * 0,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 11,
            x: posX + posX3,
            y: posY + offsetY * 1,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 12,
            x: posX + posX3,
            y: posY + offsetY * 2,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 13,
            x: posX + posX3,
            y: posY + offsetY * 3,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        this.arParking.push({
            id: 14,
            x: posX + posX3,
            y: posY + offsetY * 4,
            obj: 0,
            busy: false,
            battle: false,
            type: 0,
            allow: true
        });
        for (var i = 0; i < this.arParking.length; i++) {
            this.addParking(this.arParking[i])
        }
    }
    addParking(vData) {
        var icon_parking = this.add.image(vData.x, vData.y - 5, "ss_main", "panel_number_0000");
        var highlighter = this.add.image(vData.x + this.HIGHLIGHTER_OFFSET.x, vData.y + this.HIGHLIGHTER_OFFSET.y, "ss_main", "highlighted_car_0000");
        var icon_panel_number = this.add.image(vData.x, vData.y, "ss_main", "panel_number_0000");
        icon_panel_number.setScale(1.1);
        icon_panel_number.x += this.PANEL_NUMBER_OFFSET.x;
        icon_panel_number.y += this.PANEL_NUMBER_OFFSET.y;
        icon_parking.setDepth(this.DEPTH_platform);
        highlighter.setDepth(this.DEPTH_hightlight);
        icon_panel_number.setDepth(this.DEPTH_panel_number);
        var posX = vData.x + this.CARS_OFFSET.x;
        var posY = vData.y + this.CARS_OFFSET.y;
        var car = new Tower(this, this.layerTowers, posX, posY, 1);
        vData.item = car;
        var textNumberType = this.add.container();
        textNumberType.setDepth(this.DEPTH_text_number);
        car.view.visible = false;
        highlighter.visible = false;
        icon_panel_number.visible = false;
        textNumberType.visible = false;
        vData.icon_parking = icon_parking;
        vData.highlighter = highlighter;
        vData.icon_panel_number = icon_panel_number;
        vData.textNumberType = textNumberType;
        vData.initPos = {
            x: vData.x,
            y: vData.y
        };
        if (!vData.battle) {
            icon_parking.visible = false
        }
        icon_parking.visible = false
    }
    getTypeFastCar() {
        var vLvl = this.nextCarLevel - 1;
        switch (vLvl) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return 1;
                break;
            case 6:
                return 2;
                break;
            case 7:
                return 3;
                break;
            case 8:
                return 3;
                break;
            case 9:
                return 4;
                break;
            case 10:
                return 4;
                break;
            case 11:
                return 5;
                break;
            default:
                return vLvl - 7;
                break
        }
    }
    getTypeRandomBox() {
        var vLvl = this.getTypeFastCar() - 1;
        if (vLvl < 1) vLvl = 1;
        return vLvl
    }
    getFreeParking() {
        var placeNum = -1;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            if (this.selectedCar) {
                if (this.selectedCar.id == i) {
                    continue
                }
            }
            if (!this.arParking[i].busy && !this.arParking[i].battle) {
                placeNum = i;
                break
            }
        }
        return placeNum
    }
    getCountMobCoins(vNumWave) {
        return 30 * Math.floor(Math.pow(2, vNumWave))
    }
    getCountBossCoins(vNumWave) {
        return 1500 * Math.round(Math.pow(2, vNumWave))
    }
    getCountMobHp(vNumWave) {
        if (vNumWave > this.MAX_BOT_WAVE) vNumWave = this.MAX_BOT_WAVE;
        if (vNumWave <= 10) {
            return 220 * Math.floor(Math.pow(1.49, vNumWave))
        } else {
            return 8 * Math.floor(Math.pow(2.04, vNumWave))
        }
    }
    getCountBossHp(vNumWave) {
        if (vNumWave > this.MAX_BOT_WAVE) vNumWave = this.MAX_BOT_WAVE;
        if (vNumWave <= 10) {
            return Math.round(5e3 * Math.pow(1.65, vNumWave - 1))
        } else {
            return Math.round(550 * Math.pow(2.07, vNumWave - 1))
        }
    }
    getCountSpecialHp(vNumWave, vType) {
        if (vNumWave > this.MAX_BOT_WAVE) vNumWave = this.MAX_BOT_WAVE;
        if (vType == 51 || vType == 52 || vType == 53) {
            if (vNumWave <= 10) {
                return 2100 * Math.floor(Math.pow(1.45, vNumWave))
            } else {
                return 45 * Math.floor(Math.pow(2.06, vNumWave))
            }
        }
        if (vType == 6) {
            if (vNumWave <= 10) {
                return 500 * Math.floor(Math.pow(1.5, vNumWave))
            } else {
                return 21 * Math.floor(Math.pow(2.06, vNumWave))
            }
        }
    }
    getMobDamage(vNumWave) {
        if (vNumWave > this.MAX_BOT_WAVE) vNumWave = this.MAX_BOT_WAVE;
        return Math.round(4 * Math.pow(1.3, vNumWave - 1))
    }
    getBossDamage(vNumWave) {
        if (vNumWave > this.MAX_BOT_WAVE) vNumWave = this.MAX_BOT_WAVE;
        return Math.round(40 * Math.pow(1.2, vNumWave - 1))
    }
    getSpecialDamage(vNumWave, vType) {
        if (vNumWave > this.MAX_BOT_WAVE) vNumWave = this.MAX_BOT_WAVE;
        if (vType == 6) return 15 * this.getMobDamage(vNumWave);
        if (vType == 7) return Math.round(1.25 * this.getMobDamage(vNumWave));
        if (vType == 8) return Math.round(1.25 * this.getMobDamage(vNumWave))
    }
    getCoinsLevelUp(vPlayerLevel) {
        if (vPlayerLevel <= 10) {
            return 1500 * Math.round(Math.pow(2.5, vPlayerLevel))
        } else {
            return 1500 * Math.round(Math.pow(2.31, vPlayerLevel))
        }
    }
    getExpMerge(vCarLevel) {
        return 15 * Math.pow(2, vCarLevel)
    }
    getExpMax(vPlayerLevel) {
        return 250 * Math.pow(2, vPlayerLevel)
    }
    getDamage(vType) {
        var dmg = 15 * Math.pow(2, vType);
        dmg = Math.floor(dmg * this.factorCannonDmg);
        return dmg
    }
    getPriceWall(vLevel) {
        var value = vLevel || this.level_wall;
        return Math.pow(4, value) * 500
    }
    updateWallValues() {
        this.wall_hp_max = 600 * Math.round(Math.pow(1.5, this.level_wall + 1));
        this.wall_hp = this.wall_hp_max;
        this.updateWallHp(0);
        this.gameGUI.updateWallHp(1, this.wall_hp, this.wall_hp_max);
        this.setSpriteText(this.text_wall_lvl, this.level_wall)
    }
    saveBoxHave() {
        if (this.isGoTutorial) return;
        MainGame.box_have = [];
        for (var i = 0; i < this.box_have.length; i++) {
            MainGame.box_have.push(this.box_have[i])
        }
        MainGame.saveSaves()
    }
    getScaleCar(value) {
        return value * .55
    }
    getTypeBetterPrice() {
        var vLvl = this.nextCarLevel - 1;
        switch (vLvl) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return 1;
                break;
            case 6:
            case 7:
            case 8:
                var price1 = this.getPriceCar(vLvl - 5);
                var price2 = this.getPriceCar(vLvl - 4);
                var type = vLvl - 5;
                if (price1 > price2 * .5) type = vLvl - 4;
                return type;
                break;
            default:
                var price1 = this.getPriceCar(vLvl - 6);
                var price2 = this.getPriceCar(vLvl - 5);
                var price3 = this.getPriceCar(vLvl - 4);
                var type = vLvl - 6;
                if (price1 > price2 * .5) type = vLvl - 5;
                if (price2 > price3 * .5) type = vLvl - 4;
                return type;
                break
        }
    }
    getCarInfo(type) {
        var _price = 100;
        if (type > 1) {
            _price = Math.floor(1500 * Math.pow(2.25, type - 2))
        }
        return {
            price: _price
        }
    }
    updateCarPrices() {
        var price = 0;
        for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
            price = this.getCarInfo(i + 1).price;
            for (var j = 0; j < this.arDeltaCarLevel[i]; j++) {
                price = Math.round(price * this.DELTA_PRICE)
            }
            this.arCurrentPricesCar[i] = price
        }
    }
    getPriceCar(vType) {
        return this.arCurrentPricesCar[vType - 1]
    }
    updatePriceCar(vType) {
        var type_car = vType;
        this.arDeltaCarLevel[type_car - 1]++;
        var new_value = this.arCurrentPricesCar[type_car - 1] * this.DELTA_PRICE;
        this.arCurrentPricesCar[type_car - 1] = Math.round(new_value)
    }
    clickBuyShopItem(value) {
        if (this.ALLOW_ADS_CAR && this.num_ads_car == value) {
            if (this.getFreeParking() < 0) {
                this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_parking);
                return
            }
            this.showAdsForCar()
        } else {
            this.buyCar(value, true)
        }
    }
    buyFastCar() {
        var typeFastCar = this.getTypeBetterPrice();
        this.buyCar(typeFastCar, false);
        this.timer_btn_fastbuy = 0;
        if (this.isGoTutorial && this.tutorialStep < 3) {
            this.gameGUI.tutorialScenario()
        }
    }
    buyCar(vNum, vFromShop) {
        if (this.getFreeParking() < 0) {
            this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_parking);
            return
        }
        var priceCar = this.getPriceCar(vNum);
        priceCar = Math.round(priceCar * this.factorDiscount);
        if (this.amount_coins < priceCar) {
            this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_money);
            return
        }
        this.addObject({
            lvl: vNum,
            fromShop: vFromShop
        }, true);
        this.amount_coins -= priceCar;
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm);
        this.gameGUI.updateShop(text_coins_warm);
        this.updatePriceCar(vNum);
        this.gameGUI.updateFastBuy();
        this.checkWallUpgrade();
        this.gameGUI.updateShopItem();
        this.updateBoxHave();
        this.saveDeltaCarLevel();
        MainGame.Sfx.play("sound", "buy")
    }
    clickBuyWall() {
        if (this.isGameOver) return;
        var price = this.getPriceWall();
        price = Math.round(price * this.factorDiscount);
        if (this.amount_coins < price) {
            this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_money);
            return
        }
        this.level_wall++;
        this.updateWallValues();
        this.showHealEffect();
        this.amount_coins -= price;
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm);
        this.gameGUI.updateShop(text_coins_warm);
        this.gameGUI.updateWallBuy();
        this.checkWallUpgrade();
        this.saveDeltaWallLevel();
        MainGame.Sfx.play("sound", "buy")
    }
    clickForge() {
        this.timer_btn_forge = 0;
        this.updateForge()
    }
    updateForge() {
        if (this.getSlotFullness() == 10) return;
        this.timer_freeBox++;
        if (this.timer_freeBox >= this.TIME_ADD_FREE_BOX) {
            this.timeToAddFreeBox();
            this.timer_freeBox = 0
        }
        var progress = this.timer_freeBox / this.TIME_ADD_FREE_BOX;
        this.gameGUI.updateForge(1 - progress)
    }
    setSpriteText(vLayer, vNum) {
        vLayer.removeAll(true);
        var stringNum = vNum.toString();
        var arrayOfNum = stringNum.split("");
        var length = 0;
        var symb = null;
        var symsAr = [];
        for (var n in arrayOfNum) {
            symb = this.add.image(length, 2, "ss_main", "num_" + arrayOfNum[n] + "_0000");
            symb.setScale(.75);
            symb.setOrigin(0, .5);
            vLayer.add(symb);
            symsAr.push(symb);
            length += symb.displayWidth - 4
        }
        var offsetX = 0;
        var totalLength = Math.floor(length * .5);
        for (var s in symsAr) {
            symsAr[s].x -= totalLength
        }
    }
    addBoxToBuffer(vTypeCar) {
        this.buffer_boxes.push({
            type: vTypeCar
        })
    }
    checkBuffer() {
        if (this.buffer_boxes.length > 0) {
            var free_park_num = this.getFreeParking();
            if (free_park_num >= 0) {
                var obj = this.buffer_boxes.shift();
                this.addObject({
                    lvl: obj.type,
                    skinBox: true
                });
                this.updateBoxHave();
                this.saveBoxBuffer()
            }
        }
    }
    addObject(data, vIsSound) {
        data = data || {};
        var num = data.lvl || this.getTypeRandomBox();
        var free_park_num = -1;
        if (data.parkingId != null) {
            free_park_num = data.parkingId
        } else {
            free_park_num = this.getFreeParking()
        }
        if (free_park_num >= 0) {
            var park_place = this.arParking[free_park_num];
            park_place.busy = true;
            var car = park_place.item;
            car.showObject();
            car.setSkinTower(num);
            park_place.icon_panel_number.visible = true;
            park_place.textNumberType.visible = true;
            this.setSpriteText(park_place.textNumberType, num);
            park_place.obj = 1;
            park_place.type = num;
            if (data.parkingId == null || data.skinBox) {
                if (data.skinBox || data.fromShop) {
                    if (data.fromShop) {
                        car.setSkinBox(true, 2)
                    } else {
                        car.setSkinBox(true, 1)
                    }
                    this.shakeBox(park_place);
                    park_place.icon_panel_number.visible = false;
                    park_place.textNumberType.visible = false;
                    if (!data.fromShop) MainGame.Sfx.play("sound", "show_box")
                }
                car.setViewScale(this.getScaleCar(.6));
                car.setViewAlpha(.5);
                this.tweens.add({
                    targets: car.view,
                    scale: this.getScaleCar(1),
                    ease: Phaser.Math.Easing.Back.Out,
                    duration: 200
                });
                this.tweens.add({
                    targets: car.view,
                    alpha: 1,
                    ease: Phaser.Math.Easing.Linear,
                    duration: 150
                })
            }
        } else {
            this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_parking)
        }
        this.checkNextCar();
        if (vIsSound) this.getSlotFullness(true)
    }
    openBox(vParking, vIsAnimScale) {
        if (vParking.obj == 0) return;
        var vObj = vParking.item;
        if (this.isGoTutorial && this.tutorialStep == 5) {
            this.gameGUI.tutorialScenario()
        }
        if (vObj.timedEvent) vObj.timedEvent.remove();
        vObj.count_box_tween = 0;
        vObj.setSkinBox(false);
        vObj.setSkinTower(vParking.type);
        vObj.resetDodik();
        vObj.setViewAngle(0);
        vParking.icon_panel_number.visible = true;
        vParking.textNumberType.visible = true;
        if (vIsAnimScale) {
            this.showEffect(vObj.view.x, vObj.view.y - 15, "effect_unboxing");
            vObj.setViewScale(this.getScaleCar(.6));
            vObj.setViewAlpha(.5);
            this.tweens.add({
                targets: vObj.view,
                scale: this.getScaleCar(1),
                ease: Phaser.Math.Easing.Back.Out,
                duration: 200
            });
            this.tweens.add({
                targets: vObj.view,
                alpha: 1,
                ease: Phaser.Math.Easing.Linear,
                duration: 150
            });
            MainGame.Sfx.play("sound", "open_box")
        }
    }
    goShake(vParking) {
        if (vParking.obj) {
            var vObj = vParking.item;
            vObj.count_box_tween--;
            if (vObj.count_box_tween <= 0) {
                this.openBox(vParking, true)
            } else {
                this.tweens.add({
                    targets: vObj.view,
                    angle: -6,
                    ease: Phaser.Math.Easing.Sine.InOut,
                    duration: 150,
                    repeat: 1,
                    yoyo: true
                })
            }
        }
    }
    shakeBox(vParking) {
        var vObj = vParking.item;
        vObj.count_box_tween = 5;
        if (this.isGoTutorial) return;
        vObj.timedEvent = this.time.addEvent({
            args: [vParking],
            delay: 1500,
            callback: this.goShake,
            callbackScope: this,
            repeat: vObj.count_box_tween
        })
    }
    updateParking() {
        var countParking = this.LIMIT_parking;
        var parking = null;
        for (var i = 0; i < countParking; i++) {
            parking = this.arParking[i];
            parking.x = parking.initPos.x;
            parking.y = parking.initPos.y;
            parking.icon_parking.x = parking.x;
            parking.icon_parking.y = parking.y;
            parking.highlighter.x = parking.x + this.HIGHLIGHTER_OFFSET.x;
            parking.highlighter.y = parking.y + this.HIGHLIGHTER_OFFSET.y;
            parking.icon_panel_number.x = parking.x + this.PANEL_NUMBER_OFFSET.x;
            parking.icon_panel_number.y = parking.y + this.PANEL_NUMBER_OFFSET.y;
            parking.textNumberType.x = parking.x + this.PANEL_NUMBER_OFFSET.x - 3;
            parking.textNumberType.y = parking.y + this.PANEL_NUMBER_OFFSET.y - 3;
            if (parking.obj == 1) {
                parking.item.view.x = parking.x + this.CARS_OFFSET.x;
                parking.item.view.y = parking.y + this.CARS_OFFSET.y
            }
        }
        this.hideArmHelp()
    }
    initArmHelp() {
        this.arm_help = this.add.image(this.midX, this.midY, "ss_main", "tutor_cursor_0000");
        this.arm_help.visible = false;
        this.arm_help.setDepth(this.DEPTH_cursorcar);
        this.timerCheckHelp = 0
    }
    hideArmHelp() {
        this.tweens.killTweensOf(this.arm_help);
        this.arm_help.visible = false;
        this.timerCheckHelp = 0
    }
    getSlotFullness(vIsCheckOfferTV) {
        var countBusy = 0;
        var parking;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            parking = this.arParking[i];
            if (parking.id >= 5 && parking.busy) countBusy++
        }
        if (vIsCheckOfferTV && countBusy >= 9 && this.countDownOfferTV == 0) {
            this.countDownOfferTV = 2
        }
        return countBusy
    }
    getMaxParkingPair(isForAutoMerge, vIsBattleField) {
        var valuesTypes = [];
        var parking;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            parking = this.arParking[i];
            if (parking.type > 0 && parking.allow && parking.type < this.MAX_TYPES_CAR) {
                if (parking.obj == 1 && parking.item.count_box_tween != null && parking.item.count_box_tween <= 0) {
                    if (parking.id < 5 && !vIsBattleField) continue;
                    if (isForAutoMerge && (this.selectedCar && parking.id == this.selectedCar.id)) continue;
                    valuesTypes.push({
                        id: parking.id,
                        type: parking.type
                    })
                }
            }
        }
        if (valuesTypes.length < 1) return null;
        var pairIds = this.getMaxValuePair(valuesTypes);
        if (pairIds.length > 1) {
            return [pairIds[1], pairIds[0]]
        }
    }
    updateArmHelp() {
        if (this.isGoTutorial || this.arm_help.visible || this.isAutoMerge || MainGame.isAutoPlay) return;
        if (this.num_wave > 10) return;
        this.hideArmHelp();
        var pairIds = null;
        var needHint = true;
        pairIds = this.getMaxParkingPair(false);
        if (pairIds) needHint = false;
        if (needHint) {
            var countBusy = 0;
            for (var i = 0; i < 5; i++) {
                if (this.arParking[i].busy) {
                    countBusy++
                }
            }
            if (countBusy >= 4) {
                pairIds = this.getMaxParkingPair(false, true);
                if (pairIds) needHint = false
            }
        }
        if (needHint) {
            pairIds = this.checkWorkFields(true)
        }
        if (pairIds) {
            this.arm_help.visible = true;
            var parkingA = this.arParking[pairIds[0]];
            var parkingB = this.arParking[pairIds[1]];
            var offsetX = 15;
            var offsetY = 30;
            this.arm_help.x = parkingA.x + offsetX;
            this.arm_help.y = parkingA.y + offsetY;
            this.tweens.add({
                targets: this.arm_help,
                x: parkingB.x + offsetX,
                y: parkingB.y + offsetY,
                ease: "Cubic.easeOut",
                duration: 700,
                hold: 300
            });
            this.time.delayedCall(1500, this.hideArmHelp, [], this)
        }
    }
    getMaxValuePair(ar) {
        var max_value = 0;
        var max_count = 0;
        var indexes_of_max = [];
        ar.sort((function(a, b) {
            return b.type - a.type
        }));
        max_value = ar[0].type;
        max_count = 1;
        indexes_of_max = [ar[0].id];
        for (var i = 1; i < ar.length; i++) {
            if (ar[i].type == max_value) {
                max_count++;
                indexes_of_max.push(ar[i].id);
                if (max_count == 2) {
                    break
                }
            } else {
                max_count = 1;
                max_value = ar[i].type;
                indexes_of_max = [ar[i].id]
            }
        }
        return indexes_of_max
    }
    update(time, delta) {
        var pointer = this.input.activePointer;
        var pos = this.getInputPosition(pointer);
        if (this.gameStarted) {
            if (this.isDrag) {
                this.cursor_car.x = pos.x;
                this.cursor_car.y = pos.y + 30
            }
            this.updatePoisonSmoke();
            this.enemies.update(time, delta);
            if (!this.isGameOver) {
                if (!this.isWaveEnd && !this.isGoTutorial) this.updateWave();
                for (var i = 0; i < this.LIMIT_parking; i++) {
                    this.updateTower(time, delta, this.arParking[i])
                }
                if (this.isAutoMerge) {
                    this.timerCheckAutoMerge += this.WAVE_INC;
                    if (this.timerCheckAutoMerge > 90) {
                        this.checkAutoMerge(false);
                        this.timerCheckAutoMerge = 0
                    }
                }
            }
            this.gameGUI.updateHelicopter();
            if (!this.arm_help.visible) {
                this.timerCheckHelp++;
                if (this.timerCheckHelp > 240) {
                    this.updateArmHelp();
                    this.timerCheckHelp = 0
                }
            }
            this.timerCheckBuffer++;
            if (this.timerCheckBuffer > 12) {
                this.checkBuffer();
                this.timerCheckBuffer = 0
            }
            this.updateRedTintWall()
        }
    }
    timeToAddFreeBox() {
        if (this.isGoTutorial) return;
        if (MainGame.isApiBreakTime) return;
        var free_park_num = this.getFreeParking();
        if (free_park_num >= 0) {
            this.addObject({
                skinBox: true
            }, true);
            this.updateBoxHave()
        }
    }
    timeToHelicopter() {
        if (this.currentLevel < 2) return;
        if (!this.isShowHelicopter && !this.gameGUI.layerBoosterWindow.visible) {
            this.showHelicopter()
        }
    }
    showHelicopter() {
        this.gameGUI.showHelicopter()
    }
    goAllowAdsCar() {
        if (this.nextCarLevel < 6) return;
        if (this.ALLOW_ADS_CAR) return;
        this.ALLOW_ADS_CAR = true;
        this.num_ads_car = this.nextCarLevel - 4;
        this.gameGUI.updateShopItem();
        this.gameGUI.iconAdvShop.visible = true
    }
    updateAdsCar() {
        if (this.ALLOW_ADS_CAR) {
            this.num_ads_car = this.nextCarLevel - 4;
            this.gameGUI.updateShopItem()
        }
    }
    activateBoostCoins(vTime, isFromLoad) {
        vTime = vTime || this.TIME_BOOST_COINS;
        this.isBoostTimer = true;
        if (!isFromLoad && this.countDownBonusCoins > 0) {
            this.countDownBonusCoins += vTime;
            this.gameGUI.updateIndcatorBoostCoins(MainGame.secToHHMMSS(this.countDownBonusCoins));
            return
        }
        this.countDownBonusCoins = vTime;
        this.timerBonusCoins = this.time.addEvent({
            delay: 1e3,
            callback: this.updateTimerBonusCoins,
            callbackScope: this,
            loop: true
        });
        this.gameGUI.enableIndcatorBoostCoins(true);
        this.gameGUI.updateIndcatorBoostCoins(MainGame.secToHHMMSS(this.countDownBonusCoins));
        MainGame.Sfx.play("sound", "boost")
    }
    updateTimerBonusCoins() {
        this.countDownBonusCoins--;
        this.gameGUI.updateIndcatorBoostCoins(MainGame.secToHHMMSS(this.countDownBonusCoins));
        if (this.countDownBonusCoins == 0) {
            this.deactivateBoostCoins()
        }
        MainGame.cdBonusCoins = this.countDownBonusCoins
    }
    deactivateBoostCoins() {
        this.isBoostTimer = false;
        this.gameGUI.enableIndcatorBoostCoins(false);
        this.timerBonusCoins.remove()
    }
    activateBoostAutoMerge(vTime, isFromLoad) {
        vTime = vTime || this.TIME_BOOST_MERGE;
        this.isAutoMerge = true;
        if (!isFromLoad && this.countDownBonusAutoMerge > 0) {
            this.countDownBonusAutoMerge += vTime;
            this.gameGUI.updateIndcatorBoostAutoMerge(MainGame.secToHHMMSS(this.countDownBonusAutoMerge));
            return
        }
        this.countDownBonusAutoMerge = vTime;
        this.timerBonusAutoMerge = this.time.addEvent({
            delay: 1e3,
            callback: this.updateTimerBonusAutoMerge,
            callbackScope: this,
            loop: true
        });
        this.gameGUI.enableIndcatorBoostAutoMerge(true);
        this.gameGUI.updateIndcatorBoostAutoMerge(MainGame.secToHHMMSS(this.countDownBonusAutoMerge));
        MainGame.Sfx.play("sound", "boost")
    }
    updateTimerBonusAutoMerge() {
        this.countDownBonusAutoMerge--;
        this.gameGUI.updateIndcatorBoostAutoMerge(MainGame.secToHHMMSS(this.countDownBonusAutoMerge));
        if (this.countDownBonusAutoMerge == 0) {
            this.deactivateBoostAutoMerge()
        }
        MainGame.cdBonusMerge = this.countDownBonusAutoMerge
    }
    deactivateBoostAutoMerge() {
        this.isAutoMerge = false;
        this.gameGUI.enableIndcatorBoostAutoMerge(false);
        this.timerBonusAutoMerge.remove()
    }
    activateBoostSpeed(vTime, isFromLoad) {
        vTime = vTime || this.TIME_BOOST_SPEED;
        this.isDoubleSpeed = true;
        this.updateSpeedGame(this.isDoubleSpeed);
        if (!isFromLoad && this.countDownBonusSpeed > 0) {
            this.countDownBonusSpeed += vTime;
            this.gameGUI.updateIndcatorBoostSpeed(MainGame.secToHHMMSS(this.countDownBonusSpeed));
            return
        }
        this.countDownBonusSpeed = vTime;
        this.timerBonusSpeed = this.time.addEvent({
            delay: 1e3,
            callback: this.updateTimerBonusSpeed,
            callbackScope: this,
            loop: true
        });
        this.gameGUI.enableIndcatorBoostSpeed(true);
        this.gameGUI.updateIndcatorBoostSpeed(MainGame.secToHHMMSS(this.countDownBonusSpeed));
        MainGame.Sfx.play("sound", "boost")
    }
    updateTimerBonusSpeed() {
        this.countDownBonusSpeed--;
        this.gameGUI.updateIndcatorBoostSpeed(MainGame.secToHHMMSS(this.countDownBonusSpeed));
        if (this.countDownBonusSpeed == 0) {
            this.deactivateBoosSpeed()
        }
        MainGame.cdBonusSpeed = this.countDownBonusSpeed
    }
    deactivateBoosSpeed() {
        this.isDoubleSpeed = false;
        this.updateSpeedGame(this.isDoubleSpeed);
        this.gameGUI.enableIndcatorBoostSpeed(false);
        this.timerBonusSpeed.remove()
    }
    actionChangeParking(toParking, fromParking) {
        if (fromParking.obj == 0) return;
        fromParking.item.setViewAlpha(1);
        toParking.item.showObject();
        if (fromParking.battle && !toParking.battle) {
            fromParking.item.clearTarget()
        }
        toParking.busy = true;
        toParking.allow = true;
        toParking.obj = fromParking.obj;
        toParking.type = fromParking.type;
        toParking.item.setViewAngle(0);
        toParking.item.setSkinTower(toParking.type);
        toParking.icon_panel_number.visible = true;
        toParking.textNumberType.visible = true;
        this.setSpriteText(toParking.textNumberType, fromParking.type);
        if (toParking.id != fromParking.id) {
            fromParking.type = 0;
            fromParking.busy = false;
            fromParking.allow = true;
            fromParking.obj = 0;
            fromParking.icon_panel_number.visible = false;
            fromParking.textNumberType.visible = false;
            fromParking.item.hideItem()
        }
    }
    actionTrash(selectedParking) {
        var priceCar = this.getPriceCar(selectedParking.type);
        this.amount_coins += Math.round(priceCar * this.VALUE_SELL);
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm);
        this.gameGUI.updateShop(text_coins_warm);
        selectedParking.item.hideItem();
        selectedParking.busy = false;
        selectedParking.allow = true;
        selectedParking.obj = 0;
        selectedParking.type = 0;
        selectedParking.icon_panel_number.visible = false;
        selectedParking.textNumberType.visible = false;
        this.checkNextCar();
        MainGame.Sfx.play("sound", "remove_car")
    }
    addHpBar() {
        var obj1 = this.add.image(0, 0, "ss_main", "hp_bar1_0000");
        var obj2 = this.add.image(0, 0, "ss_main", "hp_bar2_0000");
        this.layerHpBars.add(obj1);
        this.layerHpBars.add(obj2);
        var bar_crop = new Phaser.Geom.Rectangle(0, 0, 0, obj2.height);
        obj2.setCrop(bar_crop);
        return {
            bar1: obj1,
            bar2: obj2,
            bar_crop: bar_crop
        }
    }
    initWave() {
        this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.wave_new.toUpperCase() + " " + this.num_wave);
        MainGame.Sfx.play("sound", "wave_start");
        this.updateSkillsButton();
        MainGame.api_analytics("Start", this.num_wave);
        this.wall_hp_start = this.wall_hp_max;
        this.wall_hp_dmg = 0;
        this.wave_squard = [];
        this.wave_step = 0;
        this.wave_length = 0;
        this.pass_spawn = 0;
        this.enemies_added = 0;
        this.enemies_killed = 0;
        this.coins_earned = 0;
        this.isWaveEnd = false;
        this.isGameOver = false;
        switch (this.num_wave) {
            case 1:
                this.wave_squard = [{
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 2,
                    t: 2
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 1,
                    t: 6
                }, {
                    s: 1,
                    t: 6
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 2,
                    t: 2
                }, {
                    s: 2,
                    t: 1
                }, {
                    s: 2,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 101
                }];
                break;
            case 2:
                this.wave_squard = [{
                    s: 6,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 6,
                    t: 2
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 2,
                    t: 1
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 51
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 4,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 2
                }, {
                    s: 5,
                    t: 4
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 2
                }, {
                    s: 8,
                    t: 4
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 102
                }];
                break;
            case 3:
                this.wave_squard = [{
                    s: 1,
                    t: 6
                }, {
                    s: 1,
                    t: 6
                }, {
                    s: 1,
                    t: 6
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 4,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 4
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 103
                }];
                break;
            case 4:
                this.wave_squard = [{
                    s: 7,
                    t: 1
                }, {
                    s: 12,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 12,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 12,
                    t: 2
                }, {
                    s: 2,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 11,
                    t: 1
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 11,
                    t: 1
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 11,
                    t: 1
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 11,
                    t: 1
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 2
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 51
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 104
                }];
                break;
            case 5:
                this.wave_squard = [{
                    s: 13,
                    t: 2
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 2
                }, {
                    s: 4,
                    t: 3
                }, {
                    s: 1,
                    t: 6
                }, {
                    s: 9,
                    t: 1
                }, {
                    s: 2,
                    t: 7
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 4
                }, {
                    s: 4,
                    t: 7
                }, {
                    s: 8,
                    t: 1
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 7
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 2
                }, {
                    s: 4,
                    t: 3
                }, {
                    s: 2,
                    t: 6
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 8,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 51
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 51
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 110
                }];
                break;
            case 6:
                this.wave_squard = [{
                    s: 13,
                    t: 1
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 8
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 8
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 13,
                    t: 1
                }, {
                    s: 12,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 13,
                    t: 1
                }, {
                    s: 4,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 1,
                    t: 6
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 52
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 8
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 8
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 13,
                    t: 1
                }, {
                    s: 12,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 13,
                    t: 1
                }, {
                    s: 5,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 2,
                    t: 6
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 5,
                    t: 1
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 107
                }];
                break;
            case 7:
                this.wave_squard = [{
                    s: 11,
                    t: 1
                }, {
                    s: 1,
                    t: 52
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 13,
                    t: 8
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 13,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 13,
                    t: 1
                }, {
                    s: 2,
                    t: 2
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 14,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 14,
                    t: 3
                }, {
                    s: 2,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 11,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 52
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 13,
                    t: 8
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 8,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 10,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 10,
                    t: 1
                }, {
                    s: 6,
                    t: 7
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 4,
                    t: 3
                }, {
                    s: 4,
                    t: 3
                }, {
                    s: 2,
                    t: 2
                }, {
                    s: 6,
                    t: 7
                }, {
                    s: 15,
                    t: 4
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 14,
                    t: 2
                }, {
                    s: 13,
                    t: 1
                }, {
                    s: 6,
                    t: 7
                }, {
                    s: 4,
                    t: 8
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 1,
                    t: 108
                }];
                break;
            case 8:
                this.wave_squard = [{
                    s: 16,
                    t: 1
                }, {
                    s: 3,
                    t: 3
                }, {
                    s: 4,
                    t: 6
                }, {
                    s: 9,
                    t: 1
                }, {
                    s: 9,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 7
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 6,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 2,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 2,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 2,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 2,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 2,
                    t: 1
                }, {
                    s: 3,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 3,
                    t: 4
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 53
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 10,
                    t: 3
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 1,
                    t: 8
                }, {
                    s: 8,
                    t: 8
                }, {
                    s: 5,
                    t: 4
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 2,
                    t: 7
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 5,
                    t: 4
                }, {
                    s: 6,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 4,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 8,
                    t: 8
                }, {
                    s: 8,
                    t: 8
                }, {
                    s: 10,
                    t: 1
                }, {
                    s: 15,
                    t: 8
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 5,
                    t: 4
                }, {
                    s: 5,
                    t: 4
                }, {
                    s: 1,
                    t: 111
                }];
                break;
            case 9:
                this.wave_squard = [{
                    s: 12,
                    t: 4
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 51
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 52
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 1,
                    t: 7
                }, {
                    s: 1,
                    t: 8
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 9,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 9,
                    t: 2
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 7,
                    t: 1
                }, {
                    s: 16,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 4,
                    t: 6
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 6,
                    t: 3
                }, {
                    s: 15,
                    t: 2
                }, {
                    s: 6,
                    t: 4
                }, {
                    s: 11,
                    t: 8
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 2,
                    t: 4
                }, {
                    s: 12,
                    t: 2
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 14,
                    t: 2
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 2,
                    t: 2
                }, {
                    s: 6,
                    t: 7
                }, {
                    s: 6,
                    t: 2
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 2,
                    t: 3
                }, {
                    s: 2,
                    t: 2
                }, {
                    s: 6,
                    t: 7
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 15,
                    t: 1
                }, {
                    s: 6,
                    t: 7
                }, {
                    s: 6,
                    t: 7
                }, {
                    s: 1,
                    t: 107
                }, {
                    s: 1,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 8
                }, {
                    s: 6,
                    t: 8
                }, {
                    s: 1,
                    t: 108
                }];
                break;
            case 10:
                this.wave_squard = [{
                    s: 9,
                    t: 4
                }, {
                    s: 7,
                    t: 6
                }, {
                    s: 7,
                    t: 6
                }, {
                    s: 7,
                    t: 6
                }, {
                    s: 7,
                    t: 6
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 13,
                    t: 11
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 12,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 9,
                    t: 1
                }, {
                    s: 10,
                    t: 1
                }, {
                    s: 11,
                    t: 1
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 13,
                    t: 11
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 12,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 9,
                    t: 1
                }, {
                    s: 10,
                    t: 1
                }, {
                    s: 11,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 16,
                    t: 4
                }, {
                    s: 1,
                    t: 3
                }, {
                    s: 16,
                    t: 8
                }, {
                    s: 5,
                    t: 11
                }, {
                    s: 1,
                    t: 6
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 12,
                    t: 1
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 53
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 6,
                    t: 3
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 11,
                    t: 8
                }, {
                    s: 8,
                    t: 11
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 111
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 11,
                    t: 7
                }, {
                    s: 8,
                    t: 11
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 111
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 11,
                    t: 8
                }, {
                    s: 8,
                    t: 11
                }, {
                    s: 0,
                    t: 0
                }, {
                    s: 1,
                    t: 111
                }];
                break;
            default:
                this.wave_squard = this.getGeneratedSquad(this.num_wave);
                break
        }
        this.wave_length = this.wave_squard.length;
        this.tickWave = 0;
        this.countEnemies = this.getCountEnemies();
        this.isFinishGame = false;
        this.gameGUI.updateWavePanel(this.num_wave);
        if (MainGame.isDebug) {
            this.debugCheckSave()
        }
    }
    toNewFormat() {
        var element = null;
        var str = "";
        for (var i = 0; i < this.wave_squard.length; i++) {
            element = this.wave_squard[i];
            if (element > 0) {
                if (element < 100) {
                    str += "{s:" + element + ",t:1},"
                } else {
                    str += "{s:1,t:110},"
                }
            } else {
                str += "{s:0,t:0},"
            }
        }
        console.log(str)
    }
    getCountEnemies() {
        var countMobs = 0;
        var countBosses = 0;
        var arCountMobs = [1, 2, 3, 2, 3, 3, 3, 4, 5, 5, 4, 5, 5, 5, 5, 9];
        var typeSquad = 0;
        var typeMob = 0;
        for (var i = 0; i < this.wave_squard.length; i++) {
            typeSquad = this.wave_squard[i].s;
            typeMob = this.wave_squard[i].t;
            if (typeMob >= 100) countBosses++;
            if (typeMob > 0 && typeMob < 100) {
                countMobs += arCountMobs[typeSquad - 1]
            }
        }
        return countMobs + countBosses
    }
    getGeneratedSquad(vNumWave) {
        var squad = [];
        var countLines = vNumWave - 3;
        if (countLines > 17) countLines = 17;
        var bossLines = 3;
        var mobsLine = [];
        var presets = [
            [{
                s: 1,
                t: 53
            }, {
                s: 1,
                t: 1
            }, {
                s: 1,
                t: 1
            }, {
                s: 1,
                t: 1
            }, {
                s: 1,
                t: 1
            }],
            [{
                s: 1,
                t: 51
            }, {
                s: 1,
                t: 1
            }, {
                s: 1,
                t: 1
            }, {
                s: 12,
                t: 3
            }, {
                s: 1,
                t: 1
            }],
            [{
                s: 1,
                t: 52
            }, {
                s: 1,
                t: 1
            }, {
                s: 1,
                t: 1
            }, {
                s: 12,
                t: 3
            }, {
                s: 1,
                t: 1
            }],
            [{
                s: 12,
                t: 4
            }, {
                s: 0,
                t: 0
            }, {
                s: 1,
                t: 51
            }, {
                s: 3,
                t: 3
            }, {
                s: 1,
                t: 53
            }, {
                s: 0,
                t: 0
            }, {
                s: 0,
                t: 0
            }],
            [{
                s: 12,
                t: 4
            }, {
                s: 0,
                t: 0
            }, {
                s: 1,
                t: 52
            }, {
                s: 3,
                t: 2
            }, {
                s: 1,
                t: 53
            }, {
                s: 0,
                t: 0
            }, {
                s: 0,
                t: 0
            }],
            [{
                s: 5,
                t: 6
            }, {
                s: 1,
                t: 3
            }, {
                s: 13,
                t: 11
            }, {
                s: 1,
                t: 3
            }, {
                s: 1,
                t: 3
            }],
            [{
                s: 3,
                t: 1
            }, {
                s: 2,
                t: 6
            }, {
                s: 3,
                t: 4
            }, {
                s: 3,
                t: 1
            }, {
                s: 2,
                t: 6
            }],
            [{
                s: 12,
                t: 1
            }, {
                s: 5,
                t: 1
            }, {
                s: 4,
                t: 1
            }, {
                s: 5,
                t: 1
            }, {
                s: 1,
                t: 1
            }],
            [{
                s: 12,
                t: 1
            }, {
                s: 5,
                t: 3
            }, {
                s: 4,
                t: 2
            }, {
                s: 5,
                t: 3
            }, {
                s: 1,
                t: 1
            }],
            [{
                s: 12,
                t: 1
            }, {
                s: 5,
                t: 7
            }, {
                s: 4,
                t: 7
            }, {
                s: 5,
                t: 7
            }, {
                s: 1,
                t: 1
            }],
            [{
                s: 12,
                t: 1
            }, {
                s: 5,
                t: 8
            }, {
                s: 4,
                t: 8
            }, {
                s: 5,
                t: 8
            }, {
                s: 1,
                t: 1
            }],
            [{
                s: 12,
                t: 1
            }, {
                s: 12,
                t: 1
            }, {
                s: 0,
                t: 0
            }, {
                s: 13,
                t: 11
            }, {
                s: 0,
                t: 0
            }],
            [{
                s: 13,
                t: 11
            }, {
                s: 13,
                t: 11
            }, {
                s: 15,
                t: 3
            }, {
                s: 1,
                t: 1
            }, {
                s: 1,
                t: 51
            }],
            [{
                s: 14,
                t: 2
            }, {
                s: 5,
                t: 3
            }, {
                s: 8,
                t: 3
            }, {
                s: 2,
                t: 2
            }, {
                s: 6,
                t: 7
            }],
            [{
                s: 16,
                t: 8
            }, {
                s: 7,
                t: 1
            }, {
                s: 6,
                t: 7
            }, {
                s: 6,
                t: 3
            }, {
                s: 6,
                t: 2
            }],
            [{
                s: 6,
                t: 4
            }, {
                s: 15,
                t: 8
            }, {
                s: 11,
                t: 1
            }, {
                s: 15,
                t: 1
            }, {
                s: 15,
                t: 2
            }],
            [{
                s: 6,
                t: 4
            }, {
                s: 15,
                t: 7
            }, {
                s: 11,
                t: 1
            }, {
                s: 15,
                t: 1
            }, {
                s: 15,
                t: 2
            }],
            [{
                s: 9,
                t: 1
            }, {
                s: 10,
                t: 4
            }, {
                s: 11,
                t: 1
            }, {
                s: 9,
                t: 4
            }, {
                s: 11,
                t: 1
            }],
            [{
                s: 9,
                t: 1
            }, {
                s: 10,
                t: 8
            }, {
                s: 11,
                t: 7
            }, {
                s: 9,
                t: 8
            }, {
                s: 11,
                t: 7
            }],
            [{
                s: 9,
                t: 3
            }, {
                s: 10,
                t: 2
            }, {
                s: 11,
                t: 1
            }, {
                s: 9,
                t: 3
            }, {
                s: 11,
                t: 2
            }],
            [{
                s: 16,
                t: 4
            }, {
                s: 15,
                t: 3
            }, {
                s: 15,
                t: 8
            }, {
                s: 5,
                t: 11
            }, {
                s: 1,
                t: 6
            }],
            [{
                s: 15,
                t: 4
            }, {
                s: 15,
                t: 8
            }, {
                s: 8,
                t: 1
            }, {
                s: 15,
                t: 1
            }, {
                s: 10,
                t: 2
            }],
            [{
                s: 15,
                t: 4
            }, {
                s: 15,
                t: 7
            }, {
                s: 8,
                t: 1
            }, {
                s: 15,
                t: 1
            }, {
                s: 10,
                t: 3
            }]
        ];
        var countMobs = 0;
        var typeSquad = 0;
        var typeMob = 0;
        var arCountMobs = [1, 2, 3, 2, 3, 3, 3, 4, 5, 5, 4, 5, 5, 5, 5, 9];
        var len_prst = 0;
        var countPresets = presets.length - 1;
        var r1 = 0;
        var r2 = 0;
        for (var i = 0; i < countLines; i++) {
            mobsLine = [];
            r1 = MyMath.getRandomInt(0, countPresets);
            mobsLine = mobsLine.concat(presets[r1]);
            mobsLine = mobsLine.concat([{
                s: 0,
                t: 0
            }]);
            squad = squad.concat(mobsLine);
            len_prst = presets[r1].length;
            for (var j = 0; j < len_prst; j++) {
                typeSquad = presets[r1][j].s;
                typeMob = presets[r1][j].t;
                if (typeMob > 0 && typeMob < 20) {
                    var count = arCountMobs[typeSquad - 1];
                    countMobs += count
                }
            }
            if (countMobs > 230) {
                break
            }
        }
        for (var i = 0; i < bossLines; i++) {
            mobsLine = [];
            r1 = MyMath.getRandomInt(14, 22);
            mobsLine = mobsLine.concat(presets[r1]);
            var boss = MyMath.randomChoice([101, 102, 103, 104, 107, 108, 110, 111]);
            mobsLine = mobsLine.concat([{
                s: 1,
                t: boss
            }, {
                s: 0,
                t: 0
            }, {
                s: 0,
                t: 0
            }]);
            squad = squad.concat(mobsLine)
        }
        return squad
    }
    testWave(vNumWave) {
        this.getGeneratedSquad(vNumWave)
    }
    debugShowWaveInfo(vWaveSquard, vNumWave) {
        var countMobs = 0;
        var countBosses = 0;
        var timeWave = 0;
        var times = [1, 1, 1, 1, 1, 1, 2, 3, 2, 3, 3, 3, 1, 2, 2, 3, 3];
        var arCountMobs = [1, 2, 3, 2, 3, 3, 3, 4, 5, 5, 4, 5, 5, 5, 5, 9];
        var typeSquad = 0;
        var typeMob = 0;
        for (var i = 0; i < vWaveSquard.length; i++) {
            typeSquad = vWaveSquard[i].s;
            typeMob = vWaveSquard[i].t;
            if (typeMob >= 100) {
                timeWave += times[1] * .92
            } else {
                timeWave += times[typeSquad] * .92
            }
            if (typeMob >= 100) countBosses++;
            if (typeMob > 0 && typeMob < 20) {
                countMobs += arCountMobs[typeSquad - 1]
            }
        }
        var coins1 = this.getCountMobCoins(vNumWave) * countMobs;
        var coins2 = this.getCountBossCoins(vNumWave) * countBosses;
        var total_coins = coins1 + coins2;
        var hpMobs = this.getCountMobHp(vNumWave);
        var hpBoss = this.getCountBossHp(vNumWave);
        var timeWaveS = Math.round((timeWave + Number.EPSILON) * 100) / 100;
        var timeWaveM = Math.round((timeWave / 60 + Number.EPSILON) * 100) * .01;
        console.log("====================");
        console.log("timeWave: ", timeWaveS + "s", "(~" + timeWaveM + "m)");
        console.log("countMobs", countMobs);
        console.log("====================")
    }
    updateWave() {
        this.tickWave += this.WAVE_INC;
        if (this.tickWave >= 55) {
            this.spawnWave();
            this.tickWave = 0
        }
    }
    nextWave() {
        this.time.delayedCall(500, this.initWave, [], this)
    }
    resetGame() {
        this.isGameOver = false;
        this.wall_hp = this.wall_hp_max;
        this.updateWallHp(0);
        this.wall.setFrame("wall_0000");
        this.wall.setOrigin(.5);
        this.isWallTweening = false;
        this.wall.setTint(16777215);
        this.setFiresWall()
    }
    launchEnemyBomb(vType, vWeaponSkin, vX, vY, vDamage) {
        var posRocketY = 0;
        var posX = this.WALL_X + 2 * MyMath.getRandomInt(-5, 5);
        var durationShell_1 = 1;
        var durationShell_2 = 1;
        var durationShell_3 = 1;
        if (vType == 1) {
            posRocketY = vY - 65;
            var skin = 1;
            if (vWeaponSkin == 39) skin = 1;
            if (vWeaponSkin == 40) skin = 2;
            if (vWeaponSkin == 41) skin = 3;
            var effect = this.showEffect(vX + 50, posRocketY, "rocket_e" + skin, true);
            if (effect == null) return;
            effect.angle = -20;
            this.tweens.killTweensOf(effect);
            effect.damage = vDamage;
            effect.typeBomb = "rocket";
            durationShell_1 = 600 / this.WAVE_INC;
            durationShell_2 = 300 / this.WAVE_INC;
            durationShell_3 = 400 / this.WAVE_INC;
            this.tweens.add({
                targets: effect,
                x: posX,
                ease: Phaser.Math.Easing.Sine.In,
                duration: durationShell_1,
                onComplete: this.finishEnemyBomb,
                onCompleteScope: this
            });
            this.tweens.add({
                targets: effect,
                y: posRocketY - 20,
                ease: Phaser.Math.Easing.Quadratic.Out,
                duration: durationShell_2,
                onComplete: this.finishMoveRocket,
                onCompleteScope: this
            });
            this.tweens.add({
                targets: effect,
                angle: 10,
                ease: "Linear",
                delay: 100,
                duration: durationShell_3
            })
        } else if (vType == 2) {
            posRocketY = vY - 50;
            var skin = 1;
            if (vWeaponSkin == 42) skin = 1;
            if (vWeaponSkin == 43) skin = 2;
            if (vWeaponSkin == 44) skin = 3;
            var effect = this.showEffect(vX + 50, posRocketY, "grenade_e" + skin, true);
            if (effect == null) return;
            effect.angle = 45;
            var rocketAngle = 180 + 5 * MyMath.getRandomInt(0, 10);
            this.tweens.killTweensOf(effect);
            effect.damage = vDamage;
            effect.typeBomb = "grenade";
            durationShell_1 = 600 / this.WAVE_INC;
            durationShell_2 = 300 / this.WAVE_INC;
            durationShell_3 = 600 / this.WAVE_INC;
            this.tweens.add({
                targets: effect,
                x: posX,
                ease: "Linear",
                duration: durationShell_1,
                onComplete: this.finishEnemyBomb,
                onCompleteScope: this
            });
            this.tweens.add({
                targets: effect,
                y: posRocketY - 50,
                ease: Phaser.Math.Easing.Quadratic.Out,
                duration: durationShell_2,
                onComplete: this.finishMoveGrenade,
                onCompleteScope: this
            });
            this.tweens.add({
                targets: effect,
                angle: rocketAngle,
                ease: "Linear",
                duration: durationShell_3
            })
        }
    }
    finishMoveRocket(e) {
        var target = e.targets[0];
        var durationShell = 300 / this.WAVE_INC;
        this.tweens.add({
            targets: target,
            y: target.y + 30,
            ease: Phaser.Math.Easing.Quadratic.In,
            duration: durationShell
        })
    }
    finishMoveGrenade(e) {
        var target = e.targets[0];
        var durationShell = 300 / this.WAVE_INC;
        this.tweens.add({
            targets: target,
            y: target.y + 60,
            ease: Phaser.Math.Easing.Quadratic.In,
            duration: durationShell
        })
    }
    finishEnemyBomb(e) {
        var target = e.targets[0];
        target.hide();
        if (target.typeBomb == "grenade") {
            this.showEffect(target.x - 15, target.y + 10, "explosion2")
        } else if (target.typeBomb == "rocket") {
            this.showEffect(target.x, target.y - 35, "explosion2")
        }
        var r = MyMath.getRandomInt(1, 4);
        MainGame.Sfx.play("sound", "exposion" + r);
        this.showWallJelly();
        this.updateWallHp(target.damage)
    }
    showWallBoom() {
        var posX = 0;
        var posY = 0;
        var arPosY = [];
        for (var i = 0; i < 6; i++) {
            arPosY.push(50 + i * 70)
        }
        MyMath.shuffleArr(arPosY);
        for (var i = 0; i < 6; i++) {
            posX = 650 + MyMath.getRandomInt(-5, 5) * 2;
            posY = arPosY[i] + MyMath.getRandomInt(-5, 5) * 2;
            this.time.delayedCall(50 + 50 * i, this.showEffect, [posX, posY, "explosion2"], this)
        }
        this.time.delayedCall(350, this.showWallBroken, [], this)
    }
    showWallBroken() {
        this.wall.setFrame("wall_broken_0000");
        this.wall.setOrigin(.64, .48)
    }
    defeatWave() {
        this.isGameOver = true;
        this.enemies_added = 0;
        this.enemies_killed = 0;
        this.hideFiresWall();
        this.showWallBoom();
        this.resetSkills();
        var r = MyMath.getRandomInt(1, 4);
        MainGame.Sfx.play("sound", "exposion" + r);
        MainGame.api_analytics("Fail", this.num_wave);
        this.countDefeat++;
        if (this.countDefeat == 2) {
            MainGame.api_analytics("DEFEAT2ROW", this.num_wave)
        }
        this.time.delayedCall(500, this.playSfxAfterExposion, [], this);
        this.time.delayedCall(2e3, this.detroyEnemies, [], this);
        this.time.delayedCall(2500, this.showPopupDefeat, [], this)
    }
    playSfxAfterExposion() {
        MainGame.Sfx.play("sound", "after_exposion")
    }
    checkWallUpgrade() {
        var price = this.getPriceWall();
        price = Math.round(price * this.factorDiscount);
        this.gameGUI.showIconAdvWall(this.amount_coins >= price);
        return this.amount_coins >= price
    }
    checkPrivilegesPrice() {
        var itemInfo = null;
        var itemNum = 0;
        var value_level = 0;
        var priceItem1 = 0;
        var priceItem2 = 0;
        var priceItem3 = 0;
        var price1 = false;
        var price2 = false;
        var price3 = false;
        value_level = this.levelCannonDmg;
        if (value_level < 10) {
            itemInfo = this.arLevelCannonDmg[value_level - 1];
            priceItem1 = Math.round(itemInfo.price * this.factorDiscount);
            price1 = this.amount_coins >= priceItem1;
            this.itemPrivilege1.btn.setEnable(price1);
            if (price1) itemNum = 1
        }
        value_level = this.levelDiscount;
        if (value_level < 10) {
            itemInfo = this.arLevelDiscount[value_level - 1];
            priceItem1 = Math.round(itemInfo.price * this.factorDiscount);
            price2 = this.amount_coins >= priceItem1;
            this.itemPrivilege2.btn.setEnable(price2);
            if (price2) itemNum = 2
        }
        value_level = this.levelEarning;
        if (value_level < 10) {
            itemInfo = this.arLevelEarning[value_level - 1];
            priceItem3 = Math.round(itemInfo.price * this.factorDiscount);
            price3 = this.amount_coins >= priceItem3;
            this.itemPrivilege3.btn.setEnable(price3);
            if (price3) itemNum = 3
        }
        this.gameGUI.showIconAdvUpgrades(price1 || price2 || price3);
        return itemNum
    }
    addCoins(vValue) {
        var coins = vValue;
        coins = Math.floor(coins * this.factorEarning);
        if (this.isBoostTimer) coins *= this.value_boost;
        this.amount_coins += coins;
        this.coins_earned += coins;
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm);
        this.gameGUI.updateShop(text_coins_warm);
        this.checkWallUpgrade()
    }
    enemyKilled(vType, vIsSkipCoin) {
        this.enemies_killed++;
        if (!vIsSkipCoin) {
            var coins = this.getCountMobCoins(this.num_wave);
            if (vType >= 100) coins = this.getCountBossCoins(this.num_wave);
            this.addCoins(coins)
        }
        if (!this.isGameOver && !this.isFinishGame && this.enemies_killed >= this.countEnemies) {
            if (MainGame.isDebug) {
                this.debugCheckSave()
            }
            this.countDefeat = 0;
            MainGame.api_analytics("Complete", this.num_wave);
            var diffValue = this.getDifficulty();
            this.checkResultWave(diffValue, this.num_wave);
            MainGame.api_analytics("Difficulty", diffValue);
            this.num_wave++;
            this.saveGameValues();
            this.time.delayedCall(900, this.showPopupWin, [], this);
            this.isFinishGame = true;
            this.resetSkills()
        }
    }
    getDifficulty() {
        var value = "";
        if (this.wall_hp_dmg > this.wall_hp_start * .7) {
            value = "HARD"
        } else if (this.wall_hp_dmg < this.wall_hp_start * .15) {
            value = "EASY"
        } else {
            value = "NORMAL"
        }
        return value
    }
    showPopupWin() {
        MainGame.Sfx.play("sound", "wave_finish");
        this.gameGUI.showFinishWindow(true)
    }
    showPopupDefeat() {
        MainGame.Sfx.play("sound", "wave_defeat");
        this.gameGUI.showFinishWindow(false)
    }
    closeFinishWindow(vIsSkip) {
        if (MainGame.isAPI) {
            if (vIsSkip) {
                this.setGameLogicPause(false)
            } else {
                MainGame.API_POKI.commercialBreak()
            }
        } else {
            this.setGameLogicPause(false)
        }
        this.gameGUI.enableMainButtons();
        this.nextWave();
        if (!vIsSkip) MainGame.api_analytics("ClickNoThanks")
    }
    clickContinueDefeat() {
        if (MainGame.isAPI) {
            MainGame.API_POKI.commercialBreak()
        } else {
            this.setGameLogicPause(false)
        }
        this.gameGUI.enableMainButtons();
        this.resetGame();
        this.time.delayedCall(500, this.initWave, [], this)
    }
    debugCheckSave() {
        if (MainGame.isDebug && !MainGame.isNoSave && MainGame.NUM_WAVE_SAVE < this.num_wave) {
            console.log("[STOP SAVE]");
            MainGame.isNoSave = true
        }
    }
    spawnWave() {
        if (this.wave_step == this.wave_length) {
            this.isWaveEnd = true
        } else {
            this.pass_spawn--;
            if (this.pass_spawn <= 0) {
                this.addSquad(this.wave_squard[this.wave_step++])
            }
            this.gameGUI.updateWaveBar(this.wave_step / this.wave_length)
        }
    }
    detroyEnemies() {
        this.enemies.releaseAll()
    }
    addSquad(vInfo) {
        var typeMob = vInfo.t;
        var typeSquad = vInfo.s;
        if (typeMob == 0 && typeSquad != 0) {
            console.log("[ERROR addSquad]", "wave_step", this.wave_step, "typeMob : ", typeMob, "typeSquad: ", typeSquad);
            return
        }
        if (typeMob != 0 && typeSquad == 0) {
            console.log("[ERROR addSquad]", "wave_step", this.wave_step, "typeMob : ", typeMob, "typeSquad: ", typeSquad);
            return
        }
        var posX = -60;
        var posY = 35;
        var startY = 25;
        var lineY = 35;
        var ofsX = 55;
        var ofsY = 55;
        var arrY = [4, 5, 6, 7, 8, 9, 10];
        if (typeMob == 0) {
            this.pass_spawn = 2;
            return
        }
        if (typeMob >= 100) {
            posY = startY + MyMath.getRandomInt(5, 9) * lineY;
            this.addEnemy(posX, posY, typeMob);
            this.pass_spawn = 1;
            return
        }
        switch (typeSquad) {
            case 1:
                posY = startY + MyMath.getRandomInt(3, 10) * lineY;
                this.addEnemy(posX, posY, typeMob);
                this.pass_spawn = 1;
                break;
            case 2:
                startY = 75;
                MyMath.shuffleArr(arrY);
                posY = startY + arrY[0] * lineY - ofsY;
                this.addEnemy(posX, posY, typeMob);
                posY = startY + arrY[1] * lineY - ofsY;
                this.addEnemy(posX, posY, typeMob);
                this.pass_spawn = 1;
                break;
            case 3:
                startY = 75;
                MyMath.shuffleArr(arrY);
                posY = startY + arrY[0] * lineY - ofsY;
                this.addEnemy(posX, posY, typeMob);
                posY = startY + arrY[1] * lineY - ofsY;
                this.addEnemy(posX, posY, typeMob);
                posY = startY + arrY[2] * lineY - ofsY;
                this.addEnemy(posX, posY, typeMob);
                this.pass_spawn = 1;
                break;
            case 4:
                posY = startY + MyMath.getRandomInt(4, 9) * lineY;
                this.addEnemy(posX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY + ofsY, typeMob);
                this.pass_spawn = 1;
                break;
            case 5:
                posY = startY + MyMath.getRandomInt(4, 9) * lineY;
                this.addEnemy(posX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX, posY + ofsY, typeMob);
                this.pass_spawn = 1;
                break;
            case 6:
                posY = startY + MyMath.getRandomInt(4, 9) * lineY;
                this.addEnemy(posX - ofsX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY + ofsY, typeMob);
                this.pass_spawn = 2;
                break;
            case 7:
                posY = startY + MyMath.getRandomInt(4, 9) * lineY;
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX - ofsX * 1, posY, typeMob);
                this.addEnemy(posX - ofsX * 2, posY, typeMob);
                this.pass_spawn = 3;
                break;
            case 8:
                posY = startY + MyMath.getRandomInt(4, 9) * lineY;
                this.addEnemy(posX - ofsX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY + ofsY, typeMob);
                this.pass_spawn = 2;
                break;
            case 9:
                posY = startY + MyMath.getRandomInt(4, 9) * lineY;
                this.addEnemy(posX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY + ofsY, typeMob);
                this.addEnemy(posX - ofsX, posY, typeMob);
                this.addEnemy(posX - ofsX * 2, posY - ofsY, typeMob);
                this.addEnemy(posX - ofsX * 2, posY + ofsY, typeMob);
                this.pass_spawn = 3;
                break;
            case 10:
                posY = startY + MyMath.getRandomInt(4, 9) * lineY;
                this.addEnemy(posX - ofsX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY + ofsY, typeMob);
                this.addEnemy(posX - ofsX * 2, posY, typeMob);
                this.pass_spawn = 3;
                break;
            case 11:
                posY = startY + MyMath.getRandomInt(4, 9) * lineY;
                this.addEnemy(posX - ofsX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY + ofsY, typeMob);
                this.addEnemy(posX - ofsX * 2, posY, typeMob);
                this.pass_spawn = 3;
                break;
            case 12:
                posY = startY + MyMath.getRandomInt(5, 9) * lineY;
                this.addEnemy(posX, posY - ofsY * 2, typeMob);
                this.addEnemy(posX, posY - ofsY * 1, typeMob);
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX, posY + ofsY * 1, typeMob);
                this.addEnemy(posX, posY + ofsY * 2, typeMob);
                this.pass_spawn = 1;
                break;
            case 13:
                posY = startY + MyMath.getRandomInt(5, 9) * lineY;
                this.addEnemy(posX - ofsX, posY - ofsY * 2, typeMob);
                this.addEnemy(posX, posY - ofsY * 1, typeMob);
                this.addEnemy(posX - ofsX, posY, typeMob);
                this.addEnemy(posX, posY + ofsY * 1, typeMob);
                this.addEnemy(posX - ofsX, posY + ofsY * 2, typeMob);
                this.pass_spawn = 2;
                break;
            case 14:
                posY = startY + MyMath.getRandomInt(5, 9) * lineY;
                this.addEnemy(posX, posY - ofsY * 2, typeMob);
                this.addEnemy(posX - ofsX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY + ofsY, typeMob);
                this.addEnemy(posX, posY + ofsY * 2, typeMob);
                this.pass_spawn = 2;
                break;
            case 15:
                posY = startY + MyMath.getRandomInt(5, 9) * lineY;
                this.addEnemy(posX - ofsX * 2, posY - ofsY * 2, typeMob);
                this.addEnemy(posX - ofsX, posY - ofsY, typeMob);
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY + ofsY, typeMob);
                this.addEnemy(posX - ofsX * 2, posY + ofsY * 2, typeMob);
                this.pass_spawn = 3;
                break;
            case 16:
                posY = startY + MyMath.getRandomInt(5, 9) * lineY;
                this.addEnemy(posX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY - ofsY, typeMob);
                this.addEnemy(posX - ofsX, posY, typeMob);
                this.addEnemy(posX - ofsX, posY + ofsY, typeMob);
                this.addEnemy(posX - ofsX * 2, posY, typeMob);
                this.addEnemy(posX - ofsX * 2, posY - ofsY * 2, typeMob);
                this.addEnemy(posX - ofsX * 2, posY - ofsY * 1, typeMob);
                this.addEnemy(posX - ofsX * 2, posY + ofsY * 1, typeMob);
                this.addEnemy(posX - ofsX * 2, posY + ofsY * 2, typeMob);
                this.pass_spawn = 3;
                break
        }
    }
    getSkinWeapon(vType, vOffset) {
        var wp = 1;
        switch (vType) {
            case 1:
            case 101:
                wp = vOffset * 5 + MyMath.getRandomInt(1, 5);
                break;
            case 2:
            case 102:
                wp = vOffset * 5 + MyMath.getRandomInt(1, 2);
                break;
            case 3:
            case 103:
                wp = vOffset * 5 + MyMath.getRandomInt(3, 5);
                break;
            case 4:
            case 104:
                wp = vOffset * 5 + MyMath.getRandomInt(1, 5);
                break;
            case 6:
            case 106:
                if (vOffset == 0 || vOffset == 1) wp = 36;
                if (vOffset == 2 || vOffset == 3) wp = 37;
                if (vOffset >= 4) wp = 38;
                break;
            case 7:
            case 107:
                if (vOffset == 0 || vOffset == 1) wp = 39;
                if (vOffset == 2 || vOffset == 3) wp = 40;
                if (vOffset >= 4) wp = 41;
                break;
            case 8:
            case 108:
                if (vOffset == 0 || vOffset == 1) wp = 42;
                if (vOffset == 2 || vOffset == 3) wp = 43;
                if (vOffset >= 4) wp = 44;
                break;
            case 11:
            case 111:
                if (vOffset <= 2) wp = 45;
                if (vOffset == 3 || vOffset == 4) wp = 46;
                if (vOffset >= 5) wp = 47;
                break
        }
        return wp
    }
    getSkinData(vType) {
        var offset = 0;
        var skin_weapon = 1;
        var skin_hat = 1;
        var skin_shield = 1;
        var skin_desant = 1;
        var skin_body = 1;
        var skin_chest = 1;
        var skin_shoulder = 1;
        var skin_forearm = 1;
        var skin_hip = 1;
        var skin_leg = 1;
        var skin_boot = 1;
        switch (this.num_wave) {
            case 1:
            case 2:
            case 3:
                offset = 0;
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 2]);
                skin_chest = MyMath.randomChoice([0, 2, 3]);
                break;
            case 4:
            case 5:
            case 6:
                offset = MyMath.getRandomInt(0, 1);
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 2, 5]);
                skin_chest = MyMath.randomChoice([0, 2, 3, 4]);
                skin_forearm = MyMath.randomChoice([0, 4]);
                if (skin_body == 5) skin_chest = 5;
                break;
            case 7:
            case 8:
            case 9:
                offset = 1;
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 2, 5]);
                skin_chest = MyMath.randomChoice([0, 2, 3, 4]);
                skin_forearm = MyMath.randomChoice([0, 4]);
                if (skin_body == 5) skin_chest = 5;
                break;
            case 10:
            case 11:
            case 12:
                offset = MyMath.getRandomInt(1, 2);
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 5, 6]);
                skin_chest = MyMath.randomChoice([0, 4]);
                skin_shoulder = MyMath.randomChoice([0, 6]);
                skin_forearm = MyMath.randomChoice([0, 4, 6]);
                skin_hip = MyMath.randomChoice([0, 6]);
                skin_leg = MyMath.randomChoice([0, 6, 7]);
                if (skin_body == 5) skin_chest = 5;
                if (skin_body == 6) skin_chest = 6;
                break;
            case 13:
            case 14:
            case 15:
                offset = 2;
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 5, 6]);
                skin_chest = MyMath.randomChoice([0, 4]);
                skin_shoulder = MyMath.randomChoice([0, 6]);
                skin_forearm = MyMath.randomChoice([0, 4, 6]);
                skin_hip = MyMath.randomChoice([0, 6]);
                skin_leg = MyMath.randomChoice([0, 6, 7]);
                if (skin_body == 5) skin_chest = 5;
                if (skin_body == 6) skin_chest = 6;
                break;
            case 16:
            case 17:
            case 18:
                offset = MyMath.getRandomInt(2, 3);
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 6]);
                skin_chest = MyMath.randomChoice([0, 8]);
                skin_shoulder = MyMath.randomChoice([0, 6, 8, 9, 10]);
                skin_forearm = MyMath.randomChoice([0, 6, 8, 9]);
                skin_hip = MyMath.randomChoice([0, 6, 8]);
                skin_leg = MyMath.randomChoice([0, 6, 7, 8]);
                if (skin_body == 6) skin_chest = 6;
                break;
            case 19:
            case 20:
            case 21:
                offset = 3;
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 6]);
                skin_chest = MyMath.randomChoice([0, 8]);
                skin_shoulder = MyMath.randomChoice([0, 6, 8, 9, 10]);
                skin_forearm = MyMath.randomChoice([0, 6, 8, 9]);
                skin_hip = MyMath.randomChoice([0, 6, 8]);
                skin_leg = MyMath.randomChoice([0, 6, 7, 8]);
                if (skin_body == 6) skin_chest = 6;
                break;
            case 22:
            case 23:
            case 24:
                offset = MyMath.getRandomInt(3, 4);
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 11]);
                skin_chest = MyMath.randomChoice([0, 8]);
                skin_shoulder = MyMath.randomChoice([0, 8, 9, 10, 11]);
                skin_forearm = MyMath.randomChoice([0, 8, 9]);
                skin_hip = MyMath.randomChoice([0, 8, 11]);
                skin_leg = MyMath.randomChoice([0, 8, 11]);
                if (skin_body == 11) skin_chest = 11;
                break;
            case 25:
            case 26:
            case 27:
                offset = 4;
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 11]);
                skin_chest = MyMath.randomChoice([0, 8]);
                skin_shoulder = MyMath.randomChoice([0, 8, 9, 10, 11]);
                skin_forearm = MyMath.randomChoice([0, 8, 9]);
                skin_hip = MyMath.randomChoice([0, 8, 11]);
                skin_leg = MyMath.randomChoice([0, 8, 11]);
                if (skin_body == 11) skin_chest = 11;
                break;
            case 28:
            case 29:
            case 30:
                offset = MyMath.getRandomInt(4, 5);
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 11, 12]);
                skin_chest = 1;
                skin_shoulder = MyMath.randomChoice([0, 11, 12, 13]);
                skin_forearm = MyMath.randomChoice([0, 11, 12]);
                skin_hip = MyMath.randomChoice([0, 11, 12]);
                skin_leg = MyMath.randomChoice([0, 11, 12]);
                skin_boot = MyMath.randomChoice([0, 12]);
                if (skin_body == 11) skin_chest = 11;
                if (skin_body == 12) skin_chest = 12;
                if (skin_shoulder == 13) skin_forearm = 13;
                break;
            default:
                offset = 5;
                skin_weapon = this.getSkinWeapon(vType, offset);
                skin_hat = 5 * offset + MyMath.getRandomInt(0, 6);
                skin_shield = 2 * offset + MyMath.getRandomInt(1, 2);
                skin_desant = skin_shield;
                skin_body = MyMath.randomChoice([0, 11, 12]);
                skin_chest = 1;
                skin_shoulder = MyMath.randomChoice([0, 11, 12, 13]);
                skin_forearm = MyMath.randomChoice([0, 11, 12]);
                skin_hip = MyMath.randomChoice([0, 11, 12]);
                skin_leg = MyMath.randomChoice([0, 11, 12]);
                skin_boot = MyMath.randomChoice([0, 12]);
                if (skin_body == 11) skin_chest = 11;
                if (skin_body == 12) skin_chest = 12;
                if (skin_shoulder == 13) skin_forearm = 13;
                break
        }
        return {
            skin_weapon: skin_weapon,
            skin_hat: skin_hat,
            skin_chest: skin_chest,
            skin_body: skin_body,
            skin_shield: skin_shield,
            skin_desant: skin_desant,
            skin_shoulder: skin_shoulder,
            skin_forearm: skin_forearm,
            skin_hip: skin_hip,
            skin_leg: skin_leg,
            skin_boot: skin_boot
        }
    }
    addMobFromCar(vX, vY, vType, vOption) {
        this.addEnemy(vX + 80, vY + 20, vType, vOption);
        this.countEnemies++
    }
    addEnemy(vX, vY, vType, vOption) {
        var bot = this.enemies.getFree();
        if (bot) {
            var posX = vX || -60;
            var posY = vY || 35 + MyMath.getRandomInt(1, 10) * 35;
            var skin_data = this.getSkinData(vType);
            bot.setNewBot(this.enemies_added, posX, posY, skin_data, vType, vOption, this.num_wave);
            this.enemies_added++
        }
    }
    getEnemy(x, y, distance) {
        var enemyUnits = this.enemies.getChildren();
        var enemy = null;
        var closestEnemy = null;
        var distClosest = 0;
        var dist = 0;
        for (var i = 0; i < enemyUnits.length; i++) {
            enemy = enemyUnits[i];
            if (enemy.active && (enemy.x > this.START_ENEMY_X || enemy.isDamaged()) && !enemy.isUnderAttack) {
                if (enemy.timeLife > distClosest) {
                    closestEnemy = enemy;
                    distClosest = enemy.timeLife
                }
            }
        }
        if (closestEnemy) {
            return closestEnemy
        }
        return false
    }
    initPoolEffects() {
        this.effects = this.add.group({
            classType: Effect,
            maxSize: this.MAX_POOL_EFFECTS
        })
    }
    initPoolEnemies() {
        this.enemies = new Pool(this, this.layerSpine, this.MAX_POOL_ENEMIES)
    }
    addDmgText() {
        var txt = this.add.bitmapText(100, 100, MainGame.fontName, "123");
        txt.setFontSize(22);
        txt.setOrigin(.5);
        txt.setDropShadow(-2, 2, 0, .6);
        txt.visible = false;
        this.layerDmgText.add(txt);
        return txt
    }
    showDmgText(vX, vY, vObjText, vValue) {
        var obj = vObjText;
        obj.visible = true;
        obj.x = vX;
        obj.y = vY - 40;
        var text_coins_warm = MainGame.convertNumberFormat(vValue);
        obj.setText(text_coins_warm);
        this.tweens.killTweensOf(obj);
        obj.setAlpha(.2);
        obj.setScale(.6);
        this.tweens.add({
            targets: obj,
            alpha: 1,
            ease: "Linear",
            duration: 300
        });
        this.tweens.add({
            targets: obj,
            scaleX: 1,
            scaleY: 1,
            ease: "Linear",
            duration: 300
        });
        this.tweens.add({
            targets: obj,
            alpha: 0,
            ease: "Linear",
            delay: 400,
            duration: 300,
            onComplete: function() {
                obj.visible = false
            }
        });
        this.tweens.add({
            targets: obj,
            y: obj.y - 30,
            ease: "Linear",
            delay: 200,
            duration: 500
        })
    }
    showEffect(x, y, name, vNotHideOnComplete) {
        var hideOnComplete = true;
        if (vNotHideOnComplete) hideOnComplete = false;
        var effect = this.effects.get();
        if (effect) {
            effect.show(x, y, name, hideOnComplete)
        }
        return effect
    }
    showBulletEffect(vTarget, vDamage, vDmgText, vX1, vY1, vX2, vY2, angle) {
        if (angle < 0) {
            vX2 = vX2 + 30 + Math.cos(angle) * 70;
            vY2 = vY2 - 50 + Math.sin(angle) * 70
        } else {
            vX2 = vX2 - 25 + Math.cos(angle) * 30;
            vY2 = vY2 - 40 + Math.sin(angle) * 30
        }
        vY1 -= 55;
        vX1 += MyMath.getRandomInt(-5, 5) * 2;
        vY1 += MyMath.getRandomInt(-5, 5) * 2;
        var dist = Phaser.Math.Distance.Between(vX1, vY1, vX2, vY2);
        var posX = (vX1 + vX2) * .5;
        var posY = (vY1 + vY2) * .5;
        var effect = this.showEffect(posX, posY, "effect_shoot");
        if (effect) {
            effect.angle = Phaser.Math.RadToDeg(angle);
            effect.setScale(dist / 100, 1)
        }
        if (vTarget.isAlive) {
            this.showDmgText(vX1, vY1, vDmgText, vDamage);
            if (vTarget.typeUnit == "man") this.addEffectKick(vX1 + 17, vY1 + 20, 1);
            vTarget.getDamage(vDamage)
        }
    }
    getIntercept(src, dst, v) {
        const tx = dst.x - src.x;
        const ty = dst.y - src.y;
        const tvx = dst.vx;
        const tvy = dst.vy;
        const a = tvx * tvx + tvy * tvy - v * v;
        const b = 2 * (tvx * tx + tvy * ty);
        const c = tx * tx + ty * ty;
        const ts = MyMath.quad(a, b, c);
        let sol = null;
        if (ts) {
            const t0 = ts[0];
            const t1 = ts[1];
            let t = Math.min(t0, t1);
            if (t < 0) t = Math.max(t0, t1);
            if (t > 0) {
                sol = {
                    x: dst.x + dst.vx * t,
                    y: dst.y + dst.vy * t
                }
            }
        }
        return sol
    }
    updateTower(time, delta, vParking) {
        if (vParking.type <= 0 || !vParking.busy || !vParking.battle) return;
        var posT = vParking.item.getViewPosition();
        var enemy = vParking.item.getTarget();
        vParking.item.updateShoot();
        if (enemy) {
            var angle = Phaser.Math.Angle.Between(posT.x, posT.y, enemy.x, enemy.y);
            vParking.item.checkTarget();
            if (vParking.item.checkShoot()) {
                const sol = this.getIntercept({
                    x: posT.x,
                    y: posT.y
                }, {
                    x: enemy.x,
                    y: enemy.y,
                    vx: enemy.speed,
                    vy: 0
                }, this.SPEED_BULLET);
                if (sol) {
                    angle = Phaser.Math.Angle.Between(posT.x, posT.y, sol.x, sol.y);
                    vParking.item.makeShoot(angle)
                }
            }
        } else {
            enemy = this.getEnemy(posT.x, posT.y, 500);
            if (enemy) {
                vParking.item.setTarget(enemy)
            }
        }
    }
    initWall() {
        var wall = this.add.image(630, 275, "ss_main", "wall_0000");
        var icon_panel_number = this.add.image(615, 385, "ss_main", "shield_number_0000");
        var fire1 = this.add.sprite(this.WALL_X - 5, this.FIRE_Y + 50 * 0, "ss_main");
        fire1.play("fire1");
        var fire2 = this.add.sprite(this.WALL_X - 5, this.FIRE_Y + 50 * 1, "ss_main");
        fire2.play("fire1");
        var fire3 = this.add.sprite(this.WALL_X - 5, this.FIRE_Y + 50 * 2, "ss_main");
        fire3.play("fire1");
        var fire4 = this.add.sprite(this.WALL_X - 5, this.FIRE_Y + 50 * 3, "ss_main");
        fire4.play("fire1");
        var fire5 = this.add.sprite(this.WALL_X - 5, this.FIRE_Y + 50 * 4, "ss_main");
        fire5.play("fire1");
        var fire6 = this.add.sprite(this.WALL_X - 5, this.FIRE_Y + 50 * 5, "ss_main");
        fire6.play("fire1");
        var fire7 = this.add.sprite(this.WALL_X - 5, this.FIRE_Y + 50 * 6, "ss_main");
        fire7.play("fire1");
        var fire8 = this.add.sprite(this.WALL_X - 5, this.FIRE_Y + 50 * 7, "ss_main");
        fire8.play("fire1");
        this.layerWall.add(wall);
        this.layerWall.add(icon_panel_number);
        this.layerWall.add(fire1);
        this.layerWall.add(fire2);
        this.layerWall.add(fire3);
        this.layerWall.add(fire4);
        this.layerWall.add(fire5);
        this.layerWall.add(fire6);
        this.layerWall.add(fire7);
        this.layerWall.add(fire8);
        var text_wall_lvl = this.add.container();
        text_wall_lvl.x = icon_panel_number.x - 3;
        text_wall_lvl.y = icon_panel_number.y - 6;
        text_wall_lvl.setDepth(this.DEPTH_text_number);
        this.setSpriteText(text_wall_lvl, this.level_wall);
        this.text_wall_lvl = text_wall_lvl;
        this.wall = wall;
        this.fire1 = fire1;
        this.fire2 = fire2;
        this.fire3 = fire3;
        this.fire4 = fire4;
        this.fire5 = fire5;
        this.fire6 = fire6;
        this.fire7 = fire7;
        this.fire8 = fire8;
        this.isWallTweening = false;
        this.tintTickWall = 0;
        this.setFiresWall();
        var effectHeal1 = this.add.sprite(this.WALL_X, 140, "ss_main");
        effectHeal1.play("effect_heal");
        effectHeal1.visible = false;
        effectHeal1.setScale(2);
        this.layerWall.add(effectHeal1);
        var effectHeal2 = this.add.sprite(this.WALL_X, 320, "ss_main");
        effectHeal2.play("effect_heal");
        effectHeal2.visible = false;
        effectHeal2.setScale(2);
        this.layerWall.add(effectHeal2);
        this.effectHeal1 = effectHeal1;
        this.effectHeal2 = effectHeal2;
        var posX = 718;
        var posY = 63;
        var offsetY = 83.5;
        var rage1 = this.add.sprite(posX, posY + offsetY * 0, "ss_main");
        rage1.play("rage_car");
        var rage2 = this.add.sprite(posX, posY + offsetY * 1, "ss_main");
        rage2.play("rage_car");
        var rage3 = this.add.sprite(posX, posY + offsetY * 2, "ss_main");
        rage3.play("rage_car");
        var rage4 = this.add.sprite(posX, posY + offsetY * 3, "ss_main");
        rage4.play("rage_car");
        var rage5 = this.add.sprite(posX, posY + offsetY * 4, "ss_main");
        rage5.play("rage_car");
        this.rage1 = rage1;
        this.rage2 = rage2;
        this.rage3 = rage3;
        this.rage4 = rage4;
        this.rage5 = rage5;
        this.setRageEffect(false)
    }
    setRageEffect(vBool) {
        this.rage1.visible = vBool;
        this.rage2.visible = vBool;
        this.rage3.visible = vBool;
        this.rage4.visible = vBool;
        this.rage5.visible = vBool;
        this.checkRageEffect(vBool)
    }
    checkRageEffect(vBool) {
        if (vBool) {
            if (!this.arParking[0].busy) this.rage1.visible = false;
            if (!this.arParking[1].busy) this.rage2.visible = false;
            if (!this.arParking[2].busy) this.rage3.visible = false;
            if (!this.arParking[3].busy) this.rage4.visible = false;
            if (!this.arParking[4].busy) this.rage5.visible = false
        }
    }
    showHealEffect() {
        this.effectHeal1.visible = true;
        this.effectHeal1.play("effect_heal");
        this.effectHeal2.visible = true;
        this.effectHeal2.play("effect_heal");
        MainGame.Sfx.play("sound", "heal")
    }
    initFog() {
        var obj = this.add.image(-70, 320, "ss_main", "fog_0000");
        obj.setOrigin(0, .5);
        this.layerEffects.add(obj)
    }
    initEffectMerge() {
        var effect = this.add.sprite(100, 100, "ss_main");
        effect.play("effect_connect3");
        effect.visible = false;
        effect.setScale(1.25);
        this.merge_effect = effect;
        this.layerEffects.add(effect)
    }
    showMergeEffect(vX, vY) {
        this.merge_effect.visible = true;
        this.merge_effect.x = vX;
        this.merge_effect.y = vY - 18
    }
    hideMergeEffect() {
        this.merge_effect.visible = false
    }
    hideFiresWall() {
        for (var i = 0; i < this.arFires.length; i++) {
            this.arFires[i].visible = false
        }
    }
    setFiresWall() {
        this.arFires = [this.fire1, this.fire2, this.fire3, this.fire4, this.fire5, this.fire6, this.fire7, this.fire8];
        var r = 0;
        for (var i = 0; i < this.arFires.length; i++) {
            this.arFires[i].visible = false;
            r = MyMath.getRandomInt(1, 4);
            if (r == 1) this.arFires[i].setOrigin(.5, .5);
            if (r == 2) this.arFires[i].setOrigin(.5, .5);
            if (r == 3) this.arFires[i].setOrigin(.32, .5);
            if (r == 4) this.arFires[i].setOrigin(.7, .5);
            this.arFires[i].x = this.WALL_X - 5 - 1 * i;
            this.arFires[i].play("fire" + r)
        }
        MyMath.shuffleArr(this.arFires)
    }
    updateWallHp(damage) {
        if (this.isGameOver) return;
        this.wall_hp -= damage;
        this.wall_hp_dmg += damage;
        if (damage == 0) {
            for (var i = 0; i < this.arFires.length; i++) {
                this.arFires[i].visible = false
            }
        }
        if (this.wall_hp < this.wall_hp_max * .9) this.arFires[0].visible = true;
        if (this.wall_hp < this.wall_hp_max * .8) this.arFires[1].visible = true;
        if (this.wall_hp < this.wall_hp_max * .7) this.arFires[2].visible = true;
        if (this.wall_hp < this.wall_hp_max * .6) this.arFires[3].visible = true;
        if (this.wall_hp < this.wall_hp_max * .5) this.arFires[4].visible = true;
        if (this.wall_hp < this.wall_hp_max * .4) this.arFires[5].visible = true;
        if (this.wall_hp < this.wall_hp_max * .3) this.arFires[6].visible = true;
        if (this.wall_hp < this.wall_hp_max * .2) this.arFires[7].visible = true;
        if (this.wall_hp <= 0) {
            this.wall_hp = 0;
            this.defeatWave()
        }
        this.gameGUI.updateWallHp(this.wall_hp / this.wall_hp_max, this.wall_hp, this.wall_hp_max)
    }
    showWallJelly() {
        if (this.isWallTweening) return;
        this.goTweenWall(this.wall, .04)
    }
    finishTweenWall(tween) {
        this.isWallTweening = false
    }
    updateRedTintWall() {
        if (this.tintTickWall == 0) return;
        this.tintTickWall++;
        switch (this.tintTickWall) {
            case 3:
                this.wall.setTint(16750230);
                break;
            case 6:
                this.wall.setTint(16737380);
                break;
            case 9:
                this.wall.setTint(16750230);
                break;
            case 12:
                this.wall.setTint(16763080);
                break;
            case 15:
                this.wall.setTint(16777215);
                this.tintTickWall = 0;
                break
        }
    }
    goTweenWall(object, strength, delay, initialScale) {
        strength = strength || .2;
        delay = delay || 0;
        initialScale = initialScale || {
            x: 1,
            y: 1
        };
        this.tweens.killTweensOf(object);
        object.x = 630;
        this.tweens.add({
            targets: object,
            x: object.x + 1,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: 50,
            yoyo: true,
            onComplete: this.finishTweenWall,
            onCompleteScope: this
        });
        this.isWallTweening = true;
        this.tintTickWall = 1
    }
    updateTowerSpeed(vParking, vIsDoubleSpeed) {
        if (vParking.type <= 0 || !vParking.busy || !vParking.battle) return;
        if (vParking.obj == 1) vParking.item.updateSpeed()
    }
    updateSpeedGame(vIsDoubleSpeed) {
        if (vIsDoubleSpeed) {
            this.ATTACK_TOWER = 2
        } else {
            this.ATTACK_TOWER = 1
        }
        for (var i = 0; i < this.LIMIT_parking; i++) {
            this.updateTowerSpeed(this.arParking[i], vIsDoubleSpeed)
        }
        this.setRageEffect(vIsDoubleSpeed)
    }
    initSkills() {
        this.timerSkill1 = 0;
        this.timerSkill2 = 0;
        this.timerSkill3 = 0;
        this.isSkillReady1 = true;
        this.isSkillReady2 = true;
        this.isSkillReady3 = true;
        this.isRocketTime = false;
        this.isGrenadeTime = false;
        this.isPoisonTime = false;
        this.isRocketActivated = false;
        this.isGrenadeActivated = false;
        this.isSmokePoisonActivated = false;
        this.aim_skill = this.add.image(200, 200, "ss_main", "skill_aim1_0000");
        this.aim_skill.setScale(.8);
        this.aim_skill.visible = false;
        this.layerTowers.add(this.aim_skill);
        this.rocket = this.add.image(100, -100, "ss_main", "rocket_0000");
        this.rocket.visible = false;
        this.layerTowers.add(this.rocket);
        this.grenade1 = this.add.image(100, -100, "ss_main", "grenade_0000");
        this.grenade2 = this.add.image(100, -100, "ss_main", "grenade_0000");
        this.grenade3 = this.add.image(100, -100, "ss_main", "grenade_0000");
        this.grenade1.visible = false;
        this.grenade2.visible = false;
        this.grenade3.visible = false;
        this.layerTowers.add(this.grenade1);
        this.layerTowers.add(this.grenade2);
        this.layerTowers.add(this.grenade3);
        this.timerPoison = 0;
        this.delayPoison = 0;
        var effect = this.add.sprite(100, 100, "ss_main");
        effect.play("acid2");
        effect.setScale(2);
        effect.visible = false;
        this.layerEffects.add(effect);
        this.smokePoison = effect
    }
    updateSkillsButton() {
        if (this.num_wave >= 2) {
            this.isCanUseSkill1 = true
        } else {
            this.isCanUseSkill1 = false
        }
        if (this.num_wave >= 3) {
            this.isCanUseSkill2 = true
        } else {
            this.isCanUseSkill2 = false
        }
        if (this.num_wave >= 4) {
            this.isCanUseSkill3 = true
        } else {
            this.isCanUseSkill3 = false
        }
        this.gameGUI.buttonSkill1.visible = this.isCanUseSkill1;
        this.gameGUI.buttonSkill2.visible = this.isCanUseSkill2;
        this.gameGUI.buttonSkill3.visible = this.isCanUseSkill3
    }
    resetSkills() {
        if (this.isSmokePoisonActivated) this.timerPoison = this.TIME_POISON
    }
    updateSkillAim(pos) {
        if (this.isRocketTime || this.isGrenadeTime || this.isPoisonTime) {
            this.aim_skill.x = pos.x;
            this.aim_skill.y = pos.y;
            if (this.aim_skill.x > 570) this.aim_skill.x = 570;
            if (this.aim_skill.x < 70) this.aim_skill.x = 70;
            if (this.aim_skill.y < 100) this.aim_skill.y = 100;
            if (this.aim_skill.y > 430) this.aim_skill.y = 430
        }
    }
    updateSkillsCooldown() {
        if (!this.isSkillReady1) {
            this.timerSkill1 += this.WAVE_INC;
            var progress1 = this.timerSkill1 / this.TIME_CD_SKILL1;
            if (progress1 > 1) progress1 = 1;
            this.gameGUI.updateSkillCd1(1 - progress1);
            if (this.timerSkill1 >= this.TIME_CD_SKILL1) {
                this.isSkillReady1 = true;
                this.gameGUI.buttonSkill1.enableInput();
                this.gameGUI.showBtnSkillEffect(1)
            }
        }
        if (!this.isSkillReady2) {
            this.timerSkill2 += this.WAVE_INC;
            var progress2 = this.timerSkill2 / this.TIME_CD_SKILL2;
            if (progress2 > 1) progress2 = 1;
            this.gameGUI.updateSkillCd2(1 - progress2);
            if (this.timerSkill2 >= this.TIME_CD_SKILL2) {
                this.isSkillReady2 = true;
                this.gameGUI.buttonSkill2.enableInput();
                this.gameGUI.showBtnSkillEffect(2)
            }
        }
        if (!this.isSkillReady3) {
            this.timerSkill3 += this.WAVE_INC;
            var progress3 = this.timerSkill3 / this.TIME_CD_SKILL3;
            if (progress3 > 1) progress3 = 1;
            this.gameGUI.updateSkillCd3(1 - progress3);
            if (this.timerSkill3 >= this.TIME_CD_SKILL3) {
                this.isSkillReady3 = true;
                this.gameGUI.buttonSkill3.enableInput();
                this.gameGUI.showBtnSkillEffect(3)
            }
        }
    }
    selectSkill(vNum, vHideAimSkill) {
        if (vNum == 1 && (!this.isSkillReady1 || !this.isCanUseSkill1)) return;
        if (vNum == 2 && (!this.isSkillReady2 || !this.isCanUseSkill2)) return;
        if (vNum == 3 && (!this.isSkillReady3 || !this.isCanUseSkill3)) return;
        this.aim_skill.visible = true;
        this.isRocketTime = false;
        this.isGrenadeTime = false;
        this.isPoisonTime = false;
        this.gameGUI.helicopter.disableInteractive();
        if (vHideAimSkill) {
            this.aim_skill.y = -1e3
        } else {
            var pointer = this.input.activePointer;
            var pos = this.getInputPosition(pointer);
            this.updateSkillAim(pos)
        }
        if (vNum == 1) {
            this.isRocketTime = true;
            this.aim_skill.setFrame("skill_aim1_0000");
            this.gameGUI.ramka_skill.x = this.gameGUI.buttonSkill1.x;
            this.gameGUI.ramka_skill.visible = true
        } else if (vNum == 2) {
            this.isGrenadeTime = true;
            this.aim_skill.setFrame("skill_aim2_0000");
            this.gameGUI.ramka_skill.x = this.gameGUI.buttonSkill2.x;
            this.gameGUI.ramka_skill.visible = true
        } else if (vNum == 3) {
            this.isPoisonTime = true;
            this.aim_skill.setFrame("skill_aim3_0000");
            this.gameGUI.ramka_skill.x = this.gameGUI.buttonSkill3.x;
            this.gameGUI.ramka_skill.visible = true
        }
    }
    checkUseSkills(pos, vIsDown) {
        if (pos.x >= 650) {
            if (this.isRocketTime || this.isGrenadeTime || this.isPoisonTime) {
                this.cancelSkill();
                return
            }
        }
        if (!vIsDown) {
            if (pos.x < 650) {
                if (this.isRocketTime) {
                    this.useSkill1()
                } else if (this.isGrenadeTime) {
                    this.useSkill2()
                } else if (this.isPoisonTime) {
                    this.useSkill3()
                }
            }
        }
    }
    cancelSkill() {
        this.isRocketTime = false;
        this.isGrenadeTime = false;
        this.isPoisonTime = false;
        this.aim_skill.visible = false;
        this.gameGUI.ramka_skill.visible = false;
        this.gameGUI.helicopter.setInteractive()
    }
    useSkill1() {
        if (this.isRocketActivated) return;
        this.rocketDamage = 5 * this.getCountMobHp(this.num_wave);
        var pos = {
            x: this.aim_skill.x,
            y: this.aim_skill.y
        };
        this.callRocket(this.aim_skill.x, pos.y);
        this.isRocketTime = false;
        this.aim_skill.visible = false;
        this.gameGUI.ramka_skill.visible = false;
        this.timerSkill1 = 0;
        this.isSkillReady1 = false;
        this.gameGUI.updateSkillCd1(1);
        this.gameGUI.buttonSkill1.disableInput();
        this.gameGUI.helicopter.setInteractive();
        MainGame.Sfx.play("sound", "skill_rocket")
    }
    useSkill2() {
        if (this.isGrenadeActivated) return;
        this.grenadeDamage = 3 * this.getCountMobHp(this.num_wave);
        var pos = {
            x: this.aim_skill.x,
            y: this.aim_skill.y
        };
        this.startThrowGrenade(this.grenade1, pos.x, pos.y - 60);
        this.startThrowGrenade(this.grenade2, pos.x, pos.y);
        this.startThrowGrenade(this.grenade3, pos.x, pos.y + 60);
        this.isGrenadeTime = false;
        this.aim_skill.visible = false;
        this.gameGUI.ramka_skill.visible = false;
        this.isGrenadeActivated = true;
        this.timerSkill2 = 0;
        this.isSkillReady2 = false;
        this.gameGUI.updateSkillCd2(1);
        this.gameGUI.buttonSkill2.disableInput();
        this.gameGUI.helicopter.setInteractive();
        var durationShell_1 = 200 / this.WAVE_INC;
        this.time.addEvent({
            delay: durationShell_1,
            callback: this.soundGrenadeSkill,
            callbackScope: this
        })
    }
    soundGrenadeSkill() {
        MainGame.Sfx.play("sound", "skill_grenade")
    }
    useSkill3() {
        if (this.isSmokePoisonActivated) return;
        this.smokeDamage = Math.round(this.getCountMobHp(this.num_wave) * .04);
        var pos = {
            x: this.aim_skill.x,
            y: this.aim_skill.y
        };
        this.smokePoison.x = pos.x;
        this.smokePoison.y = pos.y - 25;
        this.timerPoison = 0;
        this.delayPoison = 0;
        var effect = this.showEffect(this.smokePoison.x - 8, this.smokePoison.y - 10, "acid1");
        if (effect) effect.setScale(2);
        this.time.addEvent({
            delay: 200,
            callback: this.showSmokePoison,
            callbackScope: this
        });
        this.isPoisonTime = false;
        this.aim_skill.visible = false;
        this.gameGUI.ramka_skill.visible = false;
        this.timerSkill3 = 0;
        this.isSkillReady3 = false;
        this.gameGUI.updateSkillCd3(1);
        this.gameGUI.buttonSkill3.disableInput();
        this.gameGUI.helicopter.setInteractive();
        MainGame.Sfx.play("sound", "skill_poison")
    }
    callRocket(vX, vY) {
        if (this.rocket.visible) return;
        this.rocket.visible = true;
        this.rocket.x = vX + 100;
        this.rocket.y = -100;
        this.rocket.angle = -75;
        var durationShell = 300 / this.WAVE_INC;
        this.tweens.add({
            targets: this.rocket,
            x: vX,
            y: vY,
            ease: Phaser.Math.Easing.Cubic.In,
            duration: durationShell,
            onComplete: this.finishRocketTween,
            onCompleteScope: this
        });
        this.isRocketActivated = true
    }
    finishRocketTween(e) {
        var target = e.targets[0];
        target.visible = false;
        this.showEffect(target.x, target.y - 35, "explosion1");
        this.enemies.checkBoom(target.x, target.y, 3600, this.rocketDamage);
        this.isRocketActivated = false
    }
    showSmokePoison() {
        this.isSmokePoisonActivated = true;
        this.smokePoison.visible = true;
        this.smokePoison.setScale(.4);
        this.tweens.add({
            targets: this.smokePoison,
            scale: 2,
            ease: Phaser.Math.Easing.Linear,
            duration: 200
        })
    }
    hideSmokePoison() {
        this.isSmokePoisonActivated = false;
        this.tweens.add({
            targets: this.smokePoison,
            scale: .4,
            ease: Phaser.Math.Easing.Linear,
            duration: 200,
            onComplete: this.finishSmokePoisonTween,
            onCompleteScope: this
        })
    }
    finishSmokePoisonTween() {
        this.smokePoison.visible = false
    }
    startThrowGrenade(vGrenade, vPosX, vPosY) {
        this.tweens.killTweensOf(vGrenade);
        vGrenade.visible = true;
        vGrenade.x = this.WALL_X;
        vGrenade.y = vPosY;
        var posX = vPosX + 5 * MyMath.getRandomInt(-7, 7);
        var posY = vGrenade.y;
        var durationShell_1 = 1e3 / this.WAVE_INC;
        var durationShell_2 = 200 / this.WAVE_INC;
        this.tweens.add({
            targets: vGrenade,
            x: posX,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: durationShell_1,
            onComplete: this.finishGrenadeTweenDown,
            onCompleteScope: this
        });
        this.tweens.add({
            targets: vGrenade,
            y: posY - 100,
            ease: Phaser.Math.Easing.Sine.Out,
            duration: durationShell_2,
            onComplete: this.finishGrenadeTweenUp,
            onCompleteScope: this
        });
        var angleFinal = -360 * 2 + 5 * MyMath.getRandomInt(-10, 10);
        this.tweens.add({
            targets: vGrenade,
            angle: angleFinal,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: durationShell_1
        })
    }
    finishGrenadeTweenUp(e) {
        var target = e.targets[0];
        var durationShell = 800 / this.WAVE_INC;
        this.tweens.add({
            targets: target,
            y: target.y + 100,
            ease: Phaser.Math.Easing.Bounce.Out,
            duration: durationShell
        })
    }
    finishGrenadeTweenDown(e) {
        var target = e.targets[0];
        target.visible = false;
        this.showEffect(target.x + 5, target.y - 10, "explosion2");
        this.enemies.checkBoom(target.x, target.y, 3600, this.grenadeDamage);
        this.isGrenadeActivated = false
    }
    updatePoisonSmoke() {
        if (!this.isSmokePoisonActivated) return;
        this.timerPoison += this.WAVE_INC;
        this.delayPoison += this.WAVE_INC;
        if (this.delayPoison >= 5) {
            this.enemies.checkBoom(this.smokePoison.x, this.smokePoison.y, 4500, this.smokeDamage);
            this.delayPoison = 0
        }
        if (this.timerPoison > this.TIME_POISON) {
            this.hideSmokePoison()
        }
    }
    getWheelPrize(slices, degrees, backDegrees) {
        return slices - 1 - Math.floor((degrees - backDegrees) / (360 / slices))
    }
    initWheelOptions() {
        this.wheelOptions = {
            slices: 8,
            slicePrizes: ["auto_merge", "bonus_coins", "reward_coin1", "reward_box8", "speed_x2", "reward_box6", "reward_coin2", "reward_box4"],
            sliceProbability: [.18, .12, .08, .1, .18, .12, .04, .18],
            rotationTime: 3e3,
            rotationTimeRange: {
                min: 3e3,
                max: 4500
            },
            wheelRounds: {
                min: 2,
                max: 6
            },
            backSpin: {
                min: 2,
                max: 8
            }
        }
    }
    checkProbability(probs) {
        var summ = 0;
        for (var v in probs) {
            summ += probs[v];
            console.log(summ)
        }
        return summ == 1
    }
    getTypeRewardBox() {
        var boxRandom = this.getTypeRandomBox();
        if (this.nextCarLevel < 6) {
            boxRandom = 1
        } else {
            boxRandom++
        }
        return boxRandom
    }
    getRewardCoinsHours(vCount) {
        var coins = vCount * 3600 * this.getCoinsPerSec();
        this.amount_coins += coins;
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm)
    }
    getCoinsPerSec() {
        var parking = null;
        var total_dmg = 0;
        var value = 0;
        for (var i = 0; i < this.LIMIT_parking; i++) {
            parking = this.arParking[i];
            if (parking.busy && parking.battle) {
                total_dmg += this.getDamage(parking.type)
            }
        }
        value = Math.round(total_dmg * this.COINS_PER_DMG);
        return value
    }
    checkCoinsPerSec() {
        var new_profit = (this.amount_coins - this.last_coins) / 5;
        this.last_coins = this.amount_coins;
        console.log(new_profit + "/s")
    }
    getRewards(vReward) {
        switch (vReward) {
            case "reward_coin1":
                this.getRewardCoinsHours(1);
                break;
            case "reward_coin2":
                this.getRewardCoinsHours(2);
                break;
            case "auto_merge":
                this.activateBoostAutoMerge();
                this.gameGUI.hideOfferTV();
                break;
            case "speed_x2":
                this.activateBoostSpeed();
                break;
            case "bonus_coins":
                this.activateBoostCoins();
                break;
            case "reward_box4":
                var boxType = this.getTypeRewardBox();
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.saveBoxBuffer();
                break;
            case "reward_box6":
                var boxType = this.getTypeRewardBox();
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.saveBoxBuffer();
                break;
            case "reward_box8":
                var boxType = this.getTypeRewardBox();
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.addBoxToBuffer(boxType);
                this.saveBoxBuffer();
                break;
            case "coinsX2":
                this.amount_coins += this.value_offline_earning;
                var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
                this.gameGUI.updateCoins(text_coins_warm);
                this.gameGUI.updateShop(text_coins_warm);
                this.gameGUI.closeOfflineEarningWindow(true);
                break;
            case "coins_wave_x2":
                this.gameGUI.layerFinishWindow.destroy();
                this.amount_coins += this.coins_earned;
                var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
                this.gameGUI.updateCoins(text_coins_warm);
                this.gameGUI.updateShop(text_coins_warm);
                this.closeFinishWindow(true);
                break;
            case "freeCar":
                this.ALLOW_ADS_CAR = false;
                this.gameGUI.iconAdvShop.visible = false;
                if (this.num_ads_car > 0) {
                    this.addBoxToBuffer(this.num_ads_car);
                    this.gameGUI.updateShopItem();
                    MainGame.Sfx.play("sound", "buy")
                }
                this.num_ads_car = 0;
                break;
            case "freeUpgrade":
                if (this.parking_upgrade_id != null && this.parking_upgrade_type > 0) {
                    var parking = this.arParking[this.parking_upgrade_id];
                    parking.type = this.parking_upgrade_type;
                    this.setSpriteText(parking.textNumberType, parking.type);
                    parking.item.setSkinTower(parking.type);
                    this.showEffect(parking.item.view.x, parking.item.view.y, "effect_connect");
                    this.checkNextCar();
                    MainGame.Sfx.play("sound", "boost")
                }
                this.parking_upgrade_id = null;
                this.parking_upgrade_type = 0;
                this.gameGUI.closeUpgadeWindow2();
                break;
            case "reward_wheel":
                var item = MyMath.weightedRandom(this.wheelOptions.sliceProbability);
                MainGame.reward_wheel = this.wheelOptions.slicePrizes[item];
                var rounds = Phaser.Math.Between(this.wheelOptions.wheelRounds.min, this.wheelOptions.wheelRounds.max);
                var backDegrees = Phaser.Math.Between(this.wheelOptions.backSpin.min, this.wheelOptions.backSpin.max);
                var degrees = 360 / this.wheelOptions.slices * item + Phaser.Math.Between(0, 29) + backDegrees;
                var duration1 = this.wheelOptions.rotationTime;
                var duration2 = 1500;
                MainGame.Sfx.play("sound", "fortune");
                this.gameGUI.tweenWheelFortune(rounds, degrees, backDegrees, duration1, duration2);
                if (this.freeTimeWheel > 0) {
                    this.freeTimeWheel--;
                    MainGame.freeTimeWheel = this.freeTimeWheel;
                    MainGame.saveSaves()
                }
                if (this.freeTimeWheel < MainGame.maxTimeWheel && this.countDownNextFree <= 0) {
                    this.countDownNextFree = this.TIME_NEXT_FREE
                }
                if (this.freeTimeWheel > 0) {
                    this.gameGUI.iconAdvFortune.visible = true
                } else {
                    this.gameGUI.iconAdvFortune.visible = false
                }
                this.gameGUI.updateFortunaWheelWindow(this.countDownNextFree);
                break
        }
    }
    clickBuyPrivilege1() {
        var itemInfo = this.arLevelCannonDmg[this.levelCannonDmg - 1];
        var priceUpdate = Math.round(itemInfo.price * this.factorDiscount);
        if (this.amount_coins < priceUpdate) {
            this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_money);
            return
        }
        if (this.levelCannonDmg > 10) return;
        this.levelCannonDmg++;
        MainGame.levelCannonDmg = this.levelCannonDmg;
        this.amount_coins -= priceUpdate;
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm);
        this.gameGUI.updateShop(text_coins_warm);
        this.updatePrivilegiesItems();
        this.updatePrivilegiesFactors();
        MainGame.Sfx.play("sound", "buy");
        MainGame.saveSaves()
    }
    clickBuyPrivilege2() {
        var itemInfo = this.arLevelDiscount[this.levelDiscount - 1];
        var priceUpdate = Math.round(itemInfo.price * this.factorDiscount);
        if (this.amount_coins < priceUpdate) {
            this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_money);
            return
        }
        if (this.levelDiscount > 10) return;
        this.levelDiscount++;
        MainGame.levelDiscount = this.levelDiscount;
        this.amount_coins -= priceUpdate;
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm);
        this.gameGUI.updateShop(text_coins_warm);
        this.updatePrivilegiesItems();
        this.updatePrivilegiesFactors();
        MainGame.Sfx.play("sound", "buy");
        MainGame.saveSaves()
    }
    clickBuyPrivilege3() {
        var itemInfo = this.arLevelEarning[this.levelEarning - 1];
        var priceUpdate = Math.round(itemInfo.price * this.factorDiscount);
        if (this.amount_coins < priceUpdate) {
            this.gameGUI.showSystemMessage(MainGame.GAME_TEXT.no_money);
            return
        }
        if (this.levelEarning > 10) return;
        this.levelEarning++;
        MainGame.levelEarning = this.levelEarning;
        this.amount_coins -= priceUpdate;
        var text_coins_warm = MainGame.convertNumberFormat(this.amount_coins);
        this.gameGUI.updateCoins(text_coins_warm);
        this.gameGUI.updateShop(text_coins_warm);
        this.updatePrivilegiesItems();
        this.updatePrivilegiesFactors();
        MainGame.Sfx.play("sound", "buy");
        MainGame.saveSaves()
    }
    updatePrivilegiesItems() {
        if (!this.gameGUI.isShopAdded) return;
        var value_level = null;
        var text_value = null;
        var itemInfo = null;
        var priceItem = null;
        var number_warm = null;
        this.itemPrivilege1 = this.gameGUI.itemPrivilege1;
        this.itemPrivilege2 = this.gameGUI.itemPrivilege2;
        this.itemPrivilege3 = this.gameGUI.itemPrivilege3;
        value_level = this.levelCannonDmg;
        if (value_level < 10) {
            itemInfo = this.arLevelCannonDmg[value_level - 1];
            priceItem = Math.round(itemInfo.price * this.factorDiscount);
            number_warm = MainGame.convertNumberFormat(priceItem);
            this.itemPrivilege1.text_value.setText(MainGame.GAME_TEXT.next_level.toUpperCase() + ": " + itemInfo.value + "%")
        } else {
            value_level = 10;
            itemInfo = this.arLevelEarning[value_level - 2];
            number_warm = MainGame.GAME_TEXT.max.toUpperCase();
            this.itemPrivilege1.btn.setEnable(false);
            this.itemPrivilege1.text_value.setText(itemInfo.value + "%");
            this.itemPrivilege1.text_value.setOrigin(.5);
            this.itemPrivilege1.text_value.x = this.itemPrivilege1.btn.x
        }
        this.itemPrivilege1.btn_text.setText(number_warm);
        this.itemPrivilege1.text_num.setText(value_level);
        value_level = this.levelDiscount;
        if (value_level < 10) {
            itemInfo = this.arLevelDiscount[value_level - 1];
            priceItem = Math.round(itemInfo.price * this.factorDiscount);
            number_warm = MainGame.convertNumberFormat(priceItem);
            this.itemPrivilege2.text_value.setText(MainGame.GAME_TEXT.next_level.toUpperCase() + ": " + itemInfo.value + "%")
        } else {
            value_level = 10;
            itemInfo = this.arLevelDiscount[value_level - 2];
            number_warm = MainGame.GAME_TEXT.max.toUpperCase();
            this.itemPrivilege2.btn.setEnable(false);
            this.itemPrivilege2.text_value.setText(itemInfo.value + "%");
            this.itemPrivilege2.text_value.setOrigin(.5);
            this.itemPrivilege2.text_value.x = this.itemPrivilege2.btn.x
        }
        this.itemPrivilege2.btn_text.setText(number_warm);
        this.itemPrivilege2.text_num.setText(value_level);
        value_level = this.levelEarning;
        if (value_level < 10) {
            itemInfo = this.arLevelEarning[value_level - 1];
            priceItem = Math.round(itemInfo.price * this.factorDiscount);
            number_warm = MainGame.convertNumberFormat(priceItem);
            this.itemPrivilege3.text_value.setText(MainGame.GAME_TEXT.next_level.toUpperCase() + ": " + itemInfo.value + "%")
        } else {
            value_level = 10;
            itemInfo = this.arLevelEarning[value_level - 2];
            number_warm = MainGame.GAME_TEXT.max.toUpperCase();
            this.itemPrivilege3.btn.setEnable(false);
            this.itemPrivilege3.text_value.setText(itemInfo.value + "%");
            this.itemPrivilege3.text_value.setOrigin(.5);
            this.itemPrivilege3.text_value.x = this.itemPrivilege3.btn.x
        }
        this.itemPrivilege3.btn_text.setText(number_warm);
        this.itemPrivilege3.text_num.setText(value_level);
        MainGame.updateTextWidth(this.itemPrivilege1.text_value, 200);
        MainGame.updateTextWidth(this.itemPrivilege2.text_value, 200);
        MainGame.updateTextWidth(this.itemPrivilege3.text_value, 200);
        this.checkPrivilegesPrice()
    }
    getSfxKamikaze() {
        this.kamikazeCounter++;
        if (this.kamikazeCounter > 9) this.kamikazeCounter = 1;
        MainGame.Sfx.play("sound", "k_aaa" + this.kamikazeCounter);
        return this.kamikazeCounter
    }
    stopSfxKamikaze(num) {
        var sfx = MainGame.Sfx.sounds["k_aaa" + num];
        if (sfx.isPlaying) sfx.stop()
    }
    checkResultWave(vDiffValue, vNumWave) {
        if (this.resultWaves.length < 3) {
            this.resultWaves.push(vDiffValue)
        } else {
            this.resultWaves.shift();
            this.resultWaves.push(vDiffValue);
            var v1 = this.resultWaves[0];
            var v2 = this.resultWaves[1];
            var v3 = this.resultWaves[2];
            if (v1 == "EASY" && v2 == "EASY" && v3 == "EASY") {
                MainGame.api_analytics("EASY3ROW", vNumWave)
            }
        }
    }
    checkAfterAds() {
        switch (MainGame.isTypeAds) {
            case "adsDrone":
                this.gameGUI.closeBoost();
                break
        }
        MainGame.isTypeAds = ""
    }
    clickWinX2Button() {
        MainGame.isApiGameplayStop = true;
        MainGame.clickReward("coins_wave_x2");
        this.gameGUI.buttonPanelTV.setEnable(false);
        MainGame.api_analytics("ClickCoinsX2")
    }
    showAdsForFortunaWheel() {
        MainGame.isApiGameplayStop = true;
        MainGame.clickReward("reward_wheel");
        this.gameGUI.buttonFortunaWheel.setEnable(false);
        MainGame.api_analytics("ClickFortuna")
    }
    showAdsForHelicopter(vTypeBonusDron) {
        MainGame.isTypeAds = "adsDrone";
        MainGame.isApiGameplayStop = true;
        MainGame.clickReward(vTypeBonusDron);
        this.gameGUI.boostBtnAds.setEnable(false);
        MainGame.api_analytics("ClickHelicopter")
    }
    showAdsForFreeUpgrade() {
        MainGame.isApiGameplayStop = true;
        MainGame.clickReward("freeUpgrade");
        this.gameGUI.buttonFreeUpgrade.setEnable(false);
        MainGame.api_analytics("ClickUpgrade")
    }
    showAdsForCoinsX2() {
        MainGame.isApiGameplayStop = true;
        MainGame.clickReward("coinsX2");
        this.gameGUI.offlineEarningBtnAds.setEnable(false)
    }
    showAdsForCar() {
        MainGame.clickReward("freeCar");
        MainGame.api_analytics("ClickFreeShop")
    }
    clickOfferTV() {
        MainGame.clickReward("auto_merge");
        this.gameGUI.buttonPanelTV.setEnable(false);
        MainGame.api_analytics("ClickOfferTV")
    }
    debugShowPrices() {
        var ar = [5e5, 25e6, 125e7, 625e8, 3125e9, 15625e10, 78125e11, 390625e12, 1953125e13, 9765625e14];
        for (var i = 0; i < ar.length; i++) {
            console.log(i + 1, MainGame.convertNumberFormat(ar[i]))
        }
    }
    testLevelGetCoins() {
        for (var i = 1; i <= 50; i++) {
            console.log(i, MainGame.convertNumberFormat(this.getCoinsLevelUp(i)))
        }
    }
    testWallUpgardePrices() {
        for (var i = 1; i <= 20; i++) {
            console.log(i, MainGame.convertNumberFormat(this.getPriceWall(i)))
        }
    }
    testFeature() {
        this.addEnemy(300, 200, 1)
    }
    testAllowParking() {
        for (var i = 0; i < this.arParking.length; i++) {
            if (!this.arParking[i].allow) console.log("[!!!]", i, this.arParking[i].allow)
        }
    }
    testAddBoxes() {
        this.addBoxToBuffer(2);
        this.addBoxToBuffer(2);
        this.addBoxToBuffer(2);
        this.addBoxToBuffer(2);
        this.saveBoxBuffer()
    }
    testLevelUp() {
        this.increaseLevel(this.exp_max)
    }
    testAddGun() {
        this.addBoxToBuffer(MainGame.debug_typeGun)
    }
    testAddSquad() {
        this.addSquad(MainGame.debug_typeSquad)
    }
    testCoinsHours(vCount) {}
    testCarAds() {
        if (!MainGame.isDebug) return;
        var typeCar = this.nextCarLevel - 4;
        this.addObject({
            lvl: typeCar,
            fromShop: true
        }, true)
    }
    testFastBuy() {
        this.testCount = 1;
        this.time.addEvent({
            args: [this.testCount],
            delay: 250,
            callback: this.goTestFastBuy,
            callbackScope: this,
            repeat: 49
        })
    }
    goTestFastBuy() {
        this.gameGUI.testFastBuy(this.testCount);
        this.testCount++
    }
    playScenarios() {
        this.time.delayedCall(1e3, this.playScenario1, null, this);
        this.time.delayedCall(5e3, this.playScenario2, null, this);
        this.time.delayedCall(1e4, this.playScenario3, null, this);
        this.time.delayedCall(15e3, this.playScenario4, null, this);
        this.time.delayedCall(2e4, this.playScenario2, null, this);
        this.time.delayedCall(25e3, this.playScenario1, null, this)
    }
    playScenario1() {
        MainGame.state.addEnemy(0, 200, 1);
        MainGame.state.addEnemy(-80, 250, 1);
        MainGame.state.addEnemy(-50, 300, 1);
        MainGame.state.addEnemy(-10, 350, 1)
    }
    playScenario2() {
        MainGame.state.addEnemy(-50, 200, 2);
        MainGame.state.addEnemy(-10, 250, 2);
        MainGame.state.addEnemy(-10, 300, 2);
        MainGame.state.addEnemy(-50, 350, 2)
    }
    playScenario3() {
        MainGame.state.addEnemy(-30, 200, 3);
        MainGame.state.addEnemy(-10, 250, 3);
        MainGame.state.addEnemy(-30, 300, 3)
    }
    playScenario4() {
        MainGame.state.addEnemy(-30, 250, 5)
    }
    playScenario5() {
        MainGame.state.addEnemy(50, 250, 1);
        MainGame.state.addEnemy(50, 350, 6);
        this.time.delayedCall(1e3, this.activateBoostSpeed, null, this)
    }
}
class GameGui extends Phaser.Scene {
    constructor() {
        super("GameGui")
    }
    create() {
        this.gameScreen = this.scene.get("Game");
        this.SPRITE_SHEET = "ss_ui";
        this.initResize();
        this.midX = this.GAME_WIDTH / 2;
        this.midY = this.GAME_HEIGHT / 2;
        this.layerGUI = this.add.container();
        this.DEPTH_GUI_TEXT = .2;
        this.DEPTH_GUI_IMAGE = .1;
        this.TIME_OPEN_POPUP = 200;
        this.isShowingFinish = false;
        this.isOnInputDown = false;
        this.isPopupOpened = false;
        this.buttonEnabled = true;
        this.typeDronBonus = "";
        this.scaleWindow1 = .8;
        this.scaleWindow2 = 1;
        this.posWindowY = 0;
        this.isTweeningWheel = false;
        this.isTweeningHat = false;
        this.offsetCameraX = 0;
        this.offsetCameraY = 0;
        this.isShopAdded = false;
        this.itemShop_WIDTH = 125;
        this.MAX_TYPES_CAR = this.gameScreen.MAX_TYPES_CAR;
        this.textFields = [];
        this.initMainButtons();
        this.initBasketTrash();
        this.initCoinsPanel();
        this.initLevelBar();
        this.initWavePanel();
        this.initIndcatorBoostAutoMerge();
        this.initIndcatorBoostSpeed();
        this.initIndcatorBoostCoins();
        this.initOfferTV();
        this.initSystemMessage();
        this.initHelicopter();
        this.initMergeAnimation();
        this.initSettingsWindow();
        this.initResetProgressWindow();
        this.initOfflineEarningWindow();
        this.initLevelUpWindow();
        this.initUpgradeWindow();
        this.initBoosterWindow();
        this.initFortunaWheelWindow();
        this.initRewardWindow();
        this.initShop();
        this.initInputScrolling();
        this.textFields.forEach(item => this.layerGUI.bringToTop(item));
        this.input.keyboard.on("keydown", this.handleKeyGUI, this)
    }
    initResize() {
        this.GAME_WIDTH = MainGame.Config.DEFAULT_WIDTH;
        this.GAME_HEIGHT = MainGame.Config.DEFAULT_HEIGHT;
        var gameSize = this.scale.gameSize;
        var width = gameSize.width;
        var height = gameSize.height;
        if (window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            height = window.innerHeight
        }
        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        this.scale.on("resize", this.updateResize, this)
    }
    updateResize() {
        var gameSize = this.scale.gameSize;
        var width = gameSize.width;
        var height = gameSize.height;
        if (MainGame.isDesktop && window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            height = window.innerHeight
        }
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        this.updateCamera()
    }
    updateCamera() {
        const camera = this.cameras.main;
        var deltaX = Math.ceil(this.parent.width - this.sizer.width) * .5;
        var deltaY = Math.ceil(this.parent.height - this.sizer.height) * .5;
        var sdvigY = 0;
        if (MainGame.isDesktop && window.innerHeight < MainGame.Config.MAX_HEIGHT) {
            deltaY = Math.ceil(window.innerHeight - this.sizer.height) * .5;
            sdvigY = this.scale.gameSize.height - window.innerHeight
        }
        const scaleX = this.sizer.width / this.GAME_WIDTH;
        const scaleY = this.sizer.height / this.GAME_HEIGHT;
        const zoom = Math.max(scaleX, scaleY);
        const offsetY = deltaY / zoom;
        const offsetX = deltaX / zoom;
        camera.setZoom(zoom);
        if (MainGame.isDesktop) {
            camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + offsetY + sdvigY)
        } else {
            camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2)
        }
    }
    handleKeyGUI(e) {
        switch (e.code) {
            case "Space":
                this.clickSpacebar();
                break
        }
    }
    clickSpacebar() {
        if (!this.layerRewardWindow.visible) return;
        this.closeRewardWindow()
    }
    initTutorial() {
        this.buttonUpgradeWall.visible = false;
        this.buttonShop.visible = false;
        this.icon_trash.visible = false;
        this.buttonFortuna.visible = false;
        this.buttonForge.visible = false;
        this.buttonSkill1.visible = false;
        this.buttonSkill2.visible = false;
        this.buttonSkill3.visible = false;
        var effect = this.add.sprite(this.midX, this.midY, "ss_main");
        effect.play("effect_tutor");
        effect.visible = false;
        this.effect_tutor = effect;
        this.tutor_arm = this.add.image(this.midX, this.midY, "ss_main", "tutor_cursor_0000");
        this.tutor_arm.visible = false;
        this.effect_tutor.setDepth(this.gameScreen.DEPTH_cursorcar);
        this.tutor_arm.setDepth(this.gameScreen.DEPTH_cursorcar);
        this.time.delayedCall(500, this.tutorialScenario, [], this);
        this.textTutorial = this.add.bitmapText(this.midX - 100, this.midY - 30, MainGame.fontName, "");
        this.textTutorial.setDropShadow(2, 2, 0, 1);
        this.textTutorial.setMaxWidth(450);
        this.textTutorial.setCenterAlign();
        this.textTutorial.setFontSize(34);
        this.textTutorial.setOrigin(.5);
        this.textTutorial.lineSpacing = -8;
        this.textTutorial.visible = false;
        this.textTutorial.setDepth(this.gameScreen.DEPTH_text_field)
    }
    tutorialScenario() {
        this.gameScreen.tutorialStep++;
        if (this.gameScreen.tutorialStep == 1) {
            this.tutor_arm.visible = true;
            this.effect_tutor.visible = true;
            this.tutor_arm.x = 480;
            this.tutor_arm.y = 540 + 25;
            this.effect_tutor.y = this.tutor_arm.y - 25;
            this.effect_tutor.x = this.tutor_arm.x - 5;
            this.tweens.add({
                targets: this.tutor_arm,
                scaleX: .9,
                scaleY: .9,
                ease: "Linear",
                duration: 500,
                yoyo: true,
                repeat: -1
            })
        } else if (this.gameScreen.tutorialStep == 3) {
            this.buttonAddCar.disableInput();
            var obj = this.gameScreen.arParking[6];
            this.tutor_arm.x = obj.x + 5;
            this.tutor_arm.y = obj.y + 30;
            this.effect_tutor.x = this.tutor_arm.x - 5;
            this.effect_tutor.y = this.tutor_arm.y - 25;
            this.textTutorial.visible = true;
            this.textTutorial.setText(MainGame.GAME_TEXT.text_merge);
            this.tweens.killTweensOf(this.tutor_arm);
            this.tutor_arm.setScale(1);
            this.tweens.add({
                targets: this.tutor_arm,
                y: this.tutor_arm.y - 100,
                ease: "Linear",
                duration: 900,
                repeat: -1,
                hold: 400
            })
        } else if (this.gameScreen.tutorialStep == 4) {
            var obj = this.gameScreen.arParking[5];
            this.tutor_arm.x = obj.x + 5;
            this.tutor_arm.y = obj.y + 30;
            this.effect_tutor.x = this.tutor_arm.x - 5;
            this.effect_tutor.y = this.tutor_arm.y - 25;
            this.textTutorial.setText(MainGame.GAME_TEXT.text_drag);
            this.tweens.killTweensOf(this.tutor_arm);
            var posAnim = {
                x: this.tutor_arm.x - 130,
                y: this.tutor_arm.y + 90
            };
            this.tweens.add({
                targets: this.tutor_arm,
                x: posAnim.x,
                y: posAnim.y,
                ease: "Linear",
                duration: 900,
                repeat: -1,
                hold: 400
            })
        } else if (this.gameScreen.tutorialStep == 5) {
            this.textTutorial.setText("");
            this.textTutorial.visible = false;
            this.tweens.killTweensOf(this.tutor_arm);
            this.gameScreen.addObject({
                lvl: 1,
                skinBox: true,
                parkingId: 5
            }, true);
            var obj = this.gameScreen.arParking[5];
            this.tutor_arm.x = obj.x + 5;
            this.tutor_arm.y = obj.y + 30;
            this.effect_tutor.x = this.tutor_arm.x - 5;
            this.effect_tutor.y = this.tutor_arm.y - 25;
            this.tutor_arm.setScale(1);
            this.tweens.add({
                targets: this.tutor_arm,
                scaleX: .9,
                scaleY: .9,
                ease: "Linear",
                duration: 500,
                yoyo: true,
                repeat: -1
            })
        } else if (this.gameScreen.tutorialStep == 6) {
            this.tweens.killTweensOf(this.tutor_arm);
            this.tutor_arm.destroy();
            this.effect_tutor.destroy();
            this.textTutorial.destroy();
            this.gameScreen.isGoTutorial = false;
            this.buttonUpgradeWall.visible = true;
            this.buttonShop.visible = true;
            this.icon_trash.visible = true;
            this.buttonFortuna.visible = false;
            this.buttonForge.visible = true;
            this.buttonAddCar.enableInput();
            this.buttonUpgradeWall.enableInput();
            this.gameScreen.finishTutorial()
        }
    }
    onFonInputDown() {
        this.isOnInputDown = true
    }
    onPopupOpen() {
        this.isPopupOpened = true
    }
    onFonInputUp() {
        if (!this.isOnInputDown) return;
        if (!this.isPopupOpened) return;
        this.eventFonImputUp()
    }
    clickBtnSkill1() {
        this.gameScreen.selectSkill(1, true)
    }
    clickBtnSkill2() {
        this.gameScreen.selectSkill(2, true)
    }
    clickBtnSkill3() {
        this.gameScreen.selectSkill(3, true)
    }
    initMainButtons() {
        var posX = 970;
        var posY = 500;
        var offsetSkills = 5;
        var buttonSettings = new Button(50, 640 - 50, "ss_main", "btn_settings_0000", this.openSettings, this);
        this.layerGUI.add(buttonSettings);
        this.buttonSettings = buttonSettings;
        var buttonSkill1 = new Button(100 + offsetSkills, posY, "ss_main", "btn_skill1_0000", this.clickBtnSkill1, this);
        this.layerGUI.add(buttonSkill1);
        this.buttonSkill1 = buttonSkill1;
        var buttonSkill2 = new Button(190 + offsetSkills, posY, "ss_main", "btn_skill2_0000", this.clickBtnSkill2, this);
        this.layerGUI.add(buttonSkill2);
        this.buttonSkill2 = buttonSkill2;
        var buttonSkill3 = new Button(280 + offsetSkills, posY, "ss_main", "btn_skill3_0000", this.clickBtnSkill3, this);
        this.layerGUI.add(buttonSkill3);
        this.buttonSkill3 = buttonSkill3;
        var skill_cd1 = this.add.image(buttonSkill1.x, buttonSkill1.y - 36, "ss_main", "skill_cd_0000");
        skill_cd1.setOrigin(.5, 0);
        this.layerGUI.add(skill_cd1);
        var skill_cd2 = this.add.image(buttonSkill2.x, buttonSkill2.y - 36, "ss_main", "skill_cd_0000");
        skill_cd2.setOrigin(.5, 0);
        this.layerGUI.add(skill_cd2);
        var skill_cd3 = this.add.image(buttonSkill3.x, buttonSkill3.y - 36, "ss_main", "skill_cd_0000");
        skill_cd3.setOrigin(.5, 0);
        this.layerGUI.add(skill_cd3);
        this.skill_cd1 = skill_cd1;
        this.skill_cd2 = skill_cd2;
        this.skill_cd3 = skill_cd3;
        var ramka_skill = this.add.sprite(buttonSkill1.x, buttonSkill1.y, "ss_main");
        ramka_skill.play("skill_highlight");
        ramka_skill.visible = false;
        this.layerGUI.add(ramka_skill);
        this.ramka_skill = ramka_skill;
        var buttonFortuna = new Button(50, 120, "ss_main", "btn_fortune_0000", this.openFortunaWheelWindow, this);
        this.layerGUI.add(buttonFortuna);
        this.buttonFortuna = buttonFortuna;
        var buttonForge = new ButtonText(920, posY, "ss_main", "btn_forge_0000", this.clickForgeButton, this, "");
        this.layerGUI.add(buttonForge);
        this.buttonForge = buttonForge;
        var icon_forge1 = this.add.image(0, -2, "ss_main", "icon_forge1_0000");
        buttonForge.add(icon_forge1);
        this.icon_forge1 = icon_forge1;
        var icon_forge2 = this.add.image(0, -2, "ss_main", "icon_forge2_0000");
        buttonForge.add(icon_forge2);
        this.icon_forge2 = icon_forge2;
        this.forge_crop = new Phaser.Geom.Rectangle(0, 0, this.icon_forge2.height, 0);
        this.icon_forge2.setCrop(this.forge_crop);
        var buttonAddCar = new ButtonText(this.midX - 60, posY, "ss_main", "btn_big_0000", this.clickAddCarButton, this, "123.456");
        this.layerGUI.add(buttonAddCar);
        this.buttonAddCar = buttonAddCar;
        var icon_window = this.add.image(-70, 0, "ss_main", "icon_window1_0000");
        buttonAddCar.add(icon_window);
        var icon_fast_coin = this.add.image(0, 0, "ss_main", "money_0000");
        icon_fast_coin.setScale(.7);
        buttonAddCar.add(icon_fast_coin);
        var icon_fast_car = this.add.image(-48, 32, this.SPRITE_SHEET, "icon_r1_0000");
        icon_fast_car.setScale(.65);
        icon_fast_car.setOrigin(.8, 1);
        buttonAddCar.add(icon_fast_car);
        buttonAddCar.bringToTop(buttonAddCar.text);
        buttonAddCar.text.setFontSize(26);
        var effect1 = this.add.sprite(buttonAddCar.x, buttonAddCar.y, "ss_main");
        effect1.play("flash_btn_big");
        effect1.visible = false;
        effect1.setScale(2);
        this.layerGUI.add(effect1);
        this.btn_fastbuy_effect = effect1;
        var effect2 = this.add.sprite(buttonForge.x, buttonForge.y, "ss_main");
        effect2.play("flash_btn_forge");
        effect2.visible = false;
        effect2.setScale(2);
        this.layerGUI.add(effect2);
        this.btn_forge_effect = effect2;
        var effectBlink1 = this.add.sprite(buttonSkill1.x, buttonSkill1.y, "ss_main");
        effectBlink1.play("flash_btn_forge");
        effectBlink1.visible = false;
        effectBlink1.setScale(1.4, 1.9);
        this.layerGUI.add(effectBlink1);
        this.effectBlink1 = effectBlink1;
        var effectBlink2 = this.add.sprite(buttonSkill2.x, buttonSkill2.y, "ss_main");
        effectBlink2.play("flash_btn_forge");
        effectBlink2.visible = false;
        effectBlink2.setScale(1.4, 1.9);
        this.layerGUI.add(effectBlink2);
        this.effectBlink2 = effectBlink2;
        var effectBlink3 = this.add.sprite(buttonSkill3.x, buttonSkill3.y, "ss_main");
        effectBlink3.play("flash_btn_forge");
        effectBlink3.visible = false;
        effectBlink3.setScale(1.4, 1.9);
        this.layerGUI.add(effectBlink3);
        this.effectBlink3 = effectBlink3;
        this.buttonAddCar = buttonAddCar;
        this.icon_fast_car = icon_fast_car;
        this.icon_fast_coin = icon_fast_coin;
        var buttonUpgradeWall = new ButtonText(this.midX + 265, posY - 6, "ss_main", "btn_wall_0000", this.clickUpgradeWallButton, this, "123.456");
        this.layerGUI.add(buttonUpgradeWall);
        this.buttonUpgradeWall = buttonUpgradeWall;
        var icon_wall_coin = this.add.image(0, 0, "ss_main", "money_0000");
        icon_wall_coin.setScale(.5);
        buttonUpgradeWall.add(icon_wall_coin);
        var hp_wall1 = this.add.image(0, 35, "ss_main", "hp_wall1_0000");
        var hp_wall2 = this.add.image(0, 35, "ss_main", "hp_wall2_0000");
        this.hp_wall2 = hp_wall2;
        this.hp_wall_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.hp_wall2.height);
        this.hp_wall2.setCrop(this.hp_wall_crop);
        buttonUpgradeWall.add(hp_wall1);
        buttonUpgradeWall.add(hp_wall2);
        buttonUpgradeWall.bringToTop(buttonUpgradeWall.text);
        buttonUpgradeWall.text.setFontSize(20);
        this.text_wallhp = MainGame.addText(this, buttonUpgradeWall, 0, hp_wall1.y - 1, "1000/1000", 14, true, false);
        this.buttonUpgradeWall = buttonUpgradeWall;
        this.icon_wall_coin = icon_wall_coin;
        var buttonShop = new ButtonText(this.midX + 120, posY, "ss_main", "btn_shop_0000", this.clickShop, this, MainGame.GAME_TEXT.shop);
        this.layerGUI.add(buttonShop);
        this.buttonShop = buttonShop;
        buttonShop.text.setFontSize(20);
        buttonShop.text.y = 22;
        var iconAdvShop = this.add.image(45, -35, "ss_main", "icon_adv_0000");
        buttonShop.add(iconAdvShop);
        this.iconAdvShop = iconAdvShop;
        iconAdvShop.angle = -4;
        this.tweens.add({
            targets: iconAdvShop,
            scaleX: 1.15,
            scaleY: 1.15,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: iconAdvShop,
            angle: 4,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.iconAdvShop.visible = false;
        var iconAdvShop2 = this.add.image(45, -35, "ss_main", "icon_adv_0000");
        buttonShop.add(iconAdvShop2);
        this.iconAdvShop2 = iconAdvShop2;
        iconAdvShop2.angle = -4;
        this.tweens.add({
            targets: iconAdvShop2,
            scaleX: 1.15,
            scaleY: 1.15,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: iconAdvShop2,
            angle: 4,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.iconAdvShop2.visible = false;
        var iconAdvWall = this.add.image(73, -35, "ss_main", "icon_adv_0000");
        buttonUpgradeWall.add(iconAdvWall);
        this.iconAdvWall = iconAdvWall;
        iconAdvWall.angle = -4;
        this.tweens.add({
            targets: iconAdvWall,
            scaleX: 1.15,
            scaleY: 1.15,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: iconAdvWall,
            angle: 4,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.iconAdvWall.visible = false;
        var iconAdvFortune = this.add.image(this.buttonFortuna.x + 21, this.buttonFortuna.y - 21, "ss_main", "icon_adv_0000");
        this.layerGUI.add(iconAdvFortune);
        this.iconAdvFortune = iconAdvFortune;
        iconAdvFortune.angle = -4;
        this.tweens.add({
            targets: iconAdvFortune,
            scaleX: 1.15,
            scaleY: 1.15,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: iconAdvFortune,
            angle: 4,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.iconAdvFortune.visible = false
    }
    updateSkillCd1(progress) {
        this.skill_cd1.scaleY = progress
    }
    updateSkillCd2(progress) {
        this.skill_cd2.scaleY = progress
    }
    updateSkillCd3(progress) {
        this.skill_cd3.scaleY = progress
    }
    showBtnFastbuyEffect() {
        this.btn_fastbuy_effect.visible = true;
        this.btn_fastbuy_effect.play("flash_btn_big")
    }
    showBtnForgeEffect() {
        this.btn_forge_effect.visible = true;
        this.btn_forge_effect.play("flash_btn_forge")
    }
    showBtnSkillEffect(vNum) {
        if (vNum == 1) {
            this.effectBlink1.visible = true;
            this.effectBlink1.play("flash_btn_forge")
        } else if (vNum == 2) {
            this.effectBlink2.visible = true;
            this.effectBlink2.play("flash_btn_forge")
        } else if (vNum == 3) {
            this.effectBlink3.visible = true;
            this.effectBlink3.play("flash_btn_forge")
        }
    }
    clickForgeButton() {
        this.gameScreen.clickForge()
    }
    clickAddCarButton() {
        this.gameScreen.buyFastCar()
    }
    clickUpgradeWallButton() {
        this.gameScreen.clickBuyWall()
    }
    showIconAdvWall(vIsBool) {
        this.iconAdvWall.visible = vIsBool
    }
    showIconAdvUpgrades(vIsBool) {
        this.iconAdvUpgrades.visible = vIsBool;
        this.iconAdvShop2.visible = vIsBool
    }
    showFinishWindow(vIsWin) {
        this.isShowingFinish = true;
        this.gameScreen.setGameLogicPause(true);
        this.layerFinishWindow = this.add.container();
        var fon_merge = this.add.image(0, 0, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerFinishWindow.add(fon_merge);
        this.layerFinishWindow.setDepth(this.gameScreen.DEPTH_layerLevelBar);
        this.layerFinishWindow.x = this.midX;
        this.layerFinishWindow.y = this.midY + this.posWindowY;
        this.layerFinishWindow.setScale(this.scaleWindow1);
        this.tweens.add({
            targets: this.layerFinishWindow,
            scaleX: this.scaleWindow2,
            scaleY: this.scaleWindow2,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 400
        });
        this.disableMainButtons();
        var fon_window = this.add.image(0, 10, this.SPRITE_SHEET, "bg_victory_0000");
        fon_window.setScale(2);
        this.layerFinishWindow.add(fon_window);
        if (vIsWin) {
            var offY = 35;
            var popup_victory = this.add.image(0, -163, this.SPRITE_SHEET, "popup_victory_0000");
            var flash_select_gun = this.add.image(0, 83, this.SPRITE_SHEET, "flash_select_gun_0000");
            var icon_coin = this.add.image(5, -80 + offY, this.SPRITE_SHEET, "money_0000");
            icon_coin.setScale(.7);
            var icon_chick = this.add.image(5, -35 + offY, this.SPRITE_SHEET, "icon_chick_0000");
            var buttonWinX2 = new ButtonText(0, 80, this.SPRITE_SHEET, "btn_buy2_0000", this.clickWinX2Button, this, "+ 252K");
            MainGame.updateTextWidth(buttonWinX2.text, 200);
            buttonWinX2.text.x = -5;
            var icon_btn_coin = this.add.image(-85, -1, this.SPRITE_SHEET, "money_0000");
            var icon_btn_reward = this.add.image(85, -1, this.SPRITE_SHEET, "icon_reward_0000");
            buttonWinX2.add(icon_btn_coin);
            buttonWinX2.add(icon_btn_reward);
            this.buttonWinX2 = buttonWinX2;
            if (MainGame.isAPI) {
                if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.buttonWinX2.setEnable(false)
            } else {
                if (!MainGame.isDebugAds) this.buttonWinX2.setEnable(false)
            }
            var buttonClose = new ButtonText(0, 145, this.SPRITE_SHEET, "btn_buy2_0000", this.closeFinishWindow, this, MainGame.GAME_TEXT.no_thanks);
            buttonClose.text.setFontSize(24);
            MainGame.updateTextWidth(buttonClose.text, 320);
            buttonClose.back.alpha = .01;
            buttonClose.text.setTint(16777215);
            this.layerFinishWindow.add(popup_victory);
            this.layerFinishWindow.add(flash_select_gun);
            this.layerFinishWindow.add(icon_coin);
            this.layerFinishWindow.add(icon_chick);
            this.layerFinishWindow.add(buttonWinX2);
            this.layerFinishWindow.add(buttonClose);
            var text_earned = MainGame.addText(this, this.layerFinishWindow, -125, -80 + offY, MainGame.GAME_TEXT.earned, 26, true);
            var text_killed = MainGame.addText(this, this.layerFinishWindow, -125, -35 + offY, MainGame.GAME_TEXT.killed, 26, true);
            text_earned.setTint(16773888);
            text_earned.setDropShadow(-1, 2, 3281430, 1);
            text_killed.setTint(16773888);
            text_killed.setDropShadow(-1, 2, 3281430, 1);
            text_earned.setOrigin(0, .5);
            text_killed.setOrigin(0, .5);
            var text_title_win = MainGame.addText(this, this.layerFinishWindow, 0, -133, MainGame.GAME_TEXT.wave_cleared, 34, true);
            var text_finish_coins = MainGame.addText(this, this.layerFinishWindow, icon_coin.x + 30, -80 + offY, "126K", 26, true);
            var text_finish_enemies = MainGame.addText(this, this.layerFinishWindow, icon_coin.x + 30, -35 + offY, "48", 26, true);
            text_finish_coins.setOrigin(0, .5);
            text_finish_enemies.setOrigin(0, .5);
            var text1_warm = MainGame.convertNumberFormat(this.gameScreen.coins_earned);
            var text2_warm = MainGame.convertNumberFormat(this.gameScreen.enemies_killed);
            var text3_warm = MainGame.convertNumberFormat(this.gameScreen.coins_earned);
            text_finish_coins.setText(text1_warm);
            text_finish_enemies.setText(text2_warm);
            buttonWinX2.text.setText("+ " + text3_warm);
            MainGame.updateTextWidth(buttonWinX2.text, 120);
            if (MainGame.isAutoPlay) this.closeFinishWindow()
        } else {
            this.layerFinishWindow.y = 300;
            var popup_defeat = this.add.image(0, -160, this.SPRITE_SHEET, "popup_defeat_0000");
            var flash_select_gun = this.add.image(0, -5, this.SPRITE_SHEET, "flash_select_gun_0000");
            this.layerFinishWindow.add(popup_defeat);
            this.layerFinishWindow.add(flash_select_gun);
            var buttonContinue = new ButtonText(0, 0, this.SPRITE_SHEET, "btn_replay_0000", this.clickContinueDefeat, this);
            this.layerFinishWindow.add(buttonContinue);
            var text_title_lose = MainGame.addText(this, this.layerFinishWindow, 0, -131, MainGame.GAME_TEXT.defeat, 34, true);
            var text_no_give_up = MainGame.addText(this, this.layerFinishWindow, 0, 85 + 5, MainGame.GAME_TEXT.no_give_up, 22, true);
            var text_try_merge_gun = MainGame.addText(this, this.layerFinishWindow, 0, 115 + 5, MainGame.GAME_TEXT.try_merge_gun, 22, true);
            if (MainGame.isAutoPlay) this.clickContinueDefeat()
        }
    }
    clickWinX2Button() {
        this.isShowingFinish = false;
        this.buttonWinX2.setEnable(false);
        this.gameScreen.clickWinX2Button()
    }
    closeFinishWindow() {
        this.isShowingFinish = false;
        this.layerFinishWindow.destroy();
        this.gameScreen.closeFinishWindow()
    }
    clickContinueDefeat() {
        this.isShowingFinish = false;
        this.layerFinishWindow.destroy();
        this.gameScreen.clickContinueDefeat()
    }
    initLevelBar() {
        this.layerPanelLevel = this.add.container();
        var pos = {
            x: 50,
            y: 45
        };
        var panel_bar = this.add.image(pos.x, pos.y, "ss_main", "panel_bar_0000");
        this.levelBarB = this.add.image(pos.x + 107, pos.y - 11, "ss_main", "exp1_0000");
        this.levelBarT = this.add.image(pos.x + 107, pos.y - 11, "ss_main", "exp2_0000");
        this.levelBarT_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.levelBarT.height);
        this.levelBarT.setCrop(this.levelBarT_crop);
        this.textLevel = this.add.bitmapText(pos.x - 1, pos.y + 6, MainGame.fontName, this.gameScreen.currentLevel, 26);
        this.textLevel.setOrigin(.5, .5);
        this.textLevel.setDropShadow(-2, 2, 0, 1);
        this.layerPanelLevel.add(panel_bar);
        this.layerPanelLevel.add(this.levelBarB);
        this.layerPanelLevel.add(this.levelBarT);
        this.layerPanelLevel.add(this.textLevel);
        var text_level = MainGame.addText(this, this.layerPanelLevel, pos.x, pos.y - 13, MainGame.GAME_TEXT.level, 13, true);
        text_level.setOrigin(.5, .5);
        MainGame.updateTextWidth(text_level, 400);
        this.layerPanelLevel.setDepth(this.gameScreen.DEPTH_layerLevelBar)
    }
    updateLevel(progress, delay) {
        var originalWidth = this.levelBarT.width;
        var width = originalWidth * progress;
        delay = delay || 0;
        this.tweens.killTweensOf(this.levelBarT_crop);
        this.tweens.add({
            targets: this.levelBarT_crop,
            width: width,
            ease: Phaser.Math.Easing.Linear,
            duration: 200,
            delay: delay,
            onUpdate: () => {
                this.levelBarT.setCrop(this.levelBarT_crop)
            }
        })
    }
    initWavePanel() {
        this.layerPanelWave = this.add.container();
        var pos = {
            x: 410,
            y: 45
        };
        var panel_bar = this.add.image(pos.x, pos.y, "ss_main", "panel_bar_0000");
        this.waveBarB = this.add.image(pos.x + 107, pos.y - 11, "ss_main", "wave_bar1_0000");
        this.waveBarT = this.add.image(pos.x + 107, pos.y - 11, "ss_main", "wave_bar2_0000");
        this.waveBarT_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.waveBarT.height);
        this.waveBarT.setCrop(this.waveBarT_crop);
        this.textWave = this.add.bitmapText(pos.x - 1, pos.y + 6, MainGame.fontName, "1", 26);
        this.textWave.setOrigin(.5, .5);
        this.textWave.setDropShadow(-2, 2, 0, 1);
        this.layerPanelWave.add(panel_bar);
        this.layerPanelWave.add(this.waveBarB);
        this.layerPanelWave.add(this.waveBarT);
        this.layerPanelWave.add(this.textWave);
        var text_wave = MainGame.addText(this, this.layerPanelWave, pos.x, pos.y - 13, MainGame.GAME_TEXT.wave, 13, true);
        text_wave.setOrigin(.5, .5);
        MainGame.updateTextWidth(text_wave, 400);
        this.layerPanelWave.setDepth(this.gameScreen.DEPTH_layerWaveBar)
    }
    updateWaveBar(progress) {
        var originalWidth = this.waveBarT.width;
        var width = originalWidth * progress;
        this.waveBarT_crop.width = width;
        this.waveBarT.setCrop(this.waveBarT_crop)
    }
    updateWavePanel(value) {
        this.textWave.setText(value)
    }
    initOfferTV() {
        var buttonPanelTV = new ButtonText(58, 220, "ss_main", "btn_free_boost_0000", this.clickOfferTV, this, "");
        this.layerGUI.add(buttonPanelTV);
        this.buttonPanelTV = buttonPanelTV;
        var icon_forge1 = this.add.image(-10, -8, "ss_main", "indicator_boost_0000");
        buttonPanelTV.add(icon_forge1);
        this.buttonPanelTV.setEnable(false);
        this.buttonPanelTV.visible = false;
        this.tweens.add({
            targets: buttonPanelTV,
            scaleX: .95,
            scaleY: .95,
            ease: "Linear",
            duration: 500,
            yoyo: true,
            repeat: -1
        })
    }
    showOfferTV() {
        if (this.buttonPanelTV.visible || this.gameScreen.isAutoMerge) return;
        this.buttonPanelTV.setEnable(true);
        if (MainGame.isAPI) {
            if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.buttonPanelTV.setEnable(false)
        } else {
            if (!MainGame.isDebugAds) this.buttonPanelTV.setEnable(false)
        }
        this.buttonPanelTV.visible = true;
        this.buttonPanelTV.x = -100;
        this.tweens.add({
            targets: this.buttonPanelTV,
            x: 58,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 500
        });
        this.time.delayedCall(1e4, this.hideOfferTV, [], this)
    }
    hideOfferTV() {
        if (!this.buttonPanelTV.visible) return;
        var buttonPanelTV = this.buttonPanelTV;
        this.buttonPanelTV.setEnable(false);
        this.buttonPanelTV.x = 52;
        this.tweens.add({
            targets: this.buttonPanelTV,
            x: -100,
            ease: Phaser.Math.Easing.Back.In,
            duration: 500,
            onComplete: function(tween) {
                buttonPanelTV.visible = false
            }
        });
        this.gameScreen.countDownOfferTV = -30
    }
    clickOfferTV() {
        this.gameScreen.clickOfferTV()
    }
    initIndcatorBoostAutoMerge() {
        var icon = this.add.image(0, 0, "ss_main", "indicator_boost_0000");
        var txt = MainGame.addText(this, this.layerGUI, 0, 0, "", 18);
        txt.setText(MainGame.secToHHMMSS(105));
        this.layerGUI.add(icon);
        this.iconIndicatorAutoMerge = icon;
        this.textFieldIndicatorAutoMerge = txt;
        this.iconIndicatorAutoMerge.x = 50;
        this.iconIndicatorAutoMerge.y = 200;
        this.textFieldIndicatorAutoMerge.x = 50;
        this.textFieldIndicatorAutoMerge.y = this.iconIndicatorAutoMerge.y + 40;
        this.textFields.push(txt)
    }
    initIndcatorBoostSpeed() {
        var icon = this.add.image(0, 0, "ss_main", "indicator_boost2_0000");
        var txt = MainGame.addText(this, this.layerGUI, 0, 0, "", 18);
        txt.setText(MainGame.secToHHMMSS(110));
        this.layerGUI.add(icon);
        this.iconIndicatorSpeed = icon;
        this.textFieldIndicatorSpeed = txt;
        this.iconIndicatorSpeed.x = 50;
        this.iconIndicatorSpeed.y = 200 + 90;
        this.textFieldIndicatorSpeed.x = 50;
        this.textFieldIndicatorSpeed.y = this.iconIndicatorSpeed.y + 40;
        this.textFields.push(txt)
    }
    initIndcatorBoostCoins() {
        var icon = this.add.image(0, 0, "ss_main", "indicator_boost3_0000");
        var txt = MainGame.addText(this, this.layerGUI, 0, 0, "", 18);
        txt.setText(MainGame.secToHHMMSS(115));
        this.layerGUI.add(icon);
        this.iconIndicatorCoins = icon;
        this.textFieldIndicatorCoins = txt;
        this.iconIndicatorCoins.x = 50;
        this.iconIndicatorCoins.y = 200 + 90 + 90;
        this.textFieldIndicatorCoins.x = 50;
        this.textFieldIndicatorCoins.y = this.iconIndicatorCoins.y + 40;
        this.textFields.push(txt)
    }
    enableIndcatorBoostAutoMerge(vBool) {
        this.iconIndicatorAutoMerge.visible = vBool;
        this.textFieldIndicatorAutoMerge.visible = vBool
    }
    enableIndcatorBoostSpeed(vBool) {
        this.iconIndicatorSpeed.visible = vBool;
        this.textFieldIndicatorSpeed.visible = vBool
    }
    enableIndcatorBoostCoins(vBool) {
        this.iconIndicatorCoins.visible = vBool;
        this.textFieldIndicatorCoins.visible = vBool
    }
    updateIndcatorBoostAutoMerge(vValue) {
        this.textFieldIndicatorAutoMerge.setText(vValue)
    }
    updateIndcatorBoostSpeed(vValue) {
        this.textFieldIndicatorSpeed.setText(vValue)
    }
    updateIndcatorBoostCoins(vValue) {
        this.textFieldIndicatorCoins.setText(vValue)
    }
    updateWallHp(progress, vValue1, vValue2) {
        var originalWidth = this.hp_wall2.width;
        var width = originalWidth * progress;
        this.hp_wall_crop.width = width;
        this.hp_wall2.setCrop(this.hp_wall_crop);
        this.text_wallhp.setText(vValue1 + "/" + vValue2)
    }
    updateForge(progress) {
        var originalHeight = this.icon_forge1.height;
        var height = originalHeight * progress;
        this.forge_crop.height = height;
        this.icon_forge2.setCrop(this.forge_crop)
    }
    updateFastBuy() {
        var typeFastCar = this.gameScreen.getTypeBetterPrice();
        var price = this.gameScreen.getPriceCar(typeFastCar);
        price = Math.round(price * this.gameScreen.factorDiscount);
        var text_coins_warm = MainGame.convertNumberFormat(price);
        this.buttonAddCar.text.setText(text_coins_warm);
        this.buttonAddCar.text.x = 50;
        this.buttonAddCar.text.y = -2;
        this.icon_fast_coin.x = this.buttonAddCar.text.x - this.buttonAddCar.text.width * .5 - 20;
        if (typeFastCar > 50) typeFastCar = 50;
        this.icon_fast_car.setFrame("icon_r" + typeFastCar + "_0000");
        this.icon_fast_car.setScale(.65);
        var width = this.icon_fast_car.displayWidth;
        var scale = .65;
        if (width > 80) {
            scale = 90 / width / 1.54
        }
        this.icon_fast_car.setScale(scale)
    }
    testFastBuy(vType) {
        if (vType > 50) vType = 50;
        this.icon_fast_car.setFrame("icon_r" + vType + "_0000");
        this.icon_fast_car.setScale(.65);
        var width = this.icon_fast_car.displayWidth;
        var scale = .65;
        if (width > 80) {
            scale = 90 / width / 1.54
        }
        this.icon_fast_car.setScale(scale)
    }
    updateWallBuy() {
        var price = this.gameScreen.getPriceWall();
        price = Math.round(price * this.gameScreen.factorDiscount);
        var text_coins_warm = MainGame.convertNumberFormat(price);
        this.buttonUpgradeWall.text.setText(text_coins_warm);
        this.buttonUpgradeWall.text.x = 10;
        this.buttonUpgradeWall.text.y = 12;
        this.icon_wall_coin.x = this.buttonUpgradeWall.text.x - this.buttonUpgradeWall.text.width * .5 - 15;
        this.icon_wall_coin.y = this.buttonUpgradeWall.text.y + 1
    }
    initHelicopter() {
        this.helicopter = this.add.container();
        this.heli_shadow = this.add.container();
        this.heli_body = this.add.container();
        this.helicopter.add(this.heli_shadow);
        this.helicopter.add(this.heli_body);
        this.helicopter.setDepth(this.gameScreen.DEPTH_helicopter);
        this.helicopter.setInteractive(new Phaser.Geom.Circle(0, 0, 60), Phaser.Geom.Circle.Contains);
        this.helicopter.on("pointerup", this.onClickHelicopter, this);
        this.helicopter.x = 400;
        this.helicopter.y = 200;
        var shadow = this.add.image(0, 130, "ss_main", "booster_shadow_0000");
        var dron_box = this.add.image(0, 15, "ss_main", "box_drone_0000");
        dron_box.setOrigin(.5, .1);
        var dron_body = this.add.image(0, 0, "ss_main", "booster_0000");
        var propeller1 = this.add.sprite(-2, dron_body.y - 8, "ss_main");
        propeller1.play("propeller1");
        this.heli_shadow.add(shadow);
        this.heli_body.add(dron_box);
        this.heli_body.add(dron_body);
        this.heli_body.add(propeller1);
        this.dron_box = dron_box;
        this.dron_body = dron_body;
        this.dron_propeller = propeller1;
        this.helicopter.visible = false
    }
    showHelicopter() {
        this.helicopter.setInteractive();
        this.isShowHelicopter = true;
        this.helicopter.visible = true;
        this.countHelicopterFly = 3;
        this.maxDistX = 650;
        this.speedDron = 1;
        this.flagHelicopter = Math.random() >= .5;
        this.flagHelicopter = false;
        if (this.flagHelicopter) {
            this.helicopter.x = this.midX + this.maxDistX
        } else {
            this.helicopter.x = this.midX - this.maxDistX
        }
        this.waveCount = 0;
        this.waveStart = 2 * Math.random()
    }
    updateHelicopter() {
        if (!this.isShowHelicopter) return;
        this.waveCount += .02;
        this.helicopter.y = 250 + Math.sin(this.waveStart + this.waveCount) * 50;
        if (this.flagHelicopter) {
            this.dron_body.angle = Phaser.Math.RadToDeg(Math.sin(this.waveCount) * .07) - 5;
            this.dron_box.angle = Phaser.Math.RadToDeg(Math.sin(this.waveCount) * .25) - 10
        } else {
            this.dron_body.angle = Phaser.Math.RadToDeg(Math.sin(this.waveCount) * .07) + 5;
            this.dron_box.angle = Phaser.Math.RadToDeg(Math.sin(this.waveCount) * .25) + 10
        }
        this.dron_propeller.angle = this.dron_body.angle;
        if (this.flagHelicopter) {
            this.helicopter.x -= this.speedDron;
            if (this.helicopter.x < this.midX - this.maxDistX) {
                this.flagHelicopter = false;
                this.countHelicopterFly--;
                if (this.countHelicopterFly <= 0) {
                    this.isShowHelicopter = false;
                    this.helicopter.visible = false
                }
            }
        } else {
            this.helicopter.x += this.speedDron;
            if (this.helicopter.x > this.midX + 110) {
                this.flagHelicopter = true;
                this.countHelicopterFly--
            }
        }
    }
    onClickHelicopter() {
        if (this.gameScreen.isGameOver) return;
        if (!this.buttonEnabled) return;
        this.gameScreen.getHelicopterBonus();
        this.showBoosterWindow(this.gameScreen.helicopterBonus)
    }
    initBasketTrash() {
        var posX = 950;
        var posY = 590;
        this.icon_trash = this.gameScreen.add.image(posX, posY, "ss_main", "btn_delete_0000");
        var effect = this.gameScreen.add.sprite(this.icon_trash.x, this.icon_trash.y, "ss_main");
        effect.play("delete_flash");
        effect.visible = false;
        this.delete_flash = effect;
        this.icon_trash.setDepth(this.gameScreen.DEPTH_layerTowers);
        this.delete_flash.setDepth(this.gameScreen.DEPTH_layerTowers)
    }
    enableMainButtons() {
        if (this.isShowingFinish) return;
        this.buttonEnabled = true;
        this.buttonFortuna.enableInput();
        this.buttonShop.enableInput();
        this.buttonSettings.enableInput();
        this.buttonForge.enableInput();
        if (this.gameScreen.isGoTutorial && (this.gameScreen.tutorialStep >= 3 && this.gameScreen.tutorialStep <= 5)) return;
        this.buttonAddCar.enableInput();
        this.buttonUpgradeWall.enableInput()
    }
    disableMainButtons(vSkipApiEvent, vSkipCheckInput) {
        if (!vSkipCheckInput) this.gameScreen.checkInputs();
        this.buttonEnabled = false;
        this.isOnInputDown = false;
        this.isPopupOpened = false;
        this.buttonFortuna.disableInput();
        this.buttonAddCar.disableInput();
        this.buttonUpgradeWall.disableInput();
        this.buttonShop.disableInput();
        this.buttonSettings.disableInput();
        this.buttonForge.disableInput();
        if (MainGame.isAPI && !vSkipApiEvent) {
            MainGame.isApiGameplayStop = true;
            MainGame.API_POKI.gameplayStop()
        }
    }
    initCoinsPanel() {
        var posX = this.midX - 50;
        var posY = 450 - 20;
        var panel = this.add.image(posX, posY, "ss_main", "panel_money_0000");
        var coin = this.add.image(posX - 90, posY, "ss_main", "money_0000");
        this.panel = panel;
        this.icons_coin = coin;
        this.textCoins = this.add.bitmapText(posX + 5, posY - 1, MainGame.fontName, "192.640K", 26);
        this.textCoins.setOrigin(.5, .5);
        this.textCoins.setDropShadow(-2, 2, 0, 1);
        this.layerGUI.add(this.panel);
        this.layerGUI.add(this.icons_coin);
        this.layerGUI.add(this.textCoins);
        this.textFields.push(this.textCoins)
    }
    updateCoins(vValue) {
        this.textCoins.setText(vValue)
    }
    initSystemMessage() {
        this.textSystemContainer = this.add.container();
        this.textSystemContainer.x = this.midX;
        this.textSystemContainer.y = MainGame.world.centerY - 100;
        var txt = this.add.bitmapText(0, 0, MainGame.fontName, "");
        txt.setDropShadow(2, 2, 0, 1);
        txt.setOrigin(.5);
        txt.setMaxWidth(550);
        txt.setCenterAlign();
        txt.setFontSize(34);
        txt.setTint(16183785);
        this.textSystemContainer.add(txt);
        this.textSystemContainer.setDepth(this.gameScreen.DEPTH_systemtext);
        this.textSystemContainer.visible = false;
        this.textSystem = txt
    }
    showSystemMessage(vText) {
        this.textSystemContainer.visible = true;
        this.textSystem.setText(vText);
        this.textSystemContainer.alpha = .2;
        this.textSystemContainer.y = this.midY - 20;
        this.textSystemContainer.setScale(.8);
        this.tweens.killTweensOf(this.textSystemContainer);
        this.tweens.add({
            targets: this.textSystemContainer,
            alpha: 1,
            ease: "Linear",
            duration: 150
        });
        this.tweens.add({
            targets: this.textSystemContainer,
            scaleX: 1,
            scaleY: 1,
            ease: "Linear",
            duration: 150
        });
        this.tweens.add({
            targets: this.textSystemContainer,
            alpha: 0,
            ease: "Linear",
            delay: 1500,
            duration: 200,
            onComplete: this.finishSystemTextTween
        });
        this.tweens.add({
            targets: this.textSystemContainer,
            y: this.textSystemContainer.y - 20,
            ease: "Linear",
            delay: 150,
            duration: 1200
        })
    }
    initMergeAnimation() {
        this.layerMerge = this.add.container();
        this.layerUnlocked = this.add.container();
        this.layerMerge.setDepth(this.gameScreen.DEPTH_layerMerge);
        this.layerUnlocked.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerUnlocked.x = this.midX;
        this.layerUnlocked.y = this.midY + this.posWindowY;
        var fon_merge = this.add.image(this.midX, this.midY, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerMerge.add(fon_merge);
        var fon_unlock = this.add.image(0, 0, this.SPRITE_SHEET, "popup_unlocked_0000");
        fon_unlock.setScale(2);
        this.layerUnlocked.add(fon_unlock);
        var effect = this.add.sprite(0, -25, this.SPRITE_SHEET);
        effect.play("magic_1");
        effect.setScale(2);
        this.layerUnlocked.add(effect);
        var icon_window1 = this.add.image(0, -30, this.SPRITE_SHEET, "icon_window1_0000");
        this.layerUnlocked.add(icon_window1);
        var unlocked_car = this.add.image(35, 17, this.SPRITE_SHEET, "icon_r1_0000");
        unlocked_car.setOrigin(.85, 1);
        this.layerUnlocked.add(unlocked_car);
        this.unlocked_car = unlocked_car;
        var car1_merge = this.add.container();
        var car2_merge = this.add.container();
        car1_merge.x = this.midX - 100;
        car1_merge.y = this.midY - 40;
        car2_merge.x = this.midX + 100;
        car2_merge.y = this.midY - 40;
        var icon_window1_1 = this.add.image(0, 0, this.SPRITE_SHEET, "icon_window1_0000");
        var icon_window1_2 = this.add.image(0, 0, this.SPRITE_SHEET, "icon_window1_0000");
        var icon_car1_merge = this.add.image(35, icon_window1_1.y + 38, this.SPRITE_SHEET, "icon_r1_0000");
        icon_car1_merge.setOrigin(.85, 1);
        var icon_car2_merge = this.add.image(35, icon_window1_2.y + 38, this.SPRITE_SHEET, "icon_r1_0000");
        icon_car2_merge.setOrigin(.85, 1);
        icon_window1_1.setScale(.8);
        icon_window1_2.setScale(.8);
        icon_car1_merge.setScale(.8);
        icon_car2_merge.setScale(.8);
        this.layerMerge.add(car1_merge);
        this.layerMerge.add(car2_merge);
        car1_merge.add(icon_window1_1);
        car1_merge.add(icon_car1_merge);
        car2_merge.add(icon_window1_2);
        car2_merge.add(icon_car2_merge);
        this.car1_merge = car1_merge;
        this.car2_merge = car2_merge;
        this.icon_car1_merge = icon_car1_merge;
        this.icon_car2_merge = icon_car2_merge;
        var star_flash1 = this.add.image(0, 0, this.SPRITE_SHEET, "star_flash_0000");
        this.layerUnlocked.add(star_flash1);
        this.star_flash1 = star_flash1;
        var star_flash2 = this.add.image(0, 0, this.SPRITE_SHEET, "star_flash_0000");
        this.layerUnlocked.add(star_flash2);
        this.star_flash2 = star_flash2;
        var star_flash3 = this.add.image(0, 0, this.SPRITE_SHEET, "star_flash_0000");
        this.layerUnlocked.add(star_flash3);
        this.star_flash3 = star_flash3;
        this.tweens.add({
            targets: star_flash1,
            scaleX: .1,
            scaleY: .1,
            ease: "Linear",
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: star_flash2,
            scaleX: .1,
            scaleY: .1,
            ease: "Linear",
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: star_flash3,
            scaleX: .1,
            scaleY: .1,
            ease: "Linear",
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        var icon_window2 = this.add.image(140, 70, this.SPRITE_SHEET, "icon_window2_0000");
        this.layerUnlocked.add(icon_window2);
        icon_window2.setScale(.67);
        this.icon_windowBack = icon_window2;
        var back_car = this.add.image(140, 102, this.SPRITE_SHEET, "icon_r1_0000");
        back_car.setOrigin(.5, 1);
        this.layerUnlocked.add(back_car);
        back_car.setScale(.67);
        back_car.setTintFill(0);
        this.back_car = back_car;
        var buttonContinue = new ButtonText(0, 170, this.SPRITE_SHEET, "btn_buy_0000", this.clickContinueUnlocked, this, MainGame.GAME_TEXT.continue);
        this.layerUnlocked.add(buttonContinue);
        MainGame.updateTextWidth(buttonContinue.text, 200);
        var text_unlocked = MainGame.addText(this, this.layerUnlocked, 0, -237, MainGame.GAME_TEXT.unlocked, 34, true);
        text_unlocked.setTint(16777215);
        MainGame.updateTextWidth(text_unlocked, 400);
        var text_damage = MainGame.addText(this, this.layerUnlocked, 0, 50, "", 22, true);
        text_damage.setTint(16777215);
        MainGame.updateTextWidth(text_damage, 400);
        var text_dmg_value = MainGame.GAME_TEXT.damage + ": " + 2;
        text_damage.setText(text_dmg_value.toUpperCase());
        this.textDamage = text_damage;
        this.mergeCars_textNext = MainGame.addText(this, this.layerUnlocked, icon_window2.x, icon_window2.y - 52, MainGame.GAME_TEXT.next, 22, true);
        MainGame.updateTextWidth(this.mergeCars_textNext, 120);
        this.mergeCars_textQuestion = MainGame.addText(this, this.layerUnlocked, icon_window2.x, icon_window2.y - 2, "?", 32);
        this.layerUnlocked.setScale(this.scaleWindow2);
        this.layerUnlocked.visible = false;
        this.layerMerge.visible = false;
        fon_unlock.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.onFonInputDown, this);
        fon_merge.on("pointerup", this.onFonInputUp, this)
    }
    clickContinueUnlocked() {
        if (!this.layerUnlocked.visible) return;
        if (this.gameScreen.nextCarLevel > 3) {
            if (MainGame.isAPI) MainGame.API_POKI.commercialBreak()
        } else {
            if (MainGame.isApiGameplayStop) {
                if (MainGame.isAPI) MainGame.API_POKI.gameplayStart();
                MainGame.isApiGameplayStop = false
            }
        }
        this.gameScreen.hideMergeEffect();
        this.layerUnlocked.visible = false;
        this.layerMerge.visible = false;
        this.enableMainButtons();
        this.gameScreen.setGameLogicPause(false)
    }
    showMergeAnimation(vType) {
        this.layerMerge.visible = true;
        this.tweens.killTweensOf(this.car1_merge);
        this.tweens.killTweensOf(this.car2_merge);
        this.car1_merge.visible = true;
        this.car2_merge.visible = true;
        this.car1_merge.x = this.midX - 160;
        this.car2_merge.x = this.midX + 160;
        this.car1_merge.angle = -5;
        this.car2_merge.angle = -5;
        var prevType = vType - 1;
        var nextType = vType + 1;
        var spriteNum1 = prevType;
        var spriteNum2 = vType;
        var spriteNum3 = nextType;
        if (spriteNum1 > 50) spriteNum1 = 50;
        if (spriteNum2 > 50) spriteNum2 = 50;
        if (spriteNum3 > 50) spriteNum3 = 50;
        if (nextType > this.MAX_TYPES_CAR) {
            this.icon_windowBack.visible = false;
            this.back_car.visible = false;
            this.mergeCars_textNext.visible = false;
            this.mergeCars_textQuestion.visible = false
        } else {
            this.back_car.setFrame("icon_r" + spriteNum3 + "_0000")
        }
        this.icon_car1_merge.setFrame("icon_r" + spriteNum1 + "_0000");
        this.icon_car2_merge.setFrame("icon_r" + spriteNum1 + "_0000");
        this.unlocked_car.setFrame("icon_r" + spriteNum2 + "_0000");
        var value_dmg = this.gameScreen.getDamage(vType);
        var value_dmg_warm = MainGame.convertNumberFormat(value_dmg);
        var text_dmg_value = MainGame.GAME_TEXT.damage;
        this.textDamage.setText(text_dmg_value.toUpperCase() + ": " + value_dmg_warm);
        this.star_flash1.x = -180 + Phaser.Math.Between(-5, 5) * 2;
        this.star_flash1.y = -160;
        this.star_flash2.x = 180 + Phaser.Math.Between(-5, 5) * 2;
        this.star_flash2.y = -150;
        this.star_flash3.x = Phaser.Math.Between(-10, 10) * 10;
        this.star_flash3.y = 150;
        this.tweens.add({
            targets: this.car1_merge,
            angle: 5,
            ease: "Linear",
            duration: 100,
            yoyo: true,
            repeat: 1
        });
        this.tweens.add({
            targets: this.car1_merge,
            x: this.midX,
            ease: Phaser.Math.Easing.Back.In,
            duration: 500,
            delay: 200
        });
        this.tweens.add({
            targets: this.car2_merge,
            angle: 5,
            ease: "Linear",
            duration: 100,
            yoyo: true,
            repeat: 1
        });
        this.tweens.add({
            targets: this.car2_merge,
            x: this.midX,
            ease: Phaser.Math.Easing.Back.In,
            duration: 500,
            delay: 200
        });
        this.time.delayedCall(700, this.addEffectMerge, [], this);
        this.time.delayedCall(1800, this.showUnlockContent, [], this);
        MainGame.Sfx.play("sound", "merge_unlocked");
        this.disableMainButtons(false, true);
        this.gameScreen.setGameLogicPause(true)
    }
    addEffectMerge() {
        var effect = this.add.sprite(this.midX, this.midY - 40, this.SPRITE_SHEET);
        effect.play("effect_connect2");
        effect.setScale(2.5);
        this.layerMerge.add(effect);
        this.car1_merge.visible = false;
        this.car2_merge.visible = false
    }
    showUnlockContent() {
        this.layerUnlocked.visible = true;
        this.layerUnlocked.setScale(this.scaleWindow1);
        this.tweens.add({
            targets: this.layerUnlocked,
            scaleX: this.scaleWindow2,
            scaleY: this.scaleWindow2,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 400
        });
        this.showBanner();
        this.eventFonImputUp = this.clickContinueUnlocked;
        this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
    }
    initSettingsWindow() {
        this.layerSettingsWindowMain = this.add.container();
        this.layerSettingsWindow = this.add.container();
        this.layerSettingsWindowMain.setDepth(this.gameScreen.DEPTH_layerMerge);
        this.layerSettingsWindow.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerSettingsWindow.x = this.midX;
        this.layerSettingsWindow.y = this.midY + this.posWindowY;
        var fon_merge = this.add.image(this.midX, this.midY, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerSettingsWindowMain.add(fon_merge);
        var fon_unlock = this.add.image(0, 0, this.SPRITE_SHEET, "popup_unlocked_0000");
        fon_unlock.setScale(2);
        this.layerSettingsWindow.add(fon_unlock);
        var logo_tbs = this.add.image(0, 50, this.SPRITE_SHEET, "logo_tbs_0000");
        this.layerSettingsWindow.add(logo_tbs);
        var buttonClose = new Button(225, -235, this.SPRITE_SHEET, "btn_close_0000", this.closeSettings, this);
        this.layerSettingsWindow.add(buttonClose);
        var buttonMuteMusic = new ButtonText(0, -160, this.SPRITE_SHEET, "btn_buy_0000", this.clickMuteMusic, this, MainGame.GAME_TEXT.music_on);
        buttonMuteMusic.text.setFontSize(26);
        buttonMuteMusic.text.x = 20;
        this.layerSettingsWindow.add(buttonMuteMusic);
        MainGame.updateTextWidth(buttonMuteMusic.text, 140);
        var icon_music = this.add.image(-95, -3, this.SPRITE_SHEET, "btn_music_0000");
        buttonMuteMusic.add(icon_music);
        this.buttonMuteMusic = buttonMuteMusic;
        this.buttonMuteMusic.icon = icon_music;
        var buttonMuteSound = new ButtonText(0, buttonMuteMusic.y + 80, this.SPRITE_SHEET, "btn_buy_0000", this.clickMuteSound, this, MainGame.GAME_TEXT.sound_on);
        buttonMuteSound.text.setFontSize(26);
        buttonMuteSound.text.x = 20;
        this.layerSettingsWindow.add(buttonMuteSound);
        MainGame.updateTextWidth(buttonMuteSound.text, 140);
        var icon_sound = this.add.image(-95, -3, this.SPRITE_SHEET, "btn_sound_0000");
        buttonMuteSound.add(icon_sound);
        this.buttonMuteSound = buttonMuteSound;
        this.buttonMuteSound.icon = icon_sound;
        var buttonReset = new ButtonText(0, 215, this.SPRITE_SHEET, "btn_buy_0000", this.openResetProgress, this, MainGame.GAME_TEXT.reset_progress);
        buttonReset.text.setFontSize(20);
        buttonReset.text.x = 25;
        this.layerSettingsWindow.add(buttonReset);
        this.buttonReset = buttonReset;
        var icon_reset = this.add.image(-95, -3, this.SPRITE_SHEET, "btn_reset_0000");
        buttonReset.add(icon_reset);
        var text_title = MainGame.addText(this, this.layerSettingsWindow, 0, -237, MainGame.GAME_TEXT.settings, 34, true);
        text_title.setTint(16777215);
        MainGame.updateTextWidth(text_title, 400);
        var textDevs = MainGame.addText(this, this.layerSettingsWindow, 0, logo_tbs.y - 65, MainGame.GAME_TEXT.developed_by, 24, true);
        MainGame.updateTextWidth(textDevs, 380);
        textDevs.setTint(16777215);
        var textMusic = MainGame.addText(this, this.layerSettingsWindow, 0, logo_tbs.y + 70, MainGame.GAME_TEXT.music_by, 24, true);
        MainGame.updateTextWidth(textMusic, 380);
        textMusic.setTint(16777215);
        var text_musian = MainGame.addText(this, this.layerSettingsWindow, 0, textMusic.y + 30, "GRIN DANILOV", 24, true);
        text_musian.setTint(16777215);
        this.layerSettingsWindow.setScale(this.scaleWindow2);
        this.layerSettingsWindowMain.visible = false;
        this.layerSettingsWindow.visible = false;
        var textVersion = MainGame.version;
        var text_v = MainGame.addText(this, this.layerSettingsWindow, 240, 243, textVersion, 18, true, true);
        text_v.setOrigin(1, .5);
        text_v.setTint(16777215);
        fon_unlock.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.onFonInputDown, this);
        fon_merge.on("pointerup", this.onFonInputUp, this)
    }
    openSettings() {
        this.gameScreen.setGameLogicPause(true);
        this.layerSettingsWindowMain.visible = true;
        this.layerSettingsWindow.visible = true;
        this.layerSettingsWindow.setScale(this.scaleWindow1);
        this.tweens.add({
            targets: this.layerSettingsWindow,
            scaleX: this.scaleWindow2,
            scaleY: this.scaleWindow2,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 400
        });
        this.disableMainButtons();
        MainGame.Sfx.update("music", this.buttonMuteMusic.icon, this.buttonMuteMusic.text);
        MainGame.Sfx.update("sound", this.buttonMuteSound.icon, this.buttonMuteSound.text);
        this.eventFonImputUp = this.closeSettings;
        this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
    }
    closeSettings() {
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
        this.gameScreen.setGameLogicPause(false);
        this.layerSettingsWindowMain.visible = false;
        this.layerSettingsWindow.visible = false;
        this.enableMainButtons()
    }
    initResetProgressWindow() {
        this.layerResetProgressWindowMain = this.add.container();
        this.layerResetProgressWindow = this.add.container();
        this.layerResetProgressWindowMain.setDepth(this.gameScreen.DEPTH_layerMerge);
        this.layerResetProgressWindow.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerResetProgressWindow.x = this.midX;
        this.layerResetProgressWindow.y = this.midY + this.posWindowY;
        var fon_merge = this.add.image(this.midX, this.midY, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerResetProgressWindowMain.add(fon_merge);
        var fon_unlock = this.add.image(0, 0, this.SPRITE_SHEET, "popup_drop_0000");
        fon_unlock.setScale(2);
        this.layerResetProgressWindow.add(fon_unlock);
        var buttonOk = new ButtonText(-105, 90, this.SPRITE_SHEET, "btn_buy2_0000", this.clickResetConfirm, this, MainGame.GAME_TEXT.ok);
        buttonOk.setOriginalScale(.7);
        this.layerResetProgressWindow.add(buttonOk);
        var buttonCancel = new ButtonText(105, 90, this.SPRITE_SHEET, "btn_buy_0000", this.closeResetProgress, this, MainGame.GAME_TEXT.cancel);
        buttonCancel.setOriginalScale(.7);
        this.layerResetProgressWindow.add(buttonCancel);
        var textQuestion = MainGame.addText(this, this.layerResetProgressWindow, 0, -50, MainGame.GAME_TEXT.text_reset, 24, true);
        textQuestion.setCenterAlign();
        textQuestion.setTint(16777215);
        var text_title = MainGame.addText(this, this.layerResetProgressWindow, 0, -187, MainGame.GAME_TEXT.confirm, 34, true);
        MainGame.updateTextWidth(text_title, 400);
        text_title.setTint(16777215);
        this.layerResetProgressWindow.setScale(this.scaleWindow2);
        this.layerResetProgressWindowMain.visible = false;
        this.layerResetProgressWindow.visible = false;
        fon_unlock.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.onFonInputDown, this);
        fon_merge.on("pointerup", this.onFonInputUp, this)
    }
    clickResetConfirm() {
        this.scale.off("resize", this.updateResize, this);
        this.gameScreen.restartGame()
    }
    openResetProgress() {
        this.layerSettingsWindowMain.visible = false;
        this.layerSettingsWindow.visible = false;
        this.layerResetProgressWindowMain.visible = true;
        this.layerResetProgressWindow.visible = true;
        this.layerResetProgressWindow.setScale(this.scaleWindow1);
        this.tweens.add({
            targets: this.layerResetProgressWindow,
            scaleX: this.scaleWindow2,
            scaleY: this.scaleWindow2,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 400
        });
        this.eventFonImputUp = this.closeResetProgress;
        this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
    }
    closeResetProgress() {
        this.gameScreen.setGameLogicPause(false);
        this.layerResetProgressWindowMain.visible = false;
        this.layerResetProgressWindow.visible = false;
        this.enableMainButtons()
    }
    initOfflineEarningWindow() {
        this.layerOfflineEarningWindowMain = this.add.container();
        this.layerOfflineEarningWindow = this.add.container();
        this.layerOfflineEarningWindowMain.setDepth(this.gameScreen.DEPTH_layerMerge);
        this.layerOfflineEarningWindow.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerOfflineEarningWindow.x = this.midX;
        this.layerOfflineEarningWindow.y = this.midY + this.posWindowY;
        var fon_merge = this.add.image(this.midX, this.midY, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerOfflineEarningWindowMain.add(fon_merge);
        var fon_unlock = this.add.image(0, 0, this.SPRITE_SHEET, "popup_unlocked_0000");
        fon_unlock.setScale(2);
        this.layerOfflineEarningWindow.add(fon_unlock);
        var posX = 0;
        var posY = -50;
        var offline_container = this.add.image(posX + 10, posY, this.SPRITE_SHEET, "offline_container_0000");
        this.layerOfflineEarningWindow.add(offline_container);
        var effect = this.add.sprite(posX, posY, this.SPRITE_SHEET);
        effect.play("magic_1");
        effect.setScale(2);
        this.layerOfflineEarningWindow.add(effect);
        var offline_coins = this.add.image(posX - 11, posY + 36, this.SPRITE_SHEET, "offline_coins_0000");
        this.layerOfflineEarningWindow.add(offline_coins);
        var buttonClose = new ButtonText(0, 215, this.SPRITE_SHEET, "btn_buy2_0000", this.closeOfflineEarningWindow, this, MainGame.GAME_TEXT.tap_continue);
        buttonClose.text.setFontSize(20);
        this.layerOfflineEarningWindow.add(buttonClose);
        MainGame.updateTextWidth(buttonClose.text, 320);
        buttonClose.text.y = -4;
        buttonClose.back.alpha = .01;
        buttonClose.text.setTint(16777215);
        var buttonContinue = new ButtonText(0, 145, this.SPRITE_SHEET, "btn_buy2_0000", this.clickOfflineEarningButton, this, MainGame.GAME_TEXT.coins_x2);
        this.layerOfflineEarningWindow.add(buttonContinue);
        MainGame.updateTextWidth(buttonContinue.text, 200);
        buttonContinue.text.x = -22;
        var icon_reward = this.add.image(85, -1, this.SPRITE_SHEET, "icon_reward_0000");
        buttonContinue.add(icon_reward);
        var text_title = MainGame.addText(this, this.layerOfflineEarningWindow, 0, -237, MainGame.GAME_TEXT.offline_earn, 34, true);
        text_title.setTint(16777215);
        MainGame.updateTextWidth(text_title, 400);
        var offline_earning_text = MainGame.addText(this, this.layerOfflineEarningWindow, 0, 75, "+458K", 40, true);
        offline_earning_text.setTint(16777215);
        offline_earning_text.setDropShadow(-2, 3, 0, 1);
        this.offline_earning_text = offline_earning_text;
        this.offlineEarningBtnAds = buttonContinue;
        this.layerOfflineEarningWindow.setScale(this.scaleWindow2);
        this.layerOfflineEarningWindowMain.visible = false;
        this.layerOfflineEarningWindow.visible = false;
        fon_unlock.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.onFonInputDown, this);
        fon_merge.on("pointerup", this.onFonInputUp, this)
    }
    clickOfflineEarningButton() {
        this.gameScreen.showAdsForCoinsX2()
    }
    showOfflineEarningWindow(vValueCoins) {
        this.layerOfflineEarningWindow.visible = true;
        this.layerOfflineEarningWindowMain.visible = true;
        this.layerOfflineEarningWindow.setScale(this.scaleWindow1);
        this.tweens.add({
            targets: this.layerOfflineEarningWindow,
            scaleX: this.scaleWindow2,
            scaleY: this.scaleWindow2,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 400
        });
        this.disableMainButtons(true);
        var coins = vValueCoins;
        var text_coins_warm = MainGame.convertNumberFormat(coins);
        this.offline_earning_text.setText("+" + text_coins_warm);
        MainGame.Sfx.play("sound", "offline_earning");
        this.offlineEarningBtnAds.setEnable(true);
        if (MainGame.isAPI) {
            if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.offlineEarningBtnAds.setEnable(false)
        } else {
            if (!MainGame.isDebugAds) this.offlineEarningBtnAds.setEnable(false)
        }
        this.eventFonImputUp = this.closeOfflineEarningWindowOutAir;
        this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this)
    }
    closeOfflineEarningWindowOutAir() {
        MainGame.isApiGameplayStop = true;
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
        this.layerOfflineEarningWindowMain.visible = false;
        this.layerOfflineEarningWindow.visible = false;
        this.enableMainButtons();
        this.gameScreen.startLevel()
    }
    closeOfflineEarningWindow(isSkipCallAds) {
        MainGame.isApiGameplayStop = true;
        if (MainGame.isAPI) {
            if (isSkipCallAds) {
                MainGame.API_POKI.gameplayStart();
                MainGame.isApiGameplayStop = false
            } else {
                MainGame.API_POKI.commercialBreak()
            }
        }
        this.layerOfflineEarningWindowMain.visible = false;
        this.layerOfflineEarningWindow.visible = false;
        this.enableMainButtons();
        this.gameScreen.startLevel()
    }
    initLevelUpWindow() {
        this.layerLevelUpWindow = this.add.container();
        var pos = {
            x: this.midX - 15,
            y: 100
        };
        var lvlup = this.add.image(pos.x, pos.y, "ss_main", "lvlup_0000");
        var icon_newmoney = this.add.image(pos.x - 55, pos.y + 30, "ss_main", "money_0000");
        icon_newmoney.setScale(.7);
        var levelup_text_money = MainGame.addText(this, this.layerLevelUpWindow, icon_newmoney.x + 20, icon_newmoney.y, "+148k", 24, true);
        levelup_text_money.setTint(16777215);
        levelup_text_money.setOrigin(0, .5);
        this.layerLevelUpWindow.add(lvlup);
        this.layerLevelUpWindow.add(icon_newmoney);
        this.layerLevelUpWindow.add(levelup_text_money);
        this.layerLevelUpWindow.setDepth(this.gameScreen.DEPTH_layerLevelBar);
        this.levelup_text_money = levelup_text_money;
        this.layerLevelUpWindow.visible = false
    }
    showLevelUpRewards2() {
        var coins = this.gameScreen.getCoinsLevelUp(this.gameScreen.currentLevel);
        var text_coins_warm = MainGame.convertNumberFormat(coins);
        this.levelup_text_money.setText("+" + text_coins_warm);
        this.gameScreen.amount_coins += coins;
        text_coins_warm = MainGame.convertNumberFormat(this.gameScreen.amount_coins);
        this.updateCoins(text_coins_warm);
        this.updateShop(text_coins_warm)
    }
    showLevelUpWindow() {
        this.layerLevelUpWindow.visible = true;
        this.showLevelUpRewards2();
        MainGame.Sfx.play("sound", "lvl_up");
        this.layerLevelUpWindow.y = -200;
        this.tweens.add({
            targets: this.layerLevelUpWindow,
            y: 0,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 500
        });
        this.time.delayedCall(1500, this.hideLevelUpWindow, [], this)
    }
    hideLevelUpWindow() {
        this.tweens.add({
            targets: this.layerLevelUpWindow,
            y: -100,
            ease: Phaser.Math.Easing.Back.In,
            duration: 500,
            callbackScope: this,
            onComplete: this.closeLevelUpWindow
        })
    }
    closeLevelUpWindow() {
        this.layerLevelUpWindow.visible = false
    }
    initUpgradeWindow() {
        this.layerUpgradeWindowMain = this.add.container();
        this.layerUpgradeWindow = this.add.container();
        this.layerUpgradeWindowMain.setDepth(this.gameScreen.DEPTH_layerMerge);
        this.layerUpgradeWindow.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerUpgradeWindow.x = this.midX;
        this.layerUpgradeWindow.y = this.midY + this.posWindowY;
        var fon_merge = this.add.image(this.midX, this.midY, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerUpgradeWindowMain.add(fon_merge);
        var fon_unlock = this.add.image(0, 0, this.SPRITE_SHEET, "popup_unlocked_0000");
        fon_unlock.setScale(2);
        this.layerUpgradeWindow.add(fon_unlock);
        var posX = 0;
        var posY = -10;
        var effect = this.add.sprite(130, posY, this.SPRITE_SHEET);
        effect.play("magic_1");
        effect.setScale(2);
        this.layerUpgradeWindow.add(effect);
        var arrow_icon = this.add.sprite(posX + 0, posY + 0, this.SPRITE_SHEET, "arrow_0000");
        this.layerUpgradeWindow.add(arrow_icon);
        var panel_number1 = this.add.image(posX - 110 - 50, posY - 100, this.SPRITE_SHEET, "panel_number_0000");
        panel_number1.setScale(1.1);
        this.layerUpgradeWindow.add(panel_number1);
        var panel_number2 = this.add.image(posX + 110 - 30, posY - 100, this.SPRITE_SHEET, "panel_number_0000");
        panel_number2.setScale(1.1);
        this.layerUpgradeWindow.add(panel_number2);
        var icon_window1 = this.add.image(-130 + 10, posY, this.SPRITE_SHEET, "icon_window1_0000");
        var icon_window2 = this.add.image(130, posY, this.SPRITE_SHEET, "icon_window1_0000");
        this.layerUpgradeWindow.add(icon_window1);
        this.layerUpgradeWindow.add(icon_window2);
        var gun1 = this.add.image(-130 + 10 + 35, posY + 47, this.SPRITE_SHEET, "icon_r1_0000");
        gun1.setOrigin(.85, 1);
        this.layerUpgradeWindow.add(gun1);
        var gun2 = this.add.image(130 + 35, posY + 47, this.SPRITE_SHEET, "icon_r1_0000");
        gun2.setOrigin(.85, 1);
        this.layerUpgradeWindow.add(gun2);
        var buttonClose = new Button(225, -235, this.SPRITE_SHEET, "btn_close_0000", this.closeUpgadeWindow, this);
        this.layerUpgradeWindow.add(buttonClose);
        var buttonContinue = new ButtonText(0, 180, this.SPRITE_SHEET, "btn_buy2_0000", this.clickUpgradeButton, this, MainGame.GAME_TEXT.free);
        buttonContinue.text.x = -22;
        this.layerUpgradeWindow.add(buttonContinue);
        MainGame.updateTextWidth(buttonContinue.text, 200);
        this.buttonFreeUpgrade = buttonContinue;
        var icon_reward = this.add.image(85, -1, this.SPRITE_SHEET, "icon_reward_0000");
        buttonContinue.add(icon_reward);
        var text_title = MainGame.addText(this, this.layerUpgradeWindow, 0, -237, MainGame.GAME_TEXT.free_upgrade, 34, true);
        MainGame.updateTextWidth(text_title, 400);
        text_title.setTint(16777215);
        var text_level1 = MainGame.addText(this, this.layerUpgradeWindow, panel_number1.x + 64, panel_number1.y - 2, MainGame.GAME_TEXT.level, 24, true);
        MainGame.updateTextWidth(text_level1, 400);
        text_level1.setTint(16777215);
        var text_level2 = MainGame.addText(this, this.layerUpgradeWindow, panel_number2.x + 64, panel_number1.y - 2, MainGame.GAME_TEXT.level, 24, true);
        MainGame.updateTextWidth(text_level2, 400);
        text_level2.setTint(16777215);
        var text_levelGun1 = MainGame.addText(this, this.layerUpgradeWindow, panel_number1.x - 1, panel_number1.y - 2, "12", 24, true, true);
        text_levelGun1.setTint(0);
        var text_levelGun2 = MainGame.addText(this, this.layerUpgradeWindow, panel_number2.x - 1, panel_number2.y - 2, "34", 24, true, true);
        text_levelGun2.setTint(0);
        this.text_levelGun1 = text_levelGun1;
        this.text_levelGun2 = text_levelGun2;
        this.layerUpgradeWindow.setScale(this.scaleWindow2);
        this.layerUpgradeWindowMain.visible = false;
        this.layerUpgradeWindow.visible = false;
        this.gun1 = gun1;
        this.gun2 = gun2;
        fon_unlock.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.onFonInputDown, this);
        fon_merge.on("pointerup", this.onFonInputUp, this)
    }
    clickUpgradeButton() {
        this.gameScreen.showAdsForFreeUpgrade()
    }
    showUpgradeWindow(vLevelGun) {
        this.layerUpgradeWindowMain.visible = true;
        this.layerUpgradeWindow.visible = true;
        this.layerUpgradeWindow.setScale(this.scaleWindow1);
        this.tweens.add({
            targets: this.layerUpgradeWindow,
            scaleX: this.scaleWindow2,
            scaleY: this.scaleWindow2,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 400
        });
        var lvl_left = vLevelGun;
        var lvl_right = vLevelGun + 2;
        this.text_levelGun1.setText(lvl_left);
        this.text_levelGun2.setText(lvl_right);
        if (lvl_left > 50) lvl_left = 50;
        if (lvl_right > 50) lvl_right = 50;
        this.gun1.setFrame("icon_r" + lvl_left + "_0000");
        this.gun2.setFrame("icon_r" + lvl_right + "_0000");
        this.buttonFreeUpgrade.setEnable(true);
        if (MainGame.isAPI) {
            if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.buttonFreeUpgrade.setEnable(false)
        } else {
            if (!MainGame.isDebugAds) this.buttonFreeUpgrade.setEnable(false)
        }
        this.disableMainButtons();
        this.eventFonImputUp = this.closeUpgadeWindow;
        this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this);
        this.gameScreen.setGameLogicPause(true)
    }
    closeUpgadeWindow() {
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
        this.layerUpgradeWindowMain.visible = false;
        this.layerUpgradeWindow.visible = false;
        this.enableMainButtons();
        this.gameScreen.setGameLogicPause(false);
        this.gameScreen.cancelUpgrade()
    }
    closeUpgadeWindow2() {
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
        this.layerUpgradeWindowMain.visible = false;
        this.layerUpgradeWindow.visible = false;
        this.enableMainButtons();
        this.gameScreen.setGameLogicPause(false)
    }
    initBoosterWindow() {
        this.layerBoosterWindowMain = this.add.container();
        this.layerBoosterWindow = this.add.container();
        this.layerBoosterWindowMain.setDepth(this.gameScreen.DEPTH_layerMerge);
        this.layerBoosterWindow.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerBoosterWindow.x = this.midX;
        this.layerBoosterWindow.y = this.midY + this.posWindowY;
        var fon_merge = this.add.image(this.midX, this.midY, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerBoosterWindowMain.add(fon_merge);
        var popup_drop = this.add.sprite(0, 0, this.SPRITE_SHEET, "popup_drop_0000");
        popup_drop.setScale(2);
        this.layerBoosterWindow.add(popup_drop);
        var effect = this.add.sprite(0, -20, this.SPRITE_SHEET);
        effect.play("magic_1");
        effect.setScale(2);
        this.layerBoosterWindow.add(effect);
        var helicopter_icon = this.add.image(0, -82, this.SPRITE_SHEET, "helicopter_icon_0000");
        this.layerBoosterWindow.add(helicopter_icon);
        var reward_icon = this.add.image(0, 12, this.SPRITE_SHEET, "reward_boost_0000");
        this.layerBoosterWindow.add(reward_icon);
        var buttonClose = new Button(225, -185, this.SPRITE_SHEET, "btn_close_0000", this.closeBoost, this);
        this.layerBoosterWindow.add(buttonClose);
        var buttonContinue = new ButtonText(0, 145, this.SPRITE_SHEET, "btn_buy2_0000", this.clickBoost, this, MainGame.GAME_TEXT.activate);
        buttonContinue.text.x = -22;
        this.layerBoosterWindow.add(buttonContinue);
        MainGame.updateTextWidth(buttonContinue.text, 200);
        this.boostBtnAds = buttonContinue;
        var icon_reward = this.add.image(85, -1, this.SPRITE_SHEET, "icon_reward_0000");
        buttonContinue.add(icon_reward);
        var text_title = MainGame.addText(this, this.layerBoosterWindow, 0, -187, MainGame.GAME_TEXT.boost_message, 34, true);
        MainGame.updateTextWidth(text_title, 400);
        text_title.setTint(16777215);
        var reward_text = MainGame.addText(this, this.layerBoosterWindow, 0, 85, MainGame.GAME_TEXT.bonus_merge, 24, true);
        MainGame.updateTextWidth(reward_text, 400);
        reward_text.setTint(16777215);
        this.boosterWindowIconReward = reward_icon;
        this.boosterWindowTextReward = reward_text;
        this.layerBoosterWindow.setScale(this.scaleWindow2);
        this.layerBoosterWindowMain.visible = false;
        this.layerBoosterWindow.visible = false;
        popup_drop.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.onFonInputDown, this);
        fon_merge.on("pointerup", this.onFonInputUp, this)
    }
    showBoosterWindow(vBonus) {
        if (vBonus == undefined) vBonus = "reward_box4";
        this.typeDronBonus = vBonus;
        if (vBonus == "auto_merge") {
            this.boosterWindowIconReward.setFrame("reward_boost_0000");
            this.boosterWindowTextReward.setText(MainGame.GAME_TEXT.bonus_merge);
            MainGame.updateTextWidth(this.boosterWindowTextReward, 400)
        } else if (vBonus == "speed_x2") {
            this.boosterWindowIconReward.setFrame("reward_boost2_0000");
            this.boosterWindowTextReward.setText(MainGame.GAME_TEXT.bonus_speed_x2);
            MainGame.updateTextWidth(this.boosterWindowTextReward, 400)
        } else if (vBonus == "bonus_coins") {
            this.boosterWindowIconReward.setFrame("reward_boost3_0000");
            this.boosterWindowTextReward.setText(MainGame.GAME_TEXT.bonus_coins);
            MainGame.updateTextWidth(this.boosterWindowTextReward, 400)
        } else if (vBonus == "reward_box4") {
            this.boosterWindowIconReward.setFrame("box1_0000");
            this.boosterWindowTextReward.setText(MainGame.GAME_TEXT.towers_4);
            MainGame.updateTextWidth(this.boosterWindowTextReward, 400)
        }
        this.isShowHelicopter = false;
        this.helicopter.visible = false;
        this.layerBoosterWindow.visible = true;
        this.layerBoosterWindowMain.visible = true;
        this.layerBoosterWindow.setScale(this.scaleWindow1);
        this.tweens.add({
            targets: this.layerBoosterWindow,
            scaleX: this.scaleWindow2,
            scaleY: this.scaleWindow2,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 400
        });
        this.disableMainButtons();
        this.boostBtnAds.setEnable(true);
        if (MainGame.isAPI) {
            if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.boostBtnAds.setEnable(false)
        } else {
            if (!MainGame.isDebugAds) this.boostBtnAds.setEnable(false)
        }
        this.showBanner();
        this.eventFonImputUp = this.closeBoost;
        this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this);
        this.gameScreen.setGameLogicPause(true)
    }
    clickBoost() {
        this.gameScreen.showAdsForHelicopter(this.typeDronBonus)
    }
    closeBoost() {
        if (MainGame.isApiGameplayStop) {
            if (MainGame.isAPI) MainGame.API_POKI.gameplayStart();
            MainGame.isApiGameplayStop = false
        }
        this.layerBoosterWindow.visible = false;
        this.layerBoosterWindowMain.visible = false;
        this.enableMainButtons();
        this.gameScreen.setGameLogicPause(false)
    }
    initRewardWindow() {
        this.layerRewardWindowMain = this.add.container();
        this.layerRewardWindow = this.add.container();
        this.layerRewardWindowMain.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerRewardWindow.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerRewardWindow.x = this.midX;
        this.layerRewardWindow.y = this.midY + this.posWindowY;
        var fon_merge = this.add.image(this.midX, this.midY, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerRewardWindowMain.add(fon_merge);
        var popup_drop = this.add.image(0, 0, this.SPRITE_SHEET, "popup_drop_0000");
        popup_drop.setScale(2);
        this.layerRewardWindow.add(popup_drop);
        var posX = 0;
        var posY = -15;
        var effect = this.add.sprite(posX, posY, this.SPRITE_SHEET);
        effect.play("magic_1");
        effect.setScale(2);
        this.layerRewardWindow.add(effect);
        var iconRewardWindow = this.add.image(posX, posY, this.SPRITE_SHEET, "reward_box6_0000");
        this.layerRewardWindow.add(iconRewardWindow);
        this.iconRewardWindow = iconRewardWindow;
        var buttonContinue = new ButtonText(0, 145, this.SPRITE_SHEET, "btn_buy_0000", this.clickGetReward, this, MainGame.GAME_TEXT.get);
        this.layerRewardWindow.add(buttonContinue);
        MainGame.updateTextWidth(buttonContinue.text, 200);
        var text_title = MainGame.addText(this, this.layerRewardWindow, 0, -187, MainGame.GAME_TEXT.reward, 34, true);
        MainGame.updateTextWidth(text_title, 400);
        text_title.setTint(16777215);
        var reward_text = MainGame.addText(this, this.layerRewardWindow, 0, 85, MainGame.GAME_TEXT.bonus_merge, 24, true);
        MainGame.updateTextWidth(reward_text, 400);
        reward_text.setTint(16777215);
        this.rewardWindowText = reward_text;
        this.layerRewardWindow.setScale(this.scaleWindow2);
        this.layerRewardWindowMain.visible = false;
        this.layerRewardWindow.visible = false;
        popup_drop.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.onFonInputDown, this);
        fon_merge.on("pointerup", this.onFonInputUp, this)
    }
    showRewardWindow(vTypeReward) {
        this.layerRewardWindow.visible = true;
        this.layerRewardWindowMain.visible = true;
        this.layerRewardWindow.setScale(this.scaleWindow1);
        this.tweens.add({
            targets: this.layerRewardWindow,
            scaleX: this.scaleWindow2,
            scaleY: this.scaleWindow2,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 400
        });
        if (vTypeReward == "auto_merge") {
            this.iconRewardWindow.setFrame("reward_boost_0000");
            this.rewardWindowText.setText(MainGame.GAME_TEXT.bonus_merge)
        } else if (vTypeReward == "speed_x2") {
            this.iconRewardWindow.setFrame("reward_boost2_0000");
            this.rewardWindowText.setText(MainGame.GAME_TEXT.bonus_speed_x2)
        } else if (vTypeReward == "bonus_coins") {
            this.iconRewardWindow.setFrame("reward_boost3_0000");
            this.rewardWindowText.setText(MainGame.GAME_TEXT.bonus_coins)
        } else {
            this.iconRewardWindow.setFrame(vTypeReward + "_0000");
            if (vTypeReward == "reward_box4") {
                this.rewardWindowText.setText(MainGame.GAME_TEXT.towers_4)
            } else if (vTypeReward == "reward_box6") {
                this.rewardWindowText.setText(MainGame.GAME_TEXT.towers_6)
            } else if (vTypeReward == "reward_box8") {
                this.rewardWindowText.setText(MainGame.GAME_TEXT.towers_8)
            } else if (vTypeReward == "reward_coin1") {
                this.rewardWindowText.setText(MainGame.GAME_TEXT.coins_hours1)
            } else if (vTypeReward == "reward_coin2") {
                this.rewardWindowText.setText(MainGame.GAME_TEXT.coins_hours2)
            }
        }
        this.eventFonImputUp = this.closeRewardWindow;
        this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this);
        MainGame.Sfx.play("sound", "boost")
    }
    clickGetReward() {
        this.closeRewardWindow()
    }
    closeRewardWindow() {
        this.layerRewardWindowMain.visible = false;
        this.layerRewardWindow.visible = false;
        this.updateFortunaWheelWindow(this.gameScreen.countDownNextFree);
        this.eventFonImputUp = this.closeFortunaWheelWindow;
        if (MainGame.reward_wheel) this.gameScreen.getRewards(MainGame.reward_wheel);
        MainGame.reward_wheel = null
    }
    initFortunaWheelWindow() {
        this.layerFortunaWheelWindowMain = this.add.container();
        this.layerFortunaWheelWindow = this.add.container();
        this.layerFortunaWheelWindowMain.setDepth(this.gameScreen.DEPTH_layerMerge);
        this.layerFortunaWheelWindow.setDepth(this.gameScreen.DEPTH_layerUnlock);
        this.layerFortunaWheelWindow.x = this.midX;
        this.layerFortunaWheelWindow.y = this.midY + this.posWindowY;
        var fon_merge = this.add.image(this.midX, this.midY, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerFortunaWheelWindowMain.add(fon_merge);
        var fon_unlock = this.add.image(0, 0, this.SPRITE_SHEET, "popup_unlocked_0000");
        fon_unlock.setScale(2);
        this.layerFortunaWheelWindow.add(fon_unlock);
        var posX = 0;
        var posY = -15;
        var wheel_fortune = this.add.image(posX, posY, this.SPRITE_SHEET, "wheel_fortune_0000");
        this.layerFortunaWheelWindow.add(wheel_fortune);
        var ramka_fortune = this.add.image(posX, posY, this.SPRITE_SHEET, "ramka_fortune_0000");
        this.layerFortunaWheelWindow.add(ramka_fortune);
        var arrow_fortune = this.add.image(posX, posY - 162, this.SPRITE_SHEET, "arrow_fortune_0000");
        this.layerFortunaWheelWindow.add(arrow_fortune);
        this.wheel_fortune = wheel_fortune;
        this.arrow_fortune = arrow_fortune;
        var buttonClose = new Button(225, -235, this.SPRITE_SHEET, "btn_close_0000", this.closeFortunaWheelWindow, this);
        this.layerFortunaWheelWindow.add(buttonClose);
        this.buttonCloseFortunaWheelWindow = buttonClose;
        var buttonContinue = new ButtonText(0, 185, this.SPRITE_SHEET, "btn_buy2_0000", this.clickFortunaButton, this, MainGame.GAME_TEXT.free);
        buttonContinue.text.x = -22;
        this.layerFortunaWheelWindow.add(buttonContinue);
        MainGame.updateTextWidth(buttonContinue.text, 200);
        var icon_reward = this.add.image(85, -1, this.SPRITE_SHEET, "icon_reward_0000");
        buttonContinue.add(icon_reward);
        this.buttonFortunaWheel = buttonContinue;
        var text_title = MainGame.addText(this, this.layerFortunaWheelWindow, 0, -237, MainGame.GAME_TEXT.lucky_wheel, 34, true);
        text_title.setTint(16777215);
        MainGame.updateTextWidth(text_title, 400);
        var text_free_time = MainGame.addText(this, this.layerFortunaWheelWindow, -120 - 40, 240, "123", 20, true);
        MainGame.updateTextWidth(text_free_time, 300);
        var text_nextfreein = MainGame.addText(this, this.layerFortunaWheelWindow, 100 + 40, 240, "456", 20, true);
        MainGame.updateTextWidth(text_nextfreein, 300);
        this.text_free_time = text_free_time;
        this.text_nextfreein = text_nextfreein;
        this.layerFortunaWheelWindow.setScale(this.scaleWindow2);
        this.layerFortunaWheelWindowMain.visible = false;
        this.layerFortunaWheelWindow.visible = false;
        this.gameScreen.initWheelOptions();
        fon_unlock.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.onFonInputDown, this);
        fon_merge.on("pointerup", this.onFonInputUp, this)
    }
    clickFortunaButton() {
        this.gameScreen.showAdsForFortunaWheel()
    }
    checkFortunaWheelWindow() {
        if (this.gameScreen.freeTimeWheel > 0) {
            this.buttonFortunaWheel.setEnable(true)
        } else {
            this.buttonFortunaWheel.setEnable(false)
        }
        if (MainGame.isAPI) {
            if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) this.buttonFortunaWheel.setEnable(false)
        } else {
            if (!MainGame.isDebugAds) this.buttonFortunaWheel.setEnable(false)
        }
    }
    updateFortunaWheelWindow(vCountDownNextFree) {
        var str1 = MainGame.GAME_TEXT.free_time + " " + this.gameScreen.freeTimeWheel + "/" + MainGame.maxTimeWheel;
        this.text_free_time.setText(str1.toUpperCase());
        var timeNextIn = MainGame.secToHHMMSS(vCountDownNextFree);
        var str2 = MainGame.GAME_TEXT.next_free_in + " " + timeNextIn;
        this.text_nextfreein.setText(str2.toUpperCase());
        if (this.gameScreen.freeTimeWheel == MainGame.maxTimeWheel) {
            this.text_nextfreein.visible = false
        } else {
            this.text_nextfreein.visible = true
        }
        if (!this.isTweeningWheel) this.checkFortunaWheelWindow()
    }
    openFortunaWheelWindow() {
        this.layerFortunaWheelWindowMain.visible = true;
        this.layerFortunaWheelWindow.visible = true;
        this.layerFortunaWheelWindow.setScale(this.scaleWindow2);
        this.disableMainButtons();
        this.updateFortunaWheelWindow(this.gameScreen.countDownNextFree);
        this.eventFonImputUp = this.closeFortunaWheelWindow;
        this.time.delayedCall(this.TIME_OPEN_POPUP, this.onPopupOpen, [], this);
        this.gameScreen.setGameLogicPause(true)
    }
    closeFortunaWheelWindow() {
        if (this.isTweeningWheel) return;
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
        this.layerFortunaWheelWindowMain.visible = false;
        this.layerFortunaWheelWindow.visible = false;
        this.enableMainButtons();
        this.gameScreen.setGameLogicPause(false)
    }
    tweenWheelFortune(rounds, degrees, backDegrees, duration1, duration2) {
        this.buttonCloseFortunaWheelWindow.setEnable(false);
        this.isTweeningWheel = true;
        this.tweens.add({
            targets: [this.wheel_fortune],
            angle: 360 * rounds + degrees,
            duration: duration1,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function(tween) {
                this.tweens.add({
                    targets: [this.wheel_fortune],
                    angle: this.wheel_fortune.angle - backDegrees,
                    duration: duration2,
                    ease: "Cubic.easeIn",
                    callbackScope: this,
                    onComplete: function(tween) {
                        this.showRewardWindow(MainGame.reward_wheel);
                        this.buttonCloseFortunaWheelWindow.setEnable(true);
                        this.checkFortunaWheelWindow();
                        this.isTweeningWheel = false
                    }
                })
            }
        })
    }
    initInputScrolling() {
        this.dragging = false;
        this.fling_enabled = true;
        this.isReadingMode = false;
        this.readingNode = -1;
        this.current_pos = {
            x: 0,
            y: 0
        };
        this.pressed_pos = {
            x: 0,
            y: 0
        };
        this.released_pos = {
            x: 0,
            y: 0
        };
        this.fling = {
            x: 0,
            y: 0
        };
        this.contentMaxY = this.contentHeight;
        this.timeConstant = 325;
        this.input.on("pointerdown", this.onInputDownShop, this);
        this.input.on("pointerup", this.onInputUpShop, this);
        this.input.on("pointerupoutside", this.onInputUpShop, this);
        this.input.on("pointermove", this.onInputMoveShop, this)
    }
    onInputDownShop(pointer) {
        if (!this.isShopAdded) return;
        if (!this.layerShop.visible) return;
        if (this.shopTabSelected != 1) return;
        var pos = this.gameScreen.getInputPosition(pointer);
        if (pos.y < 125) return;
        if (pos.x > 770 || pos.x < 340) return;
        this.dragging = true;
        this.pressed_pos.y = pos.y;
        this.pressed_time = Date.now();
        this.fling.y = 0
    }
    onInputUpShop(pointer) {
        if (!this.isShopAdded) return;
        if (!this.layerShop.visible) return;
        if (this.shopTabSelected != 1) return;
        var pos = this.gameScreen.getInputPosition(pointer);
        if (!this.dragging) return;
        this.dragging = false;
        this.current_pos.y = this.limit(this.current_pos.y + this.pressed_pos.y - pos.y);
        if (this.fling_enabled) {
            this.released_pos.y = pos.y;
            var delta_time = Date.now() - this.pressed_time;
            var distance = this.released_pos.y - this.pressed_pos.y;
            var delta = distance * Math.exp(-delta_time / this.timeConstant) * .2;
            if (Math.abs(delta) >= 30) this.fling.y = delta
        }
    }
    limit(posY) {
        posY = Math.min(posY, this.contentMaxY);
        posY = Math.max(posY, 0);
        return posY
    }
    onInputMoveShop(pointer) {
        if (!this.isShopAdded) return;
        if (!this.layerShop.visible) return;
        if (this.shopTabSelected != 1) return;
        var pos = this.gameScreen.getInputPosition(pointer);
        if (this.dragging) {
            var posY = this.current_pos.y + this.pressed_pos.y - pos.y;
            this.updatePositions(this.limit(posY))
        }
    }
    updatePositions(posY, isSkipUpdateSlider) {
        if (!isSkipUpdateSlider) {
            var percent = posY / this.contentMaxY * 100;
            this.slider.setSliderByValueForce(percent, 0)
        }
        this.layerShopContent.y = -posY;
        var itemIndex = Math.floor(posY / this.itemShop_WIDTH);
        if (this.arShopCars.length <= 0) return;
        var item;
        for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
            item = this.arShopCars[i].item;
            if (item) {
                if (i < itemIndex || i > itemIndex + 4) {
                    item.visible = false
                } else {
                    item.visible = true
                }
            }
        }
    }
    getBarPosition(vPositionContent) {
        return Math.abs(vPositionContent / this.contentMaxY * 100)
    }
    updateScrollMap() {
        if (!this.dragging && this.fling_enabled && Math.abs(this.fling.y) > 0) {
            var posY = this.current_pos.y - this.fling.y;
            this.current_pos.y = this.limit(posY);
            this.updatePositions(this.current_pos.y);
            this.fling.y = MyMath.lerp(this.fling.y, 0, .04);
            if (Math.abs(this.fling.y) < .5) {
                this.fling.y = 0
            }
        }
    }
    initShop() {
        this.layerShop = this.add.container();
        this.layerShopContent = this.add.container();
        this.layerShopContent2 = this.add.container();
        this.layerShop.setDepth(this.gameScreen.DEPTH_layerShop);
        this.layerShop.x = this.midX;
        this.layerShop.y = this.midY;
        this.shopTabSelected = 1;
        this.offset_shopY = 40;
        var offsetX = 50;
        var fon_merge = this.add.image(0, 0, this.SPRITE_SHEET, "bg_connect_0000");
        fon_merge.setScale(4);
        this.layerShop.add(fon_merge);
        var fon_shop = this.add.image(offsetX, 0, this.SPRITE_SHEET, "popup_shop_0000");
        fon_shop.setScale(2);
        this.layerShop.add(fon_shop);
        var panel = this.add.image(offsetX + 10, -232, this.SPRITE_SHEET, "panel_money_0000");
        this.layerShop.add(panel);
        var coin = this.add.image(-80 + offsetX, -232, this.SPRITE_SHEET, "money_0000");
        this.layerShop.add(coin);
        this.iconCoinShop = coin;
        var buttonClose = new Button(226 + offsetX, -231, this.SPRITE_SHEET, "btn_close_0000", this.closeShop, this);
        this.layerShop.add(buttonClose);
        var buttonShopTab1 = new ButtonText(-370 + offsetX, -225, this.SPRITE_SHEET, "btn_shop1_0000", this.clickShopTab1, this, MainGame.GAME_TEXT.recruits);
        buttonShopTab1.text.setFontSize(24);
        buttonShopTab1.text.x = 16;
        buttonShopTab1.text.y = -2;
        this.layerShop.add(buttonShopTab1);
        MainGame.updateTextWidth(buttonShopTab1.text, 140);
        var icon_tab1 = this.add.image(-74, 0, this.SPRITE_SHEET, "icon_cannon_0000");
        buttonShopTab1.add(icon_tab1);
        var buttonShopTab2 = new ButtonText(-370 + offsetX, -145, this.SPRITE_SHEET, "btn_shop2_0000", this.clickShopTab2, this, MainGame.GAME_TEXT.upgrade);
        buttonShopTab2.text.setFontSize(24);
        buttonShopTab2.text.x = 16;
        buttonShopTab2.text.y = -2;
        this.layerShop.add(buttonShopTab2);
        MainGame.updateTextWidth(buttonShopTab2.text, 140);
        var iconAdvUpgrades = this.add.image(-102, -26, "ss_main", "icon_adv_0000");
        buttonShopTab2.add(iconAdvUpgrades);
        this.iconAdvUpgrades = iconAdvUpgrades;
        iconAdvUpgrades.angle = -4;
        this.tweens.add({
            targets: iconAdvUpgrades,
            scaleX: 1.15,
            scaleY: 1.15,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: iconAdvUpgrades,
            angle: 4,
            ease: "Linear",
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        this.iconAdvUpgrades.visible = false;
        var icon_tab2 = this.add.image(-74, 0, this.SPRITE_SHEET, "icon_privilege_0000");
        buttonShopTab2.add(icon_tab2);
        this.buttonShopTab1 = buttonShopTab1;
        this.buttonShopTab2 = buttonShopTab2;
        fon_shop.setInteractive();
        fon_merge.setInteractive();
        fon_merge.on("pointerdown", this.inputOverShopDown, this);
        fon_merge.on("pointerup", this.inputOverShopUp, this);
        this.isInputOverShopDown = false;
        this.layerShop.add(this.layerShopContent);
        this.layerShop.add(this.layerShopContent2);
        this.contentHeight = 0;
        this.arShopCars = [];
        this.addContentTab1(offsetX);
        this.addContentTab2(offsetX);
        this.addSlider(offsetX);
        var graphicsMask = this.make.graphics();
        var color = 65535;
        graphicsMask.fillStyle(color);
        graphicsMask.fillRect(220 + offsetX, 120, 550, 452);
        this.layerShopContent.mask = new Phaser.Display.Masks.BitmapMask(this, graphicsMask);
        this.textCoinsShop = MainGame.addText(this, this.layerShop, 20 + offsetX, -232, "0", 26, true);
        this.layerShop.visible = false;
        this.contentMaxY = this.contentHeight;
        this.updatePositions(0);
        this.clickShopTab1();
        this.isShopAdded = true
    }
    addSlider(offsetX) {
        const slider = new HorizontalSlider({
            scene: this,
            x: 232 + offsetX,
            y: 27,
            current: 0,
            texture: this.SPRITE_SHEET,
            track: {
                frame: "scroll_bar1_0000",
                y: -4.5
            },
            slider: "scroll_bar2_0000"
        });
        slider.setAngle(90);
        this.layerShop.add(slider);
        this.slider = slider;
        slider.on("update", (slider, value, percent) => {
            var scrollPercent = Math.round(percent * 100);
            var newContentY = (slider.height - this.contentHeight) / 100 * scrollPercent;
            this.current_pos.y = -newContentY;
            this.updatePositions(-newContentY, true)
        }, this);
        this.input.on("wheel", (function(pointer, gameObjects, deltaX, deltaY, deltaZ) {
            var _this = MainGame.state.gameGUI;
            if (_this.shopTabSelected != 1) return;
            _this.current_pos.y = _this.limit(_this.current_pos.y + deltaY * .5);
            var posY = _this.current_pos.y;
            _this.updatePositions(posY)
        }));
        this.updatePositions(0)
    }
    addContentTab1(offsetX) {
        var car;
        for (var i = 1; i <= this.MAX_TYPES_CAR; i++) {
            car = this.addShopItemMain(-8 + offsetX, this.itemShop_WIDTH * i - 130 - this.itemShop_WIDTH, i);
            this.arShopCars.push(car)
        }
        for (var i = 1; i <= this.MAX_TYPES_CAR; i++) {
            car = this.addShopItemText(-8 + offsetX, this.itemShop_WIDTH * i - 130 - this.itemShop_WIDTH, i)
        }
        this.contentHeight -= this.itemShop_WIDTH * 3 + 50
    }
    addShopItemMain(vX, vY, vNum) {
        var item = this.add.container();
        this.layerShopContent.add(item);
        var plaha = this.add.image(vX, vY, this.SPRITE_SHEET, "window_car_0000");
        item.add(plaha);
        var window = this.add.image(vX - 107, vY, this.SPRITE_SHEET, "icon_window1_0000");
        item.add(window);
        var spriteNum = vNum;
        if (spriteNum > 50) spriteNum = 50;
        var car = this.add.image(vX - 56, vY - 3, this.SPRITE_SHEET, "icon_r" + spriteNum + "_0000");
        car.setOrigin(1, .5);
        item.add(car);
        var buttonBuy = new ButtonText(vX + 85, vY + 12, this.SPRITE_SHEET, "btn_buy_shop_0000", this.clickBuyShopItem, this, "123K", vNum);
        item.add(buttonBuy);
        buttonBuy.text.setFontSize(26);
        buttonBuy.text.x = 20;
        buttonBuy.text.setOrigin(.5, .5);
        this.contentHeight += this.itemShop_WIDTH;
        return {
            item: item,
            car: car,
            btn: buttonBuy,
            btn_back: buttonBuy.back,
            btn_text: buttonBuy.text
        }
    }
    clickBuyShopItem(vNum) {
        this.gameScreen.clickBuyShopItem(vNum)
    }
    addShopItemText(vX, vY, vNum) {
        var car = this.arShopCars[vNum - 1];
        var item = car.item;
        var text_num = MainGame.addText(this, item, vX - 206, vY - 34, vNum, 27, true, true);
        text_num.setTint(0);
        var text_dmg = MainGame.addText(this, item, vX + 40, vY - 37, MainGame.GAME_TEXT.damage, 18, true, true);
        text_dmg.setOrigin(0, .5);
        car.textField_dmg = text_dmg
    }
    addContentTab2(offsetX) {
        this.itemPrivilege1 = this.addShopItemsTabPrivilegies1(-8 + offsetX, this.itemShop_WIDTH * 0 - 130);
        this.itemPrivilege2 = this.addShopItemsTabPrivilegies2(-8 + offsetX, this.itemShop_WIDTH * 1 - 130);
        this.itemPrivilege3 = this.addShopItemsTabPrivilegies3(-8 + offsetX, this.itemShop_WIDTH * 2 - 130)
    }
    addShopItemsTabPrivilegies1(vX, vY) {
        var item = this.add.container();
        this.layerShopContent2.add(item);
        var plaha = this.add.image(vX, vY, this.SPRITE_SHEET, "window_car_0000");
        item.add(plaha);
        var icon = this.add.image(vX - 110, vY - 10, this.SPRITE_SHEET, "icon_damage_0000");
        item.add(icon);
        var buttonBuy = new ButtonText(vX + 85, vY + 10, this.SPRITE_SHEET, "btn_buy_shop_0000", this.clickBuyPrivilege1, this, "");
        item.add(buttonBuy);
        buttonBuy.text.setFontSize(26);
        buttonBuy.text.x = 25;
        buttonBuy.text.setOrigin(.5, .5);
        var text_title = MainGame.addText(this, item, vX - 112, vY + 40, MainGame.GAME_TEXT.upgrade_1, 18, true, true);
        var text_lvl = MainGame.addText(this, item, vX - 206, vY + 2, MainGame.GAME_TEXT.lvl, 18, true, true);
        var text_num = MainGame.addText(this, item, vX - 206, vY - 34, "1", 30, true, true);
        var text_value = MainGame.addText(this, item, vX + 10, vY - 38, "", 18, true, true);
        text_title.setTint(16777215);
        text_lvl.setTint(0);
        text_num.setTint(0);
        text_value.setTint(16777215);
        text_value.setOrigin(0, .5);
        MainGame.updateTextWidth(text_title, 150);
        return {
            btn: buttonBuy,
            btn_back: buttonBuy.back,
            btn_text: buttonBuy.text,
            text_num: text_num,
            text_value: text_value
        }
    }
    addShopItemsTabPrivilegies2(vX, vY) {
        var item = this.add.container();
        this.layerShopContent2.add(item);
        var plaha = this.add.image(vX, vY, this.SPRITE_SHEET, "window_car_0000");
        item.add(plaha);
        var icon = this.add.image(vX - 110, vY - 10, this.SPRITE_SHEET, "icon_price_0000");
        item.add(icon);
        var buttonBuy = new ButtonText(vX + 85, vY + 10, this.SPRITE_SHEET, "btn_buy_shop_0000", this.clickBuyPrivilege2, this, "");
        item.add(buttonBuy);
        buttonBuy.text.setFontSize(26);
        buttonBuy.text.x = 25;
        buttonBuy.text.setOrigin(.5, .5);
        var text_title = MainGame.addText(this, item, vX - 112, vY + 40, MainGame.GAME_TEXT.upgrade_2, 18, true, true);
        var text_lvl = MainGame.addText(this, item, vX - 206, vY + 2, MainGame.GAME_TEXT.lvl, 18, true, true);
        var text_num = MainGame.addText(this, item, vX - 206, vY - 34, "1", 30, true, true);
        var text_value = MainGame.addText(this, item, vX + 10, vY - 38, "", 18, true, true);
        text_title.setTint(16777215);
        text_lvl.setTint(0);
        text_num.setTint(0);
        text_value.setTint(16777215);
        text_value.setOrigin(0, .5);
        MainGame.updateTextWidth(text_title, 150);
        return {
            btn: buttonBuy,
            btn_back: buttonBuy.back,
            btn_text: buttonBuy.text,
            text_num: text_num,
            text_value: text_value
        }
    }
    addShopItemsTabPrivilegies3(vX, vY) {
        var item = this.add.container();
        this.layerShopContent2.add(item);
        var plaha = this.add.image(vX, vY, this.SPRITE_SHEET, "window_car_0000");
        item.add(plaha);
        var icon = this.add.image(vX - 110, vY - 10, this.SPRITE_SHEET, "icon_profit_0000");
        item.add(icon);
        var buttonBuy = new ButtonText(vX + 85, vY + 10, this.SPRITE_SHEET, "btn_buy_shop_0000", this.clickBuyPrivilege3, this, "");
        item.add(buttonBuy);
        buttonBuy.text.setFontSize(26);
        buttonBuy.text.x = 25;
        buttonBuy.text.setOrigin(.5, .5);
        var text_title = MainGame.addText(this, item, vX - 112, vY + 40, MainGame.GAME_TEXT.upgrade_3, 18, true, true);
        var text_lvl = MainGame.addText(this, item, vX - 206, vY + 2, MainGame.GAME_TEXT.lvl, 18, true, true);
        var text_num = MainGame.addText(this, item, vX - 206, vY - 34, "1", 30, true, true);
        var text_value = MainGame.addText(this, item, vX + 10, vY - 38, "", 18, true, true);
        text_title.setTint(16777215);
        text_lvl.setTint(0);
        text_num.setTint(0);
        text_value.setTint(16777215);
        text_value.setOrigin(0, .5);
        MainGame.updateTextWidth(text_title, 150);
        return {
            btn: buttonBuy,
            btn_back: buttonBuy.back,
            btn_text: buttonBuy.text,
            text_num: text_num,
            text_value: text_value
        }
    }
    clickBuyPrivilege1() {
        this.gameScreen.clickBuyPrivilege1()
    }
    clickBuyPrivilege2() {
        this.gameScreen.clickBuyPrivilege2()
    }
    clickBuyPrivilege3() {
        this.gameScreen.clickBuyPrivilege3()
    }
    clickShopTab1() {
        this.shopTabSelected = 1;
        this.layerShopContent.visible = true;
        this.slider.visible = true;
        this.layerShopContent2.visible = false;
        this.buttonShopTab1.back.setFrame("btn_shop1_0000");
        this.buttonShopTab2.back.setFrame("btn_shop2_0000");
        this.updateShopItem()
    }
    clickShopTab2() {
        this.shopTabSelected = 2;
        this.layerShopContent.visible = false;
        this.slider.visible = false;
        this.layerShopContent2.visible = true;
        this.buttonShopTab1.back.setFrame("btn_shop2_0000");
        this.buttonShopTab2.back.setFrame("btn_shop1_0000")
    }
    closeShop() {
        this.gameScreen.setGameLogicPause(false);
        if (MainGame.isAPI) MainGame.API_POKI.commercialBreak();
        this.enableMainButtons();
        this.layerShop.visible = false
    }
    updateShop(value) {
        if (!this.isShopAdded) return;
        this.textCoinsShop.setText(value)
    }
    updateShopItem() {
        if (!this.isShopAdded) return;
        var item;
        this.gameScreen.updatePrivilegiesItems();
        for (var i = 0; i < this.MAX_TYPES_CAR; i++) {
            item = this.arShopCars[i];
            if (i + 2 > this.gameScreen.nextCarLevel) {
                item.car.setTintFill(1513239);
                item.btn_back.setFrame("btn_buy_gray_0000");
                item.btn_text.setText("???");
                item.btn_text.setTint(16777215);
                MainGame.updateTextWidth(item.btn_text, 140);
                item.btn.disableInput();
                item.textField_dmg.visible = false
            } else {
                item.car.clearTint();
                item.textField_dmg.visible = true;
                var value_dmg = this.gameScreen.getDamage(i + 1);
                var value_dmg_warm = MainGame.convertNumberFormat(value_dmg);
                item.textField_dmg.setText(MainGame.GAME_TEXT.damage + " : " + value_dmg_warm);
                if (i > 0 && this.gameScreen.nextCarLevel < i + 6) {
                    if (i == this.gameScreen.nextCarLevel - 5) {
                        if (this.gameScreen.ALLOW_ADS_CAR) {
                            item.btn_back.setFrame("btn_buy2_shop_0000");
                            item.btn_text.setText(" " + MainGame.GAME_TEXT.free.toUpperCase() + " ");
                            MainGame.updateTextWidth(item.btn_text, 120);
                            item.btn.enableInput();
                            item.btn.setEnable(true);
                            if (MainGame.isAPI) {
                                if (MainGame.API_POKI && MainGame.API_POKI.api_isAdblock) item.btn.setEnable(false)
                            } else {
                                if (!MainGame.isDebugAds) item.btn.setEnable(false)
                            }
                        } else {
                            item.btn_back.setFrame("btn_buy_gray_0000");
                            item.btn_text.setText(MainGame.GAME_TEXT.unlock_car + " " + (i + 5));
                            MainGame.updateTextWidth(item.btn_text, 120);
                            item.btn.disableInput()
                        }
                    } else {
                        item.btn_back.setFrame("btn_buy_gray_0000");
                        item.btn_text.setText(MainGame.GAME_TEXT.unlock_car + " " + (i + 5));
                        MainGame.updateTextWidth(item.btn_text, 120);
                        item.btn.disableInput()
                    }
                } else {
                    item.btn_back.setFrame("btn_buy_shop_0000");
                    var price = Math.round(this.gameScreen.arCurrentPricesCar[i] * this.gameScreen.factorDiscount);
                    var number_warm = MainGame.convertNumberFormat(price);
                    item.btn_text.setText(number_warm);
                    MainGame.updateTextWidth(item.btn_text, 120);
                    item.btn.enableInput()
                }
            }
        }
    }
    inputOverShopDown() {
        this.isInputOverShopDown = true
    }
    inputOverShopUp() {
        if (!this.isInputOverShopDown) return;
        this.closeShop();
        this.isInputOverShopDown = false
    }
    clickShop() {
        if (!this.isShopAdded) return;
        this.gameScreen.setGameLogicPause(true);
        this.isInputOverShopDown = false;
        this.layerShop.visible = true;
        this.disableMainButtons();
        this.updateShopItem()
    }
    update(time, delta) {
        if (this.isShopAdded) this.updateScrollMap()
    }
    showBanner() {
        return;
        if (MainGame.lastDataBanner == null) {
            MainGame.lastDataBanner = (new Date).getTime();
            if (MainGame.isAPI) {
                MainGame.API_POKI.displayAd()
            }
        } else {
            var currentDate = new Date;
            var dif = currentDate.getTime() - MainGame.lastDataBanner;
            var secondsFromLastCalling = Math.abs(dif / 1e3);
            if (secondsFromLastCalling > MainGame.TIME_BANNER) {
                if (MainGame.isAPI) {
                    MainGame.API_POKI.destroyAd();
                    MainGame.API_POKI.displayAd()
                }
                MainGame.lastDataBanner = (new Date).getTime()
            } else {}
        }
    }
    clickMuteSound() {
        MainGame.Sfx.manage("sound", "switch", this, this.buttonMuteSound.icon, this.buttonMuteSound.text)
    }
    clickMuteMusic() {
        MainGame.Sfx.manage("music", "switch", this, this.buttonMuteMusic.icon, this.buttonMuteMusic.text)
    }
}
Pool = function(game, layer, initialSize) {
    this.game = game;
    this.layer = layer;
    this.nextFree = null;
    this.lastFree = null;
    this.previousFree = null;
    this._pool = [];
    for (let i = 0; i < initialSize; i++) {
        this.addNewObject(this.newPoolObject())
    }
};
Pool.prototype.addNewObject = function(obj) {
    this._pool.push(obj);
    this.release(obj);
    return obj
};
Pool.prototype.release = function(poolObject) {
    poolObject.free = true;
    poolObject.nextFree = null;
    poolObject.previousFree = this.lastFree;
    if (poolObject.previousFree) {
        this.lastFree.nextFree = poolObject
    } else {
        this.nextFree = poolObject
    }
    this.lastFree = poolObject;
    poolObject.init()
};
Pool.prototype.getFree = function() {
    const freeObject = this.nextFree ? this.nextFree : this.addNewObject(this.newPoolObject());
    freeObject.free = false;
    this.nextFree = freeObject.nextFree;
    if (!this.nextFree) this.lastFree = null;
    return freeObject
};
Pool.prototype.newPoolObject = function() {
    return new Enemy(this.game, this.layer, this.lastFree, this.nextFree)
};
Pool.prototype.releaseAll = function() {
    this._pool.forEach(item => this.release(item))
};
Pool.prototype.getChildren = function() {
    return this._pool
};
Pool.prototype.update = function(time, delta) {
    this._pool.forEach(item => {
        item.update(time, delta)
    })
};
Pool.prototype.updateSpeed = function(vIsDoubleSpeed) {
    this._pool.forEach(item => {
        item.updateSpeed(vIsDoubleSpeed)
    })
};
Pool.prototype.checkBoom = function(vX, vY, vDistance, vDamage) {
    this._pool.forEach(item => {
        item.checkBoom(vX, vY, vDistance, vDamage)
    })
};
Pool.prototype.checkView = function() {
    this._pool.forEach(item => {
        item.checkView()
    })
};
var Effect = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize: function Effect(scene) {
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, "ss_main");
        this.scene = scene;
        this.scene.layerEffects.add(this);
        this.ignoreDestroy = true
    },
    show: function(x, y, name, hideOnComplete) {
        this.setPosition(x, y);
        this.angle = 0;
        this.setActive(true);
        this.setVisible(true);
        this.play(name);
        this.setScale(1);
        this.hideOnComplete = hideOnComplete;
        if (hideOnComplete) {
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (function() {
                this.hide()
            }), this)
        }
    },
    hide: function() {
        this.setActive(false);
        this.setVisible(false);
        if (this.hideOnComplete) this.off(Phaser.Animations.Events.ANIMATION_COMPLETE)
    }
});
Tower = function(game, vLayer, vX, vY, vType) {
    this.game = game;
    this.initPos = {
        x: vX,
        y: vY
    };
    this.type = vType;
    this.countBullet = vType;
    this.health = 100;
    this.damage = 30;
    this.count_box_tween = 0;
    this.targetAim = null;
    this.timeReload = 50;
    this.timeShoot = Math.floor(this.timeReload * .5);
    this.ATTACK_TOWER = this.game.ATTACK_TOWER;
    this.countShoot = 0;
    this.typeBullet = 1;
    this.fireAnim = "fire";
    this.idleAnim = "idle";
    this.skin_hat = 1;
    this.skin_chest = 1;
    this.skin_body = 1;
    this.skin_shoulder = 1;
    this.skin_forearm = 1;
    this.skin_hip = 1;
    this.skin_leg = 1;
    this.skin_boot = 1;
    var view = game.add.spine(vX, vY, "skeleton", "idle", true);
    this.view = view;
    if (view.skeleton && view.skeleton.ikConstraints) {
        this.targetIK = view.skeleton.ikConstraints[0].target
    }
    var scale = this.getInitialScale();
    if (vLayer) vLayer.add(view);
    this.dmgText = this.game.addDmgText();
    this.setViewScale(scale);
    this.setSkinTower(vType)
};
Tower.prototype.playAnimation = function(vAnimName, vIsLoop) {
    if (this.animName == vAnimName) return;
    this.view.setAnimation(0, vAnimName, vIsLoop);
    if ((vAnimName == "fire" || vAnimName == "fire2" || vAnimName == "fire3" || vAnimName == "fire4") && !vIsLoop) {
        this.view.addAnimation(0, this.idleAnim, true)
    }
    if (vAnimName == "reload" && !vIsLoop) {}
};
Tower.prototype.getInitialScale = function() {
    return .55
};
Tower.prototype.resetTargetIk = function() {
    this.targetIK.y = 56
};
Tower.prototype.setInitPosition = function(vX, vY) {
    this.initPos.x = vX;
    this.initPos.y = vY
};
Tower.prototype.resetTween = function() {
    this.game.tweens.killTweensOf(this.view);
    this.view.x = this.initPos.x;
    this.view.y = this.initPos.y
};
Tower.prototype.resetDodik = function() {
    this.resetTargetIk();
    this.resetTween();
    var scale = this.getInitialScale();
    this.setViewScale(scale)
};
Tower.prototype.setTarget = function(target) {
    this.targetAim = target;
    this.updateSpeed()
};
Tower.prototype.getTarget = function() {
    return this.targetAim
};
Tower.prototype.clearTarget = function() {
    if (this.targetAim) {
        this.targetAim.isUnderAttack = false;
        this.targetAim = null
    }
};
Tower.prototype.checkTarget = function() {
    if (this.targetAim) {
        if (!this.targetAim.isAlive) {
            this.targetAim = null
        } else {
            if (this.targetAim.isUnderAttack && this.countShoot == 0) {
                this.targetAim = null
            }
        }
    }
};
Tower.prototype.updateSpeed = function() {
    this.ATTACK_TOWER = this.game.ATTACK_TOWER
};
Tower.prototype.updateAnchor = function() {};
Tower.prototype.updateTypeBullet = function() {
    this.damage = this.game.getDamage(this.type)
};
Tower.prototype.updateShoot = function() {
    this.timeShoot += this.ATTACK_TOWER
};
Tower.prototype.checkShoot = function() {
    return this.timeShoot >= this.timeReload
};
Tower.prototype.makeShoot = function(angle) {
    if (this.targetAim && this.targetAim.isAlive) {
        var deg = Phaser.Math.RadToDeg(angle);
        if (deg > 0) {
            deg -= 180
        } else {
            deg += 180
        }
        this.targetIK.y = 56 + deg * 1.3;
        this.fire(angle, this.countShoot);
        this.timeShoot = 0;
        this.countShoot++;
        this.timeReload = 50;
        this.countShoot = 0;
        this.targetAim.getAdvanceDmg(this.damage)
    }
};
Tower.prototype.fire = function(angle, countShoot) {
    this.game.showBulletEffect(this.targetAim, this.damage, this.dmgText, this.targetAim.x, this.targetAim.y, this.view.x, this.view.y, angle);
    var r = MyMath.getRandomInt(1, 4);
    MainGame.Sfx.play("sound", "shoot_" + this.sfxFire + r);
    this.playAnimation(this.fireAnim, false)
};
Tower.prototype.setSkinTower = function(vType) {
    this.type = vType;
    if (vType > 50) vType = 50;
    this.updateAnims(vType);
    this.view.skeleton.setAttachment("head", "head_r1");
    this.view.skeleton.setAttachment("gun", "gun_r" + vType);
    this.view.skeleton.setAttachment("shield", "shield_0");
    this.view.skeleton.setAttachment("hat", "hat_r" + this.skin_hat);
    this.view.skeleton.setAttachment("chest", "chest_r" + this.skin_chest);
    this.view.skeleton.setAttachment("body", "body_r" + this.skin_body);
    this.view.skeleton.setAttachment("shoulder_L", "shoulder_r" + this.skin_shoulder);
    this.view.skeleton.setAttachment("shoulder_R", "shoulder_r" + this.skin_shoulder);
    this.view.skeleton.setAttachment("forearm_L", "forearm_r" + this.skin_forearm);
    this.view.skeleton.setAttachment("forearm_R", "forearm_r" + this.skin_forearm);
    this.view.skeleton.setAttachment("hip_L", "hip_r" + this.skin_hip);
    this.view.skeleton.setAttachment("hip_R", "hip_r" + this.skin_hip);
    this.view.skeleton.setAttachment("leg_L", "leg_r" + this.skin_leg);
    this.view.skeleton.setAttachment("leg_R", "leg_r" + this.skin_leg);
    this.view.skeleton.setAttachment("boot_L", "boot_r" + this.skin_boot);
    this.view.skeleton.setAttachment("boot_R", "boot_r" + this.skin_boot);
    this.view.state.tracks[0].trackTime = MyMath.getRandomInt(1, 10) * .5;
    this.updateTypeBullet()
};
Tower.prototype.setSkinBox = function(vBool, vTypeBox) {
    if (vBool) {
        this.view.skeleton.setAttachment("box", "box" + vTypeBox);
        this.view.y += 15;
        this.view.skeleton.setAttachment("gun", null);
        this.view.skeleton.setAttachment("head", null);
        this.view.skeleton.setAttachment("hat", null);
        this.view.skeleton.setAttachment("chest", null);
        this.view.skeleton.setAttachment("body", null);
        this.view.skeleton.setAttachment("shoulder_L", null);
        this.view.skeleton.setAttachment("shoulder_R", null);
        this.view.skeleton.setAttachment("forearm_L", null);
        this.view.skeleton.setAttachment("forearm_R", null);
        this.view.skeleton.setAttachment("hip_L", null);
        this.view.skeleton.setAttachment("hip_R", null);
        this.view.skeleton.setAttachment("leg_L", null);
        this.view.skeleton.setAttachment("leg_R", null);
        this.view.skeleton.setAttachment("boot_L", null);
        this.view.skeleton.setAttachment("boot_R", null)
    } else {
        this.view.skeleton.setAttachment("box", null);
        this.playAnimation(this.idleAnim, true)
    }
};
Tower.prototype.showObject = function() {
    this.setViewAlpha(1);
    this.view.visible = true
};
Tower.prototype.hideItem = function() {
    this.view.visible = false
};
Tower.prototype.removeTower = function() {};
Tower.prototype.getViewPosition = function() {
    return {
        x: this.view.x,
        y: this.view.y
    }
};
Tower.prototype.setViewPosition = function(vX, vY) {
    this.view.x = vX;
    this.view.y = vY
};
Tower.prototype.setViewAngle = function(value) {
    this.view.angle = value
};
Tower.prototype.setViewAngleFromRad = function(value) {
    var angle = (value + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    this.setViewAngle(angle + 90)
};
Tower.prototype.setViewAlpha = function(value) {
    this.view.alpha = value
};
Tower.prototype.setViewScale = function(value) {
    this.view.setScale(value)
};
Tower.prototype.updateAnims = function(vType) {
    if (vType <= 5) {
        this.skin_hat = 1;
        this.skin_chest = 1;
        this.skin_body = 1;
        this.skin_shoulder = 1;
        this.skin_forearm = 1;
        this.skin_hip = 1;
        this.skin_leg = 1;
        this.skin_boot = 1
    } else if (vType > 5 && vType <= 10) {
        this.skin_hat = 2;
        this.skin_chest = 2;
        this.skin_body = 2;
        this.skin_shoulder = 1;
        this.skin_forearm = 1;
        this.skin_hip = 1;
        this.skin_leg = 1;
        this.skin_boot = 1
    } else if (vType > 10 && vType <= 15) {
        this.skin_hat = 3;
        this.skin_chest = 3;
        this.skin_body = 3;
        this.skin_shoulder = 1;
        this.skin_forearm = 1;
        this.skin_hip = 1;
        this.skin_leg = 1;
        this.skin_boot = 1
    } else if (vType > 15 && vType <= 20) {
        this.skin_hat = 4;
        this.skin_chest = 4;
        this.skin_body = 4;
        this.skin_shoulder = 1;
        this.skin_forearm = 1;
        this.skin_hip = 1;
        this.skin_leg = 1;
        this.skin_boot = 1
    } else if (vType > 20 && vType <= 25) {
        this.skin_hat = 5;
        this.skin_chest = 5;
        this.skin_body = 5;
        this.skin_shoulder = 1;
        this.skin_forearm = 1;
        this.skin_hip = 1;
        this.skin_leg = 1;
        this.skin_boot = 1
    } else if (vType > 25 && vType <= 30) {
        this.skin_hat = 6;
        this.skin_chest = 6;
        this.skin_body = 6;
        this.skin_shoulder = 6;
        this.skin_forearm = 1;
        this.skin_hip = 1;
        this.skin_leg = 1;
        this.skin_boot = 1
    } else if (vType > 30 && vType <= 35) {
        this.skin_hat = 7;
        this.skin_chest = 7;
        this.skin_body = 7;
        this.skin_shoulder = 7;
        this.skin_forearm = 7;
        this.skin_hip = 1;
        this.skin_leg = 7;
        this.skin_boot = 1
    } else if (vType > 35 && vType <= 40) {
        this.skin_hat = 8;
        this.skin_chest = 8;
        this.skin_body = 8;
        this.skin_shoulder = 8;
        this.skin_forearm = 8;
        this.skin_hip = 8;
        this.skin_leg = 8;
        this.skin_boot = 8
    } else if (vType > 40 && vType <= 45) {
        this.skin_hat = 9;
        this.skin_chest = 9;
        this.skin_body = 9;
        this.skin_shoulder = 9;
        this.skin_forearm = 9;
        this.skin_hip = 9;
        this.skin_leg = 9;
        this.skin_boot = 9
    } else if (vType > 45 && vType <= 50) {
        this.skin_hat = 10;
        this.skin_chest = 10;
        this.skin_body = 10;
        this.skin_shoulder = 10;
        this.skin_forearm = 10;
        this.skin_hip = 10;
        this.skin_leg = 10;
        this.skin_boot = 10
    }
    switch (vType) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            this.fireAnim = "fire";
            this.idleAnim = "idle";
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 23:
        case 26:
        case 27:
        case 31:
        case 32:
        case 33:
        case 36:
            this.fireAnim = "fire2";
            this.idleAnim = "idle2";
            break;
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 25:
        case 28:
        case 29:
        case 34:
        case 37:
        case 38:
        case 39:
        case 41:
        case 42:
        case 43:
        case 46:
        case 47:
            this.fireAnim = "fire3";
            this.idleAnim = "idle2";
            break;
        case 30:
        case 35:
        case 40:
        case 44:
        case 45:
        case 48:
        case 49:
        case 50:
            this.fireAnim = "fire4";
            this.idleAnim = "idle2";
            break
    }
    var arSfx = ["pistol", "pistol", "pistol", "pistol", "pistol", "auto", "auto", "auto", "auto", "rifle", "rifle", "rifle", "shotgun", "shotgun", "machine", "rifle", "rifle", "shotgun", "rifle", "rifle", "machine", "rifle", "rifle", "auto", "rifle", "shotgun", "rifle", "rifle", "rifle", "machine", "rifle", "shotgun", "rifle", "rifle", "machine", "rifle", "blaster", "rifle", "rifle", "shotgun", "rifle", "shotgun", "rifle", "blaster", "blaster", "blaster", "blaster", "shotgun", "machine", "shotgun"];
    this.sfxFire = arSfx[vType - 1]
};
const STATUS_DEAD = 0;
const STATUS_RUN = 1;
const STATUS_FOLLOW = 2;
const STATUS_ATTACK = 3;
const STATUS_IDLE = 4;
const ATTACK_NO = 0;
const ATTACK_BULLET = 1;
const ATTACK_MELEE = 2;
const ATTACK_ROCKET = 3;
const ATTACK_GRENADE = 4;
const ATTACK_HOOK = 5;
Enemy = function(game, layer, lastFree, nextFree) {
    this.game = game;
    this.lastFree = lastFree;
    this.nextFree = nextFree;
    var view = game.add.spine(0, 0, "skeleton", "run", true);
    var scale = .55;
    view.setScale(-scale, scale);
    layer.add(view);
    this.hpBars = this.game.addHpBar();
    this.view = view
};
Enemy.prototype.init = function() {
    this.timeRemove = 0;
    this.active = false;
    this.isAlive = false;
    this.isUnderAttack = false;
    this.isReachedWall = false;
    this.view.visible = false;
    this.view.angle = 0;
    this.speed = 1;
    this.hpBars.bar1.setVisible(false);
    this.hpBars.bar2.setVisible(false);
    this.animName = ""
};
Enemy.prototype.resetValues = function() {
    this.timeRemove = 0;
    this.active = true;
    this.isAlive = true;
    this.isUnderAttack = false;
    this.isReachedWall = false;
    this.stepAttack1 = false;
    this.stepAttack2 = false;
    this.stepAttack3 = false;
    this.stepAttack4 = false;
    this.health_max = 100;
    this.health_adv = this.health_max;
    this.health = this.health_max;
    this.timeAttack = 0;
    this.meleeAttack = 0;
    this.speed = this.game.SPEED_ENEMY;
    this.ATTACK_ENEMY = this.game.ATTACK_ENEMY;
    this.reloading = 50;
    this.damage = 5;
    this.timeLife = 0;
    this.goalX = 585 + MyMath.getRandomInt(-5, 5) * 2;
    this.goalY = 0;
    this.timerCar = 0;
    this.desantPos = {
        x: 0,
        y: 0
    };
    this.desantSkin = 1;
    this.typeAttack = ATTACK_BULLET;
    this.goDead = this.deadNormal;
    this.updateAdditional = this.updateNormal;
    this.hpBars.bar1.setVisible(true);
    this.hpBars.bar2.setVisible(true);
    this.view.skeleton.setAttachment("car", null);
    this.view.skeleton.setAttachment("door", null);
    this.view.skeleton.setAttachment("wheel_f", null);
    this.view.skeleton.setAttachment("wheel_r", null);
    this.view.skeleton.setAttachment("shooter", null)
};
Enemy.prototype.isDamaged = function() {
    return this.health != this.health_max
};
Enemy.prototype.updateSpeed = function() {
    if (!this.isAlive) return;
    if (!this.isReachedWall) {
        this.speed = this.game.SPEED_ENEMY;
        if (this.type == 6) this.speed = this.game.SPEED_ENEMY * 1.5;
        if (this.type == 51 || this.type == 52 || this.type == 53) this.speed = this.game.SPEED_ENEMY * 2
    }
};
Enemy.prototype.playAnimation = function(vAnimName, vIsLoop) {
    this.view.setAnimation(0, vAnimName, vIsLoop);
    this.animName = vAnimName;
    if (!vIsLoop) {
        if (vAnimName == "car_open") {
            this.view.addAnimation(0, "car_idle", true)
        } else if (vAnimName == "car_attack") {
            this.view.addAnimation(0, "car_idle2", true)
        } else if (vAnimName == "launch") {
            this.view.addAnimation(0, this.animIdle, true)
        } else if (vAnimName == "launch2") {
            this.view.addAnimation(0, this.animIdle, true)
        } else if (vAnimName == "launch3") {
            this.view.addAnimation(0, this.animIdle, true)
        }
    }
};
Enemy.prototype.setNewBot = function(vId, x, y, vData, vType, vOption, vNumWave) {
    this.id = vId;
    this.resetValues();
    this.goalY = y;
    var offsetY = 0;
    var skin_weapon = vData.skin_weapon;
    var skin_hat = vData.skin_hat;
    var skin_chest = vData.skin_chest;
    var skin_body = vData.skin_body;
    var skin_shield = vData.skin_shield;
    var skin_desant = vData.skin_desant;
    var skin_shoulder = vData.skin_shoulder;
    var skin_forearm = vData.skin_forearm;
    var skin_hip = vData.skin_hip;
    var skin_leg = vData.skin_leg;
    var skin_boot = vData.skin_boot;
    this.status = STATUS_RUN;
    this.typeUnit = "man";
    this.skin_shield = "0";
    this.skin_hat = "0";
    this.skin_chest = "r1";
    this.skin_body = "r1";
    this.skin_shoulder = "r1";
    this.skin_forearm = "r1";
    this.skin_hip = "r1";
    this.skin_leg = "r1";
    this.skin_boot = "r1";
    this.animFire = "fire";
    this.animRun = "run";
    this.animIdle = "idle";
    if (skin_hat > 0) this.skin_hat = "e" + skin_hat;
    if (skin_body > 1) this.skin_body = "e" + skin_body;
    if (skin_chest > 1) this.skin_chest = "e" + skin_chest;
    if (skin_shoulder > 1) this.skin_shoulder = "e" + skin_shoulder;
    if (skin_forearm > 1) this.skin_forearm = "e" + skin_forearm;
    if (skin_hip > 1) this.skin_hip = "e" + skin_hip;
    if (skin_leg > 1) this.skin_leg = "e" + skin_leg;
    if (skin_boot > 1) this.skin_boot = "e" + skin_boot;
    switch (vType) {
        case 1:
        case 101:
            this.weaponSkin = skin_weapon;
            this.typeAttack = ATTACK_MELEE;
            this.animRun = "run";
            this.goalX = 580 + MyMath.getRandomInt(-5, 5) * 2;
            this.updateAdditional = this.updateMelee;
            this.goDead = this.deadNormal;
            this.view.skeleton.setAttachment("hat", "hat_0");
            this.view.skeleton.setAttachment("gun", "melee_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            break;
        case 2:
        case 102:
            this.weaponSkin = skin_weapon;
            this.typeAttack = ATTACK_BULLET;
            this.animFire = "fire";
            this.animRun = "run3";
            this.goalX = 450 + MyMath.getRandomInt(-5, 5) * 2;
            this.goDead = this.deadNormal;
            this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            this.sfxFire = "shoot_pistol";
            break;
        case 3:
        case 103:
            this.weaponSkin = skin_weapon;
            this.typeAttack = ATTACK_BULLET;
            this.animRun = "run2";
            this.goalX = 300 + MyMath.getRandomInt(-5, 5) * 2;
            var listW3 = [3, 8, 13, 18, 23, 28];
            var listW4 = [4, 9, 14, 19, 24, 29];
            var listW5 = [5, 10, 15, 20, 25, 30];
            var isWeapon3 = listW3.indexOf(this.weaponSkin) != -1;
            var isWeapon4 = listW4.indexOf(this.weaponSkin) != -1;
            var isWeapon5 = listW5.indexOf(this.weaponSkin) != -1;
            if (isWeapon3) {
                this.animFire = "fire2";
                this.reloading = 30;
                this.sfxFire = "shoot_auto"
            } else if (isWeapon4) {
                this.animFire = "fire2";
                this.reloading = 40;
                this.sfxFire = "shoot_shotgun"
            } else if (isWeapon5) {
                this.animFire = "fire3";
                this.reloading = 50;
                this.sfxFire = "shoot_rifle"
            }
            this.goDead = this.deadNormal;
            this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            break;
        case 4:
        case 104:
            this.weaponSkin = skin_weapon;
            var r_shield = skin_shield;
            if (vOption) {
                if (vOption.desantSkin) r_shield = vOption.desantSkin;
                if (vOption.timeLife) this.timeLife = vOption.timeLife + 100
            }
            this.skin_shield = "e" + r_shield;
            this.typeAttack = ATTACK_MELEE;
            this.animRun = "run4";
            this.goalX = 580 + MyMath.getRandomInt(-5, 5) * 2;
            this.updateAdditional = this.updateMelee;
            this.goDead = this.deadNormal;
            this.view.skeleton.setAttachment("gun", "melee_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            break;
        case 51:
        case 52:
        case 53:
            this.typeUnit = "car";
            if (vType == 51) {
                this.view.skeleton.setAttachment("car", "car1");
                this.view.skeleton.setAttachment("door", "door1");
                this.view.skeleton.setAttachment("wheel_f", "wheel1");
                this.view.skeleton.setAttachment("wheel_r", "wheel1");
                this.view.skeleton.setAttachment("shooter", "shooter0");
                this.playAnimation("car_run", true);
                this.desantPos.x = -83;
                this.desantPos.y = 0;
                this.desantSkin = skin_desant;
                this.typeAttack = ATTACK_NO
            } else if (vType == 52) {
                this.view.skeleton.setAttachment("car", "car2");
                this.view.skeleton.setAttachment("door", "door0");
                this.view.skeleton.setAttachment("wheel_f", "wheel2");
                this.view.skeleton.setAttachment("wheel_r", "wheel2");
                this.view.skeleton.setAttachment("shooter", "shooter0");
                this.playAnimation("car_run2", true);
                this.desantPos.x = 20;
                this.desantPos.y = -24;
                this.desantSkin = skin_desant;
                this.typeAttack = ATTACK_NO
            } else if (vType == 53) {
                this.view.skeleton.setAttachment("car", "car3");
                this.view.skeleton.setAttachment("door", "door0");
                this.view.skeleton.setAttachment("wheel_f", "wheel3");
                this.view.skeleton.setAttachment("wheel_r", "wheel3");
                this.view.skeleton.setAttachment("shooter", "shooter3");
                this.playAnimation("car_run2", true);
                this.desantPos.x = -7;
                this.desantPos.y = -17;
                this.desantSkin = skin_desant;
                this.reloading = 20;
                this.typeAttack = ATTACK_BULLET;
                this.animFire = "car_attack"
            }
            this.goalX = 360;
            offsetY = 5;
            this.updateAdditional = this.updateCar;
            this.goDead = this.deadCar;
            break;
        case 6:
            this.animRun = "run5";
            this.weaponSkin = skin_weapon;
            this.goDead = this.deadKamikaze;
            this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            this.timerCar = this.game.getSfxKamikaze();
            break;
        case 7:
        case 107:
            this.typeAttack = ATTACK_ROCKET;
            this.animFire = "launch";
            this.animRun = "run3";
            this.animIdle = "idle3";
            this.goalX = 350 + MyMath.getRandomInt(-5, 5) * 2;
            this.reloading = 120;
            this.weaponSkin = skin_weapon;
            this.goDead = this.deadNormal;
            this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            break;
        case 8:
        case 108:
            this.typeAttack = ATTACK_GRENADE;
            this.animFire = "launch2";
            this.animRun = "run6";
            this.animIdle = "idle4";
            this.goalX = 350 + MyMath.getRandomInt(-5, 5) * 2;
            this.reloading = 120;
            this.weaponSkin = skin_weapon;
            this.updateAdditional = this.updateBomber;
            this.goDead = this.deadNormal;
            this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            break;
        case 110:
            this.typeAttack = ATTACK_BULLET;
            this.animFire = "fire2";
            this.animRun = "run2";
            this.goalX = 450 + MyMath.getRandomInt(-5, 5) * 2;
            this.reloading = 50;
            this.weaponSkin = 14;
            this.skin_hat = "e36";
            this.skin_chest = "e8";
            this.skin_body = "r1";
            this.skin_shoulder = "e8";
            this.skin_forearm = "e8";
            this.skin_hip = "e8";
            this.skin_leg = "e8";
            this.skin_boot = "r1";
            this.goDead = this.deadNormal;
            this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            break;
        case 11:
        case 111:
            this.typeAttack = ATTACK_HOOK;
            this.animFire = "launch3";
            this.animRun = "run7";
            this.animIdle = "idle5";
            this.goalX = 380 + MyMath.getRandomInt(-5, 5) * 2;
            this.reloading = 120;
            this.weaponSkin = skin_weapon;
            if (vType >= 100) {
                this.skin_hat = "e37";
                this.skin_chest = "e14";
                this.skin_body = "e14";
                this.skin_shoulder = "r1";
                this.skin_forearm = "e14";
                this.skin_hip = "e14";
                this.skin_leg = "e14";
                this.skin_boot = "r1"
            } else {
                this.goalX = 440 + MyMath.getRandomInt(-5, 5) * 2
            }
            this.updateAdditional = this.updateMelee;
            this.goDead = this.deadNormal;
            this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
            this.playAnimation(this.animRun, true);
            break
    }
    this.type = vType;
    this.initY = y + offsetY;
    this.x = x;
    this.y = y;
    this.view.setPosition(x, y + offsetY);
    this.scaleValue = .55;
    this.damage = this.game.getMobDamage(vNumWave);
    this.health_max = this.game.getCountMobHp(vNumWave);
    this.health_adv = this.health_max;
    this.health = this.health_max;
    this.view.setColor(16777215);
    this.hpBars.bar1.setPosition(this.x, this.y + 15);
    this.hpBars.bar2.setPosition(this.x, this.y + 15);
    this.view.setDepth(this.game.DEPTH_layerSpine + this.y * 1e-5);
    if (vType >= 100) {
        this.scaleValue = .7;
        this.damage = this.game.getBossDamage(vNumWave);
        this.health_max = this.game.getCountBossHp(vNumWave);
        this.health_adv = this.health_max;
        this.health = this.health_max
    } else if (vType == 51 || vType == 52 || vType == 53) {
        this.health_max = this.game.getCountSpecialHp(vNumWave, vType);
        this.health_adv = this.health_max;
        this.health = this.health_max
    } else if (vType == 4) {
        this.health_max = Math.floor(1.2 * this.game.getCountMobHp(vNumWave));
        this.health_adv = this.health_max;
        this.health = this.health_max
    } else if (vType == 6) {
        this.damage = this.game.getSpecialDamage(vNumWave, vType);
        this.health_max = this.game.getCountSpecialHp(vNumWave, vType);
        this.health_adv = this.health_max;
        this.health = this.health_max
    } else if (vType == 7 || vType == 8) {
        this.damage = this.game.getSpecialDamage(vNumWave, vType)
    }
    this.view.setScale(-this.scaleValue, this.scaleValue);
    if (this.typeUnit != "car") this.setSkinUnit();
    this.updateHpBarsView();
    this.view.visible = false;
    this.hpBars.bar1.visible = false;
    this.hpBars.bar2.visible = false;
    this.updateSpeed()
};
Enemy.prototype.checkView = function() {
    if (!this.isAlive) return;
    if (this.typeAttack == ATTACK_MELEE) {
        this.view.skeleton.setAttachment("gun", "melee_e" + this.weaponSkin)
    } else {
        this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin)
    }
    this.setSkinUnit()
};
Enemy.prototype.setSkinUnit = function() {
    this.view.skeleton.setAttachment("head", "head_r1");
    this.view.skeleton.setAttachment("shield", "shield_" + this.skin_shield);
    this.view.skeleton.setAttachment("hat", "hat_" + this.skin_hat);
    this.view.skeleton.setAttachment("chest", "chest_" + this.skin_chest);
    this.view.skeleton.setAttachment("body", "body_" + this.skin_body);
    this.view.skeleton.setAttachment("shoulder_L", "shoulder_" + this.skin_shoulder);
    this.view.skeleton.setAttachment("shoulder_R", "shoulder_" + this.skin_shoulder);
    this.view.skeleton.setAttachment("forearm_L", "forearm_" + this.skin_forearm);
    this.view.skeleton.setAttachment("forearm_R", "forearm_" + this.skin_forearm);
    this.view.skeleton.setAttachment("hip_L", "hip_" + this.skin_hip);
    this.view.skeleton.setAttachment("hip_R", "hip_" + this.skin_hip);
    this.view.skeleton.setAttachment("leg_L", "leg_" + this.skin_leg);
    this.view.skeleton.setAttachment("leg_R", "leg_" + this.skin_leg);
    this.view.skeleton.setAttachment("boot_L", "boot_" + this.skin_boot);
    this.view.skeleton.setAttachment("boot_R", "boot_" + this.skin_boot)
};
Enemy.prototype.checkBoom = function(vX, vY, vDistance, vDamage) {
    if (!this.isAlive) return;
    var dist = MyMath.distanceTwoPoints(vX, this.x, vY, this.y);
    var dmg = vDamage || this.health_max;
    if (dist < vDistance) {
        this.getAdvanceDmg(dmg);
        this.getDamage(dmg)
    }
};
Enemy.prototype.getDamage = function(damage) {
    if (!this.isAlive) return;
    this.health -= damage;
    this.updateHpBarsView();
    if (this.health <= 0) {
        this.health = 0;
        this.timeRemove = 1;
        this.isAlive = false;
        this.goDead();
        this.game.enemyKilled(this.type);
        this.game.addEffectKilled(this.view.x, this.view.y)
    } else {
        if (this.typeUnit == "car") {
            if (this.health <= this.health_max * .5) {
                this.goalX = this.x
            }
        }
    }
};
Enemy.prototype.deadNormal = function() {
    var r = MyMath.getRandomInt(1, 4);
    this.playAnimation("dead" + r, false)
};
Enemy.prototype.deadCar = function() {
    this.view.visible = false;
    this.hpBars.bar1.visible = false;
    this.hpBars.bar2.visible = false;
    this.game.addEffectBoom(this.view.x - 20, this.view.y);
    this.game.addEffectBoom(this.view.x + 20, this.view.y);
    var r = MyMath.getRandomInt(1, 4);
    MainGame.Sfx.play("sound", "exposion" + r)
};
Enemy.prototype.deadKamikaze = function() {
    this.view.visible = false;
    this.hpBars.bar1.visible = false;
    this.hpBars.bar2.visible = false;
    this.game.addEffectBoom(this.view.x, this.view.y);
    this.game.stopSfxKamikaze(this.timerCar);
    var r = MyMath.getRandomInt(1, 4);
    MainGame.Sfx.play("sound", "exposion" + r)
};
Enemy.prototype.getKamikaze = function() {
    if (!this.isAlive) return;
    this.timeLife = 0;
    this.health = 0;
    this.timeRemove = 1;
    this.isAlive = false;
    this.game.enemyKilled(this.type, true)
};
Enemy.prototype.setBeforeDead = function() {
    this.view.visible = false;
    this.playAnimation(this.animRun, true)
};
Enemy.prototype.setAfterDead = function() {
    this.game.enemies.release(this);
    this.active = false
};
Enemy.prototype.setForAttack = function() {
    if (!this.isAlive) return;
    this.isUnderAttack = false;
    this.health_adv = this.health
};
Enemy.prototype.getAdvanceDmg = function(damage) {
    this.health_adv -= damage;
    if (this.health_adv <= 0) {
        this.isUnderAttack = true
    }
};
Enemy.prototype.updateHpBarsPosition = function() {
    this.hpBars.bar1.x = this.x;
    this.hpBars.bar2.x = this.x
};
Enemy.prototype.updateHpBarsView = function() {
    var width = this.hpBars.bar1.width * (this.health / this.health_max);
    this.hpBars.bar_crop.width = width;
    this.hpBars.bar2.setCrop(this.hpBars.bar_crop)
};
Enemy.prototype.startAttack = function() {
    this.timeAttack = 40;
    this.isReachedWall = true;
    this.speed = 0;
    this.view.angle = 0;
    if (this.type == 1 || this.type == 101) {
        this.meleeAttack = 20;
        if (MyMath.getRandomBool()) {
            this.playAnimation("attack", true)
        } else {
            this.playAnimation("attack2", true)
        }
    } else if (this.type == 2 || this.type == 102) {
        this.timeAttack = this.reloading
    } else if (this.type == 3 || this.type == 103) {
        this.timeAttack = this.reloading
    } else if (this.type == 4 || this.type == 104) {
        this.meleeAttack = 20;
        this.playAnimation("attack3", true)
    } else if (this.type == 51) {
        this.timerCar = 1;
        this.stepAttack1 = true;
        this.stepAttack2 = true;
        this.stepAttack3 = true;
        this.stepAttack4 = true;
        this.playAnimation("car_open", false)
    } else if (this.type == 52) {
        this.timerCar = 1;
        this.stepAttack1 = true;
        this.stepAttack2 = true;
        this.stepAttack3 = true;
        this.stepAttack4 = true;
        this.playAnimation("car_idle2", true);
        this.view.skeleton.setAttachment("door", "door2")
    } else if (this.type == 53) {
        this.timerCar = 1;
        this.stepAttack1 = true;
        this.stepAttack2 = true;
        this.stepAttack3 = true;
        this.stepAttack4 = true;
        this.playAnimation("car_idle2", true);
        this.view.skeleton.setAttachment("door", "door3")
    } else if (this.type == 6) {
        this.timeAttack = 0;
        this.getKamikaze();
        this.game.showWallJelly();
        this.game.updateWallHp(this.damage);
        this.game.addEffectBoom(this.view.x, this.view.y);
        this.setAfterDead();
        var r = MyMath.getRandomInt(1, 4);
        MainGame.Sfx.play("sound", "exposion" + r)
    } else if (this.type == 7 || this.type == 107) {
        this.timeAttack = this.reloading * .7;
        this.playAnimation(this.animIdle, true)
    } else if (this.type == 8 || this.type == 108) {
        this.timeAttack = this.reloading * .7;
        this.playAnimation(this.animIdle, true)
    } else if (this.type == 110) {
        this.timeAttack = this.reloading
    } else if (this.type == 11 || this.type == 111) {
        this.timeAttack = this.reloading * .7;
        this.meleeAttack = 40;
        this.playAnimation(this.animIdle, true)
    }
};
Enemy.prototype.goAttack = function() {
    if (this.game.isGameOver) return;
    if (this.typeAttack == ATTACK_BULLET) {
        this.game.showWallJelly();
        this.game.updateWallHp(this.damage);
        this.playAnimation(this.animFire, false);
        var r = MyMath.getRandomInt(1, 4);
        MainGame.Sfx.play("sound", this.sfxFire + r)
    } else if (this.typeAttack == ATTACK_ROCKET) {
        this.game.launchEnemyBomb(1, this.weaponSkin, this.view.x, this.view.y, this.damage);
        this.reloading = 60 * 3;
        this.playAnimation(this.animFire, false)
    } else if (this.typeAttack == ATTACK_GRENADE) {
        this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
        this.reloading = 60 * 3;
        this.playAnimation(this.animFire, false);
        this.stepAttack1 = true;
        this.stepAttack2 = true
    } else if (this.typeAttack == ATTACK_HOOK) {
        this.playAnimation(this.animFire, false);
        this.stepAttack1 = true
    } else if (this.typeAttack == ATTACK_MELEE) {
        this.stepAttack1 = true
    }
};
Enemy.prototype.updateView = function() {
    this.x = this.view.x;
    this.y = this.view.y;
    this.updateHpBarsPosition();
    if (!this.view.visible && this.x > -30) {
        this.view.visible = true;
        this.hpBars.bar1.visible = true;
        this.hpBars.bar2.visible = true
    }
};
Enemy.prototype.update = function(time, delta) {
    if (this.timeRemove > 0 && this.active) {
        this.timeRemove++;
        if (this.timeRemove == 89) this.setBeforeDead();
        if (this.timeRemove == 90) this.setAfterDead()
    }
    if (!this.active || !this.isAlive) return;
    switch (this.status) {
        case STATUS_RUN:
            if (this.view.x < this.goalX) {
                this.view.x += this.speed * delta;
                this.updateView()
            } else {
                this.status = STATUS_ATTACK;
                this.startAttack()
            }
            break;
        case STATUS_ATTACK:
            this.timeAttack += this.ATTACK_ENEMY;
            if (this.timeAttack >= this.reloading) {
                this.timeAttack = 1;
                this.goAttack()
            }
            break
    }
    this.updateAdditional();
    this.updateLifeTime()
};
Enemy.prototype.updateLifeTime = function() {
    this.timeLife += 1
};
Enemy.prototype.updateNormal = function() {};
Enemy.prototype.updateMelee = function() {
    if (this.timeAttack == 0) return;
    if (this.timeAttack >= this.meleeAttack && this.stepAttack1) {
        this.game.showWallJelly();
        this.game.updateWallHp(this.damage);
        this.stepAttack1 = false;
        var r = MyMath.getRandomInt(1, 9);
        MainGame.Sfx.play("sound", "knock" + r)
    }
};
Enemy.prototype.updateBomber = function() {
    if (this.timeAttack == 0) return;
    if (this.timeAttack >= 42 && this.stepAttack1) {
        this.view.skeleton.setAttachment("gun", null);
        this.game.launchEnemyBomb(2, this.weaponSkin, this.view.x, this.view.y, this.damage);
        this.stepAttack1 = false
    } else if (this.timeAttack >= 68 && this.stepAttack2) {
        this.view.skeleton.setAttachment("gun", "gun_e" + this.weaponSkin);
        this.stepAttack2 = false
    }
};
Enemy.prototype.updateCar = function() {
    if (this.timerCar > 0) {
        this.timerCar += this.ATTACK_ENEMY;
        if (this.timerCar >= 30 && this.stepAttack1) {
            this.game.addMobFromCar(this.x + this.desantPos.x, this.y + this.desantPos.y + 0, 4, {
                desantSkin: this.desantSkin,
                timeLife: this.timeLife
            });
            this.stepAttack1 = false
        }
        if (this.timerCar >= 45 && this.stepAttack2) {
            this.game.addMobFromCar(this.x + this.desantPos.x, this.y + this.desantPos.y + 3, 4, {
                desantSkin: this.desantSkin,
                timeLife: this.timeLife
            });
            this.stepAttack2 = false
        }
        if (this.timerCar >= 60 && this.stepAttack3) {
            this.game.addMobFromCar(this.x + this.desantPos.x, this.y + this.desantPos.y + 6, 4, {
                desantSkin: this.desantSkin,
                timeLife: this.timeLife
            });
            this.stepAttack3 = false
        }
        if (this.timerCar >= 75 && this.stepAttack4) {
            this.game.addMobFromCar(this.x + this.desantPos.x, this.y + this.desantPos.y + 9, 4, {
                desantSkin: this.desantSkin,
                timeLife: this.timeLife
            });
            this.stepAttack4 = false
        }
    }
};
var MyMath = {
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    getRandomBool: function() {
        return Math.random() < .5 ? true : false
    },
    randomChance: function(vValue) {
        return Math.random() < vValue
    },
    randomChoice: function(list) {
        return list[Math.floor(Math.random() * list.length)]
    },
    shuffleArr: function(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o
    },
    distanceTwoPoints: function(x1, x2, y1, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return dx * dx + dy * dy
    },
    parseQuery: function(qstr) {
        var query = {};
        var a = qstr.substr(1).split("&");
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split("=");
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || "")
        }
        return query
    },
    weightedRandom: function(prob) {
        let i, sum = 0,
            r = Math.random();
        for (i in prob) {
            sum += prob[i];
            if (r <= sum) return i
        }
    },
    lerp: function(in_Src, in_Dst, in_Ratio) {
        return in_Src * (1 - in_Ratio) + in_Dst * in_Ratio
    },
    quad: function(a, b, c) {
        let sol = null;
        if (Math.abs(a) < 1e-6) {
            if (Math.abs(b) < 1e-6) {
                sol = Math.abs(c) < 1e-6 ? [0, 0] : null
            } else {
                sol = [-c / b, -c / b]
            }
        } else {
            let disc = b * b - 4 * a * c;
            if (disc >= 0) {
                disc = Math.sqrt(disc);
                a = 2 * a;
                sol = [(-b - disc) / a, (-b + disc) / a]
            }
        }
        return sol
    }
};
var config = {
    type: Phaser.AUTO,
    backgroundColor: 2302759,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        parent: "game-container",
        width: 1024,
        height: 640,
        max: {
            width: 1400,
            height: 1024
        }
    },
    plugins: {
        scene: [{
            key: "SpinePlugin",
            plugin: window.SpinePlugin,
            sceneKey: "spine"
        }]
    },
    scene: [Boot, Preloader, Game, GameGui]
};
const game = new Phaser.Game(config);
window.focus();