import React, { useEffect } from 'react'

import './App.css'

import { CircularProgress, LinearProgress } from '@mui/material'
import { Provider } from 'react-redux'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'
import style from '../common/styles/common.container.module.css'
import { LoginPage } from '../features/auth/login/LoginPage'
import { NewPassInputPage } from '../features/auth/newPassInput/NewPassInputPage'
import { PassRecoveryPage } from '../features/auth/passRecovery/PassRecoveryPage'
import { RegisterPage } from '../features/auth/register/RegisterPage'
import { CardsPage } from '../features/cardsPage/CardsPage'
import { ProfilePage } from '../features/profile/ProfilePage'
import { TestPage } from '../features/test/TestPage'

import { isInitializedTC } from './appReducer'
import { ButtonAppBar } from './ButtonAppBar'
import { store } from './store'

const App = () => {
  const Status = useAppSelector(state => state.appStatus.appStatus)
  const initialized = useAppSelector(state => state.appStatus.isInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(isInitializedTC())
  }, [])

  if (!initialized) {
    return (
      <div className={style.AppContainer}>
        <CircularProgress color="inherit" size={100} />
      </div>
    )
  }

  return (
    <HashRouter>
      <div className="App">
        <Provider store={store}>
          <ButtonAppBar />
          {Status === 'loading' && <LinearProgress color="inherit" />}
          <Routes>
            <Route path={'/'} element={<ProfilePage />} />
            <Route path={'/test'} element={<TestPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
            <Route path={'/passRecovery'} element={<PassRecoveryPage />} />
            <Route path={'/newPassInput/:token'} element={<NewPassInputPage />} />
            {/*<Route path={'/checkEmail'} element={<CheckEmailPage email={''} />} />*/}
            <Route path={'/profile'} element={<ProfilePage />} />
            <Route path={'/cardsPage'} element={<CardsPage />} />
            <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path={'*'} element={<Navigate to={'/404'} />} />
          </Routes>
        </Provider>
      </div>
    </HashRouter>
  )
}

export default App
