import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadImage = async (file, fileName) => {
  try {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Tipo de archivo no soportado");
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("El archivo es demasiado grande (máximo 5MB)");
    }

    const storageRef = ref(storage, `articles/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
    });
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    throw error;
  }
};
