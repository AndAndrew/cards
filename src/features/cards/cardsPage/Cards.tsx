import React, { useEffect } from 'react'

import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined'
import Icon from '@mui/material/Icon'
import { useNavigate, useParams } from 'react-router-dom'

import { CardType } from '../../../api/cards-api'
import { AddCardsModal } from '../../../common/components/modals/addCardsModal/AddCardsModal'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import style from '../cardsPage/Cards.module.css'
import { addCard, getCards, resetToDefault } from '../cardsReducer'

import { CardsTable } from './cardsTable/CardsTable'
import { EmptyPackPage } from './components/EmptyPackPage/EmptyPackPage'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const profileId = useAppSelector(state => state.profile._id)
  const cardPack = useAppSelector(state => state.cardPack)
  const appStatus = useAppSelector(state => state.appStatus.appStatus)
  const navigate = useNavigate()
  const { packId } = useParams()

  const cardPackId = packId ? packId : ''

  useEffect(() => {
    dispatch(getCards(cardPackId, 1, 10))
  }, [])
  const addNewCard = (data: CardType) => {
    dispatch(addCard(data))
  }

  const isMyPack = cardPack.packUserId === profileId
  const getTitles = (): { packTitle: string; buttonTitle: string } => {
    return isMyPack
      ? { packTitle: 'My Pack', buttonTitle: 'Add new card' }
      : { packTitle: "Friend's pack", buttonTitle: 'Learn to pack' }
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
        packId={cardPackId}
        packTitle={getTitles().packTitle}
        isMyPack={isMyPack}
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
        <AddCardsModal addCardHandler={addNewCard} packId={cardPackId} />
      </div>
      <CardsTable />
    </div>
  )
}
