import { Card } from '../Card';
import { useTheme } from '../context/ThemeContext';
import { YouTubeVideo } from '../services/youtubeApi';
import { usePlaylist } from '../context/PlaylistContext';

interface PlaylistEditorProps {
  playlist: YouTubeVideo[];
  clearPlaylist: () => void;
}

const PlaylistEditor = ({ playlist, clearPlaylist }: PlaylistEditorProps) => {
  const { theme } = useTheme();
  const { removeFromPlaylist } = usePlaylist();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
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
          <p
            className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Your playlist is empty
          </p>
        ) : (
          <div className="space-y-4">
            {playlist.map((video) => (
              <div
                key={video.id.videoId}
                className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-48 h-36 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    >
                      {video.snippet.title}
                    </h3>
                    <p
                      className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      {video.snippet.channelTitle}
                    </p>
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
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default PlaylistEditor;
