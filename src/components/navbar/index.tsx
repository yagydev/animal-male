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
import PersonIcon from "@mui/icons-material/Person";
import useUser from "@/hooks/useUser";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";
import { Chip, Link, styled } from "@mui/material";
import CurrentLocation from "../current-location";
// import Link as MuiLink from '@mui/material/link';

const pages: Record<string, string>[] = [
  { label: "Login", url: "/login" },
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
];
const settings = [
  { label: "My Cattles", link: "/my-cattles" },
  { label: "Login", link: "/login" },
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

function Navbar() {
  const { t } = useTranslation();
  const { user } = useUser();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
                  display: { xs: "flex", md: "none" },
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
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
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
                // anchorOrigin={{
                //   vertical: "bottom",
                //   horizontal: "left",
                // }}
                keepMounted
                // transformOrigin={{
                //   vertical: "top",
                //   horizontal: "left",
                // }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
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
                    {/* <Typography
                    variant="h6"
                    textAlign="center"
                    component="a"
                    href="/signup"
                    sx={{
                      mr: 2,
                      fontWeight: 700,
                      color: "primary",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Typography> */}
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
            <Chip
              label="Cow"
              component="a"
              href="/cow"
              clickable
              color="primary"
              avatar={<Avatar alt="Cow" src="/images/avatars/cow-face.png" />}
            />
            <Chip
              label="Buffalo"
              component="a"
              href="/buffalo"
              clickable
              avatar={
                <Avatar alt="Buffalo" src="/images/avatars/buffalo.png" />
              }
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <CurrentLocation />
          </Box>
        </Toolbar>
        {/* <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("header.appName")}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    component="a"
                    href="/signup"
                    sx={{
                      mr: 2,
                      fontWeight: 700,
                      color: "primary",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("header.appName")}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {(!user || !user.avatar) && <PersonIcon />}
                  {user && user.avatar && (
                    <Image
                      alt="avatar"
                      width={40}
                      height={40}
                      src={user.avatar.url as string}
                    />
                  )}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.link}>
                  <Typography
                    component="a"
                    textAlign="center"
                    href={setting.link}
                    sx={{
                      mr: 2,
                      fontWeight: 600,
                      color: "primary",
                      textDecoration: "none",
                    }}
                  >
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar> */}
      </Container>
    </StyledAppbar>
  );
}
export default Navbar;
