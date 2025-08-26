import { supabase, PreviousPaper } from '../lib/supabase'

export interface CreatePaperData {
  title: string
  subject: string
  year: number
  branch: string
  semester: number
  file: File
}

export interface PapersFilter {
  subject?: string
  year?: number
  branch?: string
  semester?: number
  search?: string
}

// Upload previous paper with file
export const uploadPaper = async (data: CreatePaperData, userId: string) => {
  try {
    // Upload file to storage
    const fileExt = data.file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    const { data: fileData, error: uploadError } = await supabase.storage
      .from('papers_files')
      .upload(fileName, data.file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('papers_files')
      .getPublicUrl(fileName)

    // Create paper record
    const { data: paper, error: insertError } = await supabase
      .from('previous_papers')
      .insert({
        title: data.title,
        file_url: publicUrl,
        subject: data.subject,
        year: data.year,
        branch: data.branch,
        semester: data.semester
      })
      .select()
      .single()

    if (insertError) throw insertError

    return { paper, error: null }
  } catch (error) {
    return { paper: null, error }
  }
}

// Get all papers with filters
export const getPapers = async (filters: PapersFilter = {}) => {
  let query = supabase
    .from('previous_papers')
    .select('*')

  // Apply filters
  if (filters.subject) {
    query = query.eq('subject', filters.subject)
  }
  
  if (filters.year) {
    query = query.eq('year', filters.year)
  }
  
  if (filters.branch) {
    query = query.eq('branch', filters.branch)
  }
  
  if (filters.semester) {
    query = query.eq('semester', filters.semester)
  }
  
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`)
  }

  const { data: papers, error } = await query.order('year', { ascending: false })

  return { papers, error }
}

// Get single paper
export const getPaper = async (paperId: string) => {
  const { data: paper, error } = await supabase
    .from('previous_papers')
    .select('*')
    .eq('id', paperId)
    .single()

  return { paper, error }
}

// Update paper
export const updatePaper = async (paperId: string, updates: Partial<PreviousPaper>) => {
  const { data: paper, error } = await supabase
    .from('previous_papers')
    .update(updates)
    .eq('id', paperId)
    .select()
    .single()

  return { paper, error }
}

// Delete paper
export const deletePaper = async (paperId: string) => {
  // First get the paper to get file URL
  const { data: paper } = await supabase
    .from('previous_papers')
    .select('file_url')
    .eq('id', paperId)
    .single()

  if (paper?.file_url) {
    // Extract file path from URL
    const filePath = paper.file_url.split('/').slice(-2).join('/')
    
    // Delete file from storage
    await supabase.storage
      .from('papers_files')
      .remove([filePath])
  }

  // Delete paper record
  const { error } = await supabase
    .from('previous_papers')
    .delete()
    .eq('id', paperId)

  return { error }
}
