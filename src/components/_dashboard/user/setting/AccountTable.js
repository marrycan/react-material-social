import React from "react";
import { Icon } from '@iconify/react';
// material
import editFill from '@iconify/icons-eva/edit-2-fill';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  IconButton
} from '@material-ui/core';

//redux
import { useSelector } from '../../../../redux/store';

import Scrollbar from '../../../Scrollbar';

import AccountEditDialog from "./AccountEditDialog";

export default function AccountTable() {
  const { accounts } = useSelector((state) => state.user);
  const [state, setState] = React.useState({
    open: false,
    editData: false,
    index: null
  })

  const onEdit = (index) => {
    setState({ ...state, index, open: true, editData: accounts[index] })
  }

  const onCancelEdit = () => {
    setState({ ...state, index: null, open: false, editData: {} })
  }

  return (
    <Card>
      <AccountEditDialog open={state.open} index={state.index} onCancel={onCancelEdit} data={state.editData} />
      <CardHeader title="Accouts" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account Number</TableCell>
                <TableCell>Added Credit/Debit</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.number ? row.number : "No data"}</TableCell>
                  <TableCell>{row.credit_debit ? row.credit_debit : "No data"}</TableCell>
                  <TableCell>{row.description ? row.description : "No data"}</TableCell>
                  <TableCell>{row.transaction_dt ? row.transaction_dt : "No data"}</TableCell>
                  <TableCell>{row.created_dt ? row.created_dt : "No data"}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onEdit(index)}>
                      <Icon icon={editFill} width={20} height={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {accounts.length == 0 && <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell>No Item</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
