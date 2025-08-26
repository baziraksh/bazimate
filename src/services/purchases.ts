import { supabase, Purchase } from '../lib/supabase'

export interface CreatePurchaseData {
  item_type: 'note' | 'syllabus' | 'paper'
  item_id: string
  amount: number
}

// Create a new purchase
export const createPurchase = async (data: CreatePurchaseData, userId: string) => {
  const { data: purchase, error } = await supabase
    .from('purchases')
    .insert({
      user_id: userId,
      item_type: data.item_type,
      item_id: data.item_id,
      amount: data.amount,
      payment_status: 'pending'
    })
    .select()
    .single()

  return { purchase, error }
}

// Get all purchases by user
export const getUserPurchases = async (userId: string) => {
  const { data: purchases, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { purchases, error }
}

// Get single purchase
export const getPurchase = async (purchaseId: string) => {
  const { data: purchase, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('id', purchaseId)
    .single()

  return { purchase, error }
}

// Update payment status
export const updatePaymentStatus = async (
  purchaseId: string, 
  status: 'pending' | 'completed' | 'failed'
) => {
  const { data: purchase, error } = await supabase
    .from('purchases')
    .update({ payment_status: status })
    .eq('id', purchaseId)
    .select()
    .single()

  return { purchase, error }
}

// Check if user has purchased an item
export const hasUserPurchased = async (
  userId: string, 
  itemType: 'note' | 'syllabus' | 'paper', 
  itemId: string
) => {
  const { data: purchase, error } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId)
    .eq('payment_status', 'completed')
    .single()

  return { hasPurchased: !!purchase, error }
}

// Get purchase statistics for admin
export const getPurchaseStats = async () => {
  const { data: stats, error } = await supabase
    .from('purchases')
    .select('item_type, payment_status, amount')

  if (error) return { stats: null, error }

  // Calculate statistics
  const totalRevenue = stats
    .filter(p => p.payment_status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPurchases = stats.filter(p => p.payment_status === 'completed').length
  const pendingPurchases = stats.filter(p => p.payment_status === 'pending').length
  const failedPurchases = stats.filter(p => p.payment_status === 'failed').length

  const itemTypeStats = stats.reduce((acc, p) => {
    if (p.payment_status === 'completed') {
      acc[p.item_type] = (acc[p.item_type] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return {
    stats: {
      totalRevenue,
      totalPurchases,
      pendingPurchases,
      failedPurchases,
      itemTypeStats
    },
    error: null
  }
}
