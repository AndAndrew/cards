import React from 'react'

import style from '../modals/style/Modal.module.css'

type PropsType = {
  text: string
}

export const DeleteModalDescription = (props: PropsType) => {
  return (
    <div className={style.description}>
      Do you really want to remove <span>{props.text}</span>?<div>All cards will be deleted.</div>
    </div>
  )
}
