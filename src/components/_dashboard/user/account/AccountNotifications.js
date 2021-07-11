import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Card,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// redux
import { useSelector, useDispatch } from "../../../../redux/store";
import { getNotifications } from "../../../../redux/slices/user";
//hooks
// hooks
import useAuth from "../../../../hooks/useAuth";
// utils
import { fb_SetNotifications } from "../../../../utils/firebaseRequest";

// ----------------------------------------------------------------------

const ACTIVITY_OPTIONS = [
  {
    value: "activityComments",
    label: "Email me when someone comments onmy article",
  },
  {
    value: "activityAnswers",
    label: "Email me when someone answers on my form",
  },
  { value: "activityFollows", label: "Email me hen someone follows me" },
];

const APPLICATION_OPTIONS = [
  { value: "applicationNews", label: "News and announcements" },
  { value: "applicationProduct", label: "Weekly product updates" },
  { value: "applicationBlog", label: "Weekly blog digest" },
];

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { notifications } = useSelector((state) => state.user);
  const { user } = useAuth();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activityComments: notifications.activityComments ? true : false,
      activityAnswers: notifications.activityAnswers ? true : false,
      activityFollows: notifications.activityFollows ? true : false,
      applicationNews: notifications.applicationNews ? true : false,
      applicationProduct: notifications.applicationProduct ? true : false,
      applicationBlog: notifications.applicationBlog ? true : false,
    },
    onSubmit: async (values, { setSubmitting }) => {
      await fb_SetNotifications(user.id, values);
      dispatch(getNotifications(user.id));
      setSubmitting(false);
      enqueueSnackbar("Save success", { variant: "success" });
    },
  });

  const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography variant="overline" sx={{ color: "text.secondary" }}>
                Activity
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                {ACTIVITY_OPTIONS.map((activity) => (
                  <FormControlLabel
                    key={activity.value}
                    control={
                      <Switch
                        {...getFieldProps(activity.value)}
                        checked={values[activity.value]}
                      />
                    }
                    label={activity.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography variant="overline" sx={{ color: "text.secondary" }}>
                Application
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                {APPLICATION_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    control={
                      <Switch
                        {...getFieldProps(item.value)}
                        checked={values[item.value]}
                      />
                    }
                    label={item.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack>
            </Stack>

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
