import { NavLink as RouterLink, useLocation } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Box, Button, AppBar, Toolbar, Container } from "@material-ui/core";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
// components
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import { MHidden } from "../../components/@material-extend";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
// routes
import { PATH_AUTH } from "../../routes/paths";

import AccountPopover from "./AccountPopover";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <AppBar color={isHome ? "transparent" : "default"} sx={{ boxShadow: 0 }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: "background.default",
            height: { md: APP_BAR_DESKTOP - 16 },
            justifyContent: "space-between",
            padding: "0 30px",
          }),
        }}
      >
        <Container
          sx={{
            maxWidth: "1600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
          <AccountPopover />

          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}

// import PropTypes from "prop-types";
// import { Icon } from "@iconify/react";
// import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// // material
// import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
// import { Box, Stack, AppBar, Toolbar, IconButton } from "@material-ui/core";
// // components
// import { MHidden } from "../../components/@material-extend";
// import AccountPopover from "./AccountPopover";

// // ----------------------------------------------------------------------

// const DRAWER_WIDTH = 280;
// const APPBAR_MOBILE = 64;
// const APPBAR_DESKTOP = 92;

// const RootStyle = styled(AppBar)(({ theme }) => ({
//   boxShadow: "none",
//   backdropFilter: "blur(6px)",
//   WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
//   backgroundColor: alpha(theme.palette.background.default, 0.72),
//   [theme.breakpoints.up("lg")]: {
//     width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
//   },
// }));

// const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
//   minHeight: APPBAR_MOBILE,
//   [theme.breakpoints.up("lg")]: {
//     minHeight: APPBAR_DESKTOP,
//     padding: theme.spacing(0, 5),
//   },
// }));

// // ----------------------------------------------------------------------

// DashboardNavbar.propTypes = {
//   onOpenSidebar: PropTypes.func,
// };

// export default function DashboardNavbar({ onOpenSidebar }) {
//   return (
//     <RootStyle>
//       <ToolbarStyle>
//         <MHidden width="lgUp">
//           <IconButton
//             onClick={onOpenSidebar}
//             sx={{ mr: 1, color: "text.primary" }}
//           >
//             <Icon icon={menu2Fill} />
//           </IconButton>
//         </MHidden>
//         <Box sx={{ flexGrow: 1 }} />
//         <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
//           <AccountPopover />
//         </Stack>
//       </ToolbarStyle>
//     </RootStyle>
//   );
// }
