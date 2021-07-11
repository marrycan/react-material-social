import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
// material
import { Stack, Card, TextField, InputAdornment } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// redux
import { useSelector, useDispatch } from "../../../../redux/store";
import { getProfile } from "../../../../redux/slices/user";
//hooks
import useAuth from "../../../../hooks/useAuth";
// utils
import { fb_UpdateUserProfile } from "../../../../utils/firebaseRequest";

// ----------------------------------------------------------------------

const SOCIAL_LINKS_OPTIONS = [
  {
    value: "facebookLink",
    icon: <Icon icon={facebookFill} height={24} />,
  },
  {
    value: "instagramLink",
    icon: <Icon icon={instagramFilled} height={24} />,
  },
  {
    value: "linkedinLink",
    icon: <Icon icon={linkedinFill} height={24} />,
  },
  {
    value: "twitterLink",
    icon: <Icon icon={twitterFill} height={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountSocialLinks() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { myProfile } = useSelector((state) => state.user);
  const { user } = useAuth();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      facebookLink: myProfile.facebookLink ? myProfile.facebookLink : "",
      instagramLink: myProfile.instagramLink ? myProfile.instagramLink : "",
      linkedinLink: myProfile.linkedinLink ? myProfile.linkedinLink : "",
      twitterLink: myProfile.twitterLink ? myProfile.twitterLink : "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      await fb_UpdateUserProfile(user.id, values);
      dispatch(getProfile(user.id));
      setSubmitting(false);
      enqueueSnackbar("Save success", { variant: "success" });
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            {SOCIAL_LINKS_OPTIONS.map((link) => (
              <TextField
                key={link.value}
                fullWidth
                {...getFieldProps(link.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {link.icon}
                    </InputAdornment>
                  ),
                }}
              />
            ))}

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
