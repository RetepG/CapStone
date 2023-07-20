import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartThunk, getUserCartThunk, removeOneThunk, removeAllThunk } from "../../store/cart";
import { getAllItemThunk } from "../../store/item";
import { NavLink } from "react-router-dom";

function UserCart() {
    const user = useSelector((state) => state.session.user);
    const cartObj = useSelector((state) => state.cart.cart);
    const allitems = useSelector((state) => Object.values(state.item.items));
    const [isPurchase, setIsPurchase] = useState(false);
    const cartArray = Object.values(cartObj);
    const dispatch = useDispatch();
    const [quantityMap, setQuantityMap] = useState({});
    const [errorMessageMap, setErrorMessageMap] = useState({});

    useEffect(() => {
        dispatch(getUserCartThunk());
        dispatch(getAllItemThunk());
    }, [dispatch]);

    useEffect(() => {
        const initialQuantityMap = {};
        const initialErrorMessageMap = {};

        cartArray.forEach((cart) => {
            initialQuantityMap[cart.item_id] = cart.quantity;
            initialErrorMessageMap[cart.item_id] = "";
        });

        setQuantityMap(initialQuantityMap);
        setErrorMessageMap(initialErrorMessageMap);
    }, [cartArray]);

    const handleUpdateCart = async (itemId) => {
        const quantity = quantityMap[itemId];

        if (!Number.isInteger(Number(quantity))) {
            setErrorMessageMap((prevMap) => ({
                ...prevMap,
                [itemId]: "Please enter a valid quantity.",
            }));
            return;
        }

        // Check if the quantity is a positive number
        if (quantity <= 0) {
            setErrorMessageMap((prevMap) => ({
                ...prevMap,
                [itemId]: "Please enter a positive quantity.",
            }));
            return;
        }

        const updatedCart = {
            item_id: itemId,
            quantity,
        };

        await dispatch(updateCartThunk(updatedCart));
        await dispatch(getUserCartThunk());
    };

    const removeOne = async (itemId) => {
        await dispatch(removeOneThunk(itemId));
        dispatch(getAllItemThunk());
    };

    const purchase = async () => {
        setIsPurchase(true);
        await dispatch(removeAllThunk());
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

    if (!cartObj || !allitems) return <p>Loading...</p>;
    if (isPurchase) return <h1 className="purchaseMsg">Thank You For Your Purchase!</h1>;
    return (
        <>
            <h1 className="userCartHeading">User Cart</h1>
            <div className="cartProductCardContainer">
                {user && cartArray.length > 0 ? (
                    cartArray.map((cart) => {
                        const item = allitems.find((item) => item.id === cart.item_id);
                        if (!item) {
                            // If item is not found, you can return a placeholder or a loading state
                            return <div>Loading...</div>;
                        }

                        return (
                            <div className="MyPage-item-container" key={item.id}>
                                <NavLink className="MyPage-items" exact to={`/items/${item.id}`}>
                                    <p className="MyPage-name">{item.name}</p>
                                    <p className="User-Cart Price">{item.price}</p>
                                    <div className="MyPage-mainimage-container">
                                        <img className="MyPage-mainimage" src={item.mainimage} alt={item.name} />
                                    </div>
                                </NavLink>
                                <div className="Mypage-buttons">
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
                    <p>There are no items in your cart</p>
                )}
            </div>
            <p className="totalPrice">Cart Total: ${`${getTotalPrice()} (${cartArray.length} items) `}</p>
            <div className="purchaseButtonContainer">
                {cartArray.length > 0 && (
                    <button className="purchaseButton" onClick={purchase}>
                        Purchase
                    </button>
                )}
            </div>
        </>
    );
}

export default UserCart;
