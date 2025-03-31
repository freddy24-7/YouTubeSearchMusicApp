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

export default function SearchArea({
                                     videos,
                                     setVideos,
                                     error,
                                     setError,
                                     isLoading,
                                     setIsLoading,
                                     onVideoSelect,
                                   }: SearchAreaProps) {
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="mb-4 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold drop-shadow mb-4 sm:mb-6 text-center text-blue-600">
          Make or Change your Playlist
        </h1>

        {/* Show on medium screens and up */}
        <div className="hidden sm:block">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className="mt-4 p-3 sm:p-4 rounded-lg bg-red-100 text-red-700 text-sm sm:text-base">
            {error}
          </div>
        )}
      </Card>

      {/* Show only on small screens */}
      <div className="block sm:hidden mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      <Card>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Search Results
        </h2>
        {isLoading ? (
          <div className="text-center py-6 sm:py-8">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <SearchResults videos={videos} onVideoSelect={onVideoSelect} />
        )}
      </Card>
    </div>
  );
}
