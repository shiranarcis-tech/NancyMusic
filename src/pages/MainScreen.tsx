import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Icon } from '../components/ui/Icon';
import { Avatar } from '../components/ui/Avatar';
import { Card } from '../components/ui/Card';
import { NavLink } from '../components/ui/NavLink';
import { useAuth } from '../contexts/AuthContext';
import { getAlbums, getPlaylists, getSongs, getUser } from '../services/firestoreService';
import type { Album, Playlist, Song, User } from '../types';

export const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    Promise.all([
      getUser(currentUser.uid),
      getAlbums(),
      getSongs(),
      getPlaylists(),
    ])
      .then(([userData, albumData, songData, playlistData]) => {
        setUser(userData);
        setAlbums(albumData);
        setSongs(songData);
        setPlaylists(playlistData);
      })
      .catch((error) => {
        console.error('Failed to load main screen data from Firestore:', error);
      });
  }, []);

  const heroAlbum = albums[0];

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <Icon name="music_note" className="text-primary text-3xl" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NancyMusic</h1>
        </div>

        <nav className="space-y-4">
          <NavLink href="#" icon="home" active>Home</NavLink>
          <NavLink onClick={() => navigate('/search')} icon="search">Search</NavLink>
          <NavLink onClick={() => navigate('/profile')} icon="playlist_play">My Playlists</NavLink>
        </nav>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Categories</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><a href="#" className="hover:text-primary transition-colors">Top Artists</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Charts</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">New Releases</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Genres</a></li>
          </ul>
        </div>

        <div className="mt-10">
          <Button fullWidth onClick={() => navigate('/create-playlist')}>
            <Icon name="add" /> Create New Playlist
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto min-w-0">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 gap-4 flex-wrap md:flex-nowrap">
          <div className="flex-1 max-w-md w-full">
            <Input 
              placeholder="Search for songs, albums, artists..." 
              icon={<Icon name="search" />}
            />
          </div>
          <button
            className="flex items-center gap-3 rounded-full px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => navigate('/profile')}
            aria-label="Go to profile"
          >
            <span className="text-sm font-semibold">{user?.name || 'Guest'}</span>
            <Avatar src={user?.avatarUrl || ''} alt={user?.name || 'User profile'} size="md" />
          </button>
        </header>

        {/* Hero Section */}
        {heroAlbum && (
          <section className="mb-12">
            <div className="relative rounded-xl overflow-hidden h-80">
              <img 
                src={heroAlbum.coverUrl} 
                alt="Album cover" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h2 className="text-4xl font-bold mb-2">{heroAlbum.title}</h2>
                <p className="text-lg">{heroAlbum.description}</p>
                <Button className="mt-4 px-6 rounded-full" onClick={() => {
                  if (heroAlbum?.songIds && heroAlbum.songIds.length > 0) {
                    localStorage.setItem('currentSongId', heroAlbum.songIds[0]);
                  }
                  navigate('/now-playing');
                }}>
                  Listen Now
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* New Songs */}
        <section>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New Songs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {songs.map((song) => (
                <Card key={song.id} className="text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  localStorage.setItem('currentSongId', song.id);
                  navigate('/now-playing');
                }}>
                  <img 
                    src={song.coverUrl} 
                    alt="Song cover" 
                    className="w-full h-40 object-cover rounded-md mb-3" 
                  />
                  <p className="font-semibold truncate">{song.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{song.artist}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Playlists */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Popular Playlists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <Card key={playlist.id} className="flex flex-row items-center gap-4" onClick={() => navigate(`/playlist/${playlist.id}`)}>
                  <img 
                    src={playlist.coverUrl} 
                    alt="Playlist cover" 
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0" 
                  />
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{playlist.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{playlist.songCount} songs</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Settings</a>
            <a href="#" className="hover:text-primary transition-colors">Technical Support</a>
          </div>
          <p>© 2024 NancyMusic. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};
