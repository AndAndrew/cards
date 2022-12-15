import React from 'react'

import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../common/hooks/react-redux-hooks'

import style from './../common/styles/common.container.module.css'

export const ButtonAppBar = () => {
  const ActualName = useAppSelector(state => state.profile.name)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  const TestHandler = () => {
    navigate('/test')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            icon
          </IconButton>
          {!isLoggedIn && (
            <Button color="inherit" onClick={TestHandler}>
              Test
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
