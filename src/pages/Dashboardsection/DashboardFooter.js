import React from 'react';
import { Grid, Container, Typography, Stack, Card } from '@mui/material';
import Quotes from '../../Assets/quotes.png';
import TreeBottom from '../../Assets/trees_bottom.png';

const DashboardFooter = () => {
  return (
    <>
     <Container>
          <Card style={{ padding: '20px', background: 'none', boxShadow: 'none' }}>
            <Grid container spacing={3} style={{ marginBottom: '70px' }}>
              <Grid item xs={12} sm={6} md={3} mt={2}>
                <span style={{ fontSize: '50px', fontWeight: 600, color: '#819881', lineHeight: '0.5' }}>
                  tree
                  {'\n'}census
                </span>
                <br />
                <Typography variant="h6" style={{ color: '#737373' }}>
                  <b>Version 1.0</b>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={9}>
                <img src={Quotes} alt="img" height="30px" width="30px" />
                <i>
                  It is not so much for its beauty that the forest makes a claim upon men’s hearts, as for that subtle
                  something,that quality of air that emanation from old trees,that so wonderfully changes and renews
                  aweary spirit.
                </i>
              </Grid>
            </Grid>
            <img
              src={TreeBottom}
              alt="img"
              height="70px"
              width="200px"
              style={{ position: 'absolute', bottom: '0', right: '0' }}
            />
          </Card>
        </Container>
    </>
  )
}

export default DashboardFooter