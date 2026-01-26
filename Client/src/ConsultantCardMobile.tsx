import { Avatar, Box, Button, Divider, } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { Consultant } from './app/models/Consultant';
import { motion } from 'motion/react';





type Props = {
  consultant: Consultant;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}



export default function ConsultantCardMobile({ consultant, onSwipeLeft, onSwipeRight }: Props) {
  // Use a Box instead of Card for more flexibility in centering
  return (
    <><motion.div drag="x" // 2. Enable horizontal dragging
      dragConstraints={{ left: 0, right: 0 }} // Snap back to center
      onDragEnd={(_, info) => {
        // 3. Trigger swipe logic based on distance/velocity
        if (info.offset.x < -100) onSwipeLeft?.();
        if (info.offset.x > 100) onSwipeRight?.()
      }}
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          bgcolor: '#494D5F',
          width: '100%',
          maxWidth: 400, // Reduced from 500 to fit mobile screens better
          height: 500, // Adjusted height to fit mobile viewports
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
            mb: 2,
            pointerEvents: 'none'
          }} />

        {/* 2. Name and Title Under It */}
        <Box sx={{ width: '100%', mb: 2, pointerEvents: 'none' }}>
          <Typography variant="h5" color='white' align='center' fontWeight="bold">
            {consultant.nume + " " + consultant.prenume}
          </Typography>
          <Typography variant="subtitle2" color='rgba(255,255,255,0.7)' align='center' sx={{ mb: 1 }}>
            Consultant Financiar
          </Typography>
          <Divider sx={{ bgcolor: "#f8a100", width: '60%', mx: 'auto' }} />
        </Box>

        {/* 3. Description - THE FIX IS HERE */}
        <Box sx={{ flexGrow: 1, width: '100%', overflow: 'hidden', mb: 2 }}>
          <Typography
            variant="body2"
            // STOP PROPAGATION: This prevents dragging when scrolling text
            onPointerDown={(e) => e.stopPropagation()}
            sx={{
              px: 2,
              color: "#ffff",
              height: '280px',
              overflowY: 'auto',
              textAlign: 'center',
              touchAction: 'pan-y', // Allow browser to scroll vertically
              '&::-webkit-scrollbar': { width: '4px' },
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
              bgcolor: "#003a6c",
              color: "#ffff",
              px: 4,
              py: 1.5,
              borderRadius: 5,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Programeaza o Sedinta
          </Button>
        </Box>
      </Box></motion.div></>
  );
}