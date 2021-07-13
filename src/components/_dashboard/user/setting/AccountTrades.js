import React from "react";

// material
import {
  Grid,
  Card,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";

import AccountImportsTable from "./AccountImportsTable";

import { DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function Account() {

  const [confirmDialog, setConfirmDialog] = React.useState(false);

  const handleSelect = (ranges) => {
    alert("start date:" + ranges.selection.startDate + "end date:" + ranges.selection.endDate)
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AccountImportsTable />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography >Delete Orders</Typography>
          <br />
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }}>
              <DateRangePicker
                color="red"
                style={{ borderRadius: 5 }}
                ranges={[selectionRange]}
                onChange={handleSelect}
              />
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
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
