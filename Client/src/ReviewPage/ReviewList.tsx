import { Box } from "@mui/material";
import CardReview from "./CardReview";
import type { Review } from "../app/models/Review";
type Props = {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: "center", paddingLeft: 0, paddingRight: 0, alignContent: 'center' }}>

      {reviews.map((review: { id: number; nume: string; prenume: string; descriere: string; consultant: string; scor: number; }) => (<CardReview key={review.id} review={review} />))}

    </Box>

  )
}
