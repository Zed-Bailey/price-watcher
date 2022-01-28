import React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Nav(props){

  // const [isLoggedIn, changeLoginStatus] = props;
  const isLoggedIn = false;

  const logoutUser = () =>  {
    localStorage.removeItem("isAuthenticated");
    // delete cookie by setting expiry date in the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
    // update login state
    // changeLoginStatus(false);
  }


  // based on logged in status render appropriate buttons
  const navButtons = () => {
    if(!isLoggedIn) {
      return (
        <Stack spacing={2} direction="row">
          <Link to="login"><Button variant="contained" color="inherit">Login</Button></Link>
          <Link to="signup"><Button variant="outlined" color="inherit">Sign-up</Button></Link>
        </Stack>
      );
    }

    return (
      <Link to="/"><Button variant="outlined" color="primary" onClick={logoutUser}>Logout</Button></Link>
    )
  }

  return (
      <nav>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='sticky'>
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} align='left'>
                  Price Watcher
                </Typography>
                {navButtons()}
            </Toolbar>
          </AppBar>
        </Box>
      </nav>
    );


}
export default Nav;