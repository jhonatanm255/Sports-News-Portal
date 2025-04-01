import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { COLLECTION_NAME } from "./constants";

export const getArticlesByCategory = async (
  category,
  limitCount = 10,
  lastDoc = null
) => {
  try {
    let q;
    if (lastDoc) {
      q = query(
        collection(db, COLLECTION_NAME),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(limitCount)
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      deleteAtFormatted: doc.data().deleteAt?.toDate().toLocaleString(),
    }));

    return { articles, lastVisible };
  } catch (error) {
    console.error("Error obteniendo artículos por categoría:", error);
    throw error;
  }
};
