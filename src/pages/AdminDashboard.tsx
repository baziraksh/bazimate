import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  CurrencyRupeeIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

interface AdminDashboardProps {
  user: User | null
}

interface PendingUpload {
  id: string
  title: string
  type: 'notes' | 'syllabus' | 'paper'
  uploader: string
  uploadDate: string
  subject: string
  semester: string
  branch: string
  status: 'pending' | 'approved' | 'rejected'
}

interface Transaction {
  id: string
  buyer: string
  item: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
}

const mockPendingUploads: PendingUpload[] = [
  {
    id: '1',
    title: 'Advanced Data Structures Notes',
    type: 'notes',
    uploader: 'Rahul Kumar',
    uploadDate: '2024-01-25',
    subject: 'Computer Science',
    semester: '4th',
    branch: 'CSE',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Machine Learning End-Term Paper',
    type: 'paper',
    uploader: 'Priya Sharma',
    uploadDate: '2024-01-24',
    subject: 'Computer Science',
    semester: '6th',
    branch: 'CSE',
    status: 'pending'
  }
]

const mockTransactions: Transaction[] = [
  {
    id: '1',
    buyer: 'Amit Patel',
    item: 'Database Management Notes',
    amount: 50,
    date: '2024-01-25',
    status: 'completed'
  },
  {
    id: '2',
    buyer: 'Sneha Singh',
    item: 'Algorithms Paper',
    amount: 30,
    date: '2024-01-24',
    status: 'completed'
  }
]

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>(mockPendingUploads)
  const [transactions] = useState<Transaction[]>(mockTransactions)

  // Check if user is admin (in real app, this would be from database)
  const isAdmin = user?.email === 'admin@bazimate.com' || user?.email?.includes('admin')

  const handleApprove = (id: string) => {
    setPendingUploads(prev => 
      prev.map(upload => 
        upload.id === id ? { ...upload, status: 'approved' } : upload
      )
    )
  }

  const handleReject = (id: string) => {
    setPendingUploads(prev => 
      prev.map(upload => 
        upload.id === id ? { ...upload, status: 'rejected' } : upload
      )
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Please log in</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You need to be logged in to access the admin dashboard.
          </p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You don't have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🛠️ Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage content, users, and transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Resources</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,247</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">8,432</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <CurrencyRupeeIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">₹45,230</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Approvals</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingUploads.filter(u => u.status === 'pending').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('approvals')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approvals'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Pending Approvals ({pendingUploads.filter(u => u.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Transactions
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">New user registration</span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Resource uploaded</span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">4 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Payment processed</span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">6 hours ago</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Resources</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Data Structures Notes</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">1,250 downloads</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Algorithms Paper</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">890 downloads</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">DBMS Syllabus</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">756 downloads</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Approvals</h3>
              <div className="space-y-4">
                {pendingUploads.filter(upload => upload.status === 'pending').map((upload) => (
                  <div key={upload.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">{upload.title}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div><span className="font-medium">Type:</span> {upload.type}</div>
                          <div><span className="font-medium">Subject:</span> {upload.subject}</div>
                          <div><span className="font-medium">Semester:</span> {upload.semester}</div>
                          <div><span className="font-medium">Branch:</span> {upload.branch}</div>
                          <div><span className="font-medium">Uploader:</span> {upload.uploader}</div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          Uploaded on {new Date(upload.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                          <EyeIcon className="h-4 w-4" />
                          Preview
                        </button>
                        <button
                          onClick={() => handleApprove(upload.id)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(upload.id)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          <XCircleIcon className="h-4 w-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {pendingUploads.filter(upload => upload.status === 'pending').length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">All caught up!</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      No pending approvals at the moment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Buyer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.buyer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {transaction.item}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          ₹{transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
