import React from 'react'

import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Title } from '../../../common/components/title/Title'
import style from '../../../common/styles/common.container.module.css'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const ToLogin = () => {
    navigate('/login')
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <Title title={'Check Email'} />
        <img
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReWLTYQmALBv3FwyPU0aaRRzMwMFOtyc2UrQ&usqp=CAU'
          }
        />
        <div>We have sent an Email with instruction to ___email---- </div>
        <Button onClick={ToLogin} type={'submit'} variant={'contained'} color={'primary'}>
          Back to Login
        </Button>
      </div>
    </div>
  )
}
