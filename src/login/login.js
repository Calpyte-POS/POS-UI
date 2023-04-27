import { useCallback, useState } from 'react';
import { TextField, Input, Icon, Button } from '@mui/material';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';

// const Login = () => {
//     const navigate = useNavigate();

//     // const onRectangleButtonClick = useCallback(() => {
//     //   navigate("/register");
//     // }, [navigate]);

//     const onRegisterHereClick = useCallback(() => {
//         navigate('/register');
//     }, [navigate]);
//     const onRegisterHereClicks = useCallback(() => {
//         navigate('/password-reset');
//     }, [navigate]);
//     const [passShow, setPassShow] = useState(false);

//     const [inpval, setInpval] = useState({
//         email: '',
//         password: ''
//     });

//     const history = useNavigate();

//     const setVal = (e) => {
//         // console.log(e.target.value);
//         const { name, value } = e.target;

//         setInpval(() => {
//             return {
//                 ...inpval,
//                 [name]: value
//             };
//         });
//     };

//     const loginuser = async (e) => {
//         e.preventDefault();

//         const { email, password } = inpval;

//         if (email === '') {
//             toast.error('email is required!', {
//                 position: 'top-center'
//             });
//         } else if (!email.includes('@')) {
//             toast.warning('includes @ in your email!', {
//                 position: 'top-center'
//             });
//         } else if (password === '') {
//             toast.error('password is required!', {
//                 position: 'top-center'
//             });
//         } else if (password.length < 6) {
//             toast.error('password must be 6 char!', {
//                 position: 'top-center'
//             });
//         } else {
//             console.log('user login succesfully done');
//             const data = await fetch('/user/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password
//                 })
//             });

//             const res = await data.json();
//             if (data.status === 201) {
//                 if (res.type === 0 || res.type === 2) {
//                     localStorage.setItem('token', res.token);
//                     history('/dash');
//                     setInpval({ ...inpval, email: '', password: '' });
//                 } else {
//                     toast.error('No Access', {
//                         position: 'top-center'
//                     });
//                     history('/');
//                 }
//             } else {
//                 toast.error('Invalid Credentials', {
//                     position: 'top-center'
//                 });
//             }
//         }
//     };

//     return (
//         <>
//             <div className="wireframe-7">
//                 <TextField
//                     className="wireframe-7-child"
//                     sx={{ width: 421 }}
//                     color="primary"
//                     variant="outlined"
//                     type="text"
//                     label="Email"
//                     placeholder="Enter your email"
//                     size="medium"
//                     margin="none"
//                     value={inpval.email}
//                     onChange={setVal}
//                     name="email"
//                     id="email"
//                     required
//                 />
//                 <img className="arroba-2-1-icon" alt="" src="../arroba2-3@2x.png" />
//                 <TextField
//                     className="wireframe-7-item"
//                     sx={{ width: 421 }}
//                     color="primary"
//                     variant="outlined"
//                     type="password"
//                     label="Password "
//                     placeholder="Password "
//                     size="medium"
//                     margin="none"
//                     onChange={setVal}
//                     value={inpval.password}
//                     name="password"
//                     id="password"
//                     required
//                 />
//                 <img className="arroba-2-2-icon1" alt="" src="../arroba2-2@2x.png" />
//                 <div className="login">Login</div>
//                 <Button
//                     className="wireframe-7-inner"
//                     sx={{ width: 233 }}
//                     variant="contained"
//                     color="primary"
//                     href="/register"
//                     onClick={loginuser}
//                 >
//                     Login
//                 </Button>

//                 <p className="forgot-password1">
//                     {' '}
//                     <NavLink to="/password-reset">Forgot Password </NavLink>{' '}
//                 </p>

//                 <div className="if-you-dont-have-an-account">If you don’t have an account</div>
//                 <Link className="register-here" to="/register" onClick={onRegisterHereClick}>
//                     <span>{` `}</span>
//                     <span className="register-here1">Register</span>
//                 </Link>
//                 <img className="ezgif-2-icon" alt="" src="../one.gif" />
//                 <img className="whatsap" alt="" src="../whatsapp-image-20221222-at-923-1@2x.png" />
//             </div>
//             <ToastContainer />
//         </>
//     );
// };

const login = () => {
    return (
        <section>
            <div className="login">
                <div className="col-1">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                </div>
                <div className="col-2">
                    <img src="https://wallpaperaccess.com/full/1900851.png" alt="" />
                </div>
            </div>
        </section>
    );
};
export default login;
