from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_review():
    review_0 = Review(
        user_id = 1,
        item_id = 6,
        star = 5,
        review = "Love the delivery speed!"
    )

    review_1 = Review(
        user_id=1,
        item_id=7,
        star=4,
        review="Great product! Highly recommended."
    )

    review_2 = Review(
        user_id=1,
        item_id=8,
        star=3,
        review="Average quality, but good value for the price."
    )

    review_3 = Review(
        user_id=1,
        item_id=9,
        star=5,
        review="Excellent service and fast delivery!"
    )

    review_4 = Review(
        user_id=1,
        item_id=10,
        star=5,
        review="Outstanding product. Couldn't be happier!"
    )

    review_5 = Review(
        user_id=2,
        item_id=1,
        star=4,
        review="Very satisfied with the purchase. Great quality."
    )

    review_6 = Review(
        user_id=2,
        item_id=2,
        star=5,
        review="Absolutely love it! Fantastic product."
    )

    review_7 = Review(
        user_id=2,
        item_id=3,
        star=3,
        review="Decent item, but could be better."
    )

    review_8 = Review(
        user_id=2,
        item_id=4,
        star=4,
        review="Good value for money. Happy with my purchase."
    )

    review_9 = Review(
        user_id=2,
        item_id=5,
        star=5,
        review="Impressive quality. Highly recommend!"
    )

    review_10 = Review(
        user_id=3,
        item_id=11,
        star=3,
        review="Not as expected. Average product."
    )

    review_11 = Review(
        user_id=3,
        item_id=12,
        star=4,
        eview="Pretty good. Met my requirements."
    )

    review_12 = Review(
        user_id=3,
        item_id=13,
        star=5,
        review="Excellent item! Exceeded my expectations."
    )

    review_13 = Review(
        user_id=3,
        item_id=14,
        star=4,
        review="Very satisfied with the purchase. Good value."
    )

    review_14 = Review(
        user_id=3,
        item_id=15,
        star=5,
        review="Top-notch quality. Couldn't be happier!"
    )

    db.session.add(review_0)
    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_5)
    db.session.add(review_6)
    db.session.add(review_7)
    db.session.add(review_8)
    db.session.add(review_9)
    db.session.add(review_10)
    db.session.add(review_11)
    db.session.add(review_12)
    db.session.add(review_13)
    db.session.add(review_14)
    db.session.commit()

def undo_review():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text('DELETE FROM reviews'))

    db.session.commit()
