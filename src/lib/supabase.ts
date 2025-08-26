import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Profile {
  user_id: string
  full_name: string
  college?: string
  branch?: string
  year?: number
  created_at: string
}

export interface Note {
  id: string
  title: string
  description?: string
  file_url: string
  subject: string
  semester: number
  branch: string
  price: number
  uploaded_by: string
  created_at: string
}

export interface Syllabus {
  id: string
  title: string
  file_url: string
  branch: string
  semester: number
  created_at: string
}

export interface PreviousPaper {
  id: string
  title: string
  file_url: string
  subject: string
  year: number
  branch: string
  semester: number
  created_at: string
}

export interface Purchase {
  id: string
  user_id: string
  item_type: 'note' | 'syllabus' | 'paper'
  item_id: string
  amount: number
  payment_status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface Review {
  id: string
  user_id: string
  item_type: 'note' | 'syllabus' | 'paper'
  item_id: string
  rating: number
  comment?: string
  created_at: string
}
