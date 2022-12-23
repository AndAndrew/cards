import React from 'react'

import { Button } from '@mui/material'
import { useSelector } from 'react-redux'

import { AppRootStateType } from '../../../app/store'
import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { testTC } from '../testReducer'

export const Test = () => {
  const dispatch = useAppDispatch()
  const ping = useSelector<AppRootStateType, number>(state => state.test.currentPing)

  const PingButtonHandler = () => {
    const currentData = { frontTime: Date.now() }

    dispatch(testTC(currentData))
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <h1>Show Current Ping</h1>
        <div>{ping}</div>
        <Button onClick={PingButtonHandler} type={'submit'} variant={'contained'} color={'primary'}>
          START
        </Button>
      </div>
    </div>
  )
}
