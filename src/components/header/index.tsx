import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import useUser from "@/hooks/useUser";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";
import { styled } from "@mui/material";
import CurrentLocation from "../current-location";
import { useRouter } from "next/router";
import LanguageSwitcher from "../language-switcher";

const pages: Record<string, string>[] = [
  { label: "Login", url: "/login" },
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
];

const StyledAppbar = styled(AppBar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    // minHeight: 148,
  },
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
}));

function Header() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUser();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const showSelected = (query?: string) => router.query.search === query;

  return (
    <StyledAppbar position="fixed" elevation={0}>
      <Container maxWidth="sm">
        <Toolbar disableGutters sx={{ flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              width: "100%",
            }}
          >
            <Box role="presentation">
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {t("header.appName")}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
              <Box>
                <LanguageSwitcher />
              </Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block" },
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                    <NextLink href={page.url} passHref legacyBehavior>
                      <Link underline="none">{page.label}</Link>
                    </NextLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <NextLink href="/" passHref legacyBehavior>
              <Chip
                label="All"
                component="a"
                clickable
                color={showSelected() ? "primary" : "default"}
                avatar={
                  <Avatar alt="Cow" src="/images/avatars/all-cattles.png" />
                }
              />
            </NextLink>
            <NextLink href="?search=cow" passHref legacyBehavior>
              <Chip
                label="Cow"
                component="a"
                clickable
                color={showSelected("cow") ? "primary" : "default"}
                avatar={<Avatar alt="Cow" src="/images/avatars/cow-face.png" />}
              />
            </NextLink>
            <NextLink href="?search=buffalo" passHref legacyBehavior>
              <Chip
                label="Buffalo"
                clickable
                color={showSelected("buffalo") ? "primary" : "default"}
                avatar={
                  <Avatar alt="Buffalo" src="/images/avatars/buffalo.png" />
                }
              />
            </NextLink>
          </Box>
          <Box sx={{ width: "100%" }}>
            <CurrentLocation />
          </Box>
        </Toolbar>
      </Container>
    </StyledAppbar>
  );
}
export default Header;
