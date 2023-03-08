import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from './components/pages/AddUser';
import UserList from './components/pages/UserList';
import EditUser from './components/pages/EditUser';
import ResultUser from './components/pages/ResultUser';
import PerhitunganUser from './components/pages/PerhitunganUser';
import Navbar from './components/layouts/navbar';
import Footer from './components/layouts/footer';
import RumusPakar from './components/pages/RumusPakar';
import AboutWeb from './components/pages/AboutWeb';
import Contact from './components/pages/Contact';
import LandingPage from './components/pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<LandingPage />} />
        <Route path="/user" element={<UserList />} />
        <Route path="user/adduser" element={<AddUser />} />
        <Route path="edituser/:id" element={<EditUser />} />
        <Route path="resultuser/:id" element={<ResultUser />} />
        <Route path="/perhitungan" element={<PerhitunganUser />} />
        <Route path="rumuspakar" element={<RumusPakar />} />
        <Route path="about" element={<AboutWeb />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      < Footer />
    </BrowserRouter>


  );
}

export default App;
