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
    InputLabel,
    Select, 
    MenuItem,
    FormControl,
  } from '@mui/material';


  export default function FilterDrawer(props){
    // console.log("in drawer");
    return(
        <Container>
          <Typography variant="h5" gutterBottom >
            Filter
          </Typography>
          <Stack>
          <Box sx={{ height: 50, width: '80%', mt:5 }}>
          <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
  <InputLabel id="demo-simple-select-label">Council</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
   
    label="Council"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Nagpur</MenuItem>
    <MenuItem value={20}>Pune</MenuItem>
    <MenuItem value={30}>Mumbai</MenuItem>
  </Select>
  </FormControl>
  </Box>
  <Box sx={{ height: 50, width: '80%' }}>
  <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
  <InputLabel id="demo-simple-select-label">Ward</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    
    label="Ward"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  </FormControl>
  </Box>
  <Box sx={{ height: 50, width: '80%' }}>
  <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
  <InputLabel id="demo-simple-select-label">Zone</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
  
    label="Zone"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  </FormControl>
  </Box>
  <Box sx={{ height: 50, width: '80%' }}>
  <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
  <InputLabel id="demo-simple-select-label">Added By</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    
    label="Added By"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>

</FormControl>
</Box>
          </Stack>
          <Button variant="outlined" sx={{mt:25, alignContent:'center', ml:10}}  style={{boxShadow: 'none'}}>Apply</Button>
        </Container>
    );
  }