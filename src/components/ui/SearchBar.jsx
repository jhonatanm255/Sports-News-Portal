import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Buscar noticias..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-white pl-4 pr-10 py-2 bg-gray-700 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-primary-500"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>
    </form>
  )
}

export default SearchBar
