
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
    <Typography  fontFamily= '"Gill Sans", "Gill Sans MT", Calibri, sans-serif' variant="h3" color="#000" fontWeight="light" align="center" sx={{fontSize: { xs: '2rem', md: '3rem' },letterSpacing:-0.4,mb:2}}>
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