import { Icon } from "@iconify/react";
import googleFill from "@iconify/icons-eva/google-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Grid,
  Link,
  Divider,
  Container,
  Typography,
  IconButton,
  Stack,
} from "@material-ui/core";
// routes
import { PATH_PAGE } from "../../routes/paths";
//
import Logo from "../../components/Logo";

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: "FaceBook", icon: facebookFill },
  { name: "Google", icon: googleFill },
  { name: "Linkedin", icon: linkedinFill },
  { name: "Twitter", icon: twitterFill },
];

const LINKS = [
  {
    headline: "About",
    children: [
      { name: "Home", href: PATH_PAGE.about },
      { name: "Pricing", href: PATH_PAGE.contact },
      { name: "Careers", href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: "Help",
    children: [
      { name: "Example", href: "#" },
      { name: "Docs", href: "#" },
      { name: "Chat", href: "#" },
    ],
  },
  {
    headline: "Social",
    children: [
      { name: "Github", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Facebook", href: "#" },
    ],
  },
  {
    headline: "Contact",
    children: [
      { name: "Discord", href: "#" },
      { name: "Support", href: "#" },
      { name: "Enterprise", href: "#" },
    ],
  },
];

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Grid item xs={12}>
            <Stack
              spacing={5}
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline" color="text.secondary">
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: "block" }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          © 2021. All rights reserved
        </Typography>
      </Container>
    </RootStyle>
  );
}
