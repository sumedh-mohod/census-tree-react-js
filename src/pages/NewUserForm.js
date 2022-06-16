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
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetActiveRole } from '../actions/RoleAction';
import { AddUsers, EditUsers, GetDeductionType, GetReligions, GetUserDocumentType, GetUsersById } from '../actions/UserAction';
import { UploadFile, UploadImage } from '../actions/UploadActions';
import DefaultInput from '../components/Inputs/DefaultInput';
import { GetCouncil } from '../actions/CouncilAction';
import { GetActiveDistricts,GetActiveTalukas } from '../actions/MasterActions';
import { GetActiveDesignations } from '../actions/DesignationAction';

export default function NewUserForm(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [gender, setGender] = React.useState('');
    const [religion, setReligion] = React.useState('');
    const [caste, setCaste] = React.useState('');
    const [whoseReference, setWhoseReference] = React.useState('');
    const [bloodGrp, setBloodGrp] = React.useState('');
    const[district, setDistrict]=  React.useState('');
    const[role, setRole]=  React.useState("");
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
      addUsersLog,
      uploadFile,
      uploadFileLog
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
      uploadFile:state.upload.uploadFile,
      uploadFileLog:state.upload.uploadFileLog,
    }));

    useEffect(()=>{
      dispatch(GetDeductionType());
      dispatch(GetUserDocumentType());
      dispatch(GetActiveRole(1));
      dispatch(GetReligions())
      dispatch(GetCouncil(1,1000));
      dispatch(GetActiveDistricts(1,1000,1));
      dispatch(GetActiveTalukas(1,1000,1));
      dispatch(GetActiveDesignations(1,1000,1));
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
      navigate('/dashboard/user', { replace: true });
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
      // console.log("EVENT VALUE",event.target.value);
      // const {
      //   target: { value },
      // } = event;
      // setRole(
      //   // On autofill we get a stringified value.
      //   typeof value === 'string' ? value.split(',') : value,
      // );

      // const roleValue = event.target.value;

      if(event.target.value===9){
        setShowCouncil(true);
      }
      else {
        setShowCouncil(false);
      }

      setRole(event.target.value);
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
    dispatch(UploadFile(formData,index));
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
        console.log("VALUE IN VALIDATIONm",value);
        const conditionName = `deductionName`;
        const conditionValue = `deductionValue`;
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
      console.log("FOUND",found);
      if(found){
        return found.role
      }
      
    }

    const aadharRegExp = /^\d{12}$/;
    const DistrictsSchema = Yup.object().shape(
      showCouncil?{
        role: Yup.string().required('Role is required'),
      firstName: Yup.string().required('First Name is required'),
      // middleName: Yup.string().required('Middle Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email:Yup.string().email('Email must be a valid email address').required('Email is required'),
      mobile: Yup.string().matches(/^[0-9]\d{9}$/, 'Phone number is not valid').required('Phone number is required'),
      addressLine1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      district: Yup.string().required('Districts is required'),
      // taluka: Yup.string().required('Taluka is required'),
      council: Yup.string().required('Council is required'),
      username: Yup.string().required('Username is required'),
      password: editUser?Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters'):Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters').required('Password is required'),
    }:{
      role: Yup.string().required('Role is required'),
      firstName: Yup.string().required('First Name is required'),
      // middleName: Yup.string().required('Middle Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email:Yup.string().email('Email must be a valid email address').required('Email is required'),
      mobile: Yup.string().matches(/^[0-9]\d{9}$/, 'Phone number is not valid').required('Mobile number is required'),
      addressLine1: Yup.string().required('Address Line 1 is required'),
      city: Yup.string().required('City is required'),
      district: Yup.string().required('Districts is required'),
      // taluka: Yup.string().required('Taluka is required'),
      username: Yup.string().required('Username is required'),
      password: editUser?Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters'):Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters').required('Password is required'),
      aadhaarNumber: Yup.string().matches(aadharRegExp, 'Enter valid aadhar number').required('Aadhar Number is required'),
      education: Yup.string().required('Education is required'),
      dob: Yup.string().required('DOB is required'),
      religion: Yup.string().required('Religion is required'),
      caste: Yup.string().required('Caste is required'),
      differentlyAbled: Yup.string().required('DifferentlyAbled is required'),
      emergencyContactName: Yup.string().required('Emergency Contact Name is required'),
      emergencyContactNumber: Yup.string().matches(/^[0-9]\d{9}$/, 'Phone number is not valid').required('Emergency Contact Number is required'),
      dateOfJoining: Yup.string().required('DateOfJoining is required'),
      // lastDayOfWork: Yup.string().required('Last Day of work is required'),
      salaryPerMonth: Yup.string().required('Commited salary per month is required'),
      designation: Yup.string().required('Designation is required'),
      panCardNumber: Yup.string().required('Pancard is required'),
      bankName: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(20,"Maximum length 20 character only").required('BankName is required'),
      accountNumber: Yup.string().required('Account number is required'),
      ifscCode: Yup.string().required('IFSC is required')
    }
    );

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: editUser ? {
        role,
        firstName: userById.first_name,
      middleName: userById.middle_name,
      lastName: userById.last_name,
      email:userById.email,
      mobile: userById.mobile,
      addressLine1: userById.address_line1,
      addressLine2: userById?.address_line2,
      city: userById?.city,
      district: userById.district_id,
      taluka: userById.taluka_id,
      council: userById?.council_id,
      username: userById.username,
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
        console.log("INSIDE ON SUBMIT");
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
              "roles":editUser?[role]:[role],
            }

            if(editUser){
              console.log("OBJ",obj);
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
              console.log("OBJ",obj);
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
  
  

    console.log("DOCUMENT LIST",documentList);
  
    return (
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open max-width dialog
        </Button> */}
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          {editUser?"Edit User":"Create User"}
          </Typography>
          </Stack>
          <Grid container spacing={1}>
          <Grid item sm={6}>
            <TextField
              select
              // SelectProps={{
              //   multiple:true
              // }}
              id="role"
              name='role'
              label="Role*"
              value={role}
              displayEmpty
              style={{width:'87.5%', marginLeft: 40,marginTop:5}}
              // onChange={handleRoleChange}
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
            {/* <Typography variant="h5" style={{display: 'flex', justifyContent: "left", marginTop: 5}} gutterBottom>
            Personal Details
          </Typography> */}
           <Typography variant="h5" style={{marginTop: 20,marginBottom: 20, marginLeft: 40}} gutterBottom>
           Basic Details
          </Typography>
            <Grid container spacing={1}>
            <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  // style={{width: '53%'}}
                  id="fName"
                  autoComplete="fName"
                  label="First Name*"
                  placeholder="First Name*"
                  error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                {...getFieldProps("firstName")}
                />
              </Grid>
              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="mName"
                  autoComplete="mName"
                  label="Middle Name"
                  placeholder="Middle Name*"
                  error={Boolean(touched.middleName && errors.middleName)}
                helperText={touched.middleName && errors.middleName}
                {...getFieldProps("middleName")}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="lName"
                  autoComplete="lName"
                  label="Last Name*"
                  placeholder="Last Name*"
                  error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                {...getFieldProps("lastName")}
                />
              </Grid>
              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="contact"
                  autoComplete="contact"
                  label="Mobile Number*"
                  placeholder="Mobile Number*"
                  error={Boolean(touched.mobile && errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                {...getFieldProps("mobile")}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
                <DefaultInput fullWidth id="Email" label="Email*" autoComplete="email" placeholder="Email*" 
                 error={Boolean(touched.email && errors.email)}
                 helperText={touched.email && errors.email}
                 {...getFieldProps("email")}
                 />
              </Grid>

              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="addressLine1"
                  autoComplete="addressLine1"
                  placeholder="Address Line 1*"
                  label="Address Line 1*"
                  error={Boolean(touched.addressLine1 && errors.addressLine1)}
                helperText={touched.addressLine1 && errors.addressLine1}
                {...getFieldProps("addressLine1")}
                />
              </Grid>
              
              
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="addressLine2"
                  autoComplete="addressLine2"
                  label="Address Line 2"
                  placeholder="Address Line 2"
                  error={Boolean(touched.addressLine2 && errors.addressLine2)}
                helperText={touched.addressLine2 && errors.addressLine2}
                {...getFieldProps("addressLine2")}
                />
              </Grid>
              <Grid item xs={6}>
                <DefaultInput fullWidth id="village" autoComplete="village" label="City*" placeholder="City*" 
                 error={Boolean(touched.city && errors.city)}
                 helperText={touched.city && errors.city}
                 {...getFieldProps("city")}
                 />
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                select
                id="district"
                label="District*"
                displayEmpty
                defaultValue={data? data.district : ""}
                value={district}
                style={{width: '87.5%', marginLeft: 45,marginTop:5}}
                // placeholder='*Select District'
              
                error={Boolean(touched.district && errors.district)}
                helperText={touched.district && errors.district}
                {...getFieldProps("district")}
              >
                 <MenuItem disabled value="">
              <em>District*</em>
            </MenuItem>
                {districts?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>

              <Grid item xs={6}>
              <TextField
                select
                id="taluka"
                // name='District'
                displayEmpty
                label="Taluka"
                style={{width: '87%', marginLeft: 45,marginTop:5}}
                // placeholder='*Select District'
              
                error={Boolean(touched.taluka && errors.taluka)}
                helperText={touched.taluka && errors.taluka}
                {...getFieldProps("taluka")}
              >
                 <MenuItem disabled value="">
              <em>Taluka</em>
            </MenuItem>
                {talukas?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>

              </Grid>
              
              </Grid>
                {showCouncil?
                <Grid container spacing={1} style={{marginTop: 5}}>
                <Grid item xs={6}>
                <TextField
                  select
                  id="council"
                  // name='District'
                  label="Council*"
                  displayEmpty
                  defaultValue={data? data.district : ""}
                  value={district}
                  style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                  placeholder='Select Council*'
                
                  error={Boolean(touched.council && errors.council)}
                helperText={touched.council && errors.council}
                {...getFieldProps("council")}
                >
                   <MenuItem disabled value="">
                <em>Council*</em>
              </MenuItem>
                  {council?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
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
                <DefaultInput
                  fullWidth
                  id="aadhar"
                  autoComplete="aadhar"
                  label="Aadhaar Number*"
                  placeholder="Aadhaar Number*"
                  error={Boolean(touched.aadhaarNumber && errors.aadhaarNumber)}
                helperText={touched.aadhaarNumber && errors.aadhaarNumber}
                {...getFieldProps("aadhaarNumber")}
                  // name="aadhar"
                  // value="aadhar"
                />
              </Grid>
              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="education"
                  autoComplete="education"
                  placeholder="Education*"
                  label="Education*"
                  error={Boolean(touched.education && errors.education)}
                helperText={touched.education && errors.education}
                {...getFieldProps("education")}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="Date of Birth*"
                placeholder='Date Of Birth*'
                // defaultValue="2017-05-24"
                style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                // className={classes.textField}
                error={Boolean(touched.dob && errors.dob)}
                helperText={touched.dob && errors.dob}
                {...getFieldProps("dob")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
              <Grid item xs={6}>
              <TextField
                select
                id="religion"
                name='religion'
                label="Religion*"
                value={religion}
                displayEmpty
                defaultValue={data? data.religion: ""}
                style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                placeholder='Religion*'
                onChange={handleReligionChange}
                error={Boolean(touched.religion && errors.religion)}
                helperText={touched.religion && errors.religion}
                {...getFieldProps("religion")}
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
      </Grid>
      </Grid>
      <Grid container spacing={1} style={{marginTop: 5}}>
      <Grid item xs={6}>
          <DefaultInput
                  fullWidth
                  id="caste"
                  autoComplete="caste"
                  label="Caste*"
                  placeholder="Caste*"
                  error={Boolean(touched.caste && errors.caste)}
                helperText={touched.caste && errors.caste}
                {...getFieldProps("caste")}
                />
      </Grid>
              <Grid item xs={6}>
              <TextField
                select
                id="diffentlyAbled"
                label="Is Differently Abled?*"
                name='diffentlyAbled'
                displayEmpty
                defaultValue={data? data.caste: ""}
                style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                onChange={handleGenderChange}
                error={Boolean(touched.differentlyAbled && errors.differentlyAbled)}
                helperText={touched.differentlyAbled && errors.differentlyAbled}
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
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
                select
                id="bloodgrp"
                name='bloodgrp'
                label="Blood Group"
                value={bloodGrp}
                displayEmpty
                style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                placeholder='Blood Group'
                onChange={handleBloodGrpChange}
                error={Boolean(touched.bloodGroup && errors.bloodGroup)}
                helperText={touched.bloodGroup && errors.bloodGroup}
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
              </Grid>
              <Grid item xs={6}>
              <DefaultInput
                  fullWidth
                  id="emergencycontactName"
                  autoComplete="emergencycontactName"
                  label="Emergency Contact Name*"
                  placeholder="Emergency Contact Name*"
                  error={Boolean(touched.emergencyContactName && errors.emergencyContactName)}
                helperText={touched.emergencyContactName && errors.emergencyContactName}
                {...getFieldProps("emergencyContactName")}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <DefaultInput
                  fullWidth
                  id="emergencycontactMoNum"
                  autoComplete="emergencycontactMoNum"
                  label="Emergency Contact Mobile Number*"
                  placeholder="Emergency Contact Mobile Number*"
                  error={Boolean(touched.emergencyContactNumber && errors.emergencyContactNumber)}
                helperText={touched.emergencyContactNumber && errors.emergencyContactNumber}
                {...getFieldProps("emergencyContactNumber")}
                />
            </Grid>
            </Grid>
            
            <Typography variant="h5" style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} gutterBottom>
            Joining and Salary Details:
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
      id="date"
      type="date"
      label="Date Of Joining*"
      placeholder='Date Of Joining*'
      style={{width: '87.5%', marginLeft: 40,marginTop:5}}
      error={Boolean(touched.dateOfJoining && errors.dateOfJoining)}
      helperText={touched.dateOfJoining && errors.dateOfJoining}
      {...getFieldProps("dateOfJoining")}
      InputLabelProps={{
        shrink: true,
      }}
    />
    </Grid>
    <Grid item xs={6}>
    <TextField
                select
                id="designation"
                name='designation'
                label="Designation*"
                value={designation}
                displayEmpty
                defaultValue={data? data.designation: ""}
                style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                
                onChange={handleDesignationChange}
                error={Boolean(touched.designation && errors.designation)}
                helperText={touched.designation && errors.designation}
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
              </Grid>
                 </Grid>
                 <Grid container spacing={1} style={{marginTop: 5}}>
                   <Grid item xs={6}>
                 <DefaultInput
                  fullWidth
                  id="commitedSalary"
                  autoComplete="commitedSalary"
                  label="Commited Salary per Month*"
                  placeholder="Commited Salary per Month*"
                  error={Boolean(touched.salaryPerMonth && errors.salaryPerMonth)}
                helperText={touched.salaryPerMonth && errors.salaryPerMonth}
                {...getFieldProps("salaryPerMonth")}
                  // name="contact"
                  // value="contact"
                />
                </Grid>
                 <Grid item xs={6}>
                <TextField
                select
                id="referredBy"
                name='referredBy'
                label="Is Agreement done?"
                value={referredBy}
                displayEmpty
                defaultValue={data? data.referredBy: ""}
                style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                placeholder='Is Agreement done?'
                onChange={handleReferredChange}
                error={Boolean(touched.isAgreementDone && errors.isAgreementDone)}
                helperText={touched.isAgreementDone && errors.isAgreementDone}
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
                  id="lastdayOfWork"
                  type="date"
                  label="Last Day Of work"
                  placeholder='Last Day Of work'
                  style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(touched.lastDayOfWork && errors.lastDayOfWork)}
                  helperText={touched.lastDayOfWork && errors.lastDayOfWork}
                  {...getFieldProps("lastDayOfWork")}
                 />
                </Grid>
                <Grid item xs={6}>
              <TextField
                select
                id="noticedperiods"
                label="Is Notice period served?"
                name='noticedPeriods'
                value={noticePeriod}
                displayEmpty
                style={{width: '87.5%', marginLeft: 40,marginTop:5}}
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
              </Grid>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 5}}>
                   <Grid item xs={6}>
                 <DefaultInput
                  fullWidth
                  id="note"
                  autoComplete="note"
                  label="Note"
                  placeholder="Note"
                  error={Boolean(touched.note && errors.note)}
                  helperText={touched.note && errors.note}
                  {...getFieldProps("note")}
                />
                </Grid>
                </Grid>
                <Typography  style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} variant="h5" gutterBottom>
            Bank Details
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
          <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="bankName"
                  autoComplete="bankName"
                  label="Bank Name*"
                  placeholder="Bank Name*"
                  error={Boolean(touched.bankName && errors.bankName)}
                  helperText={touched.bankName && errors.bankName}
                  {...getFieldProps("bankName")}
                />
              </Grid>
              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="account"
                  type='number'
                  autoComplete="account"
                  label="Account Number*"
                  placeholder="Account Number*"
                  error={Boolean(touched.accountNumber && errors.accountNumber)}
                  helperText={touched.accountNumber && errors.accountNumber}
                  {...getFieldProps("accountNumber")}
                />
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="IFSC"
                  autoComplete="IFSC"
                  label="IFSC Code*"
                  placeholder="IFSC Code*"
                  error={Boolean(touched.ifscCode && errors.ifscCode)}
                  helperText={touched.ifscCode && errors.ifscCode}
                  {...getFieldProps("ifscCode")}
                />
              </Grid>
              <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  id="panCard"
                  autoComplete="panCard"
                  label="Pan Card*"
                  placeholder="Pan Card*"
                  error={Boolean(touched.panCardNumber && errors.panCardNumber)}
                  helperText={touched.panCardNumber && errors.panCardNumber}
                  {...getFieldProps("panCardNumber")}
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
              <DefaultInput
                  fullWidth
                  id="userName"
                  autoComplete="userName"
                  label="Username*"
                  placeholder="Username*"
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                  {...getFieldProps("username")}
                />
              </Grid>{
                editUser?

                <Grid item xs={6}>
              <DefaultInput
                  fullWidth
                  id="password"
                  autoComplete="password"
                  label="Password*"
                  placeholder="Password*"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  {...getFieldProps("password")}
                />
              </Grid>

                :
             
              <Grid item xs={6}>
              <DefaultInput
                  fullWidth
                  id="password"
                  autoComplete="password"
                  label="Password*"
                  placeholder="Password*"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  {...getFieldProps("password")}
                />
              </Grid>
               }
              </Grid>
              {showCouncil?null:
              <>
                <Typography variant="h5" style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} gutterBottom>
                Applicable Deduction
          </Typography>

          {deductionList?.map((value,index)=>(
              <Grid container spacing={1} style={{marginTop: 5}} key={index} >
              <Grid item xs={5}>
              <TextField
                select
                id="pf"
                name='pf'
                label="Deduction Type*"
                displayEmpty
                style={{width: '87.5%', marginLeft: 40,marginTop:5}}
                defaultValue={data? data.noticedPeriods: ""}
                onChange={(e)=>handleDeductionNameChange(e,index)}
                value={value.deductionName}
                error={Boolean(value.errorName)}
                helperText={value.errorName}
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
              <Grid item xs={5}>
              <TextField
                  fullWidth
                  id="panCard"
                  autoComplete="panCard"
                  label="Value"
                  style={{marginTop: 5}}
                  placeholder="Enter Value"
                  value={value.deductionValue}
                  error={Boolean(value.errorValue)}
                  helperText={value.errorValue}
                  onChange={(e)=>handleDeductionValueChange(e,index)}
                  // defaultValue={data? data.panCard: ""}
                  // name="contact"
                  // value="contact"
                />
              </Grid>
              <Grid item xs={2}>
            
                <IconButton color={index+1===deductionLength?'success':'error'} aria-label={index+1===deductionLength?'add':'delete'} size="large" onClick={()=>handleDeductionButtonClick(index+1===deductionLength?'add':'delete',index)}>
                {index+1===deductionLength?
                <AddCircleIcon fontSize="inherit" />:
                <CancelIcon fontSize="inherit" />
                }
                
              </IconButton>
                
       
              </Grid>
              </Grid>
            ))}
          
              <Typography variant="h5" style={{marginTop: 20, marginBottom: 20, marginLeft: 40}} gutterBottom>
           Upload Document
          </Typography>
          {documentList?.map((value,index)=>(
            <Grid container spacing={1} style={{marginTop: 5}} key={index}>
            <Grid item xs={5}>
            <TextField
              select
              label="Document Type*"
              id="aadharCard"
              name='aadharCard'
              value={value.documentName}
              displayEmpty
              style={{width: '87.5%', marginLeft: 40,marginTop:5}}
              onChange={(e)=>handleDocumentNameChange(e,index)}
              error={Boolean(value.errorName)}
              helperText={value.errorName}
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
            <Grid item xs={5} style={{alignSelf:'center'}}>
              {value.documentValue?
              <Button variant="outlined" target="_blank" rel="noopener" style={{marginTop:'5px'}}  href={`${value.documentValue}`}>
              View Document
            </Button>:
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
              }
           
            </Grid>
            <Grid item xs={2}>
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
          
              
              <Button variant="text" style={{display:"flex", fontSize: 15,  marginTop: 20, alignSelf:"end", marginLeft:" 90%"}} onClick={handleSubmit}>{editUser?"Update":"Save"}</Button>    
            {/* <Button >Add</Button> */}
        </div>
    );
  }
  