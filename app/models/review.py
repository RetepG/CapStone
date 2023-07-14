from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    review = db.Column(db.Text, nullable=False)
    star = db.Column(db.Integer, nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))


    user = db.relationship("User",back_populates="reviews")
    item = db.relationship("Item",back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'review': self.review,
            'star': self.star,
            'item_id': self.item_id
        }
