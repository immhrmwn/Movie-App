import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useNavigate} from 'react-router-dom';

export const NavbarComponent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="inherit" style={{background: '#222731'}}>
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          color="secondary"
          style={{cursor: 'pointer', fontWeight: 'bold'}}
          onClick={() => navigate('/')}>
          Movie App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
