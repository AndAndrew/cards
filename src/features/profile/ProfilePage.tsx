import React from 'react'

import { Button } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { Title } from '../../common/components/title/Title'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { logOutTC } from '../auth/authReducer'

import style from './../../common/styles/common.container.module.css'
import s from './Profile.module.css'
import { ChangeProfileTC } from './profileReducer'

export const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const ActualEmail = useAppSelector(state => state.profile.email)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const ActualName = useAppSelector(state => state.profile.name)

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
