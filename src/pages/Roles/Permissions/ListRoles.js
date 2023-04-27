import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom/dist';
import '../../WarehouseModule/index.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

export default function ListRoles() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ padding: '20px' }}>
                <Stack flexDirection="row" justifyContent="space-between">
                    <input
                        style={{ width: '500px' }}
                        type="text"
                        placeholder="Search here"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        // sx={{ width: 600 }}
                        // inputprops={{
                        //     endAdornment: (
                        //         <InputAdornment position="start">
                        //             <SearchIcon />
                        //         </InputAdornment>
                        //     )
                        // }}
                    />
                    <Button onClick={() => navigate('/roles/add')} variant="contained" color="primary">
                        Create Role
                    </Button>
                </Stack>
            </div>
        </>
    );
}
