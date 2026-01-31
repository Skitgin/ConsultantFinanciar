import { Box } from "@mui/material";
import CardReview from "./CardReview";
import type { Review } from "../app/models/Review";
type Props = {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
 return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: 3, 
        flexWrap:"wrap",
        justifyContent: "center", 
        width: '100%',
        px: { xs: 2, md: 1 },
      }}
    >
      {reviews.map((review) => (
        <CardReview key={review.id} review={review} />
      ))}
    </Box>
  );
}
