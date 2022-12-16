import React, { ChangeEvent, useState } from 'react'

import { Button, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPasswordType } from '../../../api/cards-api'
import { AppRootStateType } from '../../../app/store'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
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

  console.log(token)
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
            value={newPass}
            onChange={inputChanging}
            label="Password"
            variant={'standard'}
          />
          <span style={{ color: 'grey', textAlign: 'left' }}>
            Create new password and we will send you further instructions to email
          </span>
          <Button
            style={{
              fontFamily: 'Montserrat',
              fontWeight: '500',
              borderRadius: '20px',
              fontSize: '16px',
              textTransform: 'capitalize',
            }}
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
