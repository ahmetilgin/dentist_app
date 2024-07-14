import { alpha, createTheme, ThemeOptions } from '@mui/material/styles';

const createCustomTheme = (mode: 'light' | 'dark'): ThemeOptions => {
    const isLight = mode === 'light';

    const colors = isLight ? {
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(240, 10%, 3.9%)',
        card: 'hsl(0, 0%, 100%)',
        cardForeground: 'hsl(240, 10%, 3.9%)',
        popover: 'hsl(0, 0%, 100%)',
        popoverForeground: 'hsl(240, 10%, 3.9%)',
        primary: 'hsl(240, 5.9%, 10%)',
        primaryForeground: 'hsl(0, 0%, 98%)',
        secondary: 'hsl(240, 25%, 25.9%)',
        secondaryForeground: 'hsl(240, 5.9%, 10%)',
        muted: 'hsl(240, 4.8%, 95.9%)',
        mutedForeground: 'hsl(240, 3.8%, 46.1%)',
        accent: 'hsl(240, 4.8%, 95.9%)',
        accentForeground: 'hsl(240, 5.9%, 10%)',
        destructive: 'hsl(0, 84.2%, 60.2%)',
        destructiveForeground: 'hsl(0, 0%, 98%)',
        border: 'hsl(240, 5.9%, 90%)',
        input: 'hsl(240, 5.9%, 90%)',
        warning: 'hsl(48, 100%, 67%)',
        info: 'hsl(197, 100%, 50%)',
        success: 'hsl(120, 100%, 35%)',
        ring: 'hsl(240, 5.9%, 10%)',
    } : {
        background: 'hsl(240, 10%, 3.9%)',
        foreground: 'hsl(0, 0%, 98%)',
        card: 'hsl(240, 10%, 3.9%)',
        cardForeground: 'hsl(0, 0%, 98%)',
        popover: 'hsl(240, 10%, 3.9%)',
        popoverForeground: 'hsl(0, 0%, 98%)',
        primary: 'hsl(0, 0%, 98%)',
        primaryForeground: 'hsl(240, 5.9%, 10%)',
        secondary: 'hsl(240, 3.7%, 15.9%)',
        secondaryForeground: 'hsl(0, 0%, 98%)',
        muted: 'hsl(240, 3.7%, 15.9%)',
        mutedForeground: 'hsl(240, 5%, 64.9%)',
        accent: 'hsl(240, 3.7%, 15.9%)',
        accentForeground: 'hsl(0, 0%, 98%)',
        destructive: 'hsl(0, 62.8%, 30.6%)',
        destructiveForeground: 'hsl(0, 0%, 98%)',
        border: 'hsl(240, 3.7%, 15.9%)',
        input: 'hsl(240, 3.7%, 15.9%)',
        warning: 'hsl(48, 100%, 67%)',
        info: 'hsl(197, 100%, 50%)',
        success: 'hsl(120, 100%, 35%)',
        ring: 'hsl(240, 4.9%, 83.9%)',
    }

    const borderRadius = 4;
    const padding = 4;

    return createTheme({
        palette: {
            mode,
            primary: { main: colors.primary },
            secondary: { main: colors.secondary },
            error: { main: colors.destructive },
            warning: { main: colors.warning },
            info: { main: colors.info },
            success: { main: colors.success },
            text: {
                primary: colors.foreground,
                secondary: colors.mutedForeground,
            },
            background: {
                default: colors.background,
                paper: colors.card,
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
            borderRadius: borderRadius,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: borderRadius,
                        padding: '4px 8px',
                        transition: 'all 0.3s ease', // Yumuşak geçiş efekti ekliyoruz
                    },
                    containedPrimary: {
                        backgroundColor: colors.primary,
                        '&:hover': {
                            backgroundColor: alpha(colors.primary, 0.9),
                        },
                    },
                    outlinedSecondary: {
                        borderColor: colors.secondary,
                        color: colors.accentForeground,
                        '&:hover': {
                            backgroundColor: alpha(colors.secondary, 0.1),
                            borderColor: alpha(colors.secondary, 1),
                            color: colors.accentForeground,
                        },
                    },
                    outlined: {
                        borderColor: colors.secondary,
                        borderWidth: '2px',
                        '&:hover': {
                            backgroundColor: colors.primary,
                            color: colors.primaryForeground,
                            borderWidth: '2px',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        boxShadow: `0px 2px 8px ${alpha(colors.foreground, 0.08)}`,
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: colors.background,
                        color: colors.foreground,
                        boxShadow: 'none',
                        borderBottom: `1px solid ${colors.border}`,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: colors.border,
                            },
                            '&:hover fieldset': {
                                borderColor: colors.primary,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.primary,
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: colors.mutedForeground,
                            '&.Mui-focused': {
                                color: colors.primary,
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: colors.foreground,
                        },
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: colors.muted,
                        '&.Mui-checked': {
                            color: colors.primary,
                        },
                    },
                },
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        color: colors.muted,
                        '&.Mui-checked': {
                            color: colors.primary,
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
                            color: colors.background,
                            '& + .MuiSwitch-track': {
                                backgroundColor: colors.primary,
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
                        border: `1px solid ${colors.border}`,
                        backgroundColor: colors.muted,
                        opacity: 1,
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        '&.MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: colors.border,
                            },
                            '&:hover fieldset': {
                                borderColor: colors.primary,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.primary,
                            },
                        },
                    },
                    icon: {
                        color: colors.mutedForeground,
                    },
                    select: {
                        padding: padding,
                        color: colors.foreground,
                        '&:focus': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        padding: padding,
                        '&.Mui-selected': {
                            backgroundColor: alpha(colors.primary, 0.12),
                            '&:hover': {
                                backgroundColor: alpha(colors.primary, 0.18),
                            },
                        },
                        '&:hover': {
                            backgroundColor: alpha(colors.primary, 0.06),
                        },
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 16,
                        boxShadow: `0px 8px 24px ${alpha(colors.foreground, 0.15)}`,
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        backgroundColor: colors.border,
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            backgroundColor: alpha(colors.primary, 0.12),
                            '&:hover': {
                                backgroundColor: alpha(colors.primary, 0.18),
                            },
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        boxShadow: `0px 4px 12px ${alpha(colors.foreground, 0.05)}`,
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        backgroundColor: colors.muted,
                        color: colors.mutedForeground,
                        '&.MuiChip-clickable:hover': {
                            backgroundColor: alpha(colors.muted, 0.8),
                        },
                        '&.MuiChip-clickable:focus': {
                            backgroundColor: alpha(colors.muted, 0.7),
                        },
                    },
                    label: {
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: 1.5,
                    },
                    deleteIcon: {
                        color: alpha(colors.mutedForeground, 0.7),
                        '&:hover': {
                            color: colors.mutedForeground,
                        },
                    },
                    icon: {
                        color: colors.mutedForeground,
                    },
                    outlined: {
                        backgroundColor: 'transparent',
                        border: `1px solid ${colors.border}`,
                        '&.MuiChip-clickable:hover': {
                            backgroundColor: alpha(colors.muted, 0.1),
                        },
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${colors.border}`,
                    },
                    head: {
                        fontWeight: 600,
                        backgroundColor: colors.muted,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 500,
                        '&.Mui-selected': {
                            color: colors.primary,
                        },
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    flexContainer: {
                        borderBottom: `1px solid ${colors.border}`,
                        justifyContent: 'space-between',
                    },
                },
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: colors.mutedForeground,
                        '&.Mui-focused': {
                            color: colors.primary,
                        },
                    },
                },
            },
        },
    });
};

const lightTheme = createCustomTheme('light');
const darkTheme = createCustomTheme('dark');
// prettier-ignore
export { darkTheme, lightTheme };

