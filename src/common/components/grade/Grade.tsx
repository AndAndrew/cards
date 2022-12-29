import * as React from 'react'

import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

import { GradeChangeType } from '../../../api/cards-api'
import { useAppSelector } from '../../hooks/react-redux-hooks'

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

type GradePropsType = {
  value: number | undefined
  cardId: string
  sendGrade: (data: GradeChangeType) => void
  cardPackId: string | undefined
}

export const Grade = (props: GradePropsType) => {
  const [value, setValue] = React.useState<number | undefined>(props.value)
  const [hover, setHover] = React.useState(-1)
  const changeGrade = (newValue: number | undefined) => {
    const data = {
      grade: newValue,
      card_id: props.cardId,
      cardsPack_id: props.cardPackId,
    }

    props.sendGrade(data)
  }

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue)
            changeGrade(newValue)
          }
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />

      {value !== undefined && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  )
}
