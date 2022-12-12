import React from 'react'

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppRootStateType } from '../../../app/store'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { LoginTC } from '../authReducer'

export const LoginPage = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(LoginTC(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <Grid container justifyContent={'center'}>
          <Grid item justifyContent={'center'}>
            <FormControl>
              Sign in
              <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                  <TextField
                    type="password"
                    label="Password"
                    margin="normal"
                    {...formik.getFieldProps('password')}
                  />
                  <FormControlLabel
                    label={'Remember me'}
                    control={<Checkbox />}
                    {...formik.getFieldProps('rememberMe')}
                  />
                  <div>
                    <a href={'/passRecovery#/passRecovery'}>Forgot Password?</a>
                  </div>
                  <Button type={'submit'} variant={'contained'} color={'primary'}>
                    Login
                  </Button>
                </FormGroup>
              </form>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
