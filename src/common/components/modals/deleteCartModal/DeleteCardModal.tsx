import React from 'react'

import { DeleteOutline } from '@material-ui/icons'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { Button } from '@mui/material'

import { BasicModal } from '../basicModal/BasicModal'
import style from '../style/Modal.module.css'

type DeleteModalPropsType = {
  cardId: string
  deleteButtonHandler: (cardId: string) => void
}

export const DeleteCardModal = (props: DeleteModalPropsType) => {
  const deletePackHandler = () => {
    props.deleteButtonHandler(props.cardId)
  }

  return (
    <BasicModal icon={<DeleteOutline />}>
      <div className={style.modal}>
        <div className={style.modalTitle}>
          <h2> Delete Pack</h2>
          <Button>x</Button>
        </div>
        <div>
          Do you really want to remove <b>hh</b>? <div>All cards will be deleted</div>
        </div>
        <div className={style.modalButtons}>
          <Button>cancel</Button>
          <Button color={'error'} variant={'contained'} onClick={deletePackHandler}>
            delete
          </Button>
        </div>
      </div>
    </BasicModal>
  )
}
