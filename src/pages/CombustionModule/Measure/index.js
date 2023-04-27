import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ScopeOne from './ScopeOne';
import ScopeTwo from './ScopeTwo';
import ScopeThree from './ScopeThree';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function Measure() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const boxStyle = {
        width: '100%',
        height: 'auto',
        padding: '1%',
        backgroundColor: 'white',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
        borderRadius: '5px'
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired
    };
    return (
        <Box sx={boxStyle}>
            <div style={{ height: 'auto', backgroundColor: '#EBEDEF', padding: '5px', marginBottom: '1%', borderRadius: '5px' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="none" color="inherit">
                        Combustion
                    </Link>
                    <Link underline="none" color="inherit">
                        Measure
                    </Link>
                </Breadcrumbs>
            </div>
            {/* <div style={{ height: '300px', backgroundColor: '#EBEDEF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Over All Charts And Data Of Measure</p>
            </div> */}
            <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Scope 1" />
                <Tab label="Scope 2" />
                <Tab label="Scope 3" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ScopeOne />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ScopeTwo />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ScopeThree />
            </TabPanel>
        </Box>
    );
}
