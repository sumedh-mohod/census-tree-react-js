import { filter } from 'lodash';
import { useEffect, useState } from 'react';
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
  TablePagination,
  Pagination,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCouncil, GetCouncil, SearchCouncil } from '../../actions/CouncilAction';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { CouncilMenu, UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import CreateCouncilDialog from "../../components/DialogBox/CreateCouncilDialog";
import MasterBreadCrum from '../../sections/@dashboard/master/MasterBreadCrum';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  // { id: 'uploadlogo', label: 'Upload Logo', alignRight: false },
  { id: 'councilName', label: 'Council Name', alignRight: false,whiteSpace:true },
  { id: 'state', label: 'State', alignRight: false,whiteSpace:true },
  { id: 'district', label: 'District', alignRight: false,whiteSpace:true },
  { id: 'taluka', label: 'Taluka', alignRight: false,whiteSpace:true },
  { id: 'baseColorTarget', label: 'Base Color Target', alignRight: false,whiteSpace:true },
  { id: 'censusTarget', label: 'Census Target', alignRight: false,whiteSpace:true },
  { id: 'total_area', label: 'Total Area(sq km)', alignRight: false,whiteSpace:true },
  { id: 'contactPersonName', label: 'Contact Person Name', alignRight: false,whiteSpace:true },
  { id: 'contactPersonMoNumber', label: 'Contact Person Mobile Number', alignRight: false,whiteSpace:true },
  { id: 'contactPersonEmail', label: 'Contact Person Email', alignRight: false,whiteSpace:true },
  { id: 'userName', label: 'User Name', alignRight: false,whiteSpace:true },
  { id: 'project_start_date', label: 'Project Start Date', alignRight: false,whiteSpace:true },
  { id: 'project_end_date', label: 'Project End Date', alignRight: false,whiteSpace:true },
  // { id: 'password', label: 'Password', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false,whiteSpace:true },
  { id: 'action', label: 'Action', alignRight: true },
];

// ----------------------------------------------------------------------
export default function CreateCouncil() {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const [dropPage, setDropPage] = useState(8);
  const userPermissions = [];
  const handleDropChange = (event) => {
    setDropPage(event.target.value);
   };

  const {
    council,
    addCouncilLog,
    editCouncilLog,
    deleteCouncilLog,
    pageInfo,
    loggedUser
  } = useSelector((state) => ({
    council:state.council.council,
    addCouncilLog:state.council.addCouncilLog,
    editCouncilLog:state.council.editCouncilLog,
    deleteCouncilLog:state.council.deleteCouncilLog,
    pageInfo : state.council.pageInfo,
    loggedUser:state.auth.loggedUser,
  }));

  loggedUser.roles[0].permissions.map((item, index)=>(
    userPermissions.push(item.name)
  ))
  

  console.log("COUNCIL",council);

  useEffect(()=>{
    dispatch(GetCouncil(page,rowsPerPage));
  },[addCouncilLog,editCouncilLog,deleteCouncilLog])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(search){
      dispatch(SearchCouncil(newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetCouncil(newPage,rowsPerPage));
    }
  };
  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteCouncil(data.id,data.status?0:1));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchCouncil(1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetCouncil(1,parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchCouncil(1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetCouncil(1,rowsPerPage));
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }

  function handleClick(event) {
    event.preventDefault();
  }

  return (
    <Page title="User">
      <Container>
        {open?
        <CreateCouncilDialog
        isOpen={open}
        data = {dialogData}
        handleClose = {handleNewUserClick}
        // isClose={}
        />:null
        }
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
        <MasterBreadCrum
          dropDownPage={dropPage}
          handleDropChange={handleDropChange}
          />
    </div>
    {userPermissions.includes("create-council")? 
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Council

          </Button>:null}
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search councils..."} onFilterName={filterByName}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { council?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{((page-1)*(rowsPerPage))+(index+1)}</TableCell>
                        {/* <TableCell align="left">{option.uploadLogo}</TableCell> */}
                        <TableCell align="center">{option.name}</TableCell>
                        <TableCell align="center">{option.state?.name}</TableCell>
                        <TableCell align="center">{option.district?.name}</TableCell>
                        <TableCell align="center">{option.taluka?.name}</TableCell>
                        <TableCell align="center">{option.base_color_target}</TableCell>
                        <TableCell align="center">{option.census_target}</TableCell>
                        <TableCell align="center">{option.total_area}</TableCell>
                        <TableCell align="center" style={{flexWrap:"no-wrap"}}>{option.contact_person?.first_name} {option.contact_person?.last_name}</TableCell>
                        <TableCell align="center">{option.contact_person?.mobile}</TableCell>
                        <TableCell align="center">{option.contact_person?.email}</TableCell>
                        <TableCell align="center">{option.contact_person?.username}</TableCell>
                        <TableCell align="left">{option.project_start_date}</TableCell>
                        <TableCell align="left">{option.project_end_date}</TableCell>
                        <TableCell align="center">{option.status?"Active":"Inactive"}</TableCell>
                        <TableCell align="right">
                          <CouncilMenu status={option.status} permissions={userPermissions} handleEdit={()=>handleEdit(option)} handleDelete={()=>handleDelete(option)} councilId={option.id} councilName={option.name} />
                        </TableCell>
                        </TableRow>
                        )
                  })
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {council?(
          <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
          {/* <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
    </Page>
  );
}
