import React from "react";

// material
import {
  Grid,
} from "@material-ui/core";

//redux
import { useSelector } from "../../../../redux/store";

import AccountTimeZoneCard from "./AccountTimeZoneCard";
import AccountCurrencyCard from "./AccountCurrencyCard";
import AccountTags from "./AccountTags";
import AccountThemeSetting from "./AccountThemeSetting"

// ----------------------------------------------------------------------

export default function AccountMisc() {
  const { myProfile } = useSelector((state) => state.user);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AccountTimeZoneCard data={myProfile.timezone ? myProfile.timezone : ""} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountCurrencyCard data={myProfile.currency ? myProfile.currency : ""} />
        </Grid>
        <Grid item xs={12} md={12}>
          <AccountThemeSetting />
        </Grid>
        <Grid item xs={12} md={12}>
          <AccountTags data={myProfile.tags ? myProfile.tags : []} />
        </Grid>
      </Grid>
    </>
  );
}
