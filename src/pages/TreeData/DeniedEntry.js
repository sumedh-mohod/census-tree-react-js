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
  Modal,
} from '@mui/material';
import moment from 'moment';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from '../../components/JsonFiles/TreeData.json';
import WardDialog from '../../components/DialogBox/WardDialog';
import { GetDeniedEntry, SearchDeniedEntry } from '../../actions/DeniedEntryAction';
import { GetActiveCouncil } from '../../actions/CouncilAction';
import { GetActiveZonesByCouncilId } from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId } from '../../actions/WardsActions';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
// import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
import ImageCarousel from '../../components/ImageCarousel';
import DeniedListToolbar from "../../sections/@dashboard/tree/DeniedListToolBar"

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
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [wardId, setWardId] = useState('');
  const [coucilId, setCouncilId] = useState('');
  const [imageList, setImageList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [fromDate,setFromDate] = useState('');
  const [toDate, setToDate] =useState('');
  const [openImageList, setOpenImageList] = useState(false);
  const handleOpenImageList = (e) => setOpenImageList(true);
  const handleCloseImageList = () => setOpenImageList(false);
  const { council, zones, wards, deniedEntry, pageInfo } = useSelector((state) => ({
    council: state.council.activeCouncil,
    zones: state.zones.zones,
    wards: state.wards.wards,
    deniedEntry: state.deniedEntry.deniedEntry,
    pageInfo: state.deniedEntry.pageInfo,
  }));


  const councilArr = council?.find((val) => val.id === coucilId);
  const todayDate = moment(new Date()).format('YYYY-MM-DD');
  

// console.log("councilArr", councilArr)
  // const firstRun = useRef(true);
  // useEffect(()=>{
  //   if (firstRun.current) {
  //     firstRun.current = false;
  //     return;
  //   }
  //   setShowList(true);
  //   dispatch(GetDeniedEntry(page+1,rowsPerPage,coucilId,zoneId,wardId));
  // },[])
  // console.log('imageList', imageList);
  // console.log('deniedEntry', deniedEntry);
  const secondRun = useRef(true);
  useEffect(() => {
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setShowList(true);
  }, [deniedEntry]);

  useEffect(() => {
    dispatch(GetActiveCouncil(1));
    // dispatch(GetBaseColorTreeById(1));
  }, []);

  useEffect(() => {
    if (pageInfo) {
      setCount(pageInfo?.total);
    }
  }, [pageInfo]);

  const handleNewUserClick = () => {
    setOpen(!open);
  };

  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen);
    setImageList(images || []);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if (search) {
      dispatch(SearchDeniedEntry(newPage, rowsPerPage, coucilId, zoneId, wardId, searchValue));
    } else {
      dispatch(GetDeniedEntry(newPage, rowsPerPage, coucilId, zoneId, wardId, fromDate, toDate ));
    }
  };

  const handleChangeRowsPerPage = (event, value) => {
    setShowList(false);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if (search) {
      dispatch(SearchDeniedEntry(1, parseInt(event.target.value, 10), coucilId, zoneId, wardId, searchValue));
    } else {
      dispatch(GetDeniedEntry(1, parseInt(event.target.value, 10), coucilId, zoneId, fromDate, toDate));
    }
  };
  function handleClick(event) {
    event.preventDefault();
    // console.info('You clicked a breadcrumb.');
  }

  let timer = null;
  const filterByName = (event) => {
    const { value } = event.currentTarget;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      if (value) {
        dispatch(SearchDeniedEntry(1, rowsPerPage, coucilId, zoneId, wardId));
        setSearch(true);
        setShowList(false);
        setPage(1);
        setSearchValue(value);
      } else {
        dispatch(GetDeniedEntry(1, rowsPerPage, coucilId, zoneId, wardId, fromDate,toDate));
        setShowList(false);
        setSearch(false);
        setPage(1);
        setSearchValue('');
      }
    }, 1000);
  };

  const handleToDate =(e) => {
    setPage(1);
    setShowList(false);
    setToDate(e.target.value)
    dispatch(GetDeniedEntry(1, rowsPerPage,coucilId, zoneId,wardId, fromDate, e.target.value));
  }
  const handleFromDate =(e) => {
    setPage(1);
    setShowList(false);
    setFromDate(e.target.value)
    dispatch(GetDeniedEntry(1, rowsPerPage,coucilId, zoneId,wardId, e.target.value, toDate));
  }
  const handleCoucilChange = (e) => {
    const councilArr = council?.find((val) => val.id === e.target.value);
    const fromDateFrom = councilArr?.project_start_date===null? todayDate:councilArr?.project_start_date
    const toDateFrom  = councilArr?.project_end_date===null? todayDate:councilArr?.project_end_date
    
    setCouncilId(e.target.value);
    setZoneId('');
    setWardId('');
    setFromDate(fromDateFrom);
    setToDate(toDateFrom)
    setPage(1);
    setShowList(false);
    dispatch(GetDeniedEntry(1, rowsPerPage, e.target.value, null, null , fromDateFrom, toDateFrom ));
    dispatch(GetActiveZonesByCouncilId(1, e.target.value));
    dispatch(GetActiveWardsByCouncilId(1, e.target.value));
  };

  const handleWardChange = (e) => {
    setWardId(e.target.value);
    setPage(1);
    setShowList(false);
    dispatch(GetDeniedEntry(1, rowsPerPage, coucilId, zoneId, e.target.value, fromDate, toDate));
  };

  const handleZoneChange = (e) => {
    setShowList(false);
    setZoneId(e.target.value);
    setPage(1);
    dispatch(GetDeniedEntry(1, rowsPerPage, coucilId, e.target.value, wardId, fromDate, toDate));
  };

  // console.log("DENIED ENTRY",deniedEntry);

  // deniedEntry?.map((option, index) => {
  //   // console.log("PROPRTY TYPE",option.property_type);
  //   // console.log("PROPERTY NUMBER",option.property?.property_number);
  //   // console.log("OWNER NAME",option.property?.owner_name);
  //   // console.log("REASON",option.reason);
  //   // console.log("DENIED FOR",option.denied_for);
  //   return null;
  // });

  return (
    <Page title="User">
      <Container>
        <WardDialog isOpen={open} handleClose={handleNewUserClick} />
        {viewOpen ? <ViewImageDialog isOpen={viewOpen} handleClose={handleViewOpen} data={imageList} /> : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs
              aria-label="breadcrumb"
              color={{ color: '#000000', fontWeight: 900, fontSize: '20px' }}
              separator=":"
            >
           
              <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                Tree Data
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: '#000000', fontWeight: 400 }}>
                Denied Entries
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '400', marginTop: '-8px'  }}>
              It is showing list of tree data with its details
            </Typography>
          </div>
        </Stack>

        <Card>
          <DeniedListToolbar
            numSelected={0}
            placeHolder={'Search Base Color...'}
            onFilterName={filterByName}
            handleCoucilChange={(e) => handleCoucilChange(e)}
            handleWardChange={(e) => handleWardChange(e)}
            handleZoneChange={(e) => handleZoneChange(e)}
            coucilId={coucilId}
            zoneId={zoneId}
            wardId={wardId}
            fromDate={fromDate}
            toDate={toDate}
            handleFromDate={(e) => handleFromDate(e)}
            handleToDate={(e) => handleToDate(e)}
            callType="DeniedEntries"
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small" aria-label="a dense table">
                <UserListHead headLabel={TABLE_HEAD} />
                {!coucilId ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8} fontWeight={700}>
                      Please select council to get data
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableBody>
                  {showList
                    ? deniedEntry?.map((option, index) => {
                        return (
                          <TableRow hover >
                            <TableCell align="left" >
                              <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                            </TableCell>
                            <TableCell align="left">
                              {option.property_type?.property_type ? option.property_type?.property_type : '-'}
                            </TableCell>
                            <TableCell align="left">
                              {option.property?.property_number ? option.property?.property_number : '-'}
                            </TableCell>
                            <TableCell align="left">{option.property?.owner_name}</TableCell>
                            <TableCell align="left">
                              <IconButton
                                aria-label="delete"
                                size="large"
                                // onClick={()=>handleViewOpen(option.images)}
                                onClick={(e) => {
                                  setImageList(option.images || []);
                                  handleOpenImageList(e);
                                }}
                                sx={{ color: '#214c50' }}
                              >
                                <Visibility />
                              </IconButton>
                            </TableCell>
                            <TableCell align="left">{option.reason}</TableCell>
                            <TableCell align="left">{option.denied_for}</TableCell>
                          </TableRow>
                        );
                      })
                    : null}
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
          {deniedEntry ? (
            <Pagination
              count={showList ? pageInfo.last_page : 0}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
              sx={{ justifyContent: 'right', display: 'flex', mt: 3, mb: 3 }}
            />
          ) : null}
        </Card>
      </Container>
    </Page>
  );
}
