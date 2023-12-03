import React, { useState } from 'react'
import Link from 'next/link'

const OTPPage: React.FC = () => {
  return (
    <div>
      <h1>Enter OTP here</h1>
      <form>
        <label>
          OTP:
          <input type="number" name="otp" value="" />
        </label>
        <br />
        <button type="submit">Submit OTP</button>
      </form>
      <p>
        <Link href="/login">Back to Login</Link>
      </p>
    </div>
  )
}

export default OTPPage
