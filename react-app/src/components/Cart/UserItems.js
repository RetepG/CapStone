import { useState, useEffect } from "react";
import { updateCartThunk, getUserCartThunk, removeOneThunk } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemThunk } from "../../store/item";
import { NavLink } from "react-router-dom";

function CartItems({ item, itemId }) {
    const items = useSelector((state) => Object.values(state.item.items));
    const user = useSelector((state) => state.session.user);
    const cartItemIds = useSelector((state) => state.cart.cart.map((item) => item.item_id));

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(item.quantity);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(getAllItemThunk());
        setQuantity(item.quantity);
    }, [dispatch]);

    if (!items) return <p>Loading</p>;
    if (!user) return <h2>Please login to view your profile</h2>;

    const handleUpdateCart = async () => {
        if (!Number.isInteger(Number(item.quantity))) {
            setErrorMessage('Please enter a valid quantity.');
            return;
        }

        // Check if the quantity is a positive number
        if (item.quantity <= 0) {
            setErrorMessage('Please enter a positive quantity.');
            return;
        }

        const updatedCart = {
            item_id: itemId,
            quantity: item.quantity,
        };

        await dispatch(updateCartThunk(updatedCart));
        await dispatch(getUserCartThunk());
    };

    const removeOne = async () => {
        await dispatch(removeOneThunk(item.item_id));
        dispatch(getAllItemThunk());
    };

    const myitems = items.filter((item) => cartItemIds.includes(item.id));

    return (
        <>
            <h1 className="User-Cart-Item List">User Cart</h1>
            <div className="User-Cart-Wrapper">
                {myitems.map((item) => (
                    <div className="MyPage-item-container" key={item.id}>
                        <NavLink className="MyPage-items" exact to={`/items/${item.id}`}>
                            <p className="MyPage-name">{item.name}</p>
                            <p className="User-Cart Price">{item.price}</p>
                            <div className="MyPage-mainimage-container">
                                <img className="MyPage-mainimage" src={`${item.mainimage}`} alt={item.name} />
                            </div>
                        </NavLink>
                        <div className="Mypage-buttons">
                            Quantity: <input className="quantitySelector" type="number" onChange={e => setQuantity(e.target.value)} value={quantity}></input>
                            <div className="update-remove">
                                <button className="updateCartButton" onClick={() => handleUpdateCart(item.item_id, item.id)}>Update</button>
                                <button className="removeCartButton" onClick={() => removeOne(item.item_id)}>Remove</button>
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CartItems;
