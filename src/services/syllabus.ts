import { supabase, Syllabus } from '../lib/supabase'

export interface CreateSyllabusData {
  title: string
  branch: string
  semester: number
  file: File
}

export interface SyllabusFilter {
  branch?: string
  semester?: number
  search?: string
}

// Upload syllabus with file
export const uploadSyllabus = async (data: CreateSyllabusData, userId: string) => {
  try {
    // Upload file to storage
    const fileExt = data.file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    const { data: fileData, error: uploadError } = await supabase.storage
      .from('syllabus_files')
      .upload(fileName, data.file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('syllabus_files')
      .getPublicUrl(fileName)

    // Create syllabus record
    const { data: syllabus, error: insertError } = await supabase
      .from('syllabus')
      .insert({
        title: data.title,
        file_url: publicUrl,
        branch: data.branch,
        semester: data.semester
      })
      .select()
      .single()

    if (insertError) throw insertError

    return { syllabus, error: null }
  } catch (error) {
    return { syllabus: null, error }
  }
}

// Get all syllabus with filters
export const getSyllabus = async (filters: SyllabusFilter = {}) => {
  let query = supabase
    .from('syllabus')
    .select('*')

  // Apply filters
  if (filters.branch) {
    query = query.eq('branch', filters.branch)
  }
  
  if (filters.semester) {
    query = query.eq('semester', filters.semester)
  }
  
  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`)
  }

  const { data: syllabus, error } = await query.order('created_at', { ascending: false })

  return { syllabus, error }
}

// Get single syllabus
export const getSyllabusById = async (syllabusId: string) => {
  const { data: syllabus, error } = await supabase
    .from('syllabus')
    .select('*')
    .eq('id', syllabusId)
    .single()

  return { syllabus, error }
}

// Update syllabus
export const updateSyllabus = async (syllabusId: string, updates: Partial<Syllabus>) => {
  const { data: syllabus, error } = await supabase
    .from('syllabus')
    .update(updates)
    .eq('id', syllabusId)
    .select()
    .single()

  return { syllabus, error }
}

// Delete syllabus
export const deleteSyllabus = async (syllabusId: string) => {
  // First get the syllabus to get file URL
  const { data: syllabus } = await supabase
    .from('syllabus')
    .select('file_url')
    .eq('id', syllabusId)
    .single()

  if (syllabus?.file_url) {
    // Extract file path from URL
    const filePath = syllabus.file_url.split('/').slice(-2).join('/')
    
    // Delete file from storage
    await supabase.storage
      .from('syllabus_files')
      .remove([filePath])
  }

  // Delete syllabus record
  const { error } = await supabase
    .from('syllabus')
    .delete()
    .eq('id', syllabusId)

  return { error }
}
