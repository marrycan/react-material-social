import {
    Typography,
    Stack,
    Card
} from "@material-ui/core";

import AccountThemeSettingMode from "./AccountThemeSettingMode";
import AccountThemeSettingColor from "./AccountThemeSettingColor";

// ----------------------------------------------------------------------
export default function AccountThemeSettings() {
    return (
        <Card>
            <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
                <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Mode</Typography>
                    <AccountThemeSettingMode />
                </Stack>

                <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Color</Typography>
                    <AccountThemeSettingColor />
                </Stack>
            </Stack>
        </Card>
    );
}
