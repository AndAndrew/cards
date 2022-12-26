import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { CardEditType, CardType } from '../../../api/cards-api'
import { AddCardsModal } from '../../../common/components/modals/addCardsModal/AddCardsModal'
import { ChangeCardModal } from '../../../common/components/modals/changeCardModal/ChangeCardModal'
import { DeleteCardModal } from '../../../common/components/modals/deleteCartModal/DeleteCardModal'
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

  const addCardHandler = (data: CardType) => {
    dispatch(addCard(data))
  }

  const editCardHandler = (data: CardEditType) => {
    dispatch(editCard(data))
  }
  const deleteButtonHandler = (id: string) => {
    dispatch(deleteCard(id))
  }

  return (
    <div>
      <span>My Pack</span>
      <AddCardsModal addCardHandler={addCardHandler} packId={props.packId} />
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
              <TableRow key={card.cardsPack_id}>
                <TableCell component="th" scope="row">
                  {card.question}
                </TableCell>
                <TableCell align="center">{card.answer}</TableCell>
                <TableCell align="center">{card.updated}</TableCell>
                <TableCell align="center">{card.grade}</TableCell>
                <TableCell align="center">
                  <ChangeCardModal
                    editCardHandler={editCardHandler}
                    answer={card.answer}
                    question={card.question}
                    cardId={card._id}
                  />
                  <DeleteCardModal
                    deleteButtonHandler={deleteButtonHandler}
                    question={card.question}
                    cardId={card._id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
