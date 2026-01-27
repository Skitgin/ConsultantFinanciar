import { Box, Divider, Grid, LinearProgress } from "@mui/material"
import FormReview from "./FormReview"
import Catalog from "./Catalog"
import { fetchReviewList } from "../apiRequestFunctions/apiRequests";
import { useQuery, useQueryClient } from "@tanstack/react-query";


function ReviewPage() {
  const queryClient = useQueryClient();
  const {data:reviews = [], isLoading}=useQuery({
    queryFn:()=>fetchReviewList(),
    queryKey:["reviews"]
  })
 
  async function refreshList() {
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
  }

  return (
    <Grid sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", bgcolor: "#F7F7FF" }} >
      <Box>
        <FormReview onReviewAdded={refreshList} />
      </Box>
      <Divider variant="middle"sx={{boxShadow:2}} ></Divider>
      <Box sx={{ p: 0, mt: 0, mb:3}} >
        {isLoading?(<LinearProgress />):(<Catalog reviews={reviews} />)}
        
      </Box>


    </Grid>


  )
}
export default ReviewPage
