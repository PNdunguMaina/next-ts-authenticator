import { useRouter } from 'next/router'

const SignOutButton: React.FC = () => {
  const router = useRouter()

  const handleSignOut = () => {
    // Clear user-related data from local storage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userDetails')

    // Redirect to the login page
    router.push('/login')
  }

  return <button onClick={handleSignOut}>Sign Out</button>
}

export default SignOutButton
