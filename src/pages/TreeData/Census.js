
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
  TablePagination,
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
import { GetTreeCensus, SearchTreeCensus} from '../../actions/TreeCensusAction';
import { GetCouncil } from '../../actions/CouncilAction';
import { GetZonesByCouncilId } from '../../actions/ZonesAction';
import { GetWardsByCouncilId } from '../../actions/WardsActions';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
import QcStatusDialog from '../../components/DialogBox/tree-data/QcStatusDialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'locationType', label: 'Location Type', alignRight: false },
  { id: 'propertyType', label: 'Property Type', alignRight: false },
  { id: 'propertyOwner', label: 'Property Owner', alignRight: false },
//   { id: 'ownerName', label: 'Owner Name', alignRight: false },
  { id: 'tenantName', label: 'Tenant Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'area', label: 'Area(Sq feet)', alignRight: false },
  { id: 'treeType', label: 'Tree Type', alignRight: false },
  { id: 'treeName', label: 'Tree Name(Local)', alignRight: false },
  { id: 'treeName', label: 'Tree Name(Botanical)', alignRight: false },
  { id: 'girth', label: 'Girth(cm)', alignRight: false },
  { id: 'Height', label: 'Height(feet)', alignRight: false },
  { id: 'canopy', label: 'Canopy', alignRight: false },
  { id: 'treeCondition', label: 'Tree Condition', alignRight: false },
  { id: 'disease', label: 'Diasease', alignRight: false },
  { id: 'plantationDate', label: 'Plantation Date', alignRight: false },
  { id: 'isReferredToExperts', label: 'Is Referred To Experts?', alignRight: false },
  { id: 'actionNeedToBeTaken', label: 'Action Need To Be Taken', alignRight: false },
  { id: 'images', label: 'Images', alignRight: false },
  { id: 'qcStatus', label: 'QC Status', alignRight: false },
  { id: 'qcBy', label: 'QC By', alignRight: false },
  { id: 'qcOnDate', label: 'QC On Date', alignRight: false },
  { id: 'action',label: 'Action',alignRight: true },
];

// ----------------------------------------------------------------------

export default function Census() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
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

   const {
    council,
    zones,
    wards,
    treeCensus,
    editBaseColorTreesLog,
    deleteBaseColorTreesLog,
    updateQCStatusLog,
    pageInfo
  } = useSelector((state) => ({
    council:state.council.council,
    zones:state.zones.zones,
    wards:state.wards.wards,
    treeCensus:state.treeCensus.treeCensus,
    // editBaseColorTreesLog:state.baseColor.editBaseColorTreesLog,
    // deleteBaseColorTreesLog:state.baseColor.deleteBaseColorTreesLog,
    // updateQCStatusLog:state.baseColor.updateQCStatusLog,
    pageInfo:state.baseColor.pageInfo,
  }));

  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setShowList(true);
    console.log("BEFORE FETCHING");
    dispatch(GetTreeCensus(page+1,rowsPerPage,coucilId,zoneId,wardId));
  },[editBaseColorTreesLog,deleteBaseColorTreesLog,updateQCStatusLog])

  const secondRun = React.useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setShowList(true);
  },[treeCensus])
  console.log("treeCensus", treeCensus )

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

    // dispatch(UpdateQCStatusOfBaseColorTrees(id,obj))

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
      dispatch(SearchTreeCensus(newPage+1,rowsPerPage,coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetTreeCensus(newPage+1,rowsPerPage,coucilId,zoneId,wardId));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setShowList(false)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if(search){
      dispatch(SearchTreeCensus(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetTreeCensus(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId));
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
          dispatch(SearchTreeCensus(1,rowsPerPage,coucilId,zoneId,wardId,value))
          setSearch(true)
          setShowList(false)
          setPage(0)
          setSearchValue(value);

        }
        else{
          dispatch(GetTreeCensus(1,rowsPerPage,coucilId,zoneId,wardId));
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
    dispatch(GetTreeCensus(1,rowsPerPage,e.target.value,null,null))
    dispatch(GetZonesByCouncilId(1,1000,e.target.value))
    dispatch(GetWardsByCouncilId(1,1000,e.target.value))
  }

  const handleWardChange = (e) => {
    setWardId(e.target.value);
    setPage(0);
    setShowList(false);
    dispatch(GetTreeCensus(1,rowsPerPage,coucilId,zoneId,e.target.value))
  }

  const handleZoneChange = (e) => {
    setShowList(false);
    setZoneId(e.target.value);
    setPage(0);
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
        baseColorId={baseColorId}
        handleClose = {()=>handleQcDialog(null)}
        handleSubmit = {(data,id)=>handleQcSubmit(data,id)}
        />:null
        }
         
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" separator='>'>
        <Link
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
                     { showList? treeCensus?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{page*rowsPerPage+(index+1)}</TableCell>
                            <TableCell align="left">{option.location_type?.location_type}</TableCell>
                        <TableCell align="left">{option.property_type?.property_type}</TableCell>
                        <TableCell align="left">{option.property?.owner_name}</TableCell>
                        <TableCell align="left">{option.property?.tenant_name}</TableCell>
                        <TableCell align="left">{option.location}</TableCell>
                        <TableCell align="left">{option.property?.area? option.property?.area : "-"}</TableCell>
                        <TableCell align="left">{option.tree_type?.tree_type}</TableCell>
                        <TableCell align="left">{option.tree_name?.name}</TableCell>
                        <TableCell align="left">{option.tree_name?.botanical_name}</TableCell>
                        <TableCell align="left">{option.girth}</TableCell>
                        <TableCell align="left">{option.height}</TableCell>
                        <TableCell align="left">{option.canopy}</TableCell>
                        <TableCell align="left">{option.tree_condition?.condition}</TableCell>
                        <TableCell align="left">{option.disease_id? option.disease_id: "-"}</TableCell>
                        <TableCell align="left">{option.plantation_date? option.plantation_date: "-"}</TableCell>
                        <TableCell align="left">{option.referred_to_expert}</TableCell>
                        <TableCell align="left">{option.action_need? option.action_need: "-"}</TableCell>
                        <TableCell align="left">
                          {/* <Link to="#" onClick={handleViewOpen} style={{cursor:'pointer'}}>View</Link> */}
                          <IconButton aria-label="delete" size="large" onClick={()=>handleViewOpen(option.images)} color="success">
                            <Visibility />
                          </IconButton>
                          </TableCell>
                          <TableCell align="left">{option.qc_status}</TableCell>
                        <TableCell align="left">{option.qc_by? option.qc_by: "-" }</TableCell>
                        <TableCell align="left">{option.qc_date? option.qc_date: "-" }</TableCell>
                        <TableCell align="right">
                          <BaseColorMoreMenu baseColorId={option.id} baseColorName={option.property?.owner_name} qcStatus={option.qc_status} handleEdit={()=>handleEdit(option)} handleApprove={()=>handleQcSubmit(null,option.id)} handleQcDialog={()=>handleQcDialog(option.id)} handleDelete={()=>handleDelete(option)} />
                        </TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
