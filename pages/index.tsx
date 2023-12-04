import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import SignOutButton from '../components/SignOutButton/SignOutButton'

const DashboardPage: React.FC = () => {
  const router = useRouter()
  const [userDetails, setUserDetails] = useState(null)

  // Function to retrieve user details from localStorage
  const getUserDetails = () => {
    const userDetailsString = localStorage.getItem('userDetails')
    return userDetailsString ? JSON.parse(userDetailsString) : null
  }

  useEffect(() => {
    const userDetailsFromStorage = getUserDetails()
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    // Redirect to login if user is not authenticated
    if (!accessToken || !refreshToken || !userDetailsFromStorage) {
      router.push('/login')
    } else {
      setUserDetails(userDetailsFromStorage)
    }
  }, [router])

  if (!userDetails) {
    // User details not yet retrieved
    return <p>Loading...</p>
  }

  return (
    <PrivateRoute>
      <p>{JSON.stringify(userDetails)}</p>
      <span><SignOutButton /></span>
    </PrivateRoute>
  )
}

export default DashboardPage
