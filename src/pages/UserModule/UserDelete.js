// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useEffect } from 'react';
// import { useAxios } from 'components/useAxios';

// export default function UserDelete({ open, setOpen, id }) {
//     const axios = useAxios();

//     const handleClose = () => {
//         setOpen(false);
//     };

//     useEffect(() => {
//         alert(id);
//     }, [open]);

//     async function handleDelete() {
//         await axios
//             .get('user/delete?id=' + id)
//             .then((res) => {
//                 console.log(res);
//             })
//             .catch((err) => console.log(err));
//         handleClose();
//     }

//     return (
//         <div>
//             <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
//                 {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">Are you sure want to delete this 'Role' ?</DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDelete} variant="outlined" color="primary">
//                         Yes,Delete!
//                     </Button>
//                     <Button onClick={handleClose} variant="outlined" color="primary">
//                         No,Cancel
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }
