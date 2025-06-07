# test_full_api.py
import requests
import random
import sys

# Ajusta al puerto donde levanta tu API
BASE_URL = "http://localhost:3000"

# 1) Registro y login del usuario de prueba
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
    if r.status_code != 201:
        sys.exit("Registro falló, abortando tests.")
    return r.json().get("id"), username

# 2) Login para obtener token JWT
def login(username):
    data = {"username": username, "password": "Str0ngP@ss!"}
    r = requests.post(f"{BASE_URL}/auth/login", json=data)
    print("Login:", r.status_code, r.json())
    token = r.json().get("access_token")
    if not token:
        sys.exit("Login falló, abortando tests.")
    return token

# 3) CRUD de Películas
def create_movie(token):
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "title": "Matrix Reloaded",
        "description": "Secuela de Matrix",
        "genre": "Sci-Fi",
        "imageUrl": "https://example.com/matrix.jpg"
    }
    r = requests.post(f"{BASE_URL}/movies", json=payload, headers=headers)
    print("Create Movie:", r.status_code, r.json())
    if r.status_code != 201:
        sys.exit("Creación de película falló.")
    return r.json().get("id")


def list_movies(token):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/movies", headers=headers)
    print("Movies:", r.status_code, r.json())


def update_movie(token, movie_id):
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "title": "Matrix Revolutions",
        "description": "Tercera parte",
        "genre": "Sci-Fi",
        "imageUrl": "https://example.com/revolutions.jpg"
    }
    r = requests.put(f"{BASE_URL}/movies/{movie_id}", json=payload, headers=headers)
    print("Update Movie:", r.status_code, r.json())


def delete_movie(token, movie_id):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.delete(f"{BASE_URL}/movies/{movie_id}", headers=headers)
    print("Delete Movie:", r.status_code)

# 4) CRUD de Comentarios
def create_comment(token, movie_id, user_id):
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "content": "¡Me encantó la secuela!",
        "movieId": movie_id,
        "userId": user_id
    }
    r = requests.post(f"{BASE_URL}/comments", json=payload, headers=headers)
    print("Create Comment:", r.status_code, r.json())
    if r.status_code != 201:
        sys.exit("Creación de comentario falló.")
    return r.json().get("id")


def list_comments(token):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/comments", headers=headers)
    print("Comments:", r.status_code, r.json())


def update_comment(token, comment_id):
    headers = {"Authorization": f"Bearer {token}"}
    payload = {"content": "Prefiero la original."}
    r = requests.put(f"{BASE_URL}/comments/{comment_id}", json=payload, headers=headers)
    print("Update Comment:", r.status_code, r.json())


def delete_comment(token, comment_id):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.delete(f"{BASE_URL}/comments/{comment_id}", headers=headers)
    print("Delete Comment:", r.status_code)

if __name__ == "__main__":
    # Registrar usuario y obtener su ID
    user_id, username = register()
    # Autenticar y obtener token
    token = login(username)

    # Películas
    movie_id = create_movie(token)
    list_movies(token)
    update_movie(token, movie_id)
    delete_movie(token, movie_id)

    # Comentarios (recrear película si borrado es físico)
    movie_id = create_movie(token)
    comment_id = create_comment(token, movie_id, user_id)
    list_comments(token)
    update_comment(token, comment_id)
    delete_comment(token, comment_id)
