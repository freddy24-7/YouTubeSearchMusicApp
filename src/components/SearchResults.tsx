import { YouTubeVideo } from '../services/youtubeApi';
import { useTheme } from '../context/ThemeContext';
import { usePlaylist } from '../context/PlaylistContext';

interface SearchResultsProps {
  videos: YouTubeVideo[];
  onVideoSelect: (video: YouTubeVideo) => void;
}

export function SearchResults({ videos, onVideoSelect }: SearchResultsProps) {
  const { theme } = useTheme();
  const { addToPlaylist, playlist } = usePlaylist();

  if (videos.length === 0) {
    return (
      <p
        className={`text-center py-6 sm:py-8 text-sm sm:text-base ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        No videos found. Try searching for something else.
      </p>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-colors ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700'
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => onVideoSelect(video)}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full sm:w-48 h-36 object-cover rounded"
            />
            <div className="flex-1">
              <h3
                className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {video.snippet.title}
              </h3>
              <p
                className={`text-xs sm:text-sm mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {video.snippet.channelTitle}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoSelect(video);
                  }}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-blue-900 text-blue-200 hover:bg-blue-800'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  Play
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToPlaylist(video);
                  }}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    playlist.some((v) => v.id.videoId === video.id.videoId)
                      ? theme === 'dark'
                        ? 'bg-green-900 text-green-200'
                        : 'bg-green-100 text-green-800'
                      : theme === 'dark'
                        ? 'bg-purple-900 text-purple-200 hover:bg-purple-800'
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  }`}
                >
                  {playlist.some((v) => v.id.videoId === video.id.videoId)
                    ? 'Added to List'
                    : 'Add To List'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
