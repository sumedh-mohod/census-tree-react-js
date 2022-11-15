import { filter } from 'lodash';
import {  useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { green } from '@mui/material/colors';
import { GetPropertyByCouncilId, ImportProperty, SearchPropertyByCouncilId } from '../../actions/PropertyAction';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead, UserListToolbar} from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import TeamsData from  '../../components/JsonFiles/TeamsData.json';
import AssignUserDialog from "../../components/DialogBox/TeamsDialog/AssignUserDialog";
import PropertyErrorDialog from '../../components/DialogBox/tree-data/PropertyErrorDialog';
import { ShowLoader } from '../../actions/CommonAction';
import { MasterBreadCrumChip } from '../../sections/@dashboard/master/MasterBreadCrumChip';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'zone', label: 'Zone', alignRight: false },
  { id: 'ward', label: 'Ward', alignRight: false },
  { id: 'propertyNumber', label: 'Property Number', alignRight: false },
  { id: 'propertyOwner', label: 'Property Owner', alignRight: false },
  { id: 'tenantName', label: 'Tenant Name', alignRight: false },
  { id: 'area', label: 'Area', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ViewProperties() {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [showList,setShowList] = useState(false);
   const [showErrorModal,setShowErrorModal] = useState(false);
   const [fileValue,setFileValue] = useState("");
   const [dropPage, setDropPage] = useState(8);
   const handleDropChange = (event) => {
    setDropPage(event.target.value);
   };
  
  const {
    properties,
    pageInfo,
    importPropertyLog,
    propertyErrorLog,
    propertyError,
    showLoader
  } = useSelector((state) => ({
    properties:state.properties.properties,
    pageInfo : state.properties.pageInfo,
    importPropertyLog : state.properties.importPropertyLog,
    propertyErrorLog : state.properties.propertyErrorLog,
    propertyError : state.properties.propertyError,
    showLoader : state.common.showLoader,
  }));

  const { councilId, councilName } = useParams();
  
  useEffect(()=>{
    dispatch(GetPropertyByCouncilId(councilId,page,rowsPerPage));
  },[])


  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const fetchRun = useRef(true);
  useEffect(()=>{
    if (fetchRun.current) {
      fetchRun.current = false;
      return;
    }
    setShowList(true);
  },[properties])


  const thirdRun = useRef(true);
  useEffect(()=>{
    if (thirdRun.current) {
      thirdRun.current = false;
      return;
    }
    dispatch(ShowLoader(false))
    dispatch(GetPropertyByCouncilId(councilId,page,rowsPerPage))
  },[importPropertyLog])

  const fourthRun = useRef(true);
  useEffect(()=>{
    if (fourthRun.current) {
      fourthRun.current = false;
      return;
    }
    if(propertyError){
      setShowErrorModal(true);
    }
    dispatch(ShowLoader(false))
  },[propertyErrorLog])

  // console.log("PROPERTY ERROR",propertyError);

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchPropertyByCouncilId(councilId,newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetPropertyByCouncilId(councilId,newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setShowList(false);
    setPage(1);
    if(search){
      dispatch(SearchPropertyByCouncilId(councilId,1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetPropertyByCouncilId(councilId,1,parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          setShowList(false);
          dispatch(SearchPropertyByCouncilId(councilId,1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          setShowList(false);
          dispatch(GetPropertyByCouncilId(councilId,1,rowsPerPage));
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const handleUpload = (e) => {
    // console.log("HANDLE DOCMENT VALUE CAHNGE",e.target.files[0])
    const formData = new FormData();
    formData.append('council_id', councilId);
    formData.append('file', e.target.files[0]);
    dispatch(ImportProperty(formData));
    setFileValue("");
    dispatch(ShowLoader(true))
  }

  const handleViewOpen = () => {
    setShowErrorModal(!showErrorModal);

  }

  // console.log("SHOW LOADER",showLoader);

  return (
    showLoader ?
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%' }}>
      <CircularProgress style={{color: '#214c50'}} />
      </div>
      :
   
    <Page title="User">
    <Container>
   
    

    {showErrorModal?
        <PropertyErrorDialog
        isOpen={showErrorModal}
        handleClose = {handleViewOpen}
        data={propertyError}
        />:null
        }
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10} mt={5}>
        <div role="presentation" onClick={handleClick} >
        <Breadcrumbs aria-label="breadcrumb" separator='>'>
          <Typography variant="h4">
            <Link
          underline="none"
          color="inherit"
        >
         Master
              
        </Link>
      
        </Typography>
        <Typography variant="h4" style={{ fontSize: '18px', fontWeight: '400' }}>
        <Link component={RouterLink}
        to={`/dashboard/council`}
          underline="hover"
          color="inherit"
          href="#"
        >
          {councilName}
              
        </Link>
        </Typography>
        <Typography variant="h4" style={{ fontSize: '18px', fontWeight: '400' }}>
        <Link
          underline="none"
          color="inherit"
        >
           Properties
              
        </Link>
        </Typography>
      </Breadcrumbs>

    </div>
          <Button onClick={handleNewUserClick} disabled variant="contained" component="label"  startIcon={<Iconify icon="eva:plus-fill"  />}>
          Import Properties
          <input
            type="file"
            hidden
            value={fileValue}
            onChange={handleUpload}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search user..."} onFilterName={filterByName}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small" aria-label="a dense table">
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { showList? properties?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left"><b>{((page-1)*(rowsPerPage))+(index+1)}</b></TableCell>
                        <TableCell align="left">{option?.zone?.name}</TableCell>
                        <TableCell align="left">{option?.ward?.name}</TableCell>
                        <TableCell align="left">{option.property_number}</TableCell>
                        <TableCell align="left">{option.owner_name}</TableCell>
                        <TableCell align="left">{option.tenant_name?option.tenant_name:"-"}</TableCell>
                        <TableCell align="left">{option.area? option.area: "-"}</TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          { properties?(
          <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
        </Card>
      </Container>
    </Page>
  );
}
