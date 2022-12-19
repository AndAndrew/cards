import React, { useEffect } from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { CardType } from '../../api/cards-api'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'

import { getCards } from './cardsReducer'

export const CardsPage = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cardsPack.cards)

  useEffect(() => {
    dispatch(getCards('639dc06eea4807000491a3d2'))
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">Last updated</TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map(card => (
            <TableRow
              key={card.question}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <TableCell component="th" scope="row">
                {card.question}
              </TableCell>
              <TableCell align="right">{card.answer}</TableCell>
              <TableCell align="right">{card.updated}</TableCell>
              <TableCell align="right">{card.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
