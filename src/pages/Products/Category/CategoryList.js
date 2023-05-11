import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CategoryAdd from './CategoryAdd';
import { Box } from '@mui/material/index';
import CommonTable from 'components/CommonTable';
import { animations } from 'react-animation';
import '../../WarehouseModule/index.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Form from 'react-bootstrap/Form';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Avatar from 'react-avatar';
import { useAxios } from 'components/useAxios';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function CategoryList({ categoryTrigger }) {
    const axios = useAxios();
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [rowId, setRowId] = useState({});
    const displayedColumns = ['Product category', 'Product Count'];
    const definedColumns = ['productCategory', 'productCount'];
    const [isComplete, setIsComplete] = useState(false);
    const searchColumns = [
        { name: 'Product category', canShow: true },
        { name: 'Product Count', canShow: true }
    ];

    const [formValue, setFormValue] = useState({ prductCategory: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setSelectedAvatar(URL.createObjectURL(file));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formValue['id'] = rowId ? rowId : null;
        axios
            .post('category', formValue)
            .then((res) => {
                toast.success('Request Successful');
                console.log(res);
                setOpen(false);
            })
            .catch((err) => toast.error(err));
    };

    function rowAction(action = { name: 'category/add', value: null }) {
        switch (action?.name) {
            case 'category/add':
                setRowId(action.value);
                setOpen(true);
                break;
            case 'edit':
                setRowId(action.value);
                setOpen(true);
                break;
            case 'delete':
                setRowId(action.value);
                // alert('Are you sure to delete');
                setIsDelete(true);
                break;
            default:
                setRowId(null);
                setOpen(true);
                break;
        }
    }

    function paginate(event) {
        pageNumber = event?.pageNumber;
        postPerPage = event?.postPerPage;
    }

    const search = (event) => {
        filter = event;
    };

    useEffect(() => {
        if (categoryTrigger) {
            categoryTrigger.subscribe(() => rowAction());
        }
        setOpen(false);
    }, []);

    return (
        <>
            {/* {list Page} */}
            <Box style={{ animation: !open ? 'none' : animations.popIn }}>
                {
                    {
                        false: (
                            <div>
                                <div className="align-right">
                                    <Button
                                        // onClick={() => rowAction({ name: 'category/add', value: null })}
                                        onClick={handleClickOpen}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create Category
                                    </Button>
                                </div>
                                <br />
                                <div style={{ backgroundColor: 'white', animation: !open ? animations.fadeInUp : animations.fadeIn }}>
                                    <CommonTable
                                        displayedColumns={displayedColumns}
                                        definedColumns={definedColumns}
                                        searchColumns={searchColumns}
                                        data={categories}
                                        // rowAction={rowAction}
                                        count={count}
                                        paginate={paginate}
                                        searchEvent={search}
                                    ></CommonTable>
                                </div>
                            </div>
                        ),
                        true: (
                            <div>
                                <CategoryAdd rowId={rowId} setOpen={setOpen} />
                            </div>
                        )
                    }[open]
                }
            </Box>

            {/* ADD page */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Create Product Category'}</DialogTitle>
                <DialogContent>
                    <div className="col-md-12 col-sm-6 col-xs-6" style={{ minHeight: '50px', padding: '10px' }}>
                        <Form.Label>Name:</Form.Label>
                        <FormControl fullWidth>
                            <TextField
                                placeholder="Enter Name"
                                varient="outlined"
                                size="small"
                                name="name"
                                value={formValue.name}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </div>
                    <Form.Label style={{ padding: '10px' }}>Choose Logo:</Form.Label>
                    <FormControl fullWidth style={{ padding: '10px' }}>
                        <label>
                            <Avatar name=" " src={selectedAvatar} size={100} round={true} />
                            <input type="file" onChange={handleAvatarChange} accept="image/*" style={{ display: 'none' }} />
                        </label>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
