import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

function Dashboard() {
  const { appUser } = useAuth()

  if (!appUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please sign in to access your dashboard
          </h2>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Points', value: appUser.points, icon: '⭐' },
    { label: 'Downloads', value: 12, icon: '📥' },
    { label: 'Wishlist', value: 5, icon: '❤️' },
    { label: 'Reviews', value: 8, icon: '📝' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {appUser.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your learning dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center space-x-3 p-6">
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Downloads */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Downloads 📥</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Data Structures Notes
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Computer Science • Semester 3
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions ⚡</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  🔍 Browse Resources
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  ❤️ View Wishlist
                </Button>
                {appUser.role !== 'student' && (
                  <Button variant="outline" className="w-full justify-start">
                    📤 Upload Resource
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
