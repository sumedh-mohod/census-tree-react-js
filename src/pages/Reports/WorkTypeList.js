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
import {GetWorkReports} from "../../actions/WorkReportAction"


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'workType', label: 'Work Type', alignRight: false },
  { id: 'totalcount', label: 'Total Count', alignRight: false },
//   { id: 'action', label: 'Action', alignRight: true },
];

export default function WorkTypeList() {

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
  

  // useEffect(()=>{
  //   dispatch(GetWorkReports(page,rowsPerPage));
  // },[workReports])

  console.log("aaaaa", workReports)

// const keys = Object.keys(workReports);
// console.log("keys", keys)
//   const values = Object.values(workReports);
//   console.log("values", values)

const newData = Object.entries(workReports);
console.log("newData", newData)


  return (
    <Page title="User">
      <Container>
        <Card style={{marginTop: 40}}>
        <ReportToolBar numSelected={0} placeHolder={"Search here..."} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { newData?.map((option,index) => { 
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="left">{option[0]}</TableCell>
                        <TableCell align="left">{option[1]}</TableCell>
                        </TableRow>
                         )
                  })
                } 

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
