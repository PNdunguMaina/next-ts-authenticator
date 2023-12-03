import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

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
    onSubmit: (values) => {
      // Handle OTP submission here

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
        <button type="submit" disabled={!formik.isValid}>Submit OTP</button>
      </form>
      <p>
        <Link href="/login">Back to Login</Link>
      </p>
    </div>
  )
}

export default OTPPage
