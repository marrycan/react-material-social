import { Icon } from "@iconify/react";
import { capitalCase } from "change-case";
import { useState, useEffect } from "react";
import bellFill from "@iconify/icons-eva/bell-fill";
import shareFill from "@iconify/icons-eva/share-fill";
import roundVpnKey from "@iconify/icons-ic/round-vpn-key";
import roundReceipt from "@iconify/icons-ic/round-receipt";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
// material
import { Container, Tab, Box, Tabs, Stack } from "@material-ui/core";
// redux
import { useDispatch } from "../../redux/store";
import {
  getAccountsOfUser,
  getSubscription,
  getAPIsOfUser,
  getProfile
} from "../../redux/slices/user";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
//hooks
import useAuth from "../../hooks/useAuth";

// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { AccountGeneral, AccountTrades, AccountAPI, AccountMisc } from "../../components/_dashboard/user/setting";

// ----------------------------------------------------------------------

export default function UserSetting() {

  const [currentTab, setCurrentTab] = useState("account");
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getAccountsOfUser(user.id))
    dispatch(getSubscription(user.id))
    dispatch(getAPIsOfUser(user.id));
    dispatch(getProfile(user.id));
  }, [dispatch]);

  const ACCOUNT_TABS = [
    {
      value: "account",
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: "trades",
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountTrades />,
    },
    {
      value: "API",
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountAPI />,
    },
    {
      value: "Misc",
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountMisc />,
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="User: Account Settings | Minimal-UI">
      <Container>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "Settings" },
          ]}
        />
        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={capitalCase(tab.value)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
