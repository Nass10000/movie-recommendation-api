import requests
from textblob import TextBlob

API_URL = "http://localhost:3000/comments"

# 1. Obtener todos los comentarios
res = requests.get(API_URL)
comments = res.json()

# 2. Analizar cada comentario y enviar sentimiento al backend
print("\n📊 Análisis de sentimientos:")
for comment in comments:
    text = comment.get("content", "")
    comment_id = comment.get("id")

    # Analizar sentimiento
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    sentimiento = "negativo" if polarity < -0.1 else "neutro" if polarity < 0.1 else "positivo"

    print(f"🗨️ {text}")
    print(f"➡️ {sentimiento} ({polarity:.2f})")

    # 3. Enviar al backend
    update_url = f"{API_URL}/{comment_id}/sentiment"
    try:
        response = requests.put(update_url, json={"sentiment": sentimiento})
        print(f"✅ Actualizado: {response.status_code}")
    except Exception as e:
        print(f"❌ Error al actualizar: {e}")
