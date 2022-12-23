import React, { memo, useEffect, useState } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import Typography from '@mui/material/Typography'

import s from '../../../../common/components/search/Search.module.css'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/react-redux-hooks'
import { setUserIdAC } from '../../cardPacksReducer'

import style from './ToggleMyOrAll.module.css'

type alignmentType = 'My' | 'All'

const ToggleMyOrAll = memo(() => {
  const userId = useAppSelector(state => state.profile._id)
  const userCardId = useAppSelector(state => state.packs.user_id)
  const dispatch = useAppDispatch()
  const [alignment, setAlignment] = useState<alignmentType>('All')

  const My = userCardId ? 'My' : 'All'

  useEffect(() => {
    setAlignment(My)
  }, [My])

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: alignmentType) => {
    if (newAlignment === 'My') {
      dispatch(setUserIdAC(userId))
    }
    if (newAlignment === 'All') {
      dispatch(setUserIdAC(''))
    }
  }

  return (
    <div className={s.search}>
      <Typography component="p">Show packs cards</Typography>
      <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange}>
        <ToggleButton className={style.button} value="My">
          My
        </ToggleButton>
        <ToggleButton className={style.button} value="All">
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
})

export default ToggleMyOrAll
