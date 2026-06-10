// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainScreen } from './pages/MainScreen'
import { Playlist } from './pages/Playlist'
import { MyPlaylist } from './pages/MyPlaylist'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/profile" element={<MyPlaylist />} />
      </Routes>
    </Router>
  )
}

export default App
