import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from './LoginForm.module.css'

const LoginForm: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<string | null>('')

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
        setLoginStatus('pending')
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
        if (data.status) {
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
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      {loginStatus === 'pending' ? (
        <div className={styles.loadingText}>Please wait...</div>
      ) : (
        <div className={styles.errorMessage}>{loginStatus}</div>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <label className={styles.label}>
        <input
          type="text"
          name="username"
          className={styles.input}
          placeholder="Username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className={styles.errorText}>{formik.errors.username}</div>
        ) : null}
      </label>
      <br />
      <label className={styles.label}>
        <input
          type="password"
          name="password"
          className={styles.input}
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.errorText}>{formik.errors.password}</div>
        ) : null}
      </label>
      <br />
      <button className={styles.submitButton} type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
