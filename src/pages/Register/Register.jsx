import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
// import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';

import RedirectLink from '../../components/Link/RedirectLink';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '../../assets/Icons/GoogleIcon';

//-- SUPABASE
import { createClient } from "@supabase/supabase-js";
import LabeledInput from '../../components/Input/LabeledInput/LabeledInput';
import PasswordInput from '../../components/Input/PasswordInput/PasswordInput';

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseKEY = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseURL, supabaseKEY);
//-- SUPABASE

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

const Register = ({ company }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [matchingPassword, setMatchingPassword] = useState(true)

    useEffect(() => {
        document.title = `Register - ${company}`;
    }, []);

    const navigate = useNavigate();

    const [registered, setRegistered] = useState('')

    const handleSubmit = async () => {
        if (!email) {
            alert('Invalid email');
            return;
        }

        if (email.length < 10 || email.length > 255) {
            alert('Email length should be between 10 and 255');
            return;
        }

        if (!password || password == '') {
            alert('Invalid password');
            return;
        }

        if (password !== passwordConfirm) {
            alert('Password must match');
            return;
        }

        const newUser = {
            user_name: name,
            user_email: email,
            user_password: password
        }

        const { data, error } = await supabase.from("Users").insert([newUser]).single()

        if (error) {
            console.log("Error:", error)
        } else {
            setName("")
            setEmail("")
            setPassword("")
            setPasswordConfirm("")

            navigate('/')
        }

        // try {
        //     const response = await fetch('http://localhost:3002/users/post', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             userEmail: email,
        //             userPassword: password,
        //             userPasswordConfirm: passwordConfirm
        //         }),
        //     });

        //     if (!response.ok) {
        //         throw new Error(`Error: ${response.statusText}`);
        //     }

        //     const result = await response.json();

        //     console.log('Success:', result);

        //     setRegistered('success')
        //     setTimeout(() => {
        //         setRegistered('')
        //         navigate('/login')
        //     }, 2000)
        // } catch (error) {
        //     console.error('Error:', error);

        //     setRegistered('error')
        //     setTimeout(() => {
        //         setRegistered('')
        //     }, 1500)
        // }
    }

    const registerWithGoogle = async (credential) => {
        const email = credential.email

        try {
            const response = await fetch('http://localhost:3002/users/googleauth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: email
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();

            localStorage.setItem('authToken', result.token);

            setRegistered('success')
            setTimeout(() => {
                setRegistered('')
                navigate('/')
            }, 1500)
        } catch (error) {
            console.error('Error:', error);

            setRegistered('error')
            setTimeout(() => {
                setRegistered('')
            }, 5000)
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [passwordWeakness, setPasswordWeakness] = React.useState(0)

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

    const handleMatchingPassword = () => {
        passwordConfirm === password ? setMatchingPassword(true) : setMatchingPassword(false)
    }

    useEffect(() => {
        passwordValidation()
    }, [password])

    useEffect(() => {
        handleMatchingPassword()
    }, [passwordConfirm])

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
                        {registered == 'success' ? <Alert color="success">Successfully registered.</Alert> : (registered == 'error' && <Alert color="danger">User registration error.</Alert>)}
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
                            >
                                Continue with Google
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        '& > div': { height: '100%' }
                                    }}
                                >
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            const decoded = jwtDecode(credentialResponse?.credential);
                                            console.log(decoded);
                                            registerWithGoogle(decoded)
                                        }}
                                        onError={() => {
                                            console.log('Register Failed');
                                        }}
                                    />
                                </Box>
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
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    const data = {
                                        email: formElements.email.value,
                                        password: formElements.password.value,
                                        passwordConfirm: formElements.passwordConfirm.value
                                    };

                                    handleSubmit(data)
                                }}
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
                                    showpassword={showPassword}
                                    onclick={handleClickShowPassword}
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
                                    showpassword={showPassword}
                                    onclick={handleClickShowPassword}
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
        </CssVarsProvider>
    )
}

export default Register