import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { MOCK_SONGS } from '../data/mock-data';
import type { Song } from '../types';

interface SearchFilters {
  searchQuery: string;
  artist: string;
  year: string;
  duration: string;
}

export const SearchSongs: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    artist: '',
    year: '',
    duration: '',
  });

  const [advancedFilters, setAdvancedFilters] = useState<Omit<SearchFilters, 'searchQuery'>>({
    artist: '',
    year: '',
    duration: '',
  });

  // Live results based on search query only
  const liveResults = useMemo(() => {
    if (!filters.searchQuery) return [];

    return MOCK_SONGS.filter((song) => {
      return (
        song.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    });
  }, [filters.searchQuery]);

  // Filter results with all filters applied
  const filteredResults = useMemo(() => {
    return liveResults.filter((song) => {
      const matchesArtist = !advancedFilters.artist || 
        song.artist.toLowerCase().includes(advancedFilters.artist.toLowerCase());

      const matchesDuration = !advancedFilters.duration || 
        (advancedFilters.duration === 'short' && song.duration < 180) ||
        (advancedFilters.duration === 'medium' && song.duration >= 180 && song.duration <= 300) ||
        (advancedFilters.duration === 'long' && song.duration > 300);

      return matchesArtist && matchesDuration;
    });
  }, [liveResults, advancedFilters]);

  const handleSearchQueryChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: value,
    }));
  };

  const handleFilterChange = (field: keyof Omit<SearchFilters, 'searchQuery'>, value: string) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    // Search button applies all filters - no action needed as results already update automatically
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlaySong = (song: Song) => {
    navigate('/now-playing');
  };

  const handleAddToPlaylist = (song: Song) => {
    console.log('Adding to playlist:', song.title);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-logo p-4 pt-16" style={{
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0Z' fill='%235b13ec' fill-opacity='0.1'/%3E%3C/svg%3E%0A\")",
      backgroundSize: '50px 50px'
    }}>
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Search for songs
          </h1>
        </div>

        {/* Search Form */}
        <div className="space-y-6 rounded-xl bg-white dark:bg-[#221933] p-6 shadow-lg">
          {/* Main Search Input */}
          <div className="relative">
            <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#a492c9]" />
            <input
              type="text"
              placeholder="Enter song name, artist, album..."
              value={filters.searchQuery}
              onChange={(e) => handleSearchQueryChange(e.target.value)}
              className="form-input w-full rounded-lg border-gray-300 bg-background-light p-4 pl-12 text-base font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-[#443267] dark:bg-background-dark dark:text-white dark:placeholder:text-[#a492c9] dark:focus:ring-primary"
            />
          </div>

          {/* Filter Inputs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Artist Filter */}
            <label className="flex flex-col">
              <span className="pb-2 text-sm font-medium text-gray-600 dark:text-[#a492c9]">
                Artist
              </span>
              <input
                type="text"
                placeholder="e.g., The Beatles"
                value={advancedFilters.artist}
                onChange={(e) => handleFilterChange('artist', e.target.value)}
                className="form-input w-full rounded-lg border-gray-300 bg-background-light p-3 text-base font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-[#443267] dark:bg-background-dark dark:text-white dark:placeholder:text-[#a492c9] dark:focus:ring-primary"
              />
            </label>

            {/* Year Filter */}
            <label className="flex flex-col">
              <span className="pb-2 text-sm font-medium text-gray-600 dark:text-[#a492c9]">
                Year
              </span>
              <input
                type="text"
                placeholder="e.g., 1969"
                value={advancedFilters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="form-input w-full rounded-lg border-gray-300 bg-background-light p-3 text-base font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-[#443267] dark:bg-background-dark dark:text-white dark:placeholder:text-[#a492c9] dark:focus:ring-primary"
              />
            </label>

            {/* Song Length Filter */}
            <label className="flex flex-col">
              <span className="pb-2 text-sm font-medium text-gray-600 dark:text-[#a492c9]">
                Song Length
              </span>
              <select
                value={advancedFilters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="form-select w-full rounded-lg border-gray-300 bg-background-light p-3 text-base font-normal text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary dark:border-[#443267] dark:bg-background-dark dark:text-white dark:focus:ring-primary"
              >
                <option value="">Any</option>
                <option value="short">Short (&lt; 3 min)</option>
                <option value="medium">Medium (3-5 min)</option>
                <option value="long">Long (&gt; 5 min)</option>
              </select>
            </label>
          </div>

          {/* Search Button */}
          <div>
            <Button fullWidth onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Results {filters.searchQuery && `(${filteredResults.length})`}
          </h2>

          {!filters.searchQuery ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-[#a492c9]">
                Start typing to see results
              </p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-[#a492c9]">
                No songs found matching your criteria
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResults.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between rounded-lg bg-white dark:bg-[#221933] p-4 shadow-md transition-all hover:shadow-lg dark:hover:bg-opacity-80"
                >
                  <div className="flex items-center gap-4">
                    {song.coverUrl && (
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        {song.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-[#a492c9]">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-600 dark:text-[#a492c9]">
                      {formatDuration(song.duration)}
                    </p>
                    <button
                      onClick={() => handlePlaySong(song)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#443267] focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      aria-label="Play song"
                    >
                      <Icon name="play_arrow" />
                    </button>
                    <button
                      onClick={() => handleAddToPlaylist(song)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#443267] focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      aria-label="Add to playlist"
                    >
                      <Icon name="playlist_add" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
