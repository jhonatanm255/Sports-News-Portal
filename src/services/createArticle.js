import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { Timestamp } from "firebase/firestore";
import { COLLECTION_NAME, AUTO_DELETE_SETTINGS } from "./constants";

export const createArticle = async (articleData) => {
  try {
    const isDev = process.env.NODE_ENV === "development";
    const deleteMins = isDev
      ? AUTO_DELETE_SETTINGS.development
      : AUTO_DELETE_SETTINGS.production;

    const article = {
      ...articleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      autoDelete: articleData.autoDelete || false,
      deleteAt: articleData.autoDelete
        ? Timestamp.fromDate(new Date(Date.now() + deleteMins * 60 * 1000))
        : null,
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), article);
    return { id: docRef.id, ...article };
  } catch (error) {
    console.error("Error creando artículo:", error);
    throw error;
  }
};
