# 在開始撰寫代碼前

1. 根據專案結構思考該怎麼做
2. 說出一個功能的 CRUD
3. 先想好，但嚴格遵循指令
4. 將要記下的東西以 Markdown 或 Txt 格式記下

# 專案結構描述

此文件詳細描述了 `react-next-boilerplate` 專案的結構，以便於理解和記憶。

## 根目錄檔案

*   `eslint.config.mjs`: ESLint 設定檔，用於程式碼風格檢查與規範。
*   `jsconfig.json`: JavaScript/JSX 專案設定檔，主要用於路徑別名 (`paths`) 和編譯選項。
*   `next.config.mjs`: Next.js 主要設定檔，用於配置 Next.js 的行為，例如圖片優化、重新導向、環境變數等。
*   `package.json`: Node.js 專案描述檔，包含專案依賴套件 (`dependencies`, `devDependencies`)、腳本 (`scripts`) 和其他元數據。
*   `postcss.config.mjs`: PostCSS 設定檔，通常與 Tailwind CSS 一起使用，用於處理 CSS。
*   `ProjectStructure.md`: (此檔案) 專案結構的詳細描述。
*   `README.md`: 專案的說明文件，包含專案介紹、安裝、使用方法等。
*   `tailwind.config.mjs`: Tailwind CSS 設定檔，用於自訂 Tailwind 的主題、變體和插件。

## `app/` 目錄 (Next.js App Router)

此目錄是 Next.js 13+ App Router 的核心，用於定義應用程式的路由和頁面。

*   `favicon.ico`: 網站的圖示，顯示在瀏覽器標籤頁上。
*   `globals.css`: 全域 CSS 樣式檔，會應用於整個應用程式。通常用於設定基礎樣式或引入 CSS 框架。
*   `layout.js`: 根佈局元件。所有頁面都會共享這個佈局，通常包含 `<html>` 和 `<body>` 標籤，以及共用的 UI 元素 (如導覽列、頁腳)。
*   `page.js`: 根路由 ( `/` ) 的頁面元件，即應用程式的首頁。

### `app/` 子目錄 (路由)

每個子目錄代表一個路由區段。目錄內的 `page.js` 檔案定義了該路由的 UI。

*   `about/page.js`: `/about` 路由的頁面元件。
*   `admin/page.js`: `/admin` 路由的頁面元件。
*   `api/`: API 路由目錄。此目錄下的檔案 (例如 `route.js`) 用於建立後端 API 端點。
    *   `check-admin/route.js`: 用於檢查提供的 Email 是否為管理員的 API 端點。
*   `faq/page.js`: `/faq` 路由的頁面元件。
*   `login/page.js`: `/login` 路由的頁面元件。

## `components/` 目錄

存放可重用的 React UI 元件。

*   `NavBar.js`: 導覽列元件。
*   `ProductCard.js`: 產品卡片元件。
*   `Welcome.js`: 歡迎訊息元件。
*   `Welcome.module.css`: `Welcome.js` 元件專用的 CSS Module 樣式檔。

## `config/` 目錄

存放專案的設定檔 (除了根目錄的標準設定檔外)。目前為空，可視需求增加。

## `public/` 目錄

存放靜態資源，這些資源會被直接部署在網站的根目錄下，可以透過 `/` 路徑直接存取。

*   `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`: SVG 圖示檔案。
*   `images/`: 存放圖片檔案的子目錄。
    *   `001.png` - `010.png`: 專案使用的 PNG 圖片。

## `services/` 目錄

存放與外部服務互動或執行特定業務邏輯的模組。

*   `firebase.js`: 用於設定和初始化 Firebase 服務，或包含與 Firebase 互動的相關函式。

## `.env` 環境變數

* `NEXT_PUBLIC_ADMIN_EMAIL`: 儲存管理員 Email 用於認證
* `NEXT_PUBLIC_FIREBASE_API_KEY`: 儲存 Firebase Firestore API Key