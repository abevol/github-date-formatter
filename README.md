<div align="center">

# GitHub Date Formatter

A userscript to convert GitHub's relative timestamps and commit dates into intuitive, standardized local datetime formats.

将 GitHub 网页中的相对时间与英文日期统一转换为直观易读的本地标准日期格式的用户脚本。

---

[English](#english) | [简体中文](#简体中文)

---

</div>

<a id="english"></a>

## English

### Introduction

GitHub displays timestamps using relative descriptions (such as "2 hours ago" or "3 days ago") and formats commit history headers with localized English strings (e.g., "Commits on May 22, 2026"). This userscript normalizes these strings across the interface into precise, standardized local datetime formats for enhanced readability and traceability.

### Features

- **Standardized Timestamps**: Converts relative time tags to `YYYY-MM-DD HH:mm:ss`.
- **Simplified Commit Headers**: Simplifies commit group headers from `Commits on Month DD, YYYY` to `YYYY-MM-DD`.
- **Dynamic Content Support**: Monitors dynamic DOM changes (SPA / PJAX navigations) via `MutationObserver` without needing manual page refreshes.
- **Native Replacement**: Replaces custom Web Components with lightweight standard elements to prevent periodic overwrites.

### Installation

1. First, install a userscript manager extension for your browser:
   - [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
   - [Violentmonkey](https://violentmonkey.github.io/)
2. Click the link below to install the script directly:
   - **[Install from GitHub Raw](https://raw.githubusercontent.com/abevol/github-date-formatter/main/github-date-formatter.user.js)**
   - **[Install from GitHub Release](https://github.com/abevol/github-date-formatter/releases/latest/download/github-date-formatter.user.js)**
   - **[Install from Greasy Fork](https://greasyfork.org/)** *(Add your script link here)*

### License

This project is licensed under the [MIT License](LICENSE).

---

<a id="简体中文"></a>

## 简体中文

### 简介

GitHub 默认使用模糊的相对时间（例如“2 小时前”、“3 天前”）展示时间戳，并在提交历史中使用英文语序的日期分组标题（例如 "Commits on May 22, 2026"）。该用户脚本将全站相关时间元素统一转换为规范、精准的本地绝对日期与时间格式，提升查看与回溯效率。

### 功能特性

- **时间戳标准化**：将相对时间统一转换为 `YYYY-MM-DD HH:mm:ss` 格式。
- **提交标题精简**：将 `Commits on Month DD, YYYY` 分组标题精简为 `YYYY-MM-DD` 纯日期格式。
- **无刷新页面适配**：基于 `MutationObserver` 监听 DOM 树变化，无缝兼容单页应用（SPA）与动态加载。
- **原生元素替换**：通过替换自定义 Web Components，彻底防止 GitHub 内部定时器覆盖文本。

### 安装方式

1. 首先为你的浏览器安装一款用户脚本管理器扩展：
   - [Tampermonkey (油猴)](https://www.tampermonkey.net/)（推荐）
   - [Violentmonkey (暴力猴)](https://violentmonkey.github.io/)
2. 点击下方链接直接安装本脚本：
   - **[从 GitHub Raw 安装](https://raw.githubusercontent.com/abevol/github-date-formatter/main/github-date-formatter.user.js)**
   - **[从 GitHub Release 安装](https://github.com/abevol/github-date-formatter/releases/latest/download/github-date-formatter.user.js)**
   - **[从 Greasy Fork 安装](https://greasyfork.org/)** *(可在此替换为你的 Greasy Fork 脚本主页)*

### 开源协议

本项目采用 [MIT 许可证](LICENSE)。
