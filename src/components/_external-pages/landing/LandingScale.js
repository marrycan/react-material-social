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
  img_src: "/static/imgs/home_second_card.svg",
};

const cardRight = [
  {
    title: "Deploy everywhere.",
    description:
      "Transparently deploy across multiple clouds. Unprecendented availability is just 1 click away.",
  },
  {
    title: "Stick close",
    description:
      "Choose between hundreds of edge locations all over the world and bring your servers as close to your customers as possible.",
  },
  {
    title: "Customizeable Resources",
    description:
      "Choose as many or as little resources as you need for your services and only ever pay for what you use.",
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

export default function LandingScale() {
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
                sx={{ mb: 2, color: "text.scale", textAlign: "center" }}
              >
                [ SCALE ]
              </Typography>
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                Zero to 🚀
              </Typography>
              <Typography
                component="h6"
                color="text.grey"
                sx={{ textAlign: "center" }}
              >
                Zeet will be by your side no matter the scale. Start with one
                server, then instantly scale to thousands across the planet as
                your requirements change.
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
              <Typography
                variant="h5"
                sx={{ mb: 2, color: "text.grey", textAlign: "center" }}
              >
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
