import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { Box } from '@mui/material'

import { useAppDispatch } from '../../../../common/hooks/react-redux-hooks'
import {
  setMinMaxCardsCountAC,
  setPackNameAC,
  setSearchAC,
  setUserIdAC,
} from '../../reducer/cardPacksReducer'

export const DropFilters = () => {
  const dispatch = useAppDispatch()

  const cancelFilter = (): void => {
    dispatch(setPackNameAC(''))
    dispatch(setSearchAC(''))
    dispatch(setUserIdAC(''))
    dispatch(setMinMaxCardsCountAC([0, 110]))
  }

  return (
    <Box onClick={cancelFilter}>
      <FilterAltOffIcon />
    </Box>
  )
}
