import React, { useState } from 'react'

import { VisibilityOff } from '@material-ui/icons'
import Visibility from '@material-ui/icons/Visibility'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import commonStyles from '../../../common/styles/common.container.module.css'
import { LoginTC } from '../authReducer'

import styles from './LoginPage.module.css'

export const LoginPage = () => {
  const [showPasswordInput, setShowPasswordInput] = useState(false)
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
      email: 'platonoff9168@gmail.com',
      password: 'hellokitty',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email && formik.touched.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = `Invalid email`
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Invalid password'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(LoginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/packsPage'} />
  }

  const handleClickShowPasswordInputOne = () => {
    setShowPasswordInput(!showPasswordInput)
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
                error={formik.touched.email && formik.errors.email !== undefined}
                {...formik.getFieldProps('email')}
                id="email"
                label="Email"
                helperText={formik.touched.email ? formik.errors.email : ''}
                variant="standard"
              />
              <div className={styles.passwordInputContainer}>
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
                    width: '100%',
                  }}
                  error={formik.touched.password && formik.errors.password !== undefined}
                  {...formik.getFieldProps('password')}
                  type={showPasswordInput ? 'text' : 'password'}
                  id="password"
                  label="Password"
                  helperText={formik.touched.password ? formik.errors.password : ''}
                  variant="standard"
                />
                <IconButton
                  className={styles.EyeIconPosition}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordInputOne}
                  onMouseDown={() => {}}
                  edge="end"
                >
                  {showPasswordInput ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
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
