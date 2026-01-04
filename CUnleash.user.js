// ==UserScript==
// @name         CUnleash Custom Version
// @namespace    http://tampermonkey.net/
// @version      7.4.2-C
// @description  Unleash your cookie potential.
// @author       petar105, n0eL1405
// @match        https://orteil.dashnet.org/cookieclicker/
// @icon         https://www.google.com/s2/favicons?domain=dashnet.org
// @grant        none
// ==/UserScript==


// If editing the script, ignore any "Game is not defined" warnings
// Script is a mix of original code and other addons

function tapNews() { if (Game.TickerEffect && Game.TickerEffect.type == 'fortune') { Game.tickerL.click(); } }

setInterval(function () { tapNews(); }, 3000);
(function() {
    'use strict';

    let state = true; // initial state is ON
    let intervalId;

    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyX') {
            state = !state; // toggle state
            if (state) {
                // code to run when state is ON
                console.log('State is ON');
                startAutoClicker();
            } else {
                // code to run when state is OFF
                console.log('State is OFF');
                stopAutoClicker();
            }
        }
    });

    function startAutoClicker() {
        console.log('Auto-clicker started');
        Game.Notify(`Auto clicker ON`,`Press X to toggle`,[0,35],false);
        intervalId = setInterval(function() { Game.ClickCookie(); }, 4);
    }

    function stopAutoClicker() {
        console.log('Auto-clicker stopped');
        Game.Notify(`Auto clicker OFF`,`Press X to toggle`,[0,35],false);
        clearInterval(intervalId);
    }

    // Wait for the Game object to be defined, then start the auto-clicker
    const waitIntervalId = setInterval(function() {
        if (typeof Game !== 'undefined') {
            clearInterval(waitIntervalId);
            startAutoClicker();
        }
    }, 1000);
})();


setInterval(function() {
    Game.shimmers.forEach(function(shimmer)
    {
        if(shimmer.type == "golden" && shimmer.wrath == 0)
        {
            shimmer.pop()
        }
    })
}, 500);

var autoReindeer = setInterval(function() { for (var h in Game.shimmers){if(Game.shimmers[h].type=="reindeer"){Game.shimmers[h].pop();}} }, 100);



var autoPopTwelveth = setInterval(function() {
    var wrinkCount = 0,
        wrinkEaten = 0,
        wrinkIndex = 10; // value for 10 shinies test

    for (var i in Game.wrinklers) {
        // count number of eating wrinks
        if (Game.wrinklers[i].sucked > 0) {
            wrinkCount += 1;
        }
        // find top wrink index, ignoring shiny wrinklers
        if (Game.wrinklers[i].sucked > wrinkEaten && Game.wrinklers[i].type == 0) {
            wrinkEaten = Game.wrinklers[i].sucked;
            wrinkIndex = i;
        }
    }
    // pop top wrinkler if 10 eating, unless all 12 are shiny
    if (wrinkCount == 10 && wrinkIndex != 10) {
        Game.wrinklers[wrinkIndex].hp = 0;
    }
}, 60000);

const timeout = 400;

setTimeout(function () {
    Game.LoadMod("https://klattmose.github.io/CookieClicker/SteamMods/CCSE/main.js")
}, timeout);

setTimeout(function() {
    Game.LoadMod("https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js");
}, timeout*2); // Don't load Cookie Monster parallel with the game, CM loads but the game gets stuck

setTimeout(function() {
    Game.LoadMod("https://rawgit.com/yannprada/cookie-garden-helper/master/cookie-garden-helper.js");
}, timeout*3); // Same goes for Cookie Garden Helper

setTimeout(function() {
    Game.LoadMod("https://raw.githubusercontent.com/n0eL1405/CookieClickerScripts/refs/heads/main/CookieStocker.js");
}, timeout*4);