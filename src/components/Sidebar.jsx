import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const drawerWidth = 240;

const Sidebar = ({ title, links, profileImage, profileName }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (mobileOpen) {
      setMobileOpen(false); // Cerrar el menú lateral en dispositivos móviles
    }
  };

  const logo = (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px', marginTop: '5px' }}>
      <Image
        src="/logo_unerg.png"
        width={120}
        height={50}
        alt="Logo de la UNERG"
        priority
      />
      <Typography variant="h6" sx={{ marginLeft: '10px', color: '#05004E', fontWeight: 'bold' }}>UNERG</Typography>
    </Box>
  );

  const drawer = (
    <div>
      <Toolbar style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Box display="flex" alignItems="center">
          {logo}
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {links.map((link, index) => (
          <ListItemButton
            key={index}
            component="a"
            href={link.route}
            selected={selectedIndex === index} 
            onClick={() => handleListItemClick(index)}
            sx={{ color: selectedIndex === index ? '#4079ED' : '#737791', textDecoration: 'none' }} // Cambiar color seleccionado a azul
          >
            <ListItemIcon sx={{ color: selectedIndex === index ? '#4079ED' : '#737791' }}> {/* Cambiar color de iconos a blanco */}
              {link.icon}
            </ListItemIcon>
            <ListItemText
              primary={link.text}
              sx={{
                fontSize: '14px !important',
                color: selectedIndex === index ? '#4079ED' : '#737791',
                '& span': {
                  fontSize: '14px !important',
                },
              }}
              style={{ fontSize: '14px', color: selectedIndex === index ? '#4079ED' : '#737791' }}
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: '#4079ED' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: '#fff', flexGrow: 1 }}>
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={profileImage}
              alt="Profile"
              width={40}
              height={40}
              style={{
                borderRadius: '50%',
              }}
            />
            <Typography variant="body1" sx={{ color: '#fff', marginLeft: '10px' }}>
              {profileName}
            </Typography>
          </Box>

        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    route: PropTypes.string.isRequired,
  })).isRequired,
  profileImage: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
};

export default Sidebar;
