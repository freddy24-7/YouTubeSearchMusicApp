import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { YouTubeVideo } from '../services/youtubeApi';

interface PlaylistContextType {
    playlist: YouTubeVideo[];
    addToPlaylist: (video: YouTubeVideo) => void;
    removeFromPlaylist: (videoId: string) => void;
    clearPlaylist: () => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: ReactNode }) {
    const [playlist, setPlaylist] = useState<YouTubeVideo[]>(() => {
        const savedPlaylist = localStorage.getItem('playlist');
        return savedPlaylist ? JSON.parse(savedPlaylist) : [];
    });

    useEffect(() => {
        localStorage.setItem('playlist', JSON.stringify(playlist));
    }, [playlist]);

    const addToPlaylist = (video: YouTubeVideo) => {
        setPlaylist(prev => {
            if (prev.some(v => v.id.videoId === video.id.videoId)) {
                return prev;
            }
            return [...prev, video];
        });
    };

    const removeFromPlaylist = (videoId: string) => {
        setPlaylist(prev => prev.filter(video => video.id.videoId !== videoId));
    };

    const clearPlaylist = () => {
        setPlaylist([]);
    };

    return (
        <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist, clearPlaylist }}>
            {children}
        </PlaylistContext.Provider>
    );
}

export function usePlaylist() {
    const context = useContext(PlaylistContext);
    if (context === undefined) {
        throw new Error('usePlaylist must be used within a PlaylistProvider');
    }
    return context;
} 