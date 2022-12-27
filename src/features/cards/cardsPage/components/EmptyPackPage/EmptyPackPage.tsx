import React from 'react'

import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import { useNavigate } from 'react-router-dom'

import { CardType } from '../../../../../api/cards-api'
import { AddCardsModal } from '../../../../../common/components/modals/addCardsModal/AddCardsModal'
import { useAppDispatch } from '../../../../../common/hooks/react-redux-hooks'
import { buttonFontStyle } from '../../../../../common/styles/fontStyles'
import { resetToDefault } from '../../../cardsReducer'

import style from './EmptyPackPage.module.css'

type PropsType = {
  packTitle: string
  packId: string
  isMyPack: boolean
  addButtonHandler: (data: CardType) => void
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
      <div className={style.title}>{props.packTitle}</div>
      {props.isMyPack && (
        <div className={style.emptyMessageBlock}>
          <div className={style.message}>
            This pack is empty. Click add new card to fill this pack
          </div>
          <AddCardsModal addCardHandler={props.addButtonHandler} packId={props.packId} />
        </div>
      )}
    </div>
  )
}
