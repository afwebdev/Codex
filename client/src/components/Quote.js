import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormatQuoteTwoToneIcon from '@material-ui/icons/FormatQuoteTwoTone';

export default function Quote(props) {
  return (
    <Typography component="div">
      <Box
        display="flex"
        alignItems="flex-start"
        p={0}
        m={0}
      >
        <Box>
            <FormatQuoteTwoToneIcon />
        </Box>
        <Box p={0} m={1} fontStyle="italic" fontFamily="'News Cycle', sans-serif" fontSize="h6.fontSize">
            {props.quote}
        </Box>
        <Box p={0} alignSelf="flex-end">
            <FormatQuoteTwoToneIcon />
        </Box>
      </Box>
    </Typography>
  );
}