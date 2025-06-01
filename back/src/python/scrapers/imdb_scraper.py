from imdb import IMDb

# Inicializa el cliente
ia = IMDb()

# Buscar una película por título
query = input("🔎 Ingresa el nombre de la película: ")
results = ia.search_movie(query)

if not results:
    print("❌ No se encontró ninguna película.")
else:
    movie = results[0]

ia.update(movie)
poster_url = movie.get('cover url')
print(f"🖼️ Poster: {poster_url}")
movie['poster'] = poster_url

print("\n🎬 Resultados:")
print(f"📌 Título: {movie.get('title')}")
print(f"📅 Año: {movie.get('year')}")
print(f"⭐ Rating: {movie.get('rating')}")
print(f"📝 Sinopsis: {movie.get('plot')[0] if movie.get('plot') else 'No disponible'}")
