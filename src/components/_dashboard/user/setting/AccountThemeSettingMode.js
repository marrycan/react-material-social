import { Icon } from '@iconify/react';
import moonFill from '@iconify/icons-eva/moon-fill';
import sunFill from '@iconify/icons-eva/sun-fill';
// material
import { Box, Grid, Radio, Paper, RadioGroup, CardActionArea, FormControlLabel } from '@material-ui/core';
// hooks
import useSettings from '../../../../hooks/useSettings';

//redux
import { useSelector } from "../../../../redux/store";

// ----------------------------------------------------------------------

export default function AccountThemeSettingMode() {
  const { themeMode, onChangeMode } = useSettings();
  const { myProfile } = useSelector((state) => state.user);

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={(e) => onChangeMode(myProfile.uid, e)}>
      <Grid container spacing={2.5} dir="ltr">
        {['light', 'dark'].map((mode, index) => (
          <Grid item xs={6} key={mode}>
            <Paper
              sx={{
                width: 1,
                zIndex: 0,
                overflow: 'hidden',
                position: 'relative',
                bgcolor: mode === 'dark' ? 'grey.900' : 'common.white',
                ...(themeMode === mode && {
                  boxShadow: (theme) => theme.customShadows.z12
                })
              }}
            >
              <CardActionArea sx={{ color: 'primary.main' }}>
                <Box
                  sx={{
                    py: 4,
                    display: 'flex',
                    color: 'text.disabled',
                    justifyContent: 'center',
                    ...(themeMode === mode && {
                      color: 'primary.main'
                    })
                  }}
                >
                  <Icon icon={index === 0 ? sunFill : moonFill} width={24} height={24} />
                </Box>

                <FormControlLabel
                  label=""
                  value={mode}
                  control={<Radio sx={{ display: 'none' }} />}
                  sx={{
                    top: 0,
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                  }}
                />
              </CardActionArea>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
}
