// ==UserScript==
// @name         Disable YouTube Ambience
// @namespace    https://github.com/chippokiddo/disableyoutubefeatures
// @version      1.0.0
// @description  Disables YouTube Ambient Mode
// @author       chip
// @license      MIT
// @match        *://www.youtube.com/*
// @match        *://m.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/chippokiddo/disableyoutubefeatures/main/Disable%20YouTube%20Ambience.user.js
// @downloadURL  https://raw.githubusercontent.com/chippokiddo/disableyoutubefeatures/main/Disable%20YouTube%20Ambience.user.js
// ==/UserScript==

(function () {
    'use strict';

    function removeAmbientCinematics() {
        const cinematics = document.getElementById('cinematics');
        if (cinematics) {
            cinematics.remove();
        }
    }

    function removeAmbientModeMenuItem() {
        const menuItems = document.querySelectorAll('.ytp-menuitem');

        menuItems.forEach(item => {
            const label = item.querySelector('.ytp-menuitem-label');
            if (label && label.textContent === 'Ambient mode') {
                item.remove();
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList && mutation.target.classList.contains('ytp-settings-menu')) {
                if (mutation.target.style.display !== 'none') {
                    removeAmbientModeMenuItem();
                }
            }
        });
    });

    const cinematicsObserver = new MutationObserver(() => {
        removeAmbientCinematics();
    });

    function setupObservers() {
        removeAmbientCinematics();

        const settingsMenu = document.querySelector('.ytp-settings-menu');
        if (settingsMenu) {
            observer.observe(settingsMenu, {
                attributes: true,
                attributeFilter: ['style']
            });
        }

        const playerContainer = document.querySelector('#movie_player');
        if (playerContainer) {
            cinematicsObserver.observe(playerContainer, {
                childList: true,
                subtree: true
            });
        }
    }

    window.addEventListener('yt-navigate-finish', setupObservers);
    window.addEventListener('DOMContentLoaded', setupObservers);

    setupObservers();
})();