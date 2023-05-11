import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Avatar, Badge, Stack, Typography } from '@mui/material/index';
import { useNavigate } from 'react-router-dom/dist';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { animations } from 'react-animation';
import Grid from '@mui/material/Grid';
import Form from 'react-bootstrap/Form';
import ImageUploading from 'react-images-uploading';
import { IconButton, InputAdornment } from '@mui/material/index';
import DeleteIcon from '@mui/icons-material/Delete';
import InputGroup from 'react-bootstrap/InputGroup';
import '../../WarehouseModule/index.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { useAxios } from '../../../components/useAxios';

// eslint-disable-next-line jsx-a11y/click-events-have-key-events
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductsAdd({ setOpen, rowId }) {
    const axios = useAxios();
    // const [open, setOpen] = React.useState(false);
    //const [value, setValue] = useState(null);
    // const [productCategorys, setProductCategorys] = useState([]);
    // const [brands, SetBrands] = useState([]);
    // const [barCodes, setBarCodes] = useState([]);
    // const [productUnits, setProductUnits] = useState([]);
    // const [saleUnits, setSaleUnits] = useState([]);
    // const [purchaseUnits, setPurchaseUnits] = useState([]);
    // const [taxTypes, settaxTypes] = useState([]);
    // const [warehouses, setWarehouses] = useState([]);
    // const [suppliers, setSuppliers] = useState([]);
    // const [status, setStatus] = useState([]);
    const [values, setValues] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        name: '',
        code: '',
        productCategory: '',
        brand: '',
        barcodeSymbology: '',
        productCost: '',
        productPrice: '',
        productUnit: '',
        saleUnit: '',
        purchaseUnit: '',
        stockAlert: '',
        orderTax: '',
        taxType: '',
        quantityLimitation: '',
        textArea: '',
        warehouse: '',
        supplier: '',
        productQuantity: '',
        status: ''
    });

    const [images, setImages] = React.useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const image = document.getElementById('image');
            image.src = URL.createObjectURL(event.target.files[0]);
        }
    };

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formValue['id'] = rowId ? rowId : null;
        axios
            .post('sub-category', formValue)
            .then((res) => {
                console.log(res);
                toast.sucess('Request Successful');
                setOpen(false);
            })
            .catch((err) => console.log(err));
    };

    function getValueById(id) {
        axios
            .get('sub-category/by-category?id=' + id)
            .then((res) => {
                console.log(res);
                setFormValue({
                    name: res?.data?.name,
                    code: res?.data?.code
                });
            })
            .catch((err) => console.log(err));
    }

    function getValues() {
        axios
            .get('sub-category/get-all')
            .then((res) => {
                setValues(res?.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getValues();
        if (rowId) {
            getValueById();
        }
    }, []);

    return (
        <>
            <Stack flexDirection="row" justifyContent="space-between">
                <Typography varient="p" sx={{ padding: '10px', fontWeight: 'bold ' }}>
                    Create Products
                </Typography>
                <Button onClick={() => setOpen(false)} variant="outlined" color="primary">
                    Back
                </Button>
            </Stack>

            <form>
                <Box sx={{ padding: '20px 0px 0px 0px' }}>
                    <Grid
                        sx={{
                            bgcolor: 'white',
                            dimensions: '100% 100%',
                            animation: animations.fadeInUp
                        }}
                    >
                        <div style={{ padding: '2%' }}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ minHeight: '50px', padding: '10px' }}>
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
                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ minHeight: '50px', padding: '10px' }}>
                                            <Form.Label>Code:</Form.Label>
                                            <FormControl fullWidth>
                                                <TextField
                                                    placeholder="Enter Code"
                                                    varient="outlined"
                                                    size="small"
                                                    name="code"
                                                    value={formValue.code}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            {/* <Form.Label>Product Category</Form.Label> */}
                                            {/* <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={formValue}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                options={products}
                                                getOptionLabel={(book) => `${book.name}`}
                                                size="small"
                                                renderInput={(params) => <TextField {...params} />}
                                            /> */}
                                            {/* <Select
                                                style={{ height: '40px' }}
                                                value={value}
                                                onChange={(event) => {
                                                    alert(JSON.stringify(event.target.value));
                                                    setValue(event.target.value);
                                                }}
                                                fullWidth
                                                placeholder="ENter Product Category"
                                            > 
                                                {/* {products.map((product, index) => (
                                                    <MenuItem key={index} value={product?.id}>
                                                        {product?.name}
                                                    </MenuItem>
                                                ))}
                                            </Select> */}
                                            <Form.Label>Product Category:</Form.Label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={formValue.productCategory ? formValue.productCategory : values[0]}
                                                onChange={(event, newValue) => {
                                                    setFormValue({ ...formValue, ['productCategory']: newValue });
                                                }}
                                                options={values}
                                                getOptionLabel={(productCategory) => `${productCategory.productCategory.name}`}
                                                size="small"
                                                renderInput={(params) => <TextField placeholder="Choose Product Category" {...params} />}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Brand:</Form.Label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={formValue.brand ? formValue.brand : values[0]}
                                                onChange={(event, newValue) => {
                                                    setFormValue({ ...formValue, ['brand']: newValue });
                                                }}
                                                options={values}
                                                getOptionLabel={(brand) => `${brand.brand.name}`}
                                                size="small"
                                                renderInput={(params) => <TextField placeholder="Choose Brand" {...params} />}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Barcode Symbology:</Form.Label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={formValue.barcodeSymbology ? formValue.barcodeSymbology : values[0]}
                                                onChange={(event, newValue) => {
                                                    setFormValue({ ...formValue, ['barcodeSymbology']: newValue });
                                                }}
                                                options={values}
                                                getOptionLabel={(barcodeSymbology) => `${barcodeSymbology.barcodeSymbology.name}`}
                                                size="small"
                                                renderInput={(params) => <TextField placeholder="Choose Barcode Symbology" {...params} />}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Product Cost:</Form.Label>
                                            <TextField
                                                fullWidth
                                                varient="outlined"
                                                size="small"
                                                placeholder="Enter Product Cost"
                                                name="productCost"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="end">$</InputAdornment>
                                                }}
                                                value={formValue.productCost}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Product Price:</Form.Label>
                                            <TextField
                                                fullWidth
                                                varient="outlined"
                                                size="small"
                                                placeholder="Enter Product Price"
                                                name="productPrice"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="end">$</InputAdornment>
                                                }}
                                                value={formValue.productPrice}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Product Unit:</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Autocomplete
                                                    fullWidth
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    value={formValue.productUnit ? formValue.productUnit : values[0]}
                                                    onChange={(event, newValue) => {
                                                        setFormValue({ ...formValue, ['productUnit']: newValue });
                                                    }}
                                                    options={values}
                                                    getOptionLabel={(productUnit) => `${productUnit.productUnit.name}`}
                                                    size="small"
                                                    renderInput={(params) => <TextField placeholder="Choose Product Unit" {...params} />}
                                                />
                                                <Button onClick={handleClickOpen} id="button-addon2">
                                                    Add
                                                </Button>
                                            </InputGroup>
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Sale Unit:</Form.Label>
                                            <Autocomplete
                                                fullWidth
                                                disablePortal
                                                id="combo-box-demo"
                                                value={formValue.saleUnit ? formValue.saleUnit : values[0]}
                                                onChange={(event, newValue) => {
                                                    setFormValue({ ...formValue, ['saleUnit']: newValue });
                                                }}
                                                options={values}
                                                getOptionLabel={(saleUnit) => `${saleUnit.saleUnit.name}`}
                                                size="small"
                                                renderInput={(params) => <TextField placeholder="Choose Sale Unit" {...params} />}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Purchase Unit:</Form.Label>
                                            <Autocomplete
                                                fullWidth
                                                disablePortal
                                                id="combo-box-demo"
                                                value={formValue.purchaseUnit ? formValue.productUnit : values[0]}
                                                onChange={(event, newValue) => {
                                                    setFormValue({ ...formValue, ['purchaseUnit']: newValue });
                                                }}
                                                options={values}
                                                getOptionLabel={(purchaseUnit) => `${purchaseUnit.purchaseUnit.name}`}
                                                size="small"
                                                renderInput={(params) => <TextField placeholder="Choose Purchase Unit" {...params} />}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ minHeight: '50px', padding: '10px' }}>
                                            <Form.Label>Stock Alert:</Form.Label>
                                            <FormControl fullWidth>
                                                <TextField
                                                    placeholder="Enter Code"
                                                    varient="outlined"
                                                    size="small"
                                                    name="stockAlert"
                                                    type="number"
                                                    value={formValue.stockAlert}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Order Tax:</Form.Label>
                                            <TextField
                                                fullWidth
                                                varient="outlined"
                                                size="small"
                                                placeholder="Enter Order Tax"
                                                name="orderTax"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="end">%</InputAdornment>
                                                }}
                                                value={formValue.orderTax}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                            <Form.Label>Tax Type:</Form.Label>
                                            <Autocomplete
                                                fullWidth
                                                disablePortal
                                                id="combo-box-demo"
                                                value={formValue.taxType ? formValue.taxType : values[0]}
                                                onChange={(event, newValue) => {
                                                    setFormValue({ ...formValue, ['taxType']: newValue });
                                                }}
                                                options={values}
                                                getOptionLabel={(taxType) => `${taxType.taxType.name}`}
                                                size="small"
                                                renderInput={(params) => <TextField placeholder="Choose Tax Type" {...params} />}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ minHeight: '50px', padding: '10px' }}>
                                            <Form.Label>Quantity Limitation:</Form.Label>
                                            <FormControl fullWidth>
                                                <TextField
                                                    placeholder="Enter Quantity Limitation"
                                                    varient="outlined"
                                                    size="small"
                                                    name="quantityLimitation"
                                                    type="number"
                                                    value={formValue.quantityLimitation}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </div>

                                        <div className="col-md-12 col-sm-6 col-xs-6" style={{ minHeight: '50px', padding: '10px' }}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Notes:</Form.Label>
                                                <Form.Control as="textarea" name="textArea" rows={3} />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1% 2% 2% 1%' }} className="align-right">
                                        <Button onClick={handleSubmit} type="submit" className="btn1" variant="contained" color="primary">
                                            Save
                                        </Button>
                                        <Button onClick={() => setOpen(false)} variant="outlined" color="primary">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className="col-md-4">
                                    <input class="form-control" type="file" id="formFileMultiple" multiple onChange={onImageChange} />
                                    <div>
                                        <img id="image" className="img-fluid" src="#" alt="ico" />
                                    </div>
                                </div> */}

                                <div className="col-md-4">
                                    <ImageUploading multiple value={images} onChange={onChange} dataURLKey="data_url">
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps
                                        }) => (
                                            // write your building UI
                                            <div>
                                                <p>Multiple Image:</p>
                                                <div style={{ border: 'solid 1px grey', borderRadius: '5px', display: 'flex' }}>
                                                    <Button
                                                        size="small"
                                                        type="button"
                                                        sx={{ width: '30%' }}
                                                        style={isDragging ? { color: 'red' } : undefined}
                                                        onClick={onImageUpload}
                                                        variant="contained"
                                                        {...dragProps}
                                                    >
                                                        Choose File
                                                    </Button>
                                                    <Button type="button" onClick={onImageUpload} style={{ width: '70%' }}>
                                                        {imageList?.length}
                                                    </Button>
                                                </div>

                                                <br></br>
                                                <br></br>
                                                <Stack flexDirection="row" gap={1}>
                                                    {imageList.map((image, index) => (
                                                        <Badge
                                                            badgeContent={
                                                                <IconButton onClick={() => onImageRemove(index)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            }
                                                        >
                                                            <Avatar
                                                                sx={{ height: '60px', width: '60px' }}
                                                                src={image['data_url']}
                                                                // variant="rounded"
                                                            ></Avatar>
                                                        </Badge>
                                                    ))}
                                                </Stack>
                                            </div>
                                        )}
                                    </ImageUploading>

                                    <div style={{ padding: '10px' }}>
                                        <Form.Label>Warehouse:</Form.Label>
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            id="combo-box-demo"
                                            value={formValue.warehouse ? formValue.warehouse : values[0]}
                                            onChange={(event, newValue) => {
                                                setFormValue({ ...formValue, ['warehouse']: newValue });
                                            }}
                                            options={values}
                                            getOptionLabel={(warehouse) => `${warehouse.warehouse.name}`}
                                            size="small"
                                            renderInput={(params) => <TextField placeholder="Choose Warehouse" {...params} />}
                                        />
                                    </div>

                                    <div style={{ padding: '10px' }}>
                                        <Form.Label>Supplier:</Form.Label>
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            id="combo-box-demo"
                                            value={formValue.supplier ? formValue.supplier : values[0]}
                                            onChange={(event, newValue) => {
                                                setFormValue({ ...formValue, ['supplier']: newValue });
                                            }}
                                            options={values}
                                            getOptionLabel={(supplier) => `${supplier.supplier.name}`}
                                            size="small"
                                            renderInput={(params) => <TextField placeholder="Choose Supplier" {...params} />}
                                        />
                                    </div>

                                    <div style={{ minHeight: '50px', padding: '10px' }}>
                                        <Form.Label>Add Product Quantity:</Form.Label>
                                        <FormControl fullWidth>
                                            <TextField
                                                placeholder="Enter Add Product Quantity"
                                                varient="outlined"
                                                size="small"
                                                name="productQuantity"
                                                type="number"
                                                value={formValue.productQuantity}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </div>

                                    <div style={{ padding: '10px' }}>
                                        <Form.Label>Status:</Form.Label>
                                        <Autocomplete
                                            fullWidth
                                            disablePortal
                                            id="combo-box-demo"
                                            value={formValue.status ? formValue.status : values[0]}
                                            onChange={(event, newValue) => {
                                                setFormValue({ ...formValue, ['status']: newValue });
                                            }}
                                            options={values}
                                            getOptionLabel={(status) => `${status.status.name}`}
                                            size="small"
                                            renderInput={(params) => <TextField placeholder="Choose Status" {...params} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Dialog
                        // open={open}
                        setOpen={false}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{'Create Unit'}</DialogTitle>
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
                            <div className="col-md-12 col-sm-6 col-xs-6" style={{ minHeight: '50px', padding: '10px' }}>
                                <Form.Label>Short Name:</Form.Label>
                                <FormControl fullWidth>
                                    <TextField
                                        placeholder="Enter Short Name"
                                        varient="outlined"
                                        size="small"
                                        name="name"
                                        value={formValue.name}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </div>
                            <div className="col-md-12 col-sm-6 col-xs-6" style={{ padding: '10px' }}>
                                <Form.Label>Tax Type:</Form.Label>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    value={formValue.status ? formValue.status : status[0]}
                                    onChange={(event, newValue) => {
                                        setFormValue({ ...formValue, ['taxType']: newValue });
                                    }}
                                    options={status}
                                    getOptionLabel={(status) => `${status.name}`}
                                    size="small"
                                    renderInput={(params) => <TextField placeholder="Choose Tax Type" {...params} />}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Save</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                <h2>{console.log(formValue)}</h2>
            </form>
        </>
    );
}
