// React
import * as React from 'react';

// Libs
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// Styles
import { useColorScheme } from '@mui/joy';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

export default function BasicModal({ onClose }) {
    //-- Variables
    const { mode } = useColorScheme();

    const navigate = useNavigate();
    //-- Variables

    const navigateTo = (path) => {
        toast.success("Login successful!")
        navigate(path)
    }

    return (
        <Modal open={true}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: 400,
                maxWidth: 550,
                padding: 4,
                borderRadius: '5px',
                border: 'none',
                backgroundColor: mode === 'dark' ? '#08080A' : '#E9E9E9'
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <Typography>
                        Choose your access.
                    </Typography>

                    <Box onClick={onClose} sx={{ cursor: 'pointer' }} >
                        <CloseIcon />
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                    <Box onClick={() => navigateTo('/')}
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
                        <AdminPanelSettingsIcon />

                        <Typography>
                            Administrative Panel
                        </Typography>
                    </Box>

                    <Box onClick={() => navigateTo('/')}
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
                        <ViewKanbanIcon />

                        <Typography>
                            Kanban Task Management
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

