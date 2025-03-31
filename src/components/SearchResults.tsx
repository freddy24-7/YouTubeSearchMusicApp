import React from 'react';
import { YouTubeVideo } from '../services/youtubeApi';

interface SearchResultsProps {
    videos: YouTubeVideo[];
    onVideoSelect: (video: YouTubeVideo) => void;
}

export function SearchResults({ videos, onVideoSelect }: SearchResultsProps) {
    if (videos.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No results found. Try searching for a song!
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {videos.map((video) => (
                <div
                    key={video.id.videoId}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                    <img
                        src={video.snippet.thumbnails.default.url}
                        alt={video.snippet.title}
                        className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {video.snippet.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {video.snippet.description}
                        </p>
                    </div>
                    <button
                        onClick={() => onVideoSelect(video)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Play
                    </button>
                </div>
            ))}
        </div>
    );
} 