import React, { ChangeEvent, memo, useEffect, useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { AppActionsType } from '../../../app/store'
import { useAppDispatch, useDebounce } from '../../hooks/react-redux-hooks'

import s from './Search.module.css'

type SearchPropsType = {
  action: (value: string) => AppActionsType
  search: string
}

const timeWait = 700

export const Search = memo(({ action, search }: SearchPropsType) => {
  const [searchValue, setSearchValue] = useState<string>(search)
  const dispatch = useAppDispatch()

  const debounceText = useDebounce<string>(searchValue, timeWait)

  const onChangeTextSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    dispatch(action(debounceText))
  }, [action, debounceText, dispatch])

  return (
    <div className={s.search}>
      <Typography component="p">Search</Typography>
      <TextField
        fullWidth
        placeholder="Provide your text"
        type="search"
        color="primary"
        variant="outlined"
        value={searchValue}
        className={s.searchInput}
        onChange={onChangeTextSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
})
