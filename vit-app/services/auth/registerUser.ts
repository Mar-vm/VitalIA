import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";

export async function registerUser(email: string, password: string, name: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // Guardar datos del usuario en Firestore
  await setDoc(doc(db, "users", uid), {
    name,
    email,
    historial: []
  });

  return uid;
}
