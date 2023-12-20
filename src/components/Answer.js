import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { blueGrey } from "@mui/material/colors";
import map from "../map.png";
import nanelimonlogo from "../nanelimonlogo.png";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

function Question({ quest }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = useState(null);

  const center = {
    lat: quest.key == "location" ? quest.value.lat : null,
    lng: quest.key == "location" ? quest.value.lng : null,
  };

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(
      quest.key == "location"
        ? { lat: quest.value.lat, lng: quest.value.lng }
        : null
    );
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 900, damping: 70 },
  };

  const today = new Date();

  const ColorButton = styled(Button)(({ theme }) => ({
    marginY: 1,
    width: "100%",
    color: "#374259",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#374259",
      color: "white",
    },
  }));

  return (
    <>
      <motion.div
        {...animations}
        layout
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box margin={2}>
          <Box
            sx={{
              fontWeight: "regular",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            {`${today.getHours()}.${today.getMinutes()}`}
          </Box>
          <Box
            sx={{
              fontWeight: "regular",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            {`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`}
          </Box>
        </Box>
        <Avatar src={nanelimonlogo}></Avatar>
        <Grid
          item
          bgcolor="#374259"
          padding={2}
          margin={2}
          zeroMinWidth
          sx={{ maxWidth: { xs: 175, md: 400 } }}
          borderRadius={6}
        >
          {quest.key == "location" ? (
            typeof quest.value != "string" ? (
              <>
                <Typography fontSize={16} color="white">
                  Size en yakın servis tespit edilmiştir.
                </Typography>

                {isLoaded ? <Box width={350} height={250}><GoogleMap
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    mapContainerStyle={{width: "100%",height: "100%"}}
                    onUnmount={onUnmount}
                  /></Box> : <></>}
                  
                {/* <Box
                  marginY={1}
                  width={350}
                  height={250}
                  component="img"
                  src={map}
                /> */}
                <Typography fontWeight="bold" fontSize={24} color="white">
                  {quest.value.name}
                </Typography>
                <Typography fontSize={15} color="white">
                  {quest.value.address}
                </Typography>
                <Typography fontSize={16} color="white">
                  {quest.value.phone}
                </Typography>
              </>
            ) : (
              <>
               
                 
              
                <Typography fontSize={16} color="white">
                  {quest.value}
                </Typography>
              </>
            )
          ) : (
            <Typography
              style={{ overflowWrap: "break-word" }}
              color="white"
              textAlign="auto"
            >
              {quest}
            </Typography>
          )}
        </Grid>
      </motion.div>
    </>
  );
}

export default Question;
