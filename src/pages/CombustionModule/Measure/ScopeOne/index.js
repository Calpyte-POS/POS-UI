import React, { useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import 'react-toastify/dist/ReactToastify.css';
import StationaryCombustion from './StationaryCombustion/index';
import MobileCombution from './MobileCombustion/index';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

export default function ResponsiveGrid() {
    const [selectedCombustion, setSelectedCombustion] = useState(0);
    const [inputValue, setInputValue] = useState({
        code: '',
        facility: '',
        quantity: ''
    });
    const setValue = (e) => {
        const { name, value } = e.target;
        setInputValue(() => {
            return {
                ...inputValue,
                [name]: value
            };
        });
    };

    useEffect(() => {}, []);

    const combustions = ['Stationary Combustion', 'Mobile Combustion', 'Fugitive Emissions', 'Process Emissions'];

    const renderSwitch = (selectedCombustion) => {
        switch (selectedCombustion) {
            case 0:
                return <StationaryCombustion></StationaryCombustion>;
            case 1:
                return <MobileCombution></MobileCombution>;
            default:
                return 'Page Not Found !';
        }
    };

    return (
        <>
            <Grid container spacing={3}>
                {combustions.map((combustion, index) => {
                    return (
                        <Grid style={{ cursor: 'pointer' }} key={index} xs={6} sm={3} onClick={() => setSelectedCombustion(index)}>
                            <Item
                                sx={
                                    index == selectedCombustion
                                        ? { backgroundColor: '#808b96', color: 'white', transition: 'background-color 0.5s' }
                                        : {
                                              backgroundColor: 'default',
                                              color: 'default'
                                          }
                                }
                            >
                                {combustion}
                            </Item>
                        </Grid>
                    );
                })}
            </Grid>
            {renderSwitch(selectedCombustion)}
            <br />
        </>
    );
}
