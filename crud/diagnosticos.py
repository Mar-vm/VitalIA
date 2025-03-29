from firebase_config import db

# Crear diagnóstico
def crear_diagnostico(id_diagnostico, id_imagen, id_afeccion, fecha):
    try:
        db.collection("diagnosticos").document(id_diagnostico).set({
            "id_imagen": id_imagen,
            "id_afeccion": id_afeccion,
            "fecha": fecha
        })
        return {"mensaje": f"Diagnóstico {id_diagnostico} registrado"}
    except Exception as e:
        return {"error": str(e)}

# Leer diagnóstico
def leer_diagnostico(id_diagnostico):
    try:
        diag = db.collection("diagnosticos").document(id_diagnostico).get()
        return diag.to_dict() if diag.exists else {"mensaje": "Diagnóstico no encontrado"}
    except Exception as e:
        return {"error": str(e)}

# Actualizar diagnóstico
def actualizar_diagnostico(id_diagnostico, nuevos_datos):
    try:
        db.collection("diagnosticos").document(id_diagnostico).update(nuevos_datos)
        return {"mensaje": f"Diagnóstico {id_diagnostico} actualizado"}
    except Exception as e:
        return {"error": str(e)}

# Eliminar diagnóstico
def eliminar_diagnostico(id_diagnostico):
    try:
        db.collection("diagnosticos").document(id_diagnostico).delete()
        return {"mensaje": f"Diagnóstico {id_diagnostico} eliminado"}
    except Exception as e:
        return {"error": str(e)}
