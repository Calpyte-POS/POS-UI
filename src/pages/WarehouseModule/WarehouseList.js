import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom/dist';
import './index.css';
import axios from '../../utils/axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CommonTable from 'components/CommonTable';
import { Box } from '../../../node_modules/@mui/material/index';
import WarehouseAdd from './WarehouseAdd';
import WarehouseDelete from './WarehouseDelete';
import { animations } from 'react-animation';
import { useAxios } from 'components/useAxios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

export default function WarehouseList({ categoryTrigger }) {
    const navigate = useNavigate();
    const [displayValue, setDisplayValue] = useState([]);
    // const [search, setSearch] = useState('');
    const columns = ['userId', 'title'];
    const axios = useAxios();

    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [rowId, setRowId] = useState({});
    const displayedColumns = ['Name', 'Email', 'Phone Number', 'Country', 'City', 'Zip Code'];
    const definedColumns = ['name', 'email', 'phoneNumber', 'country', 'city', 'zipCode'];
    const [isComplete, setIsComplete] = useState(false);
    const searchColumns = [
        { name: 'name', canShow: true },
        { name: 'email', canShow: true },
        { name: 'phoneNumber', canShow: true },
        { name: 'country', canShow: true },
        { name: 'city', canShow: true },
        { name: 'zipCode', canShow: true }
    ];
    const [open, setOpen] = useState(false);
    var postPerPage = 10;
    var pageNumber = 1;
    var filter = [];

    const randomNumber = () => {
        return Math.floor(Math.random() * 100 + 1);
    };

    const getWarehouseData = async () => {
        let data = {
            draw: randomNumber(),
            filter: filter,
            pageNo: pageNumber,
            pageSize: postPerPage
        };
        await axios
            .post('warehouse', data)
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
        getWarehouseData();
    }

    const search = (event) => {
        filter = event;
        getWarehouseData();
    };

    useEffect(() => {
        if (categoryTrigger) {
            categoryTrigger.subscribe(() => rowAction());
        }
        setOpen(false);
        getWarehouseData();
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
                                        Create Warehouse
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
                                <WarehouseAdd rowId={rowId} setOpen={setOpen} />
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
    );
}
