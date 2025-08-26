# StudyMate Backend - Supabase Setup Guide

## 🚀 Complete Backend Implementation

This guide covers the complete Supabase backend setup for StudyMate - a platform for students to access Notes, Syllabus, and Previous Year Question Papers with both free and paid content.

## 📋 Features Implemented

### ✅ Authentication System
- **Email + Password Authentication**
- **Google OAuth Integration**
- **User Profiles with College/Branch/Year details**
- **Password Reset functionality**

### ✅ Database Schema
- **profiles** - User information and academic details
- **notes** - Study notes with file uploads and pricing
- **syllabus** - Course syllabus documents
- **previous_papers** - Previous year question papers
- **purchases** - Payment tracking for paid content
- **reviews** - User reviews and ratings system

### ✅ File Storage
- **notes_files** bucket - For study notes PDFs/documents
- **syllabus_files** bucket - For syllabus documents
- **papers_files** bucket - For previous year papers

### ✅ Security & Permissions
- **Row Level Security (RLS)** enabled on all tables
- **Secure file upload policies**
- **User-based access control**
- **Purchase verification for paid content**

## 🛠️ Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your Project URL and API Keys

### 2. Environment Variables
Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Database Setup
Run the migration files in your Supabase SQL Editor:

1. **001_initial_schema.sql** - Creates all tables, types, and RLS policies
2. **002_storage_setup.sql** - Sets up storage buckets and policies

### 4. Google OAuth Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add your domain to authorized origins
4. Update Supabase Auth settings with Google credentials

### 5. Install Dependencies
```bash
npm install @supabase/supabase-js
```

## 📁 File Structure

```
src/
├── lib/
│   └── supabase.ts          # Supabase client and types
├── services/
│   ├── auth.ts              # Authentication functions
│   ├── notes.ts             # Notes management
│   ├── syllabus.ts          # Syllabus management
│   ├── papers.ts            # Previous papers management
│   ├── purchases.ts         # Purchase tracking
│   └── reviews.ts           # Reviews system
├── hooks/
│   └── useSupabaseAuth.ts   # Auth state management
└── supabase/
    ├── migrations/
    │   ├── 001_initial_schema.sql
    │   └── 002_storage_setup.sql
    └── config.toml
```

## 🔧 API Usage Examples

### Authentication
```typescript
import { signUp, signIn, signOut } from './services/auth'

// Sign up new user
const { user, error } = await signUp({
  email: 'student@college.edu',
  password: 'password123',
  fullName: 'John Doe',
  college: 'ABC University',
  branch: 'Computer Science',
  year: 2
})

// Sign in
const { user, error } = await signIn({
  email: 'student@college.edu',
  password: 'password123'
})
```

### Notes Management
```typescript
import { uploadNote, getNotes } from './services/notes'

// Upload a note
const { note, error } = await uploadNote({
  title: 'Data Structures Notes',
  description: 'Complete notes on DSA',
  subject: 'Computer Science',
  semester: 3,
  branch: 'CSE',
  price: 99.00,
  file: selectedFile
}, userId)

// Get filtered notes
const { notes, error } = await getNotes({
  branch: 'CSE',
  semester: 3,
  subject: 'Computer Science'
})
```

### File Upload
```typescript
// Files are automatically uploaded to Supabase Storage
// URLs are generated and stored in database
// Access is controlled via RLS policies
```

## 🔒 Security Features

### Row Level Security Policies
- Users can only view/edit their own profiles
- Anyone can view free content
- Paid content requires purchase verification
- Users can only upload content when authenticated
- File access is controlled via storage policies

### Purchase Verification
```typescript
import { hasUserPurchased } from './services/purchases'

const { hasPurchased } = await hasUserPurchased(userId, 'note', noteId)
if (!hasPurchased && note.price > 0) {
  // Redirect to purchase flow
}
```

## 📊 Database Schema Details

### Tables Overview
- **profiles**: User academic information
- **notes**: Study materials with pricing
- **syllabus**: Course syllabus documents  
- **previous_papers**: Past exam papers
- **purchases**: Payment tracking
- **reviews**: User feedback system

### Storage Buckets
- **notes_files**: Study notes storage
- **syllabus_files**: Syllabus documents
- **papers_files**: Previous year papers

## 🚀 Deployment

The backend is fully configured and ready for production use with:
- Automatic user profile creation on signup
- Secure file uploads with proper permissions
- Purchase tracking for monetization
- Review system for quality control
- Comprehensive error handling

## 📞 Support

For issues or questions:
- Check Supabase documentation
- Review RLS policies in Supabase dashboard
- Verify environment variables
- Check browser console for errors

---

**StudyMate Backend is now fully functional with Supabase! 🎉**
