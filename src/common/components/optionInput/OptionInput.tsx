import * as React from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const options = ['Text', 'Picture']

export default function ControllableStates() {
  const [value, setValue] = React.useState<string | null>(options[0])
  const [inputValue, setInputValue] = React.useState('')

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={params => <TextField {...params} label="Controllable" />}
      />
    </div>
  )
}
