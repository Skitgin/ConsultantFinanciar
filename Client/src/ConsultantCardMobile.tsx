import { Avatar, Box, Button, Divider, } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { Consultant } from './app/models/Consultant';





type Props = {
  consultant: Consultant;
}



export default function ConsultantCardMobile({ consultant }: Props) {
// Use a Box instead of Card for more flexibility in centering
return (
  <Box 
    sx={{ 
      bgcolor: '#494D5F', 
      width: '100%', 
      maxWidth: 400, // Reduced from 500 to fit mobile screens better
      height: 600,   // Adjusted height to fit mobile viewports
      borderRadius: 6, 
      boxShadow: 4, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', // Centers all children horizontally
      p: 1,
      userSelect: "none"
    }}
  >
    {/* 1. Avatar on Top Middle */}
    <Avatar 
      src={consultant.imageUrl} 
      alt={consultant.nume} 
      sx={{ 
        height: 100, 
        width: 100, 
        border: '3px solid #f8a100',
        mb: 2 
      }} 
    />

    {/* 2. Name and Title Under It */}
    <Box sx={{ width: '100%', mb: 2 }}>
      <Typography variant="h5" color='white' align='center' fontWeight="bold">
        {consultant.nume + " " + consultant.prenume}
      </Typography>
      <Typography variant="subtitle2" color='rgba(255,255,255,0.7)' align='center' sx={{ mb: 1 }}>
        Consultant Financiar
      </Typography>
      <Divider sx={{ bgcolor: "#f8a100", width: '60%', mx: 'auto' }} />
    </Box>

    {/* 3. Description (Scrollable) */}
    <Box sx={{ flexGrow: 1, width: '100%', overflow: 'hidden', mb: 2 }}>
      <Typography
        variant="body2"
        sx={{
          px: 2,
          color: "#ffff",
          lineHeight: 1.5,
          height: '280px', // Fixed height for description area
          overflowY: 'auto',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          textAlign: 'center',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
          },
        }}
      >
        {consultant.descriere}
      </Typography>
    </Box>

    {/* 4. Central Button */}
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 'auto' }}>
      <Button 
        target="_blank" 
        rel="noopener noreferrer" 
        href={consultant.link} 
        variant="contained" 
        sx={{ 
          bgcolor: "#8458B3", 
          color: "#ffff", 
          px: 4, 
          py: 1.5, 
          borderRadius: 5,
          textTransform: 'none',
          fontSize: '1rem',
          '&:hover': { bgcolor: '#6a4691' }
        }}
      >
        Programeaza o Sedinta
      </Button>
    </Box>
  </Box>
);
}