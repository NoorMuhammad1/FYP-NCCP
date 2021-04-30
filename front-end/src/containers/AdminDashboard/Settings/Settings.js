import { TextField } from '@material-ui/core';
import Avatar        from '@material-ui/core/Avatar';
import Badge         from '@material-ui/core/Badge';
import CreateIcon    from '@material-ui/icons/Create';
import SideBar       from 'components/SideBar';
import React         from 'react';

const Settings = () => {
  return (
    <SideBar active="settings">
      <h1>Settings</h1>
      <Badge
        color="primary"
        badgeContent={
          <CreateIcon
            style={{
              width          : '12px',
              height         : '12px',
              borderRadius   : '2px solid royalblue',
              backgroundColor: 'royalblue',
            }}
          />
        }
        showZero
        overlap="circle"
        anchorOrigin={{
          vertical  : 'bottom',
          horizontal: 'right',
        }}
      >
        <Avatar />
      </Badge>

      <TextField variant="outlined" label="Firstname" />
    </SideBar>
  );
};

export default Settings;
