import { ref, deleteObject } from "firebase/storage";
import { storage } from "../config";

// Eliminar imagen de Firebase Storage
export const deleteImage = async (imageUrl) => {
  const startIdx = imageUrl.indexOf("/o/") + 3;
  const endIdx = imageUrl.indexOf("?");
  const filePath = decodeURIComponent(imageUrl.substring(startIdx, endIdx));

  const imageRef = ref(storage, filePath);
  await deleteObject(imageRef);
  return true;
};
