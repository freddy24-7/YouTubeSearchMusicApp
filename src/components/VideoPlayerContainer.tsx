import { Card } from '../Card';
import { VideoPlayer } from './VideoPlayer';
import { YouTubeVideo } from '../services/youtubeApi';

interface VideoPlayerContainerProps {
  video: YouTubeVideo;
  playlist: YouTubeVideo[];
  currentPlaylistIndex: number;
  setCurrentPlaylistIndex: (index: number) => void;
  setSelectedVideo: (video: YouTubeVideo | null) => void;
  setIsPlaying: (playing: boolean) => void;
  isShuffleEnabled: boolean;
  currentView: 'search' | 'playlist' | 'editList';
}

const VideoPlayerContainer = ({
  video,
  playlist,
  currentPlaylistIndex,
  setCurrentPlaylistIndex,
  setSelectedVideo,
  setIsPlaying,
  isShuffleEnabled,
  currentView,
}: VideoPlayerContainerProps) => {
  const handleVideoEnd = () => {
    if (currentView === 'playlist' && playlist.length > 0) {
      let nextIndex: number;
      if (isShuffleEnabled) {
        do {
          nextIndex = Math.floor(Math.random() * playlist.length);
        } while (playlist.length > 1 && nextIndex === currentPlaylistIndex);
      } else {
        nextIndex = (currentPlaylistIndex + 1) % playlist.length;
      }
      setCurrentPlaylistIndex(nextIndex);
      setSelectedVideo(playlist[nextIndex]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setSelectedVideo(null);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <Card>
          <VideoPlayer video={video} onEnded={handleVideoEnd} />
        </Card>
      </div>
    </div>
  );
};

export default VideoPlayerContainer;
