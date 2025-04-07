from firebase_config import db

# Crear imagen
def crear_imagen(id_imagen, id_usuario, parte_cuerpo, url, fecha, analizada):
    try:
        db.collection("imagenes").document(id_imagen).set({
            "id_usuario": id_usuario,
            "parte_cuerpo": parte_cuerpo,
            "url": url,
            "fecha": fecha,
            "analizada": analizada
        })
        return {"mensaje": f"Imagen {id_imagen} guardada"}
    except Exception as e:
        return {"error": str(e)}

# Leer imagen
def leer_imagen(id_imagen):
    try:
        imagen = db.collection("imagenes").document(id_imagen).get()
        return imagen.to_dict() if imagen.exists else {"mensaje": "Imagen no encontrada"}
    except Exception as e:
        return {"error": str(e)}

# Actualizar imagen
def actualizar_imagen(id_imagen, nuevos_datos):
    try:
        db.collection("imagenes").document(id_imagen).update(nuevos_datos)
        return {"mensaje": f"Imagen {id_imagen} actualizada"}
    except Exception as e:
        return {"error": str(e)}

# Eliminar imagen
def eliminar_imagen(id_imagen):
    try:
        db.collection("imagenes").document(id_imagen).delete()
        return {"mensaje": f"Imagen {id_imagen} eliminada"}
    except Exception as e:
        return {"error": str(e)}
