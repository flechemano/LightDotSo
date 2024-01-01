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

import { getAuthSession } from "@lightdotso/client";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthSessionData } from "@/data";
import type { AuthParams } from "@/params";
import { queryKeys } from "@/queryKeys";
import { useAuth } from "@/stores";

export const useSuspenseQueryAuthSession = (params: AuthParams) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { clientType } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const currentData: AuthSessionData | undefined = queryClient.getQueryData(
    queryKeys.auth.session({ address: params.address }).queryKey,
  );

  const { data: authSession } = useSuspenseQuery<AuthSessionData | null>({
    queryKey: queryKeys.auth.session({ address: params.address }).queryKey,
    queryFn: async () => {
      if (!params.address) {
        return null;
      }

      const res = await getAuthSession(
        {
          params: {
            query: {
              address: params.address,
            },
          },
        },
        clientType,
      );

      // Return if the response is 200
      return res.match(
        data => {
          return data;
        },
        _ => {
          return currentData ?? null;
        },
      );
    },
  });

  return {
    authSession,
  };
};
