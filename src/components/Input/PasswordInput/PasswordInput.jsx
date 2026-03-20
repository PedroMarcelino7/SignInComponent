import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const PasswordInput = ({ label, name, complete, value, onchange }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <FormControl required>
            <FormLabel>{label}</FormLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                name={name}
                autoComplete={complete}
                value={value}
                onChange={(e) => onchange(e.target.value)}
                endDecorator={
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                }
            />
        </FormControl>
    )
}

export default PasswordInput