import React from 'react'

import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { isMessagesentAC } from '../authReducer'

import styles from './CheckEmailPage.module.css'

type PropsType = {
  email: string
}

export const CheckEmailPage = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const ToLogin = () => {
    navigate('/login')
    dispatch(isMessagesentAC(false))
  }

  console.log(props.email)

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
            style={{
              fontFamily: 'Montserrat',
              fontWeight: '500',
              borderRadius: '20px',
              fontSize: '16px',
              textTransform: 'capitalize',
            }}
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
