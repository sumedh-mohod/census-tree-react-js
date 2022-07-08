import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function TreeCensusMenu(props) {
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

  const handleCensusViewDialog =() => {
    setIsOpen(false)
    props.handleCensusViewDialog();
  }

  const handleDeletes = () => {
    setIsOpen(false);
    props.handleDelete();
  }

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
        {/* {props.qcStatus==="Approved"?null
        :
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleApprove}>
        <ListItemIcon>
          <Iconify icon="eva:checkmark-circle-outline" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
        }
        {props.qcStatus==="Unapproved"?null:
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleQcDialog}>
        <ListItemIcon>
          <Iconify icon="eva:close-circle-outline" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary="Unapprove" primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
        } */}
        
        {/* <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDeletes}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}

        {/* <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleClose}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
 {(permissions.includes("view-census-tree-history"))?
        <MenuItem component={RouterLink} to={`/dashboard/treeCensus/history/${props.treeCensusId}/${props.treeCensusName}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:eye-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View History" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        :null}
         {(permissions.includes("view-census-tree-details"))?
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleCensusViewDialog}>
          <ListItemIcon>
            <Iconify icon="carbon:data-view-alt" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Details" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        :null}
      </Menu>
    </>
  );
}
