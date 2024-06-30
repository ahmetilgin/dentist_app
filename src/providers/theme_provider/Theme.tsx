import { alpha, createTheme } from '@mui/material/styles';

const createCustomTheme = (mode: any) => {
    const isLight = mode === 'light';

    const primaryMain = isLight ? '#007bff' : '#90caf9';
    const secondaryMain = isLight ? '#28a745' : '#81c784';
    const errorMain = isLight ? '#dc3545' : '#f44336';
    const warningMain = isLight ? '#ffc107' : '#ffb74d';
    const infoMain = isLight ? '#17a2b8' : '#4fc3f7';
    const successMain = isLight ? '#28a745' : '#66bb6a';


    return createTheme({
        palette: {
            mode,
            primary: { main: primaryMain },
            secondary: { main: secondaryMain },
            error: { main: errorMain },
            warning: { main: warningMain },
            info: { main: infoMain },
            success: { main: successMain },
            text: {
                primary: isLight ? '#333333' : '#ffffff',
                secondary: isLight ? '#666666' : '#b0b0b0',
            },
            background: {
                default: isLight ? '#f8f9fa' : '#121212',
                paper: isLight ? '#ffffff' : '#1e1e1e',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: { fontWeight: 500, fontSize: '2.5rem', letterSpacing: '-0.01562em' },
            h2: { fontWeight: 500, fontSize: '2rem', letterSpacing: '-0.00833em' },
            h3: { fontWeight: 500, fontSize: '1.75rem', letterSpacing: '0em' },
            h4: { fontWeight: 500, fontSize: '1.5rem', letterSpacing: '0.00735em' },
            h5: { fontWeight: 500, fontSize: '1.25rem', letterSpacing: '0em' },
            h6: { fontWeight: 500, fontSize: '1rem', letterSpacing: '0.0075em' },
            subtitle1: { fontSize: '1rem', letterSpacing: '0.00938em' },
            subtitle2: { fontSize: '0.875rem', letterSpacing: '0.00714em' },
            body1: { fontSize: '1rem', letterSpacing: '0.00938em' },
            body2: { fontSize: '0.875rem', letterSpacing: '0.01071em' },
            button: { textTransform: 'none', fontWeight: 500, letterSpacing: '0.02857em' },
            caption: { fontSize: '0.75rem', letterSpacing: '0.03333em' },
            overline: { fontSize: '0.75rem', letterSpacing: '0.08333em', textTransform: 'uppercase' },
        },
        shape: {
            borderRadius: 8,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '8px 16px',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${alpha(isLight ? '#000000' : '#ffffff', 0.15)}`,
                        },
                    },
                    containedPrimary: {
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    },
                    outlined: {
                        borderWidth: 2,
                        '&:hover': {
                            borderWidth: 2,
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        boxShadow: isLight
                            ? '0px 2px 8px rgba(0, 0, 0, 0.08)'
                            : '0px 2px 8px rgba(255, 255, 255, 0.08)',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight ? '#ffffff' : '#1e1e1e',
                        color: isLight ? '#333333' : '#ffffff',
                        boxShadow: 'none',
                        borderBottom: `1px solid ${isLight ? '#e0e0e0' : '#333333'}`,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: isLight ? '#e0e0e0' : '#424242',
                                transition: 'all 0.2s ease-in-out',
                            },
                            '&:hover fieldset': {
                                borderColor: isLight ? primaryMain : alpha(primaryMain, 0.7),
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: primaryMain,
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: isLight ? '#666666' : '#b0b0b0',
                            '&.Mui-focused': {
                                color: primaryMain,
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: isLight ? '#333333' : '#ffffff',
                        },
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: isLight ? '#9e9e9e' : '#757575',
                        '&.Mui-checked': {
                            color: primaryMain,
                        },
                    },
                },
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        color: isLight ? '#9e9e9e' : '#757575',
                        '&.Mui-checked': {
                            color: primaryMain,
                        },
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        width: 42,
                        height: 26,
                        padding: 0,
                    },
                    switchBase: {
                        padding: 1,
                        '&.Mui-checked': {
                            transform: 'translateX(16px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: primaryMain,
                                opacity: 1,
                                border: 'none',
                            },
                        },
                    },
                    thumb: {
                        width: 24,
                        height: 24,
                    },
                    track: {
                        borderRadius: 13,
                        border: `1px solid ${isLight ? '#e0e0e0' : '#424242'}`,
                        backgroundColor: isLight ? '#e0e0e0' : '#424242',
                        opacity: 1,
                        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 16,
                        boxShadow: isLight
                            ? '0px 8px 24px rgba(0, 0, 0, 0.15)'
                            : '0px 8px 24px rgba(255, 255, 255, 0.15)',
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight ? '#e0e0e0' : '#424242',
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            backgroundColor: isLight ? alpha(primaryMain, 0.12) : alpha(primaryMain, 0.24),
                            '&:hover': {
                                backgroundColor: isLight ? alpha(primaryMain, 0.18) : alpha(primaryMain, 0.32),
                            },
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        boxShadow: isLight
                            ? '0px 4px 12px rgba(0, 0, 0, 0.05)'
                            : '0px 4px 12px rgba(255, 255, 255, 0.05)',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${isLight ? '#e0e0e0' : '#424242'}`,
                    },
                    head: {
                        fontWeight: 600,
                        backgroundColor: isLight ? '#f5f5f5' : '#2c2c2c',
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 500,
                        '&.Mui-selected': {
                            color: primaryMain,
                        },
                    },
                },
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: isLight ? '#666666' : '#b0b0b0', // Label rengi
                        '&.Mui-focused': {
                            color: primaryMain, // Odaklandığında label rengi
                        },
                    },
                },
            },
        },
    });
};

const lightTheme = createCustomTheme('light');
const darkTheme = createCustomTheme('dark');

export { darkTheme, lightTheme };

