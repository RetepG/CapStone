const GET_ALL_ITEMS = '/GETALLITEMS'
const GET_ITEM_ID = '/GETITEMID'
const CREATE_ITEM = '/CREATEITEM'
const DELETE_ITEM = '/DELETEITEM'

const getItems = (items) => {
    return { type: GET_ALL_ITEMS, items: items }
}

const getItemId = (item) => {
    return { type: GET_ITEM_ID, item }
}

const createItem = (item) => {
    return { type: CREATE_ITEM, item }
}

const deleteItem = (id) => {
    return { type: DELETE_ITEM, id }
}

export const getAllItemThunk = () => async (dispatch) => {
    const res = await fetch('/items/')
    if (res.ok) {
        const item = await res.json()
        await dispatch(getItems(item))
    }
}

export const getItemIdThunk = (id) => async (dispatch) => {
    const res = await fetch(`/items/${id}`)
    if (res.ok) {
        const item = await res.json()
        await dispatch(getItemId(item))
        return item
    }
}

export const createItemThunk = (item) => async (dispatch) => {
    const res = await fetch(`/items/new`, { method: 'POST', body: item })
    if (res.ok) {
        const items = await res.json()
        await dispatch(createItem(items))
    }
}

export const updateItemThunk = (FormData, itemId) => async (dispatch) => {
    const res = await fetch(`/items/${itemId}`, { method: "PUT", body: FormData })
    if (res.ok) {
        await dispatch(getAllItemThunk())
    }
}

export const deleteItemThunk = (id) => async (dispatch) => {
    const res = await fetch(`/items/${id}`, { method: "DELETE" })
    if (res.ok) {
        await dispatch(deleteItem(id))
        // dispatch(getAllItemThunk)
    }
}

const initalState = { items: {}, itemId: {} };

const itemReducer = (state = initalState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_ITEMS:
            newState = { ...state };
            if (Array.isArray(action.items.items)) {
                action.items.items.forEach((item) => {
                    newState.items[item.id] = item;
                });
            }
            return newState;
        case GET_ITEM_ID:
            // newState = { ...state };
            // newState.itemId[action.item.id] = action.item;
            // return newState;
            newState = { ...state };
            newState.items[action.item.id] = action.item;
            return newState;
        case CREATE_ITEM:
            newState = { ...state };
            // newState.itemId[action.item.id] = action.item;
            newState.items[action.item.id] = action.item;
            return newState;
        case DELETE_ITEM:
            newState = { ...state };
            delete newState.itemId[action.id];
            return newState;
        default:
            return state;
    }
};

export default itemReducer;
