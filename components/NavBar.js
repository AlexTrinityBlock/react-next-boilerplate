'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { auth } from '../services/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function NavBar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAdminCheck, setLoadingAdminCheck] = useState(false); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAdmin(false); // Reset admin status on auth change

      if (currentUser) {
        setLoadingAdminCheck(true);
        try {
          const response = await fetch('/api/check-admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: currentUser.email }),
          });

          if (!response.ok) {
            console.error('Failed to check admin status:', response.statusText);
            setIsAdmin(false); // Explicitly set isAdmin to false on non-OK response
            // Handle non-OK responses if needed
          } else {
            const data = await response.json();
            setIsAdmin(data.isAdmin);
          }
        } catch (error) {
          console.error('Error calling check-admin API:', error);
          setIsAdmin(false); // Explicitly set isAdmin to false on fetch error
        } finally {
          setLoadingAdminCheck(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // 登出後 onAuthStateChanged 會觸發，自動更新 user 和 isAdmin state
    } catch (error) {
      console.error("登出時發生錯誤:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-[1000]">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold hover:text-gray-300">
        John Doe
      </Link>

      {/* 右側導覽 */}
      <div className="space-x-4 flex items-center">
        {/* 一般連結 */}
        <Link href="/about" className="hover:text-gray-300">
          關於本站
        </Link>
        <Link href="/faq" className="hover:text-gray-300">
          常見問題
        </Link>

        {/* 登入/登出/管理區塊 */}
        {user ? (
          <>
            {/* Show loading indicator while checking admin status */}
            {loadingAdminCheck ? (
              <span className="text-sm text-gray-400">檢查權限中...</span>
            ) : (
              isAdmin && (
                <Link
                  href="/admin"
                  className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                >
                  管理後台
                </Link>
              )
            )}
            <span className="text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition-colors"
            >
              登出
            </button>
          </>
        ) : (
          <Link
            href="/login" // Changed href from /admin-login to /login
            className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            登入 {/* Changed text from 登入管理後台 to 登入 */}
          </Link>
        )}
      </div>
    </nav>
  );
}



