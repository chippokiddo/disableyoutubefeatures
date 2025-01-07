// ==UserScript==
// @name         Remove YouTube Shorts
// @namespace    https://github.com/chippokiddo/removeyoutubeshorts
// @version      1.0.0
// @description  Hides YouTube Shorts from the home page and sidebar on desktop and the home page on mobile
// @author       chip
// @license      MIT
// @match        *://www.youtube.com/*
// @match        *://m.youtube.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/chippokiddo/removeyoutubeshorts/main/Remove%20YouTube%20Shorts.user.js
// @downloadURL  https://raw.githubusercontent.com/chippokiddo/removeyoutubeshorts/main/Remove%20YouTube%20Shorts.user.js
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        ytd-rich-section-renderer,
        ytd-reel-shelf-renderer,
        ytd-reel-item-renderer,
        a[title="Shorts"],
        ytd-grid-video-renderer[overlay-style="SHORTS"],
        ytm-rich-section-renderer,
        ytm-reel-shelf-renderer,
        ytm-reel-item-renderer,
        a[href="/shorts"] {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    const observer = new MutationObserver(() => {
        document.querySelectorAll(`
            ytd-rich-section-renderer,
            ytd-reel-shelf-renderer,
            ytd-reel-item-renderer,
            a[title="Shorts"],
            ytd-grid-video-renderer[overlay-style="SHORTS"],
            ytm-rich-section-renderer,
            ytm-reel-shelf-renderer,
            ytm-reel-item-renderer,
            a[href="/shorts"]
        `).forEach(el => el.remove());
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
