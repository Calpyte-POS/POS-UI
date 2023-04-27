import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DrawerContent({ open, handleDrawerToggle }) {
    const drawerWidth = 250;

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        })
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }));

    const menu = [
        {
            // icon: <DashboardOutlined/>,
            title: 'Dashboard',
            to: '/demo-page',
            type: 'group',
            items: []
        },
        {
            // icon: <DashboardOutlined/>,
            title: 'Education',
            type: 'group',
            items: [
                {
                    title: 'Technical Analysis',
                    to: '/sample'
                },
                {
                    title: 'Fundamental Analysis',
                    to: '/thedowtheory'
                },
                {
                    title: 'Elliot Wave Analysis',
                    to: '/thedowtheory'
                }
            ]
        }
    ];

    const MenuItem = ({ item }) => {
        const Component = hasChildren(item) ? MultiLevel : SingleLevel;
        return <Component item={item} />;
    };

    const SingleLevel = ({ item }) => {
        return (
            <ListItem button component={Link} to={item.to} style={{ borderBottom: 'solid 1px #EAECEE' }}>
                {/* <ListItemIcon>{item.icon}</ListItemIcon>  */}
                <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: item.type === 'group' ? '15x' : '13px' }} />
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
                <ListItem button onClick={handleClick} style={{ borderBottom: 'solid 1px #EAECEE' }}>
                    {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                    <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: item.type === 'group' ? '15x' : '13px' }} />
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
        if (children === undefined) {
            return false;
        }
        if (children.constructor !== Array) {
            return false;
        }
        if (children.length === 0) {
            return false;
        }
        return true;
    }

    return (
        <Drawer
            PaperProps={{
                sx: {
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                },
                style: { borderRadius: '0px 30px 0px 0px' }
            }}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
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
                <IconButton onClick={handleDrawerToggle}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            {menu.map((item, key) => (
                <MenuItem key={key} item={item} />
            ))}
        </Drawer>
    );
}
