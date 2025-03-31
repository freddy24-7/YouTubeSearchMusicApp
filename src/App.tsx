import { useState } from 'react';
import { Card } from './Card';
import { SearchBar } from './components/SearchBar';
import { VideoPlayer } from './components/VideoPlayer';
import { SearchResults } from './components/SearchResults';
import { NavBar } from './components/NavBar';
import { YouTubeVideo, searchVideos } from './services/youtubeApi';
import { useTheme } from './context/ThemeContext';
import { usePlaylist } from './context/PlaylistContext';

type View = 'search' | 'playlist' | 'editList';

function App() {
    const { theme } = useTheme();
    const { playlist, removeFromPlaylist, clearPlaylist } = usePlaylist();
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentView, setCurrentView] = useState<View>('search');
    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
    const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);

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
        console.log('Video ended, current view:', currentView);
        console.log('Playlist length:', playlist.length);
        console.log('Current playlist index:', currentPlaylistIndex);
        
        if (currentView === 'playlist' && playlist.length > 0) {
            let nextIndex: number;
            
            if (isShuffleEnabled) {
                // Get a random index different from the current one
                do {
                    nextIndex = Math.floor(Math.random() * playlist.length);
                    console.log('Random number generated:', Math.random());
                    console.log('Calculated next index:', nextIndex);
                } while (playlist.length > 1 && nextIndex === currentPlaylistIndex);
                
                console.log('Final next index after shuffle:', nextIndex);
            } else {
                // Sequential playback
                nextIndex = (currentPlaylistIndex + 1) % playlist.length;
                console.log('Next index (sequential):', nextIndex);
            }
            
            // Update the playlist index first
            setCurrentPlaylistIndex(nextIndex);
            
            // Then update the video and start playing
            setSelectedVideo(playlist[nextIndex]);
            setIsPlaying(true);
        } else {
            console.log('Not in playlist mode or playlist is empty');
            setIsPlaying(false);
            setSelectedVideo(null);
        }
    };

    const handleHomeClick = () => {
        setIsPlaying(false);
        setSelectedVideo(null);
        setVideos([]);
        setError(null);
        setCurrentView('search');
        setCurrentPlaylistIndex(0);
    };

    const handlePlaylistClick = () => {
        if (playlist.length > 0) {
            setCurrentView('playlist');
            let initialIndex: number;
            
            if (isShuffleEnabled) {
                initialIndex = Math.floor(Math.random() * playlist.length);
                console.log('Initial random number:', Math.random());
                console.log('Initial playlist index (shuffle):', initialIndex);
            } else {
                initialIndex = 0;
                console.log('Initial playlist index (sequential):', initialIndex);
            }
            
            setCurrentPlaylistIndex(initialIndex);
            setSelectedVideo(playlist[initialIndex]);
            setIsPlaying(true);
        }
    };

    const handleEditListClick = () => {
        setCurrentView('editList');
    };

    const renderContent = () => {
        if (isPlaying && selectedVideo) {
            return (
                <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
                    <div className="max-w-4xl w-full">
                        <Card>
                            <VideoPlayer 
                                video={selectedVideo} 
                                onEnded={handleVideoEnd}
                            />
                        </Card>
                    </div>
                </div>
            );
        }

        if (currentView === 'editList') {
            return (
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={`text-2xl font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                Edit Playlist
                            </h2>
                            <button
                                onClick={clearPlaylist}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${
                                    theme === 'dark'
                                        ? 'bg-red-900 text-red-200 hover:bg-red-800'
                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                            >
                                Clear All
                            </button>
                        </div>
                        {playlist.length === 0 ? (
                            <p className={`text-center py-8 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                Your playlist is empty
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {playlist.map((video) => (
                                    <div
                                        key={video.id.videoId}
                                        className={`p-4 rounded-lg ${
                                            theme === 'dark'
                                                ? 'bg-gray-800'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={video.snippet.thumbnails.medium.url}
                                                alt={video.snippet.title}
                                                className="w-48 h-36 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className={`font-semibold mb-2 ${
                                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                    {video.snippet.title}
                                                </h3>
                                                <p className={`text-sm mb-2 ${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                                }`}>
                                                    {video.snippet.channelTitle}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => removeFromPlaylist(video.id.videoId)}
                                                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                                                            theme === 'dark'
                                                                ? 'bg-red-900 text-red-200 hover:bg-red-800'
                                                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                        }`}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            );
        }

        return (
            <div className="max-w-2xl mx-auto">
                <Card className="mb-8">
                    <h1 className={`text-4xl font-bold drop-shadow mb-6 text-center ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                        YouTube Song Search
                    </h1>
                    <SearchBar onSearch={handleSearch} />
                    {error && (
                        <div className={`mt-4 p-4 rounded-lg ${
                            theme === 'dark' 
                                ? 'bg-red-900 text-red-100' 
                                : 'bg-red-100 text-red-700'
                        }`}>
                            {error}
                        </div>
                    )}
                </Card>

                <Card>
                    <h2 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-gray-900' : 'text-gray-800'
                    }`}>
                        Search Results
                    </h2>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto ${
                                theme === 'dark' ? 'border-blue-500' : 'border-blue-600'
                            }`}></div>
                        </div>
                    ) : (
                        <SearchResults
                            videos={videos}
                            onVideoSelect={handleVideoSelect}
                        />
                    )}
                </Card>
            </div>
        );
    };

    return (
        <>
            <NavBar 
                onHomeClick={handleHomeClick}
                onPlaylistClick={handlePlaylistClick}
                onEditListClick={handleEditListClick}
                isShuffleEnabled={isShuffleEnabled}
                onShuffleToggle={() => setIsShuffleEnabled(!isShuffleEnabled)}
            />
            <main className={`min-h-screen p-8 pt-24 ${
                theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
            }`}>
                {renderContent()}
            </main>
        </>
    );
}

export default App;
