import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: (theme) => theme.zIndex.drawer + 1,
      transition: (theme) =>
        theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: (theme) =>
        theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: (theme) =>
        theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
      transition: (theme) =>
        theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      overflowX: "hidden",
      width: (theme) => theme.spacing(7) + 1,
      [(theme) => theme.breakpoints.up("sm")]: {
        width: (theme) => theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: (theme) => theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...(theme) => theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: (theme) => theme.spacing(3),
    },
    link: {
      textDecoration: "none",
      color: (theme) => theme.palette.text.secondary,
    },
  };
});

const MenuLayout = ({ children }) => {
  const theme = useTheme();
  theme.drawerWidth =100;
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/page1" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="データ追加" />
            </ListItem>
          </Link>
          <Link to="/page2" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="データ一覧" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default MenuLayout;
