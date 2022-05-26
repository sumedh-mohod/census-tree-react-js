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
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import CreateCouncilDialog from "../../components/DialogBox/CreateCouncilDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'prefix', label: 'prefix', alignRight: false },
  { id: 'uploadlogo', label: 'Upload Logo', alignRight: false },
  { id: 'councilName', label: 'Council Name', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'district', label: 'District', alignRight: false },
  { id: 'contact', label: 'Contact Person Name', alignRight: false },
  { id: 'fName', label: 'First Name', alignRight: false },
  { id: 'mName', label: 'Middle Name', alignRight: false },
  { id: 'lName', label: 'Last Name', alignRight: false },
  { id: 'MoNumber', label: 'Mobile Number', alignRight: false },
  { id: 'emailId', label: 'Mobile Number', alignRight: false },
  { id: 'userName', label: 'User Name', alignRight: false },
  { id: 'password', label: 'Password', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
];

// ----------------------------------------------------------------------
export default function CreateCouncil() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);

  const handleNewUserClick = () => {
    console.log("hiiii")
    setOpen(!open)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="User">
      <Container>
        <CreateCouncilDialog
        isOpen={open}
        data = {dialogData}
        handleClose = {handleNewUserClick}
        // isClose={}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Council
          </Typography>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add Council

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
                     { UserTableData.CreateCouncilData.map((option) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{option.srno}</TableCell>
                        <TableCell align="left">{option.prefix}</TableCell>
                        <TableCell align="left">{option.uploadLogo}</TableCell>
                        <TableCell align="left">{option.councilName}</TableCell>
                        <TableCell align="left">{option.state}</TableCell>
                        <TableCell align="left">{option.destrict}</TableCell>
                        <TableCell align="left">{option.contactPersonName}</TableCell>
                        <TableCell align="left">{option.firstName}</TableCell>
                        <TableCell align="left">{option.MiddleName}</TableCell>
                        <TableCell align="left">{option.lastName}</TableCell>
                        <TableCell align="left">{option.mobileNumber}</TableCell>
                        <TableCell align="left">{option.emailId}</TableCell>
                        <TableCell align="left">{option.userName}</TableCell>
                        <TableCell align="left">{option.password}</TableCell>
                        <TableCell align="left">{option.role}</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu handleEdit={()=>handleEdit(option)}/>
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
