import React from "react";

// material
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";

import AccountImportsTable from "./AccountImportsTable";


export default function Account() {

  const [confirmDialog, setConfirmDialog] = React.useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <AccountImportsTable />
      </Grid>
      <Grid item xs={12} md={5}>
        <Card sx={{ p: 3 }}>
          <Typography >Delete Orders</Typography>
          <br />
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={9}>
              <TextField
                select
                fullWidth
                label="Date"
                placeholder="Date"
                SelectProps={{ native: true }}
              >
                <option value="" />
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">1 month</option>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={() => setConfirmDialog(true)}
                variant="contained"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Card>
        <br />
        <Card sx={{ p: 3 }}>
          <Typography color="text.secondary" >Last Trade Date and Time</Typography>
          <Typography >Sat Jul 10 2021 11:20:53 GMT-0700</Typography>
        </Card>
      </Grid>
      <Dialog
        open={confirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Warning
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="text.primary">
            Cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => setConfirmDialog(false)}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
