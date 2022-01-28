import React, { useEffect, useState,useRef } from "react";
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import "../../assets/css/style.css";
import fetchFakeData from "../../assets/mock/fetchFakeData";
// import Popup from "./Popup";
import ReactDOM from "react-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    Link,
  } from "@mui/material";
  import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const mapboxToken = 'token'
function Map(props) {
    const navigate = useNavigate();  
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
    const [view, setView] = useState({
      width: '100%',
      height: '100%',
      latitude: 40.78343,
      longitude: -73.96625,
      zoom: 11
    })
    const [currMarker, setCurrMarker] = useState(null)
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [markers, setMarkers] = useState([])
    // useEffect(() => {
    //     const map = new mapboxgl.Map({
    //       container: mapContainerRef.current,
    //       // See style options here: https://docs.mapbox.com/api/maps/#styles
    //       style: "mapbox://styles/mapbox/streets-v11",
    //       center: [-104.9876, 39.7405],
    //       zoom: 11
    //     });
    
    //     // add navigation control (zoom buttons)
    //     map.addControl(new mapboxgl.NavigationControl(), "top-right");
    
    //     map.on("load", () => {
    //       // add the data source for new a feature collection with no features
    //       map.addSource("random-points-data", {
    //         type: "geojson",
    //         data: {
    //           type: "FeatureCollection",
    //           features: []
    //         }
    //       });
    //       // now add the layer, and reference the data source above by name
    //       map.addLayer({
    //         id: "random-points-layer",
    //         source: "random-points-data",
    //         type: "symbol",
    //         layout: {
    //           // full list of icons here: https://labs.mapbox.com/maki-icons
    //           "icon-image": "bakery-15", // this will put little croissants on our map
    //           "icon-padding": 0,
    //           "icon-allow-overlap": true
    //         }
    //       });
    //     });
    
    //     map.on("moveend", async () => {
    //       // get new center coordinates
    //       const { lng, lat } = map.getCenter();
    //       // fetch new data
    //       const results = await fetchFakeData({ longitude: lng, latitude: lat });
    //       // update "random-points-data" source with new data
    //       // all layers that consume the "random-points-data" data source will be updated automatically
    //       map.getSource("random-points-data").setData(results);
    //     });
    
    //     // change cursor to pointer when user hovers over a clickable feature
    //     map.on("mouseenter", "random-points-layer", e => {
    //       if (e.features.length) {
    //         map.getCanvas().style.cursor = "pointer";
    //       }
    //     });
    
    //     // reset cursor to default when user is no longer hovering over a clickable feature
    //     map.on("mouseleave", "random-points-layer", () => {
    //       map.getCanvas().style.cursor = "";
    //     });
    
    //     // add popup when user clicks a point
    //     map.on("click", "random-points-layer", e => {
    //       if (e.features.length) {
    //         const feature = e.features[0];
    //         // create popup node
    //         const popupNode = document.createElement("div");
    //         ReactDOM.render(<Popup feature={feature} />, popupNode);
    //         // set popup on map
    //         popUpRef.current
    //           .setLngLat(feature.geometry.coordinates)
    //           .setDOMContent(popupNode)
    //           .addTo(map);
    //       }
    //     });
    
    //     // clean up on unmount
    //     return () => map.remove();
    //   }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    const   handleViewportChange=(viewport)=> {
      setView(prevState => ({...prevState.viewport, ...viewport}))
    }
    const handleGeocoderViewportChange=(viewport)=> {
      const geocoderDefaultOverrides = {transitionDuration: 1000}
      return handleViewportChange({
        ...viewport,
        ...geocoderDefaultOverrides
      })
    }
    const handleResult =(result)=> {
      setCurrMarker({
          name: result.result.place_name,
          latitude: result.result.center[1],
          longitude: result.result.center[0]
      })
    }

    const addMarker=()=> {
      setMarkers([...markers,currMarker])
      setCurrMarker(null)
    }

    const handleMarkerClick=(marker)=> {
      setSelectedMarker(marker)
    }
    const handleClose = () => {
      setSelectedMarker(null)
    }

    return (
    <>
    <Card {...props}>
      <CardHeader
        title="Overview map"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 500,
            position: "relative",
          }}
        >
          
        <ReactMapGl
        ref={mapRef}
        {...view}
        onViewportChange={viewport => setView(viewport)}
        mapboxApiAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        >
          <button className="add-btn" onClick={addMarker}>Add</button>
          {markers.map((marker, idx) => {
          return (
            <Marker
              key={idx}
              latitude={marker.latitude}
              longitude={marker.longitude}
              onClick={() => handleMarkerClick(marker)}
            >
              <img src="pin.png" alt="marker" height={40} width={40}/>
            </Marker>
          )
        })
        }
        <Geocoder
          onSelected={handleResult}
          mapRef={mapRef}
          placeholder="Search here!"
          onViewportChange={handleGeocoderViewportChange}
          onResult={handleResult}
          mapboxApiAccessToken={mapboxToken}
          countries="us"
          position="top-right"
        />
        {selectedMarker &&
          <Popup
          mapRef={mapRef}
          latitude={selectedMarker.latitude}
          longitude={selectedMarker.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={handleClose}
        >
            <h3>{selectedMarker.name}</h3>
        </Popup>
      }
        </ReactMapGl>
            {/* <div className="map-container" ref={mapContainerRef} /> */}
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          <Link
            component={RouterLink}
            to="/machine-list"
            underline="none"
          >
            Overview
          </Link>  
        </Button>
      </Box>
    </Card>
        
    </>);
}

Map.propTypes = {};

export default Map;
