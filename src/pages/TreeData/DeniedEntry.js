
import { useEffect, useRef, useState } from 'react';
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
  Pagination,
  IconButton,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from  '../../components/JsonFiles/TreeData.json';
import WardDialog from "../../components/DialogBox/WardDialog";
import { GetDeniedEntry, SearchDeniedEntry } from '../../actions/DeniedEntryAction';
import { GetActiveCouncil } from '../../actions/CouncilAction';
import { GetActiveZonesByCouncilId } from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId } from '../../actions/WardsActions';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'propertyType', label: 'Property Type', alignRight: false },
  { id: 'propertyNumber', label: 'Property Number', alignRight: false },
  { id: 'ownerName', label: 'Owner Name', alignRight: false },
  { id: 'images', label: 'images', alignRight: false },
  { id: 'reasons', label: 'Reasons', alignRight: false },
  { id: 'deniedFor', label: 'Denied For', alignRight: false },
];

// ----------------------------------------------------------------------

export default function DeniedEntry() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [viewOpen, setViewOpen ] = useState(false);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [zoneId,setZoneId] = useState('');
   const [wardId,setWardId] = useState('');
   const [coucilId,setCouncilId] = useState('');
   const [imageList,setImageList] = useState([]);
   const [showList,setShowList] = useState(false);

   const {
    council,
    zones,
    wards,
    deniedEntry,
    pageInfo
  } = useSelector((state) => ({
    council:state.council.activeCouncil,
    zones:state.zones.zones,
    wards:state.wards.wards,
    deniedEntry:state.deniedEntry.deniedEntry,
    pageInfo:state.deniedEntry.pageInfo,
  }));

  // const firstRun = useRef(true);
  // useEffect(()=>{
  //   if (firstRun.current) {
  //     firstRun.current = false;
  //     return;
  //   }
  //   setShowList(true);
  //   dispatch(GetDeniedEntry(page+1,rowsPerPage,coucilId,zoneId,wardId));
  // },[])

  const secondRun = useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setShowList(true);
  },[deniedEntry])

  useEffect(()=>{
    dispatch(GetActiveCouncil(1));
    // dispatch(GetBaseColorTreeById(1));
  },[])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const handleNewUserClick = () => {
    setOpen(!open)
  }

  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen)
    setImageList(images || []);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchDeniedEntry(newPage,rowsPerPage,coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetDeniedEntry(newPage,rowsPerPage,coucilId,zoneId,wardId));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setShowList(false)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchDeniedEntry(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetDeniedEntry(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId));
    }
  };
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  let timer = null;
  const filterByName = (event) => {
    const {value} = event.currentTarget;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchDeniedEntry(1,rowsPerPage,coucilId,zoneId,wardId,value))
          setSearch(true)
          setShowList(false)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetDeniedEntry(1,rowsPerPage,coucilId,zoneId,wardId));
          setShowList(false)
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }

  const handleCoucilChange = (e) => {
    setCouncilId(e.target.value);
    setZoneId("")
    setWardId("")
    setPage(1);
    setShowList(false);
    dispatch(GetDeniedEntry(1,rowsPerPage,e.target.value,null,null))
    dispatch(GetActiveZonesByCouncilId(1,e.target.value))
    dispatch(GetActiveWardsByCouncilId(1,e.target.value))
  }

  const handleWardChange = (e) => {
    setWardId(e.target.value);
    setPage(1);
    setShowList(false);
    dispatch(GetDeniedEntry(1,rowsPerPage,coucilId,zoneId,e.target.value))
  }

  const handleZoneChange = (e) => {
    setShowList(false);
    setZoneId(e.target.value);
    setPage(1);
    dispatch(GetDeniedEntry(1,rowsPerPage,coucilId,e.target.value,wardId))
  }

  // console.log("DENIED ENTRY",deniedEntry);

  deniedEntry?.map((option,index)=>{
    // console.log("PROPRTY TYPE",option.property_type);
    // console.log("PROPERTY NUMBER",option.property?.property_number);
    // console.log("OWNER NAME",option.property?.owner_name);
    // console.log("REASON",option.reason);
    // console.log("DENIED FOR",option.denied_for);
    return null;
  })

  return (
    <Page title="User">
      <Container>
        <WardDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        />
         {viewOpen?
        <ViewImageDialog
        isOpen={viewOpen}
        handleClose = {handleViewOpen}
        data={imageList}
        />:null
        }
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" color={{color: "#000000"}} separator='>'>
        {/* <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
          Tree Data
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
          href="#"
        >
          Denied Entries
        </Link> */}
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
            Tree Data
          </Typography>
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
          Denied Entries
          </Typography>
      </Breadcrumbs>
    </div>
        </Stack>

        <Card>
        <TeamListToolbar numSelected={0} placeHolder={"Search Base Color..."} 
        onFilterName={filterByName} 
        handleCoucilChange={(e)=>handleCoucilChange(e)} 
        handleWardChange={(e)=>handleWardChange(e)}
        handleZoneChange={(e)=>handleZoneChange(e)}
        coucilId={coucilId}
        zoneId={zoneId}
        wardId={wardId}
        callType="DeniedEntries"
        />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                {!coucilId?(
                <TableRow>
                  <TableCell align='center' colSpan={8} fontWeight={700}>
               Please select council to get data
                </TableCell>
                </TableRow>
                ):null
}
                <TableBody>
                  
                     { showList? deniedEntry?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{((page-1)*(rowsPerPage))+(index+1)}</TableCell>
                        <TableCell align="left">{option.property_type?.property_type?option.property_type?.property_type:"-"}</TableCell>
                        <TableCell align="left">{option.property?.property_number?option.property?.property_number:"-"}</TableCell>
                        <TableCell align="left">{option.property?.owner_name}</TableCell>
                        <TableCell align="left">
                        <IconButton aria-label="delete" size="large" onClick={()=>handleViewOpen(option.images)} color="success">
                            <Visibility />
                          </IconButton>
                          </TableCell>
                        <TableCell align="left">{option.reason}</TableCell>
                        <TableCell align="left">{option.denied_for}</TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
{deniedEntry?(
          <Pagination count={showList ? pageInfo.last_page : 0} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
        </Card>
      </Container>
    </Page>
  );
}
