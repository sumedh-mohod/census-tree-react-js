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
  Link,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Visibility } from '@mui/icons-material';
import { GetActiveRole } from '../../actions/RoleAction';
import { AddUsers, EditUsers, GetDeductionType, GetReligions, GetUserDocumentType, GetUsersById } from '../../actions/UserAction';
import { UploadFile, UploadImage } from '../../actions/UploadActions';
import DefaultInput from '../../components/Inputs/DefaultInput';
import { GetCouncil } from '../../actions/CouncilAction';
import { GetActiveDesignations, GetDesignations } from '../../actions/DesignationAction';
import { GetActiveDistricts,GetActiveTalukas } from '../../actions/MasterActions';

export default function ViewUser(props) {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [gender, setGender] = React.useState('');
    const [religion, setReligion] = React.useState('');
    const [caste, setCaste] = React.useState('');
    const [whoseReference, setWhoseReference] = React.useState('');
    const [bloodGrp, setBloodGrp] = React.useState('');
    const[district, setDistrict]=  React.useState('');
    const[role, setRole]=  React.useState([]);
    const [agreementDone, setAgreementDone] = React.useState('');
    const [documentProvided, setDocumentProvided] = React.useState('');
    const [applicableDeducation, setApplicableDeducation] = React.useState('');
    const [designation, setDesignation] =  React.useState('');
    const [value, setValue] = React.useState(null);
    const [referredBy, setReferredBy] = React.useState('');
    const [noticePeriod, setNoticePeriod] = React.useState('');
    const [formValues, setFormValues] = useState([{ deductionType: "", amount : ""}])
    const { isOpen, data } = props;
    const [deductionList,setDeductionList] = useState([{deductionName:"",deductionValue:"",errorName:"",errorValue:""}])
    const [documentList,setDocumentList] = useState([{documentName:"",documentValue:"",errorName:"",errorValue:""}])
    const [errorState,setErrorState] = useState({});
    const [showCouncil,setShowCouncil] = useState(false);
    const [editUser,setEditUser] = useState(false);  
    const [roleError,setRoleError] = useState("");
    const {
      salaryDeductionType,
      userDocumentType,
      roles,
      religions,
      council,
      districts,
      talukas,
      userById,
      designations,
      addUsersLog
    } = useSelector((state) => ({
      salaryDeductionType:state.users.salaryDeductionType,
      userDocumentType:state.users.userDocumentType,
      roles:state.roles.roles,
      religions:state.users.religions,
      council:state.council.council,
      districts:state.master.districts,
      talukas:state.master.talukas,
      userById:state.users.userById,
      designations:state.designations.designations,
      addUsersLog:state.users.addUsersLog,
    }));

    useEffect(()=>{
      dispatch(GetDeductionType());
      dispatch(GetUserDocumentType());
      dispatch(GetActiveRole(1));
      dispatch(GetReligions())
      dispatch(GetCouncil(1,1000));
      dispatch(GetDesignations(1,1000));
      dispatch(GetActiveDistricts(1,1000,1));
      dispatch(GetActiveTalukas(1,1000,1));
    },[])

    const { userId } = useParams();
    useEffect(()=>{
      
      if(userId){
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
        separateId(userById.roles)
        seprateDeduction(userById.applicable_deductions)
        separateDocument(userById.documents)
        setEditUser(true);
      }
    },[userById])

    const separateId = (roles) => {
      const roleArray = [];
      roles.map((value,index)=>{
        if(value.slug==="council"){
          setShowCouncil(true);
        }
        roleArray.push(value.role);
        return null;
      })
      setRole(roleArray)
    }

    const getNameById = (listOfObj,id,valueToSeparate) => {
      if(listOfObj && listOfObj.length!==0){
        const found = listOfObj.find(e => e.id === id);
        if(found){
          return found[valueToSeparate]
        }
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
          const deductionName = getNameById(salaryDeductionType,value.salary_deduction_type_id,"type")
          const infoToAdd = {
            'deductionName':deductionName,
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
          const documentName = getNameById(userDocumentType,value.user_document_type_id,"type")
          console.log("DOCUMENT PATH",value.document_path);
          const infoToAdd = {
            'documentName':documentName,
            'documentValue':value.document_path,
            'errorName':"",
            'errorValue':"",
          }
          documentList.push(infoToAdd)
          return null;
        })
      }
      console.log("DOCUMENT LIST",documentList);
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
    },[addUsersLog])

    console.log("RELIGIONS",religions);

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
        value: '0+',
        label: '0+',
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
        value: '1',
        label: 'Yes',
      },
      {
        value: '0',
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
      setNoticePeriod(event.target.value);
    };
  
    const handleRoleChange = (event) => {
      console.log("EVENT VALUE",event.target.value);
      const {
        target: { value },
      } = event;
      setRole(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );

      const roleValue = event.target.value;

      if(roleValue.indexOf(9)!==-1){
        setShowCouncil(true);
      }
      else {
        setShowCouncil(false);
      }

      // setRole(event.target.value);
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
      setCaste(event.target.value);
    };
  
    const handleClose = () => {
      props.handleClose();
    };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };
    const handleDistrictChange = (event) => {
      setDistrict(event.target.value);
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
      const newDeductionList = [...deductionList];
      const value = newDeductionList[index];
      value.deductionValue = e.target.value;
      newDeductionList[index] = value;
      setDeductionList(newDeductionList); 
     
  }

    const handleDocumentButtonClick = (value,index) => {
      console.log("HANDLE DOCUMENT BUTTONVCLICKED CALLED");
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
      setDocumentList(newDocumentList); 
     
  }

  const handleDocumentValueChange = (e,index) => {
    console.log("HANDLE DOCMENT VALUE CAHNGE",e.target.files[0])
    const formData = new FormData();
    formData.append('upload_for', 'users');
    formData.append('file', e.target.files[0]);
    dispatch(UploadFile(formData));
    const newDocumentList = [...documentList];
    const value =  newDocumentList[index];
    value.documentValue = e.target.value;
    newDocumentList[index] = value;
    setDocumentList(newDocumentList); 
   
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

    const validateDropDown = () => {
      let validated = true;
      // eslint-disable-next-line array-callback-return
      deductionList.map((value,index)=>{
        const conditionName = `deductionName`;
        const conditionValue = `deductionValue`;
        if(value[conditionName]===""){
          validated = false;
          const newDeductionList = [...deductionList];
          const value = newDeductionList[index];
          value.errorName = "error found";
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
        if(value[conditionValue]===""){
          validated = false;
          const newDeductionList = [...deductionList];
          const value = newDeductionList[index];
          value.errorValue = "error found";
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
        if(value[conditionName]===""){
          validated = false;
          const newDocumentList = [...documentList];
          const value = newDocumentList[index];
          value.errorName = "Error found";
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
        if(value[conditionValue]===""){
          validated = false;
          const newDocumentList = [...documentList];
          const value = newDocumentList[index];
          value.errorValue = "Error found";
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
      console.log("FOUND",found);
      if(found){
        return found.role
      }
      
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const DistrictsSchema = Yup.object().shape(
      showCouncil?{
      firstName: Yup.string().required('First Name is required'),
      middleName: Yup.string().required('Middle Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email:Yup.string().email('Email must be a valid email address').required('Email is required'),
      mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Email is required'),
      addressLine1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      district: Yup.string().required('Districts is required'),
      taluka: Yup.string().required('Taluka is required'),
      council: Yup.string().required('Council is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }:{
      firstName: Yup.string().required('First Name is required'),
      middleName: Yup.string().required('Middle Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email:Yup.string().email('Email must be a valid email address').required('Email is required'),
      mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Email is required'),
      addressLine1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      district: Yup.string().required('Districts is required'),
      taluka: Yup.string().required('Taluka is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      aadhaarNumber: Yup.string().required('Aadhar Number is required'),
      education: Yup.string().required('Education is required'),
      dob: Yup.string().required('DOB is required'),
      religion: Yup.string().required('Religion is required'),
      caste: Yup.string().required('Caste is required'),
      differentlyAbled: Yup.string().required('DifferentlyAbled is required'),
      emergencyContactName: Yup.string().required('Emergency Contact Name is required'),
      emergencyContactNumber: Yup.string().required('Emergency Contact Number is required'),
      dateOfJoining: Yup.string().required('DateOfJoining is required'),
      lastDayOfWork: Yup.string().required('Last Day of work is required'),
      salaryPerMonth: Yup.string().required('Commited salary per month is required'),
      designation: Yup.string().required('Designation is required'),
      panCardNumber: Yup.string().required('Pancard is required'),
      bankName: Yup.string().required('BankName is required'),
      accountNumber: Yup.string().required('Account number is required'),
      ifscCode: Yup.string().required('IFSC is required')
    }
    );

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: editUser ? {
        firstName: userById.first_name,
      middleName: userById.middle_name,
      lastName: userById.last_name,
      email:userById.email,
      mobile: userById.mobile,
      addressLine1: userById.address_line1,
      addressLine2: userById?.address_line2,
      city: userById?.city,
      district: getNameById(districts, userById.district_id,"name"),
      taluka: getNameById(talukas,userById.taluka_id, "name"),
      council: getNameById(council, userById?.council_id,"name"),
      username: userById.username,
      password: userById.password,
      aadhaarNumber: userById?.personal_details?.aadhaar_number,
      education: userById?.personal_details?.education,
      dob: userById?.personal_details?.date_of_birth,
      religion: getNameById(religions,userById?.personal_details?.religion_id,"religion"),
      caste: userById?.personal_details?.caste,
      differentlyAbled: userById?.personal_details?.is_differently_abled,
      bloodGroup: userById?.personal_details?.blood_group,
      emergencyContactName: userById?.personal_details?.emergency_contact_name,
      emergencyContactNumber: userById?.personal_details?.emergency_contact_number,
      dateOfJoining: userById?.joining_details?.date_of_joining,
      lastDayOfWork: userById?.joining_details?.last_day_of_work,
      isAgreementDone: userById?.joining_details?.is_agreement_done,
      salaryPerMonth: userById?.joining_details?.committed_salary_per_month,
      designation: getNameById(designations, userById?.joining_details?.designation_id,"name"),
      noticePeriod: userById?.joining_details?.is_notice_period_served,
      note: userById?.joining_details?.note,
      panCardNumber: userById?.bank_details?.pan_card_number,
      bankName: userById?.bank_details?.bank_name,
      accountNumber: userById?.bank_details?.account_number,
      ifscCode: userById?.bank_details?.ifsc_code
      }:{
        firstName: "",
      middleName: "",
      lastName: "",
      email:"",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
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
                district_id:value.district,
                taluka_id:value.taluka,
                council_id: value.council,
                username: value.username,
                password: value.password,
              },
              "roles":role,
            }

            if(editUser){
              dispatch(EditUsers(obj,userById.id))
            }
            else {
              dispatch(AddUsers(obj));
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
                district_id:value.district,
                taluka_id:value.taluka,
                username: value.username,
                password: value.password,
              },
              "roles":role,
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
              dispatch(EditUsers(obj,userById.id))
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
  
    return (
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open max-width dialog
        </Button> */}
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          User Details
          </Typography>
          </Stack>
          <Grid container spacing={1}>
          <Grid item sm={6}>
          <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="role"
                  autoComplete="role"
                  label="Role"
                  value={role}
                />
            </Grid>
            </Grid>
            {/* <Typography variant="h5" style={{display: 'flex', justifyContent: "left", marginTop: 5}} gutterBottom>
            Personal Details
          </Typography> */}
           <Typography variant="h5" style={{marginTop: 20,marginBottom: 20, marginLeft: 40}} gutterBottom>
           Basic Details
          </Typography>
            <Grid container spacing={1}>
            <Grid item xs={6}>
                <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="fName"
                  autoComplete="fName"
                  label="Full Name"
                  value={`${values.firstName} ${ values.middleName} ${ values.lastName}`}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="mobile"
                  label="Mobile Number"
                  value={values.mobile}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="email"
                  label="Email"
                  value={values.email}
                />
              </Grid>

              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="addressLine1"
                  label="Address"
                  value={`${values.addressLine1 } ${ values.addressLine2 } ${ values.city}`}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="district"
                  label="District"
                  value={values.district}
                />
              </Grid>

              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="taluka"
                  label="Taluka"
                  value={values.taluka}
                />
              </Grid>

              </Grid>
              
              </Grid>
                {showCouncil?
                <Grid container spacing={1} style={{marginTop: 5}}>
                <Grid item xs={6}>
                <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="council"
                  label="Council"
                  value={values.council}
                />
                </Grid>
                </Grid>:null
                }
              
                {showCouncil?null:
               <>
              <Typography variant="h5" style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} gutterBottom>
            Personal Details:
          </Typography>
              <Grid container spacing={1} style={{marginTop: 5}}>
            
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="aadhar"
                  label="Aadhar"
                  value={values.aadhaarNumber}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="education"
                  label="Education"
                  value={values.education}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="dob"
                  label="Date of birth"
                  value={values.dob}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="religion"
                  label="Religion"
                  value={values.religion}
                />
      </Grid>
      </Grid>
      <Grid container spacing={1} style={{marginTop: 5}}>
      <Grid item xs={6}>
            <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="catse"
                  label="Caste"
                  value={values.caste}
                />
      </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="differentlyAbled"
                  label="Differently Abled ?"
                  value={values.differentlyAbled?"Yes":"No"}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="bloodGroup"
                  label="Blood group"
                  value={values.bloodGroup}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="emergencyContactname"
                  label="Emergency Contact Name"
                  value={values.emergencyContactName}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="emergencyContactNumber"
                  label="Emergency Contact Number"
                  value={values.emergencyContactNumber}
                />
            </Grid>
            </Grid>
            
            <Typography variant="h5" style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} gutterBottom>
            Joining and Salary Details:
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="dateOfJoining"
                  label="Date of joining"
                  value={values.dateOfJoining}
                />
    </Grid>
    <Grid item xs={6}>
            <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="designation"
                  label="Designation"
                  value={values.designation}
                />
              </Grid>
                 </Grid>
                 <Grid container spacing={1} style={{marginTop: 5}}>
                   <Grid item xs={6}>
                   <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="commitedSalaryPerMonth"
                  label="Commited Salary Per Month"
                  value={values.salaryPerMonth}
                />
                </Grid>
                 <Grid item xs={6}>
                 <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="isAgreementDone"
                  label="Agreement Done"
                  value={values.isAgreementDone?"Yes":"No"}
                />
                </Grid>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 5}}>
                   <Grid item xs={6}>
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
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="lastDayOfWork"
                  label="Last day of work"
                  value={values.lastDayOfWork}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="noticePeriod"
                  label="Notice Period"
                  value={values.noticePeriod?"Yes":"No"}
                />
              </Grid>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 5}}>
                   <Grid item xs={6}>
                   <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="note"
                  label="Notes"
                  value={values.note}
                />
                </Grid>
                </Grid>
                <Typography  style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} variant="h5" gutterBottom>
            Bank Details
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
          <Grid item xs={6}>
            <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="bankName"
                  label="Bank Name"
                  value={values.bankName}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="accountNumber"
                  label="Account Number"
                  value={values.accountNumber}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="ifscCode"
                  label="IFSC Code"
                  value={values.ifscCode}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="pancardNumber"
                  label="Pancard Number"
                  value={values.panCardNumber}
                />
              </Grid>
                </Grid>
                </>
            }
                <Typography variant="h5" style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} gutterBottom>
           Login Details
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
          <Grid item xs={6}>
            <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="username"
                  label="Username"
                  value={values.username}
                />
              </Grid>
              {/* <Grid item xs={6}>
              <DefaultInput
                  fullWidth
                  id="password"
                  autoComplete="password"
                  placeholder="Password*"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  {...getFieldProps("password")}
                />
              </Grid> */}
              </Grid>
              {showCouncil?null:
              <>
                <Typography variant="h5" style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} gutterBottom>
                Applicable Deducation
          </Typography>

          {deductionList?.map((value,index)=>(
              <Grid container spacing={1} style={{marginTop: 5}} key={index} >
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="deductionType"
                  label="Deduction Type"
                  value={value.deductionName}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="deductionValue"
                  label="Value"
                  value={value.deductionValue}
                />
              </Grid>
              </Grid>
            ))}
          
              <Typography variant="h5" style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} gutterBottom>
           Uploaded Document
          </Typography>
          {documentList?.map((value,index)=>(
            <Grid container spacing={1} style={{marginTop: 5}} key={index}>
            <Grid item xs={6}>
            <TextField
                  fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined'
                  inputProps={
					{ readOnly: true, }
				    }
                  id="documentValue"
                  label="Document Type"
                  value={value.documentName}
                />
            </Grid>
            <Grid item xs={6}>
            {/* <Link fullWidth
                  style={{width: '88%', marginLeft: 40}}
                  variant='outlined' target="_blank" rel="noopener" href={`${value.documentName}`} >
             
              <IconButton   size="large">
                View Uploaded File
                
              </IconButton>
          </Link> */}
          {/* <IconButton aria-label="delete" target="_blank" rel="noopener" size="large" href={`${value.documentValue}`} color="success">
                            <Visibility />
              </IconButton> */}
              <Button variant="outlined" target="_blank" rel="noopener" style={{marginTop:'5px'}}  href={`${value.documentValue}`}>
              View Document
            </Button>
            </Grid>
            {/* <Grid item xs={2}>
            <IconButton color={index+1===documentLength?'success':'error'} aria-label={index+1===documentLength?'add':'delete'} size="large" onClick={()=>handleDocumentButtonClick(index+1===documentLength?'add':'delete',index)}>
                {index+1===documentLength?
                <AddCircleIcon fontSize="inherit" />:
                <CancelIcon fontSize="inherit" />
                }
              </IconButton>
            </Grid> */}
            </Grid>
          )
          )}

          </>
          }
            {/* <Button >Add</Button> */}
        </div>
    );
  }
  