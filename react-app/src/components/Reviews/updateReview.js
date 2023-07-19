import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { useState, useEffect } from "react";
import { getItemIdThunk } from "../../store/item";
import { updateReviewThunk } from "../../store/review";
import { getReviewThunk } from "../../store/review";

function UpdateReview({ reviewId, itemId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const reviewData = useSelector((state) => state.review[reviewId]);
    const items = useSelector((state) => Object.values(state.item.items));
    const { closeModal } = useModal();

    const [review, setReview] = useState("");
    const [star, setstar] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getReviewThunk(reviewId)).then(() => setIsLoading(false));
    }, [dispatch, reviewId]);

    useEffect(() => {
        if (reviewData) {
            setReview(reviewData.review);
            setstar(reviewData.star);
        }
    }, [reviewData]);

    useEffect(() => {
        const item = items.find((item) => item.id === itemId);
        if (item) {
            const reviewData = item.reviews.find((review) => review.id === reviewId);
            if (reviewData) {
                setReview(reviewData.review);
                setstar(reviewData.star);
            }
        }
    }, [items, itemId, reviewId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReview = {
            user_id: user.id,
            review: review,
            star: star,
            item_id: itemId
        };

        await dispatch(updateReviewThunk(updatedReview, itemId, reviewId));
        await dispatch(getItemIdThunk(itemId));
        history.push(`/items/${itemId}`);
        closeModal(); // Close the modal
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="update-review">
            <h2>Update Review</h2>
            <form onSubmit={handleSubmit} method="PUT" className="update-review-form">
                <label className="review">
                    <textarea
                        type="text"
                        rows={7}
                        cols={31}
                        placeholder="Update your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <label className="rating">
                    {star > 0 ?
                        <i className="fas fa-star" onClick={() => setstar(1)}></i>
                        :
                        <i className="far fa-star" onClick={() => setstar(1)}></i>
                    }
                    {star > 1 ?
                        <i className="fas fa-star" onClick={() => setstar(2)}></i>
                        :
                        <i className="far fa-star" onClick={() => setstar(2)}></i>
                    }
                    {star > 2 ?
                        <i className="fas fa-star" onClick={() => setstar(3)}></i>
                        :
                        <i className="far fa-star" onClick={() => setstar(3)}></i>
                    }
                    {star > 3 ?
                        <i className="fas fa-star" onClick={() => setstar(4)}></i>
                        :
                        <i className="far fa-star" onClick={() => setstar(4)}></i>
                    }
                    {star > 4 ?
                        <i className="fas fa-star" onClick={() => setstar(5)}></i>
                        :
                        <i className="far fa-star" onClick={() => setstar(5)}></i>
                    }
                    <span></span> star
                </label>
                <button className='update-review-button' type="submit" disabled={review.length < 10 || star === 0}>
                    Update Your Review
                </button>
            </form>
        </div>
    );
}

export default UpdateReview;
