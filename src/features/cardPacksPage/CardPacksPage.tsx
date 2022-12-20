import React, { useEffect, useState } from 'react'

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
import { CardsPage } from '../cardsPage/CardsPage'

import { getCardPacks } from './cardPacksReducer'

export const CardPacksPage = () => {
  const [packId, setPackId] = useState('')

  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.cardPacks)

  useEffect(() => {
    dispatch(getCardPacks(undefined, 1, 15))
  }, [])

  const handleClick = (id: string) => {
    setPackId(id)
  }

  if (packId !== '') {
    return <CardsPage packId={packId} />
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last updated</TableCell>
            <TableCell align="right">Created by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.map(pack => (
            <TableRow key={pack._id} onClick={() => handleClick(pack._id)}>
              <TableCell component="th" scope="row">
                {pack.name}
              </TableCell>
              <TableCell align="right">{pack.cardsCount}</TableCell>
              <TableCell align="right">{pack.updated}</TableCell>
              <TableCell align="right">{pack.user_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
