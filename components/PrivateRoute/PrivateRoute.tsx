// components/PrivateRoute.tsx
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const PrivateRoute: React.FC = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const userDetailsString = localStorage.getItem('userDetails')
    const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null

    // Redirect to login if user is not authenticated
    if (!accessToken || !refreshToken || !userDetails) {
      router.push('/login')
    }
  }, [router])

  return <>{children}</>
}

export default PrivateRoute
