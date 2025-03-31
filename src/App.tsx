import { useState } from 'react';
import { Card } from './Card';
import { SearchBar } from './components/SearchBar';
import { VideoPlayer } from './components/VideoPlayer';
import { SearchResults } from './components/SearchResults';
import { YouTubeVideo, searchVideos } from './services/youtubeApi';

function App() {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleSearch = async (query: string) => {
        try {
            setError(null);
            setIsLoading(true);
            const results = await searchVideos(query);
            setVideos(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while searching');
            setVideos([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVideoSelect = (video: YouTubeVideo) => {
        setSelectedVideo(video);
        setIsPlaying(true);
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setSelectedVideo(null);
    };

    if (isPlaying && selectedVideo) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <VideoPlayer 
                            video={selectedVideo} 
                            onEnded={handleVideoEnd}
                        />
                    </Card>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <Card className="mb-8">
                    <h1 className="text-4xl font-bold text-blue-400 drop-shadow mb-6 text-center">
                        YouTube Song Search
                    </h1>
                    <SearchBar onSearch={handleSearch} />
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                </Card>

                <Card>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Search Results
                    </h2>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    ) : (
                        <SearchResults
                            videos={videos}
                            onVideoSelect={handleVideoSelect}
                        />
                    )}
                </Card>
            </div>
        </main>
    );
}

export default App;
