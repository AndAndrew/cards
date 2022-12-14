import React from 'react'

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'
import { LoginTC, logOutTC } from '../features/auth/authReducer'

export const ButtonAppBar = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const loginHandler = () => {
    return <Navigate to={'/login'} />
  }
  const logoutHandler = () => {
    dispatch(logOutTC())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            icon
          </IconButton>
          {isLoggedIn ? (
            <Button color="inherit" onClick={logoutHandler}>
              Log Out
            </Button>
          ) : (
            <Button color="inherit" onClick={loginHandler}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
