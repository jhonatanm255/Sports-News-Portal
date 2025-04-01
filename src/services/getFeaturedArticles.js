import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { COLLECTION_NAME } from "./constants";

export const getFeaturedArticles = async (limitCount = 5) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      deleteAtFormatted: doc.data().deleteAt?.toDate().toLocaleString(),
    }));
  } catch (error) {
    console.error("Error obteniendo artículos destacados:", error);
    throw error;
  }
};
