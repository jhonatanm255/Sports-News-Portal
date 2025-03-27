import {
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../config";

// Obtener artículos destacados
export const getFeaturedArticles = async (limitCount = 5) => {
  const q = query(
    collection(db, "articles"),
    where("featured", "==", true),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
