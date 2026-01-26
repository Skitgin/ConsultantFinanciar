import { Box, Grid } from '@mui/material'
import React from 'react'
import Calculator from './Calculator'

export default function CalculatorPage() {
  return (
      <Grid
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
        userSelect: "none",  
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowX: 'hidden',
        height:"100%"
      }}
    >

     <Box>
      <Calculator/>
      </Box>


     



    </Grid>
  )
}
