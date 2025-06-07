# test_full_api.py
import requests
import random

BASE_URL = "http://localhost:3000"

def register():
    username = f"apitestuser{random.randint(1000,9999)}"
    data = {
        "username": username,
        "fullName": "API Test User",
        "email": f"{username}@example.com",
        "password": "Str0ngP@ss!",
        "confirmPassword": "Str0ngP@ss!"
    }
    r = requests.post(f"{BASE_URL}/auth/register", json=data)
    print("Register:", r.status_code, r.json())
    return username, data["email"]

def login(username):
    data = {
        "username": username,
        "password": "Str0ngP@ss!"
    }
    r = requests.post(f"{BASE_URL}/auth/login", json=data)
    print("Login:", r.status_code, r.json())
    return r.json().get("access_token")

def get_user_by_email(token, email):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/users", headers=headers)
    print("Users:", r.status_code)
    users = r.json()
    for user in users:
        if user.get("email") == email:
            print("Found user:", user)
            return user.get("id")
    print("User not found!")
    return None

def create_movie(token):
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "title": "Matrix Reloaded",
        "description": "Secuela de Matrix",
        "year": 2003
    }
    r = requests.post(f"{BASE_URL}/movies", json=data, headers=headers)
    print("Create Movie:", r.status_code, r.json())
    return r.json().get("id")

def get_movies(token):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/movies", headers=headers)
    print("Movies:", r.status_code, r.json())
    return r.json()

def create_comment(token, movie_id, user_id):
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "content": "¡Me encantó la secuela!",
        "movieId": movie_id,
        "userId": user_id,
        "rating": 4
    }
    r = requests.post(f"{BASE_URL}/comments", json=data, headers=headers)
    print("Create Comment:", r.status_code, r.json())
    return r.json().get("id")

def get_comments(token):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/comments", headers=headers)
    print("Comments:", r.status_code, r.json())
    return r.json()

def get_movie_rating(token, movie_id):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/movies/{movie_id}/rating", headers=headers)
    print("Movie Rating:", r.status_code, r.json())

if __name__ == "__main__":
    username, email = register()
    token = login(username)
    if not token:
        print("No token, aborting tests.")
        exit(1)
    user_id = get_user_by_email(token, email)
    if not user_id:
        print("No user_id, aborting tests.")
        exit(1)
    movie_id = create_movie(token)
    if not movie_id:
        print("No movie_id, aborting tests.")
        exit(1)
    get_movies(token)
    comment_id = create_comment(token, movie_id, user_id)
    get_comments(token)
    get_movie_rating(token, movie_id)