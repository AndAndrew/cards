import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppRootStateType } from '../../app/store'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../common/hooks/react-redux-hooks'
import { logOutTC } from '../auth/authReducer'

import style from './../../common/styles/common.container.module.css'
import s from './Profile.module.css'
import { ChangeProfileTC } from './profileReducer'

export const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const ActualEmail = useSelector<AppRootStateType, string>(state => state.profile.email)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const Actualname = useSelector<AppRootStateType, string>(state => state.profile.name)

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  const LogoutButtonHandler = () => {
    dispatch(logOutTC())
  }

  const ChangeName = (name: string) => {
    dispatch(ChangeProfileTC({ name }))
  }

  return (
    <div className={style.AppContainer}>
      <div className={style.personalInformationBlock}>
        <div className={s.blockDiscription}>
          <h1 className={s.Title}>Personal Information</h1>
        </div>
        <div className={s.ProfileAvatar}>
          <button>+</button>
        </div>
        <EditableSpan ChangeName={ChangeName} name={Actualname} />
        <div style={{ color: 'gray' }}>{ActualEmail}</div>
        <button onClick={LogoutButtonHandler}> logout</button>
      </div>
    </div>
  )
}
