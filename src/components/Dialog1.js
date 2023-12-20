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
  FormControlLabel,
  Grid,
  InputBase,
  NativeSelect,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const series = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "M2",
  "M3",
  "M4",
  "M5",
  "M6",
  "M7",
  "M8",
  "X1",
  "X2",
  "X3",
  "X4",
  "X5",
  "X6",
  "X7",
  "X3M",
  "X4M",
  "X5M",
  "X6M",
  "Z4",
  "i4",
  "iX3",
  "iX",
  "i7",
  "iX1",
  "i3BEV",
];
const packages = ["BMW Service Inclusive", "BMW Service Inclusive Plus"];
const yearkm = [
  "3/100.000",
  "3/40.000",
  "3/60.000",
  "4/120.000",
  "4/60.000",
  "4/100.000",
  "4/80.000",
  "5/60.000",
  "5/100.000",
  "5/80.000",
];

const provinces = ["İstanbul"];
const districts = ["Ümraniye"];
const mahalle = ["Site"];


function Dialog1({
  open,
  handleClose,
  setData,
  data,
  submit1Handler,
  message,
}) {

  const [step, setStep] = useState(0);

  function nextStep() {
    if(step<3){
      setStep(step + 1);
    }else{
      submit1Handler();
      setStep(0)
    }
  }
  function previousStep() {
    if(step>0){
      setStep(step - 1);
    }else{
      handleClose();
      setStep(0)
    }
    console.log(step);
  }
  const handleSasi = (event) => {
    setData((prev) => ({ ...prev, sasi: event.target.value }));
  };
  const handlePlaka = (event) => {
    setData((prev) => ({ ...prev, plaka: event.target.value }));
  };
  const handleSeri = (event) => {
    setData((prev) => ({ ...prev, seri: event.target.value }));
  };
  const handleModel = (event) => {
    setData((prev) => ({ ...prev, model: event.target.value }));
  };

  const handleSerie = (event) => {
    setData((prev) => ({ ...prev, serie: event.target.value }));
  };
  const handlePackage = (event) => {
    setData((prev) => ({ ...prev, package: event.target.value }));
  };
  const handleYearKM = (event) => {
    setData((prev) => ({ ...prev, yearkm: event.target.value }));
  };
  const handleName = (event) => {
    setData((prev) => ({ ...prev, name: event.target.value }));
  };
  const handleSurname = (event) => {
    setData((prev) => ({ ...prev, surname: event.target.value }));
  };
  const handlePhone = (event) => {
    setData((prev) => ({ ...prev, phone: event.target.value }));
  };
  const handleEmail = (event) => {
    setData((prev) => ({ ...prev, email: event.target.value }));
  };
  const handleAdres = (event) => {
    setData((prev) => ({ ...prev, adres: event.target.value }));
  };

  let content = (
    <>
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
                  {series.map((serie) => (
                    <option value={serie}>{serie}</option>
                  ))}
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
                  {packages.map((pckg) => (
                    <option value={pckg}>{pckg}</option>
                  ))}
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
                  {yearkm.map((yearkm) => (
                    <option value={yearkm}>{yearkm}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </>
  );

  if (step == 1) {
    content = (
      <>
        <DialogContent>
          <DialogContentText marginY={2} color="#374259">
            BMW'nizin şasi numarasını girin ve bilgilerinizi kontrol edin.
          </DialogContentText>
          <Divider />
          <DialogContentText margin={1} color="#374259"></DialogContentText>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Şasi Numarası</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.sasi}
                    onChange={handleSasi}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Plaka</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.plaka}
                    onChange={handlePlaka}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Seri</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.seri}
                    onChange={handleSeri}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Model</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.model}
                    onChange={handleModel}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </>
    );
  }

  if (step == 2) {
    content = (
      <>
        <DialogContent>
          <DialogContentText marginY={2} color="#374259">
            Sözleşme ve fatura için bilgilerinizi giriş yapın.
          </DialogContentText>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Bireysel"
            />
            <FormControlLabel value="no" control={<Radio />} label="Kurumsal" />
          </RadioGroup>
          <Divider sx={{ marginY: 2 }} />
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Adınız</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.name}
                    onChange={handleName}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Soyadınız</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.surname}
                    onChange={handleSurname}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Telefon</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.phone}
                    onChange={handlePhone}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">E-Posta</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.email}
                    onChange={handleEmail}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />

          <Typography>
            Kişisel Verilerinizi rıza metninde belirtilen kapsamda işlememizi
            onaylıyor musunuz?
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Evet, onaylıyorum"
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="Hayır, onaylamıyorum"
            />
          </RadioGroup>
        </DialogContent>
      </>
    );
  }

  if (step == 3) {
    content = (
      <>
        <DialogContent>
          <DialogContentText marginY={2} color="#374259">
            Adres bilgilerinizi giriş yapınız
          </DialogContentText>

          
          <Divider sx={{ marginY: 2 }} />
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">İl</Typography>
                <FormControl fullWidth variant="standard">
                <NativeSelect
                  id="demo-customized-select-native"
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  {provinces.map((province) => (
                    <option value={province}>{province}</option>
                  ))}
                </NativeSelect>
              </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">İlçe</Typography>
                <FormControl fullWidth variant="standard">
                <NativeSelect
                  id="demo-customized-select-native"
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  {districts.map((district) => (
                    <option value={district}>{district}</option>
                  ))}
                </NativeSelect>
              </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Mahalle</Typography>
                <FormControl fullWidth variant="standard">
                <NativeSelect
                  id="demo-customized-select-native"
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  {mahalle.map((mhl) => (
                    <option value={mhl}>{mhl}</option>
                  ))}
                </NativeSelect>
              </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box margin={1}>
                <Typography color="#374259">Adres</Typography>
                <FormControl fullWidth variant="standard">
                  <BootstrapInput
                    value={data.adres}
                    onChange={handleAdres}
                    required
                    id="bootstrap-input"
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          
        </DialogContent>
      </>
    );
  }
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
      {content}
      <DialogActions>
        <ColorButton2 fullWidth onClick={previousStep} variant="text">
          Vazgeç
        </ColorButton2>
        <ColorButton fullWidth onClick={nextStep} variant="text">
          {step != 3 ? "Devam" : "Gönder"}
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
