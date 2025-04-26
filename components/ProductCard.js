// React元件 -> 輸出JSX(長得像HTML) 的函數

export default function ProductCard({ image, title, description }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(100,149,237,0.2)] hover:shadow-[0_8px_25px_rgba(147,112,219,0.3)] transition-all duration-300 hover:-translate-y-2">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
}