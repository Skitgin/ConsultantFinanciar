import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import Calculator from './Calculator'

export default function CalculatorPage() {
  return (
    <Grid
      size=
      {12}
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
        userSelect: "none",
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowX: 'hidden',
        height: "100%"
      }}
    >  <Box sx={{ display: "flex", alignContent: "center", justifyContent: 'center', flexDirection:"column", gap: 3 ,boxShadow:4 ,px:2,mt:2 ,borderRadius:2}}>
        <Box sx={{ p: 2}}>
          <Typography  fontFamily= '"Gill Sans", "Gill Sans MT", Calibri, sans-serif' variant="h4" align="center" sx={{letterSpacing:-0.4}}>Calculator Investiții</Typography>
          <Typography  fontFamily= '"Gill Sans", "Gill Sans MT", Calibri, sans-serif' variant="h4" align="center">Dobândă Compusă</Typography>
          <Typography   fontFamily ='"Palatino Linotype", "Book Antiqua", Palatino, serif' variant="subtitle1" align="center" sx={{mt:2}}>Simulează creșterea investiției pe baza dobânzii compuse.</Typography>
        </Box>
         <Divider variant='middle'/>
        <Box sx={{ flex: 1 }}>
          <Calculator />
        </Box>
      </Box>








    </Grid>
  )
}
