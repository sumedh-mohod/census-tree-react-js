
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
  Link,
  IconButton,
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
import BaseColorMoreMenu from '../../sections/@dashboard/tree/BaseColorMoreMenu';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
import { GetBaseColorTrees, DeleteBaseColorTrees, SearchBaseColorTrees, AddBaseColorTrees, UpdateQCStatusOfBaseColorTrees } from '../../actions/BaseColorAction';
import { GetActiveCouncil } from '../../actions/CouncilAction';
import { GetActiveZonesByCouncilId } from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId } from '../../actions/WardsActions';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
import QcStatusDialog from '../../components/DialogBox/tree-data/QcStatusDialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'locationType', label: 'Location Type', alignRight: false },
  { id: 'propertyType', label: 'Property Type', alignRight: false },
  { id: 'propertyNumber', label: 'Property Number', alignRight: false },
  { id: 'propertyAddress', label: 'Property Address', alignRight: false },
  { id: 'treeLocation', label: 'Tree Location', alignRight: false },
  { id: 'locationAccuracyNeeded', label: 'Accuracy Captured', alignRight: false },
  { id: 'ownerName', label: 'Owner Name', alignRight: false },
  { id: 'tenantName', label: 'Tenant Name', alignRight: false },
  { id: 'images', label: 'Images', alignRight: false },
  { id: 'addedBy', label: 'Added By', alignRight: false },
  { id: 'addedOn', label: 'Added On', alignRight: false },
  { id: 'qcStatus', label: 'QC Status', alignRight: false },
  { id: 'qcRemarks', label: 'QC Remarks', alignRight: false },
  { id: 'qcBy', label: 'QC By', alignRight: false },
  { id: 'qcDate', label: 'QC Date', alignRight: false },
  { id: 'action',label: 'Action',alignRight: true },
];

// ----------------------------------------------------------------------

export default function BaseColor() {
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
   const [baseColorId,setBaseColorId] = useState("");
   const userPermissions = [];

   const {
    council,
    zones,
    wards,
    baseColorTrees,
    editBaseColorTreesLog,
    deleteBaseColorTreesLog,
    updateQCStatusLog,
    pageInfo,
    loggedUser
  } = useSelector((state) => ({
    council:state.council.activeCouncil,
    zones:state.zones.zones,
    wards:state.wards.wards,
    baseColorTrees:state.baseColor.baseColorTrees,
    editBaseColorTreesLog:state.baseColor.editBaseColorTreesLog,
    deleteBaseColorTreesLog:state.baseColor.deleteBaseColorTreesLog,
    updateQCStatusLog:state.baseColor.updateQCStatusLog,
    pageInfo:state.baseColor.pageInfo,
    loggedUser:state.auth.loggedUser,
  }));

  loggedUser.roles[0].permissions.map((item, index)=>(
    userPermissions.push(item.name)
  ))

  const { state} = useLocation();

  useEffect(()=>{
    let cId = null;
    let wId = null;
    let zId = null;
    if(state?.councilId){
      setCouncilId(state.councilId)
      cId = state.councilId;
    }
    if(state?.wardId){
      setWardId(state.wardId);
      wId = state.wardId;
    }
    if(state?.zoneId){
      setZoneId(state.zoneId)
      zId = state.zoneId;
    }
    if(state?.pageNumber){
      setPage(state.pageNumber)
    }
    if(state){
      dispatch(GetBaseColorTrees(state.pageNumber,rowsPerPage,cId,zId,wId))
    }
    
  },[])

  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setShowList(true);
    dispatch(GetBaseColorTrees(page,rowsPerPage,coucilId,zoneId,wardId));
  },[editBaseColorTreesLog,deleteBaseColorTreesLog,updateQCStatusLog])

  const secondRun = React.useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setShowList(true);
  },[baseColorTrees])

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
    setBaseColorId(id);
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

    dispatch(UpdateQCStatusOfBaseColorTrees(id,obj))

  }

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteBaseColorTrees(data.id,data.status?0:1));
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchBaseColorTrees(newPage,rowsPerPage,coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetBaseColorTrees(newPage,rowsPerPage,coucilId,zoneId,wardId));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setShowList(false)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchBaseColorTrees(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetBaseColorTrees(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId));
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
          dispatch(SearchBaseColorTrees(1,rowsPerPage,coucilId,zoneId,wardId,value))
          setSearch(true)
          setShowList(false)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetBaseColorTrees(1,rowsPerPage,coucilId,zoneId,wardId));
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
    dispatch(GetBaseColorTrees(1,rowsPerPage,e.target.value,null,null))
    dispatch(GetActiveZonesByCouncilId(1,e.target.value))
    dispatch(GetActiveWardsByCouncilId(1,e.target.value))
  }

  const handleWardChange = (e) => {
    setWardId(e.target.value);
    setPage(1);
    setShowList(false);
    dispatch(GetBaseColorTrees(1,rowsPerPage,coucilId,zoneId,e.target.value))
  }

  const handleZoneChange = (e) => {
    setShowList(false);
    setZoneId(e.target.value);
    setPage(1);
    dispatch(GetBaseColorTrees(1,rowsPerPage,coucilId,e.target.value,wardId))
  }


  return (
    <Page title="User">
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
        baseColorId={baseColorId}
        handleClose = {()=>handleQcDialog(null)}
        handleSubmit = {(data,id)=>handleQcSubmit(data,id)}
        />:null
        }
         
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" style={{color: "#000000"}} separator='>'>
        {/* <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          component={RouterLink} to="/login"
          // href="#"
        > 
         <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
          Tree Data
          </Typography>
         </Link> 
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
          href="/dashboard/base-color"
        >
        Base Color
        </Link> */}
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
            Tree Data
          </Typography>
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
          Base Color
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
        callType="BaseColor"
        />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                         {!coucilId?(
                <TableRow>
                  <TableCell align="right" colSpan={8} fontWeight={700}> 
                  Please select council to get base color data
                </TableCell>
                </TableRow>
                ):null
}
                <TableBody>
                     { showList? baseColorTrees?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{((page-1)*(rowsPerPage))+(index+1)}</TableCell>
                            <TableCell align="left">{option.location_type?.location_type}</TableCell>
                        <TableCell align="left">{option.property_type?.property_type}</TableCell>
                        <TableCell align="left">{option.property?.property_number?option.property?.property_number: "-"}</TableCell>
                        <TableCell align="left">{option.property?.address? option.property?.address: "-"}</TableCell>
                        <TableCell align="left">{option.location}</TableCell>
                        <TableCell align="left">{option.location_accuracy}</TableCell>
                        <TableCell align="left">{option.property?.owner_name}</TableCell>
                        <TableCell align="left">{option.property?.tenant_name?option.property?.tenant_name:"-"}</TableCell>
                        <TableCell align="left">
                          {/* <Link to="#" onClick={handleViewOpen} style={{cursor:'pointer'}}>View</Link> */}
                          <IconButton aria-label="delete" size="large" onClick={()=>handleViewOpen(option.images)} color="success">
                            <Visibility />
                          </IconButton>
                          </TableCell>
                        <TableCell align="left">{option.added_by?.first_name} {option.added_by?.last_name}</TableCell>
                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{option.added_on_date}</TableCell>
                        <TableCell align="left">{option.qc_status?option.qc_status:"-"}</TableCell>
                        <TableCell align="left">{option.qc_remark?option.qc_remark?.remark:"-"}</TableCell>
                        <TableCell align="left">{option.qc_by? option.qc_by?.first_name: "-"} {option.qc_by? option.qc_by?.last_name: "-"}</TableCell>
                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{option.qc_date?option.qc_date:"-"}</TableCell>
                        <TableCell align="right">
                          <BaseColorMoreMenu baseColorId={option.id} baseColorName={option.property?.owner_name} permissions={userPermissions} qcStatus={option.qc_status} councilId={coucilId} zoneId={zoneId} wardId={wardId} pageNumber={page} handleEdit={()=>handleEdit(option)} handleApprove={()=>handleQcSubmit(null,option.id)} handleQcDialog={()=>handleQcDialog(option.id)} handleDelete={()=>handleDelete(option)} />
                        </TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {baseColorTrees?(
          <Pagination count={showList? pageInfo.last_page : 0} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
        </Card>
      </Container>
    </Page>
  );
}
