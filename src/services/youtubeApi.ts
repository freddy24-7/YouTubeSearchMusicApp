const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
    };
    channelTitle: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
}

export const searchVideos = async (query: string): Promise<YouTubeVideo[]> => {
  if (!import.meta.env.VITE_YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is not configured');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&maxResults=10&q=${encodeURIComponent(
        query
      )}&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message ||
          `API request failed with status ${response.status}`
      );
    }

    const data: YouTubeSearchResponse = await response.json();

    if (!data.items) {
      throw new Error('No results found');
    }

    return data.items;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};
