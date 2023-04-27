import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

export default function Dashboard() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                padding: '1%',
                backgroundColor: 'white',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
                borderRadius: '5px'
            }}
        >
            <Stack variant="row" spacing={3}>
                <Skeleton variant="rounded" style={{ width: '100%', height: '200px' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
            </Stack>
        </Box>
    );
}
