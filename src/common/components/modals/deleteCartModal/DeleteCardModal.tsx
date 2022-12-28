import React from 'react'

import { DeleteOutline } from '@material-ui/icons'

import { DeleteModalDescription } from '../../deleteModalDescription/DeleteModalDescription'
import { BasicModal } from '../basicModal/BasicModal'
import style from '../style/Modal.module.css'

type DeleteModalPropsType = {
  cardId: string
  deleteButtonHandler: (cardId: string) => void
  question: string
}

export const DeleteCardModal = (props: DeleteModalPropsType) => {
  const deletePackHandler = () => {
    props.deleteButtonHandler(props.cardId)
  }

  return (
    <BasicModal
      icon={<DeleteOutline />}
      color={'error'}
      buttonTitle={'Delete'}
      title={'Delete Card'}
      callback={deletePackHandler}
    >
      <div className={style.modal}>
        <DeleteModalDescription text={props.question} />
      </div>
    </BasicModal>
  )
}
