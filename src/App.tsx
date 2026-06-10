// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainScreen } from './pages/MainScreen'
import { Playlist } from './pages/Playlist'
import { MyPlaylist } from './pages/MyPlaylist'
import { SearchSongs } from './pages/SearchSongs'
import { NowPlaying } from './pages/NowPlaying'
import { CreatePlaylist } from './pages/CreatePlaylist'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/search" element={<SearchSongs />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/profile" element={<MyPlaylist />} />
      </Routes>
    </Router>
  )
}

export default App
