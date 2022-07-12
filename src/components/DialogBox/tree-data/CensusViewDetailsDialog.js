import * as React from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import { TextField } from '@mui/material';
import { GetUsers } from '../../../actions/UserAction';
import { AddUserToTeam } from '../../../actions/TeamsAction';
import { GetQcRemarksForBaseColor } from '../../../actions/BaseColorAction';
import ViewImageDialog from './ViewImageDialog'
import Iconify from '../../Iconify';
// import Typography from 'src/theme/overrides/Typography';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CensusViewDetailsDialog(props) {

  const dispatch = useDispatch();
  const { isOpen, data, isOpenConfirm,teamId } = props;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const[state, setState]=  React.useState('');
  const [role, setRole] = React.useState([]);
  const [topModalOpen, setTopModalOpen] = React.useState(false);
  const [reqObj, setReqObj] = React.useState(null)
  const [id, setId] = React.useState(null);
  const [viewOpen, setViewOpen ] = React.useState(false);
  const [imageList,setImageList] = React.useState([]);

//   const {
//     baseColorRemarks,
//     updateQCStatusLog,
//     updateCensusQCStatusLog,
//   } = useSelector((state) => ({
//     baseColorRemarks:state.baseColor.baseColorRemarks,
//     updateQCStatusLog:state.baseColor.updateQCStatusLog,
//     updateCensusQCStatusLog:state.treeCensus.updateQCStatusLog,
//   }));

//   const firstRun = React.useRef(true);
//   React.useEffect(()=>{
//     if (firstRun.current) {
//       firstRun.current = false;
//       return;
//     }
//     console.log("INSIDE USEEFFECT");
//     console.log(localStorage.getItem("token"))
//     props.handleClose()
//   },[updateQCStatusLog, updateCensusQCStatusLog])

//   React.useEffect(()=>{
//     dispatch(GetQcRemarksForBaseColor("Base Color"))
//   },[])


  const handleClose = () => {
    props.handleClose();
  };

  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen)
    setImageList(images || []);
    console.log("viewDetals")
  }

  // const handleViewImage = (data) => {
  //   // eslint-disable-next-line no-unused-expressions
  //   data.iamges
  // }



//   const handleMaxWidthChange = (event) => {
//     setMaxWidth(
//       // @ts-expect-error autofill of arbitrary value is not handled.
//       event.target.value,
//     );
//   };


//   const DistrictsSchema = Yup.object().shape({
//     remark: Yup.string().required("Remark is required"),
//   });


//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       remark:"",
      
//     },
//     validationSchema: DistrictsSchema,
//     onSubmit: (value) => {
//         props.handleSubmit(value.remark,props.baseColorId)
//     },
//   });

//   const { errors, touched, values, isSubmitting, handleSubmit,getFieldProps} = formik;


console.log("hii", isOpen)

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
        {viewOpen?
    <ViewImageDialog
    isOpen={viewOpen}
    handleClose = {handleViewOpen}
    data={imageList}
    />:null
    }
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        // onClose={handleClose}
        // onClose={handleClose}
      >
        <BootstrapDialogTitle >View Details</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
{data?
            <div>
              <table style={{ fontFamily: "arial, sans-serif",
  borderCollapse: "collapse",
  width: "100%"}}>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Location Type</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.location_type.location_type}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Property Type</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.property_type?.property_type}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Number</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.tree_number}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Property Owner</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.property?.owner_name}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tenant Name </td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.property?.tenant_name}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Area(sq feet)</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.property?.area}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Type</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.tree_type.tree_type}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Name(local)</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.tree_name.name}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Name(Botanical)</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.tree_name.botanical_name}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Girth(cm)</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.girth}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Height(Feet)</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.height}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Canopy</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.canopy}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Condition</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.tree_condition.condition}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Disease</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.tree_disease?.tree_disease ? props.data.tree_disease?.tree_disease: "-"}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Plantation Date</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.plantation_date}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Referred To Expert?</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.referred_to_expert===1 ? "Yes" : "No"}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Action Need To Be Taken</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.action_need ? props.data.action_need: "-"}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Images</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}><IconButton onClick={()=>handleViewOpen(props.data.images)}>
        <Iconify icon="clarity:eye-show-line" color="green" width={24} style={{marginTop: 5}} />
        </IconButton></td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>QC Status</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.qc_status}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Qc By</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.qc_by?props.data.qc_by: "-"}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Qc On Date</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.qc_date? props.data.qc_date: "-"}</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Added By</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{props.data.added_by?.first_name? props.data.added_by?.first_name: "-"} {props.data.added_by?.last_name? props.data.added_by?.last_name: "-"} </td>
  </tr>
  </table>
  </div>
            : null}
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}