from firebase_config import db

# Crear historial
def crear_historial(id_historial, id_diagnostico):
    try:
        db.collection("historial").document(id_historial).set({
            "id_diagnostico": id_diagnostico
        })
        return {"mensaje": f"Historial {id_historial} registrado"}
    except Exception as e:
        return {"error": str(e)}

# Leer historial
def leer_historial(id_historial):
    try:
        historial = db.collection("historial").document(id_historial).get()
        return historial.to_dict() if historial.exists else {"mensaje": "Historial no encontrado"}
    except Exception as e:
        return {"error": str(e)}

# Eliminar historial
def eliminar_historial(id_historial):
    try:
        db.collection("historial").document(id_historial).delete()
        return {"mensaje": f"Historial {id_historial} eliminado"}
    except Exception as e:
        return {"error": str(e)}
