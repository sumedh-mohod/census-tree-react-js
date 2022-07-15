
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Pagination,
  Link,
  IconButton,
} from '@mui/material';

import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility } from '@mui/icons-material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { GetReports } from '../../actions/ReportsAction';
import { GetActiveCouncil } from '../../actions/CouncilAction';
import { GetZonesByCouncilId } from '../../actions/ZonesAction';
import { GetWardsByCouncilId } from '../../actions/WardsActions';
import ReportListToolbar from '../../sections/@dashboard/tree/ReportListToolbar';
import ByWardReports from './ByWardReports';
import ByTreeNameReports from './ByTreeNameReports';
import ByTreeTypeReports from './ByTreeTypeReports';
import ByTreeConditionReports from './ByTreeConditionReports';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Reports() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [viewOpen, setViewOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  // const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [stateName, setStateName] = useState('');
   const [zoneId,setZoneId] = useState('');
   const [wardId,setWardId] = useState('');
   const [coucilId,setCouncilId] = useState('');
   const[fromDate, setFromDate] = useState('');
   const[toDate, setToDate] = useState('');
   const [imageList,setImageList] = useState([]);
   const [showList,setShowList] = useState(false);
   const [qcDialogOpen,setQcDialogOpen] = useState(false);
   const [baseColorId,setBaseColorId] = useState("");
   const [value, setValue] = useState('1');
   const [councilName, setCouncilName] = useState('');
   const userPermissions = [];

   const {
    council,
    zones,
    wards,
    reports,
    loggedUser
    // editBaseColorTreesLog,
    // deleteBaseColorTreesLog,
    // updateQCStatusLog,
    // pageInfo
  } = useSelector((state) => ({
    council: state.council.activeCouncil,
    reports:state.reports.reports,
    loggedUser:state.auth.loggedUser,
   
  }));

  loggedUser.roles[0].permissions.map((item, index)=>(
    userPermissions.push(item.name)
  ))
  

  const secondRun = React.useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setShowList(true);
  },[])
  console.log("reports", reports)
  console.log("council", council)

  // const handleNameCouncil = () => {

  // }

  const separateId = (id) => {
    council.map((value,index)=>{
      if(value.id===id){
        setCouncilName(value.name);
      }
      return null;
    })
  }


  useEffect(()=>{
    dispatch(GetActiveCouncil(1));
    // dispatch(GetBaseColorTreeById(1));
  },[])
  // useEffect(()=>{
  //   dispatch(GetCouncil(1,1000));
  //   // dispatch(GetBaseColorTreeById(1));
  // },[])

  // useEffect(()=>{
  //   if(pageInfo){
  //     setCount(pageInfo?.total)
  //   }
  // },[pageInfo])


  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  // let timer = null;
  // const filterByName = (event) => {
  //   const {value} = event.currentTarget;
  //   clearTimeout(timer);
  //   // Wait for X ms and then process the request
  //   timer = setTimeout(() => {
  //         dispatch(GetReports(coucilId ));
  //         setShowList(false)
  //         // setSearch(false);
  
  //         // setSearchValue("")

  //   }, 1000);

  // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


const handleCoucilChange = (value) => {
  setCouncilName(value)
}

  const dataValue =  reports?.by_wards;
  const value1= [];
  dataValue?.map((option, index) => {
    const value2 = [index+1]
    value2.push(option.name)
    value2.push(option.census_trees_count)
    value1.push(value2)
    return null
  })


  const TreeName =  reports?.by_tree_names;
  const treeNameValue1 = [];
  TreeName?.map((option, index) => {
    const treeNameValue2 = [index+1]
    treeNameValue2.push(option.name)
    treeNameValue2.push(option.census_trees_count)
    treeNameValue1.push(treeNameValue2)
    return null
  })


  const treeType =  reports?.by_tree_types;
  const treeType1= [];
  treeType?.map((option, index) => {
    const treeType2 = [index+1]
    treeType2.push(option.tree_type)
    treeType2.push(option.census_trees_count)
    treeType1.push(treeType2)
    return null
  })


  const TreeCondition =  reports?.by_tree_conditions;
  const TreeCondition1= [];
  TreeCondition?.map((option, index) => {
    const TreeCondition2 = [index+1]
    TreeCondition2.push(option.condition)
    TreeCondition2.push(option.census_trees_count)
    TreeCondition1.push(TreeCondition2)
    return null
  })


  console.log("dataValue", dataValue)
  console.log("TreeName", TreeName)
  console.log("treeType", treeType)
  console.log("council1234", councilName)
  console.log("Council123", council?.id)
  const exportPdf = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()
    doc.text("Kalmeshwar Muncipal Council", 20, 10);
    // doc.({`${council?.name}`})
    // doc.text1("Council Name : ", 20, 10);
    doc.addPage()
    doc.text("By Wards", 20, 10);
    autoTable(doc, {
      text: ("By Ward", 20, 10),
      head: [['#', 'Tree Names', 'Counts']],
      body: value1
    })

    autoTable(doc, {
      text: ("By Tree Name", 20, 10),
      head: [['#', 'Tree Names', 'Counts']],
      body: treeNameValue1
    })
  

    autoTable(doc, {
      text: ("By Tree Type", 20, 10),
      head: [['#', 'Tree Types', 'Counts']],
      body: treeType1
    })

    autoTable(doc, {
      text: ("By Tree Condition", 20, 10),
      head: [['#', 'Tree Conditions', 'Counts']],
      body: TreeCondition1
    })

    doc.save(`${councilName}.pdf`)
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  console.log("reports1", reports?.by_wards)
  // const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
   
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" style={{ color: "#000000"}}separator='>'>
        {/* <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
          Tree Data
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
          href="#"
        >
    Reports
        </Link> */}
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
            Tree Data
          </Typography>
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
        Reports
          </Typography>
      </Breadcrumbs>
    </div>
        </Stack>
        <Card> 
        <ReportListToolbar
      handleCouncil={(e)=>separateId(e)} 
        handleCoucilChange={(e)=>handleCoucilChange(e)} 
        // coucilId={coucilId}
        // fromDate={""}
        // toDate={""}
        // handleGetData={handleSubmit}
        // callType="BaseColor"
        />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
              <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="By Wards" value="1" />
            <Tab label="By Tree Names" value="2" />
            <Tab label="By Tree Types" value="3" />
            <Tab label="By Tree Conditions" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {!councilName ? (
                  <div align="center" fontWeight={700}> 
                  Please select council to get data
                </div>
                ) :
             <ByWardReports
             data={reports?.by_wards? reports?.by_wards: []}/>
          }
       
        </TabPanel>
        <TabPanel value="2">
        {!councilName ? (
                  <div align="center" fontWeight={700}> 
                  Please select council to get data
                </div>
                ) :
          <ByTreeNameReports
          data={reports?.by_tree_names ? reports?.by_tree_names: []}
          />}
        </TabPanel>
        <TabPanel value="3">
        {!councilName ? (
                  <div align="center" fontWeight={700}> 
                  Please select council to get data
                </div>
                ) :
    <ByTreeTypeReports
    data={reports?.by_tree_types ? reports?.by_tree_types : []}
    />}
        </TabPanel>
        <TabPanel value="4">
        {!councilName ? (
                  <div align="center" fontWeight={700}> 
                  Please select council to get data
                </div>
                ) :
    <ByTreeConditionReports
    data={reports?.by_tree_conditions ? reports?.by_tree_conditions : []}
    />}
        </TabPanel>
      </TabContext>
    </Box>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
