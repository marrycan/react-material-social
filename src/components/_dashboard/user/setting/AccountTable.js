import React from "react";
import { Icon } from '@iconify/react';
import { useSnackbar } from "notistack";
// material
import editFill from '@iconify/icons-eva/edit-2-fill';
import ReceiptIcon from '@material-ui/icons/Receipt';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { LoadingButton } from "@material-ui/lab";

// hooks
import useAuth from "../../../../hooks/useAuth";

//redux
import { useSelector, useDispatch } from '../../../../redux/store';
import { getAccountsOfUser, getProfile } from "../../../../redux/slices/user"

import Scrollbar from '../../../Scrollbar';

import AccountEditDialog from "./AccountEditDialog";
import AccountAdjustmentDialog from "./AccountAdjustmentDialog";

import { fb_DeleteAccountOfUserByIndex } from "../../../../utils/firebaseRequest";


export default function AccountTable() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { accounts, myProfile } = useSelector((state) => state.user);
  const [state, setState] = React.useState({
    adjustmentOpen: false,
    accountId: '',
    open: false,
    editData: false,
    index: null,
    deleteLoading: false,
    deleteIndex: ''
  })

  const [open, setOpen] = React.useState(false);

  const openConfirmModal = (index) => {
    setState({ ...state, deleteIndex: index });
    setOpen(true);
  };

  const closeConfirmModal = () => {
    setOpen(false);
  };

  const onEdit = (index) => {
    setState({ ...state, index, open: true, editData: accounts[index] })
  }

  const onCancelEdit = () => {
    setState({ ...state, index: null, open: false, editData: {} })
  }

  const onAdjustment = (id) => {
    setState({ ...state, adjustmentOpen: true, accountId: id })
  }

  const onClose = () => {
    setState({ ...state, adjustmentOpen: false })
  }

  const onDelete = async () => {
    closeConfirmModal();
    setState({ ...state, deleteLoading: true })
    try {
      await fb_DeleteAccountOfUserByIndex(user.id, state.deleteIndex);
      dispatch(getAccountsOfUser(user.id));
      dispatch(getProfile(user.id));
      enqueueSnackbar("Deleted account successfully!", { variant: "success" });
      setState({ ...state, deleteLoading: false })
    } catch (error) {
      setState({ ...state, deleteLoading: false })
      enqueueSnackbar("Failed in deleting account.", { variant: "error" });
    }
  }

  const getBalance = (row) => {
    let balance = parseInt(row.balance);
    if (myProfile.adjustment) {
      if (myProfile.adjustment[row.id]) {
        let adjustments = myProfile.adjustment[row.id];
        adjustments.map((item) => {
          if (item.credit_debit == "credit") {
            balance += parseInt(item.amount);
          } else {
            balance -= parseInt(item.amount);
          }
        })
      }
    }
    return balance;
  }

  return (
    <Card>
      <AccountAdjustmentDialog open={state.adjustmentOpen} id={state.accountId} onClose={onClose} />
      <AccountEditDialog open={state.open} index={state.index} onCancel={onCancelEdit} data={state.editData} />
      <CardHeader title="Accouts" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account Number</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Balance(USD)</TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.number ? row.number : "No data"}</TableCell>
                  <TableCell>{row.description ? row.description : "No data"}</TableCell>
                  <TableCell>{getBalance(row)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Add Adjustment">
                      <IconButton onClick={() => onAdjustment(row.id)}>
                        <ReceiptIcon width={20} height={20} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => onEdit(index)}>
                        <EditIcon width={20} height={20} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => openConfirmModal(index)}>
                        <LoadingButton
                          type="submit"
                          sx={{ width: 20, height: 20 }}
                          loading={state.deleteLoading}
                          disabled
                        >
                          <DeleteIcon width={20} height={20} />
                        </LoadingButton>

                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {accounts.length == 0 && <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell>No Item</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Dialog
        open={open}
        onClose={closeConfirmModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delte the account and any orders associated with it
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmModal} color="primary">
            Disagree
          </Button>
          <Button onClick={onDelete} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
