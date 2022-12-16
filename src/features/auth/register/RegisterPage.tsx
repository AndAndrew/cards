import React, { useState } from 'react'

import { VisibilityOff } from '@material-ui/icons'
import Visibility from '@material-ui/icons/Visibility'
import { Button, FormControl, FormGroup, FormLabel, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { AppRootStateType } from '../../../app/store'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { registerTC } from '../authReducer'

import styles from './RegisterPage.module.css'

export const RegisterPage = () => {
  const registered = useSelector<AppRootStateType, boolean>(state => state.auth.registered)

  const [showPasswordInputOne, setShowPasswordInputOne] = useState(false)
  const [showPasswordInputTwo, setShowPasswordInputTwo] = useState(false)

  const dispatch = useAppDispatch()

  type FormikErrorType = {
    email?: string
    password?: string
    confirm_password?: string
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
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

      if (values.password !== values.confirm_password) {
        errors.confirm_password = `Passwords don't match`
      }

      return errors
    },
    onSubmit: values => {
      dispatch(registerTC({ email: values.email, password: values.password }))
    },
  })

  if (registered) {
    return <Navigate to={'/cards/#/login'} />
  }

  const handleClickShowPasswordInputOne = () => {
    setShowPasswordInputOne(!showPasswordInputOne)
  }

  const handleClickShowPasswordInputTwo = () => {
    setShowPasswordInputTwo(!showPasswordInputTwo)
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={styles.form}>
            <FormLabel
              style={{
                fontFamily: 'Montserrat',
                fontWeight: '600',
                fontSize: '26px',
                color: 'black',
              }}
            >
              Sign up
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
                  type={showPasswordInputOne ? 'text' : 'password'}
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
                  {showPasswordInputOne ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
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
                  error={
                    formik.touched.confirm_password && formik.errors.confirm_password !== undefined
                  }
                  {...formik.getFieldProps('confirm_password')}
                  type={showPasswordInputTwo ? 'text' : 'password'}
                  id="confirm_password"
                  label="Confirm password"
                  helperText={formik.touched.confirm_password ? formik.errors.confirm_password : ''}
                  variant="standard"
                />
                <IconButton
                  className={styles.EyeIconPosition}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordInputTwo}
                  onMouseDown={() => {}}
                  edge="end"
                >
                  {showPasswordInputTwo ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              <Button
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: '500',
                  borderRadius: '20px',
                  fontSize: '16px',
                  textTransform: 'capitalize',
                  margin: '50px 0 5px 0',
                }}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
              >
                Sign up
              </Button>
            </FormGroup>
            <div>
              <div className={styles.haveAcc}>Already have an account?</div>
              <NavLink to={'/login'}>Sign in</NavLink>
            </div>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
