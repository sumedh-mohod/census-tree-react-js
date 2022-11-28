import { Card, Table, Stack, TableBody, TableCell, Container, Typography, TableContainer, Grid, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead, UserListToolbar, TeamsMenu } from '../../sections/@dashboard/user';
import Iconify from '../../components/Iconify';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'team', label: 'Team Code', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile Number', alignRight: false },
  { id: 'treeAdded', label: '1 st Tree Added', alignRight: false },
  { id: 'lastTreeAdded', label: 'Last Tree Added', alignRight: false },
  { id: 'maxInterval', label: 'Max interval bt 2 Trees', alignRight: false },
];

// ----------------------------------------------------------------------

export default function YesterdayLoggedIn() {
  const useStyles = makeStyles({
    success: {
      backgroundColor: '#d0fae2',
      borderRadius: '5px',
      padding: '2px 8px',
      color: '#3B8038',
      border: '1.5px solid #3B8038',
      fontFamily: 'Poppins',
    },

    warning: {
      backgroundColor: '#F8EED4',
      borderRadius: '5px',
      padding: '3px 0px',
      color: '#E46727',
      border: '1.5px solid #E46727',
      fontFamily: 'Poppins',
      width: '150px',
      fontSize: '12px',
    },
    successDark: {
      backgroundColor: '#DDFAD1',
      borderRadius: '5px',
      padding: '3px',
      color: '#507C59',
      border: '1.5px solid #507C59',
      fontFamily: 'Poppins',
      width: '150px',
      fontSize: '12px',
    },
    danger: {
      backgroundColor: '#F6DDDD',
      borderRadius: '5px',
      padding: '3px',
      color: '#C0374E',
      border: '1.5px solid #C0374E',
      fontFamily: 'Poppins',
      width: '150px',
      fontSize: '12px',
    },
    darkSection: {
      backgroundColor: '#214C50',
      color: '#fff',
      borderRadius: '12px',
      fontWeight: 400,
      // pointerEvents: 'none',
      fontSize: '15px',
      padding: '10px 15px',
    },
  });


  
  const classes = useStyles();
  const navigate = useNavigate()

  const handleChange =() => {
    navigate("/dashboard/home/yesterdayLoggedInAssociates")
    // console.log("Routing 2")
  }
  return (
  
    
        <Grid container spacing={3}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5} mt={5}>
                <Typography variant="h4" gutterBottom>
                Associates Work Logs
                  <Typography variant="h6" style={{ fontWeight: 400 }}>
                  It's showing work logs of Associates
                  </Typography>
                </Typography>
                <Button className={classes.darkSection} onClick={()=>{handleChange()}}>View All</Button>
              </Stack>
              <Card>
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }} style={{ padding: '10px 5px' }}>
                    <Table size="small" aria-label="a dense table">
                      <UserListHead headLabel={TABLE_HEAD} />
                      <TableBody>
                        <TableCell align="left">
                          <b>1</b>
                        </TableCell>
                        <TableCell align="left">
                          Akash
                          <br />
                          <b>Base Color</b>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.success}>
                            <b>abc</b>
                          </button>
                        </TableCell>
                        <TableCell align="left" style={{ width: '150px' }}>
                          <PhoneInTalkIcon
                            style={{
                              color: '#fff',
                              background: '#CE5623',
                              borderRadius: '15px',
                              padding: '3px',
                              marginBottom: '-5px',
                            }}
                          />
                          <span style={{ marginLeft: '5px' }}>9999999999</span>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.warning}>
                            <b>10:30 AM, 22 Jan 2022</b>
                          </button>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.successDark}>
                            <b>10:30 AM, 22 Jan 2022</b>
                          </button>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.danger}>
                            <b>10:30 AM, 22 Jan 2022</b>
                          </button>
                        </TableCell>
                      </TableBody>
                      <TableBody>
                        <TableCell align="left">
                          <b>1</b>
                        </TableCell>
                        <TableCell align="left">
                          Akash
                          <br />
                          <b> Base Color</b>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.success}>
                            <b>abc</b>
                          </button>
                        </TableCell>
                        <TableCell align="left" style={{ width: '150px' }}>
                          <PhoneInTalkIcon
                            style={{
                              color: '#fff',
                              background: '#CE5623',
                              borderRadius: '15px',
                              padding: '3px',
                              marginBottom: '-5px',
                            }}
                          />
                          <span style={{ marginLeft: '5px' }}>9999999999</span>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.warning}>
                            <b>10:30 AM, 22 Jan 2022</b>
                          </button>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.successDark}>
                            <b>10:30 AM, 22 Jan 2022</b>
                          </button>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.danger}>
                            <b>10:30 AM, 22 Jan 2022</b>
                          </button>
                        </TableCell>
                      </TableBody>
                      
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </Card>
            </Grid>
          </Grid>
        </Grid>

  );
}
