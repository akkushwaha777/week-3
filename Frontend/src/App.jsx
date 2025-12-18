import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import UserCard from './components/UserCard'
import AddUserForm from './components/AddUserForm'
import Toast from './components/Toast'
import Modal from './components/Modal'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [serverMessage, setServerMessage] = useState('')
  const [toast, setToast] = useState(null)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/api/users')
        if (userRes.data && userRes.data.data) {
          setUsers(userRes.data.data)
        }

        const msgRes = await axios.get('http://localhost:5000/')
        setServerMessage(msgRes.data)

      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', newUser)
      if (response.data && response.data.data) {
        setUsers([...users, response.data.data])
        setToast({ message: `${newUser.name} added successfully!`, type: 'success' })
      }
    } catch (error) {
      console.error('Error adding user:', error)
      setToast({ message: 'Failed to add user', type: 'error' })
    }
  }

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, updatedData)
      setUsers(users.map(user => (user._id === id ? { ...user, ...updatedData } : user)))
      setToast({ message: 'User updated successfully!', type: 'success' })
    } catch (error) {
      console.error('Error updating user:', error)
      setToast({ message: 'Failed to update user', type: 'error' })
    }
  }

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, userId: id })
  }

  const handleConfirmDelete = async () => {
    const id = deleteModal.userId
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`)
      setUsers(users.filter(user => user._id !== id))
      setToast({ message: 'User deleted successfully!', type: 'success' })
    } catch (error) {
      console.error('Error deleting user:', error)
      setToast({ message: 'Failed to delete user', type: 'error' })
    } finally {
      setDeleteModal({ isOpen: false, userId: null })
    }
  }

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, userId: null })
  }

  return (
    <div className="container">
      <Header />

      <div className="toast-container">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>

      <AddUserForm onAdd={handleAddUser} />

      <Modal
        isOpen={deleteModal.isOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <main>
        {loading ? (
          <div className="loader">Loading team...</div>
        ) : (
          <div className="grid">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onUpdate={handleUpdate}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>

      <footer>
        <p className="server-status">
          Server Status: {serverMessage || 'Checking...'}
        </p>
        <small>&copy; {new Date().getFullYear()} Framboxx IT. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default App
