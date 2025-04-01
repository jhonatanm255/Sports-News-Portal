import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Timestamp } from "firebase/firestore";
import { COLLECTION_NAME } from "./constants";
import { deleteImage } from "./deleteImage";

export const checkAndDeleteExpiredArticles = async () => {
  try {
    const now = Timestamp.now();
    const q = query(
      collection(db, COLLECTION_NAME),
      where("autoDelete", "==", true),
      where("deleteAt", "<=", now)
    );

    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(async (doc) => {
      const article = doc.data();
      if (article.imageUrl) await deleteImage(article.imageUrl);
      await deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error eliminando artículos expirados:", error);
    throw error;
  }
};
