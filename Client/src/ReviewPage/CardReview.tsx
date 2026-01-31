import { Box, Divider, Rating, Typography } from "@mui/material";
import type { Review } from "../app/models/Review";
type Props = {
  review: Review;
}

export default function ProductCard({ review }: Props) {



return (
  <Box
   sx={{
    boxShadow: 3,
    bgcolor: "#ffffff",
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    userSelect: "none",

    // --- RESPONSIVE LOGIC ---
    height: 280,            // Fixed height ensures they all look identical
    width: "100%",          // Allows it to shrink with the parent
    maxWidth: {
      xs: "100%",           // Full width on mobile
      sm: "350px",          // Fixed width on larger screens
    },
    flex: "1 1 300px",      // Grow and shrink uniformly
    }}
  >
    {/*#003a6c */}
    <Box sx={{ bgcolor: "#1976d2", pb: 1 ,boxShadow:2, }}>
      <Typography
       fontFamily= '"Gill Sans", "Gill Sans MT", Calibri, sans-serif'
        align="center"
        color="#ffffff"
        sx={{ 
         
          mt: 3, 
          display: "flex", 
          justifyContent: "center", 
          alignContent: "center" 
        }}
        variant="h5"
      >
        {review.nume + " " + review.prenume}
      </Typography>
    </Box>

    {/* Content Section (Replaces CardContent) */}
    <Box sx={{ flexGrow: 1, px: 2, py: 1 }}>
      <Box sx={{ bgcolor: "#ffffff", height: "100%", borderRadius: 3 }}>
        <Typography
          fontFamily ='"Palatino Linotype", "Book Antiqua", Palatino, serif'
          variant="body1"
          sx={{
            color:"#000",
         
            p: 1, 
            lineHeight: 1.5,
            maxHeight: '140px', // Adjusted to fit the 250px total height
            overflowY: 'auto', 
            overflowX: 'hidden',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            display: 'block',
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '10px',
            },
          }}
        >
          {review.descriere}
        </Typography>
      </Box>
    </Box>

    {/* Footer Section (Replaces CardActions) */}
    <Box sx={{flexShrink:1}}>
      <Divider sx={{ width: '100%', boxShadow:2, }} />
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "row", 
          justifyContent: "space-between", 
          alignItems: "center",
          p: 1 
        }}
      >
        <Typography
          sx={{ px: 2, color: "#494D5F" }}
          variant="subtitle2"
        >
          {review.consultant}
        </Typography>
        <Rating
          sx={{ px: 2, color: "#ffb766" }}
          name="Scor"
          value={review.scor}
          readOnly
        />
      </Box>
    </Box>
  </Box>
);
}