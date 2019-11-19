import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { LoginContext } from "../components/LoginContext";
import API from "../utils/API";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  let history = useHistory();
  const [userStatus, setUserStatus] = useContext(LoginContext);
  const { loggedIn, curState } = userStatus;
  

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
    API.signOut()
    .then((res) => {
      handleToggle();
      setUserStatus({
        ...userStatus,
        loggedIn: false
      })
      history.push("/")
    })
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    console.log(userStatus)
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root} style={{position: "absolute", right: "0"}}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {loggedIn ? <img src={`https://www.countryflags.io/${curState.user_country}/shiny/32.png`}></img> : false }
          {loggedIn ? ` Hi, ${curState.username}` : `Guest` }
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {
                      loggedIn
                      ?
                      <div>
                        <MenuItem onClick={() => history.push("/")}>Profile</MenuItem>
                        <MenuItem onClick={() => history.push("/")}>My account</MenuItem>
                        <MenuItem onClick={signOut}>Logout</MenuItem>
                      </div>
                      :
                      <div>
                        <MenuItem onClick={() => history.push("/")}>Profile</MenuItem>
                        <MenuItem onClick={() => history.push("/")}>My account</MenuItem>
                        <MenuItem onClick={signOut}>Logout</MenuItem>
                      </div>
                    }

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