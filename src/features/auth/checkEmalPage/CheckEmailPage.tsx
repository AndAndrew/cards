import React from 'react'

import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { buttonFontStyle } from '../../../common/styles/fontStyles'
import { isMessageSendAC } from '../authReducer'

import styles from './CheckEmailPage.module.css'

type PropsType = {
  email: string
}

export const CheckEmailPage = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const ToLogin = () => {
    navigate('/login')
    dispatch(isMessageSendAC(false))
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <div className={styles.form}>
          <div className={styles.title}>Check Email</div>
          <div className={styles.emailImage}>
            <img
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReWLTYQmALBv3FwyPU0aaRRzMwMFOtyc2UrQ&usqp=CAU'
              }
            />
          </div>
          <div>We have sent an Email with instruction to {props.email}</div>
          <Button
            style={buttonFontStyle}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
            onClick={ToLogin}
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  )
}
