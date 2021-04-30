import { TextField } from '@material-ui/core';
import Avatar        from '@material-ui/core/Avatar';
import Badge         from '@material-ui/core/Badge';
import CreateIcon    from '@material-ui/icons/Create';
import UserSideBar   from 'components/UserSidebar/UserSidebar';
import React         from 'react';

const UserSettings = () => {
  return (

    <UserSideBar active="User Settings">
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
    </UserSideBar>
  );
};

export default UserSettings;
