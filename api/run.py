from app import app
from app.models import user

if __name__ == '__main__':
    with app.app_context():
        user.create_user_collection()
    app.run(debug=True)