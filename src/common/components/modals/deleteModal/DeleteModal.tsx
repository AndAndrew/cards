import React from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { BasicModal } from '../basicModal/BasicModal'
import style from '../style/Modal.module.css'

type DeleteModalPropsType = {
  name: string
  packId: string
  deleteButtonHandler: (packId: string) => void
}

export const DeleteModal = (props: DeleteModalPropsType) => {
  const deletePackHandler = () => {
    props.deleteButtonHandler(props.packId)
  }

  return (
    <BasicModal
      icon={<DeleteOutline />}
      buttonTitle={'delete'}
      title={'Delete Pack'}
      color={'secondary'}
      callback={deletePackHandler}
    >
      <div className={style.modal}>
        <div className={style.modalTitle}></div>
        <div>
          Do you really want to remove <b>{props.name}</b>? <div>All cards will be deleted</div>
        </div>
        <div className={style.modalButtons}></div>
      </div>
    </BasicModal>
  )
}
