type Props = {
    message: React.ReactNode,
    description?: string
}

export function EmptyState ({message, description}:Props) {
    return (
        <div className="bg-gray-900 rounded-md border border-gray-600 p-6 text-center">
            <p className="font-bold text-white">{message}</p>
            {description && <p className="text-gray-400 text-sm">{description}</p>}
        </div>
    )
}

