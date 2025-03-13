import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabaseUrl = "https://ipuimwuddinulsepmwyv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwdWltd3VkZGludWxzZXBtd3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MDgwNDYsImV4cCI6MjA1NjI4NDA0Nn0.BC2ZxmV9uNbE-2_v19P-kriiBFKkpOCpaSbShSF5NCQ";

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase