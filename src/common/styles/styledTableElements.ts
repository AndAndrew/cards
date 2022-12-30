import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#EFEFEF',
    color: theme.palette.common.black,
    fontFamily: 'Montserrat',
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: 14,
  },
}))
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FAFAFA',
  },
}))
