import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config";

// Crear un nuevo artículo
export const createArticle = async (articleData) => {
  const autoDeleteData = articleData.autoDelete
    ? {
        autoDelete: true,
        deleteAt: Timestamp.fromDate(
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        ), // 30 días desde ahora
      }
    : { autoDelete: false };

  const article = {
    ...articleData,
    ...autoDeleteData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "articles"), article);
  return { id: docRef.id, ...article };
};
