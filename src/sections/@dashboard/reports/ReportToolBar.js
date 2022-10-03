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
  Button,
} from '@mui/material';
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

ReportToolBar.propTypes = {
  callType: PropTypes.string,
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeHolder: PropTypes.string,
  handleCoucilChange: PropTypes.func,
  handleWardChange: PropTypes.func,
  handleZoneChange: PropTypes.func,
  handleExportexcel: PropTypes.func,
  coucilId: PropTypes.any,
  zoneId: PropTypes.any,
  wardId: PropTypes.any,
};

export default function ReportToolBar({ numSelected, filterName, onFilterName, handleExportexcel }) {
  // const {
  //     council,
  //     zones,
  //     wards,
  //   } = useSelector((state) => ({
  //     council:state.council.activeCouncil,
  //     zones:state.zones.activeZonesByCID,
  //     wards:state.wards.activeWardsByCID,
  //   }));

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
              <img src={SearchImage} alt="abell" height='25' width='35' />
            </InputAdornment>
          }
        />
      )}

      <Grid container justifyContent="flex-end">
        {/* {(callType === "BaseColor")?(
         <h5 style={{marginTop: 10}}>Please select council to get  base color data</h5>
         ):null} */}
        <Grid item sm={2.7} justifyContent="flex-end" style={{ marginRight: 20 }}>
          <Button
            variant="contained"
            onClick={() => handleExportexcel()}
            style={{ marginLeft: 30, marginTop: 5, height: 50, width: 150, marginRight: 2, backgroundColor: '#DF6526' }}
          >
            Export Report
          </Button>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
