// This file provides mock implementations of the article service functions
// It can be used for development and testing without requiring Firebase

import { sampleArticles, getSampleArticlesByCategory, getSampleArticlesBySubcategory, 
         getSampleFeaturedArticles, getSampleArticleById } from '../utils/sampleData'

// Mock implementation of uploadImage
export const uploadImage = async (file, fileName) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return a placeholder URL
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2340&auto=format&fit=crop'
}

// Mock implementation of createArticle
export const createArticle = async (articleData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Create a new article with a random ID
  const newArticle = {
    id: `article-${Date.now()}`,
    ...articleData,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  // In a real implementation, this would be saved to Firestore
  console.log('Created article:', newArticle)
  
  return newArticle
}

// Mock implementation of getArticleById
export const getArticleById = async (id) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Try to find the article in sample data
  const article = getSampleArticleById(id)
  
  if (article) {
    return {
      ...article,
      // Add toDate method to simulate Firestore Timestamp
      createdAt: {
        toDate: () => article.createdAt
      }
    }
  }
  
  return null
}

// Mock implementation of updateArticle
export const updateArticle = async (id, articleData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In a real implementation, this would update the document in Firestore
  console.log('Updated article:', id, articleData)
  
  return { id, ...articleData, updatedAt: new Date() }
}

// Mock implementation of deleteArticle
export const deleteArticle = async (id) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // In a real implementation, this would delete the document from Firestore
  console.log('Deleted article:', id)
  
  return true
}

// Mock implementation of getFeaturedArticles
export const getFeaturedArticles = async (limitCount = 5) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700))
  
  const featuredArticles = getSampleFeaturedArticles()
  
  return featuredArticles.slice(0, limitCount).map(article => ({
    ...article,
    // Add toDate method to simulate Firestore Timestamp
    createdAt: {
      toDate: () => article.createdAt
    }
  }))
}

// Mock implementation of getLatestArticles
export const getLatestArticles = async (limitCount = 10) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700))
  
  // Sort by date descending
  const sortedArticles = [...sampleArticles].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  )
  
  return sortedArticles.slice(0, limitCount).map(article => ({
    ...article,
    // Add toDate method to simulate Firestore Timestamp
    createdAt: {
      toDate: () => article.createdAt
    }
  }))
}

// Mock implementation of getArticlesByCategory
export const getArticlesByCategory = async (category, limitCount = 10, lastDoc = null) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700))
  
  const categoryArticles = getSampleArticlesByCategory(category)
  
  // Sort by date descending
  const sortedArticles = [...categoryArticles].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  )
  
  const articles = sortedArticles.slice(0, limitCount).map(article => ({
    ...article,
    // Add toDate method to simulate Firestore Timestamp
    createdAt: {
      toDate: () => article.createdAt
    }
  }))
  
  return { 
    articles, 
    lastVisible: articles[articles.length - 1] 
  }
}

// Mock implementation of getArticlesBySubcategory
export const getArticlesBySubcategory = async (category, subcategory, limitCount = 10, lastDoc = null) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700))
  
  const subcategoryArticles = getSampleArticlesBySubcategory(category, subcategory)
  
  // Sort by date descending
  const sortedArticles = [...subcategoryArticles].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  )
  
  const articles = sortedArticles.slice(0, limitCount).map(article => ({
    ...article,
    // Add toDate method to simulate Firestore Timestamp
    createdAt: {
      toDate: () => article.createdAt
    }
  }))
  
  return { 
    articles, 
    lastVisible: articles[articles.length - 1] 
  }
}

// Mock implementation of searchArticles
export const searchArticles = async (searchTerm, limitCount = 10) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 900))
  
  // Simple search implementation
  const matchingArticles = sampleArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return matchingArticles.slice(0, limitCount).map(article => ({
    ...article,
    // Add toDate method to simulate Firestore Timestamp
    createdAt: {
      toDate: () => article.createdAt
    }
  }))
}

// Mock implementation of getAllArticles
export const getAllArticles = async (limitCount = 20, lastDoc = null) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700))
  
  // Sort by date descending
  const sortedArticles = [...sampleArticles].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  )
  
  const articles = sortedArticles.slice(0, limitCount).map(article => ({
    ...article,
    // Add toDate method to simulate Firestore Timestamp
    createdAt: {
      toDate: () => article.createdAt
    }
  }))
  
  return { 
    articles, 
    lastVisible: articles[articles.length - 1] 
  }
}

// Mock implementation of checkAndDeleteExpiredArticles
export const checkAndDeleteExpiredArticles = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In a real implementation, this would delete expired articles
  console.log('Checked for expired articles')
  
  return 0
}