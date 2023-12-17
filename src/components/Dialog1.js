import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const series = ["1","2","3","4","5","6","7","8","M2","M3","M4","M5","M6","M7","M8","X1","X2","X3","X4","X5","X6","X7","X3M","X4M","X5M","X6M","Z4","i4","iX3","iX","i7","iX1","i3BEV"]
const packages = ["BMW Service Inclusive","BMW Service Inclusive Plus"]
const yearkm = ["3/100.000","3/40.000","3/60.000","4/120.000","4/60.000","4/100.000","4/80.000","5/60.000","5/100.000","5/80.000"]

function Dialog1({ open, handleClose,setData,data,submit1Handler, message }) {

 

  const handleSerie = (event) => {
    setData(prev=>({...prev,serie:event.target.value}));
  };
  const handlePackage = (event) => {
    setData(prev=>({...prev,package:event.target.value}));
  };
  const handleYearKM = (event) => {
    setData(prev=>({...prev,yearkm:event.target.value}));
  };

 

  return (
    <Dialog open={open} maxWidth="md" onClose={handleClose}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        paddingX={1}
        borderBottom={1}
      >
        <Grid item>
          <DialogTitle fontSize={32}>PAKET FİYATLARI TALEP FORMU</DialogTitle>
        </Grid>
        <Grid item>
          <Button sx={{ color: "black" }} onClick={handleClose}>
            <IoMdClose size={36} />
          </Button>
        </Grid>
      </Grid>
      <DialogContent>
      <DialogContentText marginY={2} color="#374259">
          {message}
        </DialogContentText>
        <Divider />
        <DialogContentText margin={1} color="#374259">
          BMW'niz için ihtiyacınız olan bakım paketini seçin ve online satın
          alın.
        </DialogContentText>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Box margin={1}>
              <Typography color="#374259">Seriler</Typography>
              <FormControl fullWidth variant="standard">
                <NativeSelect
                  id="demo-customized-select-native"
                  value={data.serie}
                  onChange={handleSerie}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  {series.map((serie)=><option value={serie}>{serie}</option>)}
                 
                </NativeSelect>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box margin={1}>
              <Typography color="#374259">Paketler</Typography>
              <FormControl fullWidth variant="standard">
                <NativeSelect
                  id="demo-customized-select-native"
                  value={data.package}
                  onChange={handlePackage}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  {packages.map((pckg)=><option value={pckg}>{pckg}</option>)}
                 
                </NativeSelect>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box margin={1}>
              <Typography color="#374259">Yıl/Kilometre</Typography>
              <FormControl fullWidth variant="standard">
                <NativeSelect
                  id="demo-customized-select-native"
                  value={data.yearkm}
                  onChange={handleYearKM}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  {yearkm.map((yearkm)=><option value={yearkm}>{yearkm}</option>)}
                 
                </NativeSelect>
              </FormControl>
            </Box>
          </Grid>
          
          
        </Grid>
      </DialogContent>
      <DialogActions>
        <ColorButton2 fullWidth onClick={handleClose} variant="text">
          Vazgeç
        </ColorButton2>
        <ColorButton fullWidth onClick={submit1Handler} variant="text">
          Gönder
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
}

export default Dialog1;
const ColorButton = styled(Button)(({ theme }) => ({
  marginY: 1,

  color: "white",
  backgroundColor: "#374259",
  "&:hover": {
    backgroundColor: "#374259",
    color: "white",
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
  marginY: 1,

  color: "white",
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "red",
    color: "white",
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",

    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
