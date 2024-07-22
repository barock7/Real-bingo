Python 3.12.4 (tags/v3.12.4:8e8a4ba, Jun  6 2024, 19:30:16) [MSC v.1940 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license()" for more information.
>>> from flask import Flask
... from flask_sqlalchemy import SQLAlchemy
... from flask_login import UserMixin
... 
... app = Flask(__name__)
... app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
... app.config['SECRET_KEY'] = 'your_secret_key'
... db = SQLAlchemy(app)
... 
... class User(UserMixin, db.Model):
...     id = db.Column(db.Integer, primary_key=True)
...     username = db.Column(db.String(150), nullable=False, unique=True)
...     email = db.Column(db.String(150), nullable=False, unique=True)
...     password = db.Column(db.String(150), nullable=False)
... 
... db.create_all()
