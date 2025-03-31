import { Card } from './Card.tsx'

function App() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center font-sans">
            <Card>
                <h1 className="text-4xl font-bold text-blue-400 drop-shadow mb-4">
                    Vite + React + TypeScript
                </h1>

                <p className="text-lg text-gray-700 mb-4">
                    🚀 A modern starter template bundled with everything you need:
                </p>

                <ul className="list-disc list-inside space-y-2 text-left text-gray-700 mb-6">
                    <li>
                        <span className="font-semibold text-blue-300">Vite</span> – Lightning-fast dev build tool
                    </li>
                    <li>
                        <span className="font-semibold text-blue-300">React 19</span> – Modern concurrent UI library
                    </li>
                    <li>
                        <span className="font-semibold text-blue-300">TypeScript</span> – Type-safe development
                    </li>
                    <li>
                        <span className="font-semibold text-blue-300">Tailwind CSS</span> – Utility-first styling
                    </li>
                    <li>
                        <span className="font-semibold text-blue-300">ESLint + Prettier</span> – Code quality tools
                    </li>
                </ul>

                <p className="text-sm text-gray-600 mb-4">
                    Edit{' '}
                    <code className="bg-gray-300 text-gray-900 px-1 py-0.5 rounded">
                        src/App.tsx
                    </code>{' '}
                    to get started!
                </p>

                <a
                    href="https://vitejs.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                    Learn More about Vite
                </a>
            </Card>
        </main>
    )
}

export default App
