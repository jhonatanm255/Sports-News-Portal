import react, { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock login for development without Firebase
  const mockLogin = (email, password) => {
    // For development, accept any email/password with admin@example.com
    if (email === "newsmexico054@gmail.com") {
      const mockUser = {
        uid: "mock-user-id",
        email: email,
        displayName: "Admin User",
        emailVerified: true,
      };
      setCurrentUser(mockUser);
      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      return Promise.resolve({ user: mockUser });
    }
    
    return Promise.reject(new Error('Invalid email or password'))
  }
  
  // Mock logout
  const mockLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('mockUser')
    return Promise.resolve()
  }

  function login(email, password) {
    // Use mock login if in development mode
    if (window.mockMode) {
      return mockLogin(email, password)
    }
    
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    // Use mock logout if in development mode
    if (window.mockMode) {
      return mockLogout()
    }
    
    return signOut(auth)
  }

  useEffect(() => {
    // Check for mock mode
    if (window.mockMode) {
      // Check if we have a stored mock user
      const storedUser = localStorage.getItem('mockUser')
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser))
      }
      setLoading(false)
      return
    }
    
    // Use Firebase auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}