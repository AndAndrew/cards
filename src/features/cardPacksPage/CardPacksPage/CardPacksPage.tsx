import React, { ChangeEvent, useEffect, useState } from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { InputLabel, NativeSelect } from '@mui/material'
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

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { CardsPage } from '../../cardsPage/CardsPage'
import { getCardPacks } from '../cardPacksReducer'

import style from './CardPacksPage.module.css'

export const CardPacksPage = () => {
  const [packId, setPackId] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(10)

  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.cardPacks)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

  useEffect(() => {
    dispatch(getCardPacks(undefined, pageNumber, pageCount))
  }, [pageNumber, pageCount])

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
    setPageNumber(data.selected + 1)
  }

  const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageCount(+e.target.value)
  }

  return (
    <div>
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
