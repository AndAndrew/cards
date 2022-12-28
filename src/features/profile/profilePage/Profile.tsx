import React from 'react'

import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import { EditableSpan } from '../../../common/components/editableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { buttonFontStyle } from '../../../common/styles/fontStyles'
import { logOutTC } from '../../auth/authReducer'
import { ChangeProfileTC } from '../profileReducer'

import s from './Profile.module.css'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const ActualEmail = useAppSelector(state => state.profile.email)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const ActualName = useAppSelector(state => state.profile.name)
  const navigate = useNavigate()

  if (!isLoggedIn) {
    navigate('/login')
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
        <div className={s.container}>
          <div className={s.title}>Personal Information</div>
          <div className={s.ProfileAvatar}>
            <button>+</button>
          </div>

          <EditableSpan ChangeName={ChangeName} name={ActualName} />
          <div style={{ color: 'gray' }}>{ActualEmail}</div>
          <Button
            style={buttonFontStyle}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
            onClick={LogoutButtonHandler}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
