import React from 'react'

import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'
import { logOutTC } from '../features/auth/authReducer'

import style from './../common/styles/common.container.module.css'
import { AppRootStateType } from './store'

export const ButtonAppBar = () => {
  const ActualName = useSelector<AppRootStateType, string>(state => state.profile.name)

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loginHandler = () => {
    navigate('/login')
  }
  const logoutHandler = () => {
    dispatch(logOutTC())
  }

  const TestHahdler = () => {
    navigate('/test')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            icon
          </IconButton>
          <Button color="inherit" onClick={TestHahdler}>
            Test
          </Button>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log Out
            </Button>
          )}
          {isLoggedIn && (
            <div className={style.BarImg}>
              <div>{ActualName}</div>
              <img
                style={{ width: '40px', height: '40px', borderRadius: '20px' }}
                src="https://klike.net/uploads/posts/2019-06/1560329641_2.jpg"
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
