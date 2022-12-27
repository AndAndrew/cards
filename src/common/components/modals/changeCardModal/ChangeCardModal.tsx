import React, { ChangeEvent, useState } from 'react'

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { AddPackType, CardEditType, CardType } from '../../../../api/cards-api'
import ControllableStates from '../../optionInput/OptionInput'
import { BasicModal } from '../basicModal/BasicModal'

import style from './../style/Modal.module.css'

type ChangeModalPropsType = {
  answer: string
  question: string
  editCardHandler: (data: CardEditType) => void
  cardId: string
}

export const ChangeCardModal = (props: ChangeModalPropsType) => {
  const [question, SetQuestion] = useState<string>(props.question)
  const [answer, SetAnswer] = useState<string>(props.answer)

  const createCardQuestion = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    SetQuestion(e.currentTarget.value)
  }
  const createCardAnswer = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    SetAnswer(e.currentTarget.value)
  }

  const AddNewCard = () => {
    const data: CardEditType = {
      card: {
        _id: props.cardId,
        question: question,
        answer: answer,
      },
    }

    props.editCardHandler(data)
    SetQuestion('')
    SetAnswer('')
  }

  return (
    <BasicModal icon={<DriveFileRenameOutlineIcon />}>
      <div className={style.modal}>
        <div className={style.modalTitle}>
          <h2> Edit Card </h2>
          <Button>x</Button>
        </div>
        <ControllableStates />
        <TextField
          value={question}
          onChange={createCardQuestion}
          label="Question"
          variant="outlined"
        />
        <TextField value={answer} onChange={createCardAnswer} label="Answer" variant="outlined" />
      </div>
      <div className={style.modalButtons}>
        <Button>cancel</Button>
        <Button onClick={AddNewCard} color={'primary'} variant={'contained'}>
          save
        </Button>
      </div>
    </BasicModal>
  )
}
