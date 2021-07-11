import React from "react";
import { Icon } from '@iconify/react';
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
    IconButton
} from '@material-ui/core';

//redux
import { useDispatch, useSelector } from "../../../../redux/store";
import { getProfile } from "../../../../redux/slices/user"

import Scrollbar from '../../../Scrollbar';

import AccountTagEditDialog from "./AccountTagEditDialog";

import { fb_DeleteTagsOfUserById } from "../../../../utils/firebaseRequest";

export default function AccountTagsTable() {
    const dispatch = useDispatch();
    const { myProfile } = useSelector((state) => state.user);
    const tags = myProfile.tags ? myProfile.tags : [];
    const [state, setState] = React.useState({
        open: false,
        editData: false,
        index: null
    })

    const onEdit = (index) => {
        setState({ ...state, index, open: true, editData: tags[index] })
    }

    const onCancelEdit = () => {
        setState({ ...state, index: null, open: false, editData: {} })
    }

    const onDelete = async (index) => {
        await fb_DeleteTagsOfUserById(myProfile.uid, index);
        dispatch(getProfile(myProfile.uid));
    }

    return (
        <Card>
            <AccountTagEditDialog open={state.open} index={state.index} onCancel={onCancelEdit} data={state.editData} />
            <CardHeader title="Accouts" sx={{ mb: 3 }} />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tag</TableCell>
                                <TableCell>Orders</TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tags.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.tag ? row.tag : "No data"}</TableCell>
                                    <TableCell>{row.order ? row.order : "No data"}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => onEdit(index)}>
                                            <EditIcon width={20} height={20} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right" >
                                        <IconButton onClick={() => onDelete(index)}>
                                            <DeleteIcon width={20} height={20} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {tags.length == 0 && <TableRow><TableCell></TableCell><TableCell>No Item</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </Card>
    );
}
