import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartThunk, getUserCartThunk, removeOneThunk, removeAllThunk } from "../../store/cart";
import { getAllItemThunk } from "../../store/item";
import { NavLink } from "react-router-dom";
import "./Usercart.css";
import { isEqual } from "lodash"; // Import lodash's isEqual function
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserCart() {
    const user = useSelector((state) => state.session.user);
    const cartObj = useSelector((state) => state.cart.cart);
    const allitems = useSelector((state) => Object.values(state.item.items));
    const [isPurchase, setIsPurchase] = useState(false);
    const cartArray = Object.values(cartObj);
    const dispatch = useDispatch();
    const [quantityMap, setQuantityMap] = useState({});
    const [errorMessageMap, setErrorMessageMap] = useState({});
    const history = useHistory();
    const [redirecting, setRedirecting] = useState(false);

    const prevCartArray = usePrevious(cartArray); // Use custom hook to get previous value

    useEffect(() => {
        dispatch(getUserCartThunk());
        dispatch(getAllItemThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!isEqual(prevCartArray, cartArray)) {  // Check if cartArray value actually changed
            const initialQuantityMap = {};
            const initialErrorMessageMap = {};

            cartArray.forEach((cart) => {
                initialQuantityMap[cart.item_id] = cart.quantity;
                initialErrorMessageMap[cart.item_id] = "";
            });

            setQuantityMap(initialQuantityMap);
            setErrorMessageMap(initialErrorMessageMap);
        }
    }, [cartArray, prevCartArray]);

    const handleUpdateCart = async (itemId) => {
        const quantity = parseInt(quantityMap[itemId], 10); // Convert the quantity to an integer

        if (isNaN(quantity) || quantity <= 0) {
            setErrorMessageMap((prevMap) => ({
                ...prevMap,
                [itemId]: "Please enter a valid positive quantity.",
            }));
            return;
        }

        const updatedCart = {
            item_id: itemId,
            quantity,
        };

        try {
            // Dispatch the updateCartThunk and handle the response in the thunk
            await dispatch(updateCartThunk(itemId, updatedCart));
            await dispatch(getUserCartThunk());
        } catch (error) {
            // Handle any errors here if needed
        }
    };



    const removeOne = async (itemId) => {
        await dispatch(removeOneThunk(itemId));
        dispatch(getAllItemThunk());
    };

    const purchase = async () => {
        setIsPurchase(true);
        await dispatch(removeAllThunk());

        // Add a timeout to redirect back to the "/" URL after 5 seconds
        setRedirecting(true);
        setTimeout(() => {
            history.push("/");
        }, 5000);
    };

    const getTotalPrice = () => {
        let total = {};
        let allTotal = 0;
        let totalQ = 0;

        cartArray.forEach((item) => {
            let itemId = item.item_id;
            total[item.item_id] = allitems.find((item) => item.id === itemId)?.price * item.quantity;
            totalQ += item.quantity;
        });

        for (let price in total) {
            allTotal += total[price];
        }

        return allTotal.toFixed(2);
    };

    if (!cartObj || !allitems) {
        return <p>Loading...</p>;
    }

    if (isPurchase) {
        return (
            <div className="Purchase-redirect">
                <h1 className="Purchase">Thank You For Your Purchase!</h1>
                <div className="redirect-home">Redirecting in 5 seconds....</div>
            </div>
        )
    }

    return (
        <>
            <h1 className="User-Cart-Title">User Cart</h1>
            <div className="cart-whole-container">
                {user && cartArray.length > 0 ? (
                    cartArray.map((cart) => {
                        const item = allitems.find((item) => item.id === cart.item_id);

                        if (!item) {
                            return <div>Loading...</div>;
                        }

                        return (
                            <div className="User-cart-container" key={item.id}>
                                <NavLink className="Cart-items" exact to={`/items/${item.id}`}>
                                    <div className="Cart-mainimage-container">
                                        <img className="Cart-mainimage" src={item.mainimage} alt={item.name} />
                                    </div>
                                </NavLink>
                                <div className="Cart-buttons">
                                    <NavLink className="Cart-items" exact to={`/items/${item.id}`}>
                                        <div className="Cart-Info">
                                            <p className="Cart-name">{item.name}</p>
                                            <p className="User-Cart-Price">$ {item.price}</p>
                                        </div>
                                    </NavLink>
                                    {/** */}
                                    Quantity:{" "}
                                    <input
                                        className="quantitySelector"
                                        type="number"
                                        onChange={(e) =>
                                            setQuantityMap((prevMap) => ({
                                                ...prevMap,
                                                [cart.item_id]: e.target.value,
                                            }))
                                        }
                                        value={quantityMap[cart.item_id] || cart.quantity}
                                    ></input>
                                    {/* <div>Quantity: {cart.quantity}</div> */}
                                    <div className="update-remove">
                                        <button className="updateCartButton" onClick={() => handleUpdateCart(item.id)}>
                                            Update
                                        </button>
                                        <button className="removeCartButton" onClick={() => removeOne(item.id)}>
                                            Remove
                                        </button>
                                        {errorMessageMap[item.id] && <p style={{ color: "red" }}>{errorMessageMap[item.id]}</p>}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="Empty">There are no items in your cart</p>
                )}
            </div>
            <div className="purchase-container">
                <p className="totalPrice">Item(s) total ${`${getTotalPrice()}`}</p>
                <p className="totalItems">Total Items: {`(${cartArray.length} items)`}</p>
                <div className="purchaseButtonContainer">
                    {cartArray.length > 0 && (
                        <button className="purchaseButton" onClick={purchase}>
                            Purchase
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

// Custom hook to get previous value
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default UserCart;
