import { ChangeEvent, useCallback } from 'react'
import { Select, MenuItem, InputBase } from '@mui/material'
import { inputBaseClasses } from '@mui/material/InputBase'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from 'components/Divider'

export default function SelectInput({
  options,
  selected,
  value,
  onChangeSelect,
  onChangeInput,
  placeholder
}: {
  options: string[]
  selected?: string
  value: string
  placeholder: string
  onChangeSelect?: (e: any) => void
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  const handleSelectChange = useCallback(
    e => {
      const value = options.find(option => option === e.target.value) ?? null
      onChangeSelect && onChangeSelect(value)
    },
    [options, onChangeSelect]
  )

  return (
    <InputBase
      onChange={onChangeInput}
      fullWidth
      sx={{
        [`&.${inputBaseClasses.root}`]: {
          fontSize: 16,
          borderRadius: 16,
          fontWeight: 400,
          color: theme => theme.palette.text.primary,
          backgroundColor: theme => theme.palette.background.default
        },
        '& .MuiInputBase-input': {
          paddingLeft: 20
        }
      }}
      value={value}
      placeholder={placeholder}
      startAdornment={
        <>
          <Select
            value={selected}
            sx={{
              borderRadius: 16,
              border: 'none',
              width: 160,
              '& .MuiSelect-select': {
                padding: '12px 20px',
                fontSize: 16
              },
              '& .MuiSelect-icon': {
                color: 'rgba(0, 0, 0, 0.4)',
                right: '10px'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
              },
              '&.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
              }
            }}
            IconComponent={ExpandMoreIcon}
            onChange={handleSelectChange}
          >
            {options.map((option, idx) => (
              <MenuItem key={idx} value={option} selected={selected === option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Divider orientation="vertical" height={36} />
        </>
      }
    />
  )
}