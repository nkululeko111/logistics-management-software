import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Toolbar,
  Box,
  Typography,
  Button
} from '@mui/material';
import {
  Home as HomeIcon,
  ShoppingCart as ProductsIcon,
  Add as AddIcon,
  Person as ProfileIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  AppRegistration as RegisterIcon
} from '@mui/icons-material';

export function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/products">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          
          <ListItem button component={Link} to="/products">
            <ListItemIcon>
              <ProductsIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          
          <ListItem button component={Link} to="/products/add">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItem>
        </List>
        
        <Divider />
        
        <List>
          {user ? (
            <>
              <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/login">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              
              <ListItem button component={Link} to="/register">
                <ListItemIcon>
                  <RegisterIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
        
        {user && (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              Logged in as: {user.email}
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}