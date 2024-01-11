import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rslqlfhdvcsckedrwzhe.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbHFsZmhkdmNzY2tlZHJ3emhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5MjE2NjAsImV4cCI6MjAyMDQ5NzY2MH0.mkXVIEN0QI8hxE63QBIr60xKWKpxaK7xnaDZtb_eI64"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})