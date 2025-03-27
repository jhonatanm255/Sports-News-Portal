import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../config";

// Actualizar artículo
export const updateArticle = async (id, articleData) => {
  let autoDeleteData = {};
  if (articleData.autoDelete !== undefined) {
    autoDeleteData = articleData.autoDelete
      ? {
          autoDelete: true,
          deleteAt: Timestamp.fromDate(
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          ), // 30 días desde ahora
        }
      : { autoDelete: false, deleteAt: null };
  }

  await updateDoc(doc(db, "articles", id), {
    ...articleData,
    ...autoDeleteData,
    updatedAt: serverTimestamp(),
  });

  return { id, ...articleData };
};
