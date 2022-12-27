import React, { ChangeEvent, useEffect, useState } from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { NativeSelect, TableSortLabel } from '@mui/material'
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

import { AddPackType } from '../../../api/cards-api'
import { AddModal } from '../../../common/components/modals/addModal/AddModal'
import { BasicModal } from '../../../common/components/modals/basicModal/BasicModal'
import { ChangeModal } from '../../../common/components/modals/changeModal/ChangeModal'
import { DeleteModal } from '../../../common/components/modals/deleteModal/DeleteModal'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { Cards } from '../../cards/cardsPage/Cards'
import Filters from '../components/Filters/Filters'
import {
  addPack,
  deletePack,
  editPack,
  setPacksDataTC,
  setPacksPageCountAC,
  setPacksPageNumberAC,
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
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc' | undefined>('asc')
  const [orderNameDirection, setOrderNameDirection] = useState<'asc' | 'desc' | undefined>('asc')
  const [orderCreatorDirection, setOrderCreatorDirection] = useState<'asc' | 'desc' | undefined>(
    'asc'
  )

  useEffect(() => {
    dispatch(setPacksDataTC({}))
  }, [page, pageCount, packName, sortPacks, search, userId, minMaxCardsCount])

  const segueToPack = (id: string) => {
    setPackId(id)
  }
  const learnFromPack = (packId: string) => {
    console.log('learn')
  }
  const editButtonHandler = (data: AddPackType) => {
    dispatch(editPack(packId, data))
  }
  const deleteButtonHandler = (packId: string) => {
    dispatch(deletePack(packId))
  }
  const addPackHandler = (data: AddPackType) => {
    dispatch(addPack(data))
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

  const sortArray = (orderBy: 'asc' | 'desc' | undefined, sortParams: string) => {
    switch (orderBy) {
      case 'asc':
      default:
        return dispatch(setPacksDataTC({ sortPacks: '1' + sortParams }))
      case 'desc':
        return dispatch(setPacksDataTC({ sortPacks: '0' + sortParams }))
    }
  }

  const handleSortRequest = (sortParams: string) => {
    switch (sortParams) {
      case 'name':
        setOrderNameDirection(orderNameDirection === 'asc' ? 'desc' : 'asc')

        return sortArray(orderNameDirection, sortParams)

      case 'updated':
        sortArray(orderDirection, sortParams)

        return setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')

      case 'user_name':
        setOrderCreatorDirection(orderCreatorDirection === 'asc' ? 'desc' : 'asc')

        return sortArray(orderCreatorDirection, sortParams)
    }
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
        <TableContainer sx={{ maxHeight: 490 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell onClick={() => handleSortRequest('name')} sx={{ width: '200px' }}>
                  <TableSortLabel direction={orderNameDirection} active={true}>
                    Name
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">Cards</StyledTableCell>
                <StyledTableCell onClick={() => handleSortRequest('updated')} align="center">
                  <TableSortLabel direction={orderDirection} active={true}>
                    Last Updated
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell onClick={() => handleSortRequest('user_name')} align="center">
                  <TableSortLabel direction={orderCreatorDirection} active={true}>
                    Created by
                  </TableSortLabel>
                </StyledTableCell>
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
                      <ChangeModal
                        editButtonHandler={editButtonHandler}
                        name={pack.name}
                        packId={pack._id}
                        isPrivate={pack.private}
                      />
                      <DeleteModal
                        name={pack.name}
                        packId={pack._id}
                        deleteButtonHandler={deleteButtonHandler}
                      />
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
