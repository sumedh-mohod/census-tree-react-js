// theme
import { createTheme } from "@material-ui/core";
import ThemeProvider from './theme'
// routes
import Router from './routes';

// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  const theme = createTheme({
    typography: [
      'Poppins',
      'sans-serif'
    ].join('')
  })
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
