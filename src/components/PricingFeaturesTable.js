import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    container: {
        "& > *": {
            margin: "30px auto"
        },
        margin: 'auto',
        minWidth: 500,
        maxWidth: 1100,
    },
});

function createData(name, tooltip, basic, starter, premium) {
    return { name, tooltip, basic, starter, premium };
}

const rows = [
    createData('Continuous Integration', "Every Github Commit is automatically built and deploy", true, true, true),
    createData('Continuous Deployment', "Every Github Commit is automatically built and deploy", true, true, true),
    createData('Auto SSL', "Every Github Commit is automatically built and deploy", true, true, true),
    createData('Deploy from DockerHub	', "Every Github Commit is automatically built and deploy", true, true, true),
    createData('Fine-tuned Resource Limits	', "Every Github Commit is automatically built and deploy", true, true, true),
    createData('Multiple Instances', "Every Github Commit is automatically built and deploy", true, true, true),
    createData('Realtime Logs', "Every Github Commit is automatically built and deploy", true, true, true),
    createData('Realtime Metrics', "Every Github Commit is automatically built and deploy", false, true, true),
    createData('Build / Deploy Notifications', "Every Github Commit is automatically built and deploy", false, false, true),
    createData('Custom Domains', "Every Github Commit is automatically built and deploy", false, false, true),
    createData('Custom Environment Variables', "Every Github Commit is automatically built and deploy", false, false, false),
];

export default function PricingFeaturesTable() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Divider />
            <Typography variant="h3" sx={{ mr: 1.5 }}>
                Features
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>FEATURE</TableCell>
                            <TableCell align="right">Basic</TableCell>
                            <TableCell align="right">Starter</TableCell>
                            <TableCell align="right">Premium</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" sx={{ alignItems: 'center', display: 'flex' }}>
                                    {row.name}
                                    <Tooltip title={row.tooltip}>
                                        <InfoIcon sx={{ width: 20, height: 20, marginLeft: 1 }} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        disabled={!row.basic}
                                        checked={row.basic}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        disabled={!row.starter}
                                        checked={row.starter}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        disabled={!row.premium}
                                        checked={row.premium}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}