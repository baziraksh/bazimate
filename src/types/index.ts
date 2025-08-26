export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'uploader' | 'admin'
  points: number
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Resource {
  id: string
  title: string
  description: string
  category: 'notes' | 'syllabus' | 'papers'
  subject: string
  semester: string
  year: string
  price: number
  file_url: string
  preview_url?: string
  uploader_id: string
  approved: boolean
  downloads: number
  rating: number
  review_count: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  resource_id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  stripe_payment_id?: string
  created_at: string
}

export interface Review {
  id: string
  user_id: string
  resource_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

export interface WishlistItem {
  id: string
  user_id: string
  resource_id: string
  created_at: string
}

export interface SearchFilters {
  category?: string
  subject?: string
  semester?: string
  year?: string
  priceRange?: [number, number]
  sortBy?: 'latest' | 'popular' | 'rating' | 'price_low' | 'price_high'
}
