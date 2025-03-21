// ==UserScript==
// @name         Remove YouTube Shorts
// @namespace    https://github.com/chippokiddo/removeyoutubeshorts
// @version      1.2.0
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
        ytm-reel-item-renderer,
        ytm-pivot-bar-item-renderer[tab-identifier="shorts"]
    `;

    const style = document.createElement('style');
    style.textContent = `${SHORTS_SELECTORS} { display: none !important; }
        a[href="/shorts"] { display: none !important; }
        a[href*="/shorts/"] { display: none !important; }`;
    if (document.head) {
        document.head.appendChild(style);
    }

    const isShort = (el) => {
        const hrefMatch = el.querySelector('a[href*="/shorts/"]');
        const overlay = el.getAttribute('overlay-style') === 'SHORTS';
        const data = el.innerHTML.toLowerCase();
        return !!(hrefMatch || overlay || data.includes('/shorts/') || data.includes('shorts'));
    };

    const removeShorts = () => {
        document.querySelectorAll(SHORTS_SELECTORS).forEach(el => el.remove());

        const candidates = document.querySelectorAll('ytd-video-renderer,ytd-grid-video-renderer,ytd-compact-video-renderer,ytm-compact-video-renderer,ytm-video-with-context-renderer,ytm-video-list-video-renderer');

        candidates.forEach(el => {
            if (isShort(el)) {
                el.remove();
            }
        });

        const mobileTabs = document.querySelectorAll('ytm-pivot-bar-item-renderer');
        mobileTabs.forEach(tab => {
            const label = tab.innerText.toLowerCase();
            const link = tab.querySelector('a[href*="/shorts"]');
            if (label.includes('shorts') || link) {
                tab.remove();
            }
        });
    };

    const observer = new MutationObserver(removeShorts);
    observer.observe(document.body, {childList: true, subtree: true});

    removeShorts();

    let lastCheck = Date.now();
    const loop = () => {
        const now = Date.now();
        if (now - lastCheck > 1500) {
            removeShorts();
            lastCheck = now;
        }
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
})();
