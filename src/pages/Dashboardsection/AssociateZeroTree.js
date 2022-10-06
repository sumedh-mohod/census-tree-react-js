
import {
  Card,
  Table,
  Stack,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead, UserListToolbar, TeamsMenu } from '../../sections/@dashboard/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'teamName', label: 'Name', alignRight: false },
  { id: 'roll', label: 'Role', alignRight: false },
  { id: 'teamCode', label: 'Team Code', alignRight: false },
  { id: 'teamType', label: 'Mobile Number', alignRight: false },
  { id: 'councilName', label: 'Zone', alignRight: false },
  { id: 'zone', label: 'Ward', alignRight: false },
  { id: 'ward', label: 'Last Tree Sync On', alignRight: false },
];

// ----------------------------------------------------------------------

export default function AssociateZeroTree() {
    const useStyles = makeStyles({
        success: {
          backgroundColor: '#d0fae2',
          borderRadius: '5px',
          padding: '2px 8px',
          color: '#3B8038',
          border: '1.5px solid #3B8038',
          fontFamily: 'Poppins',
          // width: '100%'
        },
    
          successDark: {
            backgroundColor: '#DDFAD1',
            borderRadius: '5px',
            padding: '3px',
            color: '#507C59',
            border: '1.5px solid #507C59',
            fontFamily: 'Poppins',
            // width: '100%',
            fontWeight: 600,
            fontSize: '12px'
          },
      });
      const classes = useStyles();
  return (
    <Page title="TeamList">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5} mt={5}>
          <Typography variant="h4" gutterBottom>
          Associates with <span style={{color: 'red'}}> 0 (Zero)</span> Trees sync yesterday
            <Typography variant="h6" style={{ fontWeight: 400 }}>
            It is showing last top 10 logged associates
            </Typography>
          </Typography>
        </Stack>
        <Card>
         
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }} style={{padding: '10px 0px'}}>
              <Table  size="small" aria-label="a dense table">
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                <TableCell align="left">
                        <b>1</b>
                      </TableCell>
                      <TableCell align="left">
                        Akash
                      </TableCell>
                      <TableCell align="left">
                        Base Color
                      </TableCell>
                      <TableCell align="left">
                      <button className={classes.success}><b>TEAM-10</b></button>
                      </TableCell>
                      <TableCell align="left">
                       9999999999
                      </TableCell>
                      <TableCell align="left">
                       13
                      </TableCell>
                      <TableCell align="left">
                       W:02
                      </TableCell>
                      <TableCell align="left">
                      <button className={classes.successDark}>10:30 AM,22 Jan 2022</button>
                      </TableCell>
                      
                </TableBody>
                <TableBody>
                <TableCell align="left">
                        <b>1</b>
                      </TableCell>
                      <TableCell align="left">
                        Akash
                      </TableCell>
                      <TableCell align="left">
                        Base Color
                      </TableCell>
                      <TableCell align="left">
                      <button className={classes.success}><b>TEAM-10</b></button>
                      </TableCell>
                      <TableCell align="left">
                       9999999999
                      </TableCell>
                      <TableCell align="left">
                       13
                      </TableCell>
                      <TableCell align="left">
                       W:02
                      </TableCell>
                      <TableCell align="left">
                      <button className={classes.successDark}><b>10:30 AM,22 Jan 2022</b></button>
                      </TableCell>
                      
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
