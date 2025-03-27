import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../config";

// Buscar artículos (búsqueda simple en cliente)
export const searchArticles = async (searchTerm, limitCount = 10) => {
  const q = query(
    collection(db, "articles"),
    orderBy("title"),
    limit(limitCount)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.content &&
          article.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
};
