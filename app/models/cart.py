from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship( "User",  back_populates="userCart")
    items = db.relationship( "Item", back_populates="itemCart")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'quantity': self.quantity
        }
