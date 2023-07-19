import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItemIdThunk } from '../../store/item';
import './ItemById.css';
import CreateReview from '../Reviews/createReview';
import OpenModalButton from '../OpenModalButton/index';
import { useModal } from '../../context/Modal';

const ItemDetails = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const item = useSelector((state) => state.item.items[itemId]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [reviews, setReviews] = useState([]);
    const user = useSelector((state) => state.session.user);
    const [hasReviewed, setHasReviewed] = useState(false);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getItemIdThunk(itemId)).then(() => setIsLoading(false));
    }, [dispatch, itemId]);

    useEffect(() => {
        if (item) {
            setSelectedImage(item.mainimage);
            setReviews(item.reviews);
            if (user) {
                const userReview = item.reviews.find(review => review.user_id === user.id);
                if (userReview) {
                    setHasReviewed(true);
                }
            }
        }
    }, [item, user]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        closeModal();
        setHasReviewed(true); // Assuming the review is created successfully
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!item) {
        return <div>Item not found.</div>;
    }

    return (
        <div className="background-color">
            <div className="item-details">
                <div className="side-images">
                    <img
                        className="small-img"
                        src={item.mainimage}
                        alt={item.name}
                        onClick={() => handleImageClick(item.mainimage)}
                    />
                    <img
                        className="small-img"
                        src={item.sideimage}
                        alt={item.name}
                        onClick={() => handleImageClick(item.sideimage)}
                    />
                    <img
                        className="small-img"
                        src={item.sideimage2}
                        alt={item.name}
                        onClick={() => handleImageClick(item.sideimage2)}
                    />
                    <img
                        className="small-img"
                        src={item.sideimage3}
                        alt={item.name}
                        onClick={() => handleImageClick(item.sideimage3)}
                    />
                </div>
                <div className="main-image">
                    <img className="default-image" src={selectedImage} alt={item.name} />
                </div>
                <div className="Info">
                    <div className="name">{item.name}</div>
                    <div className="price">Price ${item.price}</div>
                    <div className="description-title">Description</div>
                    <div className="description">{item.description}</div>
                </div>
            </div>
            <div className="reviews-container">
                <div className="reviews-title">Reviews</div>
                {reviews.map((review) => (
                    <div key={review.id} className="review-texts">
                        <div className="review-text">{review.review}</div>
                        <div className="review-star">
                            {[...Array(review.star)].map((_, index) => (
                                <i key={index} className="fas fa-star"></i>
                            ))}
                        </div>
                    </div>
                ))}
                {user && !hasReviewed && user.id !== item.user.id && (
                    <OpenModalButton
                        modalComponent={<CreateReview closeModal={handleCloseModal} itemId={itemId} />}
                        buttonText="Write a Review"
                    />
                )}
                {user && hasReviewed && (
                    <div>
                        <button>Edit Review</button>
                        <button>Delete Review</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemDetails;
