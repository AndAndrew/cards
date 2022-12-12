import { ChangeEvent, useState } from 'react'

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
    <span>
      {editMode ? (
        <input value={title} onBlur={onBlurHandler} onChange={onChangeInputHandler}></input>
      ) : (
        title
      )}
      <span onClick={onClickHandler}>--edit--</span>
    </span>
  )
}
