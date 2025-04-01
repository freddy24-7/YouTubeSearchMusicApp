# YouTube Music Search App

A modern web application that allows users to search for music videos on YouTube, create playlists, and play them in a responsive video player.

## Features

- 🔍 Search for music videos using YouTube's API
- 📱 Responsive design that works on both desktop and mobile devices
- 🎵 Create and manage playlists
- 🔄 Shuffle playback option
- 🌓 Dark/Light theme support
- 🎥 Draggable and resizable video player
- 📋 Edit playlist functionality
- ℹ️ Information page

## Mobile Features

- 🍔 Hamburger menu for navigation
- 👆 Touch controls for video player:
  - Drag with one finger
  - Resize with two fingers
- 📱 Optimized layout for small screens
- 🎯 Easy access to YouTube controls

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- YouTube API key

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd YouTubeSearchMusicApp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your YouTube API key:
```
VITE_YOUTUBE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Search for Music**
  - Enter a song name or artist in the search bar
  - Click search or press enter
  - Results will be displayed below

2. **Create Playlist**
  - Click on any video to add it to your playlist
  - Access your playlist through the navigation menu
  - Toggle shuffle mode for random playback

3. **Video Player**
  - Drag the video player around the screen
  - Resize it using two fingers on mobile
  - Access YouTube controls directly

4. **Manage Playlist**
  - Edit your playlist through the "Edit List" option
  - Remove videos or change their order
  - Clear the entire playlist if needed

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- YouTube Data API
- React YouTube


## License

This project is licensed under the MIT License - see the LICENSE file for details.