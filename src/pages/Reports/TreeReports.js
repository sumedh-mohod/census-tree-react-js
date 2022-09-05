import React from 'react';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Pagination,
  Link,
  IconButton,
  Grid
} from '@mui/material';
import Page from '../../components/Page';
import { Piechart } from './Chart/Piechart';
import Barchart from './Chart/Barchart';

function TreeReports() {
  return (
    <>
      <Page title="User">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb" style={{ color: '#000000' }} separator=">">
                <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                  Tree Data
                </Typography>
                <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                  Reports
                </Typography>
              </Breadcrumbs>
            </div>
          </Stack>
          <Card>
            <Barchart />
            <br />
            <Grid container spacing={0} >
            <Grid item xs={3} >
              {/* <Piechart /> */}
              </Grid>
              <Grid item xs={6} >
              <Piechart />
              </Grid>
              <Grid item xs={3} >
              {/* <Piechart /> */}
              </Grid>
            </Grid>
          
          </Card>
        </Container>
      </Page>
    </>
  );
}

export default TreeReports;
