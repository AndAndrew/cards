import React from 'react'

import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Title } from '../../../common/components/title/Title'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { isMessagesentAC } from '../authReducer'

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
        <Title title={'Check Email'} />
        <div className={style.content}>
          <img
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReWLTYQmALBv3FwyPU0aaRRzMwMFOtyc2UrQ&usqp=CAU'
            }
          />
          <div>We have sent an Email with instruction to {props.email}</div>
          <Button onClick={ToLogin} type={'submit'} variant={'contained'} color={'primary'}>
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  )
}
