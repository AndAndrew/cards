import React, { useEffect, useState } from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { me } from '../auth/authReducer'
import { CardsPage } from '../cardsPage/CardsPage'

import { addPack, deletePack, editPack, getCardPacks } from './cardPacksReducer'
import styles from './CardsPackPage.module.css'

export const CardPacksPage = () => {
  const [packId, setPackId] = useState('')

  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.cardPacks)
  const profileName = useAppSelector(state => state.auth.profileName)

  useEffect(() => {
    dispatch(me())
    dispatch(getCardPacks(undefined, 1, 15))
  }, [])

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
    return <CardsPage packId={packId} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleBlock}>
        <div className={styles.title}>Packs list</div>
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
      <div className={styles.filterBlock}></div>
      <div className={styles.table}>
        <TableContainer sx={{ maxHeight: 490 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Cards</StyledTableCell>
                <StyledTableCell align="center">Last updated</StyledTableCell>
                <StyledTableCell align="center">Created by</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packs.map(pack => (
                <StyledTableRow key={pack._id}>
                  <StyledTableCell component="th" scope="row">
                    <button
                      className={styles.tableNameButton}
                      onClick={() => segueToPack(pack._id)}
                    >
                      {pack.name}
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="center">{pack.cardsCount}</StyledTableCell>
                  <StyledTableCell align="center">{pack.updated}</StyledTableCell>
                  <StyledTableCell align="center">{pack.user_name}</StyledTableCell>
                  <StyledTableCell align={'center'}>
                    <div className={styles.tableIconButtonsBlock}>
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
      </div>
    </div>
  )
}
