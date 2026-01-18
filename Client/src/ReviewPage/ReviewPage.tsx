import { Box, Divider, Grid } from "@mui/material"
import FormReview from "./FormReview"
import Catalog from "./Catalog"
import { useEffect, useState } from "react";
import type { Review } from "../app/models/Review";
import { fetchReviewList } from "../apiRequestFunctions/apiRequests";


function ReviewPage() {

  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetchReviewList().then(reviews => setReviews(reviews));
  }, [])

  async function refreshList() {
    const products = await fetchReviewList();
    setReviews(products);
    return products;
  }

  return (
    <Grid sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", bgcolor: "#e5eaf5" }} >
      <Box>
        <FormReview onReviewAdded={refreshList} />
      </Box>
      <Divider sx={{ mt: 3 }}></Divider>
      <Box sx={{ p: 0, mt: 0, mb: 3 }} >
        <Catalog reviews={reviews} />
      </Box>


    </Grid>


  )
}
export default ReviewPage
