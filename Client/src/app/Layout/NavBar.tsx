import { AppBar, Box, Button, List, ListItem, ListItemButton, Toolbar } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

const midLinks = [
  { title: 'acasa', path: '/' },
  { title: 'recenzii', path: '/recenzii' },
];

const navStyles = {
  color: '#ffffff',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': { color: '#00FFE1' },
  '&.active': { color: '#00FFE1' },
};

export default function NavBar() {


  return (

    <AppBar position="static" sx={{ bgcolor: "#8458B3", height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: "row", alignContent: "center" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>




        <Button
          sx={{ borderRadius: 50, display: "flex", alignContent: "center", justifyContent: "flex-start", flex: 1 }}
          component={Link}
          to="/"
          startIcon={<img src={'/LogoWhite.webp'} style={{ width: 65, height: 65 }} />}
        />


        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: "center", flex: 1 }}>
          <List sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            {midLinks.map(({ title, path }) => (
              <ListItem disablePadding key={path}>
                <ListItemButton component={NavLink} to={path} sx={navStyles}>
                  {title.toUpperCase()}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {/* Leave empty or add Login/Icons here */}
        </Box>

      </Toolbar>
    </AppBar>

  );
}
