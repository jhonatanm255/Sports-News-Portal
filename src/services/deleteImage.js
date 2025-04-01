import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase/config";

export const deleteImage = async (imageUrl) => {
  try {
    const startIdx = imageUrl.indexOf("/o/") + 3;
    const endIdx = imageUrl.indexOf("?");
    const filePath = decodeURIComponent(imageUrl.substring(startIdx, endIdx));
    const imageRef = ref(storage, filePath);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error eliminando imagen:", error);
    throw error;
  }
};
