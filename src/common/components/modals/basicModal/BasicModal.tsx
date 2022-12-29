import * as React from 'react'
import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'

import { buttonFontStyle } from '../../../styles/fontStyles'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type PropsType = {
  children: ReactNode
  icon?: JSX.Element
  title?: string
  callback?: () => void
  buttonTitle: string
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined
}

export const BasicModal = (props: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const functionCallback = () => {
    props.callback && props.callback()
    handleClose()
  }

  return (
    <div>
      {props.icon ? (
        <IconButton onClick={handleOpen}>{props.icon}</IconButton>
      ) : (
        <Button
          onClick={handleOpen}
          style={buttonFontStyle}
          variant={'contained'}
          color={'primary'}
        >
          {props.title}
        </Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2> {props.title} </h2>
            <Button onClick={handleClose}>x</Button>
          </div>
          {props.children}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>cancel</Button>
            <ButtonSave color={props.color} callback={functionCallback} title={props.buttonTitle} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}

const ButtonSave = (props: {
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
