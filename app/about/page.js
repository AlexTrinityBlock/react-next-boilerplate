// 一個頁面必須要是一個React元件
// 1. 必須是一個JavaScript函式
// 2. 必須要輸出JSX(長得像HTML)
import Link from 'next/link'

export default function About() {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-12 about-container">
                <h1 className="text-4xl font-bold mb-6 text-center border-b-4 border-blue-500 pb-4 inline-block">關於本站</h1>

                <div className="text-center mb-12">
                    <Link
                        href="/"
                        className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        ← 回到首頁
                    </Link>
                </div>

                <section className="mb-12 bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-500">網站簡介</h2>
                    <p className="mb-4 leading-relaxed text-lg">
                        歡迎來到我們的網站！這是一個致力於提供優質內容和服務的平台。
                        我們希望能夠透過這個網站，為使用者帶來更好的體驗和價值。
                    </p>
                </section>

                <section className="mb-12 bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-500">我們的使命</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            提供高品質的服務與內容
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            持續創新與改進
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            建立良好的使用者體驗
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            打造一個友善的社群環境
                        </li>
                    </ul>
                </section>

                <section className="mb-12 bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-500">團隊介紹</h2>
                    <p className="mb-4 leading-relaxed text-lg">
                        我們是一群充滿熱情的專業人士，擁有豐富的經驗和專業知識。
                        團隊成員來自不同領域，各自專長互補，共同為提供最佳服務而努力。
                    </p>
                </section>

                <section className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-500">聯絡資訊</h2>
                    <div className="contact-info space-y-4">
                        <p className="flex items-center text-lg">
                            <span className="text-blue-500 mr-3">📧</span>
                            <span className="font-medium">Email:</span>
                            <span className="ml-2">contact@example.com</span>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="text-blue-500 mr-3">📱</span>
                            <span className="font-medium">電話:</span>
                            <span className="ml-2">(02) 1234-5678</span>
                        </p>
                        <p className="flex items-center text-lg">
                            <span className="text-blue-500 mr-3">📍</span>
                            <span className="font-medium">地址:</span>
                            <span className="ml-2">台北市信義區信義路五段7號</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}