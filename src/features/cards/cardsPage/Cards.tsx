import React, { useEffect } from 'react'

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
import { addCard, deleteCard, editCard, getCards } from '../cardsReducer'

type PropsType = {
  packId: string
}
export const Cards = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)

  useEffect(() => {
    dispatch(getCards(props.packId, 1, 10))
  }, [])

  const addButtonHandler = () => {
    dispatch(addCard(props.packId, 'question', 'answer'))
  }

  const editButtonHandler = (cardId: string) => {
    dispatch(editCard(cardId, { question: 'new' }))
  }
  const deleteButtonHandler = (id: string) => {
    dispatch(deleteCard(id))
  }

  return (
    <div>
      <span>My Pack</span>
      <button onClick={addButtonHandler}>add card</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="center">Answer</TableCell>
              <TableCell align="center">Last updated</TableCell>
              <TableCell align="center">Grade</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map(card => (
              <TableRow key={card._id}>
                <TableCell component="th" scope="row">
                  {card.question}
                </TableCell>
                <TableCell align="center">{card.answer}</TableCell>
                <TableCell align="center">{card.updated}</TableCell>
                <TableCell align="center">{card.grade}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => editButtonHandler(card._id)}>
                    <DriveFileRenameOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteButtonHandler(card._id)}>
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
