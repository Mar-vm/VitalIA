from firebase_config import db

# Crear usuario con subcolecciones
def crear_usuario(id_usuario, datos_personales, caract_piel, etnia, historial_clinico):
    try:
        usuario_ref = db.collection("usuarios").document(id_usuario)
        
        usuario_ref.collection("datos_personales").document("info").set(datos_personales)
        usuario_ref.collection("caract_piel").document("info").set(caract_piel)
        usuario_ref.collection("etnia").document("info").set(etnia)

        historial_ref = usuario_ref.collection("historial_clinico")
        for h in historial_clinico:
            historial_ref.add(h)

        return {"mensaje": f"Usuario {id_usuario} creado exitosamente"}
    except Exception as e:
        return {"error": str(e)}

# Leer usuario y sus subcolecciones
def leer_usuario(id_usuario):
    try:
        usuario_ref = db.collection("usuarios").document(id_usuario)
        datos = usuario_ref.collection("datos_personales").document("info").get()
        caract = usuario_ref.collection("caract_piel").document("info").get()
        etnia = usuario_ref.collection("etnia").document("info").get()
        historial = usuario_ref.collection("historial_clinico").stream()

        return {
            "datos_personales": datos.to_dict() if datos.exists else "No encontrados",
            "caracteristicas_piel": caract.to_dict() if caract.exists else "No encontradas",
            "etnia": etnia.to_dict() if etnia.exists else "No encontrada",
            "historial_clinico": [h.to_dict() for h in historial]
        }
    except Exception as e:
        return {"error": str(e)}
