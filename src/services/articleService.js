// import {
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   where,
//   orderBy,
//   limit,
//   startAfter,
//   serverTimestamp,
//   Timestamp,
// } from "firebase/firestore";
// import { db } from "../firebase/config";
// import supabase from "../supabase/config";

// const COLLECTION_NAME = "articles";

// // Subir imagen a Supabase Storage
// export const uploadImage = async (file, fileName) => {
//   try {
//     const { data, error } = await supabase.storage
//       .from("news-images")
//       .upload(`articles/${fileName}`, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (error) throw error;

//     // Obtener URL pública
//     const { data: urlData } = supabase.storage
//       .from("news-images")
//       .getPublicUrl(`articles/${fileName}`);

//     return urlData.publicUrl;
//   } catch (error) {
//     console.error("Error subiendo imagen:", error);
//     throw error;
//   }
// };

// // Crear un nuevo artículo
// export const createArticle = async (articleData) => {
//   try {
//     // Agregar flag de auto-eliminación si está habilitado
//     const autoDeleteData = articleData.autoDelete
//       ? {
//           autoDelete: true,
//           deleteAt: Timestamp.fromDate(
//             new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días desde ahora
//           ),
//         }
//       : { autoDelete: false };

//     // Agregar timestamp del servidor
//     const article = {
//       ...articleData,
//       ...autoDeleteData,
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     };

//     const docRef = await addDoc(collection(db, COLLECTION_NAME), article);
//     return { id: docRef.id, ...article };
//   } catch (error) {
//     console.error("Error creando artículo:", error);
//     throw error;
//   }
// };

// // Obtener artículo por ID
// export const getArticleById = async (id) => {
//   try {
//     const docRef = doc(db, COLLECTION_NAME, id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return { id: docSnap.id, ...docSnap.data() };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error obteniendo artículo:", error);
//     throw error;
//   }
// };

// // Actualizar artículo
// export const updateArticle = async (id, articleData) => {
//   try {
//     const docRef = doc(db, COLLECTION_NAME, id);

//     // Manejar cambios en el flag de auto-eliminación
//     let autoDeleteData = {};
//     if (articleData.autoDelete !== undefined) {
//       autoDeleteData = articleData.autoDelete
//         ? {
//             autoDelete: true,
//             deleteAt: Timestamp.fromDate(
//               new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días desde ahora
//             ),
//           }
//         : { autoDelete: false, deleteAt: null };
//     }

//     // Actualizar el documento
//     await updateDoc(docRef, {
//       ...articleData,
//       ...autoDeleteData,
//       updatedAt: serverTimestamp(),
//     });

//     return { id, ...articleData };
//   } catch (error) {
//     console.error("Error actualizando artículo:", error);
//     throw error;
//   }
// };

// // Eliminar artículo
// export const deleteArticle = async (id) => {
//   try {
//     const docRef = doc(db, COLLECTION_NAME, id);
//     await deleteDoc(docRef);
//     return true;
//   } catch (error) {
//     console.error("Error eliminando artículo:", error);
//     throw error;
//   }
// };

// // Obtener artículos destacados
// export const getFeaturedArticles = async (limitCount = 5) => {
//   try {
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       where("featured", "==", true), // Solo artículos destacados
//       orderBy("createdAt", "desc"),
//       limit(limitCount)
//     );

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error("Error obteniendo artículos destacados:", error);
//     throw error;
//   }
// };

// // Obtener artículos normales (no destacados y no complementarios)
// // Obtener artículos normales (no destacados y no complementarios)
// export const getLatestArticles = async (limitCount = 10) => {
//   try {
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       where("featured", "==", false), // Excluye artículos destacados
//       where("is_complementary", "==", false), // Excluye artículos complementarios
//       orderBy("createdAt", "desc"), // Ordena por fecha de creación
//       limit(limitCount) // Limita el número de resultados
//     );

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error("Error obteniendo últimas noticias:", error);
//     throw error;
//   }
// };

// // Obtener artículos complementarios
// export const getComplementaryArticles = async (limitCount = 6) => {
//   try {
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       where("is_complementary", "==", true), // Solo artículos complementarios
//       orderBy("createdAt", "desc"),
//       limit(limitCount)
//     );

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error("Error obteniendo artículos complementarios:", error);
//     throw error;
//   }
// };

// // Obtener artículos por categoría
// export const getArticlesByCategory = async (
//   category,
//   limitCount = 10,
//   lastDoc = null
// ) => {
//   try {
//     let q;

//     if (lastDoc) {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         where("category", "==", category),
//         orderBy("createdAt", "desc"),
//         startAfter(lastDoc),
//         limit(limitCount)
//       );
//     } else {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         where("category", "==", category),
//         orderBy("createdAt", "desc"),
//         limit(limitCount)
//       );
//     }

//     const querySnapshot = await getDocs(q);
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

//     const articles = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return { articles, lastVisible };
//   } catch (error) {
//     console.error("Error obteniendo artículos por categoría:", error);
//     throw error;
//   }
// };

// // Obtener artículos por subcategoría
// export const getArticlesBySubcategory = async (
//   category,
//   subcategory,
//   limitCount = 10,
//   lastDoc = null
// ) => {
//   try {
//     let q;

//     if (lastDoc) {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         where("category", "==", category),
//         where("subcategory", "==", subcategory),
//         orderBy("createdAt", "desc"),
//         startAfter(lastDoc),
//         limit(limitCount)
//       );
//     } else {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         where("category", "==", category),
//         where("subcategory", "==", subcategory),
//         orderBy("createdAt", "desc"),
//         limit(limitCount)
//       );
//     }

//     const querySnapshot = await getDocs(q);
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

//     const articles = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return { articles, lastVisible };
//   } catch (error) {
//     console.error("Error obteniendo artículos por subcategoría:", error);
//     throw error;
//   }
// };

// // Buscar artículos
// export const searchArticles = async (searchTerm, limitCount = 10) => {
//   try {
//     // Firestore no admite búsqueda de texto completo de forma nativa
//     // Esta es una implementación simple que busca solo en el título
//     // Para una aplicación en producción, considera usar Algolia o un servicio similar

//     const q = query(
//       collection(db, COLLECTION_NAME),
//       orderBy("title"),
//       limit(limitCount)
//     );

//     const querySnapshot = await getDocs(q);

//     // Filtrado en el cliente (no ideal para grandes conjuntos de datos)
//     const articles = querySnapshot.docs
//       .map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       .filter(
//         (article) =>
//           article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           article.content.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//     return articles;
//   } catch (error) {
//     console.error("Error buscando artículos:", error);
//     throw error;
//   }
// };

// // Obtener todos los artículos (admin, con paginación)
// export const getAllArticles = async (limitCount = 20, lastDoc = null) => {
//   try {
//     let q;

//     if (lastDoc) {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         orderBy("createdAt", "desc"),
//         startAfter(lastDoc),
//         limit(limitCount)
//       );
//     } else {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         orderBy("createdAt", "desc"),
//         limit(limitCount)
//       );
//     }

//     const querySnapshot = await getDocs(q);
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

//     const articles = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return { articles, lastVisible };
//   } catch (error) {
//     console.error("Error obteniendo todos los artículos:", error);
//     throw error;
//   }
// };

// // Obtener artículos destacados por categoría
// export const getFeaturedArticlesByCategory = async (category, limitCount = 3) => {
//   try {
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       where("category", "==", category), // Filtra por categoría
//       where("featured", "==", true), // Solo artículos destacados
//       orderBy("createdAt", "desc"), // Ordena por fecha de creación
//       limit(limitCount) // Limita el número de resultados
//     );

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error("Error obteniendo artículos destacados por categoría:", error);
//     throw error;
//   }
// };

// // Obtener todos los artículos para búsqueda (sin paginación)
// export const getAllArticlesForSearch = async () => {
//   try {
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       orderBy("createdAt", "desc")
//     );

//     const querySnapshot = await getDocs(q);

//     const articles = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return articles; // Devuelve solo el array de artículos
//   } catch (error) {
//     console.error("Error obteniendo todos los artículos para búsqueda:", error);
//     throw error;
//   }
// };

// // Configurar función de auto-eliminación
// // Esto normalmente se implementaría como una Cloud Function en Firebase
// // Para este ejemplo, creamos una función que podría ser llamada por una tarea programada
// export const checkAndDeleteExpiredArticles = async () => {
//   try {
//     const now = Timestamp.now();

//     const q = query(
//       collection(db, COLLECTION_NAME),
//       where("autoDelete", "==", true),
//       where("deleteAt", "<=", now)
//     );

//     const querySnapshot = await getDocs(q);

//     const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

//     await Promise.all(deletePromises);

//     return querySnapshot.docs.length;
//   } catch (error) {
//     console.error("Error eliminando artículos expirados:", error);
//     throw error;
//   }
// };


























import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/config";

const COLLECTION_NAME = "articles";

// Subir imagen a Firebase Storage
export const uploadImage = async (file, fileName) => {
  try {
    // Validar tipo de archivo
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Tipo de archivo no soportado");
    }

    // Validar tamaño (ejemplo: máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("El archivo es demasiado grande (máximo 5MB)");
    }

    // Crear referencia al archivo en Firebase Storage
    const storageRef = ref(storage, `articles/${fileName}`);

    // Subir el archivo
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
    });

    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    throw error;
  }
};

// Eliminar imagen de Firebase Storage
export const deleteImage = async (imageUrl) => {
  try {
    // Extraer la ruta del archivo de la URL
    const startIdx = imageUrl.indexOf("/o/") + 3;
    const endIdx = imageUrl.indexOf("?");
    const filePath = decodeURIComponent(imageUrl.substring(startIdx, endIdx));

    const imageRef = ref(storage, filePath);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error eliminando imagen:", error);
    throw error;
  }
};

// Crear un nuevo artículo
export const createArticle = async (articleData) => {
  try {
    // Agregar flag de auto-eliminación si está habilitado
    const autoDeleteData = articleData.autoDelete
      ? {
          autoDelete: true,
          deleteAt: Timestamp.fromDate(
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días desde ahora
          ),
        }
      : { autoDelete: false };

    // Agregar timestamp del servidor
    const article = {
      ...articleData,
      ...autoDeleteData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), article);
    return { id: docRef.id, ...article };
  } catch (error) {
    console.error("Error creando artículo:", error);
    throw error;
  }
};

// Obtener artículo por ID
export const getArticleById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo artículo:", error);
    throw error;
  }
};

// Actualizar artículo
export const updateArticle = async (id, articleData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);

    // Manejar cambios en el flag de auto-eliminación
    let autoDeleteData = {};
    if (articleData.autoDelete !== undefined) {
      autoDeleteData = articleData.autoDelete
        ? {
            autoDelete: true,
            deleteAt: Timestamp.fromDate(
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días desde ahora
            ),
          }
        : { autoDelete: false, deleteAt: null };
    }

    // Actualizar el documento
    await updateDoc(docRef, {
      ...articleData,
      ...autoDeleteData,
      updatedAt: serverTimestamp(),
    });

    return { id, ...articleData };
  } catch (error) {
    console.error("Error actualizando artículo:", error);
    throw error;
  }
};

// Eliminar artículo (incluyendo su imagen si existe)
export const deleteArticle = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const article = docSnap.data();
      // Si el artículo tiene una imagen, eliminarla
      if (article.imageUrl) {
        await deleteImage(article.imageUrl);
      }
    }

    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error eliminando artículo:", error);
    throw error;
  }
};

// Obtener artículos destacados
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
    }));
  } catch (error) {
    console.error("Error obteniendo artículos destacados:", error);
    throw error;
  }
};

// Obtener artículos normales (no destacados y no complementarios)
export const getLatestArticles = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("featured", "==", false),
      where("is_complementary", "==", false),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error obteniendo últimas noticias:", error);
    throw error;
  }
};

// Obtener artículos complementarios
export const getComplementaryArticles = async (limitCount = 6) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("is_complementary", "==", true),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error obteniendo artículos complementarios:", error);
    throw error;
  }
};

// Obtener artículos por categoría (con paginación)
export const getArticlesByCategory = async (
  category,
  limitCount = 10,
  lastDoc = null
) => {
  try {
    let q;

    if (lastDoc) {
      q = query(
        collection(db, COLLECTION_NAME),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(limitCount)
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
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
  } catch (error) {
    console.error("Error obteniendo artículos por categoría:", error);
    throw error;
  }
};

// Obtener artículos por subcategoría (con paginación)
export const getArticlesBySubcategory = async (
  category,
  subcategory,
  limitCount = 10,
  lastDoc = null
) => {
  try {
    let q;

    if (lastDoc) {
      q = query(
        collection(db, COLLECTION_NAME),
        where("category", "==", category),
        where("subcategory", "==", subcategory),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(limitCount)
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
        where("category", "==", category),
        where("subcategory", "==", subcategory),
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
  } catch (error) {
    console.error("Error obteniendo artículos por subcategoría:", error);
    throw error;
  }
};

// Buscar artículos (búsqueda simple en cliente)
export const searchArticles = async (searchTerm, limitCount = 10) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("title"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    // Filtrado en el cliente
    const articles = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (article.content &&
            article.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );

    return articles;
  } catch (error) {
    console.error("Error buscando artículos:", error);
    throw error;
  }
};

// Obtener todos los artículos (con paginación)
export const getAllArticles = async (limitCount = 20, lastDoc = null) => {
  try {
    let q;

    if (lastDoc) {
      q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(limitCount)
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
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
  } catch (error) {
    console.error("Error obteniendo todos los artículos:", error);
    throw error;
  }
};

// Obtener artículos destacados por categoría
export const getFeaturedArticlesByCategory = async (
  category,
  limitCount = 3
) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("category", "==", category),
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(
      "Error obteniendo artículos destacados por categoría:",
      error
    );
    throw error;
  }
};

// Obtener todos los artículos para búsqueda (sin paginación)
export const getAllArticlesForSearch = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return articles;
  } catch (error) {
    console.error("Error obteniendo todos los artículos para búsqueda:", error);
    throw error;
  }
};

// Verificar y eliminar artículos expirados
export const checkAndDeleteExpiredArticles = async () => {
  try {
    const now = Timestamp.now();

    const q = query(
      collection(db, COLLECTION_NAME),
      where("autoDelete", "==", true),
      where("deleteAt", "<=", now)
    );

    const querySnapshot = await getDocs(q);

    // Eliminar imágenes asociadas primero
    const deleteImagePromises = querySnapshot.docs.map(async (doc) => {
      const article = doc.data();
      if (article.imageUrl) {
        await deleteImage(article.imageUrl);
      }
    });

    await Promise.all(deleteImagePromises);

    // Luego eliminar los documentos
    const deleteDocPromises = querySnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );
    await Promise.all(deleteDocPromises);

    return querySnapshot.docs.length;
  } catch (error) {
    console.error("Error eliminando artículos expirados:", error);
    throw error;
  }
};