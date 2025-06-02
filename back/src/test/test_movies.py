import requests
import time

MOVIES_API = "http://localhost:3000/movies"

def test_create_movie():
    payload = {
        "title": "Matrix",
        "description": "Película de ciencia ficción.",
        "genre": "Sci-Fi",
        "imageUrl": "https://example.com/matrix.jpg"
    }
    res = requests.post(MOVIES_API, json=payload)
    assert res.status_code == 201 or res.status_code == 200
    movie = res.json()
    print("[CREATE]", movie)
    return movie["id"]

def test_get_all_movies():
    res = requests.get(MOVIES_API)
    assert res.status_code == 200
    print("[GET ALL]", res.json())

def test_get_movie_by_id(movie_id):
    res = requests.get(f"{MOVIES_API}/{movie_id}")
    assert res.status_code == 200
    print("[GET BY ID]", res.json())

def test_update_movie(movie_id):
    payload = {
        "title": "Matrix Reloaded",
        "description": "Secuela de Matrix.",
        "genre": "Sci-Fi",
        "imageUrl": "https://example.com/matrix2.jpg"
    }
    res = requests.put(f"{MOVIES_API}/{movie_id}", json=payload)
    print("[UPDATE STATUS]", res.status_code)
    print("[UPDATE BODY]", res.text)
    assert res.status_code == 200
    print("[UPDATE]", res.json())

def test_delete_movie(movie_id):
    res = requests.delete(f"{MOVIES_API}/{movie_id}")
    assert res.status_code == 200 or res.status_code == 204
    print("[DELETE]", res.text)

if __name__ == "__main__":
    movie_id = test_create_movie()
    time.sleep(1)
    test_get_all_movies()
    test_get_movie_by_id(movie_id)
    test_update_movie(movie_id)
    test_delete_movie(movie_id)