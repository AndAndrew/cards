import React, { useEffect, useState } from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { CardsPage } from '../cardsPage/CardsPage'

import { addCardPack, deleteCardPack, editCardPack, getCardPacks } from './cardPacksReducer'

export const CardPacksPage = () => {
  const [packId, setPackId] = useState('')

  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.cardPacks)

  useEffect(() => {
    dispatch(getCardPacks(undefined, 1, 15))
  }, [])

  const segueToPack = (id: string) => {
    setPackId(id)
  }
  const learnFromPack = (packId: string) => {
    console.log('learn')
  }
  const editPack = (packId: string) => {
    dispatch(editCardPack<{ name: string }>(packId, { name: 'updated name' }))
  }
  const deletePack = (packId: string) => {
    dispatch(deleteCardPack(packId))
  }
  const addPack = () => {
    dispatch(addCardPack('New pack', '', false))
  }

  if (packId !== '') {
    return <CardsPage packId={packId} />
  }

  return (
    <div>
      <button onClick={addPack}>add pack</button>
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
                  <button onClick={() => segueToPack(pack._id)}>{pack.name}</button>
                </TableCell>
                <TableCell align="center">{pack.cardsCount}</TableCell>
                <TableCell align="center">{pack.updated}</TableCell>
                <TableCell align="center">{pack.user_name}</TableCell>
                <TableCell align={'center'}>
                  <div>
                    <IconButton onClick={() => learnFromPack(pack._id)}>
                      <SchoolOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => editPack(pack._id)}>
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                    <IconButton onClick={() => deletePack(pack._id)}>
                      <DeleteOutline />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
