import React, { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'

import { RecoveryPasswordType } from '../../../api/auth-api'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { buttonFontStyle, textFieldStyle } from '../../../common/styles/fontStyles'
import { passwordRecoveryTC } from '../authReducer'
import { CheckEmailPage } from '../checkEmalPage/CheckEmailPage'

import style from './../../../common/styles/common.container.module.css'
import styles from './PassRecoveryPage.module.css'

export const PassRecoveryPage = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isMessageSent = useAppSelector(state => state.auth.isMessageSent)

  const [emailTitle, setEmailTitle] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (isLoggedIn) {
    navigate('/profile')
  }

  const SendInstruction = () => {
    const recoveryData: RecoveryPasswordType = {
      email: emailTitle,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/newPassInput/$token$'>
link</a>
</div>`,
    }

    dispatch(passwordRecoveryTC(recoveryData))
  }

  const EmailInputChanging = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmailTitle(e.currentTarget.value)
  }

  if (isMessageSent) {
    return <CheckEmailPage email={emailTitle} />
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <div className={styles.form}>
          <div className={styles.title}>Forgot your pass?</div>
          <TextField
            sx={textFieldStyle}
            value={emailTitle}
            onChange={EmailInputChanging}
            label="Email"
            variant={'standard'}
          />
          <span style={{ color: 'grey', textAlign: 'left' }}>
            Enter your email address and we will send you further instruction
          </span>
          <Button
            style={buttonFontStyle}
            onClick={SendInstruction}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
          >
            send instruction
          </Button>
          <div>
            <div className={styles.rememberPass}>Did you remember your password?</div>
            <a className={styles.loginIn} onClick={() => navigate('/login')}>
              Try Logging In
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
