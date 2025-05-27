// Firebase Admin Web SDK
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKn9DishqwelE5PiqTKR480a_HqRwWCDI",
  authDomain: "vitalia-5695f.firebaseapp.com",
  projectId: "vitalia-5695f",
  storageBucket: "vitalia-5695f.firebasestorage.app",
  messagingSenderId: "1062696153279",
  appId: "1:1062696153279:web:c029255c942775333fd60a",
  measurementId: "G-1EWD7TTMB2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para crear usuario y sus datos asociados
async function crearUsuarioTest(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Documento raíz
    await setDoc(doc(db, 'usuarios', uid), {
      email,
      creado_en: new Date()
    });

    // Subcolecciones
    await setDoc(doc(db, 'usuarios', uid, 'datos_personales', 'info'), {
      nombre: 'Mariana',
      apellido: 'Molina',
      edad: '20',
      genero: 'Femenino',
    });

    await setDoc(doc(db, 'usuarios', uid, 'caract_piel', 'info'), {
      tipo_piel: 'Mixta',
      tono_piel: 'Morena',
    });

    await setDoc(doc(db, 'usuarios', uid, 'etnia', 'info'), {
      etnia: 'Mexican',
      descripcion: 'Piel normal y asi jeje',
    });

    await setDoc(doc(db, 'usuarios', uid, 'historial_clinico', 'pad_1'), {
      padecimiento: 'AIJ',
      fecha_det: '2017',
      tipo: 'malasuerte'
    });
    
    await setDoc(doc(db, 'usuarios', uid, 'historial_clinico', 'pad_2'), {
      padecimiento: 'Acné',
      fecha_det: '2021',
      tipo: 'crónico'
    });
    

    console.log(`✅ Usuario creado con UID: ${uid}`);
  } catch (error) {
    console.error(`❌ Error al crear usuario: ${error.message}`);
  }
}

// 👉 Ejecutar (puedes cambiar este email y password para cada prueba)
//crearUsuarioTest('mar@example.com', 'mar123');
