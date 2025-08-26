import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from './Card'
import { Button } from './Button'
import { formatPrice, getFileIcon } from '../../lib/utils'
import type { Resource } from '../../types'

interface ResourceCardProps {
  resource: Resource
  onAddToWishlist?: (resourceId: string) => void
  onPurchase?: (resourceId: string) => void
  isPurchased?: boolean
  isInWishlist?: boolean
}

export function ResourceCard({ 
  resource, 
  onAddToWishlist, 
  onPurchase, 
  isPurchased = false,
  isInWishlist = false 
}: ResourceCardProps) {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToWishlist?.(resource.id)
  }

  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onPurchase?.(resource.id)
  }

  return (
    <Link to={`/resource/${resource.id}`}>
      <Card hover className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getFileIcon(resource.category)}</span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {resource.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {resource.subject} • {resource.semester}
                </span>
              </div>
            </div>
            <button
              onClick={handleWishlistClick}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className={`text-lg ${isInWishlist ? '❤️' : '🤍'}`}>
                {isInWishlist ? '❤️' : '🤍'}
              </span>
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {resource.title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {resource.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {resource.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({resource.review_count})
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {resource.downloads} downloads
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {resource.price === 0 ? (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                  FREE
                </span>
              ) : (
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(resource.price)}
                </span>
              )}
            </div>

            {isPurchased ? (
              <Button size="sm" variant="secondary">
                📥 Downloaded
              </Button>
            ) : (
              <Button 
                size="sm" 
                onClick={handlePurchaseClick}
                className="min-w-[80px]"
              >
                {resource.price === 0 ? 'Get Free' : 'Buy Now'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
