import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Select, MenuItem, Grid } from '@mui/material';
// component
import { useSelector } from 'react-redux';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

TeamListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeHolder:PropTypes.string,
  handleCoucilChange:PropTypes.func,
  handleWardChange:PropTypes.func,
  handleZoneChange:PropTypes.func,
  coucilId:PropTypes.any,
  zoneId:PropTypes.any,
  wardId:PropTypes.any
};



export default function TeamListToolbar({ numSelected, filterName, onFilterName, placeHolder,handleCoucilChange,handleWardChange,handleZoneChange,coucilId,zoneId,wardId }) {
  
    const {
        council,
        zones,
        wards,
      } = useSelector((state) => ({
        council:state.council.council,
        zones:state.zones.zones,
        wards:state.wards.wards,
      }));
  
    return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onKeyUp={onFilterName}
          // placeholder={placeHolder}
          placeholder="Search here"
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}


         <Grid container justifyContent="flex-end">
         <h5 style={{marginTop: 10}}>please select council to get  base color data</h5> 
         <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
           <Grid item xs={2.7} justifyContent="flex-end">
           
            <Select
                id="state"
                displayEmpty
                // name="gender"
                value={coucilId}
                style={{ width: '95%', height: 45}}
                onChange={handleCoucilChange}
                // error={Boolean(touched.state && errors.state)}
                // helperText={touched.state && errors.state}
                // {...getFieldProps("state")}
              >
                 <MenuItem disabled value="">
              <em>Council Name</em>
            </MenuItem>
                {council?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              <Grid item xs={2} justifyContent="flex-end">
              <Select
                id="state"
                displayEmpty
                // name="gender"
                value={zoneId}
                style={{ width: '95%', height: 45, }}
                onChange={handleZoneChange}
                // error={Boolean(touched.state && errors.state)}
                // helperText={touched.state && errors.state}
                // {...getFieldProps("state")}
              >
                 <MenuItem disabled value="">
              <em>Zone</em>
            </MenuItem>
                {coucilId? zones?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )):null}
              </Select>
              </Grid>
              <Grid item xs={2} justifyContent="flex-end">
              <Select
                id="state"
                displayEmpty
                // name="gender"
                value={wardId}
                style={{ width: '95%', height: 45}}
                onChange={handleWardChange}
                // error={Boolean(touched.state && errors.state)}
                // helperText={touched.state && errors.state}
                // {...getFieldProps("state")}
              >
                 <MenuItem disabled value="">
              <em>Ward</em>
            </MenuItem>
                {coucilId? wards?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )):null}
              </Select>
              </Grid>
              </Grid>
              
    </RootStyle>
  );
}
