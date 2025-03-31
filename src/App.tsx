import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { useTheme } from './context/ThemeContext';
import { usePlaylist } from './context/PlaylistContext';
import SearchArea from './components/SearchArea';
import VideoPlayerContainer from './components/VideoPlayerContainer';
import PlaylistEditor from './components/PlayListEditor';
import Info from './components/Info';
import { YouTubeVideo } from './services/youtubeApi';

type View = 'search' | 'playlist' | 'editList' | 'info';

function App() {
  const { theme } = useTheme();
  const { playlist, clearPlaylist } = usePlaylist();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState<View>('search');
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);

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
      const initialIndex: number = isShuffleEnabled
        ? Math.floor(Math.random() * playlist.length)
        : 0;
      setCurrentPlaylistIndex(initialIndex);
      setSelectedVideo(playlist[initialIndex]);
      setIsPlaying(true);
    }
  };

  const handleEditListClick = () => {
    setCurrentView('editList');
  };

  const handleInfoClick = () => {
    setIsPlaying(false);
    setSelectedVideo(null);
    setCurrentView('info');
  };

  return (
    <>
      <NavBar
        onHomeClick={handleHomeClick}
        onPlaylistClick={handlePlaylistClick}
        onEditListClick={handleEditListClick}
        onInfoClick={handleInfoClick}
        isShuffleEnabled={isShuffleEnabled}
        onShuffleToggle={() => setIsShuffleEnabled(!isShuffleEnabled)}
        isPlaying={isPlaying}
      />
      <main
        className={`min-h-screen p-8 pt-24 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
        }`}
      >
        {isPlaying && selectedVideo ? (
          <VideoPlayerContainer
            video={selectedVideo}
            playlist={playlist}
            currentPlaylistIndex={currentPlaylistIndex}
            setCurrentPlaylistIndex={setCurrentPlaylistIndex}
            setSelectedVideo={setSelectedVideo}
            setIsPlaying={setIsPlaying}
            isShuffleEnabled={isShuffleEnabled}
            currentView={currentView}
          />
        ) : currentView === 'editList' ? (
          <PlaylistEditor playlist={playlist} clearPlaylist={clearPlaylist} />
        ) : currentView === 'info' ? (
          <Info />
        ) : (
          <SearchArea
            videos={videos}
            setVideos={setVideos}
            setError={setError}
            error={error}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onVideoSelect={(video: YouTubeVideo) => {
              setSelectedVideo(video);
              setIsPlaying(true);
            }}
          />
        )}
      </main>
    </>
  );
}

export default App;
