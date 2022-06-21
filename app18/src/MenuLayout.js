import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const transitionDuration = 1000; //can also use theme.transitions.duration

const useStyles = makeStyles(() => {
  return {
    menuButton: {
      marginRight: (theme) => theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    appBar: {
      paddingLeft: drawerWidth,
      zIndex: (theme) => theme.zIndex.drawer + 1,
    },
    drawer: {
      width: (theme) => theme.drawerWidth,
      "& .MuiBackdrop-root": {
        display: "none",
      },
    },
    drawerPaper: {
      width: (theme) => theme.drawerWidth,
      backgroundColor: "rgba(120, 120, 120, 0.2)",
    },
    content: {
      padding: (theme) => theme.spacing(3),
      transition: (theme) =>
        theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: transitionDuration,
        }),
      minWidth: (theme) => theme.drawerWidth,
      marginLeft: (theme) => 0,
    },
    contentShift: {
      transition: (theme) =>
        theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: transitionDuration,
        }),
      minWidth: (theme) => theme.drawerWidth,
      marginLeft: (theme) => theme.drawerWidth,
    },
  };
});

export default function MenuLayout({ children }) {
  const theme = useTheme();
  const greaterThan375 = useMediaQuery("(min-width:376px)");
  theme.drawerWidth = greaterThan375 ? drawerWidth : "100%";
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(greaterThan375);

  useEffect(() => {
    setOpen(greaterThan375);
  }, [greaterThan375]);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/*fixed is default */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton //hide on desktop
            color="inherit"
            onClick={handleMenuClick}
            edge="start"
            className={clsx(classes.menuButton, greaterThan375 && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive Drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        //add full width for responsive
        className={classes.drawer}
        variant="temporary"
        //elevation={3} only works with variant="temporary"
        open={open}
        transitionDuration={{
          enter: transitionDuration,
          exit: transitionDuration,
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
        PaperProps={{ elevation: 9 }}
      >
        <Toolbar />
        <div>
          <List>

            <ListItem button key="1">
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button key="2" component={Link} to="/page1">
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Page 1" />
            </ListItem>

            <ListItem button key="3" component={Link} to="/page2">
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Page 2" />
            </ListItem>

            <ListItem button key="4">
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Page 3" />
            </ListItem>

          </List>
        </div>
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
}
