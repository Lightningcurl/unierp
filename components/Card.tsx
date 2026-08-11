type Props = {
    category?: string,
    children: React.ReactNode
}

const style:string = "bg-gray-900 border border-gray-600 rounded-md p-4"

export function Card ({category, children}:Props) {
    return (
    <div className={style}>
        {category && <p className="text-gray-500 mb-2">{category}</p>}
        <p className="bold text-white">{children}</p>
    </div>
    );
}