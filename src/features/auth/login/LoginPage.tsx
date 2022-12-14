import React from 'react'

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { LoginTC } from '../authReducer'

import styles from './LoginPage.module.css'

export const LoginPage = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const error = useAppSelector(state => state.auth.error)
  const dispatch = useAppDispatch()

  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Password is required'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(LoginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <form className={styles.form} onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
          <FormControl>
            <FormLabel>Sign in</FormLabel>
            <FormGroup>
              {!formik.errors.email ? (
                <TextField variant="standard" label="Email" {...formik.getFieldProps('email')} />
              ) : (
                <TextField
                  error
                  variant="standard"
                  label="Error"
                  {...formik.getFieldProps('email')}
                  helperText={formik.errors.email}
                />
              )}
              {!formik.errors.password ? (
                <TextField
                  variant="standard"
                  type="password"
                  label="Password"
                  {...formik.getFieldProps('password')}
                />
              ) : (
                <TextField
                  error
                  variant="standard"
                  label="Error"
                  {...formik.getFieldProps('password')}
                  helperText={formik.errors.password}
                />
              )}
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox />}
                {...formik.getFieldProps('rememberMe')}
                checked={formik.values.rememberMe}
              />
              <a className={styles.forgotPass} href={'/passRecovery#/passRecovery'}>
                Forgot Password?
              </a>
              <Button
                className={styles.signInButton}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
              >
                Sign In
              </Button>
            </FormGroup>
            {error && <div className={styles.error}>{error}</div>}

            <span>Already have an account?</span>
            <a className={styles.signUp} href={'RegisterPage#/register'}>
              Sign Up
            </a>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
