import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

const Cart = () => {
    const { cartList, removeAllCartItems, incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem } = useCart();

    const totalPrice = cartList.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (cartList.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <ShoppingCart size={64} style={{ margin: '0 auto', color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
                <p style={{ color: 'var(--text-muted)' }}>Start adding items to your cart!</p>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Shopping Cart</h1>
                <button
                    onClick={removeAllCartItems}
                    className="btn btn-outline"
                    style={{ padding: '0.75rem 1.5rem' }}
                >
                    Remove All
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {cartList.map(item => (
                    <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '1.5rem', alignItems: 'center' }}>
                        {/* Item Image */}
                        <div style={{ width: '100px', height: '100px', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: 'var(--surface)' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Item Details */}
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.description}</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
                                ₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        {/* Quantity Controls and Remove */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                <button
                                    onClick={() => decrementCartItemQuantity(item.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text)',
                                        padding: '0.25rem'
                                    }}
                                >
                                    <Minus size={18} />
                                </button>
                                <span style={{ fontSize: '1rem', fontWeight: 700, minWidth: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                                <button
                                    onClick={() => incrementCartItemQuantity(item.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text)',
                                        padding: '0.25rem'
                                    }}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <button
                                onClick={() => removeCartItem(item.id)}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: 'var(--error)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Trash2 size={16} /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Summary */}
            <div className="glass-card" style={{ padding: '2rem', maxWidth: '400px', marginLeft: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontWeight: 600 }}>Subtotal:</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Shipping:</span>
                    <span style={{ color: 'var(--text-muted)' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <span>Total:</span>
                    <span style={{ color: 'var(--primary)' }}>₹{totalPrice.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
