from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.user import User
from app.utils import hash_password, check_password
from .. import db

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if db.users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400

    # Hash the password
    hashed_password = hash_password(data["password"])

    # Create user document
    user = User(
        username=data["username"],
        email=data["email"],
        password=hashed_password,
        location=data["location"]
    )

    # Insert user into the database
    db.users.insert_one(user.to_dict())
    return jsonify({"message": "User registered successfully"}), 201

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = db.users.find_one({"email": data["email"]})

    # Check if user exists and password is correct
    if user and check_password(user["password"], data["password"]):
        return jsonify({"message": "Login successful", "user_id": str(user["_id"])}), 200
    return jsonify({"message": "Invalid credentials"}), 401