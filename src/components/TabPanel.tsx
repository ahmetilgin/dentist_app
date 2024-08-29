import { Box, Fade } from "@mui/material";



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Fade in={value === index}>
                    <Box sx={{ p: 0 }}>{children}</Box>
                </Fade>
            )}
        </div>
    );
}


export default TabPanel;