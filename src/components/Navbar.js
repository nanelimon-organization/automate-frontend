import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { COLORS } from "../constants/contants";
function Navbar() {
  return (
    <Grid item container style={styles.container}>
      <Grid item style={styles.item}>
        <List style={styles.list}>
          <ListItem style={styles.listItem}>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="h4" style={styles.text}>
                  AutoMate
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default Navbar;

const styles = {
  container: {
    position: "sticky",
    zIndex: 999,
    top: 0,
    marginBottom: { xs: 10, md: 8 },
  },
  item: {
    width: "100%",
  },
  list: {
    paddingTop: 0,
  },
  listItem: {
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.white,
    textAlign: "center",
  },
};
