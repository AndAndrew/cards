import * as React from 'react'

import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

type GradePropsType = {
  value: number | undefined
}

export const Grade = (props: GradePropsType) => {
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        value={props.value}
        precision={0.5}
        readOnly
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  )
}
