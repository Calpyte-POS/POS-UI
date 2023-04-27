import React from 'react';
import TextField from '@mui/material/TextField';
// Hidden for simplicity
import Select from '@mui/material/Select';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import { fuelData } from 'utils/FuelData';
import { useFormik } from 'formik';
import moment from 'moment';

const schema = yup.object().shape({
    facilityName: yup.string().required(),
    facilityCode: yup.string().required(),
    fuel: yup.string().required(),
    quantity: yup.number().required().positive().integer(),
    siUnit: yup.string().required(),
    emissionSource: yup.string().required(),
    date: yup.date().required('Date is required'),
    isActive: yup.string().required('Please select a isActive')
});

const validationSchema = yup.object().shape({
    facilityName: yup.string().min(2).max(10).required(),
    facilityCode: yup.string().required(),
    fuel: yup.string().required(),
    quantity: yup.number().required().positive().integer(),
    siUnit: yup.string().required(),
    date: yup.date().required('Date is required')
});

const initialValues = {
    facilityName: '',
    facilityCode: '',
    fuel: '',
    quantity: '',
    siUnit: '',
    date: ''
};

function StationaryCombustion() {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
        }
    });

    const helperTextStyle = {
        color: 'red !important',
        margin: 0,
        padding: 0,
        maxWidth: '100%',
        transition: 'opacity 0.3s linear 2s;',
        opacity: 1
    };

    useEffect(() => {
        // formik.setFieldValue('facilityName', 'Dinesh');
        // formik.setFieldValue('fuel', 'crudeOil');
        // formik.setFieldValue('date', moment('2022-05-15'));
    }, []);

    return (
        <>
            <Box sx={{ width: '100%', padding: '10px' }}>
                {/* <ThemeProvider theme={theme}> */}
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} component="div">
                    Stationary Combustion
                </Typography>
                <Typography variant="p" component="div">
                    This section captures any emissions made from stationary combustion sources that are either owned or operated by the
                    reporting organization. Combustion processes involve the use of fuels. Hence Fuel consumption data along with fuel
                    characteristics is captured as measure of emissions.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row col-md-12" style={{ marginTop: '2%' }}>
                        <div className="col-md-4" style={{ minHeight: '60px' }}>
                            <FormControl fullWidth>
                                <TextField
                                    label="facilityName"
                                    variant="outlined"
                                    size="small"
                                    name="facilityName"
                                    value={formik.values.facilityName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.facilityName && Boolean(formik.errors.facilityName)}
                                    // helperText={formik.touched.facilityName && formik.errors.facilityName}
                                />
                                <FormHelperText sx={helperTextStyle}>{formik.errors.facilityName}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-md-4" style={{ minHeight: '60px' }}>
                            <FormControl fullWidth size="small" error={!!formik.errors.fuel} className="col-md-4">
                                <InputLabel id="fuel-select">Fuel</InputLabel>
                                <Select
                                    id="fuel-select"
                                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                    label="Fuel"
                                    name="fuel"
                                    value={formik.values.fuel}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    error={!!formik.errors.fuel}
                                >
                                    <MenuItem key="none" value="">
                                        None
                                    </MenuItem>
                                    {fuelData.map((fuel, index) => {
                                        return (
                                            <MenuItem key={fuel.key} value={fuel.key}>
                                                {fuel.value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText sx={helperTextStyle}>{formik.errors.fuel}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-md-4" style={{ minHeight: '60px' }}>
                            <FormControl fullWidth>
                                <TextField
                                    label="facilityCode"
                                    variant="outlined"
                                    size="small"
                                    name="facilityCode"
                                    value={formik.values.facilityCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.facilityCode && Boolean(formik.errors.facilityCode)}
                                />
                                <FormHelperText sx={helperTextStyle}>{formik.errors.facilityCode}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-md-4" style={{ minHeight: '60px' }}>
                            <FormControl fullWidth>
                                <TextField
                                    label="quantity"
                                    variant="outlined"
                                    size="small"
                                    name="quantity"
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                />
                                <FormHelperText sx={helperTextStyle}>{formik.errors.quantity}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-md-4" style={{ minHeight: '60px' }}>
                            <FormControl fullWidth size="small" error={!!formik.errors.siUnit} className="col-md-4">
                                <InputLabel id="siUnit-select">SI Unit</InputLabel>
                                <Select
                                    id="siUnit-select"
                                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                    label="siUnit"
                                    name="siUnit"
                                    value={formik.values.siUnit}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    error={!!formik.errors.siUnit}
                                >
                                    <MenuItem key="none" value="">
                                        None
                                    </MenuItem>
                                    {['Kg', 'Ton'].map((data, index) => {
                                        return (
                                            <MenuItem key={index} value={data}>
                                                {data}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText sx={helperTextStyle}>{formik.errors.siUnit}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-md-4" style={{ minHeight: '60px' }}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Select a date"
                                        name="date"
                                        // inputFormat="MM/dd/yyyy"
                                        error={!!formik.errors.date}
                                        onChange={(value) => formik.setFieldValue('date', value)}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                error: !!formik.errors.date,
                                                fullWidth: true
                                            }
                                        }}
                                        value={formik.values.date || null}
                                        renderInput={(props) => <TextField {...props} />}
                                    />
                                    <FormHelperText sx={helperTextStyle}>{formik.errors.date}</FormHelperText>
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                    </div>
                    <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
                        Submit
                    </Button>
                </form>
            </Box>
        </>
    );
}
export default StationaryCombustion;
