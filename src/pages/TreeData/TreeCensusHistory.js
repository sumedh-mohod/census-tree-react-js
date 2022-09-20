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
  Breadcrumbs,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from '../../components/JsonFiles/TreeData.json';
import BaseColorDialog from '../../components/DialogBox/tree-data/BaseColorDialog';
import BaseColorMoreMenu from '../../sections/@dashboard/tree/BaseColorMoreMenu';
import { GetTreeCensusHistory, SearchTreeCensusHistory } from '../../actions/TreeCensusAction';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'locationType', label: 'Location Type', alignRight: false },
  { id: 'propertyType', label: 'Property Type', alignRight: false },
  { id: 'propertyOwner', label: 'Property Owner', alignRight: false },
  //   { id: 'ownerName', label: 'Owner Name', alignRight: false },
  { id: 'tenantName', label: 'Tenant Name', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
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
  // { id: 'action',label: 'Action',alignRight: true },
];

// ----------------------------------------------------------------------

export default function TreeCensusHistory() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [imageList, setImageList] = useState([]);

  const { treeCensusHistory, pageInfo } = useSelector((state) => ({
    treeCensusHistory: state.treeCensus.treeCensusHistory,
    pageInfo: state.treeCensus.pageInfo,
  }));

  const { treeCensusId, treeCensusName } = useParams();
  const {state} = useLocation();

  useEffect(() => {
    dispatch(GetTreeCensusHistory(treeCensusId, page, rowsPerPage));
  }, []);

  useEffect(() => {
    if (pageInfo) {
      setCount(pageInfo?.total);
    }
  }, [pageInfo]);

  const fetchRun = useRef(true);
  useEffect(() => {
    if (fetchRun.current) {
      fetchRun.current = false;
      return;
    }
    setShowList(true);
  }, [treeCensusHistory]);

  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen);
    setImageList(images || []);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if (search) {
      dispatch(SearchTreeCensusHistory(treeCensusId, newPage, rowsPerPage, searchValue));
    } else {
      dispatch(GetTreeCensusHistory(treeCensusId, newPage, rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setShowList(false);
    setPage(1);
    if (search) {
      dispatch(SearchTreeCensusHistory(treeCensusId, 1, parseInt(event.target.value, 10), searchValue));
    } else {
      dispatch(GetTreeCensusHistory(treeCensusId, 1, parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      if (value) {
        setShowList(false);
        dispatch(SearchTreeCensusHistory(treeCensusId, 1, rowsPerPage, value));
        setSearch(true);
        setPage(1);
        setSearchValue(value);
      } else {
        setShowList(false);
        dispatch(GetTreeCensusHistory(treeCensusId, 1, rowsPerPage));
        setSearch(false);
        setPage(1);
        setSearchValue('');
      }
    }, 1000);
  };

  return (
    <Page title="User">
      <Container>
        {viewOpen ? <ViewImageDialog isOpen={viewOpen} handleClose={handleViewOpen} data={imageList} /> : null}
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" style={{ color: '#000000' }} separator=">">
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
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
        Census
        </Link> */}
            <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
            Tree Data
          </Typography>
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
          <Link
          component={RouterLink}
          to={`/dashboard/census`}
          state={state}
          underline="hover"
         // sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
        >
        Census
        </Link>
          </Typography>
        {treeCensusName === "undefined" ? null :
            <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
        <Link
          underline="hover"
          // sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
          // variant="h4" gutterBottom style={{color: "#000000"}}
        >
          {treeCensusName}
              
        </Link>
        </Typography>
        }
        <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
            History
          </Typography>
      </Breadcrumbs>

    </div>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {showList
                    ? treeCensusHistory?.map((option, index) => {
                        return (
                          <TableRow hover>
                            <TableCell align="left">
                              <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                            </TableCell>
                            <TableCell align="left">{option.location_type?.location_type}</TableCell>
                            <TableCell align="left">{option.property_type?.property_type}</TableCell>
                            <TableCell align="left">{option.property?.owner_name}</TableCell>
                            <TableCell align="left">{option.property?.tenant_name}</TableCell>
                            <TableCell align="left">{option.location}</TableCell>
                            <TableCell align="left">{option.property?.area ? option.property?.area : '-'}</TableCell>
                            <TableCell align="left">{option.tree_type?.tree_type}</TableCell>
                            <TableCell align="left">{option.tree_name?.name}</TableCell>
                            <TableCell align="left">{option.tree_name?.botanical_name}</TableCell>
                            <TableCell align="left">{option.girth}</TableCell>
                            <TableCell align="left">{option.height}</TableCell>
                            <TableCell align="left">{option.canopy}</TableCell>
                            <TableCell align="left">{option.tree_condition?.condition}</TableCell>
                            <TableCell align="left">{option.disease_id ? option.disease_id : '-'}</TableCell>
                            <TableCell align="left">{option.plantation_date ? option.plantation_date : '-'}</TableCell>
                            <TableCell align="left">{option.referred_to_expert === 1 ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="left">{option.action_need ? option.action_need : '-'}</TableCell>
                            <TableCell align="left">
                              {/* <Link to="#" onClick={handleViewOpen} style={{cursor:'pointer'}}>View</Link> */}
                              <IconButton
                                aria-label="delete"
                                size="large"
                                onClick={() => handleViewOpen(option.images)}
                                color="success"
                              >
                                <Visibility />
                              </IconButton>
                            </TableCell>
                            <TableCell align="left">{option.qc_status}</TableCell>
                            <TableCell align="left">
                              {option.qc_by?.first_name ? option.qc_by?.first_name : '-'}
                            </TableCell>
                            <TableCell align="left">{option.qc_date ? option.qc_date : '-'}</TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {treeCensusHistory ? (
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
