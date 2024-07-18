import React from 'react'
import Input from '@mui/joy/Input';

const InsertCodeInput = ({ name, index, handleInputChange }) => {
    return (
        <Input
            type="number"
            name={name}
            onInput={(e) => {
                if (e.target.value.length > 1) {
                    e.target.value = e.target.value.slice(0, 1);
                }
            }}
            onChange={(e) => handleInputChange(index, e.target.value)}
            sx={{
                fontSize: 40,
                padding: 1,
                '& input': {
                    textAlign: 'center'
                }
            }}
        />
    )
}

export default InsertCodeInput