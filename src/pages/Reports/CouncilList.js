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
import { DeleteState, GetAllState, SearchState } from '../../actions/MasterActions';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import StateDialog from "../../components/DialogBox/StateDialog";
import MasterBreadCrum from '../../sections/@dashboard/master/MasterBreadCrum';
import ReportToolBar from "../../sections/@dashboard/reports/ReportToolBar"
import { GetWorkReports } from '../../actions/WorkReportAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'council', label: 'Council', alignRight: false },
  { id: 'baseCouncilCount', label: 'Base Color Count', alignRight: false },
  { id: 'baseColorOffsiteQC', label: 'Base Color Offsite QC Count', alignRight: false },
  { id: 'BaseColorOnsiteQCCount', label: 'Base Color Onsite QC Count', alignRight: false },
  { id: 'censusCount', label: 'Census Count', alignRight: false },
  { id: 'censusOffsiteQCCount', label: 'Census Offsite QC Count', alignRight: false },
  { id: 'censusOnsiteQCCount', label: 'Census Onsite QC Count', alignRight: false },
//   { id: 'action', label: 'Action', alignRight: true },
];

export default function CouncilList() {

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [dropPage, setDropPage] = useState(3);
   const userPermissions = [];
   const handleDropChange = (event) => {
     setDropPage(event.target.value);
    };

    const {
      workReports,
      } = useSelector((state) => ({
        workReports:state.workReports.workReports,
      }));

  console.log("workReportsCouncil",workReports);
  

  useEffect(()=>{
    dispatch(GetWorkReports(page,rowsPerPage));
  },[workReports])

  console.log("workReportsCouncil1", workReports)

  // useEffect(()=>{
  //   if(pageInfo){
  //     setCount(pageInfo?.total)
  //   }
  // },[pageInfo])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteState(data.id,data.status?0:1));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(search){
      dispatch(SearchState(newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetAllState(newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchState(1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetAllState(1,parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchState(1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetAllState(1,rowsPerPage));
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
    <Page title="User">
      <Container>
        <Card style={{marginTop: 40}} >
        <ReportToolBar numSelected={0} placeHolder={"Search here..."} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { workReports?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{((page-1)*(rowsPerPage))+(index+1)}</TableCell>
                            <TableCell align="left">{option.name}</TableCell>
                        <TableCell align="left">{option.base_color_trees_count}</TableCell>
                        <TableCell align="left">{option.base_color_offsite_qc_count}</TableCell>
                        <TableCell align="left">{option.base_color_onsite_qc_count}</TableCell>
                        <TableCell align="left">{option.census_trees_count}</TableCell>
                        <TableCell align="left">{option.census_trees_offsite_qc_count}</TableCell>
                        <TableCell align="left">{option.census_trees_onsite_qc_count}</TableCell>
                        {/* <TableCell align="right">
                          <UserMoreMenu status={option.status} permissions={userPermissions} handleEdit={()=>handleEdit(option)} handleDelete={()=>handleDelete(option)}/>
                        </TableCell>  */}
                        </TableRow>
                         )
                })
                 } 

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
{workReports?(
          <Pagination variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
        </Card>
      </Container>
    </Page>
  );
}
