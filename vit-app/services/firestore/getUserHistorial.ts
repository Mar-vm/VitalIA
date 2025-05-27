import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export async function getUserHistorial(id_usuario: string) {
  const db = getFirestore();

  // 1. Traer historiales del usuario
  const historialQuery = query(
    collection(db, 'historial'),
    where('id_usuario', '==', id_usuario)
  );

  const historialSnapshot = await getDocs(historialQuery);
  const historialData = [];

  for (const histDoc of historialSnapshot.docs) {
    const { id_diagnostico } = histDoc.data();

    // 2. Traer el diagnóstico
    const diagDoc = await getDoc(doc(db, 'diagnosticos', id_diagnostico));
    const diagData = diagDoc.data();

    // 3. Traer detalles de la afección
    const afeccionDoc = await getDoc(doc(db, 'afecciones', diagData?.diagnostico));
    const afeccionData = afeccionDoc.data();

    historialData.push({
      archivo: diagData?.archivo,
      diagnostico: diagData?.diagnostico,
      es_maligno: diagData?.es_maligno,
      recomendacion: diagData?.recomendacion,
      afeccion: afeccionData,
    });
  }

  return historialData;
}
