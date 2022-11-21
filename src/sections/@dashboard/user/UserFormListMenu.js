import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const permissions = props.userPermissions;
  const handleClose = () => {
    setIsOpen(false);
    props.handleEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    props.handleDelete();
  };

  const handleUnlink = () => {
    console.log("unlink");
    setIsOpen(false);
    props.handleUnlink();
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} style={{ color: '#000' }} />
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
        {permissions.includes('edit-user') ? (
          props.status === 0 ? (
            <MenuItem
              component={RouterLink}
              to={`/dashboard/user/edit-user/${props.userId}`}
              sx={{ color: 'text.secondary' }}
              onClick={handleClose}
              disabled
            >
              <ListItemIcon style={{ color: '#214c50' }}>
                <Iconify icon="eva:edit-fill" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ) : (
            <MenuItem
              component={RouterLink}
              to={`/dashboard/user/edit-user/${props.userId}`}
              state={{ page: props.page }}
              sx={{ color: 'text.secondary' }}
              onClick={handleClose}
            >
              <ListItemIcon style={{ color: '#214c50' }}>
                <Iconify icon="eva:edit-fill" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          )
        ) : null}

        {permissions.includes('view-user-details') ? (
          props.status === 0 ? (
            <MenuItem
              component={RouterLink}
              to={`/dashboard/user/view-user/${props.userId}`}
              sx={{ color: 'text.secondary' }}
              onClick={handleClose}
              disabled
            >
              <ListItemIcon style={{ color: '#214c50' }}>
                <Iconify icon="ep:view" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ) : (
            <MenuItem
              component={RouterLink}
              to={`/dashboard/user/view-user/${props.userId}`}
              sx={{ color: 'text.secondary' }}
              onClick={handleClose}
            >
              <ListItemIcon style={{ color: '#214c50' }}>
                <Iconify icon="ep:view" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          )
        ) : null}

        {permissions.includes('unlink-device') ? (
          props.status === 0 ? (
            <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleUnlink} disabled>
              <ListItemIcon style={{ color: '#214c50' }}>
                <Iconify icon="ci:unlink" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Unlink device" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ) : (
            <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleUnlink}>
              <ListItemIcon style={{ color: '#214c50' }}>
                <Iconify icon="ci:unlink" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Unlink device" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          )
        ) : null}
        {permissions.includes('delete-user') || props.status === 0 ? (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
            <ListItemIcon style={{ color: '#214c50' }}>
              <Iconify icon="eva:activity-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={props.status === 1 ? 'Inactivate' : 'Activate'}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
}
