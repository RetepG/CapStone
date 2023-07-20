import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartThunk } from '../../store/cart';

const Cart = ({ itemId }) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState({ itemid: itemId, quantity: 1 });

    const handleAddToCart = async () => {
        // Check if quantity is a valid number
        if (!Number.isInteger(Number(item.quantity))) {
            alert('Please enter a valid quantity.');
            return;
        }

        console.log(item)
        const newItem = {
            item_id: itemId,
            quantity: item.quantity
        }

        console.log(newItem)

        // await dispatch(addCartThunk(item.itemid, parseInt(item.quantity)));
        await dispatch(addCartThunk(newItem))
        setItem({ itemid: itemId, quantity: 1 }); // Reset to default values
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    return (
        <div>
            <input
                type="text"
                name="quantity"
                value={item.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default Cart;
