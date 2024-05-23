import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";
export const uploadFile = async (file: File): Promise<string> => {
  const fileRef = ref(storage, `files/${uuidv4()}_${file.name}`);
  await uploadBytes(fileRef, file);
  const fileURL = await getDownloadURL(fileRef);
  return fileURL;
};
