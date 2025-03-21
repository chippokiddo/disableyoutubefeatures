// ==UserScript==
// @name         Remove YouTube Shorts
// @namespace    https://github.com/chippokiddo/removeyoutubeshorts
// @version      1.1.3
// @description  Hides and removes YouTube Shorts
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

    const SHORTS_SELECTORS = `
        ytd-rich-section-renderer,
        ytd-reel-shelf-renderer,
        ytd-reel-item-renderer,
        a[title="Shorts"],
        a[href="/shorts"],
        a[aria-label="Shorts"],
        ytd-grid-video-renderer[overlay-style="SHORTS"],
        ytm-rich-section-renderer,
        ytm-reel-shelf-renderer,
        ytm-reel-item-renderer
    `;

    const style = document.createElement('style');
    style.textContent = `${SHORTS_SELECTORS} { display: none !important; }`;
    if (document.head) {
        document.head.appendChild(style);
    }

    const removeShorts = () => {
        document.querySelectorAll(SHORTS_SELECTORS).forEach(el => el.remove());

        document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer').forEach(el => {
            const link = el.querySelector('a[href*="/shorts/"]');
            const thumb = el.querySelector('img[src*="shorts"]');
            const title = el.querySelector('#video-title');
            if (link || thumb || (title && title.textContent.toLowerCase().includes('shorts'))) {
                el.remove();
            }
        });
    };

    const observer = new MutationObserver(removeShorts);
    observer.observe(document.body, {childList: true, subtree: true});

    // Run once on load
    removeShorts();
})();
