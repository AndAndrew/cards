import React, { useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { useAppDispatch } from '../../../common/hooks/react-redux-hooks'
import { StyledTableCell } from '../../../common/styles/styledTableElements'
import { setPacksDataTC } from '../packsReducer'

import { PackTableBody } from './PackTableBody'

export const PacksTable = () => {
  const dispatch = useAppDispatch()
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc' | undefined>('asc')
  const [orderNameDirection, setOrderNameDirection] = useState<'asc' | 'desc' | undefined>('asc')
  const [orderCreatorDirection, setOrderCreatorDirection] = useState<'asc' | 'desc' | undefined>(
    'asc'
  )
  const sortArray = (orderBy: 'asc' | 'desc' | undefined, sortParams: string) => {
    switch (orderBy) {
      case 'asc':
      default:
        return dispatch(setPacksDataTC({ sortPacks: '1' + sortParams }))
      case 'desc':
        return dispatch(setPacksDataTC({ sortPacks: '0' + sortParams }))
    }
  }

  const handleSortRequest = (sortParams: string) => {
    switch (sortParams) {
      case 'name':
        setOrderNameDirection(orderNameDirection === 'asc' ? 'desc' : 'asc')

        return sortArray(orderNameDirection, sortParams)
      case 'updated':
        sortArray(orderDirection, sortParams)

        return setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
      case 'user_name':
        setOrderCreatorDirection(orderCreatorDirection === 'asc' ? 'desc' : 'asc')

        return sortArray(orderCreatorDirection, sortParams)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell
              onClick={() => handleSortRequest('name')}
              style={{ width: '25%' }}
              align={'center'}
            >
              <TableSortLabel direction={orderNameDirection} active={true}>
                Name
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell style={{ width: '25%' }} align="center">
              Cards
            </StyledTableCell>
            <StyledTableCell
              onClick={() => handleSortRequest('updated')}
              style={{ width: '10%' }}
              align="center"
            >
              <TableSortLabel direction={orderDirection} active={true}>
                Last Updated
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell
              onClick={() => handleSortRequest('user_name')}
              style={{ width: '10%' }}
              align="center"
            >
              <TableSortLabel direction={orderCreatorDirection} active={true}>
                Created by
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell style={{ width: '10%' }} align="center">
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <PackTableBody />
      </Table>
    </TableContainer>
  )
}
