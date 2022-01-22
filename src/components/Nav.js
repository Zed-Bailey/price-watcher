import React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Nav() {
  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Price Watcher
              </Typography>
              <Stack spacing={2} direction="row">
                <Link to="login"><Button variant="contained" color="inherit">Login</Button></Link>
                <Link to="signup"><Button variant="outlined" color="inherit">Sign-up</Button></Link>
              </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  )
}
export default Nav;