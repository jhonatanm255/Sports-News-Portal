const categories = [
  {
    id: 'noticias',
    name: 'Noticias',
    subcategories: [
      // { id: 'politica', name: 'Política' },
      // { id: 'economia', name: 'Economía' },
      // { id: 'internacional', name: 'Internacional' },
      // { id: 'tecnologia', name: 'Tecnología' },
      // { id: 'ciencia', name: 'Ciencia' }
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
      // { id: 'celebridades', name: 'Celebridades' },
      // { id: 'cine', name: 'Cine' },
      { id: 'conciertos', name: 'Conciertos' },
      { id: 'musica', name: 'Música' },
      // { id: 'moda', name: 'Moda' }
    ]
  },
]

export default categories

export const getCategoryById = (categoryId) => {
  return categories.find(category => category.id === categoryId)
}

export const getSubcategoryById = (categoryId, subcategoryId) => {
  const category = getCategoryById(categoryId)
  if (!category) return null
  
  return category.subcategories.find(subcategory => subcategory.id === subcategoryId)
}
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