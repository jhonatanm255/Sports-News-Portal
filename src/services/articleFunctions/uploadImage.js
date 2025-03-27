import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config";

// Subir imagen a Firebase Storage
export const uploadImage = async (file, fileName) => {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error("Tipo de archivo no soportado");
  }

  if (file.size > maxSize) {
    throw new Error("El archivo es demasiado grande (máximo 5MB)");
  }

  const storageRef = ref(storage, `articles/${fileName}`);
  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type,
  });
  return await getDownloadURL(snapshot.ref);
};
