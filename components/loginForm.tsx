import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const LoginForm: React.FC = () => {
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
    onSubmit: () => {
      // handle form submission here
      formik.resetForm()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
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
