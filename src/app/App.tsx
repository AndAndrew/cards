import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom'

import { Header } from '../common/components/header/Header'
import { LoginPage } from '../features/auth/login/LoginPage'
import { NewPassInputPage } from '../features/auth/newPassInput/NewPassInputPage'
import { PassRecoveryPage } from '../features/auth/passRecovery/PassRecoveryPage'
import { RegisterPage } from '../features/auth/register/RegisterPage'
import { ProfilePage } from '../features/profile/ProfilePage'
import { TestPage } from '../features/test/TestPage'

import { store } from './store'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Provider store={store}>
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
      </HashRouter>
    </div>
  )
}

export default App
