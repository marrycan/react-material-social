import React from "react";
import { Icon } from '@iconify/react';
// material
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

import deleteFill from '@iconify/icons-eva/folder-remove-fill';
import Scrollbar from '../../../Scrollbar';

export default function AccountImportsTable() {

    return (
        <Card>
            <CardHeader title="Past Imports" sx={{ mb: 3 }} />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(["1", "2", "3"]).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>Sat Jul 10 2021</TableCell>
                                    <TableCell>11:20:53 GMT-0700</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => alert("deleting")}>
                                            <Icon icon={deleteFill} width={20} height={20} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </Card>
    );
}
