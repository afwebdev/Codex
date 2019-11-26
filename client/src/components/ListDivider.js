import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import TimerOffTwoToneIcon from '@material-ui/icons/TimerOffTwoTone';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetDividers() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LanguageTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Javascript" secondary="Language" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MonetizationOnTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Dex" secondary="10" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TimerOffTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Expires: November 29, 2019" secondary="Novermber 20, 2019" />
      </ListItem>
    </List>
  );
}