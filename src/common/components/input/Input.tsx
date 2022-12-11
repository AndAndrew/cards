import { KeyboardEvent, ChangeEvent, useState } from 'react'

import styles from './Input.module.css'

type PropsType = {
  title: string
  callBack: (title: string) => void
}

export const Input = (props: PropsType) => {
  const [title, setTitle] = useState(props.title)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.callBack(title)
      setTitle('')
    }
  }

  return (
    <>
      <span className={styles.container}>
        <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
      </span>
    </>
  )
}
