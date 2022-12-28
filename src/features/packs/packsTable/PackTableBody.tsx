import React from 'react'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import { useNavigate } from 'react-router-dom'

import { AddPackType } from '../../../api/cards-api'
import { ChangeModal } from '../../../common/components/modals/changeModal/ChangeModal'
import { DeleteModal } from '../../../common/components/modals/deleteModal/DeleteModal'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { StyledTableCell, StyledTableRow } from '../../../common/styles/styledTableElements'
import style from '../packsPage/Packs.module.css'
import { deletePack, editPack } from '../packsReducer'

export const PackTableBody = () => {
  const dispatch = useAppDispatch()
  const profileName = useAppSelector(state => state.profile.name)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const navigate = useNavigate()

  const isMyPack = (name: string) => {
    return name === profileName
  }

  const onNameButtonClick = (packId: string) => {
    navigate(`/cardsPage/${packId}`)
  }

  const learnFromPack = (packId: string) => {
    console.log('learn')
  }
  const editButtonHandler = (packId: string, data: AddPackType) => {
    dispatch(editPack<AddPackType>(packId, data))
  }
  const deleteButtonHandler = (packId: string) => {
    dispatch(deletePack(packId))
  }

  return (
    <TableBody>
      {packs.map(pack => (
        <StyledTableRow key={pack._id}>
          <StyledTableCell align="center">
            <button className={style.tableNameButton} onClick={() => onNameButtonClick(pack._id)}>
              {pack.name}
            </button>
          </StyledTableCell>
          <StyledTableCell align="center">{pack.cardsCount}</StyledTableCell>
          <StyledTableCell align="center">{pack.updated}</StyledTableCell>
          <StyledTableCell align="center">{pack.user_name}</StyledTableCell>
          <StyledTableCell align={'center'}>
            <div className={style.tableIconButtonsBlock}>
              <IconButton onClick={() => learnFromPack(pack._id)}>
                <SchoolOutlinedIcon />
              </IconButton>
              {isMyPack(pack.user_name) && (
                <ChangeModal
                  editButtonHandler={editButtonHandler}
                  name={pack.name}
                  packId={pack._id}
                  private={pack.private}
                />
              )}
              {isMyPack(pack.user_name) && (
                <DeleteModal
                  name={pack.name}
                  packId={pack._id}
                  deleteButtonHandler={deleteButtonHandler}
                />
              )}
            </div>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  )
}
