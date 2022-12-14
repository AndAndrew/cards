import style from '../../styles/common.container.module.css'

type TitlePropsType = {
  title: string
}

export const Title = (props: TitlePropsType) => {
  return (
    <div className={style.titleContainer}>
      <strong className={style.titleStyle}>{props.title}</strong>
    </div>
  )
}
