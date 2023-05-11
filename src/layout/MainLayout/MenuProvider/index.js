import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { menuList } from '../../../menus';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../../store/reducers/logindata';
import ListIcon from '@mui/icons-material/List';

const drawerWidth = 250;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '2px 2px 2px 30px',
    height: '10%',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between'
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    height: '8vh',
    zIndex: 3,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `100%`,
        // paddingLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
    return (
        <ListItem
            button
            component={Link}
            to={item.to}
            style={
                item.type === 'group'
                    ? {
                          borderBottom: 'solid 1px #EAECEE'
                      }
                    : {
                          backgroundColor: '#808B96',
                          borderBottom: 'none',
                          color: 'white',
                          borderLeft: 'solid 3px white',
                          borderRight: 'solid 3px white',
                          borderTop: 'solid 1px white',
                          borderRadius: '5px'
                      }
            }
        >
            {item.type === 'group' ? <ListItemIcon>{item.icon}</ListItemIcon> : <></>}
            <ListItemText
                primary={item.title}
                primaryTypographyProps={
                    item.type === 'group'
                        ? {
                              fontSize: '15x',
                              fontFamily: 'Segoe UI'
                          }
                        : {
                              fontSize: '13px'
                          }
                }
            />
        </ListItem>
    );
};

const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);
    const handleClick = (e) => {
        setOpen((prev) => {
            return !prev;
        });
    };
    return (
        <div>
            <ListItem
                button
                onClick={handleClick}
                style={
                    item.type === 'group'
                        ? {
                              borderBottom: 'solid 1px #EAECEE'
                          }
                        : {
                              backgroundColor: '#808B96',
                              color: 'white'
                          }
                }
            >
                {item.type === 'group' ? <ListItemIcon>{item.icon}</ListItemIcon> : <></>}
                <ListItemText
                    primary={item.title}
                    primaryTypographyProps={
                        item.type === 'group'
                            ? {
                                  fontSize: '15x',
                                  fontFamily: 'Segoe UI'
                              }
                            : {
                                  fontSize: '13px'
                              }
                    }
                />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <MenuItem key={key} item={child} />
                    ))}
                </List>
            </Collapse>
        </div>
    );
};

function hasChildren(item) {
    const { items: children } = item;
    if (children === undefined || children.constructor !== Array || children.length === 0) return false;
    else return true;
}

export default function MenuProvider({ handleDrawer }) {
    const [open, setOpen] = useState(true);
    const [menus, setMenus] = useState([]);
    const dispatch = useDispatch();
    const logindata = useSelector((state) => state.logindata);

    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(setData({ name: 'Kishore', email: 'KKK', token: 'asddasf', isLoggedIn: true }));
        handleDrawer();
    };

    useEffect(() => {
        setMenus(menuList);
    }, [logindata]);

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <AppBar
                    position="fixed"
                    open={open}
                    style={{ background: 'white', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', color: 'black', zIndex: 3 }}
                >
                    <Toolbar style={{ alignItems: 'center' }}>
                        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start" sx={{ mr: 2 }}>
                            <ListIcon />
                        </IconButton>
                        <Typography variant="p" style={{ paddingLeft: '10px' }} noWrap component="div" sx={{ flexGrow: 1 }}>
                            {logindata.name}
                        </Typography>
                        <Tooltip title="Account settings">
                            <IconButton size="small" sx={{ ml: 2 }} aria-haspopup="true">
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                                />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                PaperProps={{
                    sx: {
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        height: '92vh',
                        top: '8vh',
                        zIndex: 2
                    },
                    style: { borderRadius: '20px' }
                }}
                sx={{
                    width: drawerWidth,
                    // flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <img
                        src="https://media.licdn.com/dms/image/C4D0BAQEVnWGByHVtlw/company-logo_200_200/0/1655116885222?e=2147483647&v=beta&t=hRJr-F2Qonmz-mCmHt9DDWyZ7FT9IWOi3TrfF92PFKk"
                        alt="logo"
                        style={{ width: 'auto', height: '30px', objectFit: 'fill' }}
                    />
                    {/* <IconButton onClick={handleDrawerToggle}>
         <ChevronLeftIcon />
      </IconButton> */}
                </DrawerHeader>
                {menus.map((item, key) => (
                    <MenuItem key={key} item={item} />
                ))}
            </Drawer>
        </>
    );
}
