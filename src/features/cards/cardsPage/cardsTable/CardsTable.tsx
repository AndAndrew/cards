import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'

import { CardEditType } from '../../../../api/cards-api'
import { Grade } from '../../../../common/components/grade/Grade'
import { ChangeCardModal } from '../../../../common/components/modals/changeCardModal/ChangeCardModal'
import { DeleteCardModal } from '../../../../common/components/modals/deleteCartModal/DeleteCardModal'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/react-redux-hooks'
import { StyledTableCell, StyledTableRow } from '../../../../common/styles/styledTableElements'
import { tableCellStyle } from '../../../../common/styles/tableElementsStyles'
import { deleteCard, editCard } from '../../cardsReducer'

export const CardsTable = () => {
  const dispatch = useAppDispatch()
  const cardPack = useAppSelector(state => state.cardPack)
  const profileId = useAppSelector(state => state.profile._id)

  const getDate = (date: string) => {
    const newDate = new Date(date)

    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`
  }
  const editButtonHandler = (data: CardEditType) => {
    dispatch(editCard(data))
  }
  const deleteButtonHandler = (id: string) => {
    dispatch(deleteCard(id))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{ width: '30%' }} align="center">
              Question
            </StyledTableCell>
            <StyledTableCell style={{ width: '30%' }} align="center">
              Answer
            </StyledTableCell>
            <StyledTableCell
              style={cardPack.packUserId === profileId ? { width: '10' } : { width: '20%' }}
              align="center"
            >
              Last updated
            </StyledTableCell>
            <StyledTableCell
              style={cardPack.packUserId === profileId ? { width: '15%' } : { width: '20%' }}
              align="center"
            >
              Grade
            </StyledTableCell>
            {cardPack.packUserId === profileId && (
              <StyledTableCell style={{ width: '15%' }} align="center"></StyledTableCell>
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {cardPack.cards.map(card => (
            <StyledTableRow key={card._id}>
              <StyledTableCell style={{ width: '30%' }} align={'center'}>
                {card.question}
              </StyledTableCell>
              <StyledTableCell style={{ width: '30%' }} align="center">
                {card.answer}
              </StyledTableCell>
              <StyledTableCell
                style={cardPack.packUserId === profileId ? { width: '10%' } : { width: '20%' }}
                align="center"
              >
                {getDate(card.updated!)}
              </StyledTableCell>
              <StyledTableCell
                style={cardPack.packUserId === profileId ? { width: '15%' } : { width: '20%' }}
                align="center"
              >
                <Grade value={card.grade} />
              </StyledTableCell>
              {cardPack.packUserId === profileId && (
                <StyledTableCell style={tableCellStyle} align="center">
                  <ChangeCardModal
                    editCardHandler={editButtonHandler}
                    answer={card.answer}
                    question={card.question}
                    cardId={card._id}
                  />
                  <DeleteCardModal
                    deleteButtonHandler={deleteButtonHandler}
                    question={card.question}
                    cardId={card._id}
                  />
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
