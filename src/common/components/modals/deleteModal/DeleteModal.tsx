import React from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'

import { DeleteModalDescription } from '../../deleteModalDescription/DeleteModalDescription'
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
      buttonTitle={'Delete'}
      title={'Delete Pack'}
      color={'error'}
      callback={deletePackHandler}
    >
      <div className={style.modal}>
        <DeleteModalDescription text={props.name} />
      </div>
    </BasicModal>
  )
}
