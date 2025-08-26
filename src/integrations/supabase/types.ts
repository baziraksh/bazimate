export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Minimal types for Supabase integration
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'student' | 'uploader' | 'admin'
          points: number
          avatar_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: 'student' | 'uploader' | 'admin'
          points?: number
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'student' | 'uploader' | 'admin'
          points?: number
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
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
        Insert: {
          id?: string
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
          approved?: boolean
          downloads?: number
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'notes' | 'syllabus' | 'papers'
          subject?: string
          semester?: string
          year?: string
          price?: number
          file_url?: string
          preview_url?: string
          uploader_id?: string
          approved?: boolean
          downloads?: number
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          resource_id: string
          amount: number
          status: 'pending' | 'completed' | 'failed'
          stripe_payment_id?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_id: string
          amount: number
          status?: 'pending' | 'completed' | 'failed'
          stripe_payment_id?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string
          amount?: number
          status?: 'pending' | 'completed' | 'failed'
          stripe_payment_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          resource_id: string
          rating: number
          comment: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_id: string
          rating: number
          comment: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string
          rating?: number
          comment?: string
          created_at?: string
          updated_at?: string
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string
          resource_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
