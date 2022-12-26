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

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/react-redux-hooks'
import { StyledTableCell, StyledTableRow } from '../../../../common/styles/styledTableElements'
import { deleteCard, editCard } from '../../cardsReducer'

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
          <StyledTableRow>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell align="center">Answer</StyledTableCell>
            <StyledTableCell align="center">Last updated</StyledTableCell>
            <StyledTableCell align="center">Grade</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {cardPack.cards.map(card => (
            <StyledTableRow key={card._id}>
              <StyledTableCell component="th" scope="row">
                {card.question}
              </StyledTableCell>
              <StyledTableCell align="center">{card.answer}</StyledTableCell>
              <StyledTableCell align="center">{card.updated}</StyledTableCell>
              <StyledTableCell align="center">{card.grade}</StyledTableCell>
              <StyledTableCell align="center">
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
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
