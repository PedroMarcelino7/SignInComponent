// React
import React from 'react'

// Libs
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// Styles
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

// Icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

const IconedCard = ({ type }) => {
    //-- Variables
    const navigate = useNavigate();
    //-- Variables

    const navigateTo = (path) => {
        toast.success("Login successful!");
        navigate(path);
    }

    const renderIconAndText = () => {
        switch (type) {
            case 'admin':
                return { icon: <AdminPanelSettingsIcon />, text: 'Administrative Panel', path: '/' };
            case 'kanban':
                return { icon: <ViewKanbanIcon />, text: 'Kanban Task Management', path: '/' };
            default:
                return { icon: null, text: 'Unknown', path: '/' };
        }
    };

    const { icon, text, path } = renderIconAndText();

    return (
        <Box onClick={() => navigateTo(path)}
            sx={{
                backgroundColor: '#171A1C',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>

            {icon}
            <Typography>{text}</Typography>
        </Box>
    )
}

export default IconedCard;
