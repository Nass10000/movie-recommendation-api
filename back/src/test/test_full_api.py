# test_full_api.py
import schemathesis

# Carga tu especificación OpenAPI desde la ruta expuesta en main.ts:
schema = schemathesis.from_uri("http://localhost:3000/swagger-json")

@schema.parametrize()
def test_all_endpoints(case):
    """
    Schemathesis iterará automáticamente por cada path y método de tu spec,
    hará la petición y validará código de respuesta y esquema de datos.
    """
    response = case.call()
    case.validate_response(response)

# Para ejecutar:
# 1) Arranca tu servidor NestJS en puerto 3000
# 2) pip install schemathesis pytest
# 3) pytest -q test_full_api.py
