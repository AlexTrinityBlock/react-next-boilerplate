"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                // 檢查是否為管理者
                setIsAdmin(user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-[1000]">
            <Link href="/" className="text-xl font-bold hover:text-gray-300">
                John Doe
            </Link>
            <div className="space-x-6 flex items-center">
                <Link href="/about" className="hover:text-gray-300">
                    關於本站
                </Link>
                <Link href="/faq" className="hover:text-gray-300">
                    常見問題
                </Link>
                {user ? (
                    <>
                        <span className="text-gray-300">{user.email}</span>
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="ml-6 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                            >
                                管理後台
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="ml-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            登出
                        </button>
                    </>
                ) : (
                    <Link
                        href="/admin-login"
                        className="ml-6 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                    >
                        登入
                    </Link>
                )}
            </div>
        </nav>
    )
}