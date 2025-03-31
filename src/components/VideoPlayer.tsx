import React from 'react';
import { YouTubeVideo } from '../services/youtubeApi';

interface VideoPlayerProps {
    video: YouTubeVideo | null;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
    if (!video) {
        return (
            <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Search for a song to play</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="aspect-video mb-4">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    title={video.snippet.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {video.snippet.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-2">
                {video.snippet.description}
            </p>
        </div>
    );
} 