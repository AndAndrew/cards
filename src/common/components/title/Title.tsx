import s from './Title.module.css'

type TitlePropsType = {
  title: string
}

export const Title = (props: TitlePropsType) => {
  return <div className={s.titleStyle}>{props.title}</div>
}
