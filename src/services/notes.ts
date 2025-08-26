import { supabase, Note } from '../lib/supabase'

export interface CreateNoteData {
  title: string
  description?: string
  subject: string
  semester: number
  branch: string
  price: number
  file: File
}

export interface NotesFilter {
  branch?: string
  semester?: number
  subject?: string
  priceRange?: { min: number; max: number }
  search?: string
}

// Upload note with file
export const uploadNote = async (data: CreateNoteData, userId: string) => {
  try {
    // Upload file to storage
    const fileExt = data.file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    const { data: fileData, error: uploadError } = await supabase.storage
      .from('notes_files')
      .upload(fileName, data.file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('notes_files')
      .getPublicUrl(fileName)

    // Create note record
    const { data: note, error: insertError } = await supabase
      .from('notes')
      .insert({
        title: data.title,
        description: data.description,
        file_url: publicUrl,
        subject: data.subject,
        semester: data.semester,
        branch: data.branch,
        price: data.price,
        uploaded_by: userId
      })
      .select()
      .single()

    if (insertError) throw insertError

    return { note, error: null }
  } catch (error) {
    return { note: null, error }
  }
}

// Get all notes with filters
export const getNotes = async (filters: NotesFilter = {}) => {
  let query = supabase
    .from('notes')
    .select(`
      *,
      profiles:uploaded_by (
        full_name
      )
    `)

  // Apply filters
  if (filters.branch) {
    query = query.eq('branch', filters.branch)
  }
  
  if (filters.semester) {
    query = query.eq('semester', filters.semester)
  }
  
  if (filters.subject) {
    query = query.eq('subject', filters.subject)
  }
  
  if (filters.priceRange) {
    query = query
      .gte('price', filters.priceRange.min)
      .lte('price', filters.priceRange.max)
  }
  
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data: notes, error } = await query.order('created_at', { ascending: false })

  return { notes, error }
}

// Get single note
export const getNote = async (noteId: string) => {
  const { data: note, error } = await supabase
    .from('notes')
    .select(`
      *,
      profiles:uploaded_by (
        full_name
      )
    `)
    .eq('id', noteId)
    .single()

  return { note, error }
}

// Update note
export const updateNote = async (noteId: string, updates: Partial<Note>) => {
  const { data: note, error } = await supabase
    .from('notes')
    .update(updates)
    .eq('id', noteId)
    .select()
    .single()

  return { note, error }
}

// Delete note
export const deleteNote = async (noteId: string) => {
  // First get the note to get file URL
  const { data: note } = await supabase
    .from('notes')
    .select('file_url')
    .eq('id', noteId)
    .single()

  if (note?.file_url) {
    // Extract file path from URL
    const filePath = note.file_url.split('/').slice(-2).join('/')
    
    // Delete file from storage
    await supabase.storage
      .from('notes_files')
      .remove([filePath])
  }

  // Delete note record
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId)

  return { error }
}

// Get notes by user
export const getUserNotes = async (userId: string) => {
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .eq('uploaded_by', userId)
    .order('created_at', { ascending: false })

  return { notes, error }
}

// Check if user has purchased a note
export const hasUserPurchasedNote = async (userId: string, noteId: string) => {
  const { data: purchase, error } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('item_type', 'note')
    .eq('item_id', noteId)
    .eq('payment_status', 'completed')
    .single()

  return { hasPurchased: !!purchase, error }
}
