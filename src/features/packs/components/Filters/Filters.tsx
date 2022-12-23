import React from 'react'

import { Search } from '../../../../common/components/search/Search'
import { useAppSelector } from '../../../../common/hooks/react-redux-hooks'
import { setPackNameAC } from '../../packsReducer'
import { DropFilters } from '../DropFilters/DropFilters'
import s from '../Filters/Filters.module.css'
import { SliderNumberOfCards } from '../SliderNumberOfCards/SliderNumberOfCards'
import ToggleMyOrAll from '../ToggleMyOrAll/ToggleMyOrAll'

const Filters = () => {
  const search = useAppSelector(state => state.packs.search)

  return (
    <div className={s.container}>
      <Search action={setPackNameAC} search={search} />
      <ToggleMyOrAll />
      <SliderNumberOfCards />
      <DropFilters />
    </div>
  )
}

export default Filters
