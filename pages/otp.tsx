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
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: OTPSchema,
    onSubmit: async (values) => {
      const apiUrl = 'https://tinyurl.com/scanwize-quiz-otp'

      // send data to API
      const response = await axios.post(apiUrl, {
        username: '+254703519593',
        password: 'Bazenga',
        otp: values.otp.toString(),
      })

      // Get the response
      const data = await response.data

      formik.resetForm()
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
        <button type="submit" disabled={!formik.isValid}>
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
