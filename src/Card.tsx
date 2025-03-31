import React from 'react'

type CardProps = {
    children: React.ReactNode
    className?: string
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div className={`bg-gray-200 rounded-2xl shadow-2xl p-10 max-w-2xl text-gray-900 ${className}`}>
            {children}
        </div>
    )
}
