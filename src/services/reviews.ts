import { supabase, Review } from '../lib/supabase'

export interface CreateReviewData {
  item_type: 'note' | 'syllabus' | 'paper'
  item_id: string
  rating: number
  comment?: string
}

export interface ReviewsFilter {
  item_type?: 'note' | 'syllabus' | 'paper'
  item_id?: string
  rating?: number
}

// Create a new review
export const createReview = async (data: CreateReviewData, userId: string) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .insert({
      user_id: userId,
      item_type: data.item_type,
      item_id: data.item_id,
      rating: data.rating,
      comment: data.comment
    })
    .select(`
      *,
      profiles:user_id (
        full_name
      )
    `)
    .single()

  return { review, error }
}

// Get reviews for an item
export const getItemReviews = async (itemType: 'note' | 'syllabus' | 'paper', itemId: string) => {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (
        full_name
      )
    `)
    .eq('item_type', itemType)
    .eq('item_id', itemId)
    .order('created_at', { ascending: false })

  return { reviews, error }
}

// Get all reviews with filters
export const getReviews = async (filters: ReviewsFilter = {}) => {
  let query = supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (
        full_name
      )
    `)

  if (filters.item_type) {
    query = query.eq('item_type', filters.item_type)
  }

  if (filters.item_id) {
    query = query.eq('item_id', filters.item_id)
  }

  if (filters.rating) {
    query = query.eq('rating', filters.rating)
  }

  const { data: reviews, error } = await query.order('created_at', { ascending: false })

  return { reviews, error }
}

// Update review
export const updateReview = async (reviewId: string, updates: Partial<Review>) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', reviewId)
    .select(`
      *,
      profiles:user_id (
        full_name
      )
    `)
    .single()

  return { review, error }
}

// Delete review
export const deleteReview = async (reviewId: string) => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  return { error }
}

// Get user's review for an item
export const getUserReview = async (
  userId: string, 
  itemType: 'note' | 'syllabus' | 'paper', 
  itemId: string
) => {
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId)
    .single()

  return { review, error }
}

// Get review statistics for an item
export const getItemReviewStats = async (itemType: 'note' | 'syllabus' | 'paper', itemId: string) => {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('item_type', itemType)
    .eq('item_id', itemId)

  if (error) return { stats: null, error }

  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
    : 0

  const ratingDistribution = reviews.reduce((acc, r) => {
    acc[r.rating] = (acc[r.rating] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  return {
    stats: {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      ratingDistribution
    },
    error: null
  }
}
