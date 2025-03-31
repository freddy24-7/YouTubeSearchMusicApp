import React from "react";

type CardProps = {
    children: React.ReactNode
}

export function Card({ children }: CardProps) {
    return (
        <div className="bg-gray-200 rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-gray-900">
            {children}
        </div>
    )
}
