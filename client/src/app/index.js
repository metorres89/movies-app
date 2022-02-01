import { React } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar } from '../components'
import { MovieList, BasicTable, MovieInsert, MovieUpdate } from '../pages'

function App() {
  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/movies/list" element={<MovieList></MovieList>}/>
        </Routes>
    </Router>
  );
}

export default App;
