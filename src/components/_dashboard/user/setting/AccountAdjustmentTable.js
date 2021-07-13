import React from "react";
import { useSnackbar } from "notistack";
// material
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
    Tooltip
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

//redux
import { useSelector, useDispatch } from '../../../../redux/store';
import { getProfile } from "../../../../redux/slices/user"
import Scrollbar from '../../../Scrollbar';

import AccountAdjustmentEditDialog from "./AccountAdjustmentEditDialog";

// hooks
import useAuth from "../../../../hooks/useAuth";

//utils
import { fb_DeleteAdjustmentOfUserByIdAndIndex } from "../../../../utils/firebaseRequest";

export default function AccountAdjustmentTable({ id }) {
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { accounts, myProfile } = useSelector((state) => state.user);

    const adjustments = myProfile.adjustment ? myProfile.adjustment[id] ? myProfile.adjustment[id] : [] : []
    const [state, setState] = React.useState({
        adjustmentOpen: false,
        adjustmentId: '',
        accountId: '',
        open: false,
        editData: false,
        index: null,
        deleteLoading: false
    })

    const onEdit = (index, id) => {
        setState({ ...state, index, adjustmentId: id, open: true, editData: adjustments[index] })
    }

    const onDelete = async (index) => {
        setState({ ...state, deleteLoading: true })
        try {
            await fb_DeleteAdjustmentOfUserByIdAndIndex(user.id, id, index);
            dispatch(getProfile(user.id));
            enqueueSnackbar("Deleted adjustment successfully!", { variant: "success" });
            setState({ ...state, deleteLoading: false })
        }
        catch (error) {
            enqueueSnackbar("Failed in deleting adjustment successfully!", { variant: "error" });
            setState({ ...state, deleteLoading: false })
        }
    }

    const onCancelEdit = () => {
        setState({ ...state, index: null, open: false, editData: {} })
    }

    return (
        <Card>
            <AccountAdjustmentEditDialog open={state.open} index={state.index} adjustmentId={id} onCancel={onCancelEdit} data={state.editData} />
            <CardHeader title="Adjustments" sx={{ mb: 3 }} />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Credit/Debit</TableCell>
                                <TableCell>Notes</TableCell>
                                <TableCell>Amount(USD)</TableCell>
                                <TableCell>Transactio Date</TableCell>
                                <TableCell>Creation Date</TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adjustments.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.credit_debit ? row.credit_debit : "No data"}</TableCell>
                                    <TableCell>{row.description ? row.description : "No data"}</TableCell>
                                    <TableCell>{row.amount ? row.amount : "No data"}</TableCell>
                                    <TableCell>{row.transaction_dt ? row.transaction_dt : "No data"}</TableCell>
                                    <TableCell>{row.created_dt ? row.created_dt : "No data"}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => onEdit(index, row.id)}>
                                                <EditIcon width={20} height={20} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => onDelete(index)}>
                                                <LoadingButton loading={state.deleteLoading} disabled sx={{ width: 20, height: 20 }}>
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
        </Card>
    );
}
