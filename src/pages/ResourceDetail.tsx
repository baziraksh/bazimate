import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { formatPrice, getFileIcon, formatDate } from '../lib/utils'

// Mock resource data
const mockResource = {
  id: '1',
  title: 'Complete Data Structures and Algorithms Notes',
  description: 'Comprehensive notes covering all DSA topics including arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and dynamic programming. Perfect for exam preparation and interview prep.',
  category: 'notes' as const,
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
}

const mockReviews = [
  {
    id: '1',
    user_name: 'Priya Sharma',
    rating: 5,
    comment: 'Excellent notes! Very detailed and well-organized. Helped me ace my DSA exam.',
    created_at: '2024-03-10'
  },
  {
    id: '2',
    user_name: 'Rahul Kumar',
    rating: 4,
    comment: 'Good content but could use more examples in some topics.',
    created_at: '2024-03-08'
  }
]

function ResourceDetail() {
  const { id } = useParams()
  const [isPurchased, setIsPurchased] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const resource = mockResource // In real app, fetch by id

  const handlePurchase = () => {
    // TODO: Implement payment flow
    console.log('Purchase resource:', id)
    setIsPurchased(true)
  }

  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{getFileIcon(resource.category)}</span>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {resource.category} • {resource.subject}
                      </div>
                      <CardTitle className="text-2xl">{resource.title}</CardTitle>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Semester {resource.semester} • {resource.year}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleWishlist}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-2xl">
                      {isInWishlist ? '❤️' : '🤍'}
                    </span>
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-1">
                    {renderStars(Math.floor(resource.rating))}
                    <span className="ml-2 font-medium">{resource.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({resource.review_count} reviews)
                    </span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {resource.downloads} downloads
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none mb-6">
                  <h3>Description</h3>
                  <p>{resource.description}</p>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <Button
                    onClick={() => setShowPreview(!showPreview)}
                    variant="outline"
                  >
                    👁️ {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </Button>
                </div>

                {showPreview && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                        <div className="text-6xl mb-4">📄</div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Preview content would be displayed here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {review.user_name}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(review.created_at)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  {resource.price === 0 ? (
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      FREE
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(resource.price)}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {isPurchased ? (
                    <Button className="w-full" size="lg">
                      📥 Download Now
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handlePurchase}
                    >
                      {resource.price === 0 ? '🆓 Get Free' : '💳 Buy Now'}
                    </Button>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleWishlist}
                  >
                    {isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Resource Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Category:</span>
                      <span className="text-gray-900 dark:text-white capitalize">
                        {resource.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subject:</span>
                      <span className="text-gray-900 dark:text-white">
                        {resource.subject}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Semester:</span>
                      <span className="text-gray-900 dark:text-white">
                        {resource.semester}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Year:</span>
                      <span className="text-gray-900 dark:text-white">
                        {resource.year}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Uploaded:</span>
                      <span className="text-gray-900 dark:text-white">
                        {formatDate(resource.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourceDetail
