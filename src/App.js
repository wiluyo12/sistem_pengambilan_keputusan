import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { DataProvider } from './context/DataContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {user && <Navbar user={user} setUser={setUser} />}
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={user ? <UserDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;