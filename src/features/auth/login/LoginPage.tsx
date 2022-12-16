import React from 'react'

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import commonStyles from '../../../common/styles/common.container.module.css'
import { LoginTC, setError } from '../authReducer'

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

      if (error) {
        dispatch(setError(null))
      }
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
    return <Navigate to={'/cards/#/profile'} />
  }

  return (
    <div className={commonStyles.AppContainer}>
      <div className={commonStyles.personalInformationBlock}>
        <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
          <FormControl className={styles.form}>
            <FormLabel
              style={{
                fontFamily: 'Montserrat',
                fontWeight: '600',
                fontSize: '26px',
                color: 'black',
              }}
            >
              Sign in
            </FormLabel>
            <FormGroup>
              {!formik.errors.email ? (
                <TextField
                  sx={{
                    '& .MuiInputLabel-root': { fontFamily: 'Montserrat', fontWeight: '400' },
                    '& .MuiInputLabel-root.Mui-focused': {
                      fontFamily: 'Montserrat',
                      fontWeight: '400',
                    },
                    '& .MuiInputBase-root': {
                      '& input': { fontFamily: 'Montserrat', fontWeight: '500' },
                    },
                  }}
                  variant="standard"
                  label="Email"
                  {...formik.getFieldProps('email')}
                />
              ) : (
                <TextField
                  error
                  sx={{
                    '& .MuiInputLabel-root': { fontFamily: 'Montserrat', fontWeight: '400' },
                    '& .MuiInputLabel-root.Mui-focused': {
                      fontFamily: 'Montserrat',
                      fontWeight: '400',
                    },
                    '& .MuiInputBase-root': {
                      '& input': { fontFamily: 'Montserrat', fontWeight: '500' },
                    },
                  }}
                  variant="standard"
                  label="Error"
                  {...formik.getFieldProps('email')}
                  helperText={formik.errors.email}
                />
              )}
              {!formik.errors.password ? (
                <TextField
                  sx={{
                    '& .MuiInputLabel-root': { fontFamily: 'Montserrat', fontWeight: '400' },
                    '& .MuiInputLabel-root.Mui-focused': {
                      fontFamily: 'Montserrat',
                      fontWeight: '400',
                    },
                    '& .MuiInputBase-root': {
                      '& input': { fontFamily: 'Montserrat', fontWeight: '500' },
                    },
                  }}
                  variant="standard"
                  type="password"
                  label="Password"
                  {...formik.getFieldProps('password')}
                />
              ) : (
                <TextField
                  error
                  sx={{
                    '& .MuiInputLabel-root': { fontFamily: 'Montserrat', fontWeight: '400' },
                    '& .MuiInputLabel-root.Mui-focused': {
                      fontFamily: 'Montserrat',
                      fontWeight: '400',
                    },
                    '& .MuiInputBase-root': {
                      '& input': { fontFamily: 'Montserrat', fontWeight: '500' },
                    },
                  }}
                  variant="standard"
                  label="Error"
                  {...formik.getFieldProps('password')}
                  helperText={formik.errors.password}
                />
              )}
              <FormControlLabel
                sx={{
                  '& .MuiFormControlLabel-label': { fontFamily: 'Montserrat', fontWeight: '500' },
                }}
                style={{ fontFamily: 'Montserrat', fontWeight: '800' }}
                label={'Remember me'}
                control={<Checkbox />}
                {...formik.getFieldProps('rememberMe')}
                checked={formik.values.rememberMe}
              />
              <a className={styles.forgotPass} href={'/cards/#/passRecovery'}>
                Forgot Password?
              </a>
              <Button
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: '500',
                  borderRadius: '20px',
                  fontSize: '16px',
                  textTransform: 'capitalize',
                }}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
              >
                Sign In
              </Button>
            </FormGroup>
            {error && <div className={styles.error}>{error}</div>}
            <div>
              <div className={styles.haveAcc}>Already have an account?</div>
              <a className={styles.signUp} href={'/cards/#/register'}>
                Sign Up
              </a>
            </div>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
