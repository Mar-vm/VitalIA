import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function getCatalogo() {
  const snapshot = await getDocs(collection(db, "catalogo"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
