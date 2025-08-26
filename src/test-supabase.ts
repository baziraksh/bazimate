// Test file to verify Supabase connection
import { supabase } from './lib/supabase'

export const testSupabaseConnection = async () => {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Supabase connection failed:', error.message)
      return false
    }

    console.log('✅ Supabase connected successfully!')
    console.log('📊 Database tables are accessible')
    
    // Test storage buckets
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
    
    if (storageError) {
      console.error('❌ Storage buckets error:', storageError.message)
    } else {
      console.log('📁 Storage buckets available:', buckets?.map(b => b.name))
    }

    return true
  } catch (err) {
    console.error('❌ Connection test failed:', err)
    return false
  }
}

// Run test if this file is executed directly
if (import.meta.hot) {
  testSupabaseConnection()
}
