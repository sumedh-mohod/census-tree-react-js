import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function TeamsAssignedMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);


  const handleDelete = () => {
    setIsOpen(false);
    props.handleDelete();
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)} >
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} style={{color: '#000'}}/>
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
          {props.disable?
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete} disabled >
          <ListItemIcon style={{color: '#214c50'}}>
            <Iconify icon="eva:activity-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={props.status===1?"Inactivate":"Activate"} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        : <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete} >
        <ListItemIcon style={{color: '#214c50'}}>
          <Iconify icon="eva:activity-outline" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary={props.status===1?"Inactivate":"Activate"} primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
}
      </Menu>
    </>
  );
}
