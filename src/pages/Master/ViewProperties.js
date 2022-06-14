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
  TablePagination,
  Link,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'zone', label: 'Zone', alignRight: false },
  { id: 'ward', label: 'Ward', alignRight: false },
  { id: 'propertyNumber', label: 'Property Number', alignRight: false },
  { id: 'propertyOwner', label: 'Property Owner', alignRight: false },
  { id: 'tenantName', label: 'Tenant Name', alignRight: false },
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [showList,setShowList] = useState(false);
   const [showErrorModal,setShowErrorModal] = useState(false);
  
  const {
    properties,
    pageInfo,
    importPropertyLog,
    propertyErrorLog,
    propertyError,
    state
  } = useSelector((state) => ({
    properties:state.properties.properties,
    pageInfo : state.properties.pageInfo,
    importPropertyLog : state.properties.importPropertyLog,
    propertyErrorLog : state.properties.propertyErrorLog,
    propertyError : state.properties.propertyError,
    state
  }));

  const { councilId, councilName } = useParams();
  
  useEffect(()=>{
    dispatch(GetPropertyByCouncilId(councilId,page+1,rowsPerPage));
  },[])

  console.log("STATE VALUE",state);

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
    GetPropertyByCouncilId(councilId,page+1,rowsPerPage)
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
  },[propertyErrorLog])

  console.log("PROPERTY ERROR",propertyError);

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchPropertyByCouncilId(councilId,newPage+1,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetPropertyByCouncilId(councilId,newPage+1,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setShowList(false);
    setPage(0);
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
          setPage(0)
          setSearchValue(value);

        }
        else{
          setShowList(false);
          dispatch(GetPropertyByCouncilId(councilId,1,rowsPerPage));
          setSearch(false);
          setPage(0);
          setSearchValue("")
        }
    }, 1000);

  }
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const handleUpload = (e) => {
    console.log("HANDLE DOCMENT VALUE CAHNGE",e.target.files[0])
    const formData = new FormData();
    formData.append('council_id', councilId);
    formData.append('file', e.target.files[0]);
    dispatch(ImportProperty(formData));
  }

  const handleViewOpen = () => {
    setShowErrorModal(!showErrorModal);

  }


  return (
    <Page title="User">
    <Container>
    {showErrorModal?
        <PropertyErrorDialog
        isOpen={showErrorModal}
        handleClose = {handleViewOpen}
        data={propertyError}
        />:null
        }
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
        <Breadcrumbs aria-label="breadcrumb" separator='>'>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
          Council
        </Link>
        <Link component={RouterLink}
        to={`/dashboard/council`}
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
          {councilName}
              
        </Link>
        <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 24, fontSize: 25, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
        >
           Properties
              
        </Link>
      </Breadcrumbs>

    </div>
          <Button onClick={handleNewUserClick} variant="contained" component="label"  startIcon={<Iconify icon="eva:plus-fill"  />}>
          Import Properties
          <input
            type="file"
            hidden
            onChange={handleUpload}
          />
          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search user..."} onFilterName={filterByName}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { showList? properties?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="left">{option?.zone?.name}</TableCell>
                        <TableCell align="left">{option?.ward?.name}</TableCell>
                        <TableCell align="left">{option.property_number}</TableCell>
                        <TableCell align="left">{option.owner_name}</TableCell>
                        <TableCell align="left">{option.tenant_name?option.tenant_name:"-"}</TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
