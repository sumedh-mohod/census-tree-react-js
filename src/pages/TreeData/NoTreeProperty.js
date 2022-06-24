
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
import { GetNoTreeProperty, SearchNoTreeProperty } from '../../actions/NoTreePropertyAction';
import { GetCouncil } from '../../actions/CouncilAction';
import { GetZonesByCouncilId } from '../../actions/ZonesAction';
import { GetWardsByCouncilId } from '../../actions/WardsActions';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'propertyType', label: 'Property Type', alignRight: false },
  { id: 'Council', label: 'Council', alignRight: false },
  { id: 'zone', label: 'Zone', alignRight: false },
  { id: 'Ward', label: 'Ward', alignRight: false },
  { id: 'lat', label: 'Lat', alignRight: false },
  { id: 'long', label: 'Long', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'images', label: 'Images', alignRight: false },
  { id: 'team', label: 'Team', alignRight: false },
  { id: 'addedBy', label: 'Added By', alignRight: false },
];

// ----------------------------------------------------------------------

export default function NoTreeProperty() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
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
    noTreeProperty,
    pageInfo
  } = useSelector((state) => ({
    council:state.council.council,
    zones:state.zones.zones,
    wards:state.wards.wards,
    noTreeProperty:state.noTreeProperty.noTreeProperty,
    pageInfo:state.noTreeProperty.pageInfo,
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
  },[noTreeProperty])

  useEffect(()=>{
    dispatch(GetCouncil(1,1000));
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
      dispatch(SearchNoTreeProperty(newPage,rowsPerPage,coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(SearchNoTreeProperty(newPage,rowsPerPage,coucilId,zoneId,wardId));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setShowList(false)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if(search){
      dispatch(SearchNoTreeProperty(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetNoTreeProperty(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId));
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
          dispatch(SearchNoTreeProperty(1,rowsPerPage,coucilId,zoneId,wardId,value))
          setSearch(true)
          setShowList(false)
          setPage(0)
          setSearchValue(value);

        }
        else{
          dispatch(GetNoTreeProperty(1,rowsPerPage,coucilId,zoneId,wardId));
          setShowList(false)
          setSearch(false);
          setPage(0);
          setSearchValue("")
        }
    }, 1000);

  }

  const handleCoucilChange = (e) => {
    setCouncilId(e.target.value);
    setZoneId("")
    setWardId("")
    setPage(0);
    setShowList(false);
    dispatch(GetNoTreeProperty(1,rowsPerPage,e.target.value,null,null))
    dispatch(GetZonesByCouncilId(1,1000,e.target.value))
    dispatch(GetWardsByCouncilId(1,1000,e.target.value))
  }

  const handleWardChange = (e) => {
    setWardId(e.target.value);
    setPage(0);
    setShowList(false);
    dispatch(GetNoTreeProperty(1,rowsPerPage,coucilId,zoneId,e.target.value))
  }

  const handleZoneChange = (e) => {
    setShowList(false);
    setZoneId(e.target.value);
    setPage(0);
    dispatch(GetNoTreeProperty(1,rowsPerPage,coucilId,e.target.value,wardId))
  }

  console.log("No tree property",noTreeProperty);

  noTreeProperty?.map((option,index)=>{
    console.log("PROPRTY TYPE",option.property_type);
    console.log("PROPERTY NUMBER",option.property?.property_number);
    console.log("OWNER NAME",option.property?.owner_name);
    console.log("REASON",option.reason);
    console.log("DENIED FOR",option.denied_for);
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" separator='>'>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
          Master
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
          href="#"
        >
          No Tree Properties
        </Link>
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
        />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { showList? noTreeProperty?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="left">{option.property_type?.property_type?option.property_type?.property_type:"-"}</TableCell>
                        <TableCell align="left">{option.council?.name}</TableCell>
                        <TableCell align="left">{option.zone?.name}</TableCell>
                        <TableCell align="left">{option.ward?.name}</TableCell>
                        <TableCell align="left">{option.lat}</TableCell>
                        <TableCell align="left">{option.long}</TableCell>
                        <TableCell align="left">{option.location}</TableCell>
                        <TableCell align="left">
                        <IconButton aria-label="delete" size="large" onClick={()=>handleViewOpen(option.images)} color="success">
                            <Visibility />
                          </IconButton>
                          </TableCell>
                        <TableCell align="left">{option.team?.name}</TableCell>
                        <TableCell align="left">{option.added_by?.first_name}</TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
        </Card>
      </Container>
    </Page>
  );
}
