import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";

// Obtener artículo por ID
export const getArticleById = async (id) => {
  const docRef = doc(db, "articles", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};
