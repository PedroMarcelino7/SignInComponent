// React
import * as React from 'react';
import { useEffect, useState } from 'react';

// Ui components
import CodeInput from '../../components/Input/CodeInput/CodeInput';
import RedirectLink from '../../components/Link/RedirectLink';

// Libs
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// Styles
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';

// Icons
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';


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
const InsertCode = ({ company }) => {
    //-- Variables
    const navigate = useNavigate();
    const location = useLocation();

    const accessKey = import.meta.env.VITE_EMAIL_ACCESS_KEY;

    const { code, email } = location.state || {};

    const [currentCode, setCurrentCode] = useState(code)
    const [validationCode, setValidationCode] = useState(Array(5))
    const [codeSent, setCodeSent] = useState('')
    //-- Variables



    //-- Use Effects
    useEffect(() => {
        document.title = `Change Password - ${company}`;
    }, [company]);

    useEffect(() => {
        validateCode();
    }, [validationCode]);
    //-- Use Effects



    //-- Functions
    const handleInputChange = (index, value) => {
        const newValidationCode = [...validationCode];
        newValidationCode[index] = value;
        setValidationCode(newValidationCode);
    }

    const validateCode = () => {
        if (JSON.stringify(validationCode) === JSON.stringify(currentCode.split(''))) {
            toast.success('Code validated!')
            navigate('/password/changepassword', { state: { email } })
        }
    };

    const resendCode = async () => {
        const formData = new FormData();

        formData.append("access_key", accessKey);

        formData.append("Email", email)

        const code = generateValidationToken()
        setCurrentCode(code)
        console.log('CODE:', code)
        formData.append("Validation Code", code)


        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            toast.success('Code resent successfully!')
        }
    }

    const generateValidationToken = () => {
        const code = []

        for (let i = 0; i < 5; i++) {
            const random = Math.floor(Math.random() * 10)

            code.push(random)
        }

        return code.join('')
    }
    //-- Functions

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
                        {codeSent == 'success' ? <Alert color="success">Code resent successfully.</Alert> : (codeSent == 'error' && <Alert color="danger">Code resent error.</Alert>)}
                        <Stack gap={4} sx={{ mb: 2 }}>
                            <Stack gap={1}>
                                <Typography component="h1" level="h3">
                                    Insert Code
                                </Typography>
                                <Typography level="body-sm">
                                    Return to {' '}
                                    <RedirectLink path='../login' label='Sign in!' />
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <form>
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Stack direction="row" spacing={2} display="flex" justifyContent="center" alignItems="center">
                                        {Array(5).fill(0).map((_, index) => (
                                            <CodeInput
                                                key={index}
                                                index={index}
                                                name={`input-${index}`}
                                                handleInputChange={handleInputChange}
                                            />
                                        ))}
                                    </Stack>
                                </Stack>
                            </form>
                        </Stack>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                }}
                            >
                                <label
                                    onClick={resendCode}
                                    style={{ textDecoration: 'none', color: '#227fdd', cursor: 'pointer' }}
                                >
                                    Resend code!
                                </label>
                            </Box>
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

export default InsertCode;
