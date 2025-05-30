// React
import * as React from 'react';
import { useEffect, useState } from 'react';

// Ui components
import LabeledInput from '../../components/Input/LabeledInput/LabeledInput'
import RedirectLink from '../../components/Link/RedirectLink'

// Libs
import { useLocation, useNavigate } from 'react-router-dom';

// Styles
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';

// Icons
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';


//-- SUPABASE
import { createClient } from "@supabase/supabase-js";
import { toast } from 'react-toastify';

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseKEY = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseURL, supabaseKEY);
//-- SUPABASE



//-- Color Scheme Toggle
function ColorSchemeToggle(props) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return (
        <IconButton
            aria-label="toggle light/dark mode"
            size="sm"
            variant="outlined"
            disabled={!mounted}
            onClick={(event) => {
                setMode(mode === 'light' ? 'dark' : 'light');
                onClick?.(event);
            }}
            {...other}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}
//-- Color Scheme Toggle



//-----
const ChangePassword = ({ company }) => {
    //-- Variables
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = location.state || {};

    const [password, setPassword] = useState('')
    const [matchingPassword, setMatchingPassword] = useState(true)

    const [passwordWeakness, setPasswordWeakness] = useState(0)

    const [changed, setChanged] = useState('')
    //-- Variables



    //-- Use Effects
    useEffect(() => {
        document.title = `Change Password - ${company}`;
    }, [company]);
    //-- Use Effects



    //-- Functions
    const passwordValidation = (password) => {
        let weakness = 0;

        if (password.length >= 16) {
            weakness += 15;
        }

        if (/[!@#$%&*(){}\[\]/|:;,.+\-]/.test(password)) {
            weakness += 15;
        }

        if (/[0-9]/.test(password)) {
            weakness += 10;
        }

        if (/[A-Z]/.test(password)) {
            weakness += 5;
        }

        if (/[a-z]/.test(password)) {
            weakness += 5;
        }

        setPasswordWeakness(weakness);
        setPassword(password)
    };

    const handleMatchingPassword = (confirmPassword) => {
        confirmPassword == password ? setMatchingPassword(true) : setMatchingPassword(false)
    }
    //-- Functions



    //-- Change Password
    const handleSubmit = async (data) => {
        const { password } = data

        if (matchingPassword) {
            const { data, error } = await supabase
                .from('Users')
                .update({ user_password: password })
                .eq('user_email', email)

            if (error) {
                console.log('Error:', error)

                toast.error('Error changing password!')
            } else {
                toast.success('Password changed successfully!')
                navigate('/')
            }

            // try {
            //     const response = await fetch('http://localhost:3002/users/changePassword', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             userPassword: password,
            //             userEmail: email
            //         }),
            //     });

            //     if (!response.ok) {
            //         throw new Error(`Error: ${response.statusText}`);
            //     }

            //     const result = await response.json();

            //     setChanged('success')
            //     setTimeout(() => {
            //         setChanged('')
            //         navigate('/login')
            //     }, 2000)
            // } catch (error) {
            //     console.error('Error:', error);

            //     setChanged('error')
            //     setTimeout(() => {
            //         setChanged('')
            //     }, 1500)
            // }
        }
    }
    //-- Change Password

    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.5s',
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width: { xs: '100%', md: '50vw' },
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(200 200 200 / 0.4)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                            <IconButton variant="soft" color="primary" size="sm">
                                <BadgeRoundedIcon />
                            </IconButton>
                            <Typography level="title-lg">{company}</Typography>
                        </Box>
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        {changed == 'success' ? <Alert color="success">Password successfully changed.</Alert> : (changed == 'error' && <Alert color="danger">Password change error.</Alert>)}
                        <Stack gap={4} sx={{ mb: 2 }}>
                            <Stack gap={1}>
                                <Typography component="h1" level="h3">
                                    Change Password
                                </Typography>
                                <Typography level="body-sm">
                                    Return to {' '}
                                    <RedirectLink path='../login' label='Sign in!' />
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const formElements = event.currentTarget.elements

                                const data = {
                                    password: formElements.password.value,
                                }

                                handleSubmit(data)
                            }}>
                                <LabeledInput
                                    label="New Password"
                                    type="text"
                                    name="password"
                                    complete="new-password"
                                    value={password}
                                    onchange={passwordValidation}
                                />
                                {passwordWeakness > 0 && (
                                    <Typography
                                        color={passwordWeakness < 20 ? 'danger' : (passwordWeakness < 50 ? 'warning' : 'success')}
                                    >
                                        {passwordWeakness < 20 ? 'Weak Password.' : (passwordWeakness < 50 ? 'Medium Password.' : 'Strong Password.')}
                                    </Typography>
                                )}

                                <LabeledInput
                                    label="Confirm Password"
                                    type="text"
                                    name="confirmPassword"
                                    complete="new-password"
                                    onchange={handleMatchingPassword}
                                />
                                {!matchingPassword && <Typography>Password must match.</Typography>}

                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Button type="submit" fullWidth>
                                        Change password
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            © {company} {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: { xs: 0, md: '50vw' },
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                    },
                })}
            />
        </CssVarsProvider>
    );
}

export default ChangePassword;
