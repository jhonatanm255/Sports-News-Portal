import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key",
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-auth-domain",
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project-id",
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket",
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock-messaging-sender-id",
  // appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock-app-id"

  apiKey: "AIzaSyAAglFDQlNltpyhkJZ3FGk9LUDYVj6k-VU",
  authDomain: "portal-de-noticias-fa2df.firebaseapp.com",
  projectId: "portal-de-noticias-fa2df",
  storageBucket: "portal-de-noticias-fa2df.firebasestorage.app",
  messagingSenderId: "446089890445",
  appId: "1:446089890445:web:e26cac37ddb116197cf0c4",
  measurementId: "G-Q9KV71Y73B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }