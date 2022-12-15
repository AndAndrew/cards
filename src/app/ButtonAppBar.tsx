import React from 'react'

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'
import { logOutTC } from '../features/auth/authReducer'

export const ButtonAppBar = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const logoutHandler = () => {
    dispatch(logOutTC())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            icon
          </IconButton>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
