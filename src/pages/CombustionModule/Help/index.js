// export default function Help() {
//     return (
//         <>
//             <p>help works</p>
//         </>
//     );
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReactPlayer from 'react-player';
import { LoginContext } from './Context';
import { ToastContainer, toast } from 'react-toastify';

export default function HelpDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [buttonTxt, setButtonTxt] = React.useState('How Can I Help You ?');
    const { children, onClose } = props;
    const { logindata } = React.useContext(LoginContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    React.useEffect(() => {
        if (props.buttonName) setButtonTxt(props.buttonName);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        let content =
            'Name : ' +
            logindata.fname +
            '\n' +
            'Email : ' +
            logindata.email +
            '\n' +
            'Contact : ' +
            document.getElementById('contactNumber').value +
            '\n' +
            'Message : ' +
            document.getElementById('content').value;
        let obj = {
            subject: document.getElementById('regarding').value,
            body: content
        };

        const data = await fetch('/message/help-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
            .then(() => handleClose())
            .catch((err) => handleClose());
    };

    return (
        <div>
            <ToastContainer />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {' '}
                {/*style={{padding:"0 30%"}} */}
                <ReactPlayer width="50%" controls url="" />
            </div>
            <div style={{ padding: '3% 0 0 40%' }}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    {buttonTxt}
                </Button>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Help Message</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
            Message Here
          </DialogContentText> */}

                    <TextField margin="contactNumber" id="contactNumber" label="ContactNumber" type="number" fullWidth variant="standard" />
                    <TextField margin="dense" id="regarding" label="Regarding" type="text" fullWidth variant="standard" />
                    <TextField id="content" label="Content" multiline minRows={6} maxRows={6} fullWidth variant="filled" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
