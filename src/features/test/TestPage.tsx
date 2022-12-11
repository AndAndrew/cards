import { useState } from 'react'

import { Button } from '../../common/components/button/Button'
import { Checkbox } from '../../common/components/checkbox/Checkbox'
import { Input } from '../../common/components/input/Input'

export const TestPage = () => {
  const [inputTitle, setInputTitle] = useState('')
  const [checked, setChecked] = useState(false)
  const onCheckboxClick = () => {
    setChecked(!checked)
  }
  const onInputTitleChanged = (title: string) => {
    setInputTitle(title)
  }
  const onButtonClick = () => {}

  return (
    <div>
      <span>
        <Input title={inputTitle} callBack={onInputTitleChanged} />
      </span>
      <span>
        <Checkbox checked={checked} callBack={onCheckboxClick} />
      </span>
      <Button title={'button'} onClick={onButtonClick} />
    </div>
  )
}
