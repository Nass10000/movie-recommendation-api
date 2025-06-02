import requests
import time

MOVIES_API = "http://localhost:3000/movies"
COMMENTS_API = "http://localhost:3000/comments"

# 1. Crear una película
movie_payload = {
    "title": "Interstellar",
    "description": "Ciencia ficción sobre viajes interestelares.",
    "genre": "Sci-Fi",
    "imageUrl": "https://example.com/interstellar.jpg"
}
res = requests.post(MOVIES_API, json=movie_payload)
print("[MOVIE CREATED]", res.status_code)
print("[RESPONSE BODY]", res.text)
movie_id = res.json()["id"]

# Esperar 1 segundo si el backend tarda en guardar
time.sleep(1)

# 2. Crear comentario
comment_payload = {
    "content": "Una de las mejores películas que he visto.",
    "movieId": movie_id,
    "userId": "00000000-0000-0000-0000-000000000001"
}

res = requests.post(COMMENTS_API, json=comment_payload)
print("[COMMENT CREATED]", res.status_code, res.json())
comment = res.json()
comment_id = comment['id']

# 3. Listar todos los comentarios
res = requests.get(COMMENTS_API)
print("[LIST ALL COMMENTS]", res.status_code, res.json())

# 4. Obtener comentario por ID
res = requests.get(f"{COMMENTS_API}/{comment_id}")
print("[GET COMMENT BY ID]", res.status_code, res.json())

# 5. Actualizar comentario
update_payload = {
    "content": "La trama y la música fueron espectaculares.",
    "movieId": movie_id
}
res = requests.put(f"{COMMENTS_API}/{comment_id}", json=update_payload)
print("[COMMENT UPDATED]", res.status_code, res.json())

# 6. Eliminar comentario
res = requests.delete(f"{COMMENTS_API}/{comment_id}")
print("[COMMENT DELETED]", res.status_code, res.text)
