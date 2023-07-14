from flask import Blueprint, jsonify, redirect, request
from app.models import Item, db
from flask_login import login_required
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3
from app.forms import CreateItem

item_routes = Blueprint('item', __name__)

# get all items
@item_routes.route('/')
def get_items():
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}

# get item by id
@item_routes.route('/<int:id>')
def get_items_id(id):
    items = Item.query.get(id)
    return items.to_dict()

@item_routes.route('/new', methods=['POST'])
@login_required
def create_item():
    form = CreateItem()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        images = ['mainimage', 'sideimage', 'sideimage2', 'sideimage3']
        uploads = []

        for image_name in images:
            item_image = form.data[image_name]
            item_image.filename = get_unique_filename(item_image.filename)
            upload = upload_file_to_s3(item_image)

            if 'url' not in upload:
                return upload['errors']

            uploads.append(upload['url'])

        new_item = Item(
            user_id=form.data['user_id'],
            name=form.data['name'],
            price=form.data['price'],
            description=form.data['description'],
            mainimage=uploads[0],
            sideimage=uploads[1],
            sideimage2=uploads[2],
            sideimage3=uploads[3]
        )

        db.session.add(new_item)
        db.session.commit()

        return jsonify(new_item.to_dict())
    else:
        return "Post route fail items"

@item_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_item(id):
    item = Item.query.get(id)
    form = CreateItem()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        images = ['mainimage', 'sideimage', 'sideimage2', 'sideimage3']
        uploads = []

        for image_name in images:
            if form.data[image_name]:
                image = form.data[image_name]
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)

                if 'url' not in upload:
                    return upload['errors']

                setattr(item, image_name, upload['url'])

        if form.data['name']:
            item.name = form.data['name']
        if form.data['price']:
            item.price = form.data['price']
        if form.data['description']:
            item.description = form.data['description']

        db.session.commit()
        return item.to_dict()
    else:
        return "Bad Put item"

@item_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_item(id):
    item = Item.query.get(id)
    db.session.delete(item)
    db.session.commit()

    return jsonify({
        'message': 'Item Deleted'
    })
