import styled from "@emotion/styled";
import {
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
import { IoMdClose } from "react-icons/io";

const series = ["Ankara", "İstanbul", "Diğer"];

function Dialog2({ open, handleClose,submitHandler,message,data,setData }) {
 

  const handleName = (event) => {
    setData(prev=>({...prev,name:event.target.value}));
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
          <DialogTitle fontSize={32}>DESTEK TALEP FORMU</DialogTitle>
        </Grid>
        <Grid item>
          <Button sx={{ color: "black",margin: 2 }} onClick={handleClose}>
            <IoMdClose size={36} />
          </Button>
        </Grid>
        
      </Grid>
      <DialogContent>
      <DialogContentText marginY={2} color="#374259">
          {message}
        </DialogContentText>
        <Divider />
        <DialogContentText marginY={2} color="#374259">
          BMW'niz için ihtiyacınız olan bakım paketini seçin ve online satın
          alın.
        </DialogContentText>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <Typography color="#374259">AD*</Typography>

              <BootstrapInput value={data.name} onChange={handleName} required id="bootstrap-input" />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <Typography color="#374259">SOYAD*</Typography>

              <BootstrapInput required id="bootstrap-input" />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <Typography color="#374259">E-Posta*</Typography>

              <BootstrapInput required id="bootstrap-input" />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <Typography color="#374259">GSM*</Typography>

              <BootstrapInput  required id="bootstrap-input" />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <Typography color="#374259">
                Tercih Ettiğiniz Yetkili Servis*
              </Typography>

              <FormControl fullWidth variant="standard">
                <NativeSelect
                  id="demo-customized-select-native"
                  
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  {series.map((serie) => (
                    <option value={serie}>{serie}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </FormControl>
          </Grid>
        </Grid>
        <Typography marginTop={2} color="#374259">
          Kişisel verilerinizin işlenmesi hakkında aydınlatma metnine ve rıza
          metnine buradan inceleyebilirsiniz
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <FormControl>
          <Typography color="#374259">
            Kişisel verilerinizi yukarıdaki Rıza Metninde belirtilen kapsamda
            işlememizi onaylıyor musunuz?
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="yes" control={<Radio />} label="Evet" />
            <FormControlLabel value="no" control={<Radio />} label="Hayır" />
          </RadioGroup>
        </FormControl>
        <Divider sx={{ marginY: 2 }} />
        <FormControl>
          <Typography color="#374259">
            Borusan Otomotiv İthalat ve Dağıtım A.Ş'nin tanıtım ve
            kampanyalarından haberdar olmak için ileti almak ister misiniz?
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="yes" control={<Radio />} label="Evet" />
            <FormControlLabel value="no" control={<Radio />} label="Hayır" />
          </RadioGroup>
        </FormControl>
        <Divider sx={{marginY: 2}} />
        <Typography  color="#374259">
          (*) işareti olan alanlar zorunludur.
        </Typography>
      </DialogContent>
      <DialogActions>
        <ColorButton2 fullWidth onClick={handleClose} variant="text">
          Vazgeç
        </ColorButton2>
        <ColorButton fullWidth onClick={submitHandler} variant="text">
          Gönder
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
}

export default Dialog2;
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
