import React from 'react'

import { PhotoCamera } from '@material-ui/icons'
import { Logout } from '@mui/icons-material'
import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import { useNavigate } from 'react-router-dom'

import { EditableSpan } from '../../../common/components/editableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import style from '../../../common/styles/common.container.module.css'
import { buttonFontStyle } from '../../../common/styles/fontStyles'
import { logOutTC } from '../../auth/authReducer'
import { resetToDefault } from '../../cards/cardsReducer'
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

  const onBackButtonClick = () => {
    dispatch(resetToDefault())
    navigate('/packsPage')
  }

  return (
    <div className={s.container}>
      <button className={s.backButton} onClick={onBackButtonClick}>
        <Icon>
          <ArrowBackIosNewOutlined />
        </Icon>
        <span>Back to Packs List</span>
      </button>
      <div className={style.AppContainer}>
        <div className={style.personalInformationBlock}>
          <div className={s.profile}>
            <div className={s.title}>Personal Information</div>
            <div className={s.ProfileAvatar}>
              <button className={s.cameraButton}>
                <PhotoCamera />
              </button>
            </div>

            <EditableSpan ChangeName={ChangeName} name={ActualName} />
            <div style={{ color: 'gray' }}>{ActualEmail}</div>
            <Button
              style={buttonFontStyle}
              type={'submit'}
              variant={'outlined'}
              onClick={LogoutButtonHandler}
            >
              <div className={s.logout}>
                <Logout />
                <div>Log out</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
