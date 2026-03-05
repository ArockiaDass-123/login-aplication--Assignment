import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';
import { useCart } from '../context/CartContext';
import { Search, Filter, Sparkles, MapPin, Calendar, Plus, Check } from 'lucide-react';

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemQuantities, setItemQuantities] = useState({});
    const [addedItems, setAddedItems] = useState(new Set());
    const { addCartItem } = useCart();
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        location: '',
        date: ''
    });

    const categories = ['Technology', 'Entertainment', 'Business', 'Health', 'Food', 'Art'];
    const locations = ['San Francisco, CA', 'Austin, TX', 'New York, NY', 'Bali, Indonesia', 'London, UK', 'Berlin, Germany', 'Tokyo, Japan', 'Miami, FL', 'Seattle, WA', 'Addis Ababa, Ethiopia'];

    useEffect(() => {
        fetchItems();
    }, [filters]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const data = await eventService.getEvents(filters);
            setItems(data);
            // Initialize quantities
            const quantities = {};
            data.forEach(item => {
                quantities[item._id] = 0;
            });
            setItemQuantities(quantities);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleQuantityChange = (itemId, change) => {
        setItemQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) + change)
        }));
    };

    const handleAddToCart = (item) => {
        const quantity = itemQuantities[item._id];
        if (quantity > 0) {
            addCartItem({
                id: item._id,
                name: item.title || item.name,
                price: item.price || 299,
                quantity: quantity,
                image: item.image || 'https://via.placeholder.com/100',
                description: item.description || item.type || 'Event Item'
            });
            setAddedItems(prev => new Set([...prev, item._id]));
            setItemQuantities(prev => ({
                ...prev,
                [item._id]: 0
            }));
        }
    };

    return (
        <div className="fade-in">
            {/* Hero Section */}
            <section style={{ textAlign: 'center', padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--primary)',
                    borderRadius: '2rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '1.5rem'
                }}>
                    <Sparkles size={16} /> Discover Extraordinary Experiences
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                    Connect with the <span style={{ color: 'var(--primary)' }}>Events</span> That Matter to You
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    Explore a curated collection of tech summits, music festivals, networking sessions, and creative workshops worldwide.
                </p>
            </section>

            {/* Search & Filters */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                        <input
                            type="text"
                            name="search"
                            placeholder="Search items..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '0.5rem',
                                color: 'var(--text)'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Filter style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '0.5rem',
                                color: 'var(--text)',
                                appearance: 'none'
                            }}
                        >
                            <option value="">Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <MapPin style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                        <select
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '0.5rem',
                                color: 'var(--text)',
                                appearance: 'none'
                            }}
                        >
                            <option value="">Locations</option>
                            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Calendar style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                        <input
                            type="date"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '0.5rem',
                                color: 'var(--text)',
                                appearance: 'none'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Item Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className="spinner"></div>
                    <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading items...</p>
                </div>
            ) : items.length > 0 ? (
                <div className="grid grid-cols-3">
                    {items.map(item => {
                        const quantity = itemQuantities[item._id] || 0;
                        const isAvailable = true;
                        const isAdded = addedItems.has(item._id);

                        return (
                            <div key={item._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ width: '100%', height: '200px', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem', backgroundColor: 'var(--surface)' }}>
                                    <img src={item.image || 'https://via.placeholder.com/300x200'} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title || item.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem', minHeight: '2.4em' }}>
                                    {item.description || item.type || 'Event Item'}
                                </p>
                                <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
                                    ₹{item.price || 299}
                                </p>

                                {isAvailable && (
                                    <>
                                        {quantity === 0 ? (
                                            <button
                                                onClick={() => handleQuantityChange(item._id, 1)}
                                                className="btn btn-outline"
                                                style={{ width: '100%', marginBottom: '0.5rem' }}
                                            >
                                                Add Quantity
                                            </button>
                                        ) : (
                                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, -1)}
                                                    className="btn btn-outline"
                                                    style={{ flex: 1 }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, 1)}
                                                    className="btn btn-outline"
                                                    style={{ flex: 1 }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            disabled={quantity === 0}
                                            className="btn btn-primary"
                                            style={{
                                                width: '100%',
                                                opacity: quantity === 0 ? 0.5 : 1,
                                                cursor: quantity === 0 ? 'not-allowed' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            {isAdded ? (
                                                <>
                                                    <Check size={18} /> Added to Cart
                                                </>
                                            ) : (
                                                <>
                                                    <Plus size={18} /> Add to Cart
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h3>No items found matching your criteria</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try clearing your filters or searching for something else.</p>
                    <button
                        className="btn btn-primary"
                        style={{ marginTop: '1.5rem' }}
                        onClick={() => setFilters({ search: '', category: '', location: '', date: '' })}
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
