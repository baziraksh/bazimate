import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { MagnifyingGlassIcon, DocumentTextIcon, CalendarIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'
import { StarIcon, EyeIcon } from '@heroicons/react/24/solid'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface PapersProps {
  user: User | null
}

interface Paper {
  id: string
  title: string
  subject: string
  year: string
  semester: string
  branch: string
  college: string
  university: string
  examType: 'Mid-term' | 'End-term' | 'Quiz' | 'Assignment'
  price: number
  rating: number
  downloads: number
  uploader: string
  uploadDate: string
  size: string
}

const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Data Structures End-Term Paper',
    subject: 'Data Structures',
    year: '2023',
    semester: '3rd',
    branch: 'CSE',
    college: 'IIT Delhi',
    university: 'IIT Delhi',
    examType: 'End-term',
    price: 0,
    rating: 4.8,
    downloads: 1850,
    uploader: 'Rajesh Kumar',
    uploadDate: '2024-01-20',
    size: '1.2 MB'
  },
  {
    id: '2',
    title: 'Algorithms Mid-Term Paper',
    subject: 'Algorithms',
    year: '2023',
    semester: '4th',
    branch: 'CSE',
    college: 'NIT Trichy',
    university: 'NIT Trichy',
    examType: 'Mid-term',
    price: 25,
    rating: 4.9,
    downloads: 1234,
    uploader: 'Sneha Patel',
    uploadDate: '2024-01-18',
    size: '0.8 MB'
  },
  {
    id: '3',
    title: 'Database Management Systems Paper',
    subject: 'DBMS',
    year: '2022',
    semester: '5th',
    branch: 'CSE',
    college: 'BITS Pilani',
    university: 'BITS Pilani',
    examType: 'End-term',
    price: 30,
    rating: 4.7,
    downloads: 967,
    uploader: 'Arjun Singh',
    uploadDate: '2024-01-15',
    size: '1.5 MB'
  }
]

export default function Papers({ user }: PapersProps) {
  const [papers, setPapers] = useState<Paper[]>(mockPapers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedExamType, setSelectedExamType] = useState('all')

  const years = ['all', '2024', '2023', '2022', '2021', '2020']
  const branches = ['all', 'CSE', 'ECE', 'ME', 'CE', 'EE', 'IT']
  const subjects = ['all', 'Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks']
  const examTypes = ['all', 'Mid-term', 'End-term', 'Quiz', 'Assignment']

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.college.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === 'all' || paper.year === selectedYear
    const matchesBranch = selectedBranch === 'all' || paper.branch === selectedBranch
    const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject
    const matchesExamType = selectedExamType === 'all' || paper.examType === selectedExamType

    return matchesSearch && matchesYear && matchesBranch && matchesSubject && matchesExamType
  })

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'End-term': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Mid-term': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Quiz': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Assignment': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">📑 Previous Year Papers</h1>
          <p className="text-gray-600 dark:text-gray-400">Practice with previous year question papers from top colleges</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search papers by subject or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Year Filter */}
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
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

            {/* Subject Filter */}
            <div>
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

            {/* Exam Type Filter */}
            <div>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {examTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredPapers.length} question papers
          </p>
        </div>

        {/* Papers List */}
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <DocumentTextIcon className="h-8 w-8 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {paper.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getExamTypeColor(paper.examType)}`}>
                          {paper.examType}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{paper.year}</span>
                        </div>
                        <div>
                          <span className="font-medium">Subject:</span> {paper.subject}
                        </div>
                        <div>
                          <span className="font-medium">Semester:</span> {paper.semester}
                        </div>
                        <div>
                          <span className="font-medium">Branch:</span> {paper.branch}
                        </div>
                        <div className="flex items-center gap-1">
                          <BuildingLibraryIcon className="h-4 w-4" />
                          <span>{paper.college}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span>{paper.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          <span>{paper.downloads} downloads</span>
                        </div>
                        <div>
                          <span>Size: {paper.size}</span>
                        </div>
                        <div>
                          <span>By {paper.uploader}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          {paper.price === 0 ? (
                            <span className="text-lg font-bold text-green-600">Free</span>
                          ) : (
                            <span className="text-lg font-bold text-blue-600">₹{paper.price}</span>
                          )}
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
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    {paper.price === 0 ? 'Download' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No papers found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
