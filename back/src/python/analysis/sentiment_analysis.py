import requests
from sentiment_analysis_spanish import sentiment_analysis

API_URL = "http://localhost:3000/comments"
analyzer = sentiment_analysis.SentimentAnalysisSpanish()

# 1. Obtener todos los comentarios
res = requests.get(API_URL)
comments = res.json()

print("\n📊 Análisis de sentimientos:")
for comment in comments:
    text = comment.get("content", "")
    comment_id = comment.get("id")

    # Analizar sentimiento en español
    score = analyzer.sentiment(text)
    
    frases_positivas = [
        "mejor", "espectacular", "excelente", "increíble", "maravillosa", "fantástica",
        "impresionante", "fascinante", "emocionante", "divertida", "genial", "asombrosa",
        "inolvidable", "brillante", "apasionante", "magnífica", "sorprendente", "perfecta",
        "grandiosa", "admirable", "recomendada", "preciosa", "hermosa", "encantadora",
        "maravilla", "top", "superior", "destacada", "única", "impactante", "fenomenal"
    ]

    if any(palabra in text.lower() for palabra in frases_positivas):
        sentimiento = "positivo"
    elif score < 0.2:
        sentimiento = "negativo"
    elif score < 0.4:
        sentimiento = "neutro"
    else:
        sentimiento = "positivo"

    print(f"🗨️ {text}")
    print(f"➡️ {sentimiento} ({score:.2f})")

    # 3. Enviar al backend
    update_url = f"{API_URL}/{comment_id}/sentiment"
    try:
        response = requests.put(update_url, json={"sentiment": sentimiento})
        print(f"✅ Actualizado: {response.status_code}")
    except Exception as e:
        print(f"❌ Error al actualizar: {e}")
