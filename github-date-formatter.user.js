// ==UserScript==
// @name         GitHub Date Formatter
// @name:zh-CN   GitHub 日期时间格式优化
// @namespace    https://github.com/abevol/github-date-formatter
// @version      0.0.0
// @description  A userscript to convert GitHub's relative timestamps and commit dates into standard local datetime formats.
// @description:zh-CN 将 GitHub 网页中的相对时间与英文日期统一转换为直观易读的本地标准日期格式。
// @author       Abevol
// @match        https://github.com/*
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 格式化函数：仅输出 YYYY-MM-DD hh:mm:ss，不要时区后缀
    function formatLocalTimeNoZone(isoString) {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return null;

        const pad = (num) => String(num).padStart(2, '0');

        const YYYY = date.getFullYear();
        const MM = pad(date.getMonth() + 1);
        const DD = pad(date.getDate());
        const hh = pad(date.getHours());
        const mm = pad(date.getMinutes());
        const ss = pad(date.getSeconds());

        return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    }

    // 格式化函数：仅输出标题所需的 YYYY-MM-DD
    function formatPureDate(dateText) {
        if (!dateText) return null;
        const pad = (num) => String(num).padStart(2, '0');

        // 1. 中文/带分隔符的年月日格式匹配 (例如 2026年9月1日 / 2026-09-01)
        const matchYMD = dateText.match(/(\d{4})[年\-\/.]\s*(\d{1,2})[月\-\/.]\s*(\d{1,2})/);
        if (matchYMD) {
            return `${matchYMD[1]}-${pad(matchYMD[2])}-${pad(matchYMD[3])}`;
        }

        // 2. 英文形式 "Commits on Month DD, YYYY" / "Commits on DD Month YYYY"
        const cleanText = dateText.replace(/Commits\s+on\s+/i, '').trim();
        const date = new Date(cleanText);
        if (!isNaN(date.getTime())) {
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        }

        return null;
    }

    function cleanGitHubContent() {
        // --- 1. 处理时间戳标签 ---
        const timeElements = document.querySelectorAll('relative-time, time-ago, local-time');
        timeElements.forEach(el => {
            if (el.getAttribute('data-time-fixed') === 'true') return;

            const isoStr = el.getAttribute('datetime');
            if (isoStr) {
                const formatted = formatLocalTimeNoZone(isoStr);
                if (formatted) {
                    const newSpan = document.createElement('span');
                    if (el.hasAttributes()) {
                        for (const attr of el.attributes) {
                            if (attr.name !== 'datetime' && attr.name !== 'prefix') {
                                newSpan.setAttribute(attr.name, attr.value);
                            }
                        }
                    }
                    newSpan.textContent = formatted;
                    newSpan.setAttribute('data-time-fixed', 'true');
                    el.parentNode.replaceChild(newSpan, el);
                }
            }
        });

        // --- 2. 处理 Commit 分组标题 ---
        const commitTitles = document.querySelectorAll('[data-testid="commit-group-title"], .commit-group-title');
        commitTitles.forEach(titleEl => {
            const originalText = titleEl.textContent ? titleEl.textContent.trim() : '';
            if (!originalText || /^\d{4}-\d{2}-\d{2}$/.test(originalText)) return;

            const cleanDate = formatPureDate(originalText);
            if (cleanDate && cleanDate !== originalText) {
                titleEl.textContent = cleanDate;
            }
        });
    }

    // 刚进入页面时跑一次
    cleanGitHubContent();

    // 持续监听单页应用的动态加载，随时清洗新蹦出来的节点
    const observer = new MutationObserver(cleanGitHubContent);
    observer.observe(document.body, { childList: true, subtree: true });
})();