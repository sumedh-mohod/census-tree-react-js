
import { useEffect, useRef, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Pagination,
  Link,
  IconButton,
  Button,
  Breadcrumbs,
  Modal
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useParams} from 'react-router-dom';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from  '../../components/JsonFiles/TreeData.json';
import BaseColorDialog from "../../components/DialogBox/tree-data/BaseColorDialog";
import BaseColorMoreMenu from '../../sections/@dashboard/tree/BaseColorMoreMenu';
import { GetBaseColorTreeHistory, SearchBaseColorTreeHistory } from '../../actions/BaseColorAction';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
import ImageCarousel from '../../components/ImageCarousel';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'locationType', label: 'Location Type', alignRight: false },
  { id: 'propertyType', label: 'Property Type', alignRight: false },
  { id: 'propertyNumber', label: 'Property Number', alignRight: false },
  { id: 'ownerName', label: 'Owner Name', alignRight: false },
  { id: 'tenantName', label: 'Tenant Name', alignRight: false },
  { id: 'images', label: 'images', alignRight: false },
  { id: 'addedBy', label: 'Added By', alignRight: false },
  { id: 'addedOn', label: 'Added On', alignRight: false },
  { id: 'qcStatus', label: 'QC Status', alignRight: false },
  { id: 'qcRemarks', label: 'QC Remarks', alignRight: false },
  { id: 'qcBy', label: 'QC By', alignRight: false },
  { id: 'qcDate', label: 'QC Date', alignRight: false },
];

// ----------------------------------------------------------------------

export default function BaseColorHistory() {

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [viewOpen, setViewOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [showList,setShowList] = useState(false);
   const [imageList,setImageList] = useState([]);
   const [openImageList, setOpenImageList] = useState(false);
   const handleOpenImageList = (e) => setOpenImageList(true);
   const handleCloseImageList = () => setOpenImageList(false);

   const {
    baseColorTreeHistory,
    pageInfo
  } = useSelector((state) => ({
    baseColorTreeHistory:state.baseColor.baseColorTreeHistory,
    pageInfo : state.baseColor.pageInfo
  }));

  const { baseColorId, baseColorName } = useParams();
  const {state} = useLocation();

  useEffect(()=>{
    dispatch(GetBaseColorTreeHistory(baseColorId,page,rowsPerPage));
  },[])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const fetchRun = useRef(true);
  useEffect(()=>{
    if (fetchRun.current) {
      fetchRun.current = false;
      return;
    }
    setShowList(true);
  },[baseColorTreeHistory])


  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen)
    setImageList(images || []);
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchBaseColorTreeHistory(baseColorId,newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetBaseColorTreeHistory(baseColorId,newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setShowList(false);
    setPage(1);
    if(search){
      dispatch(SearchBaseColorTreeHistory(baseColorId,1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetBaseColorTreeHistory(baseColorId,1,parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          setShowList(false);
          dispatch(SearchBaseColorTreeHistory(baseColorId,1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          setShowList(false);
          dispatch(GetBaseColorTreeHistory(baseColorId,1,rowsPerPage));
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }


  return (
    <Page title="User">
      <Container>
      {viewOpen?
        <ViewImageDialog
        isOpen={viewOpen}
        handleClose = {handleViewOpen}
        data={imageList}
        />:null
        }
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb" style={{color: "#000000", fontWeight: 700, fontSize: '25px'}} separator=':'>
      <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
      Tree Data
          </Typography>
      <Typography variant="h4" gutterBottom style={{color: "#000000",fontWeight: 400}}>
        <Link 
        component={RouterLink}
        to={`/dashboard/base-color`}
        state={state}
          underline="hover"
          // sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          // href="#"
        >
       Base Color
              
        </Link>
        </Typography>
        <Typography variant="h4" gutterBottom style={{color: "#000000", fontWeight: 400}}>
        History
        </Typography>
        
      </Breadcrumbs>
      <Typography variant="h6" style={{ fontWeight: 400,marginTop: '-8px' }}>
              It is showing list of tree data with its details
            </Typography>
    </div>
         
      
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table  size="small" aria-label="a dense table">
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { showList ? baseColorTreeHistory?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left"><b>{((page-1)*(rowsPerPage))+(index+1)}</b></TableCell>
                            <TableCell align="left">{option.location_type?.location_type}</TableCell>
                        <TableCell align="left">{option.property_type?.property_type}</TableCell>
                        <TableCell align="left">{option.property?.property_number}</TableCell>
                        <TableCell align="left">{option.property?.owner_name}</TableCell>
                        <TableCell align="left">{option.property?.tenant_name?option.property?.tenant_name:"-"}</TableCell>
                        <TableCell align="left">
                        <IconButton aria-label="delete" size="large" 
                        // onClick={()=>handleViewOpen(option.images)}
                        onClick={(e) => {
                          setImageList(option.images || []);
                          handleOpenImageList(e);
                        }}
                         color="success">
                            <Visibility />
                          </IconButton>
                          </TableCell>
                        <TableCell align="left">{option.added_by?.first_name}</TableCell>
                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{option.added_on_date}</TableCell>
                        <TableCell align="left">{option.qc_status?option.qc_status:"-"}</TableCell>
                        <TableCell align="left">{option.qc_remark?option.qc_remark?.remark:"-"}</TableCell>
                        <TableCell align="left">{option.qc_by? option.qc_by?.first_name: "-"}</TableCell>
                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{option.qc_date?option.qc_date:"-"}</TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
            <Modal
              open={openImageList}
              onClose={handleCloseImageList}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Container style={{ width: '526px' }}>
                <ImageCarousel imagelist={imageList} />
              </Container>
              {/* <Box sx={style}>
                                <img src={val.original} alt="gallery" height="650px" width="100%" />
                              </Box> */}
            </Modal>
          </Scrollbar>
          {baseColorTreeHistory?(
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
