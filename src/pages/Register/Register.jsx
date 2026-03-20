// React
import * as React from 'react';
import { useEffect, useState } from 'react';

// Ui components
import RedirectLink from '../../components/Link/RedirectLink';
import LabeledInput from '../../components/Input/LabeledInput/LabeledInput';
import PasswordInput from '../../components/Input/PasswordInput/PasswordInput';
import BasicModal from '../../components/Modal/Modal';

// Libs
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// Styles
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';

// Icons
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from '../../assets/Icons/GoogleIcon';

// Firebase
import { auth } from '../../../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';



//-- Color Scheme Toggle
function ColorSchemeToggle(props) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => setMounted(true), []);

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
const Register = ({ company }) => {
    //-- Variables
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [matchingPassword, setMatchingPassword] = useState(true)
    const [passwordWeakness, setPasswordWeakness] = useState(0)

    const [showPassword, setShowPassword] = useState(false);

    const [showModal, setShowModal] = useState(false)
    //-- Variables



    //-- Use Effects
    useEffect(() => {
        document.title = `Register - ${company}`;
    }, []);

    useEffect(() => {
        passwordValidation()
    }, [password])

    useEffect(() => {
        handleMatchingPassword()
    }, [password, passwordConfirm])
    //-- Use Effects



    //-- Functions
    const handleCloseModal = () => setShowModal(false)

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show)
    }

    const handleMatchingPassword = () => {
        passwordConfirm === password ? setMatchingPassword(true) : setMatchingPassword(false)
    }

    const passwordValidation = () => {
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
    //-- Functions



    //-- Register
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let newUser = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(newUser.user, {
                displayName: name
            })

            setUser(newUser.user)

            console.log("Usuário criado:", newUser.user)
            toast.success('User registered.')
            navigate('/login')
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                toast.error('Este e-mail já está em uso.')
            } else if (err.code === 'auth/invalid-email') {
                toast.error('E-mail inválido.')
            } else if (err.code === 'auth/weak-password') {
                toast.error('A senha deve ter pelo menos 6 caracteres.')
            } else {
                toast.error('Erro ao criar usuário.')
            }
        }
    }
    //-- Register



    //-- Google Register
    const registerGoogle = async () => {
        const provider = new GoogleAuthProvider()

        try {
            const result = await signInWithPopup(auth, provider)

            console.log("Usuário logado:", result.user)
            setUser(result.user)
            setShowModal(true)
            toast.success("Successfully registered!");
        } catch (error) {
            console.error("Erro ao logar:", error)
        }
    }
    //-- Google Register

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
                                    Sign up
                                </Typography>
                                <Typography level="body-sm">
                                    Already registered?{' '}
                                    <RedirectLink path='/login' label='Sign in!' />
                                </Typography>
                            </Stack>
                            <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                startDecorator={<GoogleIcon />}
                                onClick={registerGoogle}
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
                                onSubmit={(event) => handleSubmit(event)}
                            >
                                <LabeledInput
                                    label="Name"
                                    type="text"
                                    name="name"
                                    complete="name"
                                    value={name}
                                    onchange={setName}
                                />

                                <LabeledInput
                                    label="E-mail"
                                    type="email"
                                    name="email"
                                    complete="email"
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
                                {passwordWeakness > 0 && (
                                    <Typography
                                        color={passwordWeakness < 20 ? 'danger' : (passwordWeakness < 50 ? 'warning' : 'success')}
                                    >
                                        {passwordWeakness < 20 ? 'Weak Password.' : (passwordWeakness < 50 ? 'Medium Password.' : 'Strong Password.')}
                                    </Typography>
                                )}

                                <PasswordInput
                                    label="Confirm Password"
                                    name="passwordConfirm"
                                    complete="new-password"
                                    value={passwordConfirm}
                                    onchange={setPasswordConfirm}
                                />
                                {!matchingPassword && <Typography>Password must match.</Typography>}

                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Button type="submit" fullWidth>
                                        Sign up
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

export default Register