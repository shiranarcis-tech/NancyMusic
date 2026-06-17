export interface User {
  id: string; // Improvement: Important for relational databases
  name: string; // Mapped from "Alex Doe" in UI
  avatarUrl: string; // Mapped from UI header
  
  // --- Suggested Improvements ---
  email?: string; // Required for login functionality
  subscriptionTier?: 'free' | 'premium'; // Essential for monetized music apps
  createdAt?: string; // Timestamp for user registration
  savedSongIds?: string[]; // Liked songs
}

export interface Song {
  id: string; // Improvement: Unique ID for the track
  title: string; // Mapped from UI ("Starlight", "Hysteria")
  artist: string; // Mapped from UI ("Muse")
  coverUrl: string; // Mapped from UI cards
  audioUrl?: string; // Mapped from Upload New Song form
  length?: string; // Display-friendly time string like '3:45'
  
  // --- Suggested Improvements ---
  duration?: number; // Track length in seconds (UI usually needs '3:24')
  albumId?: string; // Relation to an album
  releaseDate?: string; // Required for "New Releases" sorting
  plays?: number; // Internal analytics/chart sorting
}

export interface Album {
  id: string; // Improvement: Unique ID
  title: string; // Mapped from UI ("New Album Release")
  description?: string; // Mapped from UI hero section
  coverUrl: string; // Mapped from UI hero section
  
  // --- Suggested Improvements ---
  artist: string; // E.g., "Muse"
  releaseDate?: string; // Required for timeline displays
  songIds?: string[]; // Array of associated song IDs for library mapping
}

export interface Playlist {
  id: string; // Improvement: Unique ID
  title: string; // Mapped from UI ("Chill Vibes", "Workout Beats")
  coverUrl?: string; // Mapped from UI playlist components
  songCount: number; // Discovered from UI ("23 songs")
  
  // --- Suggested Improvements ---
  userId?: string; // ID of the user who created it (e.g., from "My Playlists" sidebar)
  isPublic?: boolean; // Determines visibility to other users
  songIds?: string[]; // The actual tracks within the playlist
  description?: string; // Playlist description
}

export interface Library {
  // Mapped from UI Sidebar Stats
  totalSongs: number; // e.g. 12345
  totalPlaylists: number; // e.g. 2500
  totalArtists: number; // e.g. 5000
  
  // --- Suggested Improvements ---
  // A real-world library actually needs internal state arrays referencing IDs
  savedSongIds?: string[]; // Liked songs
  savedAlbumIds?: string[]; // Saved albums
  userPlaylistIds?: string[]; // Playlists created by the user
}
