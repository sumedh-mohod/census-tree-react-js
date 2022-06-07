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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCouncil, GetCouncil, SearchCouncil } from '../../actions/CouncilAction';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import CreateCouncilDialog from "../../components/DialogBox/CreateCouncilDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  // { id: 'uploadlogo', label: 'Upload Logo', alignRight: false },
  { id: 'councilName', label: 'Council Name', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'district', label: 'District', alignRight: false },
  { id: 'taluka', label: 'Taluka', alignRight: false },
  { id: 'baseColorTarget', label: 'Base Color Target', alignRight: false },
  { id: 'censusTarget', label: 'Census Target', alignRight: false },
  { id: 'contactPersonName', label: 'Contact Person Name', alignRight: false },
  { id: 'contactPersonMoNumber', label: 'Contact Person Mobile Number', alignRight: false },
  { id: 'contactPersonEmail', label: 'Contact Person Email', alignRight: false },
  { id: 'userName', label: 'User Name', alignRight: false },
  // { id: 'password', label: 'Password', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
];

// ----------------------------------------------------------------------
export default function CreateCouncil() {

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
  const [searchValue,setSearchValue] = useState("");

  const {
    council,
    addCouncilLog,
    editCouncilLog,
    deleteCouncilLog,
    pageInfo
  } = useSelector((state) => ({
    council:state.council.council,
    addCouncilLog:state.council.addCouncilLog,
    editCouncilLog:state.council.editCouncilLog,
    deleteCouncilLog:state.council.deleteCouncilLog,
    pageInfo : state.council.pageInfo
  }));

  console.log("COUNCIL",council);

  useEffect(()=>{
    dispatch(GetCouncil(page+1,rowsPerPage));
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
      dispatch(SearchCouncil(newPage+1,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetCouncil(newPage+1,rowsPerPage));
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
    setPage(0);
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
          setPage(0)
          setSearchValue(value);

        }
        else{
          dispatch(GetCouncil(1,rowsPerPage));
          setSearch(false);
          setPage(0);
          setSearchValue("")
        }
    }, 1000);

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
          <Typography variant="h4" gutterBottom>
            Councils
          </Typography>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add Council

          </Button>
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
                            <TableCell align="left">{index+1}</TableCell>
                        {/* <TableCell align="left">{option.uploadLogo}</TableCell> */}
                        <TableCell align="left">{option.name}</TableCell>
                        <TableCell align="left">{option.state?.name}</TableCell>
                        <TableCell align="left">{option.district?.name}</TableCell>
                        <TableCell align="left">{option.taluka?.name}</TableCell>
                        <TableCell align="left">{option.base_color_target}</TableCell>
                        <TableCell align="left">{option.census_target}</TableCell>
                        <TableCell align="left">{option.contact_person.first_name} {option.contact_person.last_name}</TableCell>
                        <TableCell align="left">{option.contact_person.mobile}</TableCell>
                        <TableCell align="left">{option.contact_person.email}</TableCell>
                        <TableCell align="left">{option.contact_person.username}</TableCell>
                        {/* <TableCell align="left">{option.password}</TableCell> */}
                        <TableCell align="left">{option.status?"Active":"Inactive"}</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu status={option.status} handleEdit={()=>handleEdit(option)} handleDelete={()=>handleDelete(option)} />
                        </TableCell>
                        </TableRow>
                        )
                  })
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
