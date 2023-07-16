const GET_ALL_REVIEWS = '/GETALLREVIEWS'
const CREATE_REVIEW = '/CREATEREVIEW'
const UPDATE_REVIEW = '/EDITREVIEW'
const DELETE_REVIEW = '/DELETE_REVIEW'

//action
const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

const createReviews = (reviews) => {
    return {
        type: CREATE_REVIEW,
        reviews
    }
}

const updateReviews = (reviews) => {
    return {
        type: UPDATE_REVIEW,
        reviews
    }
}

const deleteReviews = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

//thunk
export const getAllReviewsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/reviews/`)

    if (res.ok) {
        const reviews = await res.json()
        await dispatch(getAllReviews(reviews))
    }
}

export const createReviewThunk = (review, itemId) => async (dispatch) => {
    const res = await fetch(`/reviews/new`, { method: "POST", body: JSON.stringify(review)})
    if (res.ok){
        const reviews = await res.json()
        await dispatch(createReviews(reviews))
        return reviews
    } else {
        return "Create review error"
    }
}

export const updateReviewThunk = (review, itemId, id) => async (dispatch) => {
    const res = await fetch(`/reviews/${id}`, { method: "PUT", body: JSON.stringify(review)})
    if (res.ok){
        const reviews = await res.json()
        await dispatch(updateReviews(reviews))
        return reviews
    }
}

export const deleteReviewThunk = (id) => async(dispatch) => {
    const res = await fetch(`/reviews/${id}` , { method: "DELETE"})
    if(res.ok){
        await dispatch(deleteReviews(id))
    }
}

//reducer
const initalState = {};
const reviewReducer = (state = initalState, action) => {
    let newState;
    switch(action.type) {
        case GET_ALL_REVIEWS:
            newState = {...state}
            action.reviews.forEach(review => {
                newState[review.id] = review;
            })
            return newState
        case CREATE_REVIEW:
            newState = {...state}
            newState[action.reviews.id] = action.reviews
            return newState
        case UPDATE_REVIEW:
            newState = {...state}
            newState[action.reviews.id] = action.reviews
            return newState
        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export default reviewReducer
