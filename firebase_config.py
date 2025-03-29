import firebase_admin
from firebase_admin import credentials, firestore

# Cargar las credenciales
#cred = credentials.Certificate(r"C:\Users\maria\OneDrive\Documentos\TecNM ISC\6to Semestre ISC\IS\DB\vitalia-5695f-firebase-adminsdk-fbsvc-4d89c77bad.json")
 # Nombre del JSON de credenciales
#firebase_admin.initialize_app(cred)

# Conectar con Firestore
#db = firestore.client()
#print("Firestore conectado correctamente")


import firebase_admin
from firebase_admin import credentials, firestore, storage, auth

# Cargar las credenciales desde tu archivo JSON
cred = credentials.Certificate("C:/Users/maria/OneDrive/Documentos/TecNM ISC/6to Semestre ISC/IS/DB/vitalia-5695f-firebase-adminsdk-fbsvc-4d89c77bad.json")
firebase_admin.initialize_app(cred, {
    "storageBucket": "tu-proyecto.appspot.com"
})

# Conexión con Firestore
db = firestore.client()
bucket = storage.bucket()
