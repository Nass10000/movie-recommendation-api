import requests

API_URL = "http://localhost:3000/movies"

def post_movie(movie):
    data = {
        "title": movie.get("title"),
        "description": movie.get("plot")[0] if movie.get("plot") else "",
        "releaseYear": movie.get("year"),
        "rating": movie.get("rating"),
        "image": "",  # Aquí puedes scrapear el poster después
    }

    try:
        res = requests.post(API_URL, json=data)
        print(f"✅ Película enviada: {res.status_code} - {res.json()}")
    except Exception as e:
        print(f"❌ Error al enviar película: {e}")
