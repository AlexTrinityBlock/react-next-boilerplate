'use client'
import { useState } from 'react'

export default function AdminPage() {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Handle form submission
        console.log('Form submitted:', formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">新增作品</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* 標題欄位 */}
                        <div>
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                                標題
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        {/* 圖片連結欄位 */}
                        <div>
                            <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">
                                圖片連結
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        {/* 敘述欄位 */}
                        <div>
                            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                                敘述
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                className="mt-1 block w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        {/* 送出按鈕 */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                新增作品
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
