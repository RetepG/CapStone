from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class CreateItem(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    mainimage = FileField("main image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    sideimage = FileField("side image", validators=[FileRequired(), FileAllowed(list( ALLOWED_EXTENSIONS))])
    sideimage2 = FileField("side image", validators=[FileRequired(), FileAllowed(list( ALLOWED_EXTENSIONS))])
    sideimage3 = FileField("side image", validators=[FileRequired(), FileAllowed(list( ALLOWED_EXTENSIONS))])
