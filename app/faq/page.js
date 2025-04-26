import Link from 'next/link'

export default function FAQ() {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-6 text-center border-b-4 border-[#FF5733] pb-4 inline-block">常見問題</h1>

                <div className="text-center mb-12">
                    <Link
                        href="/"
                        className="inline-block px-6 py-2 bg-[#FF5733] text-white rounded-lg hover:bg-[#E64A2E] transition-colors duration-300"
                    >
                        ← 回到首頁
                    </Link>
                </div>
            </div>
        </div>
    )
} 