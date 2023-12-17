import { ArrowUpward, Delete, PhotoCamera } from "@mui/icons-material";
import PlaceIcon from '@mui/icons-material/Place';
import DoneIcon from '@mui/icons-material/Done';
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

function Input({
  hasError,
  text,
  askQuestion,
  textFieldHandler,
  isAsked,
  handleOpen,
  clearChat,
  openFilePicker,
  filesContent,
  getLocation
}) {
  return (
    <>
      <Grid item container sx={{ position: "fixed", bottom: 0 }}>
        <Grid
          item
          container
          sx={{
            backgroundColor: "white",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Container
            sx={{ display: "flex", alignItems: "center", paddingBottom: 2 }}
          >
            <Tooltip title="En yakın servisi görmek için tıkla!">
            <IconButton
                disabled={isAsked ? true : false}
                sx={{
                  width: 48,
                  height: 48,
                  color: `${hasError ? "red" : "black"}`,
                }}
                aria-label="arrow-upward"
                onClick={getLocation}
              >
                <PlaceIcon />
              </IconButton>
              </Tooltip>
              <Tooltip title="Sohbeti temizle">
            <IconButton
              disabled={isAsked ? true : false}
              sx={{
                marginRight: 3,
                width: 48,
                height: 48,
                color: `${hasError ? "red" : "black"}`,
              }}
              aria-label="arrow-upward"
              onClick={clearChat}
            >
              <Delete />
            </IconButton>
            </Tooltip>
            <TextField
              variant="outlined"
              sx={{
                width: "95%",
                backgroundColor: "white",
                borderColor: "374259",
                borderWidth: 2,
              }}
              value={text}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askQuestion(e.target.value);
                }
              }}
              onChange={textFieldHandler}
              inputProps={{ minlength: 1, maxLength: 200 }}
              multiline
              maxRows={2}
              error={hasError}
              label="Merak ettiğini sor..."
              id="fullWidth"
            />
            <Tooltip title='Gönder'>
            <IconButton
              disabled={isAsked ? true : false}
              sx={{
                marginLeft: 3,
                width: 48,
                height: 48,
                color: `${hasError ? "red" : "black"}`,
              }}
              aria-label="arrow-upward"
              onClick={(e) => {
                askQuestion(text);
              }}
            >
              <ArrowUpward />
            </IconButton>
            </Tooltip>
            <Tooltip title='Fotoğraf ile sor'>
            <Badge color="success" badgeContent={filesContent.length == 0 ? null : <DoneIcon />}>
              <IconButton
                disabled={isAsked ? true : false}
                sx={{
                  marginLeft: 3,
                  width: 48,
                  height: 48,
                  color: `${hasError ? "red" : "black"}`,
                }}
                aria-label="arrow-upward"
                onClick={openFilePicker}
              >
                <PhotoCamera />
              </IconButton>
            </Badge>
            </Tooltip>
            <Grid item display="flex">
              {filesContent.map((file, index) => (
                <Box marginLeft={5} key={index}>
                  <Box
                    width={75}
                    height={75}
                    component="img"
                    alt={file.name}
                    src={file.content}
                  ></Box>
                  <br />
                </Box>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default Input;
