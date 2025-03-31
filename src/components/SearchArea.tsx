import { Card } from '../Card';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { searchVideos, YouTubeVideo } from '../services/youtubeApi';

interface SearchAreaProps {
  videos: YouTubeVideo[];
  setVideos: (videos: YouTubeVideo[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onVideoSelect: (video: YouTubeVideo) => void;
}

const SearchArea = ({
  videos,
  setVideos,
  error,
  setError,
  isLoading,
  setIsLoading,
  onVideoSelect,
}: SearchAreaProps) => {
  const handleSearch = async (query: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const results = await searchVideos(query);
      setVideos(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while searching'
      );
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-8">
        <h1 className="text-4xl font-bold drop-shadow mb-6 text-center text-blue-600">
          Make or Change your Playlist
        </h1>
        <SearchBar onSearch={handleSearch} />
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-100 text-red-700">
            {error}
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Search Results
        </h2>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <SearchResults videos={videos} onVideoSelect={onVideoSelect} />
        )}
      </Card>
    </div>
  );
};

export default SearchArea;
