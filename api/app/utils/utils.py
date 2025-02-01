from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password):
    """
    Hashes a password using werkzeug's secure hashing algorithm.
    """
    return generate_password_hash(password)

def check_password(hashed_password, password):
    """
    Verifies a password against its hashed version.
    """
    return check_password_hash(hashed_password, password)