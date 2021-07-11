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

import AccountAPIEditDialog from "./AccountAPIEditDialog";

export default function AccountAPIsTable() {
    const { api } = useSelector((state) => state.user);
    const [state, setState] = React.useState({
        open: false,
        editData: false,
        index: null
    })

    const onEdit = (index) => {
        setState({ ...state, index, open: true, editData: api[index] })
    }

    const onCancelEdit = () => {
        setState({ ...state, index: null, open: false, editData: {} })
    }

    return (
        <Card>
            <AccountAPIEditDialog open={state.open} index={state.index} onCancel={onCancelEdit} data={state.editData} />
            <CardHeader title="Accouts" sx={{ mb: 3 }} />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Model</TableCell>
                                <TableCell>API Key</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {api.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.model ? row.model : "No data"}</TableCell>
                                    <TableCell>{row.key ? row.key : "No data"}</TableCell>
                                    <TableCell>{row.name ? row.name : "No data"}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => onEdit(index)}>
                                            <Icon icon={editFill} width={20} height={20} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {api.length == 0 && <TableRow><TableCell></TableCell><TableCell>No Item</TableCell><TableCell>No Item</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </Card>
    );
}
