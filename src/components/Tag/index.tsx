import { Box, Typography } from '@mui/material'
import Close from '@mui/icons-material/Close'
import TextButton from 'components/Button/TextButton'

export default function Tag({ text, onClose, onClick }: { text: string; onClose?: () => void; onClick?: () => void }) {
  return (
    <Box
      borderRadius="10px"
      color={'#11BF2D'}
      bgcolor={'rgba(17, 191, 45, 0.1)'}
      display="flex"
      alignItems="center"
      height={28}
      padding={'0px 12px'}
      gap={12}
      width="fit-content"
      sx={{
        '&:hover': {
          cursor: onClick ? 'pointer' : 'auto'
        }
      }}
      onClick={onClick}
    >
      <Typography sx={{ fontSize: 16 }}>{text}</Typography>
      {onClose && (
        <TextButton onClick={onClose} style={{ color: '#11BF2D' }}>
          <Close />
        </TextButton>
      )}
    </Box>
  )
}
