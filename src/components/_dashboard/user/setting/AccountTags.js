import React from 'react';
import { useSnackbar } from "notistack";
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

// material
import {
  Grid,
  Card,
  TextField,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

//utils
import { fb_UpdateTagsOfUserById } from "../../../../utils/firebaseRequest";

// hooks
import useAuth from "../../../../hooks/useAuth";

//redux
import { useDispatch } from "../../../../redux/store";
import { getProfile } from "../../../../redux/slices/user"

export default function AccountTags({ data }) {
  const fixedOptions = [];
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(data);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = async () => {
    setLoading(true);
    try {
      await fb_UpdateTagsOfUserById(user.id, value);
      dispatch(getProfile(user.id));
      enqueueSnackbar("Update success", { variant: "success" });
    }
    catch (error) {
      enqueueSnackbar("Update failed", { variant: "error" });
    }
    setLoading(false);
  }

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            multiple
            id="fixed-tags-demo"
            defaultValue={data}
            value={value}
            onChange={(event, newValue) => {
              setValue([
                ...fixedOptions,
                ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
              ]);
            }}
            options={tagItems}
            getOptionLabel={(option) => option}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  disabled={fixedOptions.indexOf(option) !== -1}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Tags" variant="outlined" placeholder="Tags" />
            )}
          />

        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleSave}
          >
            Save Tags
          </LoadingButton>
        </Grid>
      </Grid>
    </Card>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const tagItems = [
  'Tag 1',
  'Tag 2',
  'Tag 3',
  'Tag 4',
  'Tag 5',
  'Tag 6',
  'Tag 7',
  'Tag 8',
  'Tag 9',
  'Tag 10',

];