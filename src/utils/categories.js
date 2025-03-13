// Define all categories and subcategories
const categories = [
  {
    id: 'noticias',
    name: 'Noticias',
    subcategories: [
      { id: 'politica', name: 'Política' },
      { id: 'economia', name: 'Economía' },
      { id: 'internacional', name: 'Internacional' },
      { id: 'tecnologia', name: 'Tecnología' },
      { id: 'ciencia', name: 'Ciencia' }
    ]
  },
  {
    id: 'deportes',
    name: 'Deportes',
    subcategories: [
      { id: 'futbol', name: 'Fútbol', twitterAccounts: ['@FCBarcelona', '@realmadrid', '@LigadeCampeones'] },
      { id: 'basketball', name: 'Basketball', twitterAccounts: ['@NBA', '@FIBA', '@EuroLeague'] },
      { id: 'beisbol', name: 'Béisbol', twitterAccounts: ['@MLB', '@LasMayores', '@WBSC'] },
      { id: 'otros', name: 'Otros Deportes', twitterAccounts: ['@Olympics', '@F1', '@UFC'] }
    ]
  },
  {
    id: 'farandula',
    name: 'Farándula',
    subcategories: [
      { id: 'celebridades', name: 'Celebridades' },
      { id: 'cine', name: 'Cine' },
      { id: 'television', name: 'Televisión' },
      { id: 'musica', name: 'Música' },
      { id: 'moda', name: 'Moda' }
    ]
  },
  {
    id: 'tendencias',
    name: 'Tendencias',
    subcategories: [
      { id: 'viral', name: 'Viral' },
      { id: 'redes-sociales', name: 'Redes Sociales' },
      { id: 'internet', name: 'Internet' },
      { id: 'apps', name: 'Apps' },
      { id: 'gaming', name: 'Gaming' }
    ]
  },
  {
    id: 'otros',
    name: 'Otros',
    subcategories: [
      { id: 'salud', name: 'Salud' },
      { id: 'educacion', name: 'Educación' },
      { id: 'gastronomia', name: 'Gastronomía' },
      { id: 'viajes', name: 'Viajes' },
      { id: 'cultura', name: 'Cultura' }
    ]
  }
]

export default categories

// Helper function to get category by ID
export const getCategoryById = (categoryId) => {
  return categories.find(category => category.id === categoryId)
}

// Helper function to get subcategory by ID within a category
export const getSubcategoryById = (categoryId, subcategoryId) => {
  const category = getCategoryById(categoryId)
  if (!category) return null
  
  return category.subcategories.find(subcategory => subcategory.id === subcategoryId)
}

// Helper function to get all categories and subcategories as flat array
export const getAllCategoriesFlat = () => {
  return categories.flatMap(category => {
    return [
      { id: category.id, name: category.name, isSubcategory: false },
      ...category.subcategories.map(subcategory => ({
        id: subcategory.id,
        name: subcategory.name,
        parentId: category.id,
        parentName: category.name,
        isSubcategory: true,
        twitterAccounts: subcategory.twitterAccounts || []
      }))
    ]
  })
}