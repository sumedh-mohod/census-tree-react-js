import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';
import plantTree from '../../Assets/plant_tree_details.png';
import TreedetailStatusButton from '../../components/statusbutton/TreedetailStatusButton';


const TreeDetail = (props) => {
  // console.log("treecountprops", props);
  const {base_color: baseColor, census} = props.treeCount;
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
      <Card style={{padding:'50px 50px 25px 50px',background: '#214C50'}}>
        
      <Grid container spacing={1}>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1} sx={{borderBottom: '1px solid grey'}}>
         
          <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600 }} mt={2} mb={1} sx={{paddingLeft: '10px' ,paddingBottom: '10px'}}>
            {baseColor?.total}
            <Typography variant="h5" style={{ color: '#fff',fontSize: '16px' }}>
            Base Color Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              The trees generated in this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1} sx={{borderBottom: '1px solid grey', borderLeft: '1px solid grey'}}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={2} sx={{paddingLeft: '10px',paddingBottom: '10px'}}>
          <TreedetailStatusButton slug={'danger'} count={baseColor?.unapproved}/>
            <Typography variant="h5" style={{fontSize: '16px'}} mt={1}>
            Unapproved Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing unapproved <br/> trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1} sx={{borderBottom: '1px solid grey'}}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={2} sx={{paddingLeft: '10px',paddingBottom: '10px'}}>
          <TreedetailStatusButton slug={'success'} count={baseColor?.approved} />
            <Typography variant="h5" style={{fontSize: '16px'}} mt={1}>
            Approved Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing approved<br/>  trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item md={3} xs={12} sm={2} spacing={3} mb={1} sx={{borderBottom: '1px solid grey',paddingBottom: '10px'}}>
        <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={2} sx={{paddingLeft: '10px'}}>
        <TreedetailStatusButton slug={'pending'} count={baseColor?.pending}/>
            <Typography variant="h5" style={{fontSize: '16px'}} mt={1}>
            Pending Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing pending <br/> trees count
              </Typography>
            </Typography>
          </Typography>
       
          
        </Grid>
       
       
          
        <Grid container item xs={12} md={3} sm={3} spacing={3}  >
          <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600 }} mt={3} sx={{paddingLeft: '10px'}}>
           {census?.total}
            <Typography variant="h5" style={{ color: '#fff', fontSize: '16px'}}>
              Census Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3}  sx={{borderLeft: '1px solid grey'}}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={3} sx={{paddingLeft: '10px'}}>
          <TreedetailStatusButton slug={'danger'} count={census?.unapproved} />
            <Typography variant="h5" style={{fontSize: '16px'}} mt={1}>
              Unapproved Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing unapproved <br/> trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} >
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={3} sx={{paddingLeft: '10px'}}>
          <TreedetailStatusButton slug={'success'} count={census?.approved} />
            <Typography variant="h5" style={{fontSize: '16px'}} mt={1}>
            Approved Trees
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
              It is showing approved<br/> trees count
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} >
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={3} sx={{paddingLeft: '10px'}}>
          <TreedetailStatusButton slug={'pending'} count={census?.pending} />
            <Typography variant="h5" style={{fontSize: '16px'}} mt={1}>
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
