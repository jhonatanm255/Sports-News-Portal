import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { COLLECTION_NAME } from "./constants";

export const getArticleById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        deleteAtFormatted: data.deleteAt?.toDate().toLocaleString(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error obteniendo artículo:", error);
    throw error;
  }
};
