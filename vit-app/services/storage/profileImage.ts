import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadProfileImage = async (uid: string, uri: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storage = getStorage();
  const imageRef = ref(storage, `perfil/${uid}.jpg`);
  await uploadBytes(imageRef, blob);
  return await getDownloadURL(imageRef);
};
