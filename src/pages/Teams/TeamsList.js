import { filter } from 'lodash';
import { useState } from 'react';
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
} from '@mui/material';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead, UserListToolbar, TeamsMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import TeamsData from  '../../components/JsonFiles/TeamsData.json';
import TeamsTableDialog from "../../components/DialogBox/TeamsDialog/TeamsTableDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'teamName', label: 'Team Name', alignRight: false },
  { id: 'councilName', label: 'Council Name', alignRight: false },
  { id: 'zone', label: 'Zone', alignRight: false },
  { id: 'ward', label: 'Ward', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TeamsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const handleNewUserClick = () => {
    console.log("hiiii")
    setOpen(!open)
  }

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="User">
      <Container>
        <TeamsTableDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data={dialogData}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
           Teams
          </Typography>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add Team
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { TeamsData.teamsTableData.map((option) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{option.SrNo}</TableCell>
                        <TableCell align="left">{option.teamName}</TableCell>
                        <TableCell align="left">{option.councilName}</TableCell>
                        <TableCell align="left">{option.zone}</TableCell>
                        <TableCell align="left">{option.ward}</TableCell>
                        <TableCell align="right">
                          <TeamsMenu handleEdit={()=>handleEdit(option)}/>
                        </TableCell>
                        </TableRow>
                        )
                  })
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
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
