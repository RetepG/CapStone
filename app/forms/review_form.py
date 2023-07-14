from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired()])
    star = IntegerField('stars', validators=[DataRequired()])
    item_id = IntegerField('item_id', validators=[DataRequired()])
