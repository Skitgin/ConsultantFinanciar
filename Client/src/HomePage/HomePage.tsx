import { Box, Divider, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import type { Consultant } from '../app/models/Consultant';
import { fetchConsultantList } from '../apiRequestFunctions/apiRequests';
import { RoasterPartener } from '../RoasterPartener';
import React from 'react';
const parteneri: string[] = ["/Admiral.webp", "/axi.webp", "/BCR.webp", "/oceancredit.webp", "/provident.webp", "/viaconto.webp", "/viva.webp", "/creditagricole.webp"]
const Consultanti = React.lazy(() => import('./ConsultantDisplay'));
export default function HomePage() {
  
  const [consultants, setConsultants] = useState<Consultant[]>([]);
 const [loading, setLoading] = useState(true);
useEffect(() => {
    fetchConsultantList().then(data => {
      setConsultants(data);
      setLoading(false);
    });
  }, []);
  return (
    <Grid container spacing={1} maxWidth='xl' sx={{ mx: 'auto', justifyContent: "center", alignContent: "center", bgcolor: "#e5eaf5", userSelect: "none", flexDirection: "column" }}>
      <Box sx={{ width: '100%', minHeight: '720px', display: 'flex', alignItems: 'center' }}>
        {loading ? (
          <div style={{ width: '100%', height: '700px' }} /> 
        ) : (
      <Consultanti consultants={consultants} />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", }}> <Typography variant="h6" sx={{ display: "flex", justifyContent: "center", alignContent: "center", }}>Parteneri</Typography>

      </Box>

      <Box sx={{ minHeight: '100px' }}>
        <Divider ></Divider>

      <RoasterPartener parteneri={parteneri}></RoasterPartener>
      </Box>
    </Grid>
  )
}
