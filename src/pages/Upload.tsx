import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

function Upload() {
  const { appUser } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'notes' as 'notes' | 'syllabus' | 'papers',
    subject: '',
    semester: '',
    year: '2024',
    price: 0,
    file: null as File | null
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!appUser || appUser.role === 'student') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Only uploaders and admins can access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement
      setFormData(prev => ({
        ...prev,
        [name]: fileInput.files?.[0] || null
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implement file upload to Supabase storage
      // TODO: Create resource record in database
      // TODO: Set approval status to false for admin review
      
      console.log('Uploading resource:', formData)
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(true)
      setFormData({
        title: '',
        description: '',
        category: 'notes',
        subject: '',
        semester: '',
        year: '2024',
        price: 0,
        file: null
      })
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Upload Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your resource has been submitted for admin approval.
            </p>
            <Button onClick={() => setSuccess(false)}>
              Upload Another
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Upload Resource 📤
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share your study materials with fellow students
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resource Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter resource title"
                required
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your resource..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="notes">📘 Notes</option>
                    <option value="syllabus">📄 Syllabus</option>
                    <option value="papers">📑 Previous Papers</option>
                  </select>
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select Semester</option>
                    {Array.from({ length: 8 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Semester {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2024"
                  required
                />

                <Input
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0 for free"
                  min="0"
                  step="1"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  File Upload
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max: 10MB)
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-400">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Review Process
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <p>
                        Your uploaded resource will be reviewed by our admin team before being published. 
                        This ensures quality and prevents copyright violations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({
                    title: '',
                    description: '',
                    category: 'notes',
                    subject: '',
                    semester: '',
                    year: '2024',
                    price: 0,
                    file: null
                  })}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading || !formData.file}
                >
                  {loading ? 'Uploading...' : 'Upload Resource'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Upload
