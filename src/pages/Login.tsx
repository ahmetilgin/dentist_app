import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Fade,
  FormControlLabel,
  Grid,
  Tab,
  Tabs,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageThemeSelector from "../components/LanguageThemeSelector";
import { useRootService } from "../providers/context_provider/ContextProvider";

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
          <Box sx={{ p: 3 }}>{children}</Box>
        </Fade>
      )}
    </div>
  );
}

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { authService } = useRootService();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("test1");
  const [password, setPassword] = useState<string>("test1");
  const [tabValue, setTabValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); // State for error message

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tabValue === 0) {
      let result = await authService.loginUser(username, password, "user");
      if (result) {
        navigate("/home");
      } else {
        setError(t("login_failed_message")); // Set error message
      }
    } else {
      let result = await authService.loginBusiness(username, password, "business");
      if (result) {
        navigate("/home");
      } else {
        setError(t("login_failed_message")); // Set error message
      }
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Container component="main" maxWidth="xs">
        <Card>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab style={{ width: "50%" }} label={t("switch_to_user_login")} />
            <Tab style={{ width: "50%" }} label={t("switch_to_business_login")} />
          </Tabs>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TabPanel value={tabValue} index={0}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label={t("email_or_username")}
                  name="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t("password")}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Grid container>
                  <Grid item xs>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label={t("remember_me")}
                    />
                  </Grid>
                  <Grid item xs style={{ alignContent: "center" }}>
                    <Button color="primary" onClick={() => navigate("/forgot_password")}>
                      {t("forgot_password")}
                    </Button>
                  </Grid>
                </Grid>

                {error && <Alert severity="error">{error}</Alert>} {/* Display error message */}
                <Button
                  type="submit"
                  fullWidth
                  color={"secondary"}
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t("signin_user")}
                </Button>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label={t("email_or_username")}
                  name="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t("password")}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Grid container>
                  <Grid item xs>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label={t("remember_me")}
                    />
                  </Grid>
                  <Grid item xs style={{ alignContent: "center" }}>
                    <Button color="primary" onClick={() => navigate("/forgot_password")}>
                      {t("forgot_password")}
                    </Button>
                  </Grid>
                </Grid>

                {error && <Alert severity="error">{error}</Alert>} {/* Display error message */}
                <Button
                  type="submit"
                  fullWidth
                  color={"secondary"}
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t("signin_business")}
                </Button>
              </TabPanel>
              <LanguageThemeSelector />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default LoginPage;
