import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const midLinks = [
  { title: 'acasă', path: '/' },
  { title: 'recenzii', path: '/recenzii' },
  { title: 'știri', path: '/stiri' },
];

const navStyles = {
  color: '#ffffff',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': { color: '#00FFE1' },
  '&.active': { color: '#00FFE1' },
};

export default function NavBar() {
   const [mobileOpen, setMobileOpen] = useState(false);
   
    const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


   const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 , height:"100%", bgcolor: "#494D5F" }}>
      <List >
        {midLinks.map(({ title, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton component={NavLink} to={path} sx={{ textAlign: 'center', bgcolor:"#8458B3",borderRadius:3 , mt:1,ml:1 , mr:1, }}>
              <ListItemText sx={{color:"#ffff"}}  primary={title.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


   return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#8458B3" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          
          {/* Logo Section */}
          <Button
            sx={{ borderRadius: 50, display: "flex", flex: 1, justifyContent: "flex-start" }}
            component={Link}
            to="/"
            startIcon={<img src={'/LogoWhite.webp'} style={{ width: 65, height: 65 }} alt="Logo" />}
          />

          {/* DESKTOP LINKS: Hidden on mobile (xs), shown on small/medium (sm) and up */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, justifyContent: 'center' }}>
            <List sx={{ display: 'flex' }}>
              {midLinks.map(({ title, path }) => (
                <ListItem disablePadding key={path}>
                  <ListItemButton component={NavLink} to={path} sx={navStyles}>
                    {title.toUpperCase()}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* MOBILE MENU ICON: Shown on mobile (xs), hidden on large screens (md) */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
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
