function App() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10 text-gray-800">
            <div className="max-w-2xl w-full text-center space-y-6">
                <h1 className="text-4xl font-bold text-blue-600">Vite + React + TypeScript</h1>
                <p className="text-lg text-gray-600">
                    🚀 A modern starter template bundled with everything you need:
                </p>

                <ul className="text-left list-disc list-inside text-base space-y-2">
                    <li>
                        <span className="font-semibold text-blue-500">Vite</span> – Lightning-fast
                        development build tool
                    </li>
                    <li>
                        <span className="font-semibold text-blue-500">React 19</span> – Declarative,
                        efficient UI library
                    </li>
                    <li>
                        <span className="font-semibold text-blue-500">TypeScript</span> – Static typing
                        for better DX
                    </li>
                    <li>
                        <span className="font-semibold text-blue-500">Tailwind CSS</span> – Utility-first
                        CSS for rapid styling
                    </li>
                    <li>
                        <span className="font-semibold text-blue-500">ESLint + Prettier</span> – For code
                        quality and formatting
                    </li>
                </ul>

                <div className="pt-6">
                    <p className="text-sm text-gray-500">
                        Edit <code className="bg-gray-100 px-1 py-0.5 rounded">src/App.tsx</code> to get
                        started!
                    </p>
                </div>

                <div className="pt-6">
                    <a
                        href="https://vitejs.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Learn More about Vite
                    </a>
                </div>
            </div>
        </main>
    )
}

export default App
