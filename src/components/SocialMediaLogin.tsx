import { Button, Divider, Grid } from "@mui/material";

import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import React from "react";
import { useTranslation } from "react-i18next";


const SocialMediaLogin: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Grid container sx={{ mb: 2 }} spacing={2}>
            <Grid item xs={4} sm={4}>
                <Button
                    fullWidth
                    color={"secondary"}
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                >
                    Facebook
                </Button>
            </Grid>
            <Grid item xs={4} sm={4}>
                <Button
                    fullWidth
                    color={"secondary"}
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                >
                    Google
                </Button>
            </Grid>
            <Grid item xs={4} sm={4}>
                <Button
                    fullWidth
                    color={"secondary"}
                    variant="outlined"
                    startIcon={<AppleIcon />}
                >
                    Apple
                </Button>
            </Grid>
            <Divider sx={{ mt: 2 }} style={{ width: "100%" }} textAlign="center">{t("or")}</Divider>
        </Grid>
    )
}


export default SocialMediaLogin;


