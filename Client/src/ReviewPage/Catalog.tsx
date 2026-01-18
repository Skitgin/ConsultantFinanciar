
import { Box, Grid, Typography, } from "@mui/material";
import type { Review } from "../app/models/Review";
import { ReviewRoaster } from "./ReviewRoaster";
import ReviewList from "./ReviewList";

type Props = {
  reviews: Review[];
}

export default function Catalog({ reviews }: Props) {




  return (
    <>

      <Grid size={{ xs: 10 }} container spacing={2} sx={{ px: 0, marginTop: 0, marginBottom: 0, display: 'flex', justifyContent: "center", alignContent: "center", maxWidth: 'auto', flexDirection: "column", paddingLeft: 0, paddingRight: 0 }}>

        <Typography variant="h3" color="#494D5F" fontWeight={"light"} align="center">Vezi ce spune lumea despe noi </Typography>

        <ReviewList reviews={reviews} />


        <Box><ReviewRoaster reviews={reviews} /></Box>

      </Grid>  </>

  )
}