import React from "react";
import { Box, Link, Stack, Typography, alpha, type SxProps, type Theme } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LanguageIcon from "@mui/icons-material/Language";
import { useThemeMode } from "../ThemeContext";

// MyConnect: the desktop login panel shows our logo, a short feature list and a quiet credit to B1Church, which the software is built on.
const features: { id: string; icon: React.ReactNode; label: string }[] = [
  { id: "people", icon: <PeopleIcon />, label: "People & households" },
  { id: "groups", icon: <EventIcon />, label: "Groups & events" },
  { id: "serving", icon: <AssignmentIndIcon />, label: "Serving rosters" },
  { id: "website", icon: <LanguageIcon />, label: "Members' website" }
];

const panelSx = { flex: 1, display: { xs: "none", md: "flex" }, flexDirection: "column", alignItems: "center", p: 6 } as const;

// Classic keeps the pre-redesign blue gradient panel.
const classicPanelSx: SxProps<Theme> = (theme) => ({
  ...panelSx,
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 40%, ${theme.palette.primary.light} 100%)`,
  color: theme.palette.primary.contrastText,
  "&::before": { content: "''", position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: alpha(theme.palette.common.white, 0.05) },
  "&::after": { content: "''", position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: alpha(theme.palette.common.white, 0.04) }
});

export const LoginHeroPanel: React.FC = () => {
  const { themeId, mode } = useThemeMode();
  const classic = themeId === "classic";
  // The classic gradient is dark blue in light mode and light blue in dark mode.
  const white = classic ? mode === "light" : mode === "dark";
  return (
    <Box sx={classic ? classicPanelSx : { ...panelSx, backgroundColor: "var(--b1-sidebar)", borderRight: "1px solid var(--b1-border)", color: "text.primary" }}>
      <Box sx={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", maxWidth: 380 }}>
        <Box component="img" src={white ? "/images/myconnect-full-white.svg" : "/images/myconnect-full.svg"} alt="MyConnect" sx={{ width: 380, maxWidth: "100%", height: "auto", mb: 3 }} />
        <Typography sx={{ mb: 4, opacity: 0.8, textAlign: "center" }}>Your church, in one place.</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 4, rowGap: 2 }} data-testid="login-features">
          {features.map((f) => (
            <Stack key={f.id} direction="row" spacing={1.25} alignItems="center">
              <Box sx={{ display: "flex", opacity: classic ? 0.9 : 1, color: classic ? "inherit" : "primary.main", "& svg": { fontSize: 20 } }}>{f.icon}</Box>
              <Typography variant="body2" component="span" sx={{ opacity: 0.9 }}>{f.label}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>
      <Link
        href="https://b1.church"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        variant="caption"
        data-testid="login-powered-by"
        sx={{ position: "relative", zIndex: 1, color: "inherit", opacity: 0.55, "&:hover": { opacity: 0.9 } }}>
        Powered by B1Church software
      </Link>
    </Box>
  );
};
