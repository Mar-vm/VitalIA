import firebase_admin
from firebase_admin import credentials, firestore

# ---------- Proyecto Origen ----------
cred_origen = credentials.Certificate("credenciales/vitalia.json")
app_origen = firebase_admin.initialize_app(cred_origen, name='origen')
db_origen = firestore.client(app_origen)

# ---------- Proyecto Clon ----------
cred_clon = credentials.Certificate("credenciales/vitalia-test.json")
app_clon = firebase_admin.initialize_app(cred_clon, name='clon')
db_clon = firestore.client(app_clon)

# ---------- Clonar todas las colecciones ----------
def clonar_coleccion(coleccion):
    print(f"Clonando colección: {coleccion}")
    docs = db_origen.collection(coleccion).stream()
    for doc in docs:
        db_clon.collection(coleccion).document(doc.id).set(doc.to_dict())
        print(f"✔ Copiado: {doc.id}")

# Lista de colecciones que quieres clonar
colecciones = ['afecciones','diagnosticos','historial','imagenes','usuarios']  # cámbialo según tu base

for col in colecciones:
    clonar_coleccion(col)

print("✅ Clonación completada.")
