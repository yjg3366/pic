// ==UserScript==
// @name Youtube Auto Quality
// @namespace https://github.com/zacyu/bilibili-helper
// @version 1.0
// @description Automatically set youtube video quality according to your preference
// @author zacyu
// @match https://www.youtube.com/*
// @grant none
// ==/UserScript==
(function() {
    'use strict';
    // Your preferred quality, can be one of the following:
    // 'highres', 'hd2880', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small'
    var quality = 'hd720';
    // The interval to check and set the quality, in milliseconds
    var interval = 1000;
    // The function to set the quality
    var setQuality = function() {
        var player = document.getElementById('movie_player');
        if (player) {
            var levels = player.getAvailableQualityLevels();
            if (levels.indexOf(quality) !== -1) {
                player.setPlaybackQualityRange(quality, quality);
            } else {
                console.log('The preferred quality is not available');
            }
        } else {
            console.log('The player is not loaded');
        }
    };
    // The function to check and set the quality periodically
    var checkQuality = function() {
        setInterval(setQuality, interval);
    };
    // The function to wait for the player to load and then check and set the quality
    var waitForPlayer = function() {
        var player = document.getElementById('movie_player');
        if (player) {
            checkQuality();
        } else {
            setTimeout(waitForPlayer, interval);
        }
    };
    // Start the script
    waitForPlayer();
}());