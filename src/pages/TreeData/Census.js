import React, { useEffect, useState } from 'react';
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

  Link,
  IconButton,
  Pagination,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility } from '@mui/icons-material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from  '../../components/JsonFiles/TreeData.json';
import BaseColorDialog from "../../components/DialogBox/tree-data/BaseColorDialog";
import TreeCensusMenu from '../../sections/@dashboard/tree/TreeCensusMenu';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
import { GetTreeCensus, SearchTreeCensus, UpdateQCStatusOfTreeCensus} from '../../actions/TreeCensusAction';
import { GetActiveCouncil } from '../../actions/CouncilAction';
import { GetActiveZonesByCouncilId } from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId } from '../../actions/WardsActions';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
import QcStatusDialog from '../../components/DialogBox/tree-data/QcStatusDialog';
import CencusViewDetailsDialog from '../../components/DialogBox/tree-data/CensusViewDetailsDialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'treeNumber', label: 'Tree Number', alignRight: false },
  { id: 'treeName', label: 'Tree Name', alignRight: false },
  { id: 'addedBy', label: 'Added By', alignRight: false },
  { id: 'addedOn', label: 'Added On', alignRight: false },
  { id: 'isReferredToExpert', label: 'Is Referred To Expert?', alignRight: false },
  { id: 'action',label: 'Action',alignRight: true },
];

// ----------------------------------------------------------------------

export default function Census() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [viewOpen, setViewOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [stateName, setStateName] = useState('');
   const [zoneId,setZoneId] = useState('');
   const [wardId,setWardId] = useState('');
   const [coucilId,setCouncilId] = useState('');
   const [imageList,setImageList] = useState([]);
   const [showList,setShowList] = useState(false);
   const [qcDialogOpen,setQcDialogOpen] = useState(false);
   const [viewCensusDetails, setViewCensusDetails] = useState(false)
   const [treeCensusId,setTreeCensusId] = useState("");
   const userPermissions = [];


   const {
    council,
    zones,
    wards,
    treeCensus,
    editBaseColorTreesLog,
    deleteBaseColorTreesLog,
    updateQCStatusLog,
    pageInfo,
    loggedUser
  } = useSelector((state) => ({
    council:state.council.activeCouncil,
    zones:state.zones.zones,
    wards:state.wards.wards,
    treeCensus:state.treeCensus.treeCensus,
    // editBaseColorTreesLog:state.baseColor.editBaseColorTreesLog,
    // deleteBaseColorTreesLog:state.baseColor.deleteBaseColorTreesLog,
    updateQCStatusLog:state.treeCensus.updateQCStatusLog,
    pageInfo:state.treeCensus.pageInfo,
    loggedUser:state.auth.loggedUser
  }));

  
loggedUser.roles[0].permissions.map((item, index)=>(
  userPermissions.push(item.name)
))


  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setShowList(true);
    dispatch(GetTreeCensus(page,rowsPerPage,coucilId,zoneId,wardId));
  },[updateQCStatusLog])

  const secondRun = React.useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setShowList(true);
  },[treeCensus])

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
    setDialogData(null);
    setOpen(!open)
  }

  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen)
    setImageList(images || []);
  }

  const handleQcDialog = (id) => {
    setQcDialogOpen(!qcDialogOpen);
    setTreeCensusId(id);
  }

  const handleCensusViewDetailsDialog= (data) => {
    setViewCensusDetails(!viewCensusDetails);
    setDialogData(data)
  }

  const handleQcSubmit = (data,id) => {
    const obj = {};

    if(data){
      obj.qc_status = "Unapproved";
      obj.qc_remark_id = data;
    }
    else {
      obj.qc_status = "Approved";
    }

    dispatch(UpdateQCStatusOfTreeCensus(id,obj))

  }

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {

  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchTreeCensus(newPage,rowsPerPage,coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetTreeCensus(newPage,rowsPerPage,coucilId,zoneId,wardId));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setShowList(false)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchTreeCensus(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetTreeCensus(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId));
    }
  };
  function handleClick(event) {
    event.preventDefault();
  }

  let timer = null;
  const filterByName = (event) => {
    const {value} = event.currentTarget;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchTreeCensus(1,rowsPerPage,coucilId,zoneId,wardId,value))
          setSearch(true)
          setShowList(false)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetTreeCensus(1,rowsPerPage,coucilId,zoneId,wardId));
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
    dispatch(GetTreeCensus(1,rowsPerPage,e.target.value,null,null))
    dispatch(GetActiveZonesByCouncilId(1,e.target.value))
    dispatch(GetActiveWardsByCouncilId(1,e.target.value))
  }

  const handleWardChange = (e) => {
    setWardId(e.target.value);
    setPage(1);
    setShowList(false);
    dispatch(GetTreeCensus(1,rowsPerPage,coucilId,zoneId,e.target.value))
  }

  const handleZoneChange = (e) => {
    setShowList(false);
    setZoneId(e.target.value);
    setPage(1);
    dispatch(GetTreeCensus(1,rowsPerPage,coucilId,e.target.value,wardId))
  }

  return (
    <Page title="Base Color">
      <Container>
        {open?
        <BaseColorDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data={dialogData}
        />:null
        }
        
        {viewOpen?
        <ViewImageDialog
        isOpen={viewOpen}
        handleClose = {handleViewOpen}
        data={imageList}
        />:null
        }
        
        {qcDialogOpen?
        <QcStatusDialog
        isOpen={qcDialogOpen}
        baseColorId={treeCensusId}
        handleClose = {()=>handleQcDialog(null)}
        handleSubmit = {(data,id)=>handleQcSubmit(data,id)}
        />:null
        }

        {viewCensusDetails?  
        <CencusViewDetailsDialog
        isOpen={viewCensusDetails}
        handleClose= {() =>handleCensusViewDetailsDialog()}
        data={dialogData}
        />: null 
        }

         
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" style={{color: "#000000"}} separator='>'>
        {/* <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
          Trees Data
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
          href="#"
        >
        Census
        </Link> */}
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
            Tree Data
          </Typography>
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
          Census
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
                  Please select council to get census data
                </TableCell>
                </TableRow>
                ):null
}
                <TableBody>
                     { showList? treeCensus?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{((page-1)*(rowsPerPage))+(index+1)}</TableCell>
                            <TableCell align="left">{option.tree_number? option.tree_number: "-" }</TableCell>
                        <TableCell align="left">{option.tree_name?.name}</TableCell>
                        <TableCell align="left">{option.added_by?.first_name} {option.added_by?.last_name} </TableCell>
                        <TableCell align="left">{option.added_on_date}</TableCell>
                        <TableCell align="left">{option.referred_to_expert === 1 ? "Yes" : "No"}</TableCell>
                        {/* <TableCell align="left"> */}
                          {/* <Link to="#" onClick={handleViewOpen} style={{cursor:'pointer'}}>View</Link> */}
                          {/* <IconButton aria-label="delete" size="large" onClick={()=>handleViewOpen(option.images)} color="success">
                            <Visibility />
                          </IconButton>
                          </TableCell> */}
                          {/* <TableCell align="left">{option.qc_status}</TableCell>
                        <TableCell align="left">{option.qc_by?.first_name ?option.qc_by?.first_name : "-" }</TableCell>
                        <TableCell align="left">{option.qc_date? option.qc_date: "-" }</TableCell> */}
                        <TableCell align="right">
                          <TreeCensusMenu permissions={userPermissions} treeCensusId={option.id} TreeCensusName={option.property?.owner_name} qcStatus={option.qc_status} handleEdit={()=>handleEdit(option)} handleApprove={()=>handleQcSubmit(null,option.id)} handleQcDialog={()=>handleQcDialog(option.id)} handleCensusViewDialog={() =>handleCensusViewDetailsDialog(option)} handleDelete={()=>handleDelete(option)} />
                        </TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {/* {showList?  <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} /> : treeCensus ? <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} /> : null} */}
  {treeCensus ?
          <Pagination count={showList? pageInfo.last_page : 0} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  :null}
        </Card>
      </Container>
    </Page>
  );
}
