import { Box } from '@mui/material'

type Prop = {
    imgUrl: string
}

export default function CardPartener({ imgUrl }: Prop) {
    return (
       <Box 
  sx={{ 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    width: "150px",      
    height: "88px",      
    padding: "10px" 
  }}
>
  <img 
    src={imgUrl} 
    fetchPriority="high" 
    loading="eager" 
    alt="partener" 
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'contain', 
      opacity: 0.8              
    }} 
  />
</Box>
    )
}
