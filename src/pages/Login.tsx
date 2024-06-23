import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useRootService,
  useRootStore,
} from "../providers/context_provider/ContextProvider";
import { useCustomTheme } from "../providers/theme_provider/ThemeProvider";

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { setTheme, mode } = useCustomTheme();
  const { userStore } = useRootStore();
  const { authService } = useRootService();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleThemeChange = () => {
    let theme = mode === "light" ? "dark" : "light";
    setTheme(theme);
    userStore.setTheme(theme);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authService.login(username, password);
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <IconButton onClick={handleThemeChange}>
                  {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Grid>
              <Grid item xs={6} container justifyContent="flex-end">
                <Tooltip title={t("english")} arrow>
                  <IconButton
                    onClick={() => changeLanguage("en")}
                    size="small"
                    sx={{ mx: 0.5 }}
                  >
                    🇺🇸
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("turkish")} arrow>
                  <IconButton
                    onClick={() => changeLanguage("tr")}
                    size="small"
                    sx={{ mx: 0.5 }}
                  >
                    🇹🇷
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("albanian")} arrow>
                  <IconButton
                    onClick={() => changeLanguage("sq")}
                    size="small"
                    sx={{ mx: 0.5 }}
                  >
                    🇦🇱
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <CardContent>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label={t("username")}
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={t("remember_me")}
                />
                <Button
                  type="submit"
                  fullWidth
                  color={"secondary"}
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t("signin")}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {t("forgot_password")}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {t("signup")}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Container>
    </Grid>
  );
};

export default LoginPage;
