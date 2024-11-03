import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import DashboardPage from './pages/DashboardPage';
import LotteriesPage from './pages/LotteriesPage';
import UsersPage from './pages/UsersPage';
import ResultsPage from './pages/ResultsPage';
import WinnerPage from './pages/WinnerPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/lotteries" element={<LotteriesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/winners" element={<WinnerPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
