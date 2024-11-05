import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ManageProducts from './ManageProducts'; 
import UserManagement from './UserManagement';
import Authentication from './Authentication'; // Importing the Authentication component
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handler functions
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const PrivateRoute = ({ component: Component }) => (
        isLoggedIn ? <Component /> : <Navigate to="/" />
    );

    return (
        <Router>
            <div>
                {isLoggedIn && (
                    <header>
                       <h1><b>WINGS CAFEE</b></h1>
                        <nav>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/ManageProducts">ManageProducts</Link>
                            <Link to="/userManagement">User Management</Link>
                            <button onClick={handleLogout} className="nav-button">Logout</button>
                        </nav>
                    </header>
                )}

                <main>
                    <Routes>
                        <Route path="/" element={<Authentication onAuthenticate={handleLogin} />} />
                        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                        <Route path="/ManageProducts" element={<PrivateRoute component={ManageProducts} />} />
                        <Route path="/userManagement" element={<PrivateRoute component={UserManagement} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;