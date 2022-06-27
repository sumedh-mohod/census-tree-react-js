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
       <h5>Tree Type -{props.data.tree_number}</h5>
      <h5>Location Type -{props.data.location_type.location_type}</h5>
      <h5>Property Type -{props.data.location_type.has_property_type}</h5>
      <h5>Property Owner -</h5>
      <h5>Tenant Name -</h5>
      <h5>Area(sq feet) -{props.data.location}</h5>
      <h5>Tree Type -{props.data.tree_type.tree_type}</h5>
      <h5>Tree Name(local) -{props.data.tree_name.name}</h5>
      <h5>Tree Name(Botanical) -{props.data.tree_name.botanical_name}</h5>
      <h5>Girth(cm) -{props.data.girth}</h5>
      <h5>Height(Feet)-{props.data.height}</h5>
      <h5>Canopy -{props.data.canopy}</h5>
      <h5>Tree Condition-{props.data.tree_condition.condition}</h5>
      <h5>Disease -{props.data.tree_disease?.tree_disease}</h5>
      <h5>Plantation Date -{props.data.plantation_date}</h5>
      <h5>Referred To Expert -{props.data.referred_to_expert}</h5>
      <h5>Action Need To Be Taken -{props.data.action_need}</h5>
     
      <h5>Image - 
        <IconButton onclick={()=>handleViewOpen()}>
        <Iconify icon="clarity:eye-show-line" color="green" width={24} style={{marginTop: 5}} />
        </IconButton>
        </h5>
  
      <h5>QC Status -{props.data.qc_status}</h5>
      <h5>Qc By -{props.data.qc_by}</h5>
      <h5>Qc On Date -</h5>
      </div>
            : null}
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}