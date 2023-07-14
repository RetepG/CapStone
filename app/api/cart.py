from flask import Blueprint, jsonify, request, session
from app.models import Cart, db
from flask_login import login_required
from app.forms import CartForm

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/', methods=['GET'])
@login_required
def get_shoppingcart():
    userId = session.get('_user_id')
    carts = Cart.query.filter_by(user_id=userId).all()
    return {'cart': [cart.to_dict() for cart in carts]}

@cart_routes.route('/add-to-cart', methods=['POST'])
@login_required
def add_to_cart():
    user_id = session.get('_user_id')

    data = request.json

    # Extract required fields from the request body
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    if not item_id or not quantity:
        return jsonify({"error": "Missing required fields 'item_id' or 'quantity'."}), 400

    cart_item = Cart.query.filter_by(item_id=item_id, user_id=user_id).first()

    if cart_item:
        return jsonify({"error": "Item already exists in the cart."}), 400

    new_item = Cart(user_id=user_id, item_id=item_id, quantity=quantity)

    try:
        db.session.add(new_item)
        db.session.commit()
        return jsonify(new_item.to_dict()), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while adding the item to the cart."}), 500

# Changes the amount of quantity for item
@cart_routes.route('/items/<int:itemId>', methods=['PUT'])
@login_required
def update_cart(itemId):
    userId = session.get('_user_id')
    cart = Cart.query.filter(Cart.item_id == itemId).filter(Cart.user_id == str(userId)).first()

    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data['quantity']:
            cart.quantity = form.data['quantity']
        db.session.commit()
        return cart.to_dict()

    else :
        return jsonify({"error": "Cannot update the cart"})

# Remove 1 item from cart
@cart_routes.route('/items/<int:itemId>', methods=['DELETE'])
@login_required
def removeItem(itemId):
    userId = session.get('_user_id')
    cart = Cart.query.filter_by(item_id=itemId, user_id=str(userId)).first()

    if cart:
        db.session.delete(cart)
        db.session.commit()
        return jsonify({'message': "Item removed"})
    else:
        return jsonify({'error': "Item not found in cart"}), 404

# Remove all when purchased
@cart_routes.route('/items/purchase', methods=['DELETE'])
@login_required
def purchase():
    userId = session.get('_user_id')
    cart = Cart.query.filter_by(user_id=str(userId)).all()

    if cart:
        for item in cart:
            db.session.delete(item)
        db.session.commit()
        return jsonify({'message': "All Items removed"})
    else:
        return jsonify({'error': "Cart is already empty"}), 404
