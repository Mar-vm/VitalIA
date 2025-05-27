const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, addDoc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBKn9DishqwelE5PiqTKR480a_HqRwWCDI",
  authDomain: "vitalia-5695f.firebaseapp.com",
  projectId: "vitalia-5695f",
  storageBucket: "vitalia-5695f.appspot.com",
  messagingSenderId: "1062696153279",
  appId: "1:1062696153279:web:c029255c942775333fd60a",
  measurementId: "G-1EWD7TTMB2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ⚙️ Función para registrar un nuevo diagnóstico + historial
async function registrarDiagnostico(uid, diagnosticoId, archivo = 'foto.jpg', probabilidad = '90%') {
  try {
    // 1. Buscar datos de la afección
    const afeccionRef = doc(db, 'afecciones', diagnosticoId);
    const afeccionSnap = await getDoc(afeccionRef);

    if (!afeccionSnap.exists()) {
      console.error(`❌ No se encontró la afección "${diagnosticoId}" en la colección "afecciones"`);
      return;
    }

    const afeccion = afeccionSnap.data();

    // 2. Crear documento en "diagnosticos"
    const diagRef = await addDoc(collection(db, 'diagnosticos'), {
      usuario: uid,
      archivo,
      diagnostico: diagnosticoId,
      es_maligno: diagnosticoId === 'mel', // Personalízalo según lógica real
      recomendacion: afeccion.recomendaciones,
      fecha: new Date().toLocaleDateString('es-MX'),
      probabilidad
    });

    console.log(`✅ Diagnóstico registrado con ID: ${diagRef.id}`);

    // 3. Crear documento en "historial"
    await addDoc(collection(db, 'historial'), {
      id_usuario: uid,
      id_diagnostico: diagRef.id
    });

    console.log('📜 Historial asociado correctamente.');

  } catch (error) {
    console.error(`❌ Error al registrar diagnóstico: ${error.message}`);
  }
}

// 🧪 Ejemplo de uso
registrarDiagnostico('I6oxm8FIdBP1Ec93na2jLoUYI3f1', 'nv', 'foto_test.jpg', '88%')