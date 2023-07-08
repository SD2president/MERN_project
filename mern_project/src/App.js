import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';
//Components
import Destination from './components/Destination'
import Destinations from './components/Destinations'
import Continents from './components/Continents'
import NewDestination from './components/NewDestination'
import Edit from './components/Edit'


function App() {
  //Sets document title
  useEffect(() => {
    document.title = "Express Excursions";
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/continents' element={<Continents />} />
          <Route path='/continents/:name' element={<Destinations />} />
          <Route path='/destination/:name' element={<Destination />} />
          <Route path='/newdestination' element={<NewDestination />} />
          <Route path='/edit/:name' element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;