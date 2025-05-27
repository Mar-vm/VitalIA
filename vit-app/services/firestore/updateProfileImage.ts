import { getFirestore, doc, updateDoc } from 'firebase/firestore';

export const updateProfileImageUrl = async (uid: string, url: string) => {
  const db = getFirestore();
  const ref = doc(db, 'usuarios', uid);
  await updateDoc(ref, { foto: url });
};
 

