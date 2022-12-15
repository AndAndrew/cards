import React, { useState } from 'react'

import { VisibilityOff } from '@material-ui/icons'
import Visibility from '@material-ui/icons/Visibility'
import { Button, FormControl, FormGroup, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { AppRootStateType } from '../../../app/store'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { registerTC } from '../authReducer'

import s from './RegisterPage.module.css'

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
    return <Navigate to={'/login'} />
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
        <FormControl style={{ minWidth: '250px' }}>
          <h2>Sign up</h2>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                sx={{ width: '100%', marginBottom: '20px' }}
                error={formik.touched.email && formik.errors.email !== undefined}
                {...formik.getFieldProps('email')}
                id="email"
                label="Email"
                helperText={formik.touched.email ? formik.errors.email : ''}
                variant="standard"
              />
              <div className={s.passwordInputContainer}>
                <TextField
                  sx={{ width: '100%' }}
                  error={formik.touched.password && formik.errors.password !== undefined}
                  {...formik.getFieldProps('password')}
                  type={showPasswordInputOne ? 'text' : 'password'}
                  id="password"
                  label="Password"
                  helperText={formik.touched.password ? formik.errors.password : ''}
                  variant="standard"
                />
                <IconButton
                  className={s.EyeIconPosition}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordInputOne}
                  onMouseDown={() => {}}
                  edge="end"
                >
                  {showPasswordInputOne ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              <div className={s.passwordInputContainer}>
                <TextField
                  sx={{ width: '100%' }}
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
                  className={s.EyeIconPosition}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordInputTwo}
                  onMouseDown={() => {}}
                  edge="end"
                >
                  {showPasswordInputTwo ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              <Button
                sx={{ borderRadius: '25px', width: '300px' }}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
              >
                Sign up
              </Button>
            </FormGroup>
          </form>
        </FormControl>
        Already have an account?
        <NavLink style={{ color: '#366EFF' }} to={'/login'}>
          Sign in
        </NavLink>
      </div>
    </div>
  )
}
