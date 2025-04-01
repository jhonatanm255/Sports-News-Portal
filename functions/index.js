const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.autoDeleteArticles = functions.pubsub
  .schedule("every 168 hours")
  .timeZone("America/Mexico_City")
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const articlesRef = admin.firestore().collection("articles");

    try {
      const snapshot = await articlesRef
        .where("autoDelete", "==", true)
        .where("deleteAt", "<=", now.toDate()) // Convertimos now a Date
        .get();

      if (snapshot.empty) {
        functions.logger.log("No hay artículos para eliminar.");
        return null;
      }

      const batch = admin.firestore().batch();
      const storage = admin.storage();
      let deleteImagePromises = [];

      snapshot.forEach((doc) => {
        const article = doc.data();
        functions.logger.log(`Eliminando artículo: ${doc.id}`, article);

        if (article.imageUrl) {
          try {
            functions.logger.log(
              `Intentando eliminar imagen: ${article.imageUrl}`
            );
            const filePath = decodeURIComponent(
              article.imageUrl.split("/o/")[1].split("?")[0]
            );
            deleteImagePromises.push(storage.bucket().file(filePath).delete());
          } catch (error) {
            functions.logger.error(`Error eliminando imagen: ${error}`);
          }
        }

        batch.delete(doc.ref);
      });

      await Promise.all(deleteImagePromises);
      await batch.commit();

      functions.logger.log(`Artículos eliminados: ${snapshot.size}`);
      return null;
    } catch (error) {
      functions.logger.error(
        "Error en la eliminación automática de artículos",
        error
      );
      return null;
    }
  });







