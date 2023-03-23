import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Menu as MenuIcon } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const { t } = useTranslation();
  const { user } = useUser();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{t("header.appName")}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pb: 2,
            alignItems: "center",
            pt: 2,
          }}
        >
          <Avatar sx={{ height: 80, width: 80 }}>
            {(!user || !user.avatar) && (
              <PersonIcon sx={{ width: 60, height: 60 }} />
            )}
            {user && user.avatar && (
              <Image
                alt="avatar"
                width={80}
                height={80}
                src={user.avatar.url as string}
              />
            )}
          </Avatar>
          {user && user.name ? (
            <Typography>{user.name}</Typography>
          ) : (
            <Typography>User</Typography>
          )}
        </Box>
        <Divider />
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button>
              <Link href={"/"} passHref legacyBehavior>
                <ListItemText primary="Home"></ListItemText>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemText primary="My Cattles"></ListItemText>
            </ListItem>
            <ListItem button>
              <Link href={"/about"} passHref>
                <ListItemText primary="About"></ListItemText>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Contact Us"></ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
