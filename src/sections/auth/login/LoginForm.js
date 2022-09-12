import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../../../actions/AuthActions';
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { isLogged } = useSelector((state) => ({
    isLogged: state.auth.isLogged,
  }));

  const LoginSchema = Yup.object().shape({
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    email: Yup.string().required('Username is required'),
    password: Yup.string()
      .matches(/^.{6,}$/, 'password should have at least 6 characters')
      .required('Password is required'),
  });

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    navigate('/dashboard/home', { replace: true });
  }, [isLogged]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (value) => {
      dispatch(
        LoginUser({
          username: value.email,
          password: value.password,
        })
      );
      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const useStyles = makeStyles({
    item: {
      fontWeight: 400,
      fontSize: 16,
      marginBottom: 20,
      
    },
    button: {
      width: 317
    }
  });
  const classes = useStyles();

  return (
    <>
    <img src="/static/illustrations/TopPlant.png" height='500' style={{ position: 'absolute',right:'0',top: '0',zIndex: '-1'}} width='500'  alt="login" />
      <Typography variant="h4">
        <strong>Login</strong>
      </Typography>
      <Typography variant="h4" className={classes.item}>
        Please provide credentials to proceed.
      </Typography>
      <FormikProvider value={formik} >
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
          <Stack spacing={3} sx={{ mr: 20}}>
            <TextField
              fullWidth
              autoComplete="username"
              // type="email"
              label="Username"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
                 </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            {/* <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link> */}
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            className={classes.button}
          >
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
