import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddchartIcon from '@mui/icons-material/Addchart';

export const menuList = [
    {
        icon: <HomeOutlinedIcon />,
        title: 'Home',
        to: '/demo-page',
        type: 'group',
        items: []
    },
    {
        icon: <DashboardIcon />,
        title: 'Dashboard',
        to: '/dashboard',
        type: 'group',
        items: []
    },
    {
        icon: <ProductionQuantityLimitsIcon />,
        title: 'Warehouse',
        to: '/warehouse',
        type: 'group',
        items: []
    },
    {
        icon: <AddchartIcon />,
        title: 'Roles/Permissions',
        to: '/roles',
        type: 'group',
        items: []
    }
];
