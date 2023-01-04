import React, { useEffect } from 'react'

import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { buttonFontStyle } from '../../../common/styles/fontStyles'
import style from '../learnPage/Learn.module.css'
import { getCards, resetToDefault } from '../learnReducer'

export const Learn = () => {
  const dispatch = useAppDispatch()
  const cardPack = useAppSelector(state => state.cardPack)
  const navigate = useNavigate()
  const { packId } = useParams()

  useEffect(() => {
    dispatch(getCards(packId!))
  }, [])
  const onBackButtonClick = () => {
    navigate('/packsPage')
    dispatch(resetToDefault())
  }

  return (
    <div className={style.container}>
      <button className={style.backButton} onClick={onBackButtonClick}>
        <Icon>
          <ArrowBackIosNewOutlined />
        </Icon>
        <span>Back to Packs List</span>
      </button>
      <div className={style.questionBlock}>
        <div className={style.title}>Learn {`"${cardPack.packName}"`}</div>
        <div className={style.question}>
          <Paper style={{ padding: '20px 0' }}>
            <span className={style.questionSpan}>Question: </span>
            <span>{cardPack.cards[0].question}</span>

            <div className={style.numberOfTries}>
              <span>Количество попыток ответов на вопрос: </span>
              <span className={style.tries}>{'10'}</span>
            </div>
            <Button style={buttonFontStyle} variant={'contained'} color={'primary'}>
              Show answer
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  )
}
