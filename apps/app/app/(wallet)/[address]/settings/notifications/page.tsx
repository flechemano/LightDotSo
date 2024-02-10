// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { queryKeys } from "@lightdotso/query-keys";
import { getQueryClient } from "@lightdotso/services";
import { SettingsSectionWrapper } from "@lightdotso/ui";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Address } from "viem";
import { SettingsNotificationsSettingsCard } from "@/app/(wallet)/[address]/settings/notifications/(components)/settings-notifications-settings-card";
import { handler } from "@/handlers/paths/[address]/settings/notifications/handler";
import { preloader } from "@/preloaders/paths/[address]/preloader";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PageProps = {
  params: { address: string };
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: PageProps) {
  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(params);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { walletNotifications } = await handler(params);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    queryKeys.wallet.notificationSettings({
      address: params.address as Address,
    }).queryKey,
    walletNotifications,
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsSectionWrapper>
        <SettingsNotificationsSettingsCard
          address={params.address as Address}
        />
      </SettingsSectionWrapper>
    </HydrationBoundary>
  );
}