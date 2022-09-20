import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
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
  Stack,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTreeDisease, GetAllTreeDisease, SearchTreeDisease } from '../../actions/TreeDiseaseAction';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import TreeDiaseasDialog from '../../components/DialogBox/TreeDiseaseDialog'
import { MasterBreadCrumChip } from '../../sections/@dashboard/master/MasterBreadCrumChip';
import StatusButton from '../../components/statusbutton/StatusButton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'treeDisease', label: 'Tree Disease', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
];

export default function TreeDisease() {

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [dropPage, setDropPage] = useState(15);
   const userPermissions = [];
   const handleDropChange = (event) => {
     setDropPage(event.target.value);
    };

  const {
    treeDisease,
    addTreeDiseaseLog,
    editTreeDiseaseLog,
    deleteTreeDiseaseLog,
    pageInfo,
    loggedUser
  } = useSelector((state) => ({
    treeDisease:state.treeDisease.treeDisease,
    addTreeDiseaseLog:state.treeDisease.addTreeDiseaseLog,
    editTreeDiseaseLog:state.treeDisease.editTreeDiseaseLog,
    deleteTreeDiseaseLog:state.treeDisease.deleteTreeDiseaseLog,
    pageInfo : state.treeDisease.pageInfo,
    loggedUser:state.auth.loggedUser,
  }));

  // console.log("treeDisease",treeDisease)

  loggedUser.roles[0].permissions.map((item, index)=>(
    userPermissions.push(item.name)
  ))
  

  useEffect(()=>{
    dispatch(GetAllTreeDisease(page,rowsPerPage));
  },[addTreeDiseaseLog,editTreeDiseaseLog,deleteTreeDiseaseLog])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteTreeDisease(data.id,data.status?0:1));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(search){
      dispatch(SearchTreeDisease(newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetAllTreeDisease(newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchTreeDisease(1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetAllTreeDisease(1,parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchTreeDisease(1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetAllTreeDisease(1,rowsPerPage));
          setSearch(false);
          setPage(1);
        }
    }, 1000);

  }
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <Page title="Tree Disease">
      <Container>
        {open ? <TreeDiaseasDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}
        {userPermissions.includes('create-tree-disease') ? (
            <Button
              onClick={handleNewUserClick}
              variant="contained"
              component={RouterLink}
              to="#"
              // startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{float: 'right', mt: -4,boxShadow: 'none'}}
            >
              Add Tree Disease
            </Button>
          ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10} mt={5}>
          <div role="presentation" onClick={handleClick}>
            <MasterBreadCrumChip dropDownPage={dropPage} handleDropChange={handleDropChange} slug={'tree diseases'} />
          </div>
         
        </Stack>

        <Card>
          <UserListToolbar numSelected={0} placeHolder={'Search states...'} onFilterName={filterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {treeDisease?.map((option, index) => {
                    return (
                      <TableRow hover>
                        <TableCell align="left">
                          <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                        </TableCell>
                        <TableCell align="left">{option.tree_disease}</TableCell>
                        <TableCell align="left">
                          <StatusButton status={option.status} />
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu
                            status={option.status}
                            permissions={userPermissions}
                            handleEdit={() => handleEdit(option)}
                            handleDelete={() => handleDelete(option)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {treeDisease ? (
            <Pagination
              count={pageInfo.last_page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
              sx={{ justifyContent: 'right', display: 'flex', mt: 3, mb: 3 }}
            />
          ) : null}
        </Card>
      </Container>
    </Page>
  );
}
