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
import { downloadExcel } from "react-export-table-to-excel";
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
import { MasterBreadCrum } from '../../sections/@dashboard/master/MasterBreadCrum';
import ReportToolBar from "../../sections/@dashboard/reports/ReportToolBar"
import { GetAllWorkReports, GetWorkReports , SearchWorkReports} from '../../actions/WorkReportAction';
import CountButton from '../../components/statusbutton/CountButton'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'user', label: 'User', alignRight: false },
  { id: 'currentRole', label: 'Current Role', alignRight: false },
  { id: 'baseCouncilCount', label: 'Base Color Count', alignRight: false },
  { id: 'baseColorOffsiteQC', label: 'Base Color Offsite QC Count', alignRight: false },
  { id: 'BaseColorOnsiteQCCount', label: 'Base Color Onsite QC Count', alignRight: false },
  { id: 'censusCount', label: 'Census Count', alignRight: false },
  { id: 'censusOffsiteQCCount', label: 'Census Offsite QC Count', alignRight: false },
  { id: 'censusOnsiteQCCount', label: 'Census Onsite QC Count', alignRight: false },
//   { id: 'action', label: 'Action', alignRight: true },
];

export default function UserTypeList(props) {

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const [dropPage, setDropPage] = useState(3);
  const [downloadButtonPressed,setDownloadButtonPressed] = useState(false);
  const userPermissions = [];
  const {reportType, fromDate, toDate} = props;



   const handleDropChange = (event) => {
     setDropPage(event.target.value);
    };

  // const {
  //   states,
  //   addStateLog,
  //   editStateLog,
  //   deleteStateLog,
  //   pageInfo,
  //   loggedUser
  // } = useSelector((state) => ({
  //   states:state.master.states,
  //   addStateLog:state.master.addStateLog,
  //   editStateLog:state.master.editStateLog,
  //   deleteStateLog:state.master.deleteStateLog,
  //   pageInfo : state.master.pageInfo,
  //   loggedUser:state.auth.loggedUser,

  // }));

  // console.log("STATES",states);
  // loggedUser.roles[0].permissions.map((item, index)=>(
  //   userPermissions.push(item.name)
  // ))

  

  // useEffect(()=>{
  //   dispatch(GetAllState(page,rowsPerPage));
  // },[addStateLog,editStateLog,deleteStateLog])
  const {
    workReports,
    pageInfo,
    excelWorkReports
    } = useSelector((state) => ({
      workReports:state.workReports.workReports,
      excelWorkReports:state.workReports.excelWorkReports,
      pageInfo: state.workReports.pageInfo,
    }));

// console.log("UserListType",workReports);


  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  useEffect(()=>{
    if(excelWorkReports && downloadButtonPressed){
      handleDownloadExcel()
      setDownloadButtonPressed(false);
    }
  },[excelWorkReports])



  const handleDelete = (data) => {
    dispatch(DeleteState(data.id,data.status?0:1));
  };

  const secondRun = React.useRef(true);

  useEffect(() => {
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setPage(1);
  }, [fromDate,toDate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // if(search){
    //   dispatch(SearchWorkReports(newPage,rowsPerPage,searchValue));
    // }
    // else {
      dispatch(GetWorkReports(reportType,undefined,undefined,undefined, fromDate,toDate, newPage,rowsPerPage));
    }

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
          dispatch(GetWorkReports(1,rowsPerPage));
          setSearch(false);
          setPage(1);
        // }
    }, 1000);

  }



  const header = ["#", "User", "Current Role", "Base Color Count", "Base Color Offsite Qc Count", "Base Color Onsite QC Count",
"Census Count", "Census Offsite Qc Count", "Census Onsite QC Count","From Date", "To Date"];

  const handleDownloadButtonPressed = () => {
    setDownloadButtonPressed(true);
    dispatch(GetAllWorkReports(reportType,undefined,undefined, fromDate,toDate));
  }

  function handleDownloadExcel() {
    // dispatch(GetAllWorkReports(reportType, fromDate,toDate));

    const dataValue =  excelWorkReports;
    const value1= [];
    dataValue?.map((option, index) => {
      const value2 = [index+1]
      value2.push(option.name)
      value2.push(option.current_role)
      value2.push(option.base_color_trees_count)
      value2.push(option.base_color_off_site_qc_count)
      value2.push(option.base_color_onsite_qc_count)
      value2.push(option.census_trees_count)
      value2.push(option.census_trees_offsite_qc_count)
      value2.push(option.census_trees_onsite_qc_count)
      if(index === 0){
        value2.push(fromDate);
        value2.push(toDate)
      }
      value1.push(value2)
      return null
    })
    downloadExcel({
      fileName: "By User Report",
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
      <Card style={{marginTop: 40}}>
      <ReportToolBar 
         handleExportexcel={()=>handleDownloadButtonPressed()} 
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
                      >
                            <TableCell align="left"><b>{((page-1)*(rowsPerPage))+(index+1)}</b></TableCell>
                            <TableCell align="left">{option.name}</TableCell>
                        <TableCell align="left">{option.current_role}</TableCell>
                        <TableCell align="left"><CountButton count={option.base_color_trees_count} /></TableCell>
                        <TableCell align="left"><CountButton count={option.base_color_off_site_qc_count} /></TableCell>
                        <TableCell align="left"><CountButton count={option.base_color_onsite_qc_count} /></TableCell>
                        <TableCell align="left"><CountButton count={option.census_trees_count} /></TableCell>
                        <TableCell align="left"><CountButton count={option.census_trees_offsite_qc_count} /></TableCell>
                        <TableCell align="left"><CountButton count={option.census_trees_onsite_qc_count} /></TableCell>
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
