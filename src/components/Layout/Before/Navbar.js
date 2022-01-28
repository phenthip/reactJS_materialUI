import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Logo from './Logo';

function Navbar(props) {
    return (
        <AppBar
        elevation={0}
        {...props}
      >
        <Toolbar sx={{ height: 64 }}>
          <RouterLink to="/">
            <Logo/>
          </RouterLink>
        </Toolbar>
      </AppBar>
    )
}

Navbar.propTypes = {

}

export default Navbar

