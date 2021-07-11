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
  getCards,
  getProfile,
  getNotifications,
  getCustomers,
  getPlans,
  getSubscription
} from "../../redux/slices/user";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
//hooks
import useAuth from "../../hooks/useAuth";

// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from "../../components/_dashboard/user/account";

// ----------------------------------------------------------------------

export default function UserProfile() {
  const [currentTab, setCurrentTab] = useState("general");
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getSubscription(user.id))
    dispatch(getCards(user.id));
    dispatch(getCustomers(user.id));
    dispatch(getNotifications(user.id));
    dispatch(getProfile(user.id));
  }, [dispatch]);

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: "billing",
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountBilling />,
    },
    {
      value: "notifications",
      icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <AccountNotifications />,
    },
    {
      value: "social_links",
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountSocialLinks />,
    },
    {
      value: "change_password",
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="User: User Profile | Minimal-UI">
      <Container>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "Profile" },
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
