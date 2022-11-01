import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
// component
import { useSelector } from 'react-redux';
import Iconify from '../../../components/Iconify';
import SearchImage from '../../../Assets/Search_Image.png';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 44,
  backgroundColor: '#F8F8F8 !important',
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

DeniedListToolbar.propTypes = {
  callType: PropTypes.string,
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeHolder: PropTypes.string,
  handleCoucilChange: PropTypes.func,
  handleWardChange: PropTypes.func,
  handleZoneChange: PropTypes.func,
  coucilId: PropTypes.any,
  zoneId: PropTypes.any,
  wardId: PropTypes.any,
  fromDate: PropTypes.any,
  toDate: PropTypes.any,
};

export default function DeniedListToolbar({
  callType,
  numSelected,
  filterName,
  onFilterName,
  placeHolder,
  handleCoucilChange,
  handleWardChange,
  handleZoneChange,
  coucilId,
  zoneId,
  wardId,
  fromDate,
  toDate
}) {
  const useStyles = makeStyles({
    icon: {
      fill: '#214C50',
    },
  });
  const classes = useStyles();
  const { council, zones, wards } = useSelector((state) => ({
    council: state.council.activeCouncil,
    zones: state.zones.activeZonesByCID,
    wards: state.wards.activeWardsByCID,
  }));

  console.log("council", council)
  const councilArr = council?.find((val) => val.id === coucilId);
  const todayDate = moment(new Date()).format('YYYY-MM-DD');

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
              <img src={SearchImage} alt="abell" height="25" width="35" />
              {/* <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} /> */}
            </InputAdornment>
          }
        />
      )}

      <Grid container justifyContent="flex-end">
        {/* {(callType === "BaseColor")?(
         <h5 style={{marginTop: 10}}>Please select council to get  base color data</h5> 
         ):null} */}
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
        <Grid item sm={2.7} justifyContent="flex-end">
          <Select
            id="state"
            displayEmpty
            // name="gender"
            value={coucilId}
            style={{ width: '95%', height: 45 }}
            onChange={handleCoucilChange}
            // error={Boolean(touched.state && errors.state)}
            // helperText={touched.state && errors.state}
            // {...getFieldProps("state")}

            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
          >
            {callType === 'Teams' ? (
              <MenuItem disabled value="">
                <em>Project Name</em>
              </MenuItem>
            ) : (
              <MenuItem disabled value="">
                <em>Council Name</em>
              </MenuItem>
            )}
            {council?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item sm={2} justifyContent="flex-end">
          <Select
            id="state"
            displayEmpty
            // name="gender"
            value={zoneId}
            style={{ width: '95%', height: 45 }}
            onChange={handleZoneChange}
            // error={Boolean(touched.state && errors.state)}
            // helperText={touched.state && errors.state}
            // {...getFieldProps("state")}

            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
          >
            <MenuItem disabled value="">
              <em>Zone</em>
            </MenuItem>
            {coucilId
              ? zones?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </Grid>

        <Grid item sm={2} justifyContent="flex-end">
          <Select
            id="state"
            displayEmpty
            // name="gender"
            value={wardId}
            style={{ width: '95%', height: 45 }}
            onChange={handleWardChange}
            // error={Boolean(touched.state && errors.state)}
            // helperText={touched.state && errors.state}
            // {...getFieldProps("state")}

            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
          >
            <MenuItem disabled value="">
              <em>Ward</em>
            </MenuItem>
            {coucilId
              ? wards?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </Grid>

        {coucilId ? 
          <>
            <Grid item sm={2} justifyContent="flex-end" >
              <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                // value={fromDate}
                label="project start date*"
                placeholder="project start date*"
                defaultValue={councilArr?.project_start_date===null? todayDate:councilArr?.project_start_date}
                style={{ width: '100%'}}
                // className={classes.textField}
                // error={Boolean(touched.fromDate && errors.fromDate)}
                // helperText={touched.fromDate && errors.fromDate}
                // {...getFieldProps('fromDate')}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                // inputProps={{ max: todayDate }}
              />
            </Grid>
            <Grid item sm={2} justifyContent="flex-end">
              <TextField
                id="date"
                // value={toDate}
                
                type="date"
                label="project end date*"
                // value={toDate}
                placeholder="project end date*"
                defaultValue={councilArr?.project_end_date===null? todayDate:councilArr?.project_end_date}
                style={{ width: '90.5%',marginLeft: "5px",}}
                // sx={{ padding : "-5px -5px -2px -5px !important" }}
                // className={classes.textField}
                // error={Boolean(touched.toDate && errors.toDate)}
                // helperText={touched.toDate && errors.toDate}
                // {...getFieldProps('toDate')}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                // inputProps={{ max: todayDate }}
              />
            </Grid> </> : "" }

        {/* {(callType === "BaseColor" || "DeniedEntries")?(
         <h5 style={{marginTop: 10}}>Please select council to get  base color data</h5> 
         ):null} */}
      </Grid>
      {/* {(callType === "BaseColor")?(
         <h5 style={{marginTop: 10}}>Please select council to get  base color data</h5> 
         ):null} */}
    </RootStyle>
  );
}
