import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function CouncilMenu(props) {
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
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
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
          {(permissions.includes("delete-council"))?
          props.disable?
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete} disabled >
          <ListItemIcon>
            <Iconify icon="eva:activity-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={props.status===1?"Inactivate":"Activate"} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        : <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete} >
        <ListItemIcon>
          <Iconify icon="eva:activity-outline" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary={props.status===1?"Inactivate":"Activate"} primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>:null
}

        {(permissions.includes("edit-council"))?
        (props.disable || props.status===0)?
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleClose} disabled >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>:
           <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleClose} >
           <ListItemIcon>
             <Iconify icon="eva:edit-fill" width={24} height={24} />
           </ListItemIcon>
           <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
         </MenuItem>:null}

         {(permissions.includes("view-properties"))?
          props.status===0?
          <MenuItem component={RouterLink} to={`/dashboard/council/properties/${props.councilId}/${props.councilName}`} sx={{ color: 'text.secondary' }} onClick={handleClose}disabled >
          <ListItemIcon>
              <Iconify icon="bi:building" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Properties" primaryTypographyProps={{ variant: 'body2' }} />
       </MenuItem>:
       <MenuItem component={RouterLink} to={`/dashboard/council/properties/${props.councilId}/${props.councilName}`} sx={{ color: 'text.secondary' }} onClick={handleClose} >
       <ListItemIcon>
           <Iconify icon="bi:building" width={24} height={24} />
       </ListItemIcon>
       <ListItemText primary="View Properties" primaryTypographyProps={{ variant: 'body2' }} />
    </MenuItem>
         :null }
         

      </Menu>
    </>
  );
}
