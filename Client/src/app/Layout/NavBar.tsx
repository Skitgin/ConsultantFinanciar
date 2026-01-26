import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const midLinks = [
  { title: 'acasă', path: '/' },
  { title: 'recenzii', path: '/recenzii' },
  { title: 'știri', path: '/stiri' },
  { title: 'calculator', path: '/calculator' },
];

const navStyles = {
  color: '#ffffff',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': { color: '#FFBf65' },
  '&.active': { color: '#f8a100' },
};

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250, height: "100%", bgcolor: "#494D5F" }}>
      <List >
        {midLinks.map(({ title, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton component={NavLink} to={path} sx={{ textAlign: 'center', bgcolor: "#003a6c", borderRadius: 3, mt: 1, ml: 1, mr: 1, }}>
              <ListItemText sx={{ color: "#ffff" }} primary={title.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#003a6c" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>

          {/* 1. LEFT SECTION (Logo) */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <Button
              sx={{ borderRadius: 50 }}
              component={Link}
              to="/"
            >
              <img src={'/LogoWhite.webp'} style={{ width: 65, height: 65 }} alt="Logo" />
            </Button>
          </Box>

          {/* 2. CENTER SECTION (Desktop Links) */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1,
            justifyContent: 'center'
          }}>
            <List sx={{ display: 'flex', whiteSpace: 'nowrap' }}>
              {midLinks.map(({ title, path }) => (
                <ListItem disablePadding key={path} sx={{ width: 'auto' }}>
                  <ListItemButton component={NavLink} to={path} sx={navStyles}>
                    {title.toUpperCase()}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* 3. RIGHT SECTION (Mobile Icon or Placeholder) */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end" // Changed to 'end' for better right alignment
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            {/* Pro Tip: If you have no buttons on the right for desktop, 
         this empty Box still needs 'flex: 1' to keep the links centered.
      */}
          </Box>

        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER COMPONENT */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
