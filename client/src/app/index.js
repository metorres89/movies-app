import { React } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar } from '../components'
import { MovieList, BasicTable, MovieInsert, MovieUpdate } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/movies/list" element={<MovieList></MovieList>}/>
          <Route path="/movies/list2" element={<BasicTable></BasicTable>}/>
          <Route path="/movies/create" element={<MovieInsert></MovieInsert>}/>
          <Route path="/movies/update/:id" element={<MovieUpdate></MovieUpdate>}/> 
        </Routes>
    </Router>
  );
}

export default App;
