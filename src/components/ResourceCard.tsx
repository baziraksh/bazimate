import React from 'react';

interface ResourceCardProps {
  id: string;
  type: 'Notes' | 'Syllabus' | 'Papers';
  title: string;
  description: string;
  subject: string;
  semester: string;
  year: string;
  rating: number;
  downloads: number;
  author: string;
  price: number | 'free';
  previewUrl?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  type,
  title,
  description,
  subject,
  semester,
  year,
  rating,
  downloads,
  author,
  price,
  previewUrl
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Notes':
        return 'bg-blue-100 text-blue-700';
      case 'Syllabus':
        return 'bg-green-100 text-green-700';
      case 'Papers':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDownloads = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      {/* Resource Type Tag */}
      <div className="flex justify-between items-start mb-4">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
          {type}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-blue-600 mb-2 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {/* Meta Info */}
      <div className="space-y-3 mb-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            {subject}
          </span>
          <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            Sem {semester}
          </span>
          <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            {year}
          </span>
        </div>

        {/* Rating and Downloads */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {renderStars(rating)}
            </div>
            <span className="text-gray-500 ml-1">({rating})</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{formatDownloads(downloads)}</span>
            </div>
            
            {previewUrl && (
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs">Preview</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          By <button className="text-blue-600 hover:text-blue-700 font-medium">{author}</button>
        </p>
      </div>

      {/* Pricing & Actions */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-4">
          {price === 'free' ? (
            <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              FREE
            </span>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              ₹{price}
            </span>
          )}
        </div>

        <div className="flex space-x-3">
          {previewUrl && (
            <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
              Preview
            </button>
          )}
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            {price === 'free' ? 'Get Free' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
