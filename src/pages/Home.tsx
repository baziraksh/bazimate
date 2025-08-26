import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

function Home() {
  const features = [
    {
      icon: '📘',
      title: 'Notes',
      description: 'Access comprehensive study notes from top students',
      link: '/notes'
    },
    {
      icon: '📄',
      title: 'Syllabus',
      description: 'Get updated syllabus for all subjects and semesters',
      link: '/syllabus'
    },
    {
      icon: '📑',
      title: 'Previous Papers',
      description: 'Practice with previous year question papers',
      link: '/papers'
    }
  ]

  const stats = [
    { label: 'Resources', value: '10,000+' },
    { label: 'Students', value: '50,000+' },
    { label: 'Universities', value: '500+' },
    { label: 'Success Rate', value: '95%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-bounce-gentle mb-8">
            <span className="text-6xl">📚</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            All Your College Resources
            <span className="block text-primary-600 dark:text-primary-400">in One Place</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
            Access notes, syllabus, and previous year papers from top students. 
            Buy quality resources or earn by sharing your own study materials.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free 🚀
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse Resources 📖
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What You'll Find Here
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card hover className="text-center h-full">
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How BaziMate Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Search & Browse
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find exactly what you need with our powerful search and filter system
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Preview & Buy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Preview resources before purchasing to ensure quality and relevance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Download & Study
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access your purchased resources anytime, anywhere for effective studying
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Ace Your Exams? 🎯
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students who are already using BaziMate to excel in their studies
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Start Learning Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
