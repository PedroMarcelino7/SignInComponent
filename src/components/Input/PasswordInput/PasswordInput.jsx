import React from 'react'

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({ label, name, complete, value, onchange, onclick, showpassword }) => {
    return (
        <FormControl required>
            <FormLabel>{label}</FormLabel>
            <Input
                type={showpassword ? 'text' : 'password'}
                name={name}
                autoComplete={complete}
                value={value}
                onChange={(e) => onchange(e.target.value)}
                endDecorator={
                    <IconButton
                        onClick={onclick}
                        tabIndex={-1}
                    >
                        {showpassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                }
            />
        </FormControl>
    )
}

export default PasswordInput