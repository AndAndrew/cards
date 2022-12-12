import React, { ChangeEvent, useState } from 'react'

import { Button, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { RecoveryPasswordType } from '../../../api/cards-api'
import { AppRootStateType } from '../../../app/store'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import { passwordRecoveryTC } from '../authReducer'

import style from './../../../common/styles/common.container.module.css'

export const PassRecoveryPage = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const [emailTitle, setEmailTitle] = useState('')
  const dispatch = useAppDispatch()

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  const SendInstriction = () => {
    const recoveryData: RecoveryPasswordType = {
      email: emailTitle,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
    }

    dispatch(passwordRecoveryTC(recoveryData))
  }

  const EmailInputChanging = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmailTitle(e.currentTarget.value)
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        Forgot your pass?
        <TextField value={emailTitle} onChange={EmailInputChanging} label="Email" margin="normal" />
        <span style={{ color: 'grey' }}>
          Enter your email address and we will send you further instruction
        </span>
        <Button onClick={SendInstriction} type={'submit'} variant={'contained'} color={'primary'}>
          send instruction
        </Button>
        <div style={{ color: 'grey' }}>Did you remember your password?</div>
        <div>
          <a href={'/login'}>Try Logging In</a>
        </div>
      </div>
    </div>
  )
}
