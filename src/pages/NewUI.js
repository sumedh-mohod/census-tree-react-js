import React from 'react';
import {
    Stack,
    Button,
    Typography,
    Grid,
    Box,
    Container,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Drawer,
    Divider,
  } from '@mui/material';
  import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
  import  ImageGallery  from 'react-image-gallery';
  import Page from '../components/Page';
 import FilterDrawer from './FilterDrawer';

  function createData(id, treeNumber, treeName) {
    return { id, treeNumber, treeName };
  }
  
  const rows = [
    createData(1, 112300001, 'Neem'),
    createData(2, 112300002, 'Neem'),
    createData(3, 112300003, 'Neem'),
    createData(4, 112300004, 'Neem'),
    createData(5, 112300005, 'Neem'),
    createData(6, 112300006, 'Neem'),
    createData(7, 112300007, 'Neem'),
    createData(8, 112300008, 'Neem'),
    createData(9, 112300009, 'Neem'),
    createData(10, 1123000010, 'Neem'),
  ];

  

  
  export default function NewUI(){

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        ((event).key === "Tab" || (event).key === "Shift")
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
  
    };
     
      const properties = {
        // thumbnailPosition: "left",
        useBrowserFullscreen: false,
        showPlayButton: false,
        showBullets:true,
        showIndex:true,
        // renderItem: this.myRenderItem.bind(this),
        items: [
          {
            original: "https://i.pinimg.com/originals/78/7e/b6/787eb63e14539e0763c1687e30fe6101.jpg"
           
          },
          {
            original: "https://balconygardenweb-lhnfx0beomqvnhspx.netdna-ssl.com/wp-content/uploads/2015/06/mango-tree-1.jpg",
            
          },
          {
            original: "https://res.cloudinary.com/digicomm/image/upload/t_metadata/news-magazine/2021/_assets/mango3.jpg",
            
          },
          {
            original: "https://as1.ftcdn.net/v2/jpg/02/30/80/80/500_F_230808031_Sriv3Z1nxkTlzVcv6ZXWaXGxYnLh4dDN.jpg"
           
          },
        ]
      };

    return(
        <Page title="New UI">
            <Container>
          
          <Button
            
           variant='outlined'
            sx={{justifyContent:'end', display:'flex', position: 'fixed',right: 0 }}
            onClick={toggleDrawer("right", true)} 
           
          >
        <FilterAltRoundedIcon/>
          </Button> 
          <Drawer
           sx= {
            {
              "& .MuiDrawer-paper": {
                width: "300px",
                maxWidth: "100%",
              },
            }
          }
          anchor={"right"} open={state.right} onClose={toggleDrawer("right", false)}
          // sx={{
          //   display: { xs: 'block', sm: 'none' },
          //   '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          // }}
        >
         <FilterDrawer data={toggleDrawer("right", false)}/>
        </Drawer>
        <Grid container spacing={2} sx={{ mt:5 }}>
  
  <Grid item xs={6}>
  <Box sx={{  width: '50%', ml:5 }}>
  <Typography variant="h5" gutterBottom align='center'>
            Total Trees: 15000
          </Typography>
  <table style={{ fontFamily: "arial, sans-serif",
  borderCollapse: "collapse",
  width: "100%"}}>
      <tr>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>#</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Number</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Name</th>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>1</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300001</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Neem</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>2</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300002</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Babul</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>3</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300003</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Chapha</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>4</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300004</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Neem</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>5</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300005</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Aam</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>6</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300006</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Babul</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>7</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300007</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Aam</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>8</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300008</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Gulmohar</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>9</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300009</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Babul</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>10</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>1123000010</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Gulmohar</td>
  </tr>
  </table>
    </Box>

  </Grid>
  {/* <Divider orientation='vertical' sx={{ mr:3}} flexItem/> */}
  <Grid item xs={6} >
  <Stack spacing={2}>
  <Box sx={{ height: 400, width: '100%', mr:5 }}>
  <ImageGallery {...properties} />
  </Box>
  <Box sx={{ height: 400, width: '100%' }}>
    <Box sx={{  width: '100%' }}>
    <Typography variant="h5" gutterBottom>
            Tree Details: 
          </Typography>
    <Typography>Tree Number: 11200004</Typography>
    <Typography>Tree Name: Aam</Typography>
    <Typography>Tree Condition: Good</Typography>
    <Typography>Tree Diseases: No</Typography>
    </Box>
    <Box sx={{ height: 200, width: '100%', mt:5 }}>
    <Stack direction="row" spacing={4}>
  <Button variant="outlined" size="small">Approve & Next</Button>
  <Button variant="outlined" size="small">Unapprove & Update</Button>
  <Button variant="outlined" size="small">Refer To Expert</Button>
</Stack>
</Box>
  </Box>
</Stack>
  </Grid>
</Grid>
</Container>
</Page>
    );
  }