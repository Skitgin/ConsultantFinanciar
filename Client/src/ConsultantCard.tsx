import { Avatar, Box, Button, CardActions, CardHeader, Divider, } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Consultant } from './app/models/Consultant';
import SocilaStack from './HomePage/SocilaStack';





type Props = {
  consultant: Consultant;
}



export default function ConsultantCard({ consultant }: Props) {

  return (
    <Card sx={{ bgcolor: '#494D5F', maxWidth: "auto", width: 500, height: 670, borderRadius: 4, mt: 0, boxShadow: 4, justifyContent: "space-between", alignContent: "start", flexDirection: "column" }}>

      <CardHeader sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignContent: "start", height: 120 }}
        avatar={
          <><Avatar src={consultant.imageUrl} alt={consultant.nume} sx={{ border: '3px solid #f8a100', height: 120, width: 120, ml: 3, display: 'flex', justifyContent: 'center', alignContent: 'center', boxShadow: 3 }} aria-label="recipe">

          </Avatar>

            <Box sx={{ display: "flex", flexDirection: "column", px: 4, mt: 2 }}>
              <Typography fontFamily='"Gill Sans", "Gill Sans MT", Calibri, sans-serif' variant="h5" color='White' align='center' sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                {consultant.nume + " " + consultant.prenume}
              </Typography>
              <Typography fontFamily='"Gill Sans", "Gill Sans MT", Calibri, sans-serif' variant="body1" color='White' align='center' sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                Consultant Financiar
              </Typography>
              <Divider sx={{ bgcolor: "#f8a100" }}></Divider>
              <SocilaStack consultant={consultant} />

            </Box>


          </>

        } />
      <CardContent sx={{ height: "100%", maxHeight: 420 }}>
        <Box sx={{ borderRadius: 3, }}>  <Typography
          fontFamily='"Palatino Linotype", "Book Antiqua", Palatino, serif'
          variant="body1"
          sx={{
            px: 4, mt: 1, color: "#ffff",
            // 1. Set the visual limit (e.g., 4 lines)
            lineHeight: 1.5, // Standard line height
            maxHeight: '23em', // Calculation: 1.5 (lineHeight) * 4 (maxRows) = 6em

            // 2. Make it scrollable
            overflowY: 'auto', overflowX: 'hidden',
            wordBreak: 'break-word',  // Break long words
            whiteSpace: 'pre-wrap',


            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '10px',
            },

            // Ensure it stays a block element to handle overflow
            display: 'block',
            paddingRight: 1, // Space for scrollbar
          }}
        >
          {consultant.descriere}


        </Typography></Box>


      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end", alignContent: "end", px: 3 }}>
        <Button target="_blank" rel="noopener noreferrer" href={consultant.link} size="large" variant="contained" sx={{ color: "#ffff", p: 2, borderRadius: 5, }}>Programează o Ședință</Button>
      </CardActions>
    </Card>
  );
}