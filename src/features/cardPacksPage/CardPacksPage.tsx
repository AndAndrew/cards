import React, { ChangeEvent, useEffect, useState } from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { NativeSelect } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ReactPaginate from 'react-paginate'

import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { CardsPage } from '../cardsPage/CardsPage'

import style from './CardPacksPage.module.css'
import Filters from './components/Filters/Filters'
import {
  setPacksDataTC,
  setPacksPageCountAC,
  setPacksPageNumberAC,
} from './reducer/cardPacksReducer'

export const CardPacksPage = () => {
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

  useEffect(() => {
    dispatch(setPacksDataTC())
  }, [page, pageCount, packName, sortPacks, search, userId, minMaxCardsCount])

  const onNameButtonClick = (id: string) => {
    setPackId(id)
  }
  const onLearnButtonClick = (packId: string) => {
    console.log('learn')
  }
  const onEditButtonClick = (packId: string) => {
    console.log('edit')
  }
  const onDeleteButtonClick = (packId: string) => {
    console.log('delete')
  }

  if (packId !== '') {
    return <CardsPage packId={packId} />
  }

  const handlePageClick = (data: { selected: number }) => {
    dispatch(setPacksPageNumberAC(data.selected + 1))
  }

  const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPacksPageCountAC(+e.target.value))
  }

  return (
    <div>
      <Filters />
      <Button variant={'contained'}>add pack</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Cards</TableCell>
              <TableCell align="center">Last updated</TableCell>
              <TableCell align="center">Created by</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.map(pack => (
              <TableRow key={pack._id}>
                <TableCell component="th" scope="row">
                  <button onClick={() => onNameButtonClick(pack._id)}>{pack.name}</button>
                </TableCell>
                <TableCell align="center">{pack.cardsCount}</TableCell>
                <TableCell align="center">{pack.updated}</TableCell>
                <TableCell align="center">{pack.user_name}</TableCell>
                <TableCell align={'center'}>
                  <div>
                    <IconButton onClick={() => onLearnButtonClick(pack._id)}>
                      <SchoolOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => onEditButtonClick(pack._id)}>
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteButtonClick(pack._id)}>
                      <DeleteOutline />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
  )
}
