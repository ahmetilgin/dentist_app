import { createTheme } from '@mui/material';
import { blue, blueGrey, grey, red } from '@mui/material/colors';


const mainColorLight = "#007bff";
const mainColorDark = "#90caf9"


// Light Theme for a Dentist Clinic Website
const lightTheme = createTheme({
    palette: {
        primary: {
            main: mainColorLight,  // Soft blue for a calming effect
        },
        secondary: {
            main: '#2f8100',  // Soft green, complementary to blue
        },
        background: {
            default: '#ffffff',  // White background for a clean look
            paper: '#f7f7f7',  // Light grey for paper elements
        },
        text: {
            primary: "#334f75",  // Dark grey for text to maintain readability
            secondary: '#2f8100',  // Soft green for secondary text
        },
        error: {
            main: red.A400,  // Red for errors, keeping it consistent with MUI defaults
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.4rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2.0rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.8rem',
            fontWeight: 500,
        },
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 'bold',
                },
                containedPrimary: {
                    backgroundColor: mainColorLight,
                    '&:hover': {
                        backgroundColor: blue[400],  // Slightly darker blue on hover
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#f7f7f7",  // AppBar color set to primary color
                    color: "#90caf9"
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: mainColorLight,  // Label color when the input is focused
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: mainColorLight,  // Underline color when input is focused
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: grey[300],  // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: grey[400],  // Darker border on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: mainColorLight,  // Border color when input is focused
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 16,  // Rounded corners for paper components
                },
                elevation1: {
                    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.1)',
                    // Softer shadows for a light theme
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,  // Rounded corners for dialog boxes
                    padding: '24px',  // Padding inside dialogs
                    backgroundColor: '#ffffff',  // White background for dialogs
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '0.875rem',
                    color: '#ffffff',  // White text for tooltips
                    backgroundColor: grey[700],  // Dark grey background for tooltips
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 32,  // Minimum width for icons in lists
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f7f7f7', // Light grey background for drawers
                    color: grey[800], // Dark grey text for readability
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: grey[400], // Default grey for checkboxes
                    '&.Mui-checked': {
                        color: mainColorLight, // Use primary color when checkbox is checked
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff', // White background for tabs
                    borderRadius: 8, // Rounded corners for tab components
                },
                indicator: {
                    height: 4,
                    borderRadius: 5,
                    backgroundColor: mainColorLight, // Indicator color to match the primary color
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 8px',
                    '&.Mui-selected': {
                        color: mainColorLight,
                        fontWeight: 'bold',
                    },
                    '&:hover': {
                        color: '#3e8ecf', // Lighten the color on hover for a subtle effect
                        opacity: 1,
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline', // Underline links on hover for clarity
                    },
                },
            },
        },
    },
});


// Dark Theme for a Dentist Clinic Website
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: mainColorDark,  // Dark blue for a deep, professional look
        },
        secondary: {
            main: '#aed581',  // Rich green to complement the blue in dark mode
        },
        background: {
            default: '#212121',  // Very dark grey as the default background
            paper: '#1e1e1e',  // Slightly lighter grey for paper elements
        },
        text: {
            primary: '#ffffff',  // White text for readability in dark mode
            secondary: '#aed581',  // Secondary text in green for highlights
        },
        error: {
            main: red[400],  // Error colors can remain consistent across themes
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.4rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2.0rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.8rem',
            fontWeight: 500,
        },
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 'bold',
                },
                containedPrimary: {
                    backgroundColor: mainColorDark,
                    '&:hover': {
                        backgroundColor: blueGrey[500],
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#324d63",
                },
                root: {
                    boxShadow: 'none',
                    '&.MuiPaper-elevation4': {
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                    },
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: mainColorDark,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: mainColorDark,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: grey[700],
                        },
                        '&:hover fieldset': {
                            borderColor: grey[500],
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: mainColorDark,
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 16,
                },
                elevation1: {
                    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,
                    padding: '24px',
                    backgroundColor: blueGrey[800],
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '0.875rem',
                    color: '#fff',
                    backgroundColor: grey[700],
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 32,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#121212',
                    color: grey[300],
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: grey[600],
                    '&.Mui-checked': {
                        color: mainColorDark,
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: blueGrey[900],
                    borderRadius: 8,
                },
                indicator: {
                    height: 4,
                    borderRadius: 5,
                    backgroundColor: mainColorDark,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 8px',
                    '&.Mui-selected': {
                        color: mainColorDark,
                        fontWeight: 'bold',
                    },
                    '&:hover': {
                        color: '#b3e5fc',
                        opacity: 1,
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                },
            },
        },
    },
});

export { darkTheme, lightTheme };

