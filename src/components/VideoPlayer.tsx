import React from 'react';
import { YouTubeVideo } from '../services/youtubeApi';

interface VideoPlayerProps {
    video: YouTubeVideo;
    onEnded: () => void;
}

export function VideoPlayer({ video, onEnded }: VideoPlayerProps) {
    return (
        <div className="relative w-full pt-[56.25%]">
            <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={onEnded}
            />
        </div>
    );
} 