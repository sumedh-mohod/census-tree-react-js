import { createTheme } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import ThemeProvider from './theme'
import routes from './routes';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

const App = () => {
  const theme = createTheme({
    typography: [
      'Poppins',
      'sans-serif'
    ].join('')
  })
  const { isLogged } = useSelector((state) => ({
    isLogged: state.auth.isLogged,
  }));
  const routing = useRoutes(routes(isLogged));
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {routing}
    </ThemeProvider>
  );
}
export default App;