'use client'
import { useState, useEffect } from 'react'
import { auth, db } from "@/services/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import ProductCard from '@/components/ProductCard'

export default function AdminPage() {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: ''
    })
    const [activeTab, setActiveTab] = useState('projects')
    const [projects, setProjects] = useState([])
    const [editingProject, setEditingProject] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])

    const handleSignOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('登出失敗:', error)
            alert('登出失敗')
        }
    }

    // 獲取所有作品
    const fetchProjects = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "project-list"))
            const projectsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProjects(projectsData)
        } catch (error) {
            console.error("Error fetching projects:", error)
            alert('獲取作品列表失敗')
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const projectData = {
                ...formData,
                createdAt: serverTimestamp()
            }

            if (editingProject) {
                // 更新現有作品
                await updateDoc(doc(db, "project-list", editingProject.id), projectData)
                alert('作品更新成功！')
            } else {
                // 新增作品
                await addDoc(collection(db, "project-list"), projectData)
                alert('作品新增成功！')
            }

            setFormData({ title: '', image: '', description: '' })
            setEditingProject(null)
            fetchProjects()
        } catch (error) {
            alert(`操作失敗：${error.message}`)
        }
    }

    const handleEdit = (project) => {
        setEditingProject(project)
        setFormData({
            title: project.title,
            image: project.image,
            description: project.description
        })
    }

    const handleDelete = async (projectId) => {
        if (window.confirm('確定要刪除這個作品嗎？')) {
            try {
                await deleteDoc(doc(db, "project-list", projectId))
                alert('作品刪除成功！')
                fetchProjects()
            } catch (error) {
                alert(`刪除失敗：${error.message}`)
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // 渲染內容區域
    const renderContent = () => {
        switch (activeTab) {
            case 'projects':
                return (
                    <div className="space-y-8">
                        {/* 表單區域 */}
                        <div className="w-1/3">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {editingProject ? '編輯作品' : '新增作品'}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            標題
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                            圖片連結
                                        </label>
                                        <input
                                            type="text"
                                            id="image"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                            敘述
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={4}
                                            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                        >
                                            {editingProject ? '更新作品' : '新增作品'}
                                        </button>
                                        {editingProject && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingProject(null)
                                                    setFormData({ title: '', image: '', description: '' })
                                                }}
                                                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                            >
                                                取消編輯
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* 作品列表區域 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">現有作品清單</h2>
                            <div className="grid grid-cols-3 gap-6">
                                {projects.map(project => (
                                    <ProductCard
                                        key={project.id}
                                        {...project}
                                        isAdmin={true}
                                        onEdit={() => handleEdit(project)}
                                        onDelete={() => handleDelete(project.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            case 'qa':
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">問答管理</h2>
                        <p className="text-gray-600">問答管理內容區域</p>
                    </div>
                )
            case 'messages':
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">收件管理</h2>
                        <p className="text-gray-600">收件管理內容區域</p>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Auth Status Bar */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="text-gray-700">
                        {user ? (
                            <span>目前登入帳號：{user.email}</span>
                        ) : (
                            <span>目前尚未登入</span>
                        )}
                    </div>
                    {user && (
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            登出
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 p-6">
                {/* 左側選單 */}
                <div className="col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`w-full text-left px-4 py-2 rounded-full transition-colors ${activeTab === 'projects'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            作品管理
                        </button>
                        <button
                            onClick={() => setActiveTab('qa')}
                            className={`w-full text-left px-4 py-2 rounded-full transition-colors ${activeTab === 'qa'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            問答管理
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`w-full text-left px-4 py-2 rounded-full transition-colors ${activeTab === 'messages'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            收件管理
                        </button>
                    </div>
                </div>

                {/* 右側內容區 */}
                <div className="col-span-3">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
