import { filter } from 'lodash';
import React, { useEffect, useState } from 'react';
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
import { downloadExcel } from "react-export-table-to-excel";
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
import AllocateButton from '../../components/statusbutton/AllocateButton';
import { GetAllWorkReports, GetWorkReports, SearchWorkReports } from '../../actions/WorkReportAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'team', label: 'Team', alignRight: false },
  { id: 'council', label: 'Council', alignRight: false },
  { id: 'zone', label: 'Zone', alignRight: false },
  { id: 'ward', label: 'Ward', alignRight: false },
  { id: 'allocated_at', label: 'Allocated At', alignRight: false },
  { id: 'deallocated_at', label: 'Deallocated At', alignRight: false },
  { id: 'current_status', label: 'Current Status', alignRight: false },
//   { id: 'action', label: 'Action', alignRight: true },
];

export default function Teamczw(props) {

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
  const [downloadButtonPressed,setDownloadButtonPressed] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [dropPage, setDropPage] = useState(3);

   const {reportType, fromDate, toDate,teamBy} = props;
   // console.log('reporttype_czw....', reportType);
   const userPermissions = [];
   const handleDropChange = (event) => {
     setDropPage(event.target.value);
    };

    const {
      workReports,
      pageInfo,
      excelWorkReports
      } = useSelector((state) => ({
        workReports:state.workReports.workReports,
        pageInfo: state.workReports.pageInfo,
        excelWorkReports:state.workReports.excelWorkReports,
      }));

  console.log("workReportsTeamczw",excelWorkReports);

  useEffect(()=>{
    if(excelWorkReports && downloadButtonPressed){
      handleDownloadExcel()
      setDownloadButtonPressed(false);
    }
  },[excelWorkReports])

  const secondRun = React.useRef(true);

  useEffect(() => {
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setPage(1);
  }, [teamBy,fromDate,toDate]);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // if(search){
    //   dispatch(SearchWorkReports(newPage,rowsPerPage,searchValue));
    // }
    // else {
      dispatch(GetWorkReports(reportType,undefined,teamBy,undefined, fromDate,toDate, newPage,rowsPerPage));
    }
  // }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    // if(search){
    //   dispatch(SearchWorkReports(1,parseInt(event.target.value, 10),searchValue));
    // }
    // else {
      dispatch(GetWorkReports(1,parseInt(event.target.value, 10)));
    }
  // };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchWorkReports(1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetWorkReports(1,rowsPerPage));
          setSearch(false);
          setPage(1);
        }
    }, 1000);

  }

  const header = ["#", "Team", "Council", "Zone", "Ward", "Allocated At",
  "Deallocated At", "Current Status","From Date", "To Date"];
 
const handleDownloadButtonPressed = () => {
  setDownloadButtonPressed(true);
  dispatch(GetAllWorkReports(reportType,undefined,teamBy ,fromDate,toDate));
}

  function handleDownloadExcel() {

    const dataValue =  excelWorkReports;
    // console.log("excelWorkReports", excelWorkReports)
    const dateValue= fromDate
    const value1= [];
    dataValue?.map((option, index) => {
    
      const value2 = [index+1]
      value2.push(option.team)
      value2.push(option.council)
      value2.push(option.zone)
      value2.push(option.ward)
      value2.push(option.allocated_at)
      value2.push(option.deallocated_at)
      value2.push(option.current_status)
      if(index === 0){
        value2.push(fromDate);
        value2.push(toDate)
      }
      value1.push(value2)
      return null
    })

    
    downloadExcel({
      fileName: "Team-CZW Allocation Report",
      sheet: "Report",
      tablePayload: {
        header,
        // accept two different data structures
        body: value1
      },
    });
  }

  return (
    <Page title="User">
      <Container>
      <Card style={{marginTop: 40}} >
      <ReportToolBar
        handleExportexcel={()=>handleDownloadButtonPressed()} 
       placeHolder={"Search here..."} 
      //  onFilterName={filterByName}
       />
       
       
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
                      >
                            <TableCell  style={{flexWrap: "wrap"}}>{((page-1)*(rowsPerPage))+(index+1)}</TableCell>
                            
                        <TableCell style={{flexWrap: "wrap"}}>{option?.team}</TableCell>
                        <TableCell style={{width: 40}}>{option?.council}</TableCell>
                        <TableCell style={{flexWrap: "wrap"}}>{option?.zone}</TableCell>
                        <TableCell style={{flexWrap: "wrap"}}>{option?.ward}</TableCell>
                        <TableCell  style={{flexWrap: "wrap"}}>{option?.allocated_at}</TableCell>
                        <TableCell  style={{flexWrap: "wrap"}}>{option?.deallocated_at}</TableCell>
                        <TableCell style={{flexWrap: "wrap"}}>
                          <AllocateButton status={option?.current_status}/>
                          </TableCell>
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
          <Pagination count={pageInfo.last_page}  variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
        </Card>
      </Container>
    </Page>
  );
}
