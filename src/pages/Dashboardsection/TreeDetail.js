import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';
import plantTree from '../../Assets/plant_tree_details.png';
import TreedetailStatusButton from '../../components/statusbutton/TreedetailStatusButton';


const TreeDetail = () => {
  const useStyles = makeStyles({
    
    imgTop: {
      position: 'absolute',
       marginTop: '-70px',
        overflow: 'visible',
        zIndex: 999999,
        right: '4%'
    }
    
  });
  const classes = useStyles();
  
  return (
    <>
     <img src={plantTree} alt={'tree'} className={classes.imgTop} height='150' width='150'/>
      <Card style={{padding:'50px',background: '#214C50'}}>
        
      <Grid container spacing={1}>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
         
          <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h4" style={{ color: '#fff',fontSize: '18px' }}>
            Base Color Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              The trees generated in this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
          <TreedetailStatusButton slug={'danger'} />
            <Typography variant="h5" style={{fontSize: '18px'}}>
            Unapproved Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing unapproved <br/> trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
          <TreedetailStatusButton slug={'success'}/>
            <Typography variant="h5" style={{fontSize: '18px'}}>
            Approved Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing approved<br/>  trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item md={3} xs={12} sm={2} spacing={3} mb={1}>
        <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
        <TreedetailStatusButton slug={'pending'}/>
            <Typography variant="h5" style={{fontSize: '18px'}}>
            Pending Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing pending <br/> trees count
              </Typography>
            </Typography>
          </Typography>
       
          
        </Grid>
       
       
          
        <Grid container item xs={12} md={3} sm={3} spacing={3} mt={1}>
          <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600 }} mt={0.7}>
           9020
            <Typography variant="h5" style={{ color: '#fff', fontSize: '18px'}}>
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mt={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
          <TreedetailStatusButton slug={'danger'}/>
            <Typography variant="h5" style={{fontSize: '18px'}} >
              Unapproved Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing unapproved <br/> trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mt={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
          <TreedetailStatusButton slug={'success'}/>
            <Typography variant="h5" style={{fontSize: '18px'}}>
            Approved Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing approved<br/> trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mt={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
          <TreedetailStatusButton slug={'pending'}/>
            <Typography variant="h5" style={{fontSize: '18px'}}>
              Pending Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing pending <br/> trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      </Card>
    </>
  );
};

export default TreeDetail;
