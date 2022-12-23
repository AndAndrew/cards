import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { Box } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/react-redux-hooks'
import {
  DEFAULT_MAX_CARDS_COUNT,
  DEFAULT_MIN_CARDS_COUNT,
  setMinMaxCardsCountAC,
  setPackNameAC,
  setSearchAC,
  setUserIdAC,
} from '../../cardPacksReducer'

import s from './DropFilters.module.css'

export const DropFilters = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(state => state.packs.packName)
  const search = useAppSelector(state => state.packs.search)
  const userId = useAppSelector(state => state.packs.user_id)
  const minMaxCardsCount = useAppSelector(state => state.packs.minMaxCardsCount)

  const dropFiltersCondition =
    packName ||
    search ||
    userId ||
    minMaxCardsCount[0] !== DEFAULT_MIN_CARDS_COUNT ||
    minMaxCardsCount[1] !== DEFAULT_MAX_CARDS_COUNT

  const dropFilters = (): void => {
    if (dropFiltersCondition) {
      dispatch(setPackNameAC(''))
      dispatch(setSearchAC(''))
      dispatch(setUserIdAC(''))
      dispatch(setMinMaxCardsCountAC([0, 110]))
    }
  }

  const disabledClassName = dropFiltersCondition ? s.filterIconDisabled : s.filterIcon

  return (
    <Box onClick={dropFilters}>
      {dropFiltersCondition ? (
        <div className={s.filterIconContainer}>
          <FilterAltOffIcon className={s.filterIcon} />
        </div>
      ) : (
        <div className={s.filterIconDisabledContainer}>
          <FilterAltIcon className={disabledClassName} />
        </div>
      )}
    </Box>
  )
}
