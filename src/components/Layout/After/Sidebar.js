import { useEffect,useState  } from 'react';
import { Link as RouterLink, useLocation,useNavigate  } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon,
  Home as HomeIcon
} from 'react-feather';
import NavItem from './NavItem';

function Sidebar({ onMobileClose, openMobile }) {
    const navigate = useNavigate();  
    const handle = ()=>{

    }
    const handleLogout=()=>{
      localStorage.clear();
      navigate('/login', { replace: true }); 
    }  
    var items1 = [
    {
      href: '/home',
      icon: HomeIcon,
      title: 'Home',
      onclick: handle
    },
    {
      href: '/settings',
      icon: UserPlusIcon,
      title: 'Settings',
      onclick: handle
    },
    {
      href: '/login',
      icon: LogOutIcon,
      title: 'Log out',
      onclick:handleLogout
    }
    ];
  
    const location = useLocation();
  
    useEffect(() => {
      if (openMobile && onMobileClose) {
        onMobileClose();
      }
    }, [location.pathname]);
  
    const content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Divider />
        <Box sx={{ p: 2 }}>
          <List>
            {items1.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
                onClick={item.onclick}
              />
            ))}
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
    );
    
    return (
        <>
        <Hidden lgUp>
          <Drawer
            anchor="left"
            onClose={onMobileClose}
            open={openMobile}
            variant="temporary"
            PaperProps={{
              sx: {
                width: 220
              }
            }}
          >
            {content}
          </Drawer>
        </Hidden>
        <Hidden lgDown>
          <Drawer
            anchor="left"
            open
            variant="persistent"
            PaperProps={{
              sx: {
                width: 220,
                top: 64,
                height: 'calc(100% - 64px)'
              }
            }}
          >
            {content}
          </Drawer>
        </Hidden>
      </>
    )
}

Sidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
}

Sidebar.defaultProps = {
    onMobileClose: () => {},
    openMobile: false
};

export default Sidebar

