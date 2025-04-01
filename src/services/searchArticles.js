import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { COLLECTION_NAME } from "./constants";

export const searchArticles = async (searchTerm, limitCount = 10) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("title"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        deleteAtFormatted: doc.data().deleteAt?.toDate().toLocaleString(),
      }))
      .filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (article.content &&
            article.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  } catch (error) {
    console.error("Error buscando artículos:", error);
    throw error;
  }
};
