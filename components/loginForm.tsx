import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/router'

const LoginForm: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const apiUrl = 'https://tinyurl.com/scanwize-quiz-login'
      try {
        // send data to API
        const response = await axios.post(apiUrl, {
          username: values.username,
          password: values.password,
        })

        // Get the response
        const data = await response.data

        // Update login status
        setLoginStatus(data.message)

        // Redirect to otp page on successful login
        if(data.status){
          router.push('/otp')
        }

        // Reset the form after submission
        formik.resetForm()
      } catch (error) {
        // Handle error
        if (error.response) {
          setError(error.response.data.message)
        } else if (error.request) {
          setError('No response from the server')
        } else {
          setError('An unexpected error occurred')
        }
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {loginStatus && <div>{loginStatus}</div>}
      {error && <div>{error}</div>}
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
