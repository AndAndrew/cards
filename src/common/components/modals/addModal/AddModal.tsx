import React, { ChangeEvent, useState } from 'react'

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { AddPackType, CardType } from '../../../../api/cards-api'
import { BasicModal } from '../basicModal/BasicModal'

import style from './../style/Modal.module.css'

type AddModalPropsType = {
  addPackHandler: (data: AddPackType) => void
}

export const AddModal = (props: AddModalPropsType) => {
  const [packName, SetPackName] = useState<string>('')
  const [checked, setChecked] = useState(false)

  const createPackName = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
    <BasicModal title={' Add new Pack'} buttonTitle={'save'} callback={AddNewPack}>
      <div className={style.modal}>
        <TextField
          value={packName}
          onChange={createPackName}
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
      </div>
    </BasicModal>
  )
}
