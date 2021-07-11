// material
import { Stack, Divider, Typography } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
// social login buttons
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
// ----------------------------------------------------------------------

export default function AuthFirebaseSocials() {
  const { loginWithGoogle, loginWithFaceBook, loginWithTwitter, createUserOnRealTimeDB } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      const { user } = await loginWithGoogle();
      createUserOnRealTimeDB(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFaceBook = async () => {
    try {
      const { user } = await loginWithFaceBook();
      createUserOnRealTimeDB(user);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleLoginTwitter = async () => {
  //   try {
  //     await loginWithTwitter();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <GoogleLoginButton style={{ fontSize: 15 }} onClick={handleLoginGoogle}>Continue with Google</GoogleLoginButton>
        <FacebookLoginButton iconColor="#4267B2" style={{ fontSize: 15, backgroundColor: "#fff", color: "#000" }} activeStyle={{ backgroundColor: "rgb(239, 240, 238)" }} onClick={handleLoginFaceBook}>Continue with Facebook</FacebookLoginButton>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
