import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { UserCircleIcon, AcademicCapIcon, BookmarkIcon, CreditCardIcon, StarIcon } from '@heroicons/react/24/outline'
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface ProfileProps {
  user: User | null
}

interface UserProfile {
  name: string
  email: string
  college: string
  branch: string
  year: string
  points: number
  totalPurchases: number
  totalUploads: number
  joinDate: string
}

interface Purchase {
  id: string
  title: string
  type: 'notes' | 'syllabus' | 'paper'
  price: number
  purchaseDate: string
}

interface Bookmark {
  id: string
  title: string
  type: 'notes' | 'syllabus' | 'paper'
  subject: string
  addedDate: string
}

export default function Profile({ user }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Rakesh Bazzi',
    email: user?.email || 'rakesh@example.com',
    college: 'IIT Delhi',
    branch: 'Computer Science Engineering',
    year: '3rd Year',
    points: 1250,
    totalPurchases: 15,
    totalUploads: 8,
    joinDate: '2023-09-15'
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  const mockPurchases: Purchase[] = [
    {
      id: '1',
      title: 'Data Structures Complete Notes',
      type: 'notes',
      price: 50,
      purchaseDate: '2024-01-20'
    },
    {
      id: '2',
      title: 'Algorithms End-Term Paper',
      type: 'paper',
      price: 30,
      purchaseDate: '2024-01-18'
    }
  ]

  const mockBookmarks: Bookmark[] = [
    {
      id: '1',
      title: 'Database Management Systems',
      type: 'notes',
      subject: 'Computer Science',
      addedDate: '2024-01-22'
    },
    {
      id: '2',
      title: 'Operating Systems Syllabus',
      type: 'syllabus',
      subject: 'Computer Science',
      addedDate: '2024-01-21'
    }
  ]

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <UserCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Please log in</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You need to be logged in to view your profile.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">👤 My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account and view your activity</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <UserCircleIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
              </div>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <PencilIcon className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  <CheckIcon className="h-4 w-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                College
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.college}
                  onChange={(e) => setEditedProfile({...editedProfile, college: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profile.college}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Branch
              </label>
              {isEditing ? (
                <select
                  value={editedProfile.branch}
                  onChange={(e) => setEditedProfile({...editedProfile, branch: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Computer Science Engineering">Computer Science Engineering</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white">{profile.branch}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              {isEditing ? (
                <select
                  value={editedProfile.year}
                  onChange={(e) => setEditedProfile({...editedProfile, year: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white">{profile.year}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.points}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{profile.totalPurchases}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Purchases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{profile.totalUploads}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uploads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('purchases')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'purchases'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <CreditCardIcon className="h-5 w-5 inline mr-2" />
              Purchase History
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookmarks'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <BookmarkIcon className="h-5 w-5 inline mr-2" />
              Bookmarks
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'purchases' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Purchase History</h3>
              <div className="space-y-4">
                {mockPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{purchase.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {purchase.type} • Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">₹{purchase.price}</div>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        Download Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Saved Items</h3>
              <div className="space-y-4">
                {mockBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{bookmark.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bookmark.subject} • {bookmark.type} • Saved on {new Date(bookmark.addedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                        View
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:underline text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
