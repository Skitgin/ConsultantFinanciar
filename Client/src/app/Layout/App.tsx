
import { Box, Container, CssBaseline,} from "@mui/material"

import { Outlet} from "react-router-dom"
import NavBar from "./NavBar"



function App() {

  return (
   
  
      <><CssBaseline />
      <NavBar  />
      <Box
        sx={{minHeight: "100vh",
          backgroundColor: "#e5eaf5",
        }}>
        <Container disableGutters maxWidth={false} sx={{ mt: 0 }}>
        <Outlet />
          
        </Container>
      </Box></>
   
  )


  
}

export default App
