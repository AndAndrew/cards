import React from 'react'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { deleteCard, editCard } from '../cardsReducer'

export const CardsTable = () => {
  const dispatch = useAppDispatch()
  const cardPack = useAppSelector(state => state.cardPack)
  const profileId = useAppSelector(state => state.profile._id)
  const editButtonHandler = (cardId: string) => {
    dispatch(editCard(cardId, { question: 'new' }))
  }
  const deleteButtonHandler = (id: string) => {
    dispatch(deleteCard(id))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="center">Answer</TableCell>
            <TableCell align="center">Last updated</TableCell>
            <TableCell align="center">Grade</TableCell>
            {cardPack.packUserId === profileId && <TableCell align="center"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPack.cards.map(card => (
            <TableRow key={card._id}>
              <TableCell component="th" scope="row">
                {card.question}
              </TableCell>
              <TableCell align="center">{card.answer}</TableCell>
              <TableCell align="center">{card.updated}</TableCell>
              <TableCell align="center">{card.grade}</TableCell>
              <TableCell align="center">
                {cardPack.packUserId === profileId && (
                  <IconButton onClick={() => editButtonHandler(card._id)}>
                    <DriveFileRenameOutlineIcon />
                  </IconButton>
                )}
                {cardPack.packUserId === profileId && (
                  <IconButton onClick={() => deleteButtonHandler(card._id)}>
                    <DeleteOutline />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
