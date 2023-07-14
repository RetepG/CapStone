from .db import db, environment, SCHEMA, add_prefix_for_prod

class Item(db.Model):
    __tablename__ = 'items'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255))
    mainimage = db.Column(db.String(255), nullable=False)
    sideimage = db.Column(db.String(255), nullable=False)
    sideimage2 = db.Column(db.String(255), nullable=False)
    sideimage3 = db.Column(db.String(255), nullable=False)

    user = db.relationship("User",back_populates="items")
    reviews = db.relationship("Review",back_populates="item")
    itemCart = db.relationship("Cart",back_populates="items")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'mainimage': self.mainimage,
            'sideimage': self.sideimage,
            'sideimage2' : self.sideimage2,
            'sideimage3': self.sideimage3,
            'reviews': [review.to_dict() for review in self.reviews]
        }
