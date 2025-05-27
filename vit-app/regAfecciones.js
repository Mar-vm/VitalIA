const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc } = require('firebase/firestore');

// Configuración Firebase
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

// Lista de afecciones HAM10000
const afecciones = [
  {
    id: 'akiec',
    n_comun: 'Queratosis actínica',
    n_cientifico: 'Actinic keratosis / Bowen’s disease',
    descripcion: 'Lesión precancerosa causada por daño solar prolongado.',
    recomendaciones: 'Consultar dermatología para evaluación temprana.',
    recurso: 'https://dermatologia.com/akiec'
  },
  {
    id: 'bcc',
    n_comun: 'Carcinoma basocelular',
    n_cientifico: 'Basal cell carcinoma',
    descripcion: 'Cáncer de piel de crecimiento lento pero invasivo.',
    recomendaciones: 'Requiere extirpación quirúrgica o tratamiento especializado.',
    recurso: 'https://dermatologia.com/bcc'
  },
  {
    id: 'bkl',
    n_comun: 'Lesión benigna de queratina',
    n_cientifico: 'Benign keratosis-like lesion',
    descripcion: 'Manchas inofensivas por acumulación de queratina.',
    recomendaciones: 'Vigilancia y protección solar, suele ser inofensiva.',
    recurso: 'https://dermatologia.com/bkl'
  },
  {
    id: 'df',
    n_comun: 'Dermatofibroma',
    n_cientifico: 'Dermatofibroma',
    descripcion: 'Lesión benigna firme y de color marrón en la piel.',
    recomendaciones: 'No suele requerir tratamiento, excepto por motivos estéticos.',
    recurso: 'https://dermatologia.com/df'
  },
  {
    id: 'nv',
    n_comun: 'Nevus melanocítico',
    n_cientifico: 'Melanocytic nevi',
    descripcion: 'Lunares comunes formados por melanocitos agrupados.',
    recomendaciones: 'Autoexploración regular, evaluar cambios sospechosos.',
    recurso: 'https://dermatologia.com/nv'
  },
  {
    id: 'vasc',
    n_comun: 'Lesión vascular',
    n_cientifico: 'Vascular lesion',
    descripcion: 'Anomalías vasculares como angiomas o malformaciones.',
    recomendaciones: 'Revisión médica si cambian de tamaño o color.',
    recurso: 'https://dermatologia.com/vasc'
  },
  {
    id: 'mel',
    n_comun: 'Melanoma',
    n_cientifico: 'Melanoma',
    descripcion: 'Cáncer de piel altamente agresivo y potencialmente mortal.',
    recomendaciones: 'Consulta urgente con dermatólogo. Alta prioridad médica.',
    recurso: 'https://dermatologia.com/mel'
  }
];

// Registrar en Firebase
async function registrarAfeccionesHAM() {
  for (const afeccion of afecciones) {
    try {
      await setDoc(doc(db, 'afecciones', afeccion.id), afeccion);
      console.log(`✅ Afección "${afeccion.n_comun}" registrada como "${afeccion.id}"`);
    } catch (error) {
      console.error(`❌ Error registrando "${afeccion.id}": ${error.message}`);
    }
  }
}

registrarAfeccionesHAM();
