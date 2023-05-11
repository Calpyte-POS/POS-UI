import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom/dist';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { toast, ToastContainer } from 'react-toastify';
import { useAxios } from '../../components/useAxios';
import '../WarehouseModule/index.css';
import Autocomplete from '@mui/material/Autocomplete';

export default function UaerAdd({ setOpen, rowId }) {
    const navigate = useNavigate();
    const axios = useAxios();
    const [isSending, setIsSending] = useState(false);
    const [roles, setRoles] = useState([]);

    const [formValue, setFormValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleSubmit = (e) => {
        // formValue['role'] = formValue.role?.id;
        formValue['id'] = rowId ? rowId : null;
        e.preventDefault();
        axios
            .post('user/save', formValue)
            .then((res) => {
                toast.success('Request Successful');
                setOpen(false);
            })
            .catch((err) => toast.error(err));
    };

    // function getValueById(id) {
    //     axios
    //         .get('user/by-id?id=' + id)
    //         .then((res) => {
    //             console.log(res);
    //             setFormValue({
    //                 firstName: res?.data?.firstName,
    //                 lastName: res?.data?.lastName,
    //                 email: res?.data?.email,
    //                 phoneNumber: res?.data?.phoneNumber,
    //                 password: res?.data?.password,
    //                 confirmPassword: res?.data?.confirmPassword,
    //                 role: res?.data?.role
    //             });
    //         })
    //         .catch((err) => console.log(err));
    // }

    function getRoles() {
        axios
            .get('role/get-all')
            .then((res) => {
                setRoles(res?.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getRoles();
        // if (rowId) {
        //     getValueById(rowId);
        // }
    }, []);

    return (
        <>
            <div>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Typography varient="p" sx={{ padding: '10px', fontWeight: 'bold' }}>
                        Create User
                    </Typography>
                    <Button onClick={() => navigate('user/list')} type="add" variant="outlined" color="primary">
                        Back
                    </Button>
                </Stack>

                <Box sx={{ color: '#ffffff', width: '100%', padding: '20px 0px 0px 0px' }}>
                    <div className="card">
                        <form>
                            <div className="row col-md-12" style={{ padding: '2%' }}>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        First Name:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            placeholder="Enter First Name"
                                            varient="outlined"
                                            size="small"
                                            name="firstName"
                                            value={formValue.firstName}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        Last Name:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            placeholder="Enter Last Name"
                                            varient="outlined"
                                            size="small"
                                            name="lastName"
                                            value={formValue.lastName}
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
                                            placeholder="Enter Email"
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
                                        Phone Number:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            placeholder="Enter Phone Number"
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
                                        Password:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            placeholder="Enter Password"
                                            varient="outlined"
                                            size="small"
                                            name="password"
                                            value={formValue.password}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        Confirm Password:<span className="important">*</span>
                                    </p>
                                    <FormControl fullWidth>
                                        <TextField
                                            placeholder="Enter Confirm Password"
                                            varient="outlined"
                                            size="small"
                                            name="confirmPassword"
                                            value={formValue.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-6" style={{ minHeight: '50px', padding: '10px' }}>
                                    <p className="label-color">
                                        Role:<span className="important">*</span>
                                    </p>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={formValue.role ? formValue.role : roles[0]}
                                        onChange={(event, newValue) => {
                                            setFormValue({ ...formValue, ['role']: newValue });
                                        }}
                                        options={roles}
                                        getOptionLabel={(role) => `${role.name}`}
                                        size="small"
                                        renderInput={(params) => <TextField placeholder="Choose Role" {...params} />}
                                    />
                                </div>
                            </div>
                            <div style={{ padding: '1% 2% 2% 1%' }} className="align-right">
                                <Button type="submit" onClick={handleSubmit} className="btn1" variant="contained" color="primary">
                                    Save
                                </Button>
                                <Button onClick={() => navigate('user/list')} variant="outlined" color="primary">
                                    Cancel
                                </Button>
                            </div>
                            {isSending && navigate('user/list')}
                            <h2>{console.log(JSON.stringify(formValue))}</h2>
                        </form>
                    </div>
                </Box>
            </div>
        </>
    );
}
