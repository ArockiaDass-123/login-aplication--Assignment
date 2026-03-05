import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Cart from './pages/Cart';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (user) return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <main className="container" style={{ minHeight: '80vh', padding: '2rem 1rem' }}>
                            <Routes>
                                <Route path="/" element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                } />
                                <Route path="/welcome" element={
                                    <ProtectedRoute>
                                        <Welcome />
                                    </ProtectedRoute>
                                } />
                                <Route path="/cart" element={
                                    <ProtectedRoute>
                                        <Cart />
                                    </ProtectedRoute>
                                } />
                                <Route path="/login" element={
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                } />
                                <Route path="/register" element={<Register />} />
                                <Route path="/event/:id" element={<EventDetails />} />
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                } />
                            </Routes>
                        </main>
                        <footer style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
                            <p>&copy; 2026 EventFlow - Bellcorp Assignment. All rights reserved.</p>
                        </footer>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
