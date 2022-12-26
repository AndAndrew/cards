import React, { ChangeEvent, useState } from 'react'

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { AddPackType, CardType } from '../../../../api/cards-api'
import { BasicModal } from '../basicModal/BasicModal'

import style from './../style/Modal.module.css'

type AddModalPropsType = {
  addPackHandler?: (data: AddPackType) => void
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
    <BasicModal>
      <div className={style.modal}>
        <div className={style.modalTitle}>
          <h2> Add new Pack </h2>
          <Button>x</Button>
        </div>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <TextField
          value={packName}
          onChange={createPackName}
          label="Name Pack"
          variant="outlined"
        />
        </div>
        <div className={style.modalButtons}>
          <Button>cancel</Button>
          <Button color={'primary'} variant={'contained'} onClick={AddNewPack}>
            save
          </Button>
        </div>
      </div>
    </BasicModal>
  )
}
