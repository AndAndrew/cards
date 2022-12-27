import React, { ChangeEvent, useState } from 'react'

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { AddPackType } from '../../../../api/cards-api'
import { BasicModal } from '../basicModal/BasicModal'

import style from './../style/Modal.module.css'

type ChangeModalPropsType = {
  editButtonHandler: (data: AddPackType) => void
  packId: string
  name: string
}

export const ChangeModal = (props: ChangeModalPropsType) => {
  const [packName, SetPackName] = useState(props.name)
  const [checked, setChecked] = useState(false)

  const createNewPackName = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    SetPackName(e.currentTarget.value)
  }
  const isChecked = () => {
    setChecked(!checked)
  }
  const changePackName = () => {
    const data = {
      _id: props.packId,
      name: packName,
      isPrivate: checked,
    }

    props.editButtonHandler(data)
    SetPackName('')
  }

  return (
    <BasicModal
      title={'Change Pack Name'}
      callback={changePackName}
      icon={<DriveFileRenameOutlineIcon />}
      buttonTitle={'save'}
      color={'error'}
    >
      <div className={style.modal}>
        <div className={style.modalTitle}></div>
        <TextField
          value={packName}
          onChange={createNewPackName}
          label="Name Pack"
          variant="outlined"
        />
        <div className={style.modalInput}>
          <FormControlLabel
            value="end"
            control={<Checkbox onChange={isChecked} checked={checked} />}
            label="Private Pack"
            labelPlacement="end"
          />
        </div>
        <div className={style.modalButtons}></div>
      </div>
    </BasicModal>
  )
}
