import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../common/hooks/react-redux-hooks'

import style from './../common/styles/common.container.module.css'

export const ButtonAppBar = () => {
  const actualName = useAppSelector(state => state.profile.name)
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
            <div className={style.barImg} onClick={() => navigate('/profile')}>
              <div>{actualName}</div>
              <img
                style={{ width: '40px', height: '40px', borderRadius: '20px' }}
                src="https://abrakadabra.fun/uploads/posts/2021-12/1640528661_1-abrakadabra-fun-p-serii-chelovek-na-avu-1.png"
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
