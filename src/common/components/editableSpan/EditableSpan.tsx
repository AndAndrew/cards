import { ChangeEvent, useState } from 'react'

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'

import style from './EditableSpan.module.css'

type PropsType = {
  name: string
  ChangeName: (name: string) => void
}
export const EditableSpan = (props: PropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, SetTitle] = useState(props.name)

  const onClickHandler = () => {
    setEditMode(!editMode)
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    SetTitle(e.currentTarget.value)
  }
  const onBlurHandler = () => {
    SetTitle(title)
    setEditMode(!editMode)
    props.ChangeName(title)
  }

  return (
    <span className={style.editableSpan}>
      {editMode ? (
        <input value={title} onBlur={onBlurHandler} onChange={onChangeInputHandler}></input>
      ) : (
        title
      )}
      <span className={style.editIcon} onClick={onClickHandler}>
        <DriveFileRenameOutlineIcon />
      </span>
    </span>
  )
}
