
import InboxIcon from "@mui/icons-material/Inbox";
import {
    Avatar,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Divider,
    FormControlLabel,
    FormLabel,
    Grid,
    LinearProgress,
    Link,
    List, ListItem, ListItemText,
    MenuItem,
    Paper,
    Radio, RadioGroup,
    Select,
    Slider,
    Switch,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import React from "react";
import LanguageThemeSelector from "./LanguageThemeSelector";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SaveIcon from '@mui/icons-material/Save';

import { ButtonGroup, Fab, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';

export const AllElements: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event: any, newAlignment: any) => {
        setAlignment(newAlignment);
    };

    return <Grid container>
        <LanguageThemeSelector></LanguageThemeSelector>
        <Grid item xs={12}>
            <Typography variant="h4" component="div" gutterBottom>
                Theme
            </Typography>
        </Grid>

        <Grid container >
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h6" gutterBottom>Buttons</Typography>
                    <Button variant="contained" color="primary">Contained</Button>
                    <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>Outlined</Button>
                    <Button variant="text" sx={{ ml: 2 }}>Text</Button>
                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} sx={{ ml: 2 }}>Save</Button>
                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} sx={{ ml: 2 }}>Delete</Button>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h6" gutterBottom>Icon Buttons</Typography>
                    <IconButton color="primary"><AddIcon /></IconButton>
                    <IconButton color="secondary" sx={{ ml: 2 }}><DeleteIcon /></IconButton>
                    <IconButton color="default" sx={{ ml: 2 }}><SaveIcon /></IconButton>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h6" gutterBottom>Floating Action Buttons (FAB)</Typography>
                    <Fab color="primary" aria-label="add"><AddIcon /></Fab>
                    <Fab color="secondary" aria-label="edit" sx={{ ml: 2 }}><DeleteIcon /></Fab>
                    <Fab variant="extended" color="primary" sx={{ ml: 2 }}><AddIcon sx={{ mr: 1 }} />Add</Fab>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h6" gutterBottom>Toggle Buttons</Typography>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="left" aria-label="left aligned"><FormatBoldIcon /></ToggleButton>
                        <ToggleButton value="center" aria-label="centered" sx={{ ml: 2 }}><FormatItalicIcon /></ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned" sx={{ ml: 2 }}><FormatUnderlinedIcon /></ToggleButton>
                    </ToggleButtonGroup>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h6" gutterBottom>Button Group</Typography>
                    <ButtonGroup variant="contained" color="primary">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                    <ButtonGroup variant="outlined" color="secondary" sx={{ ml: 2 }}>
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                    <ButtonGroup variant="text" sx={{ ml: 2 }}>
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                </Paper>
            </Grid>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Text Fields</Typography>
                <TextField label="Standard" variant="standard" sx={{ mr: 2 }} />
                <TextField label="Filled" variant="filled" sx={{ mr: 2 }} />
                <TextField label="Outlined" variant="outlined" />
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Selection Controls</Typography>
                <FormControlLabel control={<Checkbox />} label="Checkbox" />
                <FormControlLabel control={<Switch />} label="Switch" sx={{ ml: 2 }} />
                <FormLabel component="legend">Radio Group</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                    <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                    <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                </RadioGroup>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Select</Typography>
                <Select defaultValue="" displayEmpty>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Sliders</Typography>
                <Slider defaultValue={30} aria-label="Default" valueLabelDisplay="auto" />
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Progress</Typography>
                <CircularProgress sx={{ mr: 2 }} />
                <LinearProgress />
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Card</Typography>
                <Card>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>Word of the Day</Typography>
                        <Typography variant="h5" component="div">be•nev•o•lent</Typography>
                        <Typography color="text.secondary">adjective</Typography>
                        <Typography variant="body2">well meaning and kindly.</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>List</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Item 1" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Item 2" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Item 3" />
                    </ListItem>
                </List>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Tabs</Typography>
                <Tabs value={0} aria-label="basic tabs example">
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Avatar</Typography>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>A</Avatar>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}><InboxIcon /></Avatar>
                <Avatar src="https://via.placeholder.com/40" />
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Breadcrumbs</Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/">Home</Link>
                    <Link color="inherit" href="/getting-started/installation/">Installation</Link>
                    <Typography color="text.primary">Components</Typography>
                </Breadcrumbs>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Dialog</Typography>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open Dialog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Divider</Typography>
                <Divider />
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Divider content
                </Typography>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper>
                <Typography variant="h6" gutterBottom>Tooltip</Typography>
                <Tooltip title="Delete">
                    <Button>Delete</Button>
                </Tooltip>
            </Paper>
        </Grid>
    </Grid>
}


