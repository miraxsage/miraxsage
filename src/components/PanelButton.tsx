import { Button, alpha, lighten, styled } from "@mui/material";

const PanelButton = styled(Button)(({ theme }) => ({
    color: lighten(theme.palette.divider, 0.25),
    borderRadius: 0,
    padding: "12px 22px",
    "&:hover": {
        backgroundColor: alpha(theme.palette.divider, 0.2),
    },
}));

export default PanelButton;
