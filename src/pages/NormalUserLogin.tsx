

import {
    Alert,
    Button,
    Card,
    CardContent,
    TextField
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SocialMediaLogin from "../components/SocialMediaLogin";
import { TypeUser } from "../DataTypes";
import { useRootService } from "../providers/context_provider/ContextProvider";

const NormalUserLogin: React.FC = () => {
    const { t } = useTranslation();
    const { authService } = useRootService();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<TypeUser>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null); // State for error message

    const login = async () => {
        let result = await authService.loginUser(userInfo);
        if (result) {
            navigate("/home");
        } else {
            setError(t("login_failed_message")); // Set error message
        }

    };

    return (
        <Card>
            <CardContent>
                <SocialMediaLogin />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label={t("email")}
                    name="username"
                    autoFocus
                    value={userInfo.email}
                    onChange={(e) => {
                        setUserInfo({
                            ...userInfo, email: e.target.value
                        })
                    }}
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
                    value={userInfo.password}
                    onChange={(e) => {
                        setUserInfo({
                            ...userInfo, password: e.target.value
                        })
                    }}
                />
                {error && <Alert severity="error">{error}</Alert>} {/* Display error message */}
                <Button
                    fullWidth
                    color={"secondary"}
                    variant="outlined"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={() => {
                        login()
                    }}
                >
                    {t("signin_business")}
                </Button>
                <Button
                    fullWidth
                    variant="text"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={
                        () => navigate(`/register/normal_user`)
                    }

                >
                    {t("not_registered_yet")}
                </Button>
            </CardContent>

        </Card >
    );
};

export default NormalUserLogin;
