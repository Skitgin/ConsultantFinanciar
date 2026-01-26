import { Box, Divider, Grid, LinearProgress, Typography, useMediaQuery, useTheme } from '@mui/material'
import { fetchConsultantList } from '../apiRequestFunctions/apiRequests';
import { RoasterPartener } from '../RoasterPartener';
import React from 'react';
const parteneri: string[] = ["/Admiral.webp", "/axi.webp", "/BCR.webp", "/oceancredit.webp", "/provident.webp", "/viaconto.webp", "/viva.webp", "/creditagricole.webp"]
const Consultanti = React.lazy(() => import('./ConsultantDisplay'));
const MobileConsultanti = React.lazy(() => import('./MobileConsultantDisplay'));
import { useQuery } from '@tanstack/react-query';



export default function HomePage() {

  const theme = useTheme();
  // Detects if the screen is smaller than 'md' (900px), covering mobile and tablet
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { data: consultants = [], isLoading } = useQuery({
    queryFn: () => fetchConsultantList(),
    queryKey: ["consultants"],

  });

  return (
    <Grid
      container
      maxWidth='xl'
      sx={{
        mx: 'auto',
        justifyContent: "center",
        alignContent: "center",
        bgcolor: "#e5eaf5",
        userSelect: "none",  
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowX: 'hidden'
      }}
    >
     
      <Box sx={{
        width: '100%',
     
        minHeight: { xs: '500px', md: '720px' },
        display: 'flex',
        alignItems: 'center'
      }}>
        {isLoading ? (
          <Box sx={{ width: '100%', height: '500px' }}><LinearProgress /></Box>
        ) : (
          isSmallScreen ? (<MobileConsultanti consultants={consultants} />) : (<Consultanti consultants={consultants} />)

        )}
      </Box>

  
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        my: 2 
      }}>
        <Typography variant="h6">Parteneri</Typography>
      </Box>

     
      <Box sx={{
        width: '100%',
        minHeight: '100px',
        pb: 4
      }}>
        <Divider sx={{ mb: 2 }} />
        <RoasterPartener parteneri={parteneri} />
      </Box>
    </Grid>
  )
}
