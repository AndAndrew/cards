import React, { useState } from 'react'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import commonStyles from '../../../common/styles/common.container.module.css'
import { buttonFontStyle, labelStyle, textFieldStyle } from '../../../common/styles/fontStyles'
import { LoginTC } from '../authReducer'

import styles from './LoginPage.module.css'

export const LoginPage = () => {
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const error = useAppSelector(state => state.auth.error)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
      const error: FormikErrorType = {}

      if (!values.email && formik.touched.email) {
        error.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = `Invalid email`
      }

      if (!values.password) {
        error.password = 'Required'
      } else if (values.password.length < 8) {
        error.password = 'Invalid password'
      }

      return error
    },
    onSubmit: values => {
      dispatch(LoginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    navigate('/packsPage')
  }

  const handleClickShowPasswordInputOne = () => {
    setShowPasswordInput(!showPasswordInput)
  }

  return (
    <div className={commonStyles.AppContainer}>
      <div className={commonStyles.personalInformationBlock}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={styles.form}>
            <FormLabel style={labelStyle}>Sign in</FormLabel>
            <FormGroup>
              <TextField
                sx={textFieldStyle}
                error={formik.touched.email && formik.errors.email !== undefined}
                {...formik.getFieldProps('email')}
                id="email"
                label="Email"
                helperText={formik.touched.email ? formik.errors.email : ''}
                variant="standard"
              />
              <div className={styles.passwordInputContainer}>
                <TextField
                  sx={textFieldStyle}
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
              <a className={styles.forgotPass} onClick={() => navigate('/passRecovery')}>
                Forgot Password?
              </a>
              <Button
                style={buttonFontStyle}
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
              <a className={styles.signUp} onClick={() => navigate('/register')}>
                Sign Up
              </a>
            </div>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
