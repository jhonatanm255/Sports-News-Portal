import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { Timestamp } from "firebase/firestore";
import { COLLECTION_NAME, AUTO_DELETE_SETTINGS } from "./constants";

export const updateArticle = async (id, articleData) => {
  try {
    const isDev = process.env.NODE_ENV === "development";
    const deleteMins = isDev
      ? AUTO_DELETE_SETTINGS.development
      : AUTO_DELETE_SETTINGS.production;

    const docRef = doc(db, COLLECTION_NAME, id);
    const updates = {
      ...articleData,
      updatedAt: serverTimestamp(),
    };

    if (articleData.autoDelete !== undefined) {
      updates.autoDelete = articleData.autoDelete;
      updates.deleteAt = articleData.autoDelete
        ? Timestamp.fromDate(new Date(Date.now() + deleteMins * 60 * 1000))
        : null;
    }

    await updateDoc(docRef, updates);
    return { id, ...updates };
  } catch (error) {
    console.error("Error actualizando artículo:", error);
    throw error;
  }
};
