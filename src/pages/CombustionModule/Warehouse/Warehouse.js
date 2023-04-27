import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import AddWarehouse from './AddWarehouse';
import { Routes, Route } from 'react-router-dom';
import { Box, TextField, Typography } from '../../../../node_modules/@mui/material/index';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';

export default function Tenants() {
    const navigate = useNavigate();

    return (
        <>
            <Routes>
                <Route path="add-tenant" element={<AddWarehouse />} />
            </Routes>
            <div>
                <Button onClick={() => navigate('add-tenant')} type="add" variant="contained" color="primary">
                    ADD
                </Button>
                <Typography varient="p" sx={{ fontWeight: 'bold' }}>
                    Create Warehouse{' '}
                    <Button onClick={() => navigate(-1)} type="add" variant="contained" color="primary">
                        Back
                    </Button>
                </Typography>
                <Box sx={{ width: '100%', padding: '10px' }}>
                    <form>
                        <div className="row col-md-12" style={{ marginTop: '2%' }}>
                            <div className="col-md-4" style={{ minHeight: '50px' }}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="name"
                                        varient="outlined"
                                        size="small"
                                        name="name"
                                        // value={formik.values.name}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // error={formik.touched.name && Boolean(formik.errors.name)}
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </form>
                </Box>
            </div>
        </>
    );
}
