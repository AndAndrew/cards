import { ChangeEvent } from 'react'

import styles from './Checkbox.module.css'

type PropsType = {
  checked: boolean
  callBack: (checked: boolean) => void
}

export const Checkbox = (props: PropsType) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.callBack(event.currentTarget.checked)
  }

  return (
    <>
      <span className={styles.container}>
        <input onChange={onChangeHandler} checked={props.checked} type={'checkbox'} />
      </span>
    </>
  )
}
