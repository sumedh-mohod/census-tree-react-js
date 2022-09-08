import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import moment from 'moment';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

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
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GetReports } from '../../../actions/ReportsAction';
import Iconify from '../../../components/Iconify';
import Barchart from '../chart/Barchart';

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

ReportListToolbar.propTypes = {
  callType: PropTypes.string,
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeHolder: PropTypes.string,
  handleCoucilChange: PropTypes.func,
  handleGetData: PropTypes.func,
  // handleWardChange:PropTypes.func,
  // handleZoneChange:PropTypes.func,
  coucilId: PropTypes.any,
  fromDate: PropTypes.any,
  toDate: PropTypes.any,
  zoneId: PropTypes.any,
  wardId: PropTypes.any,
};

export default function ReportListToolbar({
  numSelected,
  handleGetData,
  handleCouncil,
  councilId,
  wardImage,
  typeImage,
  treeImage,
  conditionImage,
}) {
  const dispatch = useDispatch();
  const [coucilId, setCouncilId] = useState('');
  const [councilName, setCouncilName] = useState('');
  const [imageData, setImageData] = useState('');
  const todayDate = moment(new Date()).format('YYYY-MM-DD');
  const inputRef = useRef(null);
  // console.log('chetna......', imageData);
  // let imgData ='';

  // const { dataValue}= props;
  const handleCouncilChange = (e) => {
    setCouncilId(e.target.value);
    handleCouncil(e.target.value);

    council.map((value, index) => {
      if (value.id === e.target.value) {
        setCouncilName(value.name);
      }
      return null;
    });
    // councilId(e.target.value)
    // // console.log("councilName",councilName)
    // setZoneId("")
    // setWardId("")
    // dispatch(GetZonesByCouncilId(1,1000,e.target.value))
    // dispatch(GetWardsByCouncilId(1,1000,e.target.value))
  };
  //   console.log("councilName",councilName)
  // console.log("CouncilId", coucilId)

  const DistrictsSchema = Yup.object().shape({
    council: Yup.string().required('Council is required'),
    fromDate: Yup.string().required('From Date is Required'),
    toDate: Yup.string().required('To Date is Required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      council: '',
      fromDate: '',
      toDate: '',
    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      dispatch(GetReports(value.council, '01-01-2020', '30-12-2022'));
      // console.log("value", value)
    },
  });

  const {
    council,
    // zones,
    // wards,
    reports,
  } = useSelector((state) => ({
    council: state.council.activeCouncil,
    reports: state.reports.reports,
  }));
  // console.log("reports123", reports)
  // console.log("council1234", council)
  // console.log("Council123", council.name)

  const separateId = (id) => {
    council.map((value, index) => {
      if (value.id === id) {
        setCouncilName(value.name);
      }
      return null;
    });
  };

  const dataValue = reports?.by_wards;
  const value1 = [];
  dataValue?.map((option, index) => {
    const value2 = [index + 1];
    value2.push(option.name);
    value2.push(option.census_trees_count);
    value1.push(value2);
    return null;
  });

  const TreeName = reports?.by_tree_names;
  const treeNameValue1 = [];
  TreeName?.map((option, index) => {
    const treeNameValue2 = [index + 1];
    treeNameValue2.push(option.name);
    treeNameValue2.push(option.census_trees_count);
    treeNameValue1.push(treeNameValue2);
    return null;
  });
  console.log('value1', treeNameValue1);
  const treeType = reports?.by_tree_types;
  const treeType1 = [];
  treeType?.map((option, index) => {
    const treeType2 = [index + 1];
    treeType2.push(option.tree_type);
    treeType2.push(option.census_trees_count);
    treeType1.push(treeType2);
    return null;
  });

  const TreeCondition = reports?.by_tree_conditions;
  const TreeCondition1 = [];
  TreeCondition?.map((option, index) => {
    const TreeCondition2 = [index + 1];
    TreeCondition2.push(option.condition);
    TreeCondition2.push(option.census_trees_count);
    TreeCondition1.push(TreeCondition2);
    return null;
  });

  // console.log("dataValue", dataValue)
  // console.log("TreeName", TreeName)
  // console.log("treeType", treeType)
  // console.log("council1234", councilName)

  const exportPdf = async () => {
    const img = await wardImage();
    const treeCanvas = await treeImage();
    const typeCanvas = await typeImage();
    const conditionCanvas = await conditionImage();

    // console.log('wardImage', img);
    // console.log('treeCanvas', treeCanvas);
    // console.log('typeCanvas', typeCanvas);
    // console.log('conditionCanvas', conditionCanvas);

    const header = [['BY WARDS'], ['BY TREE NAMES'], ['BY TREE TYPES'], ['BY TREE CONDITIONS']];
    const titleHeader = [
      ['Sr. No', 'Table Content', '#']
    ];
    const headerBody = [
      ['#', 'Wards', 'Counts'],
      ['#', 'Tree Names', 'Counts'],
      ['#', 'Tree Types', 'Counts'],
      ['#', 'Tree Conditions', 'Counts'],
    ];
    const canvas = [img, treeCanvas, typeCanvas, conditionCanvas];
    const body_ = [value1, treeNameValue1, treeType1, TreeCondition1];
    const titleBody = [[1,'Content 1', 2], [2,'Content 2', 2], [3,'Content 3', 2], [4,'Content 4', 2],[5,'Content 5', 2], [6,'Content 6', 2], [7,'Content 7', 2], [8,'Content 8', 2],[9,'Content 9', 2], [10,'Content 10', 2], [1,'Content 1', 2], [2,'Content 2', 2], [3,'Content 3', 2], [4,'Content 4', 2],[5,'Content 5', 2], [6,'Content 6', 2], [7,'Content 7', 2], [8,'Content 8', 2],[9,'Content 9', 2], [10,'Content 10']];

    function push() {
      const masterArray = [];
      for (let i = 0; i < body_.length; i += 1) {
        const master = {
          header: header[i],
          headerBody: headerBody[i],
          canvas: canvas[i],
          body_: body_[i],
        };
        masterArray.push(master);
      }
      return masterArray;
    }
    const arr = push();
    // console.log('arr', arr);
    // console.log('canvas', body_);

    const doc = new JsPDF();
    doc.page = 1; // use this as a counter.

    function footer() {
      doc.text(150, 285, `page, ${doc.page}`); // print number bottom right
      doc.page += 1;
    }
    
    const base64Img =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEXMzMyWlpaqqqq3t7exsbGcnJy+vr6jo6PFxcUFpPI/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMCOCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII=';

   
    doc.text(councilName, 60, 20);
    doc.addImage(base64Img, 'JPEG', 75, 30, 50, 50);
    doc.text('(2022-2023)', 85, 87);
    doc.addImage(base64Img, 'JPEG', 75, 90, 50, 50);
    doc.text('MAZI VASUNDHARA AHIYAN', 60, 160);
    doc.text('(2022-2023)', 85, 170);
    doc.addPage();
    doc.addImage(base64Img, 'JPEG', 10, 0, 40, 20);
    doc.text(councilName, 65, 30);
    doc.addImage(base64Img, 'JPEG', 55, 40, 100, 100);
    doc.addImage(base64Img, 'JPEG', 55, 150, 100, 100);
    doc.text('TREE CENSUS REPORT (2022-2023)', 55, 270);
    // // text paragraph start
    // const lMargin = 30;
    // const rMargin = 30;
    // const pdfInMM = 210;
    // const paragraph =
    //   ' Pellentesque sit amet dolor vel felis tempus feugiat eu id arcu. Nam efficitur, arcu sit amet aliquam condimentum, nisi enim pharetra metus, sed convallis dui sem ac sapien. Aenean sed aliquam quam. Proin tristique nisi ac rutrum commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce elementum ex quis ipsum ultrices, nec commodo sem vulputate.In scelerisque volutpat purus. Duis a orci sit amet nulla porta feugiat eu ac nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quis quam erat. Proin sed eleifend nulla, id lacinia risus. Suspendisse eleifend luctus lectus vitae aliquam. In consectetur enim quam, vel congue nulla ornare sit amet. Fusce nec iaculis sem. Donec semper mi dui, vitae bibendum massa volutpat sed.';
    //  
    //   const lines = doc.splitTextToSize(paragraph, pdfInMM - lMargin - rMargin);
    // doc.text(lMargin, 20, lines);
    // // text paragraph end

    // doc.({`${council?.name}`})
    // doc.text1("Council Name : ", 20, 10);
    const margin_ = { top: 0, bottom: 0 };
    const headStyles_ = { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 15 };
    doc.addPage();
    doc.addImage(base64Img, 'JPEG', 10, 0, 40, 17);
    autoTable(doc, {
      margin: { top: 20, bottom: 10 },
      headStyles: headStyles_,
      head: [['TABLE CONTENT']],
    });
    autoTable(doc, {
      margin: { top: 0, bottom: 10 },
      head: titleHeader,
      body: titleBody,
    });

    doc.addPage();
    // doc.text("By Wards", 20, 10);

    console.log(arr);
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < arr.length; i += 1) {
      const res = await Html2canvas(canvas[i])
      // .then((res) => {
        //  imgData = await canvas_.toDataURL('image/png');
        doc.addImage(base64Img, 'JPEG', 10, 0, 40, 17);
        console.log('asda', i, res);
        autoTable(doc, {
          margin: { top: i === 0 ? 20 : 170, bottom: 10 },
          headStyles: headStyles_,
          head: [header[i]],
        });

        autoTable(doc, {
          margin: { top: 0, bottom: 10 },
          head: [headerBody[i]],
          body: body_[i],
        });
        doc.addPage();
        doc.addImage(res.toDataURL('image/png'), 'JPEG', 10, 10, 180, 150);
        
        console.log('image', i, doc.addImage(res.toDataURL('image/png'), 'JPEG', 10, 10, 180, 150));
        // doc.output('dataurlnewwindow');
        // footer();
      
      // });
    }
    doc.save(`${councilName}.pdf`);
    /* eslint-enable no-await-in-loop */
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <>
      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        <Grid item xs={4} justifyContent="flex-end">
          <TextField
            select
            id="council"
            name="council"
            label="Select Council*"
            value={coucilId}
            displayEmpty
            style={{ width: '180px' }}
            // onChange={handleRoleChange}
            onChange={(e) => {
              handleCouncilChange(e);
              formik.handleChange(e);
            }}
            placeholder="Select council*"
            // defaultValue={data? data.council: ""}
            renderValue={(selected) => {
              if (selected?.length === 0) {
                return <em>Select Council*</em>;
              }
            }}
            error={Boolean(touched.council && errors.council)}
            helperText={touched.council && errors.council}
            // {...getFieldProps("council")}
          >
            <MenuItem disabled value="">
              <em>Select Councils</em>
            </MenuItem>
            {council?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="date"
            // label="Date Of Birth"
            type="date"
            label="From Date*"
            placeholder="From Date*"
            // defaultValue="2017-05-24"
            style={{ width: '90.5%', marginLeft: 20 }}
            // className={classes.textField}
            error={Boolean(touched.fromDate && errors.fromDate)}
            helperText={touched.fromDate && errors.fromDate}
            {...getFieldProps('fromDate')}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ max: todayDate }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="date"
            // value={toDate}
            type="date"
            label="To Date*"
            placeholder="To Date*"
            // defaultValue="2017-05-24"
            style={{ width: '90.5%', marginLeft: 30 }}
            // className={classes.textField}
            error={Boolean(touched.toDate && errors.toDate)}
            helperText={touched.toDate && errors.toDate}
            {...getFieldProps('toDate')}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ max: todayDate }}
          />
        </Grid>
        <Grid item sm={4}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ marginLeft: 30, marginTop: 5, backgroundColor: '#008000', height: 50, width: 150 }}
          >
            View Report
          </Button>
        </Grid>

        <Grid item sm={4}>
          {!coucilId ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ marginLeft: 30, marginTop: 5, height: 50, width: 150 }}
            >
              Export Report
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={exportPdf}
              style={{ marginLeft: 30, marginTop: 5, height: 50, width: 150 }}
            >
              Export Report
            </Button>
          )}
        </Grid>

        <Grid container justifyContent="flex-end">
          {/* {(callType === "BaseColor")?(
         <h5 style={{marginTop: 10}}>Please select council to get  base color data</h5> 
         ):null} */}
          {/* <Grid item sm={4}>
            <Button variant="contained" onClick={handleSubmit} style={{marginLeft: 30, marginTop: 5, backgroundColor: "#008000", height: 50, width: 100}}  >Get Data</Button>
            </Grid> */}
        </Grid>
        <Grid container>
          {/* <div ref={inputRef}>

        <Barchart  id="barChart123" />
        </div> */}
        </Grid>
      </RootStyle>
    </>
  );
}
