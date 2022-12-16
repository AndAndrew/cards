import React, { ChangeEvent, useState } from 'react'

import { Button, TextField } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { RecoveryPasswordType } from '../../../api/cards-api'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { passwordRecoveryTC } from '../authReducer'
import { CheckEmailPage } from '../CheckEmalPage/CheckEmailPage'

import style from './../../../common/styles/common.container.module.css'
import styles from './PassRecoveryPage.module.css'

export const PassRecoveryPage = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isMessageSent = useAppSelector(state => state.auth.isMessageSent)

  const [emailTitle, setEmailTitle] = useState('')
  const dispatch = useAppDispatch()

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
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
            value={emailTitle}
            onChange={EmailInputChanging}
            label="Email"
            variant={'standard'}
          />
          <span style={{ color: 'grey', textAlign: 'left' }}>
            Enter your email address and we will send you further instruction
          </span>
          <Button
            style={{
              fontFamily: 'Montserrat',
              fontWeight: '500',
              borderRadius: '20px',
              fontSize: '16px',
              textTransform: 'capitalize',
            }}
            onClick={SendInstruction}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
          >
            send instruction
          </Button>
          <div>
            <div className={styles.rememberPass}>Did you remember your password?</div>
            <a className={styles.loginIn} href={'/login#'}>
              Try Logging In
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
