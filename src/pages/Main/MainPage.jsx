import { Box, Button, CssBaseline, CssVarsProvider, Typography } from '@mui/joy';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant='h1' component='h1' fontSize='5rem'>
                    Welcome
                </Typography>
                <Button type="submit" onClick={logout}>
                    <Typography fontSize='1.5rem'>
                        Logout
                    </Typography>
                </Button>
            </Box>
        </CssVarsProvider>
    )
}

export default MainPage