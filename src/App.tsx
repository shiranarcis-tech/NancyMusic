// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { MainScreen } from './pages/MainScreen'
import { Playlist } from './pages/Playlist'
import { MyPlaylist } from './pages/MyPlaylist'
import { SearchSongs } from './pages/SearchSongs'
import { NowPlaying } from './pages/NowPlaying'
import { CreatePlaylist } from './pages/CreatePlaylist'
import Login from './Login'
import Register from './Register'
import './index.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><MainScreen /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchSongs /></ProtectedRoute>} />
          <Route path="/now-playing" element={<ProtectedRoute><NowPlaying /></ProtectedRoute>} />
          <Route path="/create-playlist" element={<ProtectedRoute><CreatePlaylist /></ProtectedRoute>} />
          <Route path="/playlist/:id" element={<ProtectedRoute><Playlist /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MyPlaylist /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
