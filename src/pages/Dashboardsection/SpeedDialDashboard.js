// import React from 'react';
// import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
// import Divider from '@mui/material/Divider';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';

// const SpeedDialDashboard = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <div style={{ position: 'fixed', top: '40%', right: 4, zIndex: '9999999' }}>
//       <FlipCameraAndroidIcon
//         id="fade-button"
//         aria-controls={open ? 'fade-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//         style={{
//           color: '#fff',
//           background: '#000',
//           borderRadius: '30px',
//           padding: '15px',
//           fontSize: '60px',
//           marginBottom: '-5px',
//         }}
//       />

//       <Menu
//         id="fade-menu"
//         MenuListProps={{
//           'aria-labelledby': 'fade-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Fade}
//       >
//         <MenuItem onClick={handleClose}>Projects</MenuItem>
//         <Divider style={{ marginTop: 0, marginBottom: 0 }} />
//         <MenuItem onClick={handleClose}>Tree Details</MenuItem>
//         <Divider style={{ marginTop: 0, marginBottom: 0 }} />
//         <MenuItem onClick={handleClose}>Work Reports</MenuItem>
//         <Divider style={{ marginTop: 0, marginBottom: 0 }} />
//         <MenuItem onClick={handleClose}>Hi/Lo Base Color</MenuItem>
//         <Divider style={{ marginTop: 0, marginBottom: 0 }} />
//         <MenuItem onClick={handleClose}>Last Tree Numbers</MenuItem>
//         <Divider style={{ marginTop: 0, marginBottom: 0 }} />
//         <MenuItem onClick={handleClose}>0 Tree Sync Associates</MenuItem>
//         <Divider style={{ marginTop: 0, marginBottom: 0 }} />
//         <MenuItem onClick={handleClose}>Master Data</MenuItem>
//         <Divider style={{ marginTop: 0, marginBottom: 0 }} />
//         <MenuItem onClick={handleClose}>Yesterday LoggedIn Associates</MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default SpeedDialDashboard;
