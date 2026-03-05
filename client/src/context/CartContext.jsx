import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);

    const addCartItem = (item) => {
        const existingItem = cartList.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            setCartList(cartList.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                    : cartItem
            ));
        } else {
            setCartList([...cartList, item]);
        }
    };

    const removeCartItem = (id) => {
        setCartList(cartList.filter(item => item.id !== id));
    };

    const removeAllCartItems = () => {
        setCartList([]);
    };

    const incrementCartItemQuantity = (id) => {
        setCartList(cartList.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const decrementCartItemQuantity = (id) => {
        setCartList(cartList.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ).filter(item => item.quantity > 0));
    };

    return (
        <CartContext.Provider value={{
            cartList,
            addCartItem,
            removeCartItem,
            removeAllCartItems,
            incrementCartItemQuantity,
            decrementCartItemQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
