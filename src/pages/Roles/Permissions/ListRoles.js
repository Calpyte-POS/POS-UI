import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import '../../WarehouseModule/index.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import { useAxios } from '../../../components/useAxios';
import AddRoles from './AddRoles';
import CommonTable from 'components/CommonTable';
import { Box } from '@mui/material/index';
import { animations } from 'react-animation';
import DeleteRoles from './DeleteRoles';

export default function ListRoles({ categoryTrigger }) {
    const navigate = useNavigate();
    const axios = useAxios();
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [rowId, setRowId] = useState({});
    const displayedColumns = ['Name'];
    const definedColumns = ['name'];
    const [isComplete, setIsComplete] = useState(false);
    const searchColumns = [{ name: 'name', canShow: true }];
    const [isDelete, setIsDelete] = React.useState(false);

    const [open, setOpen] = useState(false);
    var postPerPage = 10;
    var pageNumber = 1;
    var filter = [];
    const randomNumber = () => {
        return Math.floor(Math.random() * 100 + 1);
    };

    const getRoleData = async () => {
        let data = {
            draw: randomNumber(),
            filter: filter,
            pageNo: pageNumber,
            pageSize: postPerPage
        };

        await axios
            .post('role', data)
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
                alert(rowId);
                setRowId(action.value);
                setOpen(true);
                break;
            case 'delete':
                setRowId(action.value);
                // alert('delete');
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
        getRoleData();
    }

    const search = (event) => {
        filter = event;
        getRoleData();
    };

    useEffect(() => {
        if (categoryTrigger) {
            categoryTrigger.subscribe(() => rowAction());
        }
        setOpen(false);
        getRoleData();
    }, []);

    return (
        <>
            <Box style={{ animation: !open ? 'none' : animations.popIn }}>
                {
                    {
                        false: (
                            <div>
                                <div className="align-right">
                                    {/* <input type="text" id="search" placeholder="Search" /> */}
                                    <Button onClick={() => rowAction({ name: 'add', value: null })} variant="contained" color="primary">
                                        Create Role
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
                                <AddRoles rowId={rowId} setOpen={setOpen} />
                            </div>
                        )
                    }[open]
                }
            </Box>
            {isDelete && <DeleteRoles open={isDelete} setOpen={setIsDelete} id={rowId} />}
        </>
    );
}
