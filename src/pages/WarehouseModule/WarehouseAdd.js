import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom/dist';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import './index.css';
import axios from '../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useAxios } from 'components/useAxios';

export default function WarehouseAdd({ setOpen, rowId }) {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({ name: '', email: '', phoneNumber: '', country: '', city: '', zipCode: '' });
    const axios = useAxios();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formValue['id'] = rowId ? rowId : null;
        // console.log(formValue);
        axios
            .post('warehouse/save', formValue)
            .then(async (res) => {
                toast.success('Request successful');
                console.log(res);
                setOpen(false);
            })
            .catch((err) => toast.error(err));
    };

    function getValueById(id) {
        axios
            .get('warehouse/by-id?id=' + id)
            .then((res) => {
                console.log(res);
                setFormValue({
                    name: res?.data?.name,
                    email: res?.data?.email,
                    phoneNumber: res?.data?.phoneNumber,
                    country: res?.data?.country,
                    city: res?.data?.city,
                    zipCode: res?.data?.zipCode
                });
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        // console.log(rowId);
        // alert(JSON.stringify(rowId));
        // toast.success('Request successful');
        if (rowId) {
            getValueById(rowId);
        }
    }, []);

    return (
        <>
            <div>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Typography varient="p" sx={{ padding: '10px', fontWeight: 'bold' }}>
                        Create Warehouse
                    </Typography>
                    <Button onClick={() => setOpen(false)} type="add" variant="outlined" color="primary">
                        Back
                    </Button>
                </Stack>

                <Box sx={{ color: '#ffffff', width: '100%', padding: '20px 0px 0px 0px' }}>
                    <div className="card">
                        <form>
                            <div className="row col-md-12" style={{ padding: '2%' }}>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        Name:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Enter Name"
                                            varient="outlined"
                                            size="small"
                                            name="name"
                                            value={formValue.name}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        Email:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Enter Email"
                                            varient="outlined"
                                            size="small"
                                            name="email"
                                            value={formValue.email}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        Number:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Enter Phone Number"
                                            varient="outlined"
                                            size="small"
                                            name="phoneNumber"
                                            value={formValue.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        Country:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Enter Country"
                                            varient="outlined"
                                            size="small"
                                            name="country"
                                            value={formValue.country}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        City:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Enter City"
                                            varient="outlined"
                                            size="small"
                                            name="city"
                                            value={formValue.city}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        Zip Code:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Enter Zip Code"
                                            varient="outlined"
                                            size="small"
                                            name="zipCode"
                                            value={formValue.zipCode}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div style={{ padding: '1% 2% 2% 1%' }} className="align-right">
                                <Button type="submit" className="btn1" onClick={handleSubmit} variant="contained" color="primary">
                                    Save
                                </Button>
                                <Button onClick={() => setOpen(false)} variant="outlined" color="primary">
                                    Cancel
                                </Button>
                            </div>
                            {/* <div>
                                <button onClick={handleButtonClick}>Send Message</button>
                                <ToastContainer />
                            </div> */}
                            <h2>{console.log(JSON.stringify(formValue))}</h2>
                        </form>
                    </div>
                </Box>
            </div>
        </>
    );
}

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ExampleComponent() {
//   const handleButtonClick = () => {
//     const isSuccess = true; // set to false to show error message
//     const message = isSuccess ? 'Message sent successfully' : 'Oops! Something went wrong';
//     const options = isSuccess ? { type: 'success' } : { type: 'error' };
//     toast(message, options);
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Send Message</button>
//       <ToastContainer />
//     </div>
//   );
// }
