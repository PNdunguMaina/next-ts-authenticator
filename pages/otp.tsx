import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

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
          setValidationStatus('success')
          alert('Success')
        } else {
          setValidationStatus('failure')
        }

        formik.resetForm()
      } catch (error) {
        setValidationStatus('failure')
        alert('failure')
      }
    },
  })
  return (
    <div>
      <h1>Enter OTP here</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          OTP:
          <input
            type="number"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min="0"
            step="1"
          />
        </label>
        <br />
        {/* Display the validation status to the user */}
        {validationStatus === 'pending' && <p>Validating OTP...</p>}
        {validationStatus === 'success' && <p>OTP validation successful!</p>}
        {validationStatus === 'failure' && (
          <p>OTP validation failed. Please try again.</p>
        )}
        <button type="submit" disabled={!formik.isValid || validationStatus === 'pending'}>
          Submit OTP
        </button>
      </form>
      <p>
        <Link href="/login">Back to Login</Link>
      </p>
    </div>
  )
}

export default OTPPage
