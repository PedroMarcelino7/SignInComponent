import React from 'react'
import Input from '@mui/joy/Input';

const InsertCodeInput = () => {
    return (
        <Input
            type="number"
            onInput={(e) => {
                if (e.target.value.length > 1) {
                    e.target.value = e.target.value.slice(0, 1);
                }
            }}
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