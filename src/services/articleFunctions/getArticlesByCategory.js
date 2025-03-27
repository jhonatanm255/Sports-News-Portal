import {
  query,
  collection,
  where,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../config";

// Obtener artículos por categoría
export const getArticlesByCategory = async (
  category,
  limitCount = 10,
  lastDoc = null
) => {
  let q;
  if (lastDoc) {
    q = query(
      collection(db, "articles"),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(limitCount)
    );
  } else {
    q = query(
      collection(db, "articles"),
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
  }));

  return { articles, lastVisible };
};
