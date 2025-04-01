import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { COLLECTION_NAME } from "./constants";

export const cancelAutoDelete = async (articleId) => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, articleId), {
      autoDelete: false,
      deleteAt: null,
    });
    return true;
  } catch (error) {
    console.error("Error cancelando auto-eliminación:", error);
    throw error;
  }
};
