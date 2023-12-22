import { Box, Grid, Skeleton } from "@mui/material";

function Loading({ isAsked }) {
  return (
    <>
      {isAsked && (
        <Grid container flexDirection="column" sx={styles.gridContainer}>
          <Box sx={styles.box}>
            <Box sx={styles.innerBox}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
}

export default Loading;

const styles = {
  gridContainer: {
    paddingX: { xs: 1, md: 45 },
    marginBottom: 15,
  },
  box: {
    minWidth: 200,
    maxWidth: 600,
    height: 50,
    padding: 1,
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  innerBox: {
    width: 300,
  },
};
