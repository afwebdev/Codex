import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import TimerOffTwoToneIcon from '@material-ui/icons/TimerOffTwoTone';
import ToolTip from "@material-ui/core/Tooltip";
import { create } from 'domain';
var moment = require('moment');

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetDividers(props) {

  const classes = useStyles();
  const { category, dex, createdAt } = props;

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LanguageTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={category} secondary="Language" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MonetizationOnTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Dex" secondary={dex} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TimerOffTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ToolTip placement="right" title="Expiry Date"> 
            <ListItemText primary={moment(createdAt).add(7, 'days').format("dddd h:mm:ss A")} secondary={"Posted On: " + moment(createdAt).format("dddd, MMMM Do YYYY")} />
        </ToolTip>
      </ListItem>
    </List>
  );
}