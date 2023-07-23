import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartThunk } from '../../store/cart';
import "./Cart.css"

const Cart = ({ itemId }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart);
    const [item, setItem] = useState({ itemId: itemId, quantity: 1 });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddToCart = async () => {
        // Check if quantity is a valid number
        if (!Number.isInteger(Number(item.quantity))) {
            setErrorMessage('Please enter a valid quantity.');
            return;
        }

        // Check if the quantity is a positive number
        if (item.quantity <= 0) {
            setErrorMessage('Please enter a positive quantity.');
            return;
        }

        // Check if item is already in the cart
        const itemInCart = cartItems.find((cartItem) => cartItem.itemId === item.itemId);
        if (itemInCart) {
            setErrorMessage('Item is already in the cart.');
            return;
        }

        const newItem = {
            item_id: itemId,
            quantity: item.quantity,
        };

        await dispatch(addCartThunk(newItem));
        // setErrorMessage('Item has been added to the cart.');
        setMessage('Item has been added to the cart.');
        setItem({ itemId: itemId, quantity: 1 }); // Reset to default values
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    return (
        <div>
            <div className='id-quantity-page'>
                <div className='name-quantity'>
                    Quantity:
                </div>
                <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    className='Id-quantity'
                />
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <p>{message}</p>
        </div>
    );
};

export default Cart;
