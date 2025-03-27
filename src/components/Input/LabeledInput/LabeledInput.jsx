import React from 'react'

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';

const LabeledInput = ({ label, type, name, complete, value, onchange }) => {
    return (
        <FormControl required>
            <FormLabel>{label}</FormLabel>
            <Input
                type={type}
                name={name}
                autoComplete={complete}
                value={value}
                onChange={(e) => onchange(e.target.value)}
            />
        </FormControl >
    )
}

export default LabeledInput