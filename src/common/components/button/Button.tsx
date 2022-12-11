import styles from './Button.module.css'

type PropsType = {
  title: string
  onClick: () => void
}

export const Button = (props: PropsType) => {
  const onClickHandler = () => {
    props.onClick()
  }

  return (
    <div className={styles.container}>
      <button onClick={onClickHandler}>{props.title}</button>
    </div>
  )
}
