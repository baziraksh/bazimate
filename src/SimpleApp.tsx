function SimpleApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold text-blue-600 ml-2">BaziMate</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Notes 📘</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Syllabus 📄</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Papers 📑</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl">📚</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            All Your College Resources
            <span className="block text-blue-600">in One Place</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access notes, syllabus, and previous year papers from top students. 
            Buy quality resources or earn by sharing your own study materials.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium">
              Get Started Free 🚀
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium">
              Browse Resources 📖
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You'll Find Here
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">📘</div>
              <h3 className="text-xl font-semibold mb-2">Notes</h3>
              <p className="text-gray-600">Access comprehensive study notes from top students</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2">Syllabus</h3>
              <p className="text-gray-600">Get updated syllabus for all subjects and semesters</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">📑</div>
              <h3 className="text-xl font-semibold mb-2">Previous Papers</h3>
              <p className="text-gray-600">Practice with previous year question papers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600 font-medium">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SimpleApp
