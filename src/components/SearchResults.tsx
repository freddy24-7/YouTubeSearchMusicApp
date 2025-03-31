import React from 'react';
import { YouTubeVideo } from '../services/youtubeApi';

interface SearchResultsProps {
    videos: YouTubeVideo[];
    onVideoSelect: (video: YouTubeVideo) => void;
    selectedVideoId: string | null;
}

export function SearchResults({
    videos,
    onVideoSelect,
    selectedVideoId,
}: SearchResultsProps) {
    if (videos.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {videos.map((video) => (
                <div
                    key={video.id.videoId}
                    onClick={() => onVideoSelect(video)}
                    className={`cursor-pointer p-4 rounded-lg border transition-colors ${
                        selectedVideoId === video.id.videoId
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                    }`}
                >
                    <div className="flex gap-4">
                        <img
                            src={video.snippet.thumbnails.default.url}
                            alt={video.snippet.title}
                            className="w-40 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900 line-clamp-2">
                                {video.snippet.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                {video.snippet.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 