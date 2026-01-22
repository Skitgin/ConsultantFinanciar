
import { Box,Typography, } from "@mui/material";
import type { Review } from "../app/models/Review";
import { ReviewRoaster } from "./ReviewRoaster";
import ReviewList from "./ReviewList";

type Props = {
  reviews: Review[];
}

export default function Catalog({ reviews }: Props) {




 return (
  <Box 
    sx={{ 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', // Centers children horizontally
      gap: 4, 
      py: 5 
    }}
  >
    <Typography variant="h3" color="#494D5F" fontWeight="light" align="center" sx={{fontSize: { xs: '2rem', md: '3rem' }}}>
      Vezi ce spune lumea despe noi
    </Typography>

    {/* Ensure the list wrapper can grow/shrink */}
    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
      <ReviewList reviews={reviews} />
    </Box>

    <ReviewRoaster reviews={reviews} />
  </Box>
);
}