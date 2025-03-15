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
//   Timestamp
// } from 'firebase/firestore'
// import { db } from '../firebase/config'
// import supabase from '../supabase/config'

// const COLLECTION_NAME = 'articles'

// // Upload image to Supabase Storage
// export const uploadImage = async (file, fileName) => {
//   try {
//     const { data, error } = await supabase.storage
//       .from('news-images')
//       .upload(`articles/${fileName}`, file, {
//         cacheControl: '3600',
//         upsert: false
//       })
    
//     if (error) throw error
    
//     // Get public URL
//     const { data: urlData } = supabase.storage
//       .from('news-images')
//       .getPublicUrl(`articles/${fileName}`)
    
//     return urlData.publicUrl
//   } catch (error) {
//     console.error('Error uploading image:', error)
//     throw error
//   }
// }

// // Create a new article
// export const createArticle = async (articleData) => {
//   try {
//     // Add auto-delete flag if enabled
//     const autoDeleteData = articleData.autoDelete 
//       ? { 
//           autoDelete: true,
//           deleteAt: Timestamp.fromDate(
//             new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
//           )
//         } 
//       : { autoDelete: false }
    
//     // Add server timestamp
//     const article = {
//       ...articleData,
//       ...autoDeleteData,
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp()
//     }
    
//     const docRef = await addDoc(collection(db, COLLECTION_NAME), article)
//     return { id: docRef.id, ...article }
//   } catch (error) {
//     console.error('Error creating article:', error)
//     throw error
//   }
// }

// // Get article by ID
// export const getArticleById = async (id) => {
//   try {
//     const docRef = doc(db, COLLECTION_NAME, id)
//     const docSnap = await getDoc(docRef)
    
//     if (docSnap.exists()) {
//       return { id: docSnap.id, ...docSnap.data() }
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.error('Error getting article:', error)
//     throw error
//   }
// }

// // Update article
// export const updateArticle = async (id, articleData) => {
//   try {
//     const docRef = doc(db, COLLECTION_NAME, id)
    
//     // Handle auto-delete flag changes
//     let autoDeleteData = {}
//     if (articleData.autoDelete !== undefined) {
//       autoDeleteData = articleData.autoDelete 
//         ? { 
//             autoDelete: true,
//             deleteAt: Timestamp.fromDate(
//               new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
//             )
//           } 
//         : { autoDelete: false, deleteAt: null }
//     }
    
//     // Update the document
//     await updateDoc(docRef, {
//       ...articleData,
//       ...autoDeleteData,
//       updatedAt: serverTimestamp()
//     })
    
//     return { id, ...articleData }
//   } catch (error) {
//     console.error('Error updating article:', error)
//     throw error
//   }
// }

// // Delete article
// export const deleteArticle = async (id) => {
//   try {
//     const docRef = doc(db, COLLECTION_NAME, id)
//     await deleteDoc(docRef)
//     return true
//   } catch (error) {
//     console.error('Error deleting article:', error)
//     throw error
//   }
// }

// // Get featured articles
// export const getFeaturedArticles = async (limitCount = 5) => {
//   try {
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       where("featured", "==", true),
//       orderBy("createdAt", "desc"),
//       limit(limitCount) // Agregar paréntesis
//     );

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error("Error getting featured articles:", error);
//     throw error;
//   }
// };


// // Get latest articles
// export const getLatestArticles = async (limitCount = 10) => {
//   try {
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       orderBy('createdAt', 'desc'),
//       limit(limit)
//     )
    
//     const querySnapshot = await getDocs(q)
//     return querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }))
//   } catch (error) {
//     console.error('Error getting latest articles:', error)
//     throw error
//   }
// }

// // Get articles by category
// export const getArticlesByCategory = async (category, limitCount = 10, lastDoc = null) => {
//   try {
//     let q
    
//     if (lastDoc) {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         where('category', '==', category),
//         orderBy('createdAt', 'desc'),
//         startAfter(lastDoc),
//         limit(limitCount)
//       )
//     } else {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         where('category', '==', category),
//         orderBy('createdAt', 'desc'),
//         limit(limitCount)
//       )
//     }
    
//     const querySnapshot = await getDocs(q)
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    
//     const articles = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }))
    
//     return { articles, lastVisible }
//   } catch (error) {
//     console.error('Error getting articles by category:', error)
//     throw error
//   }
// }

// // Get articles by subcategory
// export const getArticlesBySubcategory = async (category, subcategory, limitCount = 10, lastDoc = null) => {
//   try {
//     let q
    
//     if (lastDoc) {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         where('category', '==', category),
//         where('subcategory', '==', subcategory),
//         orderBy('createdAt', 'desc'),
//         startAfter(lastDoc),
//         limit(limitCount)
//       )
//     } else {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         where('category', '==', category),
//         where('subcategory', '==', subcategory),
//         orderBy('createdAt', 'desc'),
//         limit(limitCount)
//       )
//     }
    
//     const querySnapshot = await getDocs(q)
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    
//     const articles = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }))
    
//     return { articles, lastVisible }
//   } catch (error) {
//     console.error('Error getting articles by subcategory:', error)
//     throw error
//   }
// }

// // Search articles
// export const searchArticles = async (searchTerm, limitCount = 10) => {
//   try {
//     // Firestore doesn't support full-text search natively
//     // This is a simple implementation that searches in title only
//     // For a production app, consider using Algolia or a similar service
    
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       orderBy('title'),
//       // where('title', '>=', searchTerm),
//       // where('title', '<=', searchTerm + '\uf8ff'),
//       limit(limitCount)
//     )
    
//     const querySnapshot = await getDocs(q)
    
//     // Client-side filtering (not ideal for large datasets)
//     const articles = querySnapshot.docs
//       .map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }))
//       .filter(article => 
//         article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         article.content.toLowerCase().includes(searchTerm.toLowerCase())
//       )
    
//     return articles
//   } catch (error) {
//     console.error('Error searching articles:', error)
//     throw error
//   }
// }

// // Get all articles (admin)
// export const getAllArticles = async (limitCount = 20, lastDoc = null) => {
//   try {
//     let q
    
//     if (lastDoc) {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         orderBy('createdAt', 'desc'),
//         startAfter(lastDoc),
//         limit(limitCount)
//       )
//     } else {
//       q = query(
//         collection(db, COLLECTION_NAME),
//         orderBy('createdAt', 'desc'),
//         limit(limitCount)
//       )
//     }
    
//     const querySnapshot = await getDocs(q)
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    
//     const articles = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }))
    
//     return { articles, lastVisible }
//   } catch (error) {
//     console.error('Error getting all articles:', error)
//     throw error
//   }
// }

// // Setup auto-delete function
// // This would typically be implemented as a Cloud Function in Firebase
// // For this example, we'll create a function that could be called by a scheduled task
// export const checkAndDeleteExpiredArticles = async () => {
//   try {
//     const now = Timestamp.now()
    
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       where('autoDelete', '==', true),
//       where('deleteAt', '<=', now)
//     )
    
//     const querySnapshot = await getDocs(q)
    
//     const deletePromises = querySnapshot.docs.map(doc => 
//       deleteDoc(doc.ref)
//     )
    
//     await Promise.all(deletePromises)
    
//     return querySnapshot.docs.length
//   } catch (error) {
//     console.error('Error deleting expired articles:', error)
//     throw error
//   }
// }



















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
import { db } from "../firebase/config";
import supabase from "../supabase/config";

const COLLECTION_NAME = "articles";

// Upload image to Supabase Storage
export const uploadImage = async (file, fileName) => {
  try {
    const { data, error } = await supabase.storage
      .from("news-images")
      .upload(`articles/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("news-images")
      .getPublicUrl(`articles/${fileName}`);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Create a new article
export const createArticle = async (articleData) => {
  try {
    // Add auto-delete flag if enabled
    const autoDeleteData = articleData.autoDelete
      ? {
          autoDelete: true,
          deleteAt: Timestamp.fromDate(
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
          ),
        }
      : { autoDelete: false };

    // Add server timestamp
    const article = {
      ...articleData,
      ...autoDeleteData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), article);
    return { id: docRef.id, ...article };
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

// Get article by ID
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
    console.error("Error getting article:", error);
    throw error;
  }
};

// Update article
export const updateArticle = async (id, articleData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);

    // Handle auto-delete flag changes
    let autoDeleteData = {};
    if (articleData.autoDelete !== undefined) {
      autoDeleteData = articleData.autoDelete
        ? {
            autoDelete: true,
            deleteAt: Timestamp.fromDate(
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
            ),
          }
        : { autoDelete: false, deleteAt: null };
    }

    // Update the document
    await updateDoc(docRef, {
      ...articleData,
      ...autoDeleteData,
      updatedAt: serverTimestamp(),
    });

    return { id, ...articleData };
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

// Delete article
export const deleteArticle = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};

// Get featured articles
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
    console.error("Error getting featured articles:", error);
    throw error;
  }
};

// Get latest articles
export const getLatestArticles = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting latest articles:", error);
    throw error;
  }
};

// Get articles by category
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
    console.error("Error getting articles by category:", error);
    throw error;
  }
};

// Get articles by subcategory
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
    console.error("Error getting articles by subcategory:", error);
    throw error;
  }
};

// Search articles
export const searchArticles = async (searchTerm, limitCount = 10) => {
  try {
    // Firestore doesn't support full-text search natively
    // This is a simple implementation that searches in title only
    // For a production app, consider using Algolia or a similar service

    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("title"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    // Client-side filtering (not ideal for large datasets)
    const articles = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return articles;
  } catch (error) {
    console.error("Error searching articles:", error);
    throw error;
  }
};

// Get all articles (admin, con paginación)
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
    console.error("Error getting all articles:", error);
    throw error;
  }
};

// Get all articles for search (sin paginación)
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

    return articles; // Devuelve solo el array de artículos
  } catch (error) {
    console.error("Error getting all articles for search:", error);
    throw error;
  }
};

// Setup auto-delete function
// This would typically be implemented as a Cloud Function in Firebase
// For this example, we'll create a function that could be called by a scheduled task
export const checkAndDeleteExpiredArticles = async () => {
  try {
    const now = Timestamp.now();

    const q = query(
      collection(db, COLLECTION_NAME),
      where("autoDelete", "==", true),
      where("deleteAt", "<=", now)
    );

    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

    await Promise.all(deletePromises);

    return querySnapshot.docs.length;
  } catch (error) {
    console.error("Error deleting expired articles:", error);
    throw error;
  }
};