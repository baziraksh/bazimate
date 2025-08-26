import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { MagnifyingGlassIcon, FunnelIcon, DocumentTextIcon, PhotoIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface NotesProps {
  user: User | null
}

interface Note {
  id: string
  title: string
  subject: string
  semester: string
  branch: string
  college: string
  type: 'pdf' | 'image' | 'doc'
  price: number
  rating: number
  downloads: number
  uploader: string
  uploadDate: string
  thumbnail?: string
  isPremium: boolean
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Data Structures Complete Notes',
    subject: 'Computer Science',
    semester: '3rd',
    branch: 'CSE',
    college: 'IIT Delhi',
    type: 'pdf',
    price: 0,
    rating: 4.8,
    downloads: 1250,
    uploader: 'Rahul Kumar',
    uploadDate: '2024-01-15',
    isPremium: false
  },
  {
    id: '2',
    title: 'Algorithms Handwritten Notes',
    subject: 'Computer Science',
    semester: '4th',
    branch: 'CSE',
    college: 'NIT Trichy',
    type: 'image',
    price: 50,
    rating: 4.9,
    downloads: 890,
    uploader: 'Priya Sharma',
    uploadDate: '2024-01-20',
    isPremium: true
  },
  {
    id: '3',
    title: 'Database Management Systems',
    subject: 'Computer Science',
    semester: '5th',
    branch: 'CSE',
    college: 'BITS Pilani',
    type: 'pdf',
    price: 30,
    rating: 4.7,
    downloads: 756,
    uploader: 'Amit Patel',
    uploadDate: '2024-01-18',
    isPremium: true
  }
]

export default function Notes({ user }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedSemester, setSelectedSemester] = useState('all')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [showFilters, setShowFilters] = useState(false)

  const subjects = ['all', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Electronics']
  const semesters = ['all', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
  const branches = ['all', 'CSE', 'ECE', 'ME', 'CE', 'EE', 'IT']

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject
    const matchesSemester = selectedSemester === 'all' || note.semester === selectedSemester
    const matchesBranch = selectedBranch === 'all' || note.branch === selectedBranch

    return matchesSearch && matchesSubject && matchesSemester && matchesBranch
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <DocumentTextIcon className="h-5 w-5 text-red-500" />
      case 'image': return <PhotoIcon className="h-5 w-5 text-blue-500" />
      case 'doc': return <DocumentIcon className="h-5 w-5 text-blue-600" />
      default: return <DocumentTextIcon className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">📘 Study Notes</h1>
          <p className="text-gray-600 dark:text-gray-400">Access comprehensive study notes from top students</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes by title or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {semesters.map(semester => (
                      <option key={semester} value={semester}>
                        {semester === 'all' ? 'All Semesters' : semester}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {branches.map(branch => (
                      <option key={branch} value={branch}>
                        {branch === 'all' ? 'All Branches' : branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredNotes.length} notes
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              {/* Note Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getFileIcon(note.type)}
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      {note.type}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <HeartIcon className="h-5 w-5" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {note.title}
                </h3>

                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p><span className="font-medium">Subject:</span> {note.subject}</p>
                  <p><span className="font-medium">Semester:</span> {note.semester}</p>
                  <p><span className="font-medium">Branch:</span> {note.branch}</p>
                  <p><span className="font-medium">College:</span> {note.college}</p>
                </div>

                {/* Rating and Downloads */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{note.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowDownTrayIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{note.downloads}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    {note.price === 0 ? (
                      <span className="text-lg font-bold text-green-600">Free</span>
                    ) : (
                      <span className="text-lg font-bold text-blue-600">₹{note.price}</span>
                    )}
                    {note.isPremium && (
                      <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Premium</span>
                    )}
                  </div>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    {note.price === 0 ? 'Download' : 'Buy Now'}
                  </button>
                </div>

                {/* Uploader Info */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By {note.uploader} • {new Date(note.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notes found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
