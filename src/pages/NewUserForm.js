import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import {
  Stack,
  Avatar,
  Checkbox,
  Card,
  CircularProgress,

  InputAdornment,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Iconify from '../components/Iconify';
import { GetActiveRole } from '../actions/RoleAction';
import { AddUsers, EditUsers, GetDeductionType, GetReligions, GetUserDocumentType, GetUsersById } from '../actions/UserAction';
import { UploadFile, UploadImage } from '../actions/UploadActions';
import DefaultInput from '../components/Inputs/DefaultInput';
import { GetActiveCouncil } from '../actions/CouncilAction';
import { GetActiveState, GetActiveDistricts, GetActiveTalukas, GetAllActiveDistrictsByStateId, GetAllActiveTalukaByDistrictId } from '../actions/MasterActions';
import { GetActiveDesignations } from '../actions/DesignationAction';
import { ShowLoader } from '../actions/CommonAction';
import { SetNewAlert } from '../actions/AlertActions';
import WarningMessageDialog from '../components/DialogBox/WarningMessageDialog';

export default function NewUserForm(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [gender, setGender] = React.useState('');
    const [religion, setReligion] = React.useState('');
    const [caste, setCaste] = React.useState('');
    const [education, setEducation] = React.useState('');
    const [whoseReference, setWhoseReference] = React.useState('');
    const [bloodGrp, setBloodGrp] = React.useState('');
    const[district, setDistrict]=  React.useState('');
    const[role, setRole]=  React.useState("");
    const[dob, setDob]= React.useState("");
    const [firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [selectedState, setSelectedState]=  React.useState('');
    const [showDistrict, setShowDistrict]=  React.useState(false);
    const [showTaluka, setShowTaluka]=  React.useState(false);
    const [panCardNumber, setPanCardNumber] = React.useState("");
    const [ifscCode, setIfscCode] = React.useState("");
    const [aadhaarNumber, setAadhaarNumber] = React.useState('');
    const [agreementDone, setAgreementDone] = React.useState('');
    const [documentProvided, setDocumentProvided] = React.useState('');
    const [applicableDeducation, setApplicableDeducation] = React.useState('');
    const [designation, setDesignation] =  React.useState('');
    const [city, setCity] = React.useState('');
    const [value, setValue] = React.useState(null);
    const [mobile, setMobile] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emergencyContactName, setEmergencyContactName] = React.useState('');
    const [emergencyContactNumber, setEmergencyContactNumber] = React.useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = React.useState('');
    const [referredBy, setReferredBy] = React.useState('');
    const [noticePeriod, setNoticePeriod] = React.useState('');
    const [salaryPerMonth, setSalaryPerMonth] = React.useState('');
    const [formValues, setFormValues] = useState([{ deductionType: "", amount : ""}])
    const [filePath, setFilePath] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { isOpen, data } = props;
    const [deductionList,setDeductionList] = useState([{deductionName:"",deductionValue:"",errorName:"",errorValue:""}])
    const [documentList,setDocumentList] = useState([{documentName:"",documentValue:"",errorName:"",errorValue:""}])
    const [errorState,setErrorState] = useState({});
    const [showCouncil,setShowCouncil] = useState(false);
    const [editUser,setEditUser] = useState(false);  
    const [roleError,setRoleError] = useState("");
    const [dobError, setDobError] = useState("");
    const [fileUploadError, setFileUploadError] = useState("");
    const [fileSizeError, setFileSizeError] = useState("");
    const [page, setPage] = useState(0);
    const [dateLimitError, setDateLimitError] = useState("");
    const [panCardError, setPanCardError] = useState("");
    const [ifscCodeError, setIfscCodeError] = useState("");
    const [aadharError, setAadharError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [middleNameError, setMiddleNameError] = useState('');
    const [lastNameError, setLastNameError] = useState("");
    const [cityError, setCityError] = useState('');
    const [casteError, setCasteError] = React.useState('');
    const [educationError, setEducationError] = React.useState('');
    const [mobileError, setMobileError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [emergencyContactNameError, setEmergencyContactNameError] = React.useState('');
    const [emergencyContactNumberError, setEmergencyContactNumberError] = React.useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [accountNumberError, setAccountNumberError] = React.useState('');
    const [salaryPerMonthError, setSalaryPerMonthError] = React.useState('');
    const [deductionValueError, setDeductionValueError] = React.useState('');
    const[ lastDayOfWork, setLastDayOfWork] = useState("");
    const [uploadClick, setUploadClick] = useState("");
    const [uploadClickError,setUploadClickError] = useState("") ;
    const todayDate = moment(new Date()).format('YYYY-MM-DD');
    const [topModalOpen, setTopModalOpen] = useState(false);
    const [tempRole, setTempRole] = useState(null)
    const submitErrors = [];
    const message = "Changing user role will expired the current session of the user and might lose the offline data. Please synch all the Offline data before proceeding."
    const {
      salaryDeductionType,
      userDocumentType,
      roles,
      religions,
      council,
      states,
      districts,
      talukas,
      userById,
      designations,
      addUsersLog,
      uploadFile,
      uploadFileLog,
      showLoader,
      editUsersLog,
      loggedUser
    } = useSelector((state) => ({
      salaryDeductionType:state.users.salaryDeductionType,
      userDocumentType:state.users.userDocumentType,
      roles:state.roles.roles,
      religions:state.users.religions,
      council:state.council.activeCouncil,
      states:state.master.activeStates,
      districts:state.master.activeDistricts,
      talukas:state.master.activeTalukas,
      userById:state.users.userById,
      designations:state.designations.designations,
      addUsersLog:state.users.addUsersLog,
      uploadFile:state.upload.uploadFile,
      uploadFileLog:state.upload.uploadFileLog,
      showLoader : state.common.showLoader,
      editUsersLog:state.users.editUsersLog,
      loggedUser:state.auth.loggedUser,
    }));

    // console.log(loggedUser.roles.role);
    // console.log("roles", roles)
    
    useEffect(()=>{
      dispatch(GetDeductionType());
      dispatch(GetUserDocumentType());
      dispatch(GetActiveRole(1));
      dispatch(GetReligions())
      dispatch(GetActiveCouncil(1));
      dispatch(GetActiveState(1));
      // dispatch(GetActiveDistricts(1));
      // dispatch(GetActiveTalukas(1));
      dispatch(GetActiveDesignations(1));
    },[])

    // console.log("DeductionTypeId", salaryDeductionType)

    const { userId } = useParams();
    const { state } = useLocation();
    // console.log("STATE",state);
    useEffect(()=>{
      
      if(userId){
        dispatch(ShowLoader(true))
        dispatch(GetUsersById(userId))
        
      }
    },[])

    const secondRun = React.useRef(true);
    useEffect(()=>{ 
      if (secondRun.current) {
        secondRun.current = false;
        return;
      }
      if(userById){
        
        if(state){
          setPage(state.page);
        }
        separateId(userById.roles)
        seprateDeduction(userById.applicable_deductions)
        separateDocument(userById.documents)
        setEditUser(true);
        dispatch(GetAllActiveDistrictsByStateId(userById?.state_id,1));
        dispatch(GetAllActiveTalukaByDistrictId(userById?.district_id,1));
        setSelectedState(userById?.state_id);
        setDistrict(userById?.district_id)
        setShowDistrict(true);
        setShowTaluka(true);
        dispatch(ShowLoader(false))
      }
    },[userById])

    const thirdRun = React.useRef(true);
    useEffect(()=>{ 
      if (thirdRun.current) {
        thirdRun.current = false;
        return;
      }
      if(uploadFile){
        const newDocumentList = [...documentList];
        const value =  newDocumentList[uploadFile.index];
        value.documentValue = uploadFile.url;
        newDocumentList[uploadFile.index] = value;
        setDocumentList(newDocumentList); 
      }
    },[uploadFileLog])

    const separateId = (roles) => {
      // const roleArray = [];
      // roles.map((value,index)=>{
      //   if(value.slug==="council"){
      //     setShowCouncil(true);
      //   }
      //   roleArray.push(value.id);
      //   return null;
      // })
      let roleArray = "";
      roles.map((value,index)=>{
        if(value.slug==="council"){
          setShowCouncil(true);
        }
        roleArray= value.id;
        return null;
      })
      setRole(roleArray)
    }

    const handleLastDayChange = (event) => {
      if(event.target.value){
        // console.log("gadsgshfhds", event.target.value)
        setLastDayOfWork(event.target.value)
      }
      else{
        submitErrors.push(event.target.value);
      }
    }

    const seprateDeduction = (deduction) => {
      const deductionList = [];

      if(deduction.length===0){
        const infoToAdd = {
          'deductionName':"",
          'deductionValue':"",
          'errorName':"",
          'errorValue':"",
        }
        deductionList.push(infoToAdd)
      }

      else {
        deduction.map((value,index)=>{
          const infoToAdd = {
            'deductionName':value.salary_deduction_type_id,
            'deductionValue':value.value,
            'errorName':"",
            'errorValue':"",
          }
          deductionList.push(infoToAdd)
          return null;
        })
      }
      setDeductionList(deductionList)
    }

    const separateDocument = (document) => {
      const documentList = [];

      if(document.length===0){
        const infoToAdd = {
          'documentName':"",
          'documentValue':"",
          'errorName':"",
          'errorValue':"",
        }
        documentList.push(infoToAdd)
      }

      else {
        document.map((value,index)=>{
          const infoToAdd = {
            'documentName':value.user_document_type_id,
            'documentValue':value.document_path,
            'errorName':"",
            'errorValue':"",
          }
          documentList.push(infoToAdd)
          return null;
        })
      }
      setDocumentList(documentList)
    }


    const firstRun = React.useRef(true);
    useEffect(()=>{
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      resetForm();
      setRole([])
      setRoleError("")
      setDeductionList([{deductionName:"",deductionValue:"",errorName:"",errorValue:""}])
      setDocumentList([{documentName:"",documentValue:"",errorName:"",errorValue:""}])
      navigate('/dashboard/user', { replace: true});
    },[addUsersLog])

    const editRun = React.useRef(true);
    useEffect(()=>{
      if (editRun.current) {
        editRun.current = false;
        return;
      }
      resetForm();
      setRole([])
      setRoleError("")
      setDeductionList([{deductionName:"",deductionValue:"",errorName:"",errorValue:""}])
      setDocumentList([{documentName:"",documentValue:"",errorName:"",errorValue:""}])
      navigate('/dashboard/user', { replace: true ,state:{"page":page} });
      // navigate(-1);
    },[editUsersLog])

    // console.log("RELIGIONS",religions);
   
    const diffentlyAbled = [
      {
        value:"1",
        label:"Yes"
      },
      {
        value:"0",
        label:"No"
      }
    ]

    
  
    const BloodGroupValue = [
      {
        value: 'A+',
        label: 'A+',
      },
      {
        value: 'B+',
        label: 'B+',
      },
      {
        value: 'A-',
        label: 'A-',
      },
      {
        value: 'B-',
        label: 'B-',
      },
      {
        value: 'AB+',
        label: 'AB+',
      },
      {
        value: 'AB-',
        label: 'AB-',
      },
      {
        value: 'O+',
        label: 'O+',
      },
    ]
  
    

    const agreement = [
      {
        value: '1',
        label: 'Yes',
      },
      {
        value: '0',
        label: 'No',
    },
    ]

    const noticePeriodValue =[
      {
        value: 'Yes',
        label: 'Yes',
      },
      {
        value: 'No',
        label: 'No',
    },
    ]
   
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


 const removeFormFields = (i) => {
  const newFormValues = [...formValues];
  newFormValues.splice(i, 1);
  setFormValues(newFormValues)
}
    const handleNoticePeriodChange = (event) => {
      setNoticePeriod(event.target.value);
    };

    const handleTalukaChange = (event) => {
      // setNoticePeriod(event.target.value);
    };
  
    const handleShowPassword = () => {
      setShowPassword((show) => !show);
    };

    const handleDobChange = (event) => {
      // console.log("in dob  x",event.target.value);
      // console.log("in dob ",todayDate);
      const td =new Date( moment(todayDate).format('MM/DD/YYYY'));
      const gd = new Date(moment(event.target.value).format('MM/DD/YYYY'));
      // console.log(td);
      const ageDifMs = Date.now() - gd.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const ageLimit =  Math.abs(ageDate.getUTCFullYear() - 1970);
    // console.log("agelimit", ageLimit);
      const diffTime = td-gd;
      if(ageLimit<18){
        setDateLimitError("Please select date for above 18 years");
      }
      else{
        setDateLimitError("");
      }
      if(diffTime<0){
        setDobError("Please enter valid birth date");
        
        
      }else{
        setDobError("");
        
      }
      setDob(event.target.value)
//       console.log("in dob ",diffTime);
// console.log(Math.ceil(diffTime/ (1000 * 60 * 60 * 24)));
    
    };

    const handleRoleChange = (event) => {
      
      if(userId){
        handleTopModalClose();
        setTempRole(event.target.value)
      }
      else {
        if(event.target.value===9){
          setShowCouncil(true);
        }
        else {
          setShowCouncil(false);
        }
  
        setRole(event.target.value);
      }

      
    };

    const handleReferredChange = (event) => {
      setReferredBy(event.target.value);
    };

    const handleDesignationChange = (event) => {
      setDesignation(event.target.value);
    };
  
    const handleGenderChange = (event) => {
      setGender(event.target.value);
    };
  
    const handleReligionChange = (event) => {
      setWhoseReference(event.target.value);
    };
    const handleDocumentProvidedChange = (event) => {
      setDocumentProvided(event.target.value);
    };
    
    const handleApplicableDeducationCange = (event) => {
      setApplicableDeducation(event.target.value);
    };
  
    const handleBloodGrpChange = (event) => {
      setBloodGrp(event.target.value);
    };
    
  
    const handleCasteChange = (event) => {
      const  regex = /^[a-zA-Z ]{2,30}$/;
      if(regex.test(event.target.value)) {
        setCasteError("");
    }
    else{
    setCasteError("Please Enter Caste Containing Alphabets Only");
      
    }
   
      setCaste(event.target.value);
    };


    const handleEducationChange =(e) =>{
    //   console.log("education in")
    //   const  regex = /^[a-zA-Z_@./#&+-]*(?:\d[a-zA-Z_@./#&+-]*){0,2}$/;
    //   if(regex.test(e.target.value)) {
    //     setEducationError("");
    // }
    // else{
    // setEducationError("Education containg alphanumeric Format and it accept only 2 digits");
      
    // }

    setEducation(e.target.value);
    }
  
    const handleClose = () => {
      props.handleClose();
    };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };

    const handleStatesChange = (event) => {
      dispatch(GetAllActiveDistrictsByStateId(event.target.value,1))
      setShowDistrict(true);
      setShowTaluka(false);
      setSelectedState(event.target.value)
    };

    const handleDistrictChange = (event) => {
      // console.log("HANDLE DISTRICT CHANGE VALUE",event.target.value);
      setDistrict(event.target.value);
      dispatch(GetAllActiveTalukaByDistrictId(event.target.value,1));
      setShowTaluka(true);
    };
  
    const handleAgreementChange = (event) => {
      setReferredBy(event.target.value);
    };
  
  
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleMaxWidthChange = (event) => {
      setMaxWidth(
        // @ts-expect-error autofill of arbitrary value is not handled.
        event.target.value,
      );
    };

    const deductionLength = deductionList.length;
    const documentLength = documentList.length;

    const handleDeductionButtonClick = (value,index) => {
      if(value==='add'){
        const newDeductionList = [...deductionList];
        const infoToAdd = {
          'deductionName':"",
          'deductionValue':"",
          'errorName':"",
          'errorValue':"",
        }
        newDeductionList.push(infoToAdd)
        setDeductionList(newDeductionList)
      }
      else if(value==='delete') {
        const newDeductionList = [...deductionList];
        newDeductionList.splice(index,1)
        setDeductionList(newDeductionList)
      }
    }

    const handleDeductionNameChange = (e,index) => {

        const newDeductionList = [...deductionList];
        const value = newDeductionList[index];
        value.deductionName = e.target.value;
        newDeductionList[index] = value;
        setDeductionList(newDeductionList); 
       
    }

    const handleDeductionValueChange = (e,index) => {
   
      const  regex = /^[0-9]*$/;
      if(regex.test(e.target.value)) {
        setDeductionValueError("");
        const newDeductionList = [...deductionList];
      const value = newDeductionList[index];
      value.deductionValue = e.target.value;
      newDeductionList[index] = value;
      setDeductionList(newDeductionList); 
    }
    else{
      setDeductionValueError("Please Enter Deduction Value In Digits Only");
      
    }
      
     
  }

    const handleDocumentButtonClick = (value,index) => {
      // console.log("HANDLE DOCUMENT BUTTONVCLICKED CALLED");
      if(value==='add'){
        const newDocumentList = [...documentList];
        const infoToAdd = {
          'documentName':"",
          'documentValue':"",
          'errorName':"",
          'errorValue':"",
        }
        newDocumentList.push(infoToAdd)
        setDocumentList(newDocumentList)
      }
      else if(value==='delete') {
        const newDocumentList = [...documentList];
        newDocumentList.splice(index,1)
        setDocumentList(newDocumentList)
      }
    }

    const handleDocumentNameChange = (e,index) => {
      const newDocumentList = [...documentList];
      const value = newDocumentList[index];
      value.documentName = e.target.value;
      newDocumentList[index] = value;
      // console.log("DOCUMENT LIST",newDocumentList);
      setDocumentList(newDocumentList); 
      setUploadClick(true);
      setUploadClickError("");
      // const isValid = /\.jpe?g$/i.test(e.target.value);
      // if (!isValid) {
      // console.log('Only jpg files allowed!');
      // }
      // console.log(isValid);
     
  }

  const handleViewDocument = (fpath) =>{
    if(fpath.includes(process.env.REACT_APP_BASE_URL)){
      // console.log("file path", fpath);
      window.open(fpath, '_blank');
    }
    else{
   const fLink = process.env.REACT_APP_BASE_URL.concat('/').concat(fpath);
  //  console.log("file path", fLink);
   window.open(fLink, '_blank');
    }
  }

const handlePancardNumber = (e) => {
      // console.log("in pancard");
      const  regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if(regex.test(e.target.value)) {
        setPanCardError("");
    }
    else{
    setPanCardError("Please Enter Pan Card Number in Standard Format");
      
    }
    setPanCardNumber(e.target.value);
}

const handleFirstName = (e) => {
  const  regex = /^[a-zA-Z ]{2,30}$/;
  if(regex.test(e.target.value)) {
    setFirstNameError("");
}
else{
setFirstNameError("Please Enter First Name Containing Alphabets Only");
  
}
setFirstName(e.target.value);
}

const handleMiddleName = (e) => {
  const  regex = /^[a-zA-Z ]{2,30}$/;
  if(regex.test(e.target.value)) {
    setMiddleNameError("");
}
else{
setMiddleNameError("Please Enter Middle Name Containing Alphabets Only");
  
}
setMiddleName(e.target.value);
}

const handleLastName = (e) => {
  const  regex = /^[a-zA-Z ]{2,30}$/;
  if(regex.test(e.target.value)) {
    setLastNameError("");
}
else{
setLastNameError("Please Enter Last Name Containing Alphabets Only");
  
}
setLastName(e.target.value);
}

const handleCity = (e) => {
  const  regex = /^[a-zA-Z ]{2,30}$/;
  if(regex.test(e.target.value)) {
    setCityError("");
}
else{
setCityError("Please Enter City Name Containing Alphabets Only");
  
}
setCity(e.target.value);
}

const handleEmgName = (e) => {
  const  regex = /^[a-zA-Z ]{2,30}$/;
  if(regex.test(e.target.value)) {
    setEmergencyContactNameError("");
}
else{
  setEmergencyContactNameError("Please Enter Emergency Contact Name Containing Alphabets Only");
  
}
setEmergencyContactName(e.target.value);
}

const handleBankName = (e) => {
  const  regex = /^[a-zA-Z ]{2,30}$/;
  if(regex.test(e.target.value)) {
    setBankNameError("");
}
else{
setBankNameError("Please Enter Bank Name Containing Alphabets Only");
  
}
setBankName(e.target.value);
}

const handleMobile = (e) => {
  const  regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  if(regex.test(e.target.value)) {
    setMobileError("");
}
else{
setMobileError("Please Enter Mobile Number Containing 10 Digits Only");
  
}
setMobile(e.target.value);
}

const handleEmgNumber = (e) => {
  const  regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  if(regex.test(e.target.value)) {
    setEmergencyContactNumberError("");
}
else{
setEmergencyContactNumberError("Please Enter Emergency Contact Number Containing 10 Digits Only");
  
}
setEmergencyContactNumber(e.target.value);
}



const handleEmail = (e) => {
  const  regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(regex.test(e.target.value)) {
    setEmailError("");
}
else{
setEmailError("Please Enter Valid Email Address Only");
  
}
setEmail(e.target.value);
}



const handleAccNumber = (e) => {
  const  regex = /^\d{9,18}$/;
  if(regex.test(e.target.value)) {
    setAccountNumberError("");
}
else{
setAccountNumberError("Please Enter Account Number In Standard Format(9-18 Digits) Only");
  
}
setAccountNumber(e.target.value);
}


  const handleIFSCCode = (e) => {
    const  regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if(regex.test(e.target.value)) {
      setIfscCodeError("");
 }
 else{
  setIfscCodeError("Please Enter IFSC code In Standard Format Only");
    
 }
 setIfscCode(e.target.value);
  }


  const handleAadharCard = (e) => {
    const  regex = /^\d{12}$/;
    if(regex.test(e.target.value)) {
      setAadharError("");
 }
 else{
  setAadharError("Please Enter Aadhar Card Number In Standard Format Only");
    
 }
 setAadhaarNumber(e.target.value);
  }

  const handleSalary = (e) => {
    const  regex = /^[0-9]*$/;
    if(regex.test(e.target.value)) {
      setSalaryPerMonthError("");
  }
  else{
    setSalaryPerMonthError("Please Enter Salary Containing Digits Only");
    
  }
  setSalaryPerMonth(e.target.value);
  }

  const handleDocumentValueChange = (e,index) => {
    if(uploadClick){
      // console.log("HANDLE DOCMENT VALUE CAHNGE",e.target.files[0])
      // console.log(e.target.files[0].name);
      // console.log(e.target.files[0].size);
      const i = parseInt((Math.floor(Math.log(e.target.files[0].size) / Math.log(1024))),10);
      // console.log("file size", i);
      const validExtensions = ['png','jpeg','jpg', 'tiff', 'gif', 'pdf']
      const fileExtension = e.target.files[0].name.split('.')[1]
      // console.log(fileExtension);
      if(validExtensions.includes(fileExtension)){
        setFileUploadError("");
        if(e.target.files[0].size<5242880){
          setFileSizeError("");
          const formData = new FormData();
          formData.append('upload_for', 'users');
          formData.append('file', e.target.files[0]);
          dispatch(UploadFile(formData,index)).then((response) => {
            // console.log("upload file",response);
          });
          const newDocumentList = [...documentList];
          const value =  newDocumentList[index];
          value.documentValue = e.target.value;
          // console.log(value.documentValue,"||||||")
          newDocumentList[index] = value;
          setDocumentList(newDocumentList); 
          // console.log(e.target.value);
          setFilePath(e.target.value);
          // console.log(documentList);
        }
        else{
          setFileSizeError("Please upload documents within 5MB only");
        }
         
    }
    else{
      setFileUploadError("Please upload documents with given format only");
      
      // dispatch(SetNewAlert({
      //   msg: "Please upload images only with given format only",
      //   alertType: "danger",
      // }));
    }
    }
    else{
      setUploadClickError("Please Select Document Type First");
    }
  }

const validateRole = () => {
  let validated = true;
  if(role.length===0){
    validated = false;
    setRoleError("Role is required")
  }
  else {
    setRoleError("Role is required")
  }
  return validated;
}

const handleSubmitErrors = () =>{
  // console.log("in submit errors");
 //  console.log("Formiok submit errors", formik.errors);
  const keys = Object.keys(formik.errors)
  // const roleElement = document.getElementById("role-label");
  // console.log("roleelement", roleElement);
  // roleElement.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" })
//  console.log("keys", keys);
      // Whenever there are errors and the form is submitting but finished validating.
      if (keys.length > 0 ) {
        // console.log("in keyssssssss")
          // We grab the first input element that error by its name.
          const errorElement = document.querySelector(
              `input[name="${keys[0]}"]`
          )
           //  console.log(errorElement);
          if (errorElement) {
              // When there is an input, scroll this input into view.
              errorElement.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" })
          }
      }
      else if(!role){
        
        const roleElement = document.getElementById("role-label");
  // console.log("roleelement", roleElement);
  roleElement.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" });
        }
      
}

    const validateDropDown = () => {
      let validated = true;
      let foundDeduction = false;
      let foundDocument = false;


      deductionList.map((value,index)=>{
       
        deductionList.map((value2,index2)=>{
          if(index2!==index && value2.deductionName === value.deductionName){
            const firstDeductionList = [...deductionList];
            const value1 = firstDeductionList[index];
            value1.errorName = "Same deduction type not allowed";
            firstDeductionList[index] = value1;
            const value2 = firstDeductionList[index2];
            value2.errorName = "Same deduction type not allowed";
            firstDeductionList[index2] = value2;
            setDeductionList(firstDeductionList); 
            foundDeduction = true;
            validated = false;
          }
          return null
        })
        return null
      })

      documentList.map((value,index)=>{
       
        documentList.map((value2,index2)=>{
          if(index2!==index && value2.documentName === value.documentName){
            const firstDocumentList = [...documentList];
            const value1 = firstDocumentList[index];
            value1.errorName = "Same document type not allowed";
            firstDocumentList[index] = value1;
            const value2 = firstDocumentList[index2];
            value2.errorName = "Same document type not allowed";
            firstDocumentList[index2] = value2;
            setDocumentList(firstDocumentList); 
            foundDocument = true;
            validated = false;
          }
          return null
        })
        return null
      })

         // eslint-disable-next-line array-callback-return
        deductionList.map((value,index)=>{
        // console.log("VALUE IN VALIDATIONm",value);
        const conditionName = `deductionName`;
        const conditionValue = `deductionValue`;
        if(!foundDeduction){
          if(value[conditionName]===""){
            validated = false;
            const newDeductionList = [...deductionList];
            const value = newDeductionList[index];
            value.errorName = "This field is required";
            newDeductionList[index] = value;
            setDeductionList(newDeductionList); 
          }
          else{
            const newDeductionList = [...deductionList];
            const value = newDeductionList[index];
            value.errorName = "";
            newDeductionList[index] = value;
            setDeductionList(newDeductionList); 
          }
        }
        
        if(value[conditionValue]===""){
          validated = false;
          const newDeductionList = [...deductionList];
          const value = newDeductionList[index];
          value.errorValue = "This field is required";
          newDeductionList[index] = value;
          setDeductionList(newDeductionList);
        }
        else {
          const newDeductionList = [...deductionList];
          const value = newDeductionList[index];
          value.errorValue = "";
          newDeductionList[index] = value;
          setDeductionList(newDeductionList);
        }
      })

     

      // eslint-disable-next-line array-callback-return
      documentList.map((value,index)=>{
        const conditionName = `documentName`;
        const conditionValue = `documentValue`;

        if(!foundDocument){
          if(value[conditionName]===""){
            validated = false;
            const newDocumentList = [...documentList];
            const value = newDocumentList[index];
            value.errorName = "This field is required";
            newDocumentList[index] = value;
            setDocumentList(newDocumentList); 
          }
          else {
            const newDocumentList = [...documentList];
            const value = newDocumentList[index];
            value.errorName = "";
            newDocumentList[index] = value;
            setDocumentList(newDocumentList);
          }
        }
        if(value[conditionValue]===""){
          validated = false;
          const newDocumentList = [...documentList];
          const value = newDocumentList[index];
          value.errorValue = "This field is required";
          newDocumentList[index] = value;
          setDocumentList(newDocumentList); 
        }
        else {
          const newDocumentList = [...documentList];
          const value = newDocumentList[index];
          value.errorValue = "";
          newDocumentList[index] = value;
          setDocumentList(newDocumentList); 
        }
      })

      return validated;
    }


    // eslint-disable-next-line consistent-return
    const findRole = (listOfObj,id) => {
      const found = listOfObj.find(e => e.id === id);
      // console.log("FOUND",found);
      if(found){
        return found.role
      }
      
    }
    const aadharRegExp = /^\d{12}$/;
    const DistrictsSchema = Yup.object().shape(
      showCouncil?{
        role: Yup.string().required('Role is required'),
      firstName: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter valid first name').required('First Name is required'),
      middleName: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter valid middle name').required('Middle Name is required'),
      lastName: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter valid last name').required('Last Name is required'),
      email:Yup.string().email('Email must be a valid email address').required('Email is required'),
      mobile: Yup.string().matches(/^[0-9]\d{9}$/, 'Phone number is not valid').required('Phone number is required'),
      addressLine1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      states: Yup.string().required('State is required'),
      district: Yup.string().required('Districts is required'),
      // taluka: Yup.string().required('Taluka is required'),
      council: Yup.string().required('Council is required'),
      username: Yup.string().required('Username is required'),
      password: editUser?Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters'):Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters').required('Password is required'),
    }:{
      role: Yup.string().required('Role is required'),
      firstName: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter valid first name').required('First Name is required'),
     // middleName: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter valid middle name'),
      lastName: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter valid last name').required('Last Name is required'),
      mobile: Yup.string().matches(/^[0-9]\d{9}$/, 'Phone number is not valid').required('Mobile number is required'),
      email:Yup.string().email('Email must be a valid email address').required('Email is required'),
      addressLine1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter valid city name').required('City is required'),
      states: Yup.string().required('State is required'),
      district: Yup.string().required('Districts is required'),
      // taluka: Yup.string().required('Taluka is required'),
      aadhaarNumber: Yup.string().matches(aadharRegExp, 'Enter valid aadhar number').required('Aadhar Number is required'),
      education: Yup.string().matches(/^[a-zA-Z_@./#&+-]*(?:\d[a-zA-Z_@./#&+-]*){0,2}$/, "Education containg alphanumeric Format and it accept only 2 digits" ).required('Education is required'),
      dob: Yup.string().required('DOB is required'),
      religion: Yup.string().required('Religion is required'),
      caste: Yup.string().required('Caste is required'),
      differentlyAbled: Yup.string().required('Differently Abled is required'),
      emergencyContactName: Yup.string().required('Emergency Contact Name is required'),
      emergencyContactNumber: Yup.string().matches(/^[0-9]\d{9}$/, 'Phone number is not valid').required('Emergency Contact Number is required'),
      dateOfJoining: Yup.string().required('DateOfJoining is required'),
      designation: Yup.string().required('Designation is required'),
      salaryPerMonth: Yup.string().matches(/^[0-9]*$/, 'Please enter correct salary').required('Salary per month is required'),
      isAgreementDone: Yup.string().required('Is agreement done is required'),
      bankName: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(20,"Maximum length 20 character only").required('BankName is required'),
      accountNumber: Yup.string().required('Account number is required'),
      ifscCode: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'IFSC Code is not valid').required('IFSC is required'),
      panCardNumber: Yup.string().matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/, 'Pancard number is not valid').required('Pancard is required'),
      username: Yup.string().required('Username is required'),
      password: editUser?Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters'):Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters').required('Password is required'),
      // lastDayOfWork: Yup.string().required('Last Day of work is required')
    }
    );
// console.log("-------",userById)
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: editUser ? {
        role,
      firstName: userById.first_name,
      middleName: userById.middle_name,
      lastName: userById.last_name,
      email:userById.email,
      mobile: userById.mobile,
      addressLine1: userById.address_line1?userById.address_line1:"",
      addressLine2: userById?.address_line2?userById?.address_line2:"",
      city: userById?.city?userById.city:"",
      states: userById?.state_id?userById.state_id:"",
      district: userById.district_id?userById.district_id:"",
      taluka: userById.taluka_id?userById.taluka_id:"",
      council: userById?.council_id?userById.council_id:"",
      username: userById.username?userById.username:"",
      password: userById.password,
      aadhaarNumber: userById?.personal_details?.aadhaar_number,
      education: userById?.personal_details?.education,
      dob: userById?.personal_details?.date_of_birth,
      religion: userById?.personal_details?.religion_id,
      caste: userById?.personal_details?.caste,
      differentlyAbled: userById?.personal_details?.is_differently_abled,
      bloodGroup: userById?.personal_details?.blood_group,
      emergencyContactName: userById?.personal_details?.emergency_contact_name,
      emergencyContactNumber: userById?.personal_details?.emergency_contact_number,
      dateOfJoining: userById?.joining_details?.date_of_joining,
      lastDayOfWork: userById?.joining_details?.last_day_of_work,
      isAgreementDone: userById?.joining_details?.is_agreement_done,
      salaryPerMonth: userById?.joining_details?.committed_salary_per_month,
      designation: userById?.joining_details?.designation_id,
      noticePeriod: userById?.joining_details?.is_notice_period_served,
      note: userById?.joining_details?.note,
      panCardNumber: userById?.bank_details?.pan_card_number,
      bankName: userById?.bank_details?.bank_name,
      accountNumber: userById?.bank_details?.account_number,
      ifscCode: userById?.bank_details?.ifsc_code
      }:{
        role:"",
        firstName: "",
      middleName: "",
      lastName: "",
      email:"",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      states:"",
      district: "",
      taluka: "",
      council: "",
      username: "",
      password: "",
      aadhaarNumber: "",
      education: "",
      dob: "",
      religion: "",
      caste: "",
      differentlyAbled: "",
      bloodGroup: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      dateOfJoining: "",
      lastDayOfWork: "",
      isAgreementDone:"",
      salaryPerMonth: "",
      designation: "",
      noticePeriod: "",
      note: "",
      panCardNumber: "",
      bankName: "",
      accountNumber: "",
      ifscCode: ""
      }
      ,
      validationSchema: DistrictsSchema,
      onSubmit: (value) => {
        // console.log("INSIDE ON SUBMIT", value);
        // console.log("Formiok errors sub", formik.errors);
        if(validateRole()){
          if(showCouncil){
            const obj = {
              "basic_info" : {
                first_name:value.firstName,
                middle_name:value.middleName,
                last_name:value.lastName,
                email:value.email,
                mobile: value.mobile,
                address_line1:value.addressLine1,
                address_line2:value.addressLine2,
                city: value.city,
                state_id: value.states,
                district_id:value.district,
                taluka_id:value.taluka,
                council_id: value.council,
                username: value.username,
                password: value.password,
              },
              "roles":editUser?[role]:[role],
            }

            if(editUser){
              // console.log("OBJ",obj);
              dispatch(EditUsers(obj,userById.id))
            }
            else {
              dispatch(AddUsers(obj)).then(()=>{
                // console.log("in DD  ");
              });
            }

            
            
          }
          else if(validateDropDown()){
            const aaplicableDeduction = [];
            deductionList.map((value,index)=>{
              const conditionName = `deductionName`;
              const conditionValue = `deductionValue`;
              const obj = {
                "salary_deduction_type_id": value[conditionName],
                "value": value[conditionValue]
              }
              aaplicableDeduction.push(obj);
              return null;
            })

            const aaplicableDocument = [];
            documentList.map((value,index)=>{
              const conditionName = `documentName`;
              const conditionValue = `documentValue`;
              const obj = {
                "user_document_type_id": value[conditionName],
                "document_path": value[conditionValue]
              }
              aaplicableDocument.push(obj);
              return null;
            })

            const obj = {
              "basic_info" : {
                first_name:value.firstName,
                middle_name:value.middleName,
                last_name:value.lastName,
                email:value.email,
                mobile: value.mobile,
                address_line1:value.addressLine1,
                address_line2:value.addressLine2,
                city: value.city,
                state_id: value.states,
                district_id:value.district,
                taluka_id:value.taluka,
                username: value.username,
                password: value.password,
              },
              "roles":editUser?[role]:[role],
              "personal_details":{
                aadhaar_number:value.aadhaarNumber,
                education: value.education,
                date_of_birth:value.dob,
                religion_id: value.religion,
                caste: value.caste,
                is_differently_abled:value.differentlyAbled,
                blood_group: value.bloodGroup,
                emergency_contact_name: value.emergencyContactName,
                emergency_contact_number: value.emergencyContactNumber
              },
              "joining_details":{
                date_of_joining: value.dateOfJoining,
                last_day_of_work: value.lastDayOfWork,
                is_agreement_done: value.isAgreementDone,
                committed_salary_per_month: value.salaryPerMonth,
                designation_id: value.designation,
                is_notice_period_served: value.noticePeriod,
                note: value.note
              },
              "bank_details": {
                pan_card_number: value.panCardNumber,
                bank_name: value.bankName,
                account_number: value.accountNumber,
                ifsc_code: value.ifscCode
              },
              "applicable_deductions": aaplicableDeduction,
              "documents": aaplicableDocument
            }
            if(editUser){
              // console.log("OBJ",obj);
              dispatch(EditUsers(obj,userById.id));
             // window.history.go(-1);

            }
            else {
              dispatch(AddUsers(obj));
            }
            
            // resetForm();
          }
        }
      },
    });
  
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps,resetForm } = formik;
  
    const handleTopModalClose = () => {
      setTopModalOpen(!topModalOpen)
    }
  
    const handleTopModalAnswer = (answer) => {
      if(answer){
        // dispatch(UnlinkDevice(reqObj))
        if(tempRole===9){
          setShowCouncil(true);
        }
        else {
          setShowCouncil(false);
        }
  
        setRole(tempRole);
      }
      setTopModalOpen(!topModalOpen)
    }
    const useStyles = makeStyles({
      icon: {
        fill: '#214c50',
    },
    });
    const classes = useStyles();
    
    return (
       showLoader ?
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%' }}>
      <CircularProgress style={{color: '#214c50'}} />
      </div>
      :
      <div>
        <WarningMessageDialog 
        isOpenConfirm={topModalOpen}
        message={message}
        handleClose = {(answer)=>handleTopModalAnswer(answer)}
        />
       
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          {editUser?"Edit User":"Create User"}
          </Typography>
          </Stack>
           <Card variant="outlined" style={{padding: "20px 10px", margin : 10,  boxShadow: "4px 4px 4px, 4px" ,}}>
          <Stack spacing={3}>
          <Stack direction= 'row' spacing={2} >
            <Grid container xs={12}>
            <Grid item xs={5.7}>
            <TextField
              select
            fullWidth
              // fullWidth

              // SelectProps={{
              //   multiple:true
              // }}
              id="role"
              name='role'
              label="Role*"
              value={role}
              displayEmpty
              // style={{width:'93.8%', marginLeft: 40,marginTop:5}}
              // onChange={handleRoleChange}
              inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
              onChange={(e) => {
                handleRoleChange(e)
                formik.handleChange(e);
              }}
              placeholder='Select Role*'
              defaultValue={data? data.role: ""}
              // renderValue={(selected) => {
              //   if (selected?.length === 0) {
              //     return <em>Select Role*</em>;
              //   }
              //   const result = [];
              //   selected?.map((value)=>{
              //     const found = findRole(roles,value);
              //     result.push(found);
              //     return null;
              //   })
              //   return result.join(",");
              // }}

              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Role*</em>;
                }
                  const found = findRole(roles,role);
                return found;
              }}

              error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}

            >
               <MenuItem disabled value="">
            <em>Select Role</em>
          </MenuItem>
              {roles?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.role}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
           </Grid>
            </Stack>
            </Stack>
              
            {/* <Typography variant="h5" style={{display: 'flex', justifyContent: "left", marginTop: 5}} gutterBottom>
            Personal Details
          </Typography> */}
           <Typography variant="h5" style={{marginTop: 20,marginBottom: 20}} gutterBottom>
           Basic Details
          </Typography>
            <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  //  style={{width: '10%'}}
                  // style={{width:'57.5%', marginLeft: 40,marginTop:5}}
                  id="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  label="First Name*"
                  placeholder="First Name*"
                   value={values.firstName}
                  onChange={(e)=>{handleFirstName(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
               // {...getFieldProps("firstName")}
                />
                <Typography variant = "body2" style={{ color:"#FF0000"}}>{firstNameError}</Typography>
                <TextField
                  fullWidth
                  id="middleName"
                  autoComplete="middleName"
                  label="Middle Name"
                  placeholder="Middle Name"
                  value={values.middleName}
                  onChange={(e)=>{handleMiddleName(e);
                    formik.handleChange(e)}}
                //   error={Boolean(touched.middleName && errors.middleName)}
                // helperText={touched.middleName && errors.middleName}
               // {...getFieldProps("middleName")}
                />
                <Typography variant = "body2" style={{color:"#FF0000"}}>{middleNameError}</Typography>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  id="lastName"
                  autoComplete="lastName"
                  label="Last Name*"
                  name='lastName'
                  placeholder="Last Name*"
                  value={values.lastName}
                  onChange={(e)=>{handleLastName(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
               // {...getFieldProps("lastName")}
                />
                <Typography variant = "body2" style={{color:"#FF0000"}}>{lastNameError}</Typography>
                <TextField
                  fullWidth
                  id="mobile"
                  name='mobile'
                  autoComplete="contact"
                  label="Mobile Number*"
                  placeholder="Mobile Number*"
                  value={values.mobile}
                  onChange={(e)=>{handleMobile(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.mobile && errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                // {...getFieldProps("mobile")}
                />
                <Typography variant = "body2" style={{ color:"#FF0000"}}>{mobileError}</Typography>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                fullWidth 
                id="email" 
                name="email"
                label="Email*" 
                autoComplete="email" 
                placeholder="Email*" 
                value={values.email}
                onChange={(e)=>{handleEmail(e);
                  formik.handleChange(e)}}
                 error={Boolean(touched.email && errors.email)}
                 helperText={touched.email && errors.email}
                //  {...getFieldProps("email")}
                 />
                 <Typography variant = "body2" style={{color:"#FF0000"}}>{emailError}</Typography>
                <TextField
                  fullWidth
                  style={{marginRight: 10}}
                  id="addressLine1"
                  name="addressLine1"
                  autoComplete="addressLine1"
                  placeholder="Address Line 1*"
                  label="Address Line 1*"
                  value={values.addressLine1}
                  error={Boolean(touched.addressLine1 && errors.addressLine1)}
                helperText={touched.addressLine1 && errors.addressLine1}
                {...getFieldProps("addressLine1")}
                />
             </Stack>
              
             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                <TextField
                  fullWidth
                  style={{width: "110%"}}
                  id="addressLine2"
                  autoComplete="addressLine2"
                  label="Address Line 2"
                  placeholder="Address Line 2"
                  value={values.addressLine2}
                  error={Boolean(touched.addressLine2 && errors.addressLine2)}
                helperText={touched.addressLine2 && errors.addressLine2}
                {...getFieldProps("addressLine2")}
                />
                <TextField 
                fullWidth 
                id="city" 
                name="city"
                style={{width: "105% "}}
                // style={{marginRight: 30}}
                autoComplete="city" 
                label="City*" 
                placeholder="City*" 
                value={values.city}
                onChange={(e)=>{handleCity(e);
                  formik.handleChange(e)}}
                 error={Boolean(touched.city && errors.city)}
                 helperText={touched.city && errors.city}
                // {...getFieldProps("city")}
                 />
                  <Typography variant = "body2" style={{ color:"#FF0000"}}>{cityError}</Typography>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
              <TextField
                select
                fullWidth
              //  style={{width: "95%"}}
                id="states"
                name="states"
                label="State*"
                displayEmpty
                defaultValue={data? data.state_id : ""}
                value={selectedState}
                onChange={(e) => {
                  handleStatesChange(e)
                  formik.handleChange(e);
                }}
                // placeholder='*Select District'
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                error={Boolean(touched.states && errors.states)}
                helperText={touched.states && errors.states}
                
              >
                 <MenuItem disabled value="">
              <em>State*</em>
            </MenuItem>
                {states?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                
                select
                fullWidth
                // style={{width: "95%", marginLeft: 35}}
                id="district"
                name="district"
                label="District*"
                displayEmpty
                onChange={(e) => {
                  handleDistrictChange(e)
                  formik.handleChange(e);
                }}
                defaultValue={data? data.district : ""}
                value={district}
                // placeholder='*Select District'
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                error={Boolean(touched.district && errors.district)}
                helperText={touched.district && errors.district}
                // {...getFieldProps("district")}
              >
                 <MenuItem disabled value="">
              <em>District*</em>
            </MenuItem>
                {showDistrict?districts?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )):null}
              </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
              <Grid container xs={12}>
            <Grid item xs={5.8}>
                <TextField
                select
                fullWidth
                id="taluka"
                name='taluka'
                displayEmpty
                label="Taluka"
                // placeholder='*Select District'
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                error={Boolean(touched.taluka && errors.taluka)}
                helperText={touched.taluka && errors.taluka}
                {...getFieldProps("taluka")}
              >
                 <MenuItem disabled value="">
              <em>Taluka</em>
            </MenuItem>
                {showTaluka?talukas?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )):null}
              </TextField>
               {/* </Grid> */}
              </Grid>

                {showCouncil?
                  <Grid item xs={5.8}>
                <TextField
                  select
                  fullWidth
                  id="council"
                  name='council'
                  label="Council*"
                  displayEmpty
                  defaultValue={data? data.district : ""}
                  value={district}
                  style={{ marginLeft: 30,color: '#214C50'}}
                  placeholder='Select Council*'
                  inputProps={{
                    classes: {
                        icon: classes.icon,
                    },
                }}
                  error={Boolean(touched.council && errors.council)}
                helperText={touched.council && errors.council}
                {...getFieldProps("council")}

                >
                   <MenuItem disabled value="">
                <em>Council*</em>
              </MenuItem>
                  {council?.map((option) => (
                    <MenuItem key={option.id} value={option.id} >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>:null
                }
                </Grid>

              </Stack>
              
              </Stack>
              
                
              
                {showCouncil?null:
               <>
              <Typography variant="h5" style={{marginTop: 20, marginBottom: 20}} gutterBottom>
            Personal Details:
          </Typography>
          <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  autoComplete="aadhar"
                  label="Aadhaar Number*"
                  placeholder="Aadhaar Number*"
                  value={values.aadhaarNumber}
                  onChange={(e)=>{handleAadharCard(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.aadhaarNumber && errors.aadhaarNumber)}
                helperText={touched.aadhaarNumber && errors.aadhaarNumber}
                // {...getFieldProps("aadhaarNumber")}
                  // name="aadhar"
                  // value="aadhar"
                />
                <Typography variant = "body2" style={{color:"#FF0000"}}>{aadharError}</Typography>
              <TextField
                  fullWidth
                  id="education"
                  name="education"
                  autoComplete="education"
                  label="Education*"
                  placeholder="Education*"
                  value={values.education}
                  onChange={(e)=>{handleEducationChange(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.education && errors.education)}
                helperText={touched.education && errors.education}
                // {...getFieldProps("aadhaarNumber")}
                  // name="aadhar"
                  // value="aadhar"
                />
                 <Typography variant = "body2" style={{color:"#FF0000"}}>{educationError}</Typography>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField
                id="dob"
                name='dob'
                fullWidth
                style={{width: "123%"}}
                // label="Date Of Birth"
                type="date"
                label="Date of Birth*"
                value={values.dob}
                placeholder='Date Of Birth*'
                // style={{width:'115%'}}
                // defaultValue="2017-05-24" 
                // className={classes.textField}
                onChange={(e)=>{handleDobChange(e);
                formik.handleChange(e)}}
                error={Boolean(touched.dob && errors.dob)}
                helperText={touched.dob && errors.dob}
                // {...getFieldProps("dob")}
                InputLabelProps={{
                  shrink: true,
                  
                }}
                inputProps={{ max: todayDate }}
              />
              <Typography variant = "body2" style={{color:"#FF0000"}}>{dobError}</Typography>
              <Typography variant = "body2" style={{ color:"#FF0000"}}>{dateLimitError}</Typography>
              <TextField
                select
                fullWidth
                id="religion"
                name='religion'
                label="Religion*"
                value={religion}
                style={{ width: "125%"  }}
                displayEmpty
                defaultValue={data? data.religion: ""}
                placeholder='Religion*'
                onChange={handleReligionChange}
                error={Boolean(touched.religion && errors.religion)}
                helperText={touched.religion && errors.religion}
                {...getFieldProps("religion")}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
              >
                 <MenuItem disabled value="">
              <em>Religion*</em>
            </MenuItem>
                {religions?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.religion}
                  </MenuItem>
                ))}
              </TextField>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
                  fullWidth
                  id="caste"
                  name="caste"
                  autoComplete="caste"
                  label="Caste*"
                  placeholder="Caste*"
                  value={values.caste}
                  onChange={(e)=>{handleCasteChange(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.caste && errors.caste)}
                helperText={touched.caste && errors.caste}
                // {...getFieldProps("caste")}
                />
                <Typography variant = "body2" style={{ color:"#FF0000"}}>{casteError}</Typography>
              <TextField
                select
                fullWidth
                id="diffentlyAbled"
                label="Is Differently Abled?*"
                name='diffentlyAbled'
                displayEmpty
                defaultValue={data? data.caste: ""}
                // style={{width:'93.8%', marginLeft: 40,marginTop:5}}
                onChange={handleGenderChange}
                error={Boolean(touched.differentlyAbled && errors.differentlyAbled)}
                helperText={touched.differentlyAbled && errors.differentlyAbled}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                {...getFieldProps("differentlyAbled")}
              >
                 <MenuItem disabled value="">
              <em>Is Differently Abled?*</em>
            </MenuItem>
                {diffentlyAbled.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                select
                fullWidth
                id="bloodgrp"
                style={{width: "103%"}}
                name='bloodgrp'
                label="Blood Group"
                value={bloodGrp}
                displayEmpty
                // style={{width:'93.8%', marginLeft: 40,marginTop:5}}
                placeholder='Blood Group'
                onChange={handleBloodGrpChange}
                error={Boolean(touched.bloodGroup && errors.bloodGroup)}
                helperText={touched.bloodGroup && errors.bloodGroup}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                {...getFieldProps("bloodGroup")}
              >
                 <MenuItem disabled value="">
              <em>Blood Group</em>
            </MenuItem>
                {BloodGroupValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                  fullWidth
                  style={{marginLeft : 30}}
                  // style={{padding: "20px, 0px"}}

                  id="emergencyContactName"
                  name="emergencyContactName"
                  autoComplete="emergencycontactName"
                  label={editUser? "Emergency Contact Name" : "Emergency Contact Name*"}
                  placeholder={editUser? "Emergency Contact Name" : "Emergency Contact Name*"}
                  value={values.emergencyContactName}
                  onChange={(e)=>{handleEmgName(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.emergencyContactName && errors.emergencyContactName)}
                helperText={touched.emergencyContactName && errors.emergencyContactName}
                // {...getFieldProps("emergencyContactName")}
                />
                <Typography variant = "body2" style={{ color:"#FF0000"}}>{emergencyContactNameError}</Typography>
              </Stack>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Grid container xs={12}>
            <Grid item xs={6}>
              <TextField
                  fullWidth
                  id="emergencyContactNumber"
                  name="emergencyContactNumber"
                  autoComplete="emergencycontactMoNum"
                  label={editUser? "Emergency Contact Mobile Number" : "Emergency Contact Mobile Number*"}
                  placeholder={editUser? "Emergency Contact Mobile Number" : "Emergency Contact Mobile Number*"}
                  value={values.emergencyContactNumber}
                  onChange={(e)=>{handleEmgNumber(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.emergencyContactNumber && errors.emergencyContactNumber)}
                helperText={touched.emergencyContactNumber && errors.emergencyContactNumber}
                // {...getFieldProps("emergencyContactNumber")}
                />
                </Grid>
                </Grid>
                <Typography variant = "body2" style={{marginLeft: 40, color:"#FF0000"}}>{emergencyContactNumberError}</Typography>
            </Stack>
            </Stack>
            
            <Typography variant="h5" style={{marginTop: 20, marginBottom: 20}} gutterBottom>
            Joining and Salary Details:
          </Typography>
          <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
              <TextField
              fullWidth
              // style={{width: "96%"}}
      id="dateOfJoining"
      name="dateOfJoining"
      type="date"
      label="Date Of Joining*"
      placeholder='Date Of Joining*'
      error={Boolean(touched.dateOfJoining && errors.dateOfJoining)}
      helperText={touched.dateOfJoining && errors.dateOfJoining}
      {...getFieldProps("dateOfJoining")}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
    fullWidth
                select
                id="designation"
                name='designation'
                label="Designation*"
                // style={{marginLeft : 40}}
                // style={{width: "80%", justifyContent: "space-between"}}
                value={designation}
                displayEmpty
                defaultValue={data? data.designation: ""}
                // style={{width:'93.8%', marginLeft: 40,marginTop:5}}
                
                onChange={handleDesignationChange}
                error={Boolean(touched.designation && errors.designation)}
                helperText={touched.designation && errors.designation}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                {...getFieldProps("designation")}
              >
                 <MenuItem disabled value="">
              <em>Designation*</em>
            </MenuItem>
                {designations?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                 <TextField
                  fullWidth
                  id="salaryPerMonth"
                  name="salaryPerMonth"
                  autoComplete="salaryPerMonth"
                  label="Commited Salary per Month*"
                  placeholder="Commited Salary per Month*"
                  value={values.salaryPerMonth}
                  onChange={(e)=>{handleSalary(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.salaryPerMonth && errors.salaryPerMonth)}
                helperText={touched.salaryPerMonth && errors.salaryPerMonth}
               // {...getFieldProps("salaryPerMonth")}
                  // name="contact"
                  // value="contact"
                />
                 <Typography variant = "body2" style={{ color:"#FF0000"}}>{salaryPerMonthError}</Typography>
                <TextField
                fullWidth
                select
                id="referredBy"
                name='referredBy'
                label="Is Agreement Done?*"
                value={referredBy}
                displayEmpty
                defaultValue={data? data.referredBy: ""}
                // style={{width:'93.8%', marginLeft: 40,marginTop:5}}
                placeholder='Is Agreement done?*'
                onChange={handleReferredChange}
                error={Boolean(touched.isAgreementDone && errors.isAgreementDone)}
                helperText={touched.isAgreementDone && errors.isAgreementDone}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                {...getFieldProps("isAgreementDone")}
              >
                 <MenuItem disabled value="">
              <em>Is Agreement done?* </em>
            </MenuItem>
                {agreement.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
             </Stack>
                {editUser?(
                  <>
                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                 {/* <DefaultInput
                  fullWidth
                  id="lastDayOfWork"
                  autoComplete="lastDayOfWork"
                  placeholder="Last Day Of Work"
                  defaultValue={data? data.lastDayOfWork: ""}
                  // name="contact"
                  // value="contact"
                /> */}

                <TextField
                fullWidth
                  id="lastDayOfWork"
                  name='lastDayOfWork'
                  type="date"
                  label="Last Day Of work"
                  placeholder='Last Day Of work'
                  value={values.lastDayOfWork}
                  // style={{width:'93.8%', marginLeft: 40,marginTop:5}}
                  onChange={(e)=>{handleLastDayChange(e);
                  formik.handleChange(e)}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(touched.lastDayOfWork && errors.lastDayOfWork)}
                  helperText={touched.lastDayOfWork && errors.lastDayOfWork}
                  // {...getFieldProps("lastDayOfWork")}
                 />
                {lastDayOfWork || values.lastDayOfWork ?  ( <>
          
              <TextField
              fullWidth
                select
                id="noticedperiods"
                label="Is Notice Period Served?"
                name='noticedPeriods'
                value={noticePeriod}
                displayEmpty
                // style={{width:'93.8%', marginLeft: 40,marginTop:5}}
                defaultValue={data? data.noticedPeriods: ""}
                onChange={handleNoticePeriodChange}
                // renderValue={(selected) => {
                //   if (selected.length === 0) {
                //     return <em>Noticed Periods</em>;
                //   }
                //   return selected
                // }}
                error={Boolean(touched.noticePeriod && errors.noticePeriod)}
                helperText={touched.noticePeriod && errors.noticePeriod}
                {...getFieldProps("noticePeriod")}
              >
                 <MenuItem disabled value="">
              <em>Is Notice period served</em>
            </MenuItem>
                {noticePeriodValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </>) : null }
                </Stack>
                </>
                ):null}
                   <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                   <Grid container xs={12}>
            <Grid item xs={5.8}>
                 <TextField
                  fullWidth
                  id="note"
                  name="note"
                  autoComplete="note"
                  label="Note"
                  placeholder="Note"
                  error={Boolean(touched.note && errors.note)}
                  helperText={touched.note && errors.note}
                  {...getFieldProps("note")}
                />
                </Grid>
                </Grid>
                </Stack>
                </Stack>
                <Typography  style={{marginTop: 20, marginBottom: 20}} variant="h5" gutterBottom>
            Bank Details
          </Typography>
          <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  id="bankName"
                  name="bankName"
                  autoComplete="bankName"
                  label="Bank Name*"
                  value={values.bankName}
                  placeholder="Bank Name*"
                  onChange={(e)=>{handleBankName(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.bankName && errors.bankName)}
                  helperText={touched.bankName && errors.bankName}
                  // {...getFieldProps("bankName")}
                />
                <Typography variant = "body2" style={{color:"#FF0000"}}>{bankNameError}</Typography>
                <TextField
                  fullWidth
                  id="accountNumber"
                  name="accountNumber"
                  type='number'
                  autoComplete="account"
                  label="Account Number*"
                  placeholder="Account Number*"
                  value={values.accountNumber}
                  onChange={(e)=>{handleAccNumber(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.accountNumber && errors.accountNumber)}
                  helperText={touched.accountNumber && errors.accountNumber}
                  // {...getFieldProps("accountNumber")}
                />
                <Typography variant = "body2" style={{ color:"#FF0000"}}>{accountNumberError}</Typography>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                
                  fullWidth
                  id="ifscCode"
                  name="ifscCode"
                  autoComplete="IFSC"
                  label="IFSC Code*"
                  value={values.ifscCode}
                  placeholder="IFSC Code*"
                  onChange={(e)=>{handleIFSCCode(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.ifscCode && errors.ifscCode)}
                  helperText={touched.ifscCode && errors.ifscCode}
                  // {...getFieldProps("ifscCode")}
                />
                
              <Typography variant = "body2" style={{ color:"#FF0000"}}>{ifscCodeError}</Typography>
                <TextField
                  fullWidth
                  id="panCardNumber"
                  name="panCardNumber"
                  autoComplete="panCard"
                  label="Pan Card*"
                  value={values.panCardNumber}
                  placeholder="Pan Card*"
                  onChange={(e)=>{handlePancardNumber(e);
                    formik.handleChange(e)}}
                  error={Boolean(touched.panCardNumber && errors.panCardNumber)}
                  helperText={touched.panCardNumber && errors.panCardNumber}
                  // {...getFieldProps("panCardNumber")}
                />
                
              <Typography variant = "body2" style={{ color:"#FF0000"}}>{panCardError}</Typography>
              </Stack>
              </Stack>
                </>
            }
                <Typography variant="h5" style={{marginTop: 20, marginBottom: 20}} gutterBottom>
           Login Details
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
              <TextField
              style={{width: "95%"}}
                  // fullWidth
                  id="userName"
                  name="userName"
                  autoComplete="userName"
                  label="Username*"
                  placeholder="Username*"
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                  {...getFieldProps("username")}
                />
             {
                editUser?
              <TextField
                  fullWidth
                  // style={{marginLeft :40}}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="password"
                  label="Password"
                  placeholder="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end" style={{color: '#214C50'}}>
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // error={Boolean(touched.password && errors.password)}
                  // helperText={touched.password && errors.password}
                  {...getFieldProps("password")}
                />

                :
             
              <TextField
                  fullWidth
                  style={{marginLeft :40}}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="password"
                  label="Password*"
                  placeholder="Password*"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end" style={{color: '#214C50'}}>
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps("password")}
                />
               }
              </Stack>
              {showCouncil?null:
              <>
                <Typography variant="h5" style={{marginTop: 20, marginBottom: 20}} gutterBottom>
                Applicable Deduction
          </Typography>

          {deductionList?.map((value,index)=>(
            //  <Stack spacing={3} key={index}>
            //  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
            <Grid container spacing={4} key={index} >
            <Grid item sm={5}>
              <TextField
                select
                fullWidth
                id="deductionType"
                name='deductionType'
                label="Deduction Type*"
                displayEmpty
                // style={{width: '87%',}}
                defaultValue={data? data.noticedPeriods: ""}
                onChange={(e)=>handleDeductionNameChange(e,index)}
                value={value.deductionName}
                error={Boolean(value.errorName)}
                helperText={value.errorName}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                // renderValue={(selected) => {
                //   if (selected.length === 0) {
                //     return <em>PF</em>;
                //   }
                //   return selected
                // }}
              >
                 <MenuItem disabled value="">
              <em>Deduction Type*</em>
            </MenuItem>
                {salaryDeductionType.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
              <Grid item sm={5}>
              <TextField
                  fullWidth
                  // style={{marginLeft: 20}}
                  id="panCard"
                  autoComplete="panCard"
                  label="Value"
                  placeholder="Enter Value"
                  value={value.deductionValue}
                  error={Boolean(value.errorValue)}
                  helperText={value.errorValue}
                  onChange={(e)=>handleDeductionValueChange(e,index)}
                  // defaultValue={data? data.panCard: ""}
                  // name="contact"
                  // value="contact"
                />
                <Typography variant = "body2" style={{ color:"#FF0000"}}>{deductionValueError}</Typography>
                </Grid>
              <Grid item sm={2}>
                <IconButton color={index+1===deductionLength?'success':'error'} aria-label={index+1===deductionLength?'add':'delete'} size="large" onClick={()=>handleDeductionButtonClick(index+1===deductionLength?'add':'delete',index)}>
                {index+1===deductionLength?
                <AddCircleIcon fontSize="inherit" />:
                <CancelIcon fontSize="inherit" />
                }
                
              </IconButton>
                
       
              </Grid>
              </Grid>
            ))}
          
              <Typography variant="h5" style={{marginTop: 20, marginBottom: 20,}} gutterBottom>
           Upload Document
          </Typography>
         
          {documentList?.map((value,index)=>(
              //  <Stac spacing={3} key={index}>
              //  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
        <Grid container spacing={4} key={index}>
        <Grid item sm={5}>
            <TextField
              select
              fullWidth
              label="Document Type*"
              id="aadharCard"
              name='aadharCard'
              value={value.documentName}
              displayEmpty
              // style={{width: '110%'}}
              onChange={(e)=>handleDocumentNameChange(e,index)}
              error={Boolean(value.errorName)}
              helperText={value.errorName}
              inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
              // renderValue={(selected) => {
              //   if (selected?.length === 0) {
              //     return <em>Aadhar Card</em>;
              //   }
              //   return selected
              // }}
            >
               <MenuItem disabled value="">
            <em>Document Type*</em>
          </MenuItem>
              {userDocumentType?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.type}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item sm={5} style={{alignSelf:'center'}}>
            {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}> */}
             {editUser?
              value.documentValue?
              <Button variant="outlined" target="_blank" rel="noopener" onClick={()=>{handleViewDocument(value.documentValue)}} style={{marginTop:'5px'}}  >
              View Document
            </Button>:
            ( 
            <>
            
            <TextField
             fullWidth
             id="amount"
             type={"file"}
             autoComplete="amount"
             style={{marginBottom: 5}}
             placeholder="Choose file"
            value={value.documentValue}
             error={Boolean(value.errorValue)}
             helperText={value.errorValue}
             onChange={(e)=>handleDocumentValueChange(e,index)}
           />
           
           <Typography variant="body2" color={"#FF0000"}>{fileUploadError}</Typography>
           <Typography variant="body2" color={"#FF0000"}>{fileSizeError}</Typography>
           
           <Typography variant="body2" color={"#FF0000"}>{uploadClickError}</Typography>
           <Typography variant="body2">Supported Formats are .pdf, .jpg, .jpeg, .png, .tiff, .gif</Typography>
           <Typography variant="body2">Supported document size: 5MB</Typography>
           </>
           ) :
           value.documentValue?
              <Button variant="outlined" target="_blank" rel="noopener" onClick={()=>{handleViewDocument(value.documentValue)}} style={{marginTop:'5px'}}  >
              View Document
            </Button>:
             (<>
             <TextField
             fullWidth
             id="amount"
             type={"file"}
             autoComplete="amount"
             style={{marginTop: 5}}
             placeholder="Choose file"
            value={value.documentValue}
             error={Boolean(value.errorValue)}
             helperText={value.errorValue}
             onChange={(e)=>handleDocumentValueChange(e,index)}
           />     
           <Typography variant="body2" color={"#FF0000"}>{fileUploadError}</Typography>
           <Typography variant="body2" color={"#FF0000"}>{fileSizeError}</Typography>
           <Typography variant="body2" color={"#FF0000"}>{uploadClickError}</Typography>
           <Typography variant="body2">Supported Formats are .pdf, .jpg, .jpeg, .png, .tiff, .gif</Typography>
           <Typography variant="body2">Supported document size: 5MB</Typography>
           </>)    
           }
           {/* </Stack> */}
             </Grid>
            <Grid item sm={2}>
           <IconButton color={index+1===documentLength?'success':'error'} aria-label={index+1===documentLength?'add':'delete'} size="large" onClick={()=>handleDocumentButtonClick(index+1===documentLength?'add':'delete',index)}>
                {index+1===documentLength?
                <AddCircleIcon fontSize="inherit" />:
                <CancelIcon fontSize="inherit" />
                }
              </IconButton>
            
              </Grid>
            </Grid>
          
          )
          )}

          </>
          }
          
              
              <Button variant="contained" style={{display:"flex", fontSize: 15,  marginTop: 20, alignSelf:"end", marginLeft:" 90%"}} 
              onClick={(e)=>{
                validateDropDown();
                formik.handleSubmit(e);
                handleSubmitErrors();
              }
               
              }
                >{editUser?"Update":"Save"}</Button>    
            {/* <Button >Add</Button> */}
            </Card>
        </div>
       

    );
  }
  