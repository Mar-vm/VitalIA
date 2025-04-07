from crud.usuarios import crear_usuario, leer_usuario, actualizar_usuario, eliminar_usuario
from crud.imagenes import crear_imagen, leer_imagen, actualizar_imagen#, eliminar_imagen
from crud.diagnosticos import crear_diagnostico, leer_diagnostico#, actualizar_diagnostico, eliminar_diagnostico
from crud.afecciones import crear_afeccion, leer_afeccion#, actualizar_afeccion, eliminar_afeccion
from crud.historial import crear_historial, leer_historial#, eliminar_historial

def test_crud():
    print("\n🚀 PROBANDO FIRESTORE CRUD 🚀\n")

    # CREAR UN USUARIO
    crear_usuario(
        "user_002",
        {"nombre": "Angel", "apellido": "Vargas", "edad": 21, "genero": "Masculino", "correo": "angel@gmail.com"},
        {"tono_piel": "Morena", "tipo_piel": "Mixta"},
        {"nombre_e": "Latina", "descripcion_e": "Piel normal"},
        [{"tipo": "Alergia", "nombre_pad": "Dermatitis", "fecha_detec": "2023-06-15"}]
    )

    # LEER USUARIO
    leer_usuario("user_002")

    # ACTUALIZAR USUARIO
    actualizar_usuario("user_002", {"edad": 21})
    leer_usuario("user_002")

    # CREAR UNA IMAGEN
    crear_imagen("img_002", "user_002", "brazo", "https://mis-imagenes.com/foto2.jpg", "2025-03-26", False)

    # LEER IMAGEN
    leer_imagen("img_002")

    # ACTUALIZAR IMAGEN
    actualizar_imagen("img_002", {"analizada": True})
    leer_imagen("img_002")

    # CREAR UN DIAGNÓSTICO
    crear_diagnostico("diag_002", "img_002", "afeccion_002", "2025-03-26")

    # LEER DIAGNÓSTICO
    leer_diagnostico("diag_002")

    # CREAR UNA AFECCIÓN
    crear_afeccion("afeccion_002", "Eccema", "Eccema", "Pomada", "Inflamación de la piel", "https://dermatologia.com/eccema")

    # LEER AFECCIÓN
    leer_afeccion("afeccion_002")

    # CREAR HISTORIAL
    crear_historial("hist_002", "diag_002")

    # LEER HISTORIAL
    leer_historial("hist_002")

    # ELIMINAR TODOS LOS DATOS (Prueba de borrado)
    #eliminar_historial("hist_001")
    #eliminar_diagnostico("diag_001")
    #eliminar_afeccion("afeccion_001")
    #eliminar_imagen("img_001")
    #eliminar_usuario("user_001")

    print("\nTEST FINALIZADO: FIRESTORE FUNCIONA\n")

if __name__ == "__main__":
    test_crud()
