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

import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'

import { getCards } from './cardsReducer'

type PropsType = {
  packId: string
}
export const CardsPage = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)

  useEffect(() => {
    dispatch(getCards(props.packId))
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
