import React, { useState, useEffect } from 'react'
import { SearchFilter } from '../components/ui/SearchFilter'
import { ResourceCard } from '../components/ui/ResourceCard'
import { Button } from '../components/ui/Button'
import type { Resource, SearchFilters } from '../types'

// Mock data for demonstration
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Complete Data Structures and Algorithms Notes',
    description: 'Comprehensive notes covering all DSA topics with examples and practice problems',
    category: 'notes',
    subject: 'Computer Science',
    semester: '3',
    year: '2024',
    price: 299,
    file_url: '',
    preview_url: '',
    uploader_id: 'user1',
    approved: true,
    downloads: 1250,
    rating: 4.8,
    review_count: 89,
    created_at: '2024-01-15',
    updated_at: '2024-01-15'
  },
  {
    id: '2',
    title: 'Mathematics Syllabus - Engineering',
    description: 'Updated syllabus for Engineering Mathematics covering all units',
    category: 'syllabus',
    subject: 'Mathematics',
    semester: '2',
    year: '2024',
    price: 0,
    file_url: '',
    preview_url: '',
    uploader_id: 'user2',
    approved: true,
    downloads: 890,
    rating: 4.5,
    review_count: 45,
    created_at: '2024-02-10',
    updated_at: '2024-02-10'
  },
  {
    id: '3',
    title: 'Physics Previous Year Papers 2019-2023',
    description: 'Collection of previous year question papers with solutions',
    category: 'papers',
    subject: 'Physics',
    semester: '1',
    year: '2023',
    price: 199,
    file_url: '',
    preview_url: '',
    uploader_id: 'user3',
    approved: true,
    downloads: 567,
    rating: 4.7,
    review_count: 34,
    created_at: '2024-03-05',
    updated_at: '2024-03-05'
  },
  {
    id: '4',
    title: 'Web Development Complete Guide',
    description: 'Full stack web development notes with HTML, CSS, JavaScript, React, Node.js',
    category: 'notes',
    subject: 'Computer Science',
    semester: '5',
    year: '2024',
    price: 499,
    file_url: '',
    preview_url: '',
    uploader_id: 'user4',
    approved: true,
    downloads: 2100,
    rating: 4.9,
    review_count: 156,
    created_at: '2024-01-20',
    updated_at: '2024-01-20'
  },
  {
    id: '5',
    title: 'Chemistry Lab Manual',
    description: 'Practical chemistry lab experiments with procedures and observations',
    category: 'notes',
    subject: 'Chemistry',
    semester: '2',
    year: '2024',
    price: 150,
    file_url: '',
    preview_url: '',
    uploader_id: 'user5',
    approved: true,
    downloads: 445,
    rating: 4.3,
    review_count: 28,
    created_at: '2024-02-28',
    updated_at: '2024-02-28'
  },
  {
    id: '6',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to ML concepts, algorithms, and practical implementations',
    category: 'notes',
    subject: 'Computer Science',
    semester: '7',
    year: '2024',
    price: 399,
    file_url: '',
    preview_url: '',
    uploader_id: 'user6',
    approved: true,
    downloads: 789,
    rating: 4.6,
    review_count: 67,
    created_at: '2024-03-15',
    updated_at: '2024-03-15'
  }
]

export function Browse() {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources)
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'latest'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    applyFilters()
  }, [filters, resources])

  const applyFilters = () => {
    let filtered = [...resources]

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(resource => resource.category === filters.category)
    }

    // Apply subject filter
    if (filters.subject) {
      filtered = filtered.filter(resource => 
        resource.subject.toLowerCase().includes(filters.subject!.toLowerCase())
      )
    }

    // Apply semester filter
    if (filters.semester) {
      filtered = filtered.filter(resource => resource.semester === filters.semester)
    }

    // Apply year filter
    if (filters.year) {
      filtered = filtered.filter(resource => resource.year === filters.year)
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter(resource => resource.price >= min && resource.price <= max)
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'latest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setFilteredResources(filtered)
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredResources(resources)
      return
    }

    const searchResults = resources.filter(resource =>
      resource.title.toLowerCase().includes(query.toLowerCase()) ||
      resource.description.toLowerCase().includes(query.toLowerCase()) ||
      resource.subject.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredResources(searchResults)
  }

  const handleAddToWishlist = (resourceId: string) => {
    // TODO: Implement wishlist functionality
    console.log('Add to wishlist:', resourceId)
  }

  const handlePurchase = (resourceId: string) => {
    // TODO: Implement purchase functionality
    console.log('Purchase resource:', resourceId)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Browse Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find the perfect study materials for your academic needs
          </p>
        </div>

        <SearchFilter
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
        />

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              🔄 Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading resources...</span>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button onClick={() => {
              setFilters({ sortBy: 'latest' })
              setFilteredResources(resources)
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onAddToWishlist={handleAddToWishlist}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
