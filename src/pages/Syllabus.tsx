import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { MagnifyingGlassIcon, DocumentArrowDownIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import { StarIcon, EyeIcon } from '@heroicons/react/24/solid'

interface SyllabusProps {
  user: User | null
}

interface SyllabusItem {
  id: string
  title: string
  course: string
  semester: string
  branch: string
  university: string
  year: string
  downloads: number
  rating: number
  size: string
  uploadDate: string
  uploader: string
}

const mockSyllabus: SyllabusItem[] = [
  {
    id: '1',
    title: 'Computer Science Engineering Syllabus',
    course: 'B.Tech CSE',
    semester: 'All Semesters',
    branch: 'CSE',
    university: 'Delhi University',
    year: '2024',
    downloads: 2340,
    rating: 4.9,
    size: '2.4 MB',
    uploadDate: '2024-01-10',
    uploader: 'Admin'
  },
  {
    id: '2',
    title: 'Electronics & Communication Syllabus',
    course: 'B.Tech ECE',
    semester: 'All Semesters',
    branch: 'ECE',
    university: 'Mumbai University',
    year: '2024',
    downloads: 1890,
    rating: 4.8,
    size: '1.8 MB',
    uploadDate: '2024-01-12',
    uploader: 'Admin'
  },
  {
    id: '3',
    title: 'Mechanical Engineering Syllabus',
    course: 'B.Tech ME',
    semester: 'All Semesters',
    branch: 'ME',
    university: 'IIT Bombay',
    year: '2024',
    downloads: 1567,
    rating: 4.7,
    size: '2.1 MB',
    uploadDate: '2024-01-15',
    uploader: 'Admin'
  }
]

export default function Syllabus({ user }: SyllabusProps) {
  const [syllabusItems, setSyllabusItems] = useState<SyllabusItem[]>(mockSyllabus)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectedUniversity, setSelectedUniversity] = useState('all')

  const branches = ['all', 'CSE', 'ECE', 'ME', 'CE', 'EE', 'IT']
  const universities = ['all', 'Delhi University', 'Mumbai University', 'IIT Bombay', 'IIT Delhi', 'NIT Trichy']

  const filteredSyllabus = syllabusItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = selectedBranch === 'all' || item.branch === selectedBranch
    const matchesUniversity = selectedUniversity === 'all' || item.university === selectedUniversity

    return matchesSearch && matchesBranch && matchesUniversity
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">📄 Course Syllabus</h1>
          <p className="text-gray-600 dark:text-gray-400">Get updated syllabus for all subjects and semesters</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search syllabus by course or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Branch Filter */}
            <div>
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

            {/* University Filter */}
            <div>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {universities.map(university => (
                  <option key={university} value={university}>
                    {university === 'all' ? 'All Universities' : university}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredSyllabus.length} syllabus documents
          </p>
        </div>

        {/* Syllabus List */}
        <div className="space-y-4">
          {filteredSyllabus.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <AcademicCapIcon className="h-8 w-8 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div>
                          <span className="font-medium">Course:</span> {item.course}
                        </div>
                        <div>
                          <span className="font-medium">Branch:</span> {item.branch}
                        </div>
                        <div>
                          <span className="font-medium">University:</span> {item.university}
                        </div>
                        <div>
                          <span className="font-medium">Year:</span> {item.year}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DocumentArrowDownIcon className="h-4 w-4" />
                          <span>{item.downloads} downloads</span>
                        </div>
                        <div>
                          <span>Size: {item.size}</span>
                        </div>
                        <div>
                          <span>Updated: {new Date(item.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
                    <EyeIcon className="h-4 w-4" />
                    Preview
                  </button>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    <DocumentArrowDownIcon className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSyllabus.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No syllabus found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
