from firebase_config import db

# Crear afección
def crear_afeccion(id_afeccion, n_comun, n_cientifico, recomendaciones, descripcion, recurso):
    try:
        db.collection("afecciones").document(id_afeccion).set({
            "n_comun": n_comun,
            "n_cientifico": n_cientifico,
            "recomendaciones": recomendaciones,
            "descripcion": descripcion,
            "recurso": recurso
        })
        return {"mensaje": f"Afección {id_afeccion} guardada exitosamente"}
    except Exception as e:
        return {"error": str(e)}

# Leer afección
def leer_afeccion(id_afeccion):
    try:
        afeccion = db.collection("afecciones").document(id_afeccion).get()
        return afeccion.to_dict() if afeccion.exists else {"mensaje": "Afección no encontrada"}
    except Exception as e:
        return {"error": str(e)}

# Actualizar afección
def actualizar_afeccion(id_afeccion, nuevos_datos):
    try:
        db.collection("afecciones").document(id_afeccion).update(nuevos_datos)
        return {"mensaje": f"Afección {id_afeccion} actualizada"}
    except Exception as e:
        return {"error": str(e)}

# Eliminar afección
def eliminar_afeccion(id_afeccion):
    try:
        db.collection("afecciones").document(id_afeccion).delete()
        return {"mensaje": f"Afección {id_afeccion} eliminada"}
    except Exception as e:
        return {"error": str(e)}
