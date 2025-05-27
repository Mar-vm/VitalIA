import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";


export const getProfileData = async (uid: string) => {
  const result: any = {};

  // 🔹 datos_personales
  const docPers = await getDoc(doc(db, 'usuarios', uid, 'datos_personales', 'info'));
  result.personales = docPers.exists() ? docPers.data() : {};

  // 🔹 caract_piel
  const docPiel = await getDoc(doc(db, 'usuarios', uid, 'caract_piel', 'info'));
  result.piel = docPiel.exists() ? docPiel.data() : {};

  // 🔹 etnia
  const docEtnia = await getDoc(doc(db, 'usuarios', uid, 'etnia', 'info'));
  result.etnia = docEtnia.exists() ? docEtnia.data() : {};

  // 🔹 historial_clinico (0 a muchos)
  const historialSnap = await getDocs(collection(db, 'usuarios', uid, 'historial_clinico'));
  result.historial = historialSnap.docs.map(doc => doc.data());

  return result;
  console.log('📥 Consultando datos para UID:', uid);
  console.log('📤 Resultado final:', result);
};



