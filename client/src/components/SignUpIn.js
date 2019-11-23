import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { LoginContext } from "../components/LoginContext";
import Grid from "@material-ui/core/Grid";
import API from "../utils/API";
import Box from '@material-ui/core/Box';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-block",
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    },
    marginLeft: "auto",
    marginTop: "-1em",
    marginBottom: "-0.5em"
  },
  paper: {
    marginRight: theme.spacing(2)
  },
  loggedInAvatar: {
    backgroundColor: "indigo[700]"
  }
}));

export default function SignUpIn(props) {
  let history = useHistory();
  const [userStatus, setUserStatus] = useContext(LoginContext);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const loggedIn = (localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : "");
  const {
    user_country,
    user_firstName,
    user_lastName,
    username,
    _id
  } = (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "")

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const signOut = () => {
    API.signOut().then(res => {
      handleToggle();
      setUserStatus({
        ...userStatus,
        loggedIn: false
      });
      localStorage.setItem("loggedIn", false);
      history.push("/");
    });
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    // console.log(userStatus)
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Grid container justify="center" spacing={0}>
            <Grid item >
              {loggedIn ? (
                <Avatar className={classes.loggedInAvatar}>{user_firstName[0] + user_lastName[0]}</Avatar>
              ) : (
                <Avatar
                  alt="Remy Sharp"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRqzORJ5GNFP9l8zNFPW-kHCE1n2UbtkpGObWNZSm0xCa1u4J7&s"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {loggedIn ? (
                <Box display="flex" justifyContent="center" flexDirection="row">
                  <AccountBalanceWalletTwoToneIcon />
                  <p>69</p>
                </Box>
                // <React.Fragment>
                //   <i className="fas fa-wallet"></i> 69
                // </React.Fragment>
              ) : (
                <p>Guest</p>
              )}
            </Grid>
          </Grid>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {loggedIn ? (
                      <div>
                        <MenuItem onClick={() => console.log(loggedIn)}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={() => history.push("/")}>
                          My account
                        </MenuItem>
                        <MenuItem onClick={signOut}>Logout</MenuItem>
                      </div>
                    ) : (
                      <div>
                        <MenuItem onClick={() => history.push("/signin")}>
                          Sign In
                        </MenuItem>
                        <MenuItem onClick={() => history.push("/signup")}>
                          Sign Up
                        </MenuItem>
                        <MenuItem onClick={() => history.push("/")}>
                          Placeholder
                        </MenuItem>
                      </div>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
