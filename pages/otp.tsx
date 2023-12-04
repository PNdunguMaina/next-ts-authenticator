import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import styles from '../styles/otpPage.module.css'

const OTPSchema = Yup.object().shape({
  otp: Yup.number()
    .integer('Please enter a valid integer OTP.')
    .positive('Please enter a positive OTP.')
    .required('OTP is required'),
})

const OTPPage: React.FC = () => {
  const [validationStatus, setValidationStatus] = useState<
    'idle' | 'pending' | 'success' | 'failure'
  >('idle')
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: OTPSchema,
    onSubmit: async (values) => {
      const apiUrl = 'https://tinyurl.com/scanwize-quiz-otp'

      // Make a POST request to the OTP validation API
      try {
        setValidationStatus('pending')
        const response = await axios.post(apiUrl, {
          username: '+254703519593',
          password: 'Bazenga',
          otp: values.otp.toString(),
        })

        // Get the response
        const data = await response.data

        if (data.status) {
          // Access and refresh tokens from the API response
          const { access_token, refresh_token, user } = data.data

          // Store tokens and user details securely
          localStorage.setItem('accessToken', access_token)
          localStorage.setItem('refreshToken', refresh_token)
          localStorage.setItem('userDetails', JSON.stringify(user))
          setValidationStatus('success')

          // Redirect to home page on successful OTP validation
          router.push('/')
        } else {
          setValidationStatus('failure')
        }

        formik.resetForm()
      } catch (error) {
        setValidationStatus('failure')
      }
    },
  })
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter OTP here</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="number"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min="0"
            step="1"
          />
        </label>
        {/* Display the validation status to the user */}
        <div className={styles.validationMessage}>
          {validationStatus === 'pending' && 'Validating OTP...'}
          {validationStatus === 'success' && 'OTP successfully validated!'}
          {validationStatus === 'failure' &&
            'OTP validation failed. Please try again.'}
        </div>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={!formik.isValid || validationStatus === 'pending'}
        >
          Submit OTP
        </button>
      </form>
      <p className={styles.backToLogin}>
        <a className={styles.link} href="/login">
          Back to Login
        </a>
      </p>
    </div>
  )
}

export default OTPPage
