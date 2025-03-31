interface Window {
    onYouTubeIframeAPIReady: (() => void) | undefined;
    YT: {
        Player: new (
            elementId: string,
            options: {
                height: string | number;
                width: string | number;
                videoId: string;
                playerVars?: {
                    autoplay?: 0 | 1;
                    controls?: 0 | 1;
                    modestbranding?: 0 | 1;
                    rel?: 0 | 1;
                    showinfo?: 0 | 1;
                    fs?: 0 | 1;
                    cc_load_policy?: 0 | 1;
                    iv_load_policy?: 0 | 1 | 3;
                    autohide?: 0 | 1 | 2;
                    enablejsapi?: 0 | 1;
                    origin?: string;
                    playsinline?: 0 | 1;
                    loop?: 0 | 1;
                    playlist?: string;
                };
                events?: {
                    onStateChange?: (event: { data: number }) => void;
                    onReady?: (event: { target: any }) => void;
                    onApiChange?: (event: { data: number }) => void;
                };
            }
        ) => {
            destroy: () => void;
        };
        PlayerState: {
            ENDED: number;
        };
    };
} 