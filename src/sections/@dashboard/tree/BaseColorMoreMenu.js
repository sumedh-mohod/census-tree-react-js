import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function BaseColorMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const permissions = props.permissions;

  const handleClose = () => {
    setIsOpen(false);
    props.handleEdit();
  };

  const handleApprove = () => {
    setIsOpen(false);
    props.handleApprove();
  }

  const handleQcDialog = () => {
    setIsOpen(false);
    props.handleQcDialog();
  }

  const handleDeletes = () => {
    setIsOpen(false);
    props.handleDelete();
  }

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
        {/* {(permissions.includes("approve-base-color-tree"))?
        props.qcStatus==="Approved"?null
        :
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleApprove}>
        <ListItemIcon>
          <Iconify icon="eva:checkmark-circle-outline" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
        :null}

        {(permissions.includes("unapprove-base-color-tree"))?
        props.qcStatus==="Unapproved"?null:
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleQcDialog}>
        <ListItemIcon>
          <Iconify icon="eva:close-circle-outline" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary="Unapprove" primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
       :null } */}

        {/* <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleClose}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
{(permissions.includes("view-base-color-tree-history"))?
        <MenuItem component={RouterLink} to={`/dashboard/base-color/history/${props.baseColorId}/${props.baseColorName}`} state={{councilId:props.councilId,zoneId:props.zoneId,wardId:props.wardId,pageNumber:props.pageNumber}} sx={{ color: 'text.secondary' }}>
          <ListItemIcon style={{color: '#214c50'}}>
            <Iconify icon="eva:eye-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View History" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>:null}
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDeletes}>
          <ListItemIcon style={{color: '#214c50'}}>
            <Iconify icon="eva:trash-2-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
