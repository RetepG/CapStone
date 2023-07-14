from flask import Blueprint, jsonify, request
from app.models import Review, db
from flask_login import login_required
from app.forms import ReviewForm

review_routes = Blueprint('review', __name__)

# get all
@review_routes.route('/', methods=['GET'])
def all_reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

# get review id
@review_routes.route ('/<int:id>', methods=['GET'])
def get_review_id():
    reviews = Review.query.filter_by(item_id=id).all()
    return jsonify([review.to_dict() for review in reviews])

# post new review
@review_routes.route('/new', methods=['POST'])
@login_required
def create_review():
    # validations
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review_data = Review(
            user_id = form.user_id.data,
            review = form.review.data,
            star = form.star.data,
            item_id = form.item_id.data
        )

        db.session.add(review_data)
        db.session.commit()
        return review_data.to_dict()
    else:
        return 'bad review post'

# Edit review comment
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    review = Review.query.get(id)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data['review']:
            review.review = form.data['review']
        if form.data['star']:
            review.star = form.data['star']

        db.session.commit()
        return review.to_dict()
    else:
        return "edit error"

# Delete a review
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return 'Review deleted'
