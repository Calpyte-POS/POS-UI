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
                setRowId(action.value);
                setOpen(true);
                break;
            case 'delete':
                alert('Are you sure to delete');
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

            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>User Id</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayValue
                            .filter((item) => {
                                if (search === '') {
                                    return item;
                                } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
                                    return item;
                                }
                            })
                            .map((row, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        {columns.map((col, index) => {
                                            return (
                                                <StyledTableCell>
                                                    <p>{row[col]}</p>
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </>

        // <>
        //     <div style={{ padding: '20px' }}>
        //         <Stack flexDirection="row" justifyContent="space-between">
        //             <input
        //                 style={{ width: '500px' }}
        //                 type="text"
        //                 placeholder="Search here"
        //                 onChange={(e) => {
        //                     setSearch(e.target.value);
        //                 }}
        //                 // sx={{ width: 600 }}
        //                 // inputprops={{
        //                 //     endAdornment: (
        //                 //         <InputAdornment position="start">
        //                 //             <SearchIcon />
        //                 //         </InputAdornment>
        //                 //     )
        //                 // }}
        //             />
        //             <Button onClick={() => navigate('/roles/add')} variant="contained" color="primary">
        //                 Create Role
        //             </Button>
        //         </Stack>
        //     </div>
        // </>
    );
}
