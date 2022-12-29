import * as React from 'react'

import Button from '@mui/material/Button'

export const ButtonSave = (props: {
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined
  title: string
  callback: () => void
}) => {
  return (
    <Button color={props.color} variant={'contained'} onClick={props.callback}>
      {props.title}
    </Button>
  )
}
