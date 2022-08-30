import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import {DashboardComponent} from 'src/components/Dashboard/Dashboard';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {NavbarComponent} from 'src/components/Navigation/Navbar';
import {MovieComponent} from 'src/components/Detail/Movie';

function App() {
  return (
    <Router>
      <CssBaseline />
      <NavbarComponent />
      <Routes>
        <Route path="/movie/:id" element={<MovieComponent />} />
        <Route path="/" element={<DashboardComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
