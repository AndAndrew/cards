import React from 'react'

import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppRootStateType } from '../../app/store'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { Title } from '../../common/components/title/Title'
import { useAppDispatch } from '../../common/hooks/react-redux-hooks'
import { logOutTC } from '../auth/authReducer'

import style from './../../common/styles/common.container.module.css'
import s from './Profile.module.css'
import { ChangeProfileTC } from './profileReducer'

export const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const ActualEmail = useSelector<AppRootStateType, string>(state => state.profile.email)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const ActualName = useSelector<AppRootStateType, string>(state => state.profile.name)

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
        <div className={s.blockDescription}>
          <Title title={'Personal Information'} />

          <div className={s.ProfileAvatar}>
            <button>+</button>
          </div>
        </div>
        <EditableSpan ChangeName={ChangeName} name={ActualName} />
        <div style={{ color: 'gray' }}>{ActualEmail}</div>
        <Button
          style={{
            fontFamily: 'Montserrat',
            fontWeight: '500',
            borderRadius: '20px',
            fontSize: '16px',
            textTransform: 'capitalize',
          }}
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          onClick={LogoutButtonHandler}
        >
          Log out
        </Button>
      </div>
    </div>
  )
}
