import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom/dist';
import '../../WarehouseModule/index.css';
import { Box } from '@mui/material/index';
import { useAxios } from '../../../components/useAxios';
import CommonTable from 'components/CommonTable';
import { animations } from 'react-animation';
import ProductsAdd from './ProductsAdd';

export default function ProductsList({ categoryTrigger }) {
    const navigate = useNavigate();
    const [displayValue, setDisplayValue] = useState([]);
    const columns = ['userId', 'title'];
    const axios = useAxios();
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [rowId, setRowId] = useState({});
    const displayedColumns = ['Name', 'Code', 'Brand', 'Price', 'Product Unit', 'In Stock'];
    const definedColumns = ['name', 'code', 'brand', 'productPrice', 'productUnit', 'stockAlert'];
    const [isComplete, setIsComplete] = useState(false);
    const searchColumns = [
        { name: 'Name', canShow: true },
        { name: 'Code', canShow: true },
        { name: 'Brand', canShow: true },
        { name: 'ProductPrice', canShow: true },
        { name: 'ProductUnit', canShow: true },
        { name: 'StockAlert', canShow: true }
    ];
    const [open, setOpen] = useState(false);
    const [isDelete, setIsDelete] = React.useState(false);
    var postPerPage = 10;
    var pageNumber = 1;
    var filter = [];

    const randomNumber = () => {
        return Math.floor(Math.random() * 100 + 1);
    };

    const getProoductData = async () => {
        let data = {
            draw: randomNumber(),
            filter: filter,
            pageNo: pageNumber,
            pageSize: postPerPage
        };
        await axios
            .post('sub-category/getSubCategories', data)
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
        getProoductData();
    }

    const search = (event) => {
        filter = event;
        getProoductData();
    };

    useEffect(() => {
        if (categoryTrigger) {
            categoryTrigger.subscribe(() => rowAction());
        }
        setOpen(false);
        getProoductData();
    }, []);

    return (
        <>
            <Box style={{ animation: !open ? 'none' : animations.popIn }}>
                {
                    {
                        false: (
                            <div>
                                <div className="align-right">
                                    <Button onClick={() => rowAction({ name: 'add', value: null })} variant="contained" color="primary">
                                        Create Product
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
                                <ProductsAdd rowId={rowId} setOpen={setOpen} />
                            </div>
                        )
                    }[open]
                }
            </Box>
            {isDelete && <WarehouseDelete open={isDelete} setOpen={setIsDelete} id={rowId} />}
        </>
    );
}
