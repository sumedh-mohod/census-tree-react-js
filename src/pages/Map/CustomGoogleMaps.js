import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { getIcon } from "@iconify/react";
import { CircularProgress, IconButton, List, ListItem,  Container,
  Modal, ListItemText, Table, TableBody, TableCell,tableCellClasses,TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Visibility } from "@mui/icons-material";
import TreeFill from '../../Assets/tree_on_map.png';
import { GetSpecificTreeInfo } from "../../actions/TreeOnMapAction";
import { ShowLoader } from "../../actions/CommonAction";
import ViewImageDialog from "../../components/DialogBox/tree-data/ViewImageDialog";
import ImageCarousel from "../../components/ImageCarousel";

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    height:"7 Meter",
    age: "20 Year",
    image:"https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?cs=srgb&dl=pexels-felix-mittermeier-1459495.jpg&fm=jpg",
    position: { lat: 41.881832, lng: -87.623177 }
  },
  {
    id: 2,
    name: "Denver, Colorado",
    height:"7 Meter",
    age: "20 Year",
    image:"https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?cs=srgb&dl=pexels-felix-mittermeier-1459495.jpg&fm=jpg",
    position: { lat: 39.739235, lng: -104.99025 }
  },
  {
    id: 3,
    name: "Los Angeles, California",
    height:"7 Meter",
    age: "20 Year",
    image:"https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?cs=srgb&dl=pexels-felix-mittermeier-1459495.jpg&fm=jpg",
    position: { lat: 34.052235, lng: -118.243683 }
  },
  {
    id: 4,
    name: "New York, New York",
    height:"7 Meter",
    age: "20 Year",
    image:"https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?cs=srgb&dl=pexels-felix-mittermeier-1459495.jpg&fm=jpg",
    position: { lat: 40.712776, lng: -74.005974 }
  }
];

const center = {
  lat: 21.7679,
  lng: 78.8718
};

function Map(props) {
  const dispatch = useDispatch();
  const [activeMarker, setActiveMarker] = useState(null);
  const [viewOpen, setViewOpen ] = useState(false);
  const [imageList,setImageList] = useState([]);
  const [openImageList, setOpenImageList] = useState(false);
  const handleOpenImageList = (e) => setOpenImageList(true);
  const handleCloseImageList = () => setOpenImageList(false);
  const {
    treeDetails,
    showLoader
  } = useSelector((state) => ({
    treeDetails:state.treeLocation.treeDetails,
    showLoader:state.common.showLoader
  }));

  const secondRun = React.useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    dispatch(ShowLoader(false));
  },[treeDetails])

  useEffect(()=>{
    setActiveMarker(null);
  },[props.treeLocation])

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    
    dispatch(GetSpecificTreeInfo(marker))
    dispatch(ShowLoader(true));
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds();
    // markers.forEach(({ position }) => bounds.extend(position));
    bounds.extend(center);
    map.fitBounds(bounds);
  };

  const icon = {
    url: TreeFill,
    scaledSize: new window.google.maps.Size(50, 42)
  };

  // console.log("PROPS TREE LOCATION",props.treeLocation);

  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen)
    const imageList = [];
    if(images){
      images.map((value,index)=>{
        imageList.push(value.image_url)
        return null;
      })
    }
    setImageList(imageList);
  }

  return (
    <GoogleMap
      // onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "500px" }}
      zoom={5}
      center={center}
    >
      {viewOpen?
        <ViewImageDialog
        isOpen={viewOpen}
        handleClose = {handleViewOpen}
        data={imageList}
        />:null
        }
      {props.treeLocation?.map((value,index) => (
        <Marker
          key={value.id}
          position={{lat: Number(value.lat), lng: Number(value.long)}}
          onClick={() => handleActiveMarker(value.id)}
          icon={icon}
        >
          {activeMarker === value.id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              {showLoader ?
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',minHeight:'100px',minWidth:'100px' }}>
              <CircularProgress style={{color: '#214c50'}} />
              </div>
              :
              <div>
              {/* <img src={treeDetails?.images?treeDetails.images[0].image_url:""} alt="tree" style={{height:'100px',width:'100px'}} /> */}
              <Table style={{border:'none'}} sx={{
    [`& .${tableCellClasses.root}`]: {
      borderBottom: "none"
    }
  }}>
                <TableBody style={{border:'none'}}>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingBottom:'0px'}}>Tree Number</TableCell>
                    <TableCell align="left" style={{paddingBottom:'0px'}}>{treeDetails.tree_number}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px',whiteSpace:'nowrap'}}>Tree Name</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails.tree_name?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px',whiteSpace:'nowrap'}}>Botanical Name</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails.tree_name?.botanical_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Tree Type</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails.tree_type?.tree_type}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Location Type</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails?.location_type?.location_type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Property Type</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails.property_type?.property_type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Property Number</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails.property?.property_number}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Owner Name</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails.property?.owner_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Tenant Name</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails.property?.tenant_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingBottom:'0px'}}>Area(Sq feet)</TableCell>
                    <TableCell align="left" style={{paddingBottom:'0px'}}>{treeDetails.property?.area ?  treeDetails.property?.area: "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Plantation Date</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails.plantation_date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Location Type</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails?.location_type?.location_type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Tree Condition</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails?.tree_condition?.condition}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Girth(cm)</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails?.girth}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Height(m)</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails?.height}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'5px',paddingBottom:'0px'}}>Canopy</TableCell>
                    <TableCell align="left" style={{paddingTop:'5px',paddingBottom:'0px'}}>{treeDetails?.canopy}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'0px'}}>Images</TableCell>
                    <TableCell align="left" style={{paddingTop:'0px'}}>
                    <IconButton aria-label="delete" size="large" 
                    // onClick={()=>handleViewOpen(treeDetails.images)}
                    onClick={(e) => {
                      setImageList(treeDetails.images || []);
                      handleOpenImageList(e);
                    }}
                     style={{color: '#214c50'}}>
                            <Visibility />
                          </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              </div>
            }
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
       <Modal
              open={openImageList}
              onClose={handleCloseImageList}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Container style={{ width: '526px' }}>
                <ImageCarousel imagelist={imageList} />
              </Container>
              {/* <Box sx={style}>
                                <img src={val.original} alt="gallery" height="650px" width="100%" />
                              </Box> */}
            </Modal>
    </GoogleMap>
  );
}

export default Map;
