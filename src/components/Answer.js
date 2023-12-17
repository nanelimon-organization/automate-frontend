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
import nanelimonlogo from '../nanelimonlogo.png'


function Question({ quest }) {
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
          {quest == "location" ? <>
          <Typography fontSize={16} color="white">Size en yakın servis tespit edilmiştir.</Typography>

          <Box marginY={1} width={350} height={250} component="img" src={map} />
          <Typography fontWeight="bold" fontSize={24} color="white">Borusan Oto Samandıra</Typography>
          <Typography fontSize={15} color="white">Akpınar mah. Bilim cad. No:2 Sancaktepe/İSTANBUL</Typography>
          <Typography fontSize={16} color="white">0850 755 06 06</Typography>

          </> : 
          <Typography
            style={{ overflowWrap: "break-word" }}
            color="white"
            textAlign="auto"
          >
            {quest}
          </Typography>
          }
        </Grid>
      </motion.div>
    </>
  );
}

export default Question;
