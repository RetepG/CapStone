const GET_USER_CART = '/GET_USER_CART'

const getUserCart = (cart) => {
    return { type: GET_USER_CART, cart }
}

export const getUserCartThunk = () => async (dispatch) => {
    const res = await fetch(`/carts/`);

    if (res.ok) {
        const response = await res.json();
        const cart = response.cart;
        await dispatch(getUserCart(cart));
        return cart;
    } else {
        return "Can't get cart details";
    }
};

export const addCartThunk = (itemId, total) => async (dispatch) => {
    const res = await fetch(`/carts/add-to-cart`, {
        method: "POST", headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(itemId, total)
    })
    if (res.ok) {
        await dispatch(getUserCartThunk())
    } else {
        return "Error can't add to cart"
    }
}

// export const updateCartThunk = (itemId, total) => async (dispatch) => {
//     const res = await fetch(`/carts/add-to-cart`, { method: "PUT", body: JSON.stringify(total) })
//     if (res.ok) {
//         await dispatch(getUserCartThunk())
//     }
// }
export const updateCartThunk = (itemId, updatedCart) => async (dispatch) => {
    try {
        const res = await fetch(`/carts/add-to-cart/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCart),
        });

        if (res.ok) {
            await dispatch(getUserCartThunk());
        } else {
            // Handle the error if needed
        }
    } catch (error) {
        // Handle any network or other errors
    }
};



export const removeOneThunk = (itemId) => async (dispatch) => {
    const res = await fetch(`/carts/items/${itemId}`, { method: "DELETE" })
    if (res.ok) {
        dispatch(getUserCartThunk())
        return "deleted"
    } else {
        return "failed to delete"
    }
}

export const removeAllThunk = () => async (dispatch) => {
    const res = await fetch(`/carts/items/purchase`, { method: "DELETE" })
    if (res.ok) {
        dispatch(getUserCartThunk())
        return "Deleted All"
    } else {
        return "failed to delete"
    }
}


const initialState = {
    cart: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_CART:
            return {
                ...state,
                cart: action.cart, // Update the cart items in the state
            };
        default:
            return state;
    }
};

export default cartReducer;
