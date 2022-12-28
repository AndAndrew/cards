import React, { ChangeEvent, useEffect } from 'react'

import NativeSelect from '@mui/material/NativeSelect'
import ReactPaginate from 'react-paginate'

import { AddPackType } from '../../../api/cards-api'
import { AddModal } from '../../../common/components/modals/addModal/AddModal'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import Filters from '../components/Filters/Filters'
import { setPacksDataTC, setPacksPageCountAC, setPacksPageNumberAC, addPack } from '../packsReducer'
import { PacksTable } from '../packsTable/PacksTable'

import style from './Packs.module.css'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.page)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const packName = useAppSelector(state => state.packs.packName)
  const sortPacks = useAppSelector(state => state.packs.sortPacks)
  const userId = useAppSelector(state => state.packs.user_id)
  const minMaxCardsCount = useAppSelector(state => state.packs.minMaxCardsCount)
  const search = useAppSelector(state => state.packs.search)

  useEffect(() => {
    dispatch(setPacksDataTC({}))
  }, [page, pageCount, packName, sortPacks, search, userId, minMaxCardsCount])
  const addButtonHandler = () => {
    dispatch(addPack({ name: 'New pack', deckCover: '', private: false }))
  }

  const handlePageClick = (data: { selected: number }) => {
    dispatch(setPacksPageNumberAC(data.selected + 1))
  }

  const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPacksPageCountAC(+e.target.value))
  }

  const addPackHandler = (data: AddPackType) => {
    dispatch(addPack(data))
  }

  return (
    <div className={style.container}>
      <div className={style.titleBlock}>
        <div className={style.title}>Packs list</div>
        <AddModal addPackHandler={addPackHandler} />
      </div>
      <div className={style.filterBlock}>
        <Filters />
      </div>
      <div className={style.table}>
        <PacksTable />
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
