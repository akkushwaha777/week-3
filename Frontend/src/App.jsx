import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import UserCard from './components/UserCard'
import AddUserForm from './components/AddUserForm'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [serverMessage, setServerMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Users
        const userRes = await axios.get('http://localhost:5000/api/users')
        if (userRes.data && userRes.data.data) {
          setUsers(userRes.data.data)
        }

        // Fetch Server Status Message (Requirement: "GET endpoint that returns a simple message")
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
        setSuccessMessage(`✅ ${newUser.name} has been added successfully!`)

        // Auto-dismiss the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error('Error adding user:', error)
      alert('Failed to add user')
    }
  }

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, updatedData)
      setUsers(users.map(user => (user._id === id ? { ...user, ...updatedData } : user)))
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`)
        setUsers(users.filter(user => user._id !== id))
      } catch (error) {
        console.error('Error deleting user:', error)
        alert(`Failed to delete user: ${error.response ? error.response.statusText : error.message}`)
      }
    }
  }

  return (
    <div className="container">
      <Header />

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <AddUserForm onAdd={handleAddUser} />

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
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <footer style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.7 }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#2563eb' }}>
          Server Status: {serverMessage || 'Checking...'}
        </p>
        <small>&copy; {new Date().getFullYear()} @. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default App
