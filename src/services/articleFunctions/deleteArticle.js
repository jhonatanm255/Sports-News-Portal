import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import { deleteImage } from "./deleteImage";

// Eliminar artículo (incluyendo su imagen si existe)
export const deleteArticle = async (id) => {
  const docRef = doc(db, "articles", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const article = docSnap.data();
    if (article.imageUrl) {
      await deleteImage(article.imageUrl);
    }
  }

  await deleteDoc(docRef);
  return true;
};
