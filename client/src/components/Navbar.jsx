import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Calendar, User, LogOut, ShoppingCart, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartList } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartItemCount = cartList.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="glass-card" style={{
            margin: '1rem',
            padding: '0.75rem 2rem',
            position: 'sticky',
            top: '1rem',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>
                <Calendar size={32} />
                <span>EventFlow</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {user && (
                    <>
                        <Link to="/" className="btn-outline" style={{ border: 'none' }}>Events</Link>
                        <Link to="/dashboard" className="btn-outline" style={{ border: 'none' }}>Dashboard</Link>
                    </>
                )}
                {user ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
                            {location.pathname !== '/cart' && (
                                <button
                                    onClick={() => navigate('/cart')}
                                    data-testid="cart"
                                    style={{
                                        position: 'relative',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'var(--text)'
                                    }}
                                >
                                    <ShoppingCart size={24} />
                                    {cartItemCount > 0 && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '-8px',
                                            right: '-8px',
                                            backgroundColor: 'var(--primary)',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {cartItemCount}
                                        </span>
                                    )}
                                </button>
                            )}
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hi, {user.name}</span>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem' }}>
                                <LogOut size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" className="btn btn-outline">Login</Link>
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
