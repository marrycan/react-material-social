// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
//
import { varFadeInUp, MotionInView, varFadeInDown } from "../../animate";

const cardLeft = {
  img_src: "/static/imgs/home_first_card.png",
};

const cardRight = [
  {
    title: "Seamless Workflow",
    description:
      "No install needed! Every push to GitHub triggers a new build, you just keep writing your code.",
  },
  {
    title: "MagicDetect",
    description:
      "Zeet will read your code, and figure out what its requirements are. No upfront configuration necessary!",
  },
  {
    title: "Every language",
    description:
      "Bring your favorite stack! Don't compromise on your favorite tech because of infrastructure requirements.",
  },
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(10),
  },
}));


const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    "&.cardCenter": {
      [theme.breakpoints.up("md")]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
      },
    },
  };
});

const CartImageStyle = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  margin: "auto",
  marginBottom: theme.spacing(5),
  marginTop: theme.spacing(5),
  filter: shadowIcon(theme.palette.primary.main),
}));

const CartTextContainer = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function LandingBuild() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <RootStyle>
      <Container maxWidth="md">
        <Container maxWidth="md">
          <Box sx={{ mb: { xs: 10, md: 15 } }} maxWidth="sm">
            <MotionInView variants={varFadeInUp}>
              <Typography
                variant="h2"
                sx={{ mb: 2, color: "text.secondary", textAlign: "center" }}
              >
                [ BUILD ]
              </Typography>
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                Start with the
              </Typography>
              <Typography
                component="h6"
                color="text.grey"
                sx={{ textAlign: "center" }}
              >
                Zeet is the best place to deploy any software. Start by
                instantly deploying to our managed cloud, then [ SCALE ] to
                millions of users without breaking a sweat.
              </Typography>
            </MotionInView>
          </Box>
        </Container>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={isDesktop ? 3 : 1}
        >
          <Grid item xs={12} sm={6}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle className={"cardCenter"}>
                <CartImageStyle src={cardLeft.img_src} />
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MotionInView variants={varFadeInUp}>
              {cardRight.map((t) => (
                <CartTextContainer>
                  <Typography variant="h3">{t.title}</Typography>
                  <Typography component="h6" color="text.grey">
                    {t.description}
                  </Typography>
                </CartTextContainer>
              ))}
            </MotionInView>
          </Grid>
        </Grid>
        <Container maxWidth="md">
          <Box sx={{ mt: { xs: 10, md: 10 } }} maxWidth="sm">
            <MotionInView variants={varFadeInUp}>
              <Typography variant="h5" sx={{ mb: 2, color: "text.grey", textAlign: "center" }}>
                WORKS WITH EVERY FRAMEWORK AND LANGUAGE
              </Typography>
              <Typography
                component="h6"
                color="text.grey"
                sx={{ textAlign: "center" }}
              >
                With our built-in CI/CD and Git Integration, configuring build
                servers is a thing of the past.
              </Typography>
            </MotionInView>
          </Box>
        </Container>
      </Container>
    </RootStyle>
  );
}
