// React
import * as React from 'react';
import { useEffect, useState } from 'react';

// Ui components
import LabeledInput from '../../components/Input/LabeledInput/LabeledInput';
import RedirectLink from '../../components/Link/RedirectLink'
import PasswordInput from '../../components/Input/PasswordInput/PasswordInput';
import BasicModal from '../../components/Modal/Modal';

// Styles
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

// Icons
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from '../../assets/Icons/GoogleIcon';

// Firebase
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';


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
const Login = ({ company }) => {
    //-- Variables
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false)
    //-- Variables



    //-- Use Effects
    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    useEffect(() => {
        document.title = `Login - ${company}`;
    }, [company]);
    //-- Use Effects



    //-- Functions
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleCloseModal = () => setShowModal(false)
    //-- Functions



    //-- Google Login
    const loginGoogle = async () => {
        const provider = new GoogleAuthProvider()

        try {
            const result = await signInWithPopup(auth, provider)

            console.log("Usuário logado:", result.user)
            setUser(result.user)
            setShowModal(true)
        } catch (error) {
            console.error("Erro ao logar:", error)
        }
    }
    //-- Google Login

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
                        <Stack gap={4} sx={{ mb: 2 }}>
                            <Stack gap={1}>
                                <Typography component="h1" level="h3">
                                    Sign in
                                </Typography>
                                <Typography level="body-sm">
                                    New to {company}?{' '}
                                    <RedirectLink path='/register' label='Sign Up!' />
                                </Typography>
                            </Stack>
                            <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                startDecorator={<GoogleIcon />}
                                onClick={loginGoogle}
                            >
                                Continue with Google
                            </Button>
                        </Stack>
                        <Divider
                            sx={(theme) => ({
                                [theme.getColorSchemeSelector('light')]: {
                                    color: { xs: '#FFF', md: 'text.tertiary' },
                                },
                            })}
                        >
                            or
                        </Divider>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()

                                    handleSubmit()
                                }}
                            >
                                <LabeledInput
                                    label='E-mail'
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onchange={setEmail}
                                />

                                <PasswordInput
                                    label="Password"
                                    name="password"
                                    complete="new-password"
                                    value={password}
                                    onchange={setPassword}
                                />

                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Checkbox size="sm" label="Remember me" name="persistent" />
                                        <RedirectLink path='/password' label='Forgot your password?' />
                                    </Box>
                                    <Button type="submit" fullWidth>
                                        Sign in
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

            {showModal && <BasicModal user={user} onClose={handleCloseModal} />}
        </CssVarsProvider>
    )
}

export default Login