import React, { Dispatch } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { StyledTableCell } from '../../../common/styles/styledTableElements'

import { PackTableBody } from './PackTableBody'

type PropsType = {
  orderDirection: 'asc' | 'desc' | undefined
  handleSortRequest: () => void
}
export const PacksTable = (props: PropsType) => {
  return (
    <TableContainer sx={{ maxHeight: 490 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ width: '200px' }}>
              Name
            </StyledTableCell>
            <StyledTableCell align="center">Cards</StyledTableCell>
            <StyledTableCell onClick={props.handleSortRequest} align="center">
              <TableSortLabel direction={props.orderDirection} active={true}>
                Last Updated
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">Created by</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <PackTableBody />
      </Table>
    </TableContainer>
  )
}
