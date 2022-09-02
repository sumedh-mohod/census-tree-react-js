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
import { downloadExcel } from "react-export-table-to-excel";
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
  { id: 'User', label: 'User', alignRight: false },
  { id: 'Role', label: 'Role', alignRight: false },
  { id: 'Team', label: 'Team', alignRight: false },
  { id: 'allocated', label: 'Allocated', alignRight: false },
  { id: 'deallocated', label: 'Deallocated', alignRight: false },
  { id: 'currentStatus', label: 'Current Status', alignRight: false },
];

export default function WorkTypeList(props) {

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
   const [downloadButtonPressed,setDownloadButtonPressed] = useState(false);
   const [displyWorkList, setDisplayWorkList] = useState([])
   const {reportType, fromDate, toDate} = props;
   const handleDropChange = (event) => {
     setDropPage(event.target.value);
    };


    const {
      workReports,
      excelWorkReports,
      pageInfo,
      } = useSelector((state) => ({
        workReports:state.workReports.workReports,
          pageInfo: state.workReports.pageInfo,
        // excelWorkReports:state.workReports.excelWorkReports,
      }));

  console.log("teamAllocation",workReports);
  

  console.log("teamallocation", workReports)


  // useEffect(()=>{
  //   dispatch(GetWorkReports(reportType, fromDate,toDate));
  //   console.log("assdghasd", workReports)
  // },[workReports])


const handleChangePage = (event, newPage) => {
  setPage(newPage);
  // if(search){
  //   dispatch(SearchWorkReports(newPage,rowsPerPage,searchValue));
  // }
  // else {
    dispatch(GetWorkReports(reportType, fromDate,toDate, newPage,rowsPerPage));
  }

const header1= ["report Type", "From Date" , "To Date"] 
const header = ["#", "User", "Role", "Team", "Allocated", "Deallocated", "Current Status", "From Date", "To Date"];
// const header1= ["from Date", "To Date"]

  // const handleDownloadButtonPressed = () => {
  //   setDownloadButtonPressed(true);
  //   dispatch(GetAllWorkReports(reportType, fromDate,toDate));
  // }

  function handleDownloadExcel() {
    // dispatch(GetAllWorkReports(reportType, fromDate,toDate));
    const dataValue =  workReports.data;
    const value1= [fromDate];
    dataValue?.map((option, index) => {
      const value2 = [index+1]
      value2.push(option.user)
      // value2.push(fromDate)
      value2.push(option.role)
      value2.push(option.team)
      value2.push(option.assigned_at)
      value2.push(option.deallocated_at)
      value2.push(option.current_status)
      if(index === 0){
        value2.push(fromDate);
        value2.push(toDate)
      }

    
      value1.push(value2)
      // value1.push(fromDate)
      return null
    })
    downloadExcel({
      fileName: "Report",
      sheet: "Report",
      tablePayload: {
        header,
        // accept two different data structures
        body: value1 ,
      },
    });
  }


  return (
    <Page title="User">
      <Container>
        <Card style={{marginTop: 40}}>
        <ReportToolBar
        handleExportexcel={()=>handleDownloadExcel()} 
        numSelected={0} placeHolder={"Search here..."} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { workReports?.data?.map((option,index) => { 
                        return (
                        <TableRow
                        hover
                      key={index}  
                      >
                            <TableCell align="left">{((page-1)*(rowsPerPage))+(index+1)}</TableCell>
                        <TableCell align="left">{option.user}</TableCell>
                        <TableCell align="left">{option.role}</TableCell>
                        <TableCell align="left">{option.team}</TableCell>
                        <TableCell align="left">{option.assigned_at}</TableCell>
                        <TableCell align="left">{option.deallocated_at}</TableCell>
                        <TableCell align="left">{option.current_status}</TableCell>
                        </TableRow>
                        )
                  })
                } 

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {workReports?(
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
