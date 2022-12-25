import React from 'react'

import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../../common/hooks/react-redux-hooks'
import { buttonFontStyle } from '../../../../common/styles/fontStyles'
import { resetToDefault } from '../../cardsReducer'
import style from '../Cards.module.css'

type PropsType = {
  packTitle: string
  buttonTitle: string
  addButtonHandler: () => void
}
export const EmptyPackPage = (props: PropsType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const backButtonHandler = () => {
    dispatch(resetToDefault())
    navigate('/packsPage')
  }

  return (
    <div className={style.container}>
      <button className={style.backButton} onClick={backButtonHandler}>
        <Icon>
          <ArrowBackIosNewOutlined />
        </Icon>
        <span>Back to Packs List</span>
      </button>
      <div className={style.titleBlock}>
        <div className={style.title}>{props.packTitle}</div>
        <Button
          variant={'contained'}
          style={buttonFontStyle}
          color={'primary'}
          onClick={props.addButtonHandler}
        >
          {props.buttonTitle}
        </Button>
      </div>
    </div>
  )
}
