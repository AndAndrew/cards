import React, { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPasswordType } from '../../../api/auth-api'
import { AppRootStateType } from '../../../app/store'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import { buttonFontStyle, textFieldStyle } from '../../../common/styles/fontStyles'
import { NewPasswordTC } from '../authReducer'

import style from './../../../common/styles/common.container.module.css'
import styles from './NewPassInputPage.module.css'

export const NewPassInputPage = () => {
  const dispatch = useAppDispatch()
  const [newPass, SetNewPass] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()
  const isNewPasswordCorrect = useSelector<AppRootStateType, boolean>(
    state => state.auth.isNewPasswordCorrect
  )

  const inputChanging = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    SetNewPass(e.currentTarget.value)
  }

  const NewPass: CreateNewPasswordType = {
    password: newPass,
    resetPasswordToken: token,
  }

  const SubmitNewPassword = () => {
    dispatch(NewPasswordTC(NewPass))
  }

  if (isNewPasswordCorrect) {
    navigate('/login')
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <div className={styles.form}>
          <div className={styles.title}>Create new password</div>
          <TextField
            sx={textFieldStyle}
            value={newPass}
            onChange={inputChanging}
            label={'Password'}
            type={'password'}
            variant={'standard'}
          />
          <span style={{ color: 'grey', textAlign: 'left' }}>
            Create new password and we will send you further instructions to email
          </span>
          <Button
            style={buttonFontStyle}
            onClick={SubmitNewPassword}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
          >
            Create new password
          </Button>
        </div>
      </div>
    </div>
  )
}
