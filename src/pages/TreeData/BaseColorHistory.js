
import { useState } from 'react';
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
  TablePagination,
} from '@mui/material';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from  '../../components/JsonFiles/TreeData.json';
import BaseColorDialog from "../../components/DialogBox/tree-data/BaseColorDialog";
import BaseColorMoreMenu from '../../sections/@dashboard/tree/BaseColorMoreMenu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'propertyType', label: 'Property Type', alignRight: false },
  { id: 'propertyNumber', label: 'Property Number', alignRight: false },
  { id: 'ownerName', label: 'Owner Name', alignRight: false },
  { id: 'images', label: 'images', alignRight: false },
  { id: 'addedBy', label: 'Added By', alignRight: false },
  { id: 'qcStatus', label: 'QC Status', alignRight: false },
  { id: 'qcRemarks', label: 'QC Remark', alignRight: false },
  { id: 'qcRemarksDate', label: 'QC Remark Date', alignRight: false },
  { id: 'addedByDate', label: 'Added By Date', alignRight: false },
];

// ----------------------------------------------------------------------

export default function BaseColorHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);

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

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Base Color History
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
                     { TreeData.baseColorHistory.map((option) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{option.srno}</TableCell>
                        <TableCell align="left">{option.propertyType}</TableCell>
                        <TableCell align="left">{option.propertyNumber}</TableCell>
                        <TableCell align="left">{option.ownerName}</TableCell>
                        <TableCell align="left">{option.images}</TableCell>
                        <TableCell align="left">{option.addedBy}</TableCell>
                        <TableCell align="left">{option.qcStatus}</TableCell>
                        <TableCell align="left">{option.qcRemarks}</TableCell>
                        <TableCell align="left">{option.qcRemarksDate}</TableCell>
                        <TableCell align="left">{option.addedByDate}</TableCell>
                        
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
