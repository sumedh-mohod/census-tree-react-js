import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { getIcon } from "@iconify/react";

import { CircularProgress, List, ListItem, ListItemText, Table, TableBody, TableCell,TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TreeFill from '../../Assets/tree-fill.svg';
import { GetSpecificTreeInfo } from "../../actions/TreeOnMapAction";
import { ShowLoader } from "../../actions/CommonAction";

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
    scaledSize: new window.google.maps.Size(90, 42)
  };

  console.log("PROPS TREE LOCATION",props.treeLocation);


  return (
    <GoogleMap
      // onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "500px" }}
      zoom={5}
      center={center}
    >
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
              <CircularProgress color="success" />
              </div>
              :
              <div>
              <img src={treeDetails?.images?treeDetails.images[1].image_url:""} alt="tree" style={{height:'100px',width:'100px'}} />
              <Table style={{border:'none'}}>
                <TableBody style={{border:'none'}}>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingBottom:'0px'}}>Tree Name</TableCell>
                    <TableCell align="left" style={{paddingBottom:'0px'}}>{treeDetails.tree_name?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'0px',paddingBottom:'0px'}}>Tree Type</TableCell>
                    <TableCell align="left" style={{paddingTop:'0px',paddingBottom:'0px'}}>{treeDetails.tree_type?.tree_type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px',paddingTop:'0px'}}>Address</TableCell>
                    <TableCell align="left" style={{paddingTop:'0px'}}>{treeDetails.location}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              </div>
            }
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
