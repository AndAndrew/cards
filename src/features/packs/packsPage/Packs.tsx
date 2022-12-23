import React, { ChangeEvent, useEffect, useState } from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { NativeSelect } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ReactPaginate from 'react-paginate'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { Cards } from '../../cards/cardsPage/Cards'
import Filters from '../components/Filters/Filters'
import {
  setPacksDataTC,
  setPacksPageCountAC,
  setPacksPageNumberAC,
  setSortPacksAC,
  addPack,
  deletePack,
  editPack,
} from '../packsReducer'

import style from './Packs.module.css'

export const Packs = () => {
  const [packId, setPackId] = useState('')

  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.page)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const profileName = useAppSelector(state => state.auth.profileName)
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

  const segueToPack = (id: string) => {
    setPackId(id)
  }
  const learnFromPack = (packId: string) => {
    console.log('learn')
  }
  const editButtonHandler = (packId: string) => {
    dispatch(editPack<{ name: string }>(packId, { name: 'updated name' }))
  }
  const deleteButtonHandler = (packId: string) => {
    dispatch(deletePack(packId))
  }
  const addButtonHandler = () => {
    dispatch(addPack('New pack', '', false))
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#EFEFEF',
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#FAFAFA',
    },
  }))
  const isMyPack = (name: string) => {
    return name === profileName
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

  const handleSort = (sort: string) => {
    dispatch(setSortPacksAC(sort))
  }

  return (
    <div className={style.container}>
      <div className={style.titleBlock}>
        <div className={style.title}>Packs list</div>
        <Button
          style={{
            fontFamily: 'Montserrat',
            fontWeight: '500',
            borderRadius: '20px',
            fontSize: '16px',
            textTransform: 'capitalize',
          }}
          variant={'contained'}
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
        <TableContainer sx={{ maxHeight: 490 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  onClick={
                    sortPacks === '0name' ? () => handleSort('1name') : () => handleSort('0name')
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  Name
                </StyledTableCell>
                <StyledTableCell align="center">Cards</StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={
                    sortPacks === '0updated'
                      ? () => handleSort('1updated')
                      : () => handleSort('0updated')
                  }
                >
                  Last updated
                </StyledTableCell>
                <StyledTableCell align="center">Created by</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packs.map(pack => (
                <StyledTableRow key={pack._id}>
                  <StyledTableCell component="th" scope="row">
                    <button className={style.tableNameButton} onClick={() => segueToPack(pack._id)}>
                      {pack.name}
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="center">{pack.cardsCount}</StyledTableCell>
                  <StyledTableCell align="center">{pack.updated}</StyledTableCell>
                  <StyledTableCell align="center">{pack.user_name}</StyledTableCell>
                  <StyledTableCell align={'center'}>
                    <div className={style.tableIconButtonsBlock}>
                      <IconButton onClick={() => learnFromPack(pack._id)}>
                        <SchoolOutlinedIcon />
                      </IconButton>
                      {isMyPack(pack.user_name) && (
                        <IconButton onClick={() => editButtonHandler(pack._id)}>
                          <DriveFileRenameOutlineIcon />
                        </IconButton>
                      )}
                      {isMyPack(pack.user_name) && (
                        <IconButton onClick={() => deleteButtonHandler(pack._id)}>
                          <DeleteOutline />
                        </IconButton>
                      )}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
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
    </div>
  )
}
