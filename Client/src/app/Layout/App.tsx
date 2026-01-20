
import { Box, Container, CssBaseline,} from "@mui/material"

import { Outlet} from "react-router-dom"
import NavBar from "./NavBar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();
function App() {

  return (
   
  
      <><CssBaseline />
      <NavBar  />
      <Box
        sx={{minHeight: "100vh",
          backgroundColor: "#e5eaf5",
        }}>

        <Container disableGutters maxWidth={false} sx={{ mt: 0 }}>
         <QueryClientProvider client= {queryClient}> <Outlet /></QueryClientProvider>
          
        </Container>
      </Box></>
   
  )


  
}

export default App
