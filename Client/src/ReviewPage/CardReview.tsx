import { Box, Card, CardActions, CardContent, CardMedia, Divider, Rating, Typography } from "@mui/material";
import type { Review } from "../app/models/Review";
type Props = {
  review: Review;
}

export default function ProductCard({ review }: Props) {


  return (
    <Card
      elevation={3}
      sx={{
        userSelect: "none",
        bgcolor: " #ffff",
        width: 500,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

      }}
    >

      <CardMedia
        sx={{ bgcolor: "#8458B3" }}
        //image={review.pictureUrl}
        title={review.nume + " " + review.prenume}
      >  <Typography
        align="center"

        color="#ffff"
        sx={{ mt: 3, display: "flex", justifyContent: "center", alignContent: "center" }}
        variant="h5">
          {review.nume + " " + review.prenume}
        </Typography>
        <Divider sx={{ width: '100%', mt: 2 }} /></CardMedia>
      <CardContent>
        <Box sx={{ bgcolor: "#ffff", height: "100%", borderRadius: 3 }}>  <Typography
          variant="body1"
          sx={{
            p: 2, color: "#494D5F",
            // 1. Set the visual limit (e.g., 4 lines)
            lineHeight: 1.5, // Standard line height
            maxHeight: '6em', // Calculation: 1.5 (lineHeight) * 4 (maxRows) = 6em

            // 2. Make it scrollable
            overflowY: 'auto', overflowX: 'hidden',
            wordBreak: 'break-word',  // Break long words
            whiteSpace: 'pre-wrap',

            // 3. Optional: Customize scrollbar for 2026 look
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


          {review.descriere}
        </Typography></Box>


      </CardContent>
      <Divider sx={{ width: '100%', mt: 2 }} />
      <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Typography
          gutterBottom
          sx={{ px: 2, color: "#494D5F" }}
          variant="subtitle2">
          {"Consultant Financiar: " + review.consultant}
        </Typography>
        <Box >
          <Rating
            sx={{ px: 2, color: "#ffb766" }}
            name="Scor"
            value={review.scor}
            readOnly


          /></Box>

      </CardActions>

    </Card>

  )
}