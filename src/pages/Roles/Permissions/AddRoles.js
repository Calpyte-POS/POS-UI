import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { animations } from 'react-animation';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom/dist';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { FormControlLabel } from '@mui/material/index';
import { Checkbox } from '@mui/material/index';
import { useAxios } from '../../../components/useAxios';
// import axios from '../../../utils/axios';

export default function AddRoles({ setOpen, rowId }) {
    const navigate = useNavigate();
    const [selected, setSelelcted] = useState([]);
    const [formValue, setFormValue] = useState({ name: '' });
    const [checkedValues, setCheckedValues] = useState([]);
    const axios = useAxios();

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormValue({ ...formValue, [name]: value });
    // };

    let checkArr = [
        {
            id: 'Manage Roles',
            name: 'Manage Roles'
        },
        {
            id: 'Manage Brands',
            name: 'Manage Brands'
        },
        {
            id: 'Manage Currency',
            name: 'Manage Currency'
        },
        {
            id: 'Manage Warehouses',
            name: 'Manage Warehouses'
        },
        {
            id: 'Manage Units',
            name: 'Manage Units'
        },
        {
            id: 'Manage Product Categories',
            name: 'Manage Product Categories'
        },
        {
            id: 'Manage Products',
            name: 'Manage Products'
        },
        {
            id: 'Manage Suppliers',
            name: 'Manage Suppliers'
        },
        {
            id: 'Manage Customers',
            name: 'Manage Customers'
        },
        {
            id: 'Manage Users',
            name: 'Manage Users'
        },
        {
            id: 'Manage Expense Categories',
            name: 'Manage Expense Categories'
        },
        {
            id: 'Manage Expenses',
            name: 'Manage Expenses'
        },
        {
            id: 'Manage Setting',
            name: 'Manage Setting'
        },
        {
            id: 'Manage Pos Screen',
            name: 'Manage Pos Screen'
        },
        {
            id: 'Manage Purchase',
            name: 'Manage Purchase'
        },
        {
            id: 'Manage Sale',
            name: 'Manage Sale'
        },
        {
            id: 'Manage Purchase Return',
            name: 'Manage Purchase Return'
        },
        {
            id: 'Manage Sale Return',
            name: 'Manage Sale Return'
        },
        {
            id: 'Manage Transfers',
            name: 'Manage Transfers'
        },
        {
            id: 'Manage Adjustments',
            name: 'Manage Adjustments'
        },
        {
            id: 'Manage Dashboard',
            name: 'Manage Dashboard'
        },
        {
            id: 'Manage Email Templates',
            name: 'Manage Email Templates'
        },
        {
            id: 'Manage Reports',
            name: 'Manage Reports'
        },
        {
            id: 'Manage Quotations',
            name: 'Manage Quotations'
        },
        {
            id: 'Manage Sms Templates',
            name: 'Manage Sms Templates'
        },
        {
            id: 'Manage Sms Apis',
            name: 'Manage Sms Apis'
        },
        {
            id: 'Manage Language',
            name: 'Manage Language'
        }
    ];

    console.log(selected);

    function submit(e) {
        e.preventDefault();
        console.log(formValue);
        console.log(checkedValues);
        alert('hit');
        axios
            .post('role/', formValue, checkedValues)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        navigate('roles/roles-list');
    }

    function getValueById(id) {
        axios
            .get('role/by-id?id=' + id)
            .then((res) => {
                console.log(res);
                setFormValue({
                    name: res?.data?.name
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

    const handleProductChange = (event) => {
        const id = event.target.id;
        const isChecked = event.target.checked;

        if (isChecked) {
            setCheckedValues([...checkedValues, id]);
        } else {
            setCheckedValues(checkedValues.filter((value) => value !== id));
        }
        console.log(checkedValues);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    return (
        <>
            <Stack flexDirection="row" justifyContent="space-between">
                <Typography varient="p" sx={{ padding: '10px', fontWeight: 'bold' }}>
                    Create Role
                </Typography>
                <Button onClick={() => navigate('roles/roles-list')} type="add" variant="outlined" color="primary">
                    Back
                </Button>
            </Stack>
            <form>
                <Grid
                    sx={{
                        bgcolor: 'white',
                        dimensions: '100% 100%',
                        animation: animations.fadeInUp,
                        padding: '20px'
                    }}
                >
                    {' '}
                    <p className="label-color">
                        Name:<span className="important">*</span>
                    </p>
                    <TextField fullWidth label="Enter Name" varient="outlined" size="small" name="name" onChange={handleChange} />
                </Grid>
                <Grid
                    sx={{
                        bgcolor: 'white',
                        dimensions: '100% 100%',
                        animation: animations.fadeInUp
                    }}
                    container
                    spacing={0}
                    padding={2}
                >
                    {checkArr.map((obj, index) => {
                        return (
                            <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            id={obj?.id}
                                            checked={checkedValues.includes(obj?.id)}
                                            onChange={handleProductChange}
                                        />
                                    }
                                    label={obj?.name}
                                />
                                {/* <Stack flexDirection="row" justifyContent="start" alignItems="center">
                                    <input
                                        type="checkbox"
                                        value={obj?.id}
                                        id={obj?.id}
                                        checked={checkedValues.includes(obj?.id)}
                                        onChange={handleProductChange}
                                    />
                                    <label>{obj?.name}</label>
                                </Stack> */}
                            </Grid>
                        );
                    })}
                    {/* <button className="btn btn-primary" onClick={() => submit()}>
                    submit
                </button> */}
                </Grid>
                <div style={{ padding: '1% 2% 2% 1%', backgroundColor: 'white' }} className="align-right">
                    <Button type="submit" onClick={submit} className="btn1" variant="contained" color="primary">
                        Save
                    </Button>
                    <Button onClick={() => navigate('roles/roles-list')} variant="outlined" color="primary">
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    );
}
