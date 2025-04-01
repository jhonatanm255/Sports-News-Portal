import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { COLLECTION_NAME } from "./constants";
import { deleteImage } from "./deleteImage";

export const deleteArticle = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const article = docSnap.data();
      if (article.imageUrl) await deleteImage(article.imageUrl);
    }

    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error eliminando artículo:", error);
    throw error;
  }
};
