
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from  '../../components/JsonFiles/TreeData.json';
import WardDialog from "../../components/DialogBox/WardDialog";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen ] = useState(false);

  const handleNewUserClick = () => {
    setOpen(!open)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <Page title="User">
            <div role="presentation" style={{marginBottom: 20}} onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" separator='>'>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          Tree Data
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Cencus
        </Link>
      </Breadcrumbs>
    </div>
      <Container>
        <WardDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Denied Entry
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { TreeData.deniedEntry.map((option) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{option.srno}</TableCell>
                        <TableCell align="left">{option.propertyType}</TableCell>
                        <TableCell align="left">{option.propertyNumber}</TableCell>
                        <TableCell align="left">{option.ownerName}</TableCell>
                        <TableCell align="left">{option.images}</TableCell>
                        <TableCell align="left">{option.reason}</TableCell>
                        <TableCell align="left">{option.deniedFor}</TableCell>
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
