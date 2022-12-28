import React, { ChangeEvent, useState } from 'react'

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { Button, TextField } from '@mui/material'

import { CardEditType } from '../../../../api/cards-api'
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
    const data = {
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
    <BasicModal
      icon={<DriveFileRenameOutlineIcon />}
      color={'primary'}
      callback={AddNewCard}
      buttonTitle={'save'}
      title={'Edit Card'}
    >
      <div className={style.modal}>
        <ControllableStates />
        <TextField
          value={question}
          onChange={createCardQuestion}
          label="Question"
          variant="outlined"
        />
        <TextField value={answer} onChange={createCardAnswer} label="Answer" variant="outlined" />
      </div>
      <div className={style.modalButtons}></div>
    </BasicModal>
  )
}
