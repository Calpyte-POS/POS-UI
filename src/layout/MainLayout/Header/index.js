import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100%)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export default function Header({ open, handleDrawerToggle }) {
    return (
        <AppBar
            position="fixed"
            open={open}
            style={{ background: 'white', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', color: 'black' }}
        >
            <Toolbar style={{ marginLeft: open ? drawerWidth + 'px' : '0' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Stack direction="row" spacing={2}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                    />
                </Stack>
                {/* <Typography variant="h6" noWrap component="div">
            Mui Basic Layout
          </Typography> */}
            </Toolbar>
        </AppBar>
    );
}
