const GET_USER_CART = '/GET_USER_CART'

const getUserCart = (cart) => {
    return { type: GET_USER_CART, cart }
}

export const getUserCartThunk = () => async (dispatch) => {
    const res = await fetch(`/carts/`)

    if (res.ok) {
        const cart = await res.json()
        await dispatch(getUserCart(cart))
        return cart
    } else {
        return "Cant get cart details"
    }
}

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

export const updateCartThunk = (itemId, total) => async (dispatch) => {
    const res = await fetch(`/carts/add-to-cart`, { method: "PUT", body: JSON.stringify(total) })
    if (res.ok) {
        await dispatch(getUserCartThunk())
    }
}

export const removeOneThunk = (itemId) => async (dispatch) => {
    const res = await fetch(`/items/${itemId}`, { method: "DELETE" })
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

const initalState = { cart: [] }
const cartReducer = (state = initalState, action) => {
    let newState
    switch (action.type) {
        case GET_USER_CART:
            // newState = { ...state, action.cart }
            // return newState
            return { ...state, cart: action.cart };
        default:
            return state
    }
}

export default cartReducer
