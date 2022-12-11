import { NavLink } from 'react-router-dom'

import styles from './Header.module.css'

export const Header = () => {
  return (
    <div className={styles.container}>
      <NavLink to={'/'}>TestPage</NavLink>
      <NavLink to={'/login'}>LoginPage</NavLink>
      <NavLink to={'/register'}>RegisterPage</NavLink>
      <NavLink to={'/passRecovery'}>PasswordRecoveryPage</NavLink>
      <NavLink to={'/newPassInput'}>NewPasswordInputPage</NavLink>
      <NavLink to={'/profile'}>ProfilePage</NavLink>
    </div>
  )
}
