import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function ConsultantMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'cenetr', justifyContent: 'flex-end', textAlign: 'center' }}>
        <Tooltip title="Pantea Catalin">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mr: 0, display: 'flex', alignItems: 'cenetr', justifyContent: 'center', }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>PC</Avatar>
          </IconButton>
        </Tooltip>
        <Tooltip title="Belei Vladut">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mr: 2, display: 'flex', alignItems: 'cenetr', justifyContent: 'center', }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>BV</Avatar>
          </IconButton>
        </Tooltip>
      </Box>

    </React.Fragment>
  );
}