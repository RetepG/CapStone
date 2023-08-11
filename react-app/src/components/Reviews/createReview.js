// import { useModal } from "../../context/Modal";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from 'react-router';
// import { useState } from "react";
// import { getItemIdThunk } from "../../store/item";
// import { createReviewThunk } from "../../store/review";
// import "./createReview.css"

// function CreateReview({ itemId }) {
//     const [review, setReview] = useState("");
//     const [star, setStar] = useState(0);
//     const user = useSelector(state => state.session.user);
//     const { closeModal } = useModal();
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const newReview = {
//             user_id: user.id,
//             review: review,
//             star: star,
//             item_id: itemId
//         };

//         await dispatch(createReviewThunk(newReview, itemId));
//         await dispatch(getItemIdThunk(itemId));
//         history.push(`/items/${itemId}`);
//         closeModal(); // Close the modal

//         setReview("");
//         setStar(0);
//     };

//     return (
//         <div className="create-review">
//             <h2 className="h2-create-review"> Create a Review</h2>
//             <form onSubmit={handleSubmit} method="POST" className="create-review-form">
//                 <label className="review">
//                     <textarea
//                         type="text"
//                         rows={7}
//                         cols={31}
//                         placeholder="Min 10 characters! Leave your review here..."
//                         value={review}
//                         onChange={(e) => setReview(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label className="rating">
//                     {star > 0 ?
//                         <i className="fas fa-star" onClick={() => setStar(1)}></i>
//                         :
//                         <i class="far fa-star" onClick={() => setStar(1)}></i>
//                     }
//                     {star > 1 ?
//                         <i className="fas fa-star" onClick={() => setStar(2)}></i>
//                         :
//                         <i class="far fa-star" onClick={() => setStar(2)}></i>
//                     }
//                     {star > 2 ?
//                         <i className="fas fa-star" onClick={() => setStar(3)}></i>
//                         :
//                         <i class="far fa-star" onClick={() => setStar(3)}></i>
//                     }
//                     {star > 3 ?
//                         <i className="fas fa-star" onClick={() => setStar(4)}></i>
//                         :
//                         <i class="far fa-star" onClick={() => setStar(4)}></i>
//                     }
//                     {star > 4 ?
//                         <i className="fas fa-star" onClick={() => setStar(5)}></i>
//                         :
//                         <i class="far fa-star" onClick={() => setStar(5)}></i>
//                     }
//                     <span></span> star
//                 </label>
//                 <button className='create-review-button' type="submit" disabled={(review.length < 10) || !star}>
//                     Submit Your Review
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default CreateReview;

import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { useState } from "react";
import { getItemIdThunk } from "../../store/item";
import { createReviewThunk } from "../../store/review";
import "./createReview.css"

function CreateReview({ itemId }) {
    const [review, setReview] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [star, setStar] = useState(0);
    const [error, setError] = useState(""); // New error state
    const user = useSelector(state => state.session.user);
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (review.length < 10) {
            setError("Review must be at least 10 characters.");
            return;
        } else if (review.length > 300) {
            setError("Review cannot exceed 300 characters.");
            return;
        }

        setError(""); // Reset error

        const newReview = {
            user_id: user.id,
            review: review,
            star: star,
            item_id: itemId
        };

        await dispatch(createReviewThunk(newReview, itemId));
        await dispatch(getItemIdThunk(itemId));
        history.push(`/items/${itemId}`);
        closeModal();

        setReview("");
        setCharCount(0);
        setStar(0);
    };

    return (
        <div className="create-review">
            <h2 className="h2-create-review"> Create a Review</h2>
            <form onSubmit={handleSubmit} method="POST" className="create-review-form">
                <label className="review">
                    <textarea
                        type="text"
                        rows={7}
                        cols={31}
                        placeholder="Min 10 characters! Leave your review here..."
                        value={review}
                        onChange={(e) => {
                            const value = e.target.value;
                            setReview(value);
                            setCharCount(value.length);
                        }}
                        required
                    />
                    <div className="char-counter">
                        {charCount}/300 characters
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </label>
                <label className="rating">
                    {star > 0 ?
                        <i className="fas fa-star" onClick={() => setStar(1)}></i>
                        :
                        <i class="far fa-star" onClick={() => setStar(1)}></i>
                    }
                    {star > 1 ?
                        <i className="fas fa-star" onClick={() => setStar(2)}></i>
                        :
                        <i class="far fa-star" onClick={() => setStar(2)}></i>
                    }
                    {star > 2 ?
                        <i className="fas fa-star" onClick={() => setStar(3)}></i>
                        :
                        <i class="far fa-star" onClick={() => setStar(3)}></i>
                    }
                    {star > 3 ?
                        <i className="fas fa-star" onClick={() => setStar(4)}></i>
                        :
                        <i class="far fa-star" onClick={() => setStar(4)}></i>
                    }
                    {star > 4 ?
                        <i className="fas fa-star" onClick={() => setStar(5)}></i>
                        :
                        <i class="far fa-star" onClick={() => setStar(5)}></i>
                    }
                    <span></span> star
                </label>
                <button className='create-review-button' type="submit" disabled={(review.length < 10) || (review.length > 300) || !star}>
                    Submit Your Review
                </button>
            </form>
        </div>
    );
}

export default CreateReview;
