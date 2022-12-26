import React, { useEffect } from 'react'

import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { buttonFontStyle } from '../../../common/styles/fontStyles'
import style from '../cardsPage/Cards.module.css'
import { addCard, getCards, resetToDefault } from '../cardsReducer'

import { CardsTable } from './CardsTable'
import { EmptyPackPage } from './components/EmptyPackPage'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const profileId = useAppSelector(state => state.profile._id)
  const cardPack = useAppSelector(state => state.cardPack)
  const appStatus = useAppSelector(state => state.appStatus.appStatus)
  const navigate = useNavigate()
  const { packId } = useParams()

  useEffect(() => {
    dispatch(getCards(packId ? packId : '', 1, 10))
  }, [])

  const getTitles = (): { packTitle: string; buttonTitle: string } => {
    return cardPack.packUserId === profileId
      ? { packTitle: 'My Pack', buttonTitle: 'Add new card' }
      : { packTitle: "Friend's pack", buttonTitle: 'Learn to pack' }
  }

  const addNewCard = () => {
    const id = packId ? packId : ''

    dispatch(addCard(id, 'question', 'answer'))
  }

  const onBackButtonClick = () => {
    dispatch(resetToDefault())
    navigate('/packsPage')
  }

  const isLoading = appStatus === 'loading'

  if (isLoading) {
    return <></>
  }

  if (cardPack.cards.length === 0) {
    return (
      <EmptyPackPage
        packTitle={getTitles().packTitle}
        buttonTitle={getTitles().buttonTitle}
        addButtonHandler={addNewCard}
      />
    )
  }

  return (
    <div className={style.container}>
      <button className={style.backButton} onClick={onBackButtonClick}>
        <Icon>
          <ArrowBackIosNewOutlined />
        </Icon>
        <span>Back to Packs List</span>
      </button>
      <div className={style.titleBlock}>
        <div className={style.title}>{getTitles().packTitle}</div>
        <Button
          variant={'contained'}
          style={buttonFontStyle}
          color={'primary'}
          onClick={addNewCard}
        >
          {getTitles().buttonTitle}
        </Button>
      </div>
      <CardsTable />
    </div>
  )
}
