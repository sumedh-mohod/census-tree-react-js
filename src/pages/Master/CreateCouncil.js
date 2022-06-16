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
  { id: 'contactPersonName', label: 'Contact Person Name', alignRight: false,whiteSpace:true },
  { id: 'contactPersonMoNumber', label: 'Contact Person Mobile Number', alignRight: false,whiteSpace:true },
  { id: 'contactPersonEmail', label: 'Contact Person Email', alignRight: false,whiteSpace:true },
  { id: 'userName', label: 'User Name', alignRight: false,whiteSpace:true },
  // { id: 'password', label: 'Password', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false,whiteSpace:true },
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

  function handleClick(event) {
    event.preventDefault();
  }

  return (
    <Page title="Councils">
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
      <Breadcrumbs aria-label="breadcrumb" separator='>'>
        <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
          Master
        </Link>
        <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
          href="#"
        >
        Councils
        </Link>
      </Breadcrumbs>
    </div>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add New

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
                            <TableCell align="left">{page*rowsPerPage+(index+1)}</TableCell>
                        {/* <TableCell align="left">{option.uploadLogo}</TableCell> */}
                        <TableCell align="center">{option.name}</TableCell>
                        <TableCell align="center">{option.state?.name}</TableCell>
                        <TableCell align="center">{option.district?.name}</TableCell>
                        <TableCell align="center">{option.taluka?.name}</TableCell>
                        <TableCell align="center">{option.base_color_target}</TableCell>
                        <TableCell align="center">{option.census_target}</TableCell>
                        <TableCell align="center" style={{flexWrap:"no-wrap"}}>{option.contact_person?.first_name} {option.contact_person?.last_name}</TableCell>
                        <TableCell align="center">{option.contact_person?.mobile}</TableCell>
                        <TableCell align="center">{option.contact_person?.email}</TableCell>
                        <TableCell align="center">{option.contact_person?.username}</TableCell>
                        {/* <TableCell align="left">{option.password}</TableCell> */}
                        <TableCell align="center">{option.status?"Active":"Inactive"}</TableCell>
                        <TableCell align="right">
                          <CouncilMenu status={option.status} handleEdit={()=>handleEdit(option)} handleDelete={()=>handleDelete(option)} councilId={option.id} councilName={option.name} />
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
