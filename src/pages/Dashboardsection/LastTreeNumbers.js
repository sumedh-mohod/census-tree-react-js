import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography, Container, Stack, Button, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ProjectImg from '../../Assets/plant_team_tree.png';
import FullLoader from '../../components/Loader/FullLoader';
import TreedetailStatusButton from '../../components/statusbutton/TreedetailStatusButton';
// import UserListToolbar from '../../sections/@dashboard/user';

const LastTreeNumbers = (props) => {
  const [ teamId, setTeamId ] = useState();
  const [teamName, setTeamName] = useState(props?.teams[0]?.name);
  const {
    showLoader,
  } = useSelector((state) => ({
    showLoader: state.common.showLoader,
  }));
  useEffect(()=>{
    const filterTeamName = props?.teams.filter((val)=> val.id === teamId);
    if(filterTeamName){
      setTeamName(filterTeamName[0]?.name);
    }
  },[teamId])
 
  const filterByName = () => {};
  const useStyles = makeStyles({
    success: {
      backgroundColor: '#DDFAD1',
      color: '#507C59',
      border: '1px solid #507C59',
      fontSize: '12px',
      borderRadius: '5px',
      padding: '4px 10px',
      fontWeight: 600,
      pointerEvents: 'none',
    },
    pending: {
      backgroundColor: '#efcbbd',
      color: '#CE5623',
      border: '1px solid #CE5623',
      fontSize: '12px',
      borderRadius: '5px',
      padding: '4px 10px',
      fontWeight: 600,
      pointerEvents: 'none',
    },
    icon: {
      fill: '#214C50',
    },
  });
  const classes = useStyles();

  const handleCouncilTeam = (e)=>{
    setTeamId(e);
    console.log("councilchange", e);
    props.handleCouncilTeamChange(e);
  }
  return (
    <>
    
      <Grid container item xs={12} md={12} sm={12} spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={12}>
          <Stack direction="row" justifyContent="space-between" sx={{marginLeft: '-24px'}}>
            <Typography variant="h4" gutterBottom>
              Last Tree Numbers ({props.councilName})
              <Typography variant="h6" style={{ fontWeight: 400 }}>
                It is showing current tree number of selected team
              </Typography>
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 400 }}>
            <Select
                    id="state"
                    displayEmpty
                    style={{ height: 45, width: '250px', background: '#fff' }}
                    onChange={(e) => handleCouncilTeam(e.target.value)}
                    renderValue={teamName? () => `${teamName}` : () => `${props?.teams[0]?.name}`}
                    // renderValue={
                    //   props?.team_name !== '' ? props?.team_name:  "Search Team"}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Team Name</em>
                    </MenuItem>
                    {props?.teams?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      {!showLoader?  <Grid container spacing={3}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              
              <Card style={{ padding: '50px 50px 25px 50px', background: '#214C50' }}>
                <Grid container spacing={1}>
                  <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
                    <Typography variant="h4" mt={8}>
                      <Button variant="contained" className={classes.success} style={{ padding: '4px 20px' }} mb={1}>
                      {props?.treeDetail?.team_code}
                      </Button>
                      <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                      {props?.treeDetail?.tree_number}
                        <Typography variant="h5" style={{ color: '#fff', fontSize: '18px' }}>
                          Last Tree Number
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                            The trees generated in <br />
                            this council till now.
                          </Typography>
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid container item xs={12} md={6} sm={6} spacing={3} mb={1}>
                    <Grid
                      xs={12}
                      sm={6}
                      md={6}
                      sx={{
                        borderRight: '1px solid #9b9393',
                        borderBottom: '1px solid #9b9393',
                        padding: '15px 10px 0px 10px',
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Base Color
                          <Typography variant="h5" style={{ fontWeight: 600, fontSize: '15px' }}>
                            By {props?.treeDetail?.added_by}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      md={6}
                      sx={{ borderBottom: '1px solid #9b9393', padding: '15px 10px 0px 10px' }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Team Name
                          <Typography variant="h5" style={{ fontWeight: 600, fontSize: '15px' }}>
                            {props?.treeDetail?.team_name}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      md={6}
                      sx={{
                        borderRight: '1px solid #9b9393',
                        borderBottom: '1px solid #9b9393',
                        padding: '15px 10px 0px 10px',
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Ward
                          <Typography variant="h5" style={{ fontWeight: 600, fontSize: '15px' }}>
                            WARD: {props?.treeDetail?.ward}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      md={6}
                      sx={{ borderBottom: '1px solid #9b9393', padding: '15px 10px 0px 10px' }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Contact Number
                          <Typography variant="h5" style={{ fontWeight: 600, fontSize: '15px' }}>
                            +91 - {props?.treeDetail?.mobile}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      md={6}
                      sx={{ borderRight: '1px solid #9b9393', padding: '15px 10px 0px 10px' }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Added Tree At
                          <Typography variant="h6" style={{ fontWeight: 400 }}>
                            <Button variant="contained" className={classes.pending}>
                            {props?.treeDetail?.added_on}
                            </Button>
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} style={{ padding: '15px 10px 0px 10px' }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Sync Tree At
                          <Typography variant="h6" style={{ fontWeight: 400 }}>
                            <Button variant="contained" className={classes.success}>
                            {props?.treeDetail?.synced_at}
                            </Button>
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
                    <img src={ProjectImg} alt="plant" />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>: <FullLoader showLoader={showLoader}/>}
       
     
    </>
  );
};

export default LastTreeNumbers;
