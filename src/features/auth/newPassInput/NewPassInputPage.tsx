import React, { ChangeEvent, useState } from 'react'

import { Button, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'

import { CreateNewPasswordType } from '../../../api/cards-api'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import { NewPasswordTC } from '../authReducer'

import style from './../../../common/styles/common.container.module.css'

export const NewPassInputPage = () => {
  const dispatch = useAppDispatch()
  const [newPass, SetNewPass] = useState('')
  const { token } = useParams()
  const inputChanging = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    SetNewPass(e.currentTarget.value)
  }

  console.log(token)
  const NewPass: CreateNewPasswordType = {
    password: newPass,
    resetPasswordToken: token,
  }

  const SubmitNewPassword = () => {
    dispatch(NewPasswordTC(NewPass))
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        Create new password
        <TextField value={newPass} onChange={inputChanging} label="Password" margin="normal" />
        <div style={{ color: 'grey' }}>
          Create new password and we will send you further instructions to email
        </div>
        <Button onClick={SubmitNewPassword} type={'submit'} variant={'contained'} color={'primary'}>
          Create new password
        </Button>
      </div>
    </div>
  )
}
