import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom/dist';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CommonTable from 'components/CommonTable';
import { Box } from '../../../node_modules/@mui/material/index';
import UserAdd from './UserAdd';
import { animations } from 'react-animation';
import { useAxios } from 'components/useAxios';
import UserDelete from './UserDelete';

export default function UserList({ categoryTrigger }) {
    const navigate = useNavigate();
    const [displayValue, setDisplayValue] = useState([]);
    // const [search, setSearch] = useState('');
    const columns = ['userId', 'title'];
    const axios = useAxios();
    const [isDelete, setIsDelete] = React.useState(false);

    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [rowId, setRowId] = useState({});
    const displayedColumns = ['First Name', 'Last Name', 'Email', 'Phone Number', 'Password', 'Confirm Password', ' Role'];
    const definedColumns = ['firstName', 'lastName', 'email', 'phoneNumber', 'password', 'confirmPassword', 'role'];
    const [isComplete, setIsComplete] = useState(false);
    const searchColumns = [
        { name: 'firstName', canShow: true },
        { name: 'lastName', canShow: true },
        { name: 'email', canShow: true },
        { name: 'phoneNumber', canShow: true },
        { name: 'password', canShow: true },
        { name: 'confirmPassword', canShow: true },
        { name: 'role', canShow: true }
    ];
    const [open, setOpen] = useState(false);
    var postPerPage = 10;
    var pageNumber = 1;
    var filter = [];

    const randomNumber = () => {
        return Math.floor(Math.random() * 100 + 1);
    };

    const getUserData = async () => {
        let data = {
            draw: randomNumber(),
            filter: filter,
            pageNo: pageNumber,
            pageSize: postPerPage
        };
        await axios
            .post('user', data)
            .then((res) => {
                console.log(data);
                setCount(res?.data?.recordsTotal);
                setCategories(res?.data?.data);
            })
            .catch((err) => console.error(err));
    };

    function rowAction(action = { name: 'add', value: null }) {
        switch (action?.name) {
            case 'add':
                setRowId(action.value);
                setOpen(true);
                break;
            case 'edit':
                setRowId(action.value);
                setOpen(true);
                break;
            case 'delete':
                setRowId(action.value);
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
        getUserData();
    }

    const search = (event) => {
        filter = event;
        getUserData();
    };

    useEffect(() => {
        if (categoryTrigger) {
            categoryTrigger.subscribe(() => rowAction());
        }
        setOpen(false);
        getUserData();
    }, []);

    return (
        <>
            <Box style={{ animation: !open ? 'none' : animations.popIn }}>
                {
                    {
                        false: (
                            <div>
                                <div className="align-right">
                                    {/* {/ <input type="text" id="search" placeholder="Search" /> /} */}
                                    <Button onClick={() => rowAction({ name: 'add', value: null })} variant="contained" color="primary">
                                        Create User
                                    </Button>
                                </div>
                                <br />
                                <div style={{ backgroundColor: 'white', animation: !open ? animations.fadeInUp : animations.fadeIn }}>
                                    <CommonTable
                                        displayedColumns={displayedColumns}
                                        definedColumns={definedColumns}
                                        searchColumns={searchColumns}
                                        data={categories}
                                        rowAction={rowAction}
                                        count={count}
                                        paginate={paginate}
                                        searchEvent={search}
                                    ></CommonTable>
                                </div>
                            </div>
                        ),
                        true: (
                            <div>
                                <UserAdd rowId={rowId} setOpen={setOpen} />
                            </div>
                        )
                    }[open]
                }
            </Box>
            {isDelete && <UserDelete open={isDelete} setOpen={setIsDelete} id={rowId} />}
        </>
    );
}
