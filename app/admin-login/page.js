"use client"

import { auth } from "@/services/firebase"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
                alert("管理員登入成功！")
                router.push("/admin")
            } else {
                // 如果不是管理員，登出並導向首頁
                await auth.signOut()
                alert("此帳號沒有管理員權限")
                router.push("/")
            }
        } catch (error) {
            let errorMessage = "登入失敗"
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "無效的電子郵件格式"
                    break
                case 'auth/user-not-found':
                    errorMessage = "找不到此使用者"
                    break
                case 'auth/wrong-password':
                    errorMessage = "密碼錯誤"
                    break
                default:
                    errorMessage = `登入失敗：${error.message}`
            }
            alert(errorMessage)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 mt-[-10vh]">
                <h1 className="text-2xl font-bold text-center mb-2">登入</h1>
                <p className="text-gray-600 text-sm text-center mb-6">
                    請使用管理員帳號登入以存取管理後台
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <p className="text-blue-800 text-sm">
                        提醒：此登入頁面僅供管理員使用。如果您是一般訪客，請直接瀏覽網站內容。
                    </p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            電子郵件
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            密碼
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2.5 px-4"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-base mt-6"
                    >
                        登入
                    </button>
                </form>
            </div>
        </div>
    )
}