import React, { ChangeEvent, useState } from 'react'

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { AddPackType } from '../../../../api/cards-api'
import { BasicModal } from '../basicModal/BasicModal'

import style from './../style/Modal.module.css'

type AddModalPropsType = {
  addPackHandler: (data: AddPackType) => void
}

export const AddModal = (props: AddModalPropsType) => {
  const [packName, SetPackName] = useState<null | string>(null)
  const [checked, setChecked] = useState(false)

  const changePackName = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    SetPackName(e.currentTarget.value)
  }
  const isChecked = () => {
    setChecked(!checked)
  }
  const AddNewPack = () => {
    const data: AddPackType = {
      name: packName,
      deckCover: '',
      isPrivate: checked,
    }

    props.addPackHandler(data)
    SetPackName('')
  }

  return (
    <BasicModal>
      <div className={style.modal}>
        <div className={style.modalTitle}>
          <h1> Add new Pack </h1>
          <Button>x</Button>
        </div>
        <TextField
          value={packName}
          onChange={changePackName}
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
        <div className={style.modalButtons}>
          <Button>cancel</Button>
          <Button onClick={AddNewPack}>save</Button>
        </div>
      </div>
    </BasicModal>
  )
}
