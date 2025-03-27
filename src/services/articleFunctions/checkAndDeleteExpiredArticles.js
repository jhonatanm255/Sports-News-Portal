import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config";
import { deleteImage } from "./deleteImage";

// Verificar y eliminar artículos expirados
export const checkAndDeleteExpiredArticles = async () => {
  const now = Timestamp.now();
  const q = query(
    collection(db, "articles"),
    where("autoDelete", "==", true),
    where("deleteAt", "<=", now)
  );

  const querySnapshot = await getDocs(q);
  const deleteImagePromises = querySnapshot.docs.map(async (doc) => {
    const article = doc.data();
    if (article.imageUrl) {
      await deleteImage(article.imageUrl);
    }
  });

  await Promise.all(deleteImagePromises);

  const deleteDocPromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deleteDocPromises);

  return querySnapshot.docs.length;
};
