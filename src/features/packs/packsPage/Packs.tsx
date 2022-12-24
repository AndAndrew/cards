import React, { ChangeEvent, useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import NativeSelect from '@mui/material/NativeSelect'
import ReactPaginate from 'react-paginate'

import { PackType } from '../../../api/cards-api'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { buttonFontStyle } from '../../../common/styles/fontStyles'
import { Cards } from '../../cards/cardsPage/Cards'
import Filters from '../components/Filters/Filters'
import { setPacksDataTC, setPacksPageCountAC, setPacksPageNumberAC, addPack } from '../packsReducer'
import { PacksTable } from '../packsTable/PacksTable'

import style from './Packs.module.css'

export const Packs = () => {
  const [packId, setPackId] = useState('')

  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.page)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const packName = useAppSelector(state => state.packs.packName)
  const sortPacks = useAppSelector(state => state.packs.sortPacks)
  const userId = useAppSelector(state => state.packs.user_id)
  const minMaxCardsCount = useAppSelector(state => state.packs.minMaxCardsCount)
  const search = useAppSelector(state => state.packs.search)

  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc' | undefined>('asc')

  useEffect(() => {
    dispatch(setPacksDataTC({}))
  }, [page, pageCount, packName, sortPacks, search, userId, minMaxCardsCount])
  const addButtonHandler = () => {
    dispatch(addPack('New pack', '', false))
  }

  if (packId !== '') {
    return <Cards packId={packId} />
  }

  const handlePageClick = (data: { selected: number }) => {
    dispatch(setPacksPageNumberAC(data.selected + 1))
  }

  const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPacksPageCountAC(+e.target.value))
  }

  const sortArray = (packs: Array<PackType>, orderBy: 'asc' | 'desc' | undefined) => {
    switch (orderBy) {
      case 'asc':
      default:
        return dispatch(setPacksDataTC({ sortPacks: '1updated' }))
      case 'desc':
        return dispatch(setPacksDataTC({ sortPacks: '0updated' }))
    }
  }

  const handleSortRequest = () => {
    sortArray(packs, orderDirection)
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className={style.container}>
      <div className={style.titleBlock}>
        <div className={style.title}>Packs list</div>
        <Button
          variant={'contained'}
          style={buttonFontStyle}
          color={'primary'}
          onClick={addButtonHandler}
        >
          Add new pack
        </Button>
      </div>
      <div className={style.filterBlock}>
        <Filters />
      </div>
      <div className={style.table}>
        <PacksTable
          orderDirection={orderDirection}
          handleSortRequest={handleSortRequest}
          setPackId={setPackId}
        />
        <div className={style.PaginationContainer}>
          <ReactPaginate
            pageCount={Math.ceil(cardPacksTotalCount / pageCount)}
            nextLabel={'>'}
            breakLabel={'...'}
            previousLabel={'<'}
            containerClassName={style.paginationBttns}
            disabledClassName={style.paginationDisabled}
            activeClassName={style.paginationActive}
            onPageChange={handlePageClick}
          />
          <div className={style.SelectContainer}>
            Show
            <NativeSelect onChange={handlePageCountChange} sx={{ margin: '5px' }} defaultValue={10}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </NativeSelect>
            Cards per page
          </div>
        </div>
      </div>
    </div>
  )
}
