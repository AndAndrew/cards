import React, { ChangeEvent, useState } from 'react'

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { AddPackType, CardType } from '../../../../api/cards-api'
import ControllableStates from '../../optionInput/OptionInput'
import { BasicModal } from '../basicModal/BasicModal'

import style from './../style/Modal.module.css'

type AddModalPropsType = {
  addCardHandler: (data: CardType) => void
  packId: string
}

export const AddCardsModal = (props: AddModalPropsType) => {
  const [question, SetQuestion] = useState<string>('')
  const [answer, SetAnswer] = useState<string>('')

  const createCardQuestion = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    SetQuestion(e.currentTarget.value)
  }
  const createCardAnswer = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    SetAnswer(e.currentTarget.value)
  }

  const AddNewCard = () => {
    const data = {
      cardsPack_id: props.packId,
      question: question,
      answer: answer,
      _id: '',
    }

    props.addCardHandler(data)
    SetQuestion('')
    SetAnswer('')
  }

  return (
    <BasicModal buttonTitle={'save'} color={'primary'} title={' Edit Card'} callback={AddNewCard}>
      <div className={style.modal}>
        <div className={style.modalTitle}></div>
        <ControllableStates />
        <TextField
          value={question}
          onChange={createCardQuestion}
          label="Question"
          variant="outlined"
        />
        <TextField value={answer} onChange={createCardAnswer} label="Answer" variant="outlined" />
      </div>
    </BasicModal>
  )
}
