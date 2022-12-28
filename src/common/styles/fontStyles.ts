import React from 'react'

export const titleStyle = {
  fontFamily: 'Montserrat',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '17px',
}
export const labelStyle = {
  fontFamily: 'Montserrat',
  fontWeight: '600',
  fontSize: '26px',
  color: 'black',
}

export const buttonFontStyle: React.CSSProperties | undefined = {
  fontFamily: 'Montserrat',
  fontWeight: '500',
  borderRadius: '20px',
  fontSize: '16px',
  textTransform: 'capitalize',
}

export const textFieldStyle = {
  '& .MuiInputLabel-root': { fontFamily: 'Montserrat', fontWeight: '400' },
  '& .MuiInputLabel-root.Mui-focused': {
    fontFamily: 'Montserrat',
    fontWeight: '400',
  },
  '& .MuiInputBase-root': {
    '& input': { fontFamily: 'Montserrat', fontWeight: '500' },
  },
  width: '100%',
}
