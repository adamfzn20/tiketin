import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/pages/Login/LoginPage';
import Dashboard from './components/pages/Dashboard/DashboardPage';
import UserPage from './components/pages/Users/UserPage';
import UserEditPage from './components/pages/Users/UserEdit/UserEditPage';
import ConcertsPage from './components/pages/Concerts/ConcertPage';
import ConcertEditPage from './components/pages/Concerts/ConcertEdit/ConcertEditPage';
import ConcertCreatePage from './components/pages/Concerts/ConcertCreate/ConcertCreatePage';
import TicketPage from './components/pages/Tikect/TicketPage';
import AdminPage from './components/pages/Admins/AdminPage';
import AdminEditPage from './components/pages/Admins/AdminEdit/AdminEditPage';
import ConcertAdminCreatePage from './components/pages/Admins/AdminCreate/ConcertAdminCreatePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/usereditpage/:id" element={<UserEditPage />} />
        <Route path="/Concertspage" element={<ConcertsPage />} />
        <Route path="/concerteditpage/:id" element={<ConcertEditPage />} />
        <Route path="/concertcreatepage" element={<ConcertCreatePage />} />
        <Route path="/ticketpage/:id" element={<TicketPage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/admineditpage/:id" element={<AdminEditPage />} />
        <Route path="/concertadmincreatepage" element={<ConcertAdminCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
