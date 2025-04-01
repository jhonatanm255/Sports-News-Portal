// Importar todas las funciones individuales
import { uploadImage } from "./uploadImage";
import { deleteImage } from "./deleteImage";
import { createArticle } from "./createArticle";
import { getArticleById } from "./getArticleById";
import { updateArticle } from "./updateArticle";
import { deleteArticle } from "./deleteArticle";
import { getFeaturedArticles } from "./getFeaturedArticles";
import { getLatestArticles } from "./getLatestArticles";
import { getComplementaryArticles } from "./getComplementaryArticles";
import { getArticlesByCategory } from "./getArticlesByCategory";
import { getArticlesBySubcategory } from "./getArticlesBySubcategory";
import { searchArticles } from "./searchArticles";
import { getAllArticles } from "./getAllArticles";
import { getFeaturedArticlesByCategory } from "./getFeaturedArticlesByCategory";
import { getAllArticlesForSearch } from "./getAllArticlesForSearch";
import { checkAndDeleteExpiredArticles } from "./checkAndDeleteExpiredArticles";
import { cancelAutoDelete } from "./cancelAutoDelete";

// Exportar todas las funciones individualmente
export {
  uploadImage,
  deleteImage,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  getFeaturedArticles,
  getLatestArticles,
  getComplementaryArticles,
  getArticlesByCategory,
  getArticlesBySubcategory,
  searchArticles,
  getAllArticles,
  getFeaturedArticlesByCategory,
  getAllArticlesForSearch,
  checkAndDeleteExpiredArticles,
  cancelAutoDelete,
};

// Exportar como objeto default
const articleService = {
  uploadImage,
  deleteImage,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  getFeaturedArticles,
  getLatestArticles,
  getComplementaryArticles,
  getArticlesByCategory,
  getArticlesBySubcategory,
  searchArticles,
  getAllArticles,
  getFeaturedArticlesByCategory,
  getAllArticlesForSearch,
  checkAndDeleteExpiredArticles,
  cancelAutoDelete,
};

export default articleService;
