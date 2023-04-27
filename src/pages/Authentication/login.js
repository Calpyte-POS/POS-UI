import './auth.css';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { padding } from '@mui/system';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@mui/material';
import { useState } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modeOfLogin, setModeOfLogin] = useState('');
    const [state, setState] = useState({
        email: '',
        password: '',
        modeOfLogin: ''
    });

    const handleSubmit = (event) => {
        console.log(state);
        event.preventDefault();
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const selectChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <div className="cards">
                <div style={{ width: '100%', backgroundColor: '#eff1f4' }}>
                    <img
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        src="http://103.108.220.162:3050/one.gif"
                        alt="ico"
                    ></img>
                </div>
                <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div style={{ padding: '5%', textAlign: 'center', backgroundColor: 'white' }}>
                        <h4 style={{ paddingBottom: '5%' }}>LogIn Here</h4>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus
                                style={{ paddingBottom: '5%' }}
                                fullWidth
                                label="Email *"
                                variant="outlined"
                                name="email"
                                type="email"
                                value={state.email}
                                onChange={handleChange}
                            />
                            <TextField
                                style={{ paddingBottom: '5%' }}
                                fullWidth
                                label="Password *"
                                variant="outlined"
                                name="password"
                                type="password"
                                value={state.password}
                                onChange={handleChange}
                            />
                            <FormControl style={{ paddingBottom: '5%' }} sx={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-label">Mode of Login *</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={modeOfLogin}
                                    label="Mode of Login *"
                                    onChange={selectChange}
                                >
                                    <MenuItem value={10}>Client</MenuItem>
                                    <MenuItem value={20}>Sub-User</MenuItem>
                                    <MenuItem value={30}>Super Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                        {/* <a href="../Authentication/Forgot.js">Forgot Password</a> */}
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                        <p style={{ paddingTop: '5%' }}>
                            <b>
                                Don't have an account?<NavLink to="/register">Register Here</NavLink>
                            </b>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
