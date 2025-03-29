// React
import * as React from 'react';

// Ui components
import IconedCard from '../Cards/IconedCard';

// Styles
import { useColorScheme } from '@mui/joy';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';

// Icons
import CloseIcon from '@mui/icons-material/Close';

export default function BasicModal({ user, onClose }) {
    //-- Variables
    const { mode } = useColorScheme();
    //-- Variables

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
                    {user.user_access === 0 &&
                        <IconedCard
                            type={'admin'}
                        />
                    }

                    <IconedCard
                        type={'kanban'}
                    />
                </Box>
            </Box>
        </Modal>
    );
}

