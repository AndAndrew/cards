import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Header } from '../common/components/header/Header'
import { LoginPage } from '../features/auth/login/LoginPage'
import { NewPassInputPage } from '../features/auth/newPassInput/NewPassInputPage'
import { PassRecoveryPage } from '../features/auth/passRecovery/PassRecoveryPage'
import { RegisterPage } from '../features/auth/register/RegisterPage'
import { ProfilePage } from '../features/profile/ProfilePage'
import { TestPage } from '../features/test/TestPage'

import { ButtonAppBar } from './ButtonAppBar'
import { store } from './store'
import { appStatusType } from './appReducer'
import { AppRootStateType } from './store'

function App() {
  const Status = useSelector<AppRootStateType, appStatusType>(state => state.appStatus.appStatus)

  return (
    <HashRouter>
      <div className="App">
        <Provider store={store}>
          <ButtonAppBar />
          {Status === 'loading' && <LinearProgress color="inherit" />}
          {/*<Header />*/}
          <Routes>
            <Route path={'/'} element={<TestPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
            <Route path={'/passRecovery'} element={<PassRecoveryPage />} />
            <Route path={'/newPassInput'} element={<NewPassInputPage />} />
            <Route path={'/profile'} element={<ProfilePage />} />
            <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path={'*'} element={<Navigate to={'/404'} />} />
          </Routes>
        </Provider>
      </div>
    </HashRouter>
  )
}

export default App
