import react,{useEffect} from "react"
import { Card, Table, Stack, TableBody, TableCell, Container, Typography, TableContainer, Grid, Button } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
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

export default function AssociateZeroTree(props) {
  // console.log("AssociateZeroTree", props?.council);
  
  const params = useParams();
  // console.log("............", );
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
  const navigate = useNavigate();

  const handleClick = ()  => {
    navigate(`/dashboard/home/associateWithZeroTreeYesterday/${props?.council}` );
    // console.log("Routing")
  }
 
 
  return (
    <>
      <Grid container spacing={3}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5} mt={5}>
              <Typography variant="h4" gutterBottom>
                Associates with <span style={{ color: 'red' }}> 0 (Zero)</span> Trees sync yesterday
                <Typography variant="h6" style={{ fontWeight: 400 }}>
                  It is showing last top 10 logged associates
                </Typography>
              </Typography>
              <Button className={classes.darkSection} onClick={()=>handleClick()}>View All</Button>
            </Stack>
            <Card>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }} style={{ padding: '10px 0px' }}>
                  <Table size="small" aria-label="a dense table">
                    <UserListHead headLabel={TABLE_HEAD} />
                    {props?.value?.map((val,index)=>(
                      <TableBody>
                      <TableCell align="left">
                        <b>{index+1}</b>
                      </TableCell>
                      <TableCell align="left">{val?.name}</TableCell>
                      <TableCell align="left">{val?.current_role}</TableCell>
                      <TableCell align="left">
                        <button className={classes.success}>
                          <b>{val?.team}</b>
                        </button>
                      </TableCell>
                      <TableCell align="left">{val?.mobile}</TableCell>
                      <TableCell align="left">{val?.zone}</TableCell>
                      <TableCell align="left">{val?.ward}</TableCell>
                      <TableCell align="left">
                        {val?.last_tree_synced_on.length === "NA" ? null:  <button className={classes.successDark}>{val?.last_tree_synced_on.length}</button>}
                      </TableCell>
                    </TableBody>
                    ))}
                    
               
                  </Table>
                 
                </TableContainer>
               
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
