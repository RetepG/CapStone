import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItemIdThunk } from '../../store/item';
import './ItemById.css';
import CreateReview from '../Reviews/createReview';
import UpdateReview from '../Reviews/updateReview';
import OpenModalButton from '../OpenModalButton/index';
import DeleteOpenModalButton from '../DeleteModalButton';
import { useModal } from '../../context/Modal';
import DeleteReview from '../Reviews/deleteReview';
import Cart from '../Cart';

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
    const isLoggedIn = !!user;
    const isMyItem = user && item && item.user.id === user.id;

    useEffect(() => {
        dispatch(getItemIdThunk(itemId)).then(() => setIsLoading(false));
    }, [dispatch, itemId]);

    useEffect(() => {
        if (item) {
            setSelectedImage(item.mainimage);
            setReviews(item.reviews);
        }
    }, [item]);

    useEffect(() => {
        if (reviews.length > 0 && user) {
            const userReview = reviews.find((review) => review.user_id === user.id);
            if (userReview) {
                setHasReviewed(true);
            } else {
                setHasReviewed(false);
            }
        }
    }, [reviews, user]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        closeModal();
        setHasReviewed(true);
    };

    const handleReviewDelete = (reviewId) => {
        // After the review is successfully deleted, update the reviews state
        const updatedReviews = reviews.filter((review) => review.id !== reviewId);
        setReviews(updatedReviews);
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
                    {isLoggedIn && !isMyItem ? ( // Check if the user is logged in and the item is not theirs
                        <Cart itemId={itemId} /> // Render the cart if the user is logged in and the item is not theirs
                    ) : (
                        isMyItem ? (
                            <div className='itemid-myitem'>
                                This is your item. You cannot add it to the cart. {/* Message for the user's own item */}
                            </div>
                        ) : (
                            <div className='itemid-myitem'>
                                Please log in to add items to your cart. {/* Message for non-logged in users */}
                            </div>
                        )
                    )}
                    {/* <Cart itemId={itemId} /> */}
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
                <div className='id-reviewbutton-container'>
                    {user && !hasReviewed && user.id !== item.user.id && (
                        <OpenModalButton
                            modalComponent={<CreateReview closeModal={handleCloseModal} itemId={itemId} className="write-review" />}
                            buttonText="Write a Review"
                        />
                    )}
                    {user && hasReviewed && (
                        <div>
                            <OpenModalButton
                                modalComponent={
                                    <UpdateReview
                                        closeModal={handleCloseModal}
                                        itemId={itemId}
                                        reviewId={reviews.find((review) => review.user_id === user.id)?.id}
                                    />
                                }
                                buttonText="Edit a Review"
                            />
                            <DeleteOpenModalButton
                                modalComponent={
                                    <DeleteReview
                                        closeModal={handleCloseModal}
                                        itemId={itemId}
                                        reviewId={reviews.find((review) => review.user_id === user.id)?.id}
                                        onDelete={handleReviewDelete}
                                    />
                                }
                                buttonText={"Delete Review"}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
