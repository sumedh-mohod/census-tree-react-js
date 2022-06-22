import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { getIcon } from "@iconify/react";

import { Table, TableBody, TableCell,TableRow } from "@mui/material";
import TreeFill from '../../Assets/tree-fill.svg';

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

function Map(props) {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const icon = {
    url: TreeFill,
    scaledSize: new window.google.maps.Size(90, 42)
  };

  console.log("PROPS TREE LOCATION",props.treeLocation);


  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "500px" }}
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
              <div>
              <img src={value.image} alt="tree" style={{height:'100px',width:'100px'}} />
              <Table style={{border:'none'}}>
                <TableBody style={{border:'none'}}>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px'}}>Tree Number</TableCell>
                    <TableCell align="left">{value.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px'}}>Name</TableCell>
                    <TableCell align="left">{value.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px'}}>Tree Age</TableCell>
                    <TableCell align="left">{value.age}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell align="left" style={{paddingLeft:'0px'}}>Tree Height</TableCell>
                    <TableCell align="left">{height}</TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
