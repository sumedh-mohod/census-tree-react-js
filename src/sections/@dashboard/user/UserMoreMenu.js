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
  const permissions = props.permissions;

  const handleClose = () => {
    setIsOpen(false);
    props.handleEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    props.handleDelete();
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
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

          {((permissions.includes("delete-role")) || 
          (permissions.includes("delete-designation")) || 
          (permissions.includes("delete-state")) || 
          (permissions.includes("delete-district")) ||
          (permissions.includes("delete-taluka")) ||
          (permissions.includes("delete-zone")) ||
          (permissions.includes("delete-ward")) ||
          (permissions.includes("delete-tree-type")) ||
          (permissions.includes("delete-tree-condition")) ||
          (permissions.includes("delete-tree-name")) ||
          (permissions.includes("delete-location-type")) ||
          (permissions.includes("delete-property-type")) ||
          (permissions.includes("delete-qc-remark")) ||
          (permissions.includes("delete-tree-disease")))?
          props.disable?
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
:null}

        {((permissions.includes("edit-role")) || 
        (permissions.includes("edit-designation")) || 
        (permissions.includes("edit-state")) || 
        (permissions.includes("edit-district")) ||
        (permissions.includes("edit-taluka")) ||
        (permissions.includes("edit-zone")) ||
        (permissions.includes("edit-ward")) ||
        (permissions.includes("edit-tree-type")) ||
        (permissions.includes("edit-tree-condition")) ||
        (permissions.includes("edit-tree-name")) ||
        (permissions.includes("edit-location-type")) ||
        (permissions.includes("edit-property-type")) ||
        (permissions.includes("edit-qc-remark")) ||
        (permissions.includes("edit-tree-disease")))?
        (props.disable || props.status===0)?
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleClose} disabled >
          <ListItemIcon style={{color: '#214c50'}}>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>:
           <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleClose} >
           <ListItemIcon style={{color: '#214c50'}}>
             <Iconify icon="eva:edit-fill" width={24} height={24} />
           </ListItemIcon>
           <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
         </MenuItem>
         :null}
      </Menu>
    </>
  );
}
