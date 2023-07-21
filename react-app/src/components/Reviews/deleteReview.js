import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk, getReviewThunk } from "../../store/review";
import "./deletereview.css"

function DeleteReview({ reviewId, itemId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (shouldDelete) => {
        if (shouldDelete) {
            await dispatch(deleteReviewThunk(reviewId, itemId));
            await dispatch(getReviewThunk(itemId, reviewId))
        }
        closeModal();
    };

    return (
        <div className="delete-review-container">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this Item?</p>
            <div className="delete-button-container">
                <button onClick={() => handleDelete(true)} className="delete-item-button">
                    Yes (Delete Item)
                </button>
                <button onClick={() => handleDelete(false)} className="cancel-item-button">
                    No (Keep Item)
                </button>
            </div>
        </div>
    );
}

export default DeleteReview;
