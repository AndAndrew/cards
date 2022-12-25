import { log } from 'util'

import * as React from 'react'
import { ReactNode } from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

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
}

export const BasicModal = (props: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {props.icon ? (
        <IconButton onClick={handleOpen}>{props.icon}</IconButton>
      ) : (
        <Button
          onClick={handleOpen}
          style={{
            fontFamily: 'Montserrat',
            fontWeight: '500',
            borderRadius: '20px',
            fontSize: '16px',
            textTransform: 'capitalize',
          }}
          variant={'contained'}
          color={'primary'}
        >
          Add New Pack
        </Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  )
}
