import React from "react";
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingBuild,
  LandingScale,
  LandingMonitor,
} from '../components/_external-pages/landing';

// hooks
import useSettings from '../hooks/useSettings';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.body
}));

// ----------------------------------------------------------------------

export default function LandingPage() {

  const { setSettingByDefault, changeCurrentTheme } = useSettings();

  React.useEffect(() => {
    setSettingByDefault()
    return () => {
      changeCurrentTheme()
    }
  }, [])

  return (
    <RootStyle title="The starting point for your next project | Minimal-UI" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingBuild />
        <LandingScale />
        <LandingMonitor />
      </ContentStyle>
    </RootStyle>
  );
}
