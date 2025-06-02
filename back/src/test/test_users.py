import requests
import time

USERS_API = "http://localhost:3000/users"

def test_create_user():
    payload = {
        "fullName": "Juan Pérez",
        "email": f"juan{int(time.time())}@correo.com",  # Email único por test
        "password": "superseguro"
    }
    res = requests.post(USERS_API, json=payload)
    assert res.status_code == 201 or res.status_code == 200
    data = res.json()
    print("[CREATE USER]", data)
    return data["user"]["id"]

def test_create_user_admin():
    payload = {
        "fullName": "Admin Test",
        "email": f"admin{int(time.time())}@correo.com",
        "password": "superseguro",
        "role": "admin"  # <-- agrega esto si tu backend lo permite
    }
    res = requests.post(USERS_API, json=payload)
    assert res.status_code == 201 or res.status_code == 200
    data = res.json()
    print("[CREATE ADMIN USER]", data)
    return data["user"]["id"]

def test_get_all_users():
    res = requests.get(USERS_API)
    assert res.status_code == 200
    print("[GET ALL USERS]", res.json())

def test_get_user_by_id(user_id):
    res = requests.get(f"{USERS_API}/{user_id}")
    assert res.status_code == 200
    print("[GET USER BY ID]", res.json())

def test_create_movie_by_user(user_id):
    payload = {
        "title": "Pelicula Admin",
        "description": "Creada por admin.",
        "genre": "Drama",
        "imageUrl": "https://example.com/admin.jpg"
    }
    res = requests.post(f"{USERS_API}/{user_id}/movies", json=payload)
    print("[CREATE MOVIE BY USER]", res.status_code, res.json())
    assert res.status_code == 201 or res.status_code == 200

if __name__ == "__main__":
    user_id = test_create_user()
    time.sleep(1)
    test_get_all_users()
    test_get_user_by_id(user_id)
    admin_id = test_create_user_admin()
    time.sleep(1)
    test_create_movie_by_user(admin_id)