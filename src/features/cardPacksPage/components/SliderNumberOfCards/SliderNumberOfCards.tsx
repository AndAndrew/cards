import React, { memo, SyntheticEvent, useEffect, useState } from 'react'

import { Box, Slider } from '@mui/material'
import Typography from '@mui/material/Typography'

import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
} from '../../../../common/hooks/react-redux-hooks'
import { setMinMaxCardsCountAC } from '../../reducer/cardPacksReducer'

import s from './SliderNumberOfCards.module.css'

const timeWait = 1000

export const SliderNumberOfCards = memo(() => {
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const minMaxCount = useAppSelector(state => state.packs.minMaxCardsCount)
  const dispatch = useAppDispatch()
  const [selectedCount, setSelectedCount] = useState<number[]>(minMaxCount)

  const debounceSelectedCount = useDebounce<number[]>(selectedCount, timeWait)

  const handleChange = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ): void => {
    setSelectedCount(newValue as number[])
  }

  useEffect(() => {
    dispatch(setMinMaxCardsCountAC(debounceSelectedCount))
  }, [debounceSelectedCount, dispatch])

  return (
    <div>
      <Typography component="p">Number of Cards</Typography>
      <div className={s.container}>
        <div className={s.numberContainer}>{selectedCount[0]}</div>

        <Box sx={{ width: 150, padding: '15px' }}>
          <Slider
            getAriaLabel={() => 'Cards count range'}
            max={maxCardsCount}
            value={selectedCount}
            onChange={handleChange}
            valueLabelDisplay="auto"
            disableSwap
          />
        </Box>

        <div className={s.numberContainer}>{selectedCount[1]}</div>
      </div>
    </div>
  )
})
